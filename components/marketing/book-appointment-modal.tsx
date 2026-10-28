"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { CalendarClock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Loaded on first open: keeps the calendar, date-fns and select code out of
// the initial bundle of every page with a contact section.
const AppointmentForm = dynamic(() => import("@/components/marketing/appointment-form"), {
  loading: () => <p className="py-10 text-center text-sm text-muted-foreground">Loading…</p>,
});

export function BookAppointmentModal() {
  const [open, setOpen] = useState(false);
  const closeDialog = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Book an appointment"
          className="grid size-12 shrink-0 place-items-center rounded-full border border-white/30 text-foreground transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand hover:text-white"
          // Password managers / form-filler extensions tag buttons with
          // their own attribute (fdprocessedid) before React hydrates,
          // which React otherwise flags as a hydration mismatch.
          suppressHydrationWarning
        >
          <CalendarClock className="size-5" aria-hidden />
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book an appointment</DialogTitle>
          <DialogDescription>
            Pick a date and time that works for you — we&rsquo;ll confirm by email.
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm onSuccess={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
