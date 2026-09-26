"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveSiteImage, type MediaActionState } from "@/lib/actions/media";
import { formatFileSize, IMAGE_ACCEPT, validateSiteImageFile } from "@/lib/validation/media";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type SiteImageSlot = {
  slot: "logo" | "hero" | "about_office" | "cta_banner";
  label: string;
  url: string;
  altText: string;
};

const initialState: MediaActionState = { status: "idle" };

type SelectedFile = { previewUrl: string; name: string; size: number };

function SiteImageCard({ slot, label, url, altText }: SiteImageSlot) {
  const [state, formAction, isPending] = useActionState(saveSiteImage, initialState);
  const [selected, setSelected] = useState<SelectedFile | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const router = useRouter();

  // Free the blob URL when the selection changes or the card unmounts.
  useEffect(() => {
    if (!selected) return;
    return () => URL.revokeObjectURL(selected.previewUrl);
  }, [selected]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setSelected(null);
      setFileError(null);
      return;
    }

    const error = validateSiteImageFile(file);
    if (error) {
      // Drop the rejected file so the input, preview and Save button agree.
      event.target.value = "";
      setSelected(null);
      setFileError(error);
      return;
    }

    setFileError(null);
    setSelected({ previewUrl: URL.createObjectURL(file), name: file.name, size: file.size });
  }

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
        <form
          action={formAction}
          onReset={() => {
            setSelected(null);
            setFileError(null);
          }}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="slot" value={slot} />
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selected?.previewUrl ?? url}
              alt={selected ? `Preview of ${selected.name}` : altText}
              className={`h-40 w-full rounded-md ${
                slot === "logo" ? "bg-background object-contain p-4" : "object-cover"
              }`}
            />
            {selected && (
              <span className="absolute left-2 top-2 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-white">
                Preview — not saved yet
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`${slot}-image`}>Replace image</Label>
            <Input
              id={`${slot}-image`}
              name="image"
              type="file"
              accept={IMAGE_ACCEPT}
              onChange={handleFileChange}
              aria-invalid={fileError ? true : undefined}
            />
            {selected && (
              <p className="truncate text-xs text-muted-foreground">
                {selected.name} · {formatFileSize(selected.size)}
              </p>
            )}
            {fileError && (
              <p role="alert" className="text-xs text-destructive">
                {fileError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`${slot}-alt`}>Alt text</Label>
            <Input id={`${slot}-alt`} name="altText" defaultValue={altText} />
          </div>

          <Button type="submit" disabled={isPending || Boolean(fileError)} className="w-full">
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
