import BackToMapLink from "@/components/BackToMapLink";
import RevealOnScroll from "@/components/RevealOnScroll";
import TapedPhoto from "@/components/TapedPhoto";
import {
  ABOUT_BLOCK_1,
  ABOUT_BLOCK_2,
  ABOUT_CLOSING_LINE,
  CONTACT_LINKS,
} from "@/content/about";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto min-h-dvh max-w-2xl scroll-mt-6 px-6 py-24"
    >
      <RevealOnScroll>
        <BackToMapLink />
      </RevealOnScroll>

      <RevealOnScroll className="mt-12">
        <TapedPhoto
          alt="a personal photo, taped in"
          aspectClassName="aspect-[4/3]"
          className="mx-auto w-full max-w-md"
        />
      </RevealOnScroll>

      <div className="mt-20 flex flex-col gap-16">
        <RevealOnScroll className="flex flex-col gap-6">
          {ABOUT_BLOCK_1.map((paragraph, i) => (
            <p key={i} className="font-structural leading-8 text-ink">
              {paragraph}
            </p>
          ))}
        </RevealOnScroll>

        <RevealOnScroll className="flex flex-col gap-6">
          {ABOUT_BLOCK_2.map((paragraph, i) => (
            <p key={i} className="font-structural leading-8 text-ink">
              {paragraph}
            </p>
          ))}
        </RevealOnScroll>

        <RevealOnScroll className="mt-4">
          <p className="font-structural text-sm text-ink/70">
            {ABOUT_CLOSING_LINE}
          </p>
        </RevealOnScroll>
      </div>

      <RevealOnScroll className="mt-24 flex flex-col gap-3">
        {CONTACT_LINKS.map((link) => (
          <div key={link.label} className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 font-handwritten text-sm text-accent">
              {link.label}
            </span>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-structural text-sm text-ink underline underline-offset-4 hover:text-accent"
            >
              {link.value}
            </a>
          </div>
        ))}
      </RevealOnScroll>

      <div className="mt-20">
        <BackToMapLink />
      </div>
    </section>
  );
}
