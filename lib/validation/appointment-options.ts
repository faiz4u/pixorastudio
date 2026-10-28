// Plain constants, kept apart from the zod schema in appointment.ts so client
// components can import them without pulling zod into the browser bundle.

export const TIME_SLOTS = ["morning", "afternoon", "evening"] as const;

// Matches the default working hours (Mon-Sat, 10:00-18:00 IST) split into
// three two/three-hour windows.
export const TIME_SLOT_LABELS: Record<(typeof TIME_SLOTS)[number], string> = {
  morning: "10:00 AM – 12:00 PM IST",
  afternoon: "12:00 PM – 3:00 PM IST",
  evening: "3:00 PM – 6:00 PM IST",
};
