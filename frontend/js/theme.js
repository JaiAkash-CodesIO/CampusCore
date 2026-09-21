// Immediate theme initialization to prevent flash of wrong theme
(function () {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    
    document.documentElement.setAttribute("data-theme", initialTheme);
})();

// Wire up theme toggles once DOM loads
document.addEventListener("DOMContentLoaded", function () {
    const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");

    function updateTheme(newTheme) {
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            updateTheme(nextTheme);
        });
    });
});
