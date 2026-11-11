
# CSE 134B - Homework 4

**Student:** Tangjian Shi  
**Course:** CSE 134B - Web Client Languages  
**Assignment:** HW4 - Introducing JavaScript and Applying Progressive Enhancement

## Repository

https://github.com/TangjianShi0426/cse134b-hw4

## Deployed Website

https://tangjian-cse134b-hw4.netlify.app/

## Homework 4 Implementation

### Part 1 - HTML and CSS Contact Form

Created `form-no-js.html` using semantic HTML and responsive CSS.

- Name, email, and comments fields
- Accessible labels and autocomplete attributes
- Hidden `possible_bot` field
- POST submission to `https://httpbin.org/post`
- Working form submission without JavaScript

### Part 2 - HTML and CSS Validation

Implemented native browser validation using:

- `required`
- `type="email"`
- `minlength` and `maxlength`
- CSS `:required`, `:user-invalid`, and `:user-valid`
- Accessible validation feedback and visible focus indicators

### Part 3 - JavaScript Form Validation

Created `form-with-js.html` and `form.js`.

Features include:

- Constraint Validation API
- Custom field-specific error messages
- Accessible error feedback
- Live remaining-character counter
- Character-limit warnings
- Error history recorded in `form_errors`
- Normal POST submission with JSON error history
- Progressive enhancement with native HTML fallback

### Part 4 - Themes and View Transitions

Implemented light and dark themes using CSS custom properties and JavaScript.

- Theme toggle control
- Preference persistence using `localStorage`
- Storage error handling
- Cross-document View Transitions
- Support for `prefers-reduced-motion`
- Fallback behavior for unsupported browser features

## Contact Form Pages

**HTML and CSS Version:**  
https://tangjian-cse134b-hw4.netlify.app/form-no-js.html

**JavaScript Enhanced Version:**  
https://tangjian-cse134b-hw4.netlify.app/form-with-js.html

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Git and GitHub
- Netlify

## Testing

Tested using Google Chrome, including form submission, input validation, theme switching, and page transitions.

The website is deployed through Netlify and connected to the GitHub repository.