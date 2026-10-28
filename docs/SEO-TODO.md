# SEO: what's left for the studio

Everything the code side of the SEO strategy report could do is done (phases 1–3). What's below needs
access, decisions or facts only the studio has. Work top to bottom: items are ordered by impact.

Legend: **[Admin]** = Admin panel · **[Code]** = edit a file in this repo · **[Host]** = hosting/env vars ·
**[Outside]** = an external website or account

---

## 1. Before the next deploy (blocking)

- [ ] **Move the SEO report out of `public/`.** [Code] `public/Pixora_Studio_SEO_Strategy_Report.pdf` is
  served publicly at `/Pixora_Studio_SEO_Strategy_Report.pdf` and is marked confidential. Move it outside
  `public/` (e.g. to `docs/`, or keep it off the repo entirely).
- [ ] **Set the production site URL.** [Host] `NEXT_PUBLIC_SITE_URL=https://www.pixorastudios.co.in`.
  Canonical links, the sitemap, `robots.txt`, Open Graph and structured data all use it. Today it falls back
  to `http://localhost:3000`.
- [ ] **One canonical host with HTTPS.** [Host] Make sure `pixorastudios.co.in` 301-redirects to
  `https://www.pixorastudios.co.in` (or the reverse, but match `NEXT_PUBLIC_SITE_URL`). On Vercel: Project →
  Domains → set the redirect.

## 2. Admin panel content

- [ ] **Hero heading with "in Patna".** [Admin → Content] Change to
  `Bihar's 1st Research-Driven Design Studio, in Patna.` The live database row overrides the code default.
- [ ] **Add "Website Design" as a capability.** [Admin → Content → Capabilities] The homepage shows the first
  6 capabilities, and Website Design isn't one of them. Add it and drag it into the top 6 (e.g. replace
  Presentation Design, which also has a page via the footer). Use the exact title `Website Design` so the card
  links to its service page.
- [ ] **Clean the LinkedIn URL.** [Admin → Settings] It's saved as
  `https://www.linkedin.com/company/pixora-studio-1/?viewAsMember=true`. Remove `?viewAsMember=true`. It's
  used in the footer and in the homepage structured data.
- [ ] **Domain email.** [Admin → Settings] Switch `pixorastudio8@gmail.com` to e.g. `hello@pixorastudios.co.in`
  (create the mailbox first). The report rates this as a trust signal.

## 3. Facts only the studio can supply

- [ ] **Founder details.** [Code] `lib/content/about.ts`: name, role, photo (put it in `public/`), 2–3 bio
  paragraphs, LinkedIn. The founder section on `/about` stays hidden until `name` is set. The report mentions
  4+ years of product design experience; say it in the bio if it's accurate. The founder's name also becomes
  the blog author automatically.
- [ ] **Founding year.** [Code] `lib/content/about.ts` → `foundedYear`.
- [ ] **Back up the "Bihar's 1st" claim.** [Code] `lib/content/about.ts` → `firstStudioBasis`, one line on
  what makes it true (report section 16 flags unsupported claims). If it can't be backed up, soften the hero
  wording in Admin.
- [ ] **Write the three case studies.** [Code] `lib/content/case-studies.ts`: Naturals, Invira Global,
  TVS Future. Replace every `TODO:` line with real content (problem, research, process, solution, location),
  add one measurable `result` and/or a client `testimonial`, then set `published: true`. Preview locally
  with `pnpm dev` → `/work/naturals` (drafts show with highlighted placeholders). Published case studies
  join the sitemap and get linked from service pages and `/work` automatically. Never publish invented
  numbers or quotes.
- [ ] **"Starting from" prices.** [Code] `lib/content/services.ts` → `startingFrom` on each service, e.g.
  `"₹25,000"`. They show on each service page and on `/pricing`. Until set, those pages say "Fixed quote per
  project".
- [ ] **Confirm the pricing page copy.** [Code] `app/(marketing)/pricing/page.tsx`:
  - The `BANDS` descriptions (which projects fall in which budget band) are my reading of the homepage FAQ
    and the form's budget options. Correct them if they're wrong.
  - The FAQ answer says third-party costs (printing, stock photos, fonts, hosting) aren't included unless
    quoted. Confirm that's how you work.
- [ ] **Testimonials.** [Code] Collect 3+ (report section 2). Add them to case studies first
  (`testimonial` field). If you want them on the homepage or service pages too, ask for a testimonials
  block.
- [ ] **Local client examples on industry pages.** [Code] `lib/content/industries.ts`: once you have
  coaching institute or school clients, name them (with permission) in the copy.
- [ ] **Review all drafted copy.** [Code] I wrote the service pages (`lib/content/services.ts`), industry
  pages (`lib/content/industries.ts`), About page pillars and the four blog posts (`lib/content/blog.ts`)
  from the existing site copy and the report. Read them through and adjust anything that doesn't match how
  you work. In particular check:
  - Timelines. They reuse the homepage FAQ: identity 2–3 weeks, websites 3–5, product 6–10, kits and decks
    in days.
  - The 50% advance and same-week kickoff terms.
  - That you design iOS/Android apps, and offer retainers.

## 4. Search engines and analytics

- [ ] **Google Search Console.** [Outside + Host] Add the property, choose the HTML tag method, and copy only
  the `content` value into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Redeploy, verify, then submit
  `https://www.pixorastudios.co.in/sitemap.xml`. Check it weekly.
- [ ] **Bing Webmaster Tools.** [Outside + Host] Same flow (or import from Search Console). The meta tag
  value goes in `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
- [ ] **Validate structured data.** [Outside] Run the homepage, one service page and one blog post through
  Google's Rich Results Test and validator.schema.org after deploying.
- [ ] **PageSpeed check.** [Outside] Test the homepage and a service page on mobile in PageSpeed Insights.
  `public/hero-bg.png` (4.2 MB) is served optimised through next/image, but a smaller source would still
  help.
- [ ] **GA4 (only after updating the Privacy Policy).** [Code + Host] The Privacy Policy currently says the
  site uses no analytics cookies, so GA4 is built in but switched off. To turn it on:
  1. Update the cookies section in `app/(marketing)/privacy-policy/page.tsx` to disclose Google Analytics,
     and bump `LEGAL.lastUpdated` in `lib/content/legal.ts`.
  2. Decide whether you need a consent banner. Get advice for your situation under the DPDP Act.
  3. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`.

  `whatsapp_click`, `phone_click`, `email_click` and `form_submit` are then sent automatically. Mark them as
  key events in GA4. The thank-you page (`/thank-you`) also works as a conversion URL.

## 5. Off-site (no code)

From the report's sections 8, 12 and 13. These drive local rankings more than anything on the site.

- [ ] **Google Business Profile.** Exact name "Pixora Studio". Category: Graphic designer / Design agency.
  Set it up as a service-area business (Patna + Bihar), with phone +91-8083019809, website, hours Mon–Sat
  10:00–18:00, WhatsApp link, all services, 10+ real photos. Post weekly and seed the Q&A from the FAQs. Once
  it's live, paste its share link into `googleBusinessProfile` in `lib/content/about.ts`. That adds a "Find us
  on Google" footer link and the homepage structured-data `sameAs` entry automatically.
- [ ] **Reviews.** Aim for 10 genuine Google reviews in 60 days. Ask at delivery (template in the report,
  Appendix B). Never buy or gate reviews.
- [ ] **Citations, with the same name, phone and website everywhere.** Justdial, Sulekha, IndiaMART, Bing
  Places, TechBehemoths, Clutch, GoodFirms, DesignRush.
- [ ] **Portfolio platforms.** Behance and Dribbble case studies linking back to `/work/...` once those pages
  are published. Keep the LinkedIn company page and Instagram active.
- [ ] **Backlinks.** "Designed by Pixora Studio" footer links on client sites; local media/startup pitches;
  incubator and college workshops.
- [ ] **Lead generation alongside SEO.** 20 free brand-audit WhatsApp messages; a 30-day Google Ads search test
  pointing at the matching service page (not the homepage), using the negative keywords from the report.

## 6. Content calendar (ongoing)

Seven posts are live:
- Research process
- What is brand identity
- UI vs UX
- Coaching institute checklist
- How to choose a design agency
- Investor pitch deck, slide by slide
- Business ke liye logo kaise banwaye (Hinglish)

Four industry pages are live: coaching institutes, schools, real estate, healthcare. Each new entry in
`lib/content/blog.ts` or `lib/content/industries.ts` is picked up by its index page and the sitemap
automatically.

- [ ] **Review the new copy.** Three posts and two industry pages were added in phase 4. Read them through
  like the earlier drafts. The Hinglish post especially should sound like how you talk to clients.
- [ ] Logo design cost in India (pricing guide). Needs your real price ranges.
- [ ] Website design cost in Patna (pricing guide). Needs your real price ranges.
- [ ] Behind the scenes: the Pixora Studio brand identity (case study). Needs your own process and sketches.
- [ ] Add local client examples to the industry pages as soon as you have them. Don't add more city or
  industry pages without copy written specifically for each.
- [ ] Month 3: review Search Console. Improve pages with many impressions but few clicks (titles and
  descriptions first).
