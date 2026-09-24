import { z } from "zod";

/** Minimum time (ms) a real visitor needs to see the form and submit it.
 * Anything faster is almost certainly a script filling it programmatically. */
const MIN_FILL_MS = 1000;
/** Reject a stale/replayed timestamp rather than trusting an old one indefinitely. */
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

/** A generic message that doesn't tip bots off to which check failed. */
const GENERIC_MESSAGE = "Something went wrong. Please refresh the page and try again.";

/** Honeypot field: hidden from real visitors via CSS, so any bot that fills
 * it out gets rejected server-side. */
export const honeypotField = z.string().max(0, GENERIC_MESSAGE).optional().or(z.literal(""));

/** Pairs with a hidden `<input>` set to `Date.now()` on mount (page load, or
 * dialog open for a modal form). Rejects submissions that arrive faster than
 * a human could plausibly fill the form, or long after the timestamp was set. */
export const formRenderedAtField = z
  .string()
  .trim()
  .min(1, GENERIC_MESSAGE)
  .refine((value) => {
    const renderedAt = Number(value);
    if (!Number.isFinite(renderedAt)) return false;
    const elapsed = Date.now() - renderedAt;
    return elapsed >= MIN_FILL_MS && elapsed <= MAX_FORM_AGE_MS;
  }, GENERIC_MESSAGE);

export const RATE_LIMIT_MESSAGE = "You're submitting a bit too fast — please wait a moment and try again.";
