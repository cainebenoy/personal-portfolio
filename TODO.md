# To do

Content slots waiting on real material — each one is a small data edit once
the facts are in hand. The site renders cleanly without them.

- [ ] **Exact degree name** — replace the "Undergraduate — Class of 2026"
      placeholder in `src/content/education.ts` (also feeds `/resume`).
- [ ] **Project links** — live/repo URLs per project in
      `src/content/projects.ts` (`links: { live, repo }`); buttons appear
      automatically.
- [ ] **Remaining citations** — 7 of the 9 wins still unnamed in
      `src/content/citations.ts`.
- [ ] **GitHub / LinkedIn handles** — placeholders in
      `src/content/about.ts` (`CONTACT_LINKS`).
- [ ] **Letters of record** — collect 2–3 short quotes (TinkerHub
      organizer, teammate, event lead) for `src/content/letters.ts`; the
      About section shows them automatically.
- [ ] **Field-notes photos** — the six pending event shots listed in
      `src/content/field-notes.ts`; also: the two files currently in
      `public/images/field-notes/` are portraits captioned as event photos —
      replace or re-caption.
- [ ] **Better-lit portrait** — swap `public/images/portrait.jpg` when a
      good print exists; rerun `scripts/make-resume.mjs` after resume-related
      content changes.
- [ ] **TruthChain event/date** — `context` field in
      `src/content/projects.ts`.

## Later (features parked by choice)

- [ ] **Deploy + real domain** — `SITE_URL` in `src/lib/site.ts` is a
      placeholder; deploy, point the domain, verify the OG card in a link
      preview.
- [ ] **Blog / build logs** — only once there's appetite to write; an empty
      blog is worse than none.
- [ ] **/uses ("The Bench")** — needs the actual gear/tools list.
- [ ] **Contact form** — mailto works for now; needs a form service +
      spam handling if revisited.
- [ ] **Live status widgets / GitHub activity embed** — needs accounts and
      the real GitHub handle first.
- [ ] **JSON-LD Person schema + analytics** — best done alongside the
      deploy.
