"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { updatePassword, type AccountActionState } from "@/lib/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AccountActionState = { status: "idle" };

export function AccountSettingsForm({ email }: { email: string }) {
  const [state, formAction, isPending] = useActionState(updatePassword, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message ?? "Password updated.");
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast.error(state.message ?? "Something went wrong.");
    }
  }, [state]);

  return (
    <div className="flex max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input value={email} disabled readOnly />
      </div>

      <form ref={formRef} action={formAction} className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Change password
        </h2>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update password"}
        </Button>
      </form>
    </div>
  );
}
