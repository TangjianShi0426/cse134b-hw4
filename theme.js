
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#theme-toggle");

    if (!button) return;

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        button.textContent =
            theme === "dark"
                ? "Switch to Light Mode"
                : "Switch to Dark Mode";

        button.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
        );
    }

    let savedTheme = "light";

    try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
            savedTheme = stored;
        }
    } catch (error) {
        console.warn("Theme storage unavailable.", error);
    }

    applyTheme(savedTheme);

    button.addEventListener("click", () => {
        const current =
            document.documentElement.dataset.theme;

        const next = current === "dark" ? "light" : "dark";

        applyTheme(next);

        try {
            localStorage.setItem("theme", next);
        } catch (error) {
            console.warn("Could not save theme.", error);
        }
    });
});
