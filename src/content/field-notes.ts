export interface FieldNote {
  caption: string;
  // Path under /public — e.g. "/images/field-notes/01-blockhash-live.jpg".
  // Left undefined until the matching file is dropped in, at which point
  // the Frame component swaps the placeholder text for the real photo.
  image?: string;
}

// Real, named, dated events — no stock photography. Drop matching files
// into public/images/field-notes/ using the names below, then set each
// entry's `image` to "/images/field-notes/<filename>".
export const FIELD_NOTES: FieldNote[] = [
  {
    caption: "BlockHash LIVE 2025 — Kerala Blockchain Academy",
    image: "/images/field-notes/01-blockhash-live-2025.jpg",
  },
  {
    caption: "The Big Hack '25 — Acharya Institutes, Bangalore",
    image: "/images/field-notes/02-the-big-hack-25.jpg",
  },
  { caption: "India FOSS 2025 — Bangalore" }, // 03-india-foss-2025.jpg
  { caption: "TinkerHub SCAS — Chaya & Pupzz" }, // 04-tinkerhub-scas.jpg
  { caption: "Best Useless Project — Vibe Coding Hackathon win" }, // 05-best-useless-project.jpg
  { caption: "TinkerHub Leads Selection Camp — Thiruvananthapuram" }, // 06-tinkerhub-leads-camp.jpg
  { caption: "Yukthi 2.0 — St. Mary's College" }, // 07-yukthi-2.jpg
  { caption: "Aroha '25 — SCMS" }, // 08-aroha-25.jpg
];
