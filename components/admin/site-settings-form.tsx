"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { saveSiteSettings, type ContentActionState } from "@/lib/actions/content";
import type { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

const initialState: ContentActionState = { status: "idle" };

function Field({
  name,
  label,
  defaultValue,
  textarea,
  required,
}: {
  name: keyof SiteSettings;
  label: string;
  defaultValue: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      {textarea ? (
        <Textarea id={name} name={name} rows={3} defaultValue={defaultValue} required={required} />
      ) : (
        <Input id={name} name={name} defaultValue={defaultValue} required={required} />
      )}
    </div>
  );
}

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, isPending] = useActionState(saveSiteSettings, initialState);

  useEffect(() => {
    if (state.status === "success") toast.success(state.message ?? "Saved.");
    else if (state.status === "error") toast.error(state.message ?? "Something went wrong.");
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Hero
        </h2>
        <Field name="hero_eyebrow" label="Eyebrow" defaultValue={settings.hero_eyebrow} />
        <Field name="hero_heading" label="Heading" defaultValue={settings.hero_heading} required />
        <Field name="hero_subheading" label="Subheading" defaultValue={settings.hero_subheading} textarea />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            name="hero_cta_primary_label"
            label="Primary CTA label"
            defaultValue={settings.hero_cta_primary_label}
          />
          <Field
            name="hero_cta_primary_href"
            label="Primary CTA link"
            defaultValue={settings.hero_cta_primary_href}
          />
          <Field
            name="hero_cta_secondary_label"
            label="Secondary CTA label"
            defaultValue={settings.hero_cta_secondary_label}
          />
          <Field
            name="hero_cta_secondary_href"
            label="Secondary CTA link"
            defaultValue={settings.hero_cta_secondary_href}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Why Pixora
        </h2>
        <Field name="why_heading" label="Heading" defaultValue={settings.why_heading} required />
        <Field name="why_subheading" label="Subheading" defaultValue={settings.why_subheading} />
        <Field name="why_body" label="Body" defaultValue={settings.why_body} textarea />
        <p className="text-xs text-muted-foreground">
          The three principles listed under this section are managed in the “Why principles” tab.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Selected work
        </h2>
        <Field name="work_heading" label="Heading" defaultValue={settings.work_heading} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Capabilities
        </h2>
        <Field
          name="capabilities_heading"
          label="Heading"
          defaultValue={settings.capabilities_heading}
        />
        <Field
          name="capabilities_subheading"
          label="Subheading"
          defaultValue={settings.capabilities_subheading}
          textarea
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Process
        </h2>
        <Field name="process_heading" label="Heading" defaultValue={settings.process_heading} />
        <Field
          name="process_subheading"
          label="Subheading"
          defaultValue={settings.process_subheading}
          textarea
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Start a project
        </h2>
        <Field name="contact_heading" label="Heading" defaultValue={settings.contact_heading} />
        <Field
          name="contact_subheading"
          label="Subheading"
          defaultValue={settings.contact_subheading}
          textarea
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Contact & footer
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="contact_whatsapp" label="WhatsApp number" defaultValue={settings.contact_whatsapp} />
          <Field name="contact_email" label="Contact email" defaultValue={settings.contact_email} />
          <Field name="contact_hours" label="Contact hours" defaultValue={settings.contact_hours} />
          <Field name="social_instagram" label="Instagram URL" defaultValue={settings.social_instagram} />
          <Field name="social_linkedin" label="LinkedIn URL" defaultValue={settings.social_linkedin} />
        </div>
        <Field name="footer_tagline" label="Footer tagline" defaultValue={settings.footer_tagline} textarea />
      </section>

      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save site copy"}
        </Button>
      </div>
    </form>
  );
}
