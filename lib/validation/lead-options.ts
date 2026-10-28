// Plain constants, kept apart from the zod schema in lead.ts so the contact
// form can import them without pulling zod into the browser bundle.

export const PROJECT_TYPE_OPTIONS = [
  "Graphic Design",
  "Branding",
  "Social Media",
  "Presentation Design",
  "UI/UX Design",
  "Product Design",
  "Website Design",
] as const;

export const BUDGET_RANGE_OPTIONS = [
  "Under ₹50k",
  "₹50k – ₹1.5L",
  "₹1.5L – ₹5L",
  "₹5L+ / retainer",
] as const;
