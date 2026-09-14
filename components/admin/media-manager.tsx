"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveSiteImage, type MediaActionState } from "@/lib/actions/media";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type SiteImageSlot = {
  slot: "hero" | "about_office" | "cta_banner";
  label: string;
  url: string;
  altText: string;
};

const initialState: MediaActionState = { status: "idle" };

function SiteImageCard({ slot, label, url, altText }: SiteImageSlot) {
  const [state, formAction, isPending] = useActionState(saveSiteImage, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message ?? "Saved.");
      router.refresh();
    } else if (state.status === "error") {
      toast.error(state.message ?? "Something went wrong.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="slot" value={slot} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={altText} className="h-40 w-full rounded-md object-cover" />

          <div className="flex flex-col gap-2">
            <Label htmlFor={`${slot}-image`}>Replace image</Label>
            <Input id={`${slot}-image`} name="image" type="file" accept="image/*" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`${slot}-alt`}>Alt text</Label>
            <Input id={`${slot}-alt`} name="altText" defaultValue={altText} />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function MediaManager({ slots }: { slots: SiteImageSlot[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {slots.map((slot) => (
        <SiteImageCard key={slot.slot} {...slot} />
      ))}
    </div>
  );
}
