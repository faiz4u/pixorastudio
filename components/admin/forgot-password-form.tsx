"use client";

import { useActionState } from "react";
import { requestPasswordReset, type PasswordResetActionState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const initialState: PasswordResetActionState = { status: "idle" };

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, initialState);

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      {state.status !== "idle" && (
        <p className={cn("text-sm", state.status === "success" ? "text-emerald-400" : "text-destructive")}>
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
}
