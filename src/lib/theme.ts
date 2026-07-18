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
