export const THEME_STORAGE_KEY = "theme";

// Runs before hydration (see app/layout.tsx) to avoid a light->dark flash
// for returning visitors. Default is always light — no system-preference
// fallback — so this only ever does something for users who've toggled
// dark mode before.
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    if (localStorage.getItem("${THEME_STORAGE_KEY}") === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;
