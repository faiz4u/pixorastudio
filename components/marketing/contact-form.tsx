"use client";

import { useActionState } from "react";
import { submitLead, type LeadActionState } from "@/lib/actions/leads";
import { PROJECT_TYPE_OPTIONS, BUDGET_RANGE_OPTIONS } from "@/lib/validation/lead";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: LeadActionState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7">
      {/* Honeypot: hidden from real visitors, so any bot that fills it out gets rejected server-side. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Your name *</Label>
        <Input id="name" name="name" required maxLength={200} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="whatsappNumber">WhatsApp number *</Label>
        <Input id="whatsappNumber" name="whatsappNumber" required maxLength={30} placeholder="+91-XXXXXXXXXX" />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-medium">What do you need? *</legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPE_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs has-[:checked]:border-brand has-[:checked]:text-brand"
            >
              <input type="checkbox" name="projectTypes" value={option} className="accent-brand" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-medium">Budget range</legend>
        <div className="flex flex-wrap gap-2">
          {BUDGET_RANGE_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs has-[:checked]:border-brand has-[:checked]:text-brand"
            >
              <input type="radio" name="budgetRange" value={option} className="accent-brand" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Tell us a bit more (optional)</Label>
        <Textarea id="message" name="message" rows={4} maxLength={2000} />
      </div>

      {state.status !== "idle" && (
        <p
          className={cn(
            "text-sm",
            state.status === "success" ? "text-emerald-400" : "text-destructive",
          )}
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="rounded-full bg-brand text-white hover:bg-brand-hover"
      >
        {isPending ? "Sending..." : "Send my brief →"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Note: we reply within one working day. Your details stay with us — never shared, never
        sold.
      </p>
    </form>
  );
}
