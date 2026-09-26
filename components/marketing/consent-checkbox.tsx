import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Mandatory consent checkbox for the public forms, so every enquiry comes
 * with explicit, informed consent under the DPDP Act. The links open in a new
 * tab so reading the policy doesn't lose what's been typed into the form.
 */
export function ConsentCheckbox({ id, purpose, className }: { id: string; purpose: string; className?: string }) {
  return (
    <label htmlFor={id} className={cn("flex cursor-pointer items-start gap-3 text-sm text-muted-foreground", className)}>
      <input
        id={id}
        type="checkbox"
        name="consent"
        required
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand"
        suppressHydrationWarning
      />
      <span>
        I agree to the{" "}
        <Link href="/privacy-policy" target="_blank" className="text-brand hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms-of-use" target="_blank" className="text-brand hover:underline">
          Terms of Use
        </Link>
        , and consent to my details being used {purpose}. *
      </span>
    </label>
  );
}
