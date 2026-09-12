/**
 * Placeholder Supabase database types. Replace this file by running, once the
 * schema in supabase/migrations has been applied to your project:
 *
 *   npx supabase gen types typescript --project-id <project-ref> > types/database.ts
 *
 * Until then this keeps the Supabase client generics (Database) type-checking
 * without lying about columns that don't exist yet.
 */
export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
