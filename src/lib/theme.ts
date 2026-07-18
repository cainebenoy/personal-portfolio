export const THEME_STORAGE_KEY = "theme";

// Runs before hydration (see app/layout.tsx) so returning dark-mode
// visitors never see a paper flash. Light is the default — this only ever
// does something for users who've switched to dark before.
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    if (localStorage.getItem("${THEME_STORAGE_KEY}") === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

// The <html> class list is the single source of truth for the active theme;
// these helpers are shared by the header toggle and the command palette.

export function isDarkTheme() {
  return document.documentElement.classList.contains("dark");
}

export function toggleTheme() {
  const next = !isDarkTheme();
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
  } catch {
    // Private mode — the choice just won't persist.
  }
  return next;
}

export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}
