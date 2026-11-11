
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contact-form");
    if (!form) return;

    const fields = [
        document.querySelector("#name"),
        document.querySelector("#email"),
        document.querySelector("#comments")
    ];

    const comments = document.querySelector("#comments");
    const counter = document.querySelector("#comments-count");

    const formErrors = [];
    const attempted = new Set();
    const edited = new Set();

    // JavaScript handles validation when enabled.
    // Without JavaScript, native HTML validation still works.
    form.noValidate = true;

    // Create the hidden field for error history.
    const historyInput = document.createElement("input");
    historyInput.type = "hidden";
    historyInput.name = "form_errors";
    historyInput.id = "form_errors";
    historyInput.value = "[]";
    form.appendChild(historyInput);

    // Return a helpful error message for each field.
    function getError(field) {
        const value = field.value.trim();

        if (field.required && value.length === 0) {
            return `${field.labels[0].textContent.replace(
                " (required)", ""
            )} is required.`;
        }

        if (field.id === "name") {
            if (field.value.length > 100) {
                return "Name must not exceed 100 characters.";
            }
        }

        if (field.id === "email") {
            if (field.validity.typeMismatch) {
                return "Enter a valid email address, such as name@example.com.";
            }
        }

        if (field.id === "comments") {
            if (field.value.length < 10) {
                return "Comments must contain at least 10 characters.";
            }

            if (field.value.length > 1000) {
                return "Comments must not exceed 1000 characters.";
            }
        }

        return "";
    }

    // Update custom validity and the accessible error.
    function validateField(field, showError = false) {
        field.setCustomValidity("");

        const message = getError(field);
        field.setCustomValidity(message);

        const errorElement = document.querySelector(
            `#${field.id}-error`
        );

        if (showError && message) {
            errorElement.textContent = message;
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
            field.setAttribute("aria-invalid", "true");
        } else {
            errorElement.textContent = "";
            field.classList.remove("is-invalid");
            field.removeAttribute("aria-invalid");

            if (!message && edited.has(field.id)) {
                field.classList.add("is-valid");
            } else {
                field.classList.remove("is-valid");
            }
        }

        return field.checkValidity();
    }

    // Live character counter.
    function updateCounter() {
        const maxLength = comments.maxLength;
        const remaining = maxLength - comments.value.length;

        if (remaining === 0) {
            counter.textContent =
                "Character limit reached. No more characters can be entered.";
            counter.className = "character-count count-limit";
        } else if (remaining <= 100) {
            counter.textContent =
                `Warning: only ${remaining} characters remaining.`;
            counter.className = "character-count count-warning";
        } else {
            counter.textContent =
                `${remaining} characters remaining.`;
            counter.className = "character-count";
        }
    }

    // Validate after users edit or leave a field.
    fields.forEach((field) => {
        field.addEventListener("input", () => {
            edited.add(field.id);

            const showError =
                attempted.has(field.id) ||
                field.classList.contains("is-invalid");

            validateField(field, showError);

            if (field === comments) {
                updateCounter();
            }
        });

        field.addEventListener("blur", () => {
            attempted.add(field.id);
            validateField(field, true);
        });
    });

    // Record errors once per failed submission attempt.
    form.addEventListener("submit", (event) => {
        const currentErrors = [];
        let firstInvalid = null;

        fields.forEach((field) => {
            attempted.add(field.id);

            const valid = validateField(field, true);

            if (!valid) {
                if (!firstInvalid) {
                    firstInvalid = field;
                }

                const errorElement = document.querySelector(
                    `#${field.id}-error`
                );

                currentErrors.push({
                    field: field.name,
                    message: errorElement.textContent
                });
            }
        });

        if (currentErrors.length > 0) {
            event.preventDefault();

            currentErrors.forEach((error) => {
                formErrors.push({
                    field: error.field,
                    message: error.message
                });
            });

            historyInput.value = JSON.stringify(formErrors);

            if (firstInvalid) {
                firstInvalid.focus();
            }

            return;
        }

        // Keep previous errors, and submit as normal POST.
        historyInput.value = JSON.stringify(formErrors);
    });

    updateCounter();
});
