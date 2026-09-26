import { z } from "zod";

/** Pairs with <ConsentCheckbox>: an unchecked checkbox isn't sent at all, a
 * checked one is sent as "on". Checked on the server as well as via the
 * `required` attribute, so a submission can't skip consent by bypassing the
 * form. */
export const consentField = z.literal("on", {
  message: "Please accept the Privacy Policy and Terms of Use to continue.",
});
