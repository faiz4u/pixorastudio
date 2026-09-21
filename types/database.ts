/**
 * Hand-written types mirroring supabase/migrations/0001_init_schema.sql.
 * If you have the Supabase CLI linked to the project, prefer regenerating
 * this from the live schema instead of editing by hand after a migration:
 *
 *   npx supabase gen types typescript --project-id <project-ref> > types/database.ts
 */

export type PortfolioCategory = "branding" | "social" | "ui_ux" | "product";
export type LeadStatus = "new" | "contacted" | "archived";

export type Database = {
  public: {
    Tables: {
      portfolio_projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: PortfolioCategory;
          client_name: string | null;
          description: string | null;
          cover_image_path: string | null;
          gallery: string[];
          tags: string[];
          is_featured: boolean;
          display_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: PortfolioCategory;
          client_name?: string | null;
          description?: string | null;
          cover_image_path?: string | null;
          gallery?: string[];
          tags?: string[];
          is_featured?: boolean;
          display_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["portfolio_projects"]["Insert"]>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string;
          whatsapp_number: string;
          project_types: string[];
          budget_range: string | null;
          message: string | null;
          status: LeadStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          whatsapp_number: string;
          project_types?: string[];
          budget_range?: string | null;
          message?: string | null;
          status?: LeadStatus;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: number;
          hero_eyebrow: string;
          hero_heading: string;
          hero_subheading: string;
          hero_cta_primary_label: string;
          hero_cta_primary_href: string;
          hero_cta_secondary_label: string;
          hero_cta_secondary_href: string;
          why_heading: string;
          why_subheading: string;
          why_body: string;
          work_heading: string;
          capabilities_heading: string;
          capabilities_subheading: string;
          process_heading: string;
          process_subheading: string;
          contact_heading: string;
          contact_subheading: string;
          contact_whatsapp: string;
          contact_email: string;
          contact_hours: string;
          footer_tagline: string;
          social_instagram: string;
          social_linkedin: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]> & { id: 1 };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Relationships: [];
      };
      capabilities: {
        Row: {
          id: string;
          title: string;
          description: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["capabilities"]["Insert"]>;
        Relationships: [];
      };
      process_steps: {
        Row: {
          id: string;
          title: string;
          description: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["process_steps"]["Insert"]>;
        Relationships: [];
      };
      why_principles: {
        Row: {
          id: string;
          title: string;
          description: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["why_principles"]["Insert"]>;
        Relationships: [];
      };
      faq_items: {
        Row: {
          id: string;
          question: string;
          answer: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["faq_items"]["Insert"]>;
        Relationships: [];
      };
      site_images: {
        Row: {
          slot: string;
          storage_path: string;
          alt_text: string;
          updated_at: string;
        };
        Insert: {
          slot: string;
          storage_path: string;
          alt_text?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_images"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
