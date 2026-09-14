"use server";

import { createClient } from "@/lib/supabase/server";
import { passwordSchema } from "@/lib/validation/account";

export type AccountActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function updatePassword(
  _prevState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const parsed = passwordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { status: "error", message: error.message };

  return { status: "success", message: "Password updated." };
}
