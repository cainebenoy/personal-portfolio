export const ABOUT_BLOCK_1 = [
  `In eighth grade, my life had a shape I didn't question — school, friends, a routine I assumed would just continue. In ninth grade, my father lost his job, and in a few weeks that shape was in cardboard boxes. We moved back to Kerala — a "home" that felt foreign to a kid who'd only ever known the Gulf.`,
  "What stayed with me wasn't the move. It was watching my father hold the whole thing together — navigating a new school system, the financial stress, the culture shift — while making sure my sister and I never felt the fracture. He didn't just move us. He absorbed the chaos so we wouldn't have to.",
  "I think that's where I actually learned to be a generalist, long before I called it that. You don't get to specialize in a crisis. You figure out what needs doing, and you do it.",
];

export const ABOUT_BLOCK_2 = [
  "That's the thread running under everything on this site — the hackathons, the six trades, the fest wins, the community work. Not one deep skill, but the willingness to be new at something when it's needed. TinkerHub taught me that building a space for other people counts as building, too. Working with a film production company taught me that the same instinct — say yes, figure it out — scales into real, funded, shipped work.",
  "I'm graduating this year. I'm still doing the thing: showing up for whatever the problem actually needs, not just the part I'm already good at.",
];

// The line big enough to pull out of the text — the thesis of the memoir.
export const ABOUT_PULL_QUOTE =
  "You don't get to specialize in a crisis.";

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

// GitHub and LinkedIn are placeholders — swap in the real handles/URLs when
// ready. The email address is live.
export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "Email",
    value: "projects@crav.world",
    href: "mailto:projects@crav.world",
  },
  {
    label: "GitHub",
    value: "github.com/yourname",
    href: "https://github.com/yourname",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yourname",
    href: "https://linkedin.com/in/yourname",
  },
];

export const CONTACT_EMAIL = "projects@crav.world";
