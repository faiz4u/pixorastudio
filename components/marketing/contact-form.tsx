"use client";

import { useActionState } from "react";
import { submitLead, type LeadActionState } from "@/lib/actions/leads";
import { PROJECT_TYPE_OPTIONS, BUDGET_RANGE_OPTIONS } from "@/lib/validation/lead";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldLabel = "font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground";
const underlineInput =
  "h-auto rounded-none border-0 border-b border-border bg-transparent px-0 pb-3 text-lg font-semibold focus-visible:border-brand focus-visible:ring-0 dark:bg-transparent";
const pill =
  "flex cursor-pointer items-center gap-2 rounded-full border border-brand/60 px-4 py-2 text-sm font-semibold transition-colors has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50";

const initialState: LeadActionState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-7 rounded-3xl border border-border p-8">
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
        <Label htmlFor="name" className={fieldLabel}>
          Your name *
        </Label>
        <Input id="name" name="name" required maxLength={200} className={underlineInput} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="whatsappNumber" className={fieldLabel}>
          WhatsApp number *
        </Label>
        <Input
          id="whatsappNumber"
          name="whatsappNumber"
          required
          maxLength={30}
          placeholder="+91-XXXXXXXXXX"
          className={underlineInput}
        />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className={cn("mb-1", fieldLabel)}>What do you need? *</legend>
        <div className="flex flex-wrap gap-3">
          {PROJECT_TYPE_OPTIONS.map((option) => (
            <label key={option} className={pill}>
              <input type="checkbox" name="projectTypes" value={option} className="sr-only" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className={cn("mb-1", fieldLabel)}>Budget range *</legend>
        <div className="flex flex-wrap gap-3">
          {BUDGET_RANGE_OPTIONS.map((option) => (
            <label key={option} className={pill}>
              <input type="radio" name="budgetRange" value={option} className="sr-only" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

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
        disabled={isPending}
        className="h-auto w-full rounded-full bg-brand px-8 py-4 text-base font-bold text-white hover:bg-brand-hover"
      >
        <span className="inline-flex items-center gap-2">
          {isPending ? "Sending..." : "Send my brief"} <span aria-hidden>&rarr;</span>
        </span>
      </Button>
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Note:</span> we reply within one working
        day. Your details stay with us — never shared, never sold.
      </p>
    </form>
  );
}
