/**
 * Facts for /about that only the studio can supply. Anything left empty is
 * simply not rendered, so the page reads correctly before it's filled in.
 * The SEO report (section 2) rates a founder bio and photo as high impact for
 * trust: fill these in first.
 */
export const ABOUT = {
  founder: {
    /** e.g. "Aarav Kumar". The founder section is hidden while this is empty. */
    name: "",
    role: "Founder & Design Lead",
    /** Path in /public, e.g. "/founder.jpg" (square, at least 800×800). */
    photo: "",
    /** Two or three short paragraphs: background, why Pixora, how they work. */
    bio: [] as string[],
    /** Optional LinkedIn profile URL. */
    linkedin: "",
  },
  /**
   * Google Business Profile link (the "Share" link from the profile, e.g.
   * https://maps.app.goo.gl/...). When set, it's shown in the footer and
   * added to the homepage structured data's sameAs.
   */
  googleBusinessProfile: "",
  /** Year the studio was founded, e.g. "2024". Hidden while empty. */
  foundedYear: "",
  /**
   * One line that substantiates the "Bihar's 1st research-driven design
   * studio" claim (SEO report: unsupported claims are a risk). Hidden while
   * empty.
   */
  firstStudioBasis: "",
};
