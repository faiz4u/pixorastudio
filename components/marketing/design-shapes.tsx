"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient "design tool" backdrop drawn from the studio's shape.png: small
 * colourful dots, thin dotted rings, selection boxes with round handles,
 * pen-tool Bézier curves with anchor points and easing-curve graphs drift
 * slowly upward. Far shapes are small and faint, near ones larger; the pointer
 * nudges them by depth for a soft parallax. A click sends a coloured ripple
 * across the screen and a travelling wave shoves the shapes outward as its
 * front passes them. Everything is small and crisp (no blur, glow or big
 * fills) so it never softens the page. Kept cheap:
 *  - one fixed 2D canvas, ~8-24 shapes, plain paths (no filters or images)
 *  - starts only after the browser is idle, so it can't delay LCP or input
 *  - capped at ~40fps and fully paused while the tab is hidden
 *  - skipped entirely for prefers-reduced-motion and Save-Data
 */

const FRAME_MS = 1000 / 40;
const MAX_SHAPES = 24;
const MAX_DPR = 2;
const FADE_ZONE = 0.14; // fraction of viewport height used to fade shapes in/out

// Click ripple: a wavefront travels out from the pointer and fades over its life.
const RIPPLE_SPEED = 380; // px per second the wavefront travels
const RIPPLE_LIFE = 2.2; // seconds
const RIPPLE_WIDTH = 70; // px, thickness of the band that shoves shapes
const RIPPLE_PUSH = 24; // px, peak shove of a shape at the wavefront
const MAX_RIPPLES = 4;

// Palette lifted from shape.png, plus the brand purple.
const DOT_COLORS = ["#f0628a", "#a99bff", "#f2735a", "#ffd44d", "#4d6bff", "#5ee6e6", "#744bdb"] as const;
const RING_COLORS = ["#ffd44d", "#f2735a", "#7d8cff"] as const;
const CURVE = "#8fd3ff";
const HANDLE_STROKE = "#3d7bff";
const WHITE = "#ffffff";

const DOT = 0;
const RING = 1;
const SELECT = 2;
const BEZIER = 3;
const EASING = 4;

type Shape = {
  x: number;
  y: number;
  size: number;
  depth: number; // 0 (far) .. 1 (near)
  kind: number;
  tilt: number; // resting angle in radians
  speed: number; // upward px per second
  sway: number; // horizontal drift amplitude in px
  phase: number;
  color: string;
  dashed: boolean;
};

type Ripple = {
  x: number;
  y: number;
  t0: number; // animation time the click happened
  color: string;
  age: number; // seconds, refreshed every frame
  radius: number; // current wavefront radius in px
  decay: number; // 1 at the click, 0 when the ripple has died out
};

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function spawn(existing: Shape | null, width: number, height: number, scatter: boolean): Shape {
  const s = existing ?? ({} as Shape);
  const depth = Math.random();
  const roll = Math.random();
  s.kind = roll < 0.6 ? DOT : roll < 0.72 ? RING : roll < 0.82 ? SELECT : roll < 0.92 ? BEZIER : EASING;
  s.depth = depth;
  s.size =
    s.kind === DOT
      ? 5 + depth * 7
      : s.kind === RING
        ? 26 + depth * 34
        : s.kind === SELECT
          ? 34 + depth * 36
          : s.kind === BEZIER
            ? 40 + depth * 40
            : 30 + depth * 16;
  s.x = Math.random() * width;
  s.y = scatter ? Math.random() * height : height + s.size;
  s.tilt = s.kind === DOT || s.kind === RING ? 0 : (Math.random() - 0.5) * 0.5;
  s.speed = (s.kind === DOT ? 6 : 5) + depth * (s.kind === DOT ? 16 : 11);
  s.sway = 8 + Math.random() * 18;
  s.phase = Math.random() * Math.PI * 2;
  s.color = s.kind === DOT ? pick(DOT_COLORS) : s.kind === RING ? pick(RING_COLORS) : CURVE;
  s.dashed = Math.random() < 0.5;
  return s;
}

export function DesignShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
    let width = 0;
    let height = 0;
    const shapes: Shape[] = [];
    const ripples: Ripple[] = [];
    let raf = 0;
    let last = 0;
    let time = 0;
    let resizeTimer = 0;
    let disposed = false;
    // Pointer offset from the viewport centre (-0.5..0.5), eased toward its target.
    let targetX = 0;
    let targetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.max(8, Math.min(MAX_SHAPES, Math.round((width / 60) * (lowPower ? 0.6 : 1))));
      while (shapes.length < target) shapes.push(spawn(null, width, height, true));
      shapes.length = Math.min(shapes.length, target);
    }

    function dot(x: number, y: number, r: number) {
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawShape(s: Shape, cx: number, cy: number, fade: number, pulse: number) {
      const c = ctx!;
      const r = s.size / 2;
      const alpha = Math.min(1, (0.3 + s.depth * 0.32) * fade * (1 + pulse * 0.7));

      c.save();
      c.translate(cx, cy);
      // Shapes swell a little while the wavefront passes through them.
      if (pulse > 0.01) c.scale(1 + pulse * 0.35, 1 + pulse * 0.35);
      c.lineWidth = 1;

      if (s.kind === DOT) {
        // Small solid dot that gently twinkles.
        c.globalAlpha = Math.min(1, (0.75 + s.depth * 0.25) * fade * (1 + pulse * 0.4)) * (0.85 + 0.15 * Math.sin(time * 1.6 + s.phase));
        c.fillStyle = s.color;
        dot(0, 0, r);
      } else if (s.kind === RING) {
        // Thin dotted or dashed ring, like the orbit circles in the illustration.
        c.globalAlpha = alpha * 0.9;
        c.strokeStyle = s.color;
        c.lineCap = "round";
        c.setLineDash(s.dashed ? [4, 4] : [1, 3]);
        c.beginPath();
        c.arc(0, 0, r, 0, Math.PI * 2);
        c.stroke();
      } else {
        c.rotate(s.tilt + Math.sin(time * 0.4 + s.phase) * 0.1);
        if (s.kind === SELECT) {
          // Selection box with round handles and rotate dots.
          const w = s.size;
          const h = s.size * 0.55;
          c.globalAlpha = alpha * 0.9;
          c.strokeStyle = HANDLE_STROKE;
          c.strokeRect(-w / 2, -h / 2, w, h);
          c.fillStyle = WHITE;
          c.lineWidth = 1.2;
          for (const sx of [-1, 1]) {
            for (const sy of [-1, 1]) {
              c.globalAlpha = alpha;
              c.beginPath();
              c.arc((sx * w) / 2, (sy * h) / 2, 3, 0, Math.PI * 2);
              c.fill();
              c.stroke();
              c.globalAlpha = alpha * 0.8;
              dot(sx * (w / 2 + 7), sy * (h / 2 + 7), 1.6);
            }
          }
        } else if (s.kind === BEZIER) {
          // Pen-tool curve: anchor points, handle lines and control dots.
          const p0 = [-r, r * 0.35];
          const p1 = [-r * 0.35, -r * 0.85];
          const p2 = [r * 0.95, -r * 0.2];
          const p3 = [r * 0.45, r * 0.85];
          c.strokeStyle = CURVE;
          c.fillStyle = CURVE;
          c.lineWidth = 1.5;
          c.globalAlpha = alpha;
          c.beginPath();
          c.moveTo(p0[0], p0[1]);
          c.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
          c.stroke();
          c.lineWidth = 1;
          c.globalAlpha = alpha * 0.6;
          c.beginPath();
          c.moveTo(p0[0], p0[1]);
          c.lineTo(p1[0], p1[1]);
          c.moveTo(p3[0], p3[1]);
          c.lineTo(p2[0], p2[1]);
          c.stroke();
          c.globalAlpha = alpha;
          dot(p1[0], p1[1], 1.9);
          dot(p2[0], p2[1], 1.9);
          c.fillStyle = WHITE;
          dot(p0[0], p0[1], 3.2);
          dot(p3[0], p3[1], 3.2);
        } else {
          // Easing-curve graph: framed panel, cross grid and an S-curve.
          const half = r;
          const m = 3;
          c.fillStyle = WHITE;
          c.globalAlpha = alpha * 0.06;
          c.fillRect(-half, -half, s.size, s.size);
          c.strokeStyle = WHITE;
          c.globalAlpha = alpha * 0.35;
          c.strokeRect(-half, -half, s.size, s.size);
          c.globalAlpha = alpha * 0.22;
          c.beginPath();
          c.moveTo(-half, 0);
          c.lineTo(half, 0);
          c.moveTo(0, -half);
          c.lineTo(0, half);
          c.stroke();
          c.strokeStyle = "#b7a8ff";
          c.fillStyle = "#b7a8ff";
          c.lineWidth = 1.5;
          c.globalAlpha = alpha;
          c.beginPath();
          c.moveTo(-half + m, half - m);
          c.bezierCurveTo(0, half - m, 0, -half + m, half - m, -half + m);
          c.stroke();
          dot(-half + m, half - m, 1.8);
          dot(half - m, -half + m, 1.8);
        }
      }
      c.restore();
    }

    function drawRipple(rp: Ripple) {
      const c = ctx!;
      c.save();
      c.strokeStyle = rp.color;
      // Three trailing rings, like a stone dropped in water.
      for (let i = 0; i < 3; i++) {
        const r = rp.radius - i * 26;
        if (r <= 0) continue;
        c.globalAlpha = Math.min(1, 0.6 * rp.decay * (1 - i * 0.3));
        c.lineWidth = 1.8 - i * 0.5;
        c.beginPath();
        c.arc(rp.x, rp.y, r, 0, Math.PI * 2);
        c.stroke();
      }
      // A quick ping right where the click landed.
      if (rp.age < 0.35) {
        const k = 1 - rp.age / 0.35;
        c.fillStyle = rp.color;
        c.globalAlpha = k;
        dot(rp.x, rp.y, 1 + 5 * k);
      }
      c.restore();
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const elapsed = now - last;
      if (elapsed < FRAME_MS) return;
      last = now;
      const step = Math.min(elapsed, 100) / 1000;
      time += step;

      pointerX += (targetX - pointerX) * 0.06;
      pointerY += (targetY - pointerY) * 0.06;

      ctx!.clearRect(0, 0, width, height);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.age = time - rp.t0;
        if (rp.age >= RIPPLE_LIFE) {
          ripples.splice(i, 1);
          continue;
        }
        rp.radius = rp.age * RIPPLE_SPEED;
        rp.decay = Math.pow(1 - rp.age / RIPPLE_LIFE, 1.5);
        drawRipple(rp);
      }

      const fadePx = height * FADE_ZONE;
      for (const s of shapes) {
        s.y -= s.speed * step;
        if (s.y < -s.size) {
          spawn(s, width, height, false);
          continue;
        }

        let cx = s.x + Math.sin(time * 0.35 + s.phase) * s.sway - pointerX * s.depth * 36;
        let cy = s.y - pointerY * s.depth * 24;

        // Ride the ripple: the wavefront pushes the shape out, then pulls it back
        // as it passes (a sine inside a narrow band around the front).
        let pulse = 0;
        for (const rp of ripples) {
          const dx = cx - rp.x;
          const dy = cy - rp.y;
          const dist = Math.hypot(dx, dy) || 1;
          const u = (dist - rp.radius) / RIPPLE_WIDTH;
          if (u > 3 || u < -3) continue;
          const band = Math.exp(-u * u);
          const push = (Math.sin(u * 2.6) * band * RIPPLE_PUSH * rp.decay) / (1 + dist / 600);
          cx += (dx / dist) * push;
          cy += (dy / dist) * push;
          pulse = Math.max(pulse, band * rp.decay);
        }
        // Ease shapes in and out at the top/bottom edges instead of popping.
        const fade = Math.max(0, Math.min(1, s.y / fadePx, (height - s.y) / fadePx));
        if (fade > 0) drawShape(s, cx, cy, fade, pulse);
      }
    }

    function play() {
      if (raf || disposed) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function pause() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const onVisibility = () => (document.hidden ? pause() : play());
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX / width - 0.5;
      targetY = event.clientY / height - 0.5;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (ripples.length >= MAX_RIPPLES) ripples.shift();
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        t0: time,
        color: pick(DOT_COLORS),
        age: 0,
        radius: 0,
        decay: 1,
      });
    };

    function start() {
      if (disposed) return;
      resize();
      canvas!.style.opacity = "1";
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("resize", onResize);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true, capture: true });
      if (!document.hidden) play();
    }

    let cancelStart: () => void;
    // Safari has no requestIdleCallback; the lib types say it always exists.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      cancelStart = () => window.cancelIdleCallback(id);
    } else {
      const id = window.setTimeout(start, 600);
      cancelStart = () => window.clearTimeout(id);
    }

    return () => {
      disposed = true;
      cancelStart();
      pause();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-1000"
    />
  );
}
