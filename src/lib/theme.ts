export const THEME_STORAGE_KEY = "theme";

// Runs before hydration (see app/layout.tsx) so returning light-mode
// visitors never see a dark flash. Dark is the default — the <html> element
// ships with .dark — so this only ever does something for users who've
// switched to light before.
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    if (localStorage.getItem("${THEME_STORAGE_KEY}") === "light") {
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {}
})();
`;
