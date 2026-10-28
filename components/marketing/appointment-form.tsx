"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConsentCheckbox } from "@/components/marketing/consent-checkbox";
import { submitAppointment, type AppointmentActionState } from "@/lib/actions/appointments";
import { TIME_SLOTS, TIME_SLOT_LABELS } from "@/lib/validation/appointment-options";
import { cn } from "@/lib/utils";

const initialState: AppointmentActionState = { status: "idle" };
const fieldLabel = "font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground";

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * The booking form inside BookAppointmentModal. Kept in its own module and
 * loaded with next/dynamic only when the dialog opens, so the calendar,
 * date-fns and select code stay out of every page that shows the contact
 * section. It mounts fresh on each open (dialog content unmounts on close).
 */
export default function AppointmentForm({ onSuccess }: { onSuccess: () => void }) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(submitAppointment, initialState);

  // Set when the form mounts (i.e. when the dialog opens, not on page load),
  // written imperatively to an uncontrolled input — the server rejects a
  // submission that arrives faster than a human could plausibly pick a date
  // and fill this form out.
  const stampFormRenderedAt = useCallback((input: HTMLInputElement | null) => {
    if (input) input.value = String(Date.now());
  }, []);

  // Close the modal a beat after a successful submission so the confirmation
  // message is still readable before it disappears.
  useEffect(() => {
    if (state.status !== "success") return;
    const timer = setTimeout(onSuccess, 1800);
    return () => clearTimeout(timer);
  }, [state.status, onSuccess]);

  return (
    <form action={formAction} className="flex flex-col gap-3.5">
      {/* Honeypot: hidden from real visitors, so any bot that fills it out gets rejected server-side. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden
      />
      <input type="hidden" name="formRenderedAt" ref={stampFormRenderedAt} />
      <input type="hidden" name="preferredDate" value={date ? format(date, "yyyy-MM-dd") : ""} />

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="appt-name" className={fieldLabel}>
            Your name *
          </Label>
          <Input id="appt-name" name="name" required maxLength={200} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="appt-email" className={fieldLabel}>
            Email *
          </Label>
          <Input id="appt-email" name="email" type="email" required maxLength={200} />
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="appt-date" className={fieldLabel}>
            Preferred date *
          </Label>
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                id="appt-date"
                type="button"
                variant="outline"
                className={cn(
                  "h-8 w-full justify-start rounded-lg border-input bg-transparent px-2.5 font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="size-4 shrink-0" aria-hidden />
                <span className="truncate">
                  {date ? format(date, "EEE, d MMM yyyy") : "Select a date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(value) => {
                  setDate(value);
                  setDatePickerOpen(false);
                }}
                disabled={{ before: startOfToday() }}
                autoFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="appt-time" className={fieldLabel}>
            Preferred time *
          </Label>
          <Select name="timeSlot" required>
            <SelectTrigger id="appt-time" className="w-full">
              <SelectValue placeholder="Select a time" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {TIME_SLOT_LABELS[slot]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="appt-notes" className={fieldLabel}>
          What would you like to discuss?
        </Label>
        <Textarea id="appt-notes" name="notes" maxLength={1000} rows={2} />
      </div>

      <ConsentCheckbox id="appt-consent" purpose="to arrange this meeting" className="text-xs" />

      {state.status !== "idle" && (
        <p
          className={cn("text-sm", state.status === "success" ? "text-emerald-400" : "text-destructive")}
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-auto w-full rounded-full bg-brand px-8 py-2.5 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-brand-hover active:scale-[0.98]"
      >
        {isPending ? "Sending..." : "Request appointment"}
      </Button>
    </form>
  );
}
