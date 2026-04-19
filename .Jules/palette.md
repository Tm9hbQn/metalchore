## 2024-04-19 - Improved UI Accessibility and Interactions
**Learning:** Adding custom `role`, `aria-checked`, `tabIndex`, and `onKeyDown` handlers is critical for React components like checkboxes and task cards to function with keyboards correctly in this app.
**Action:** When creating new interactive UI components that aren't native `<button>` or `<input>`, always map `Enter` and `Space` keydowns to `onClick` and assign the correct ARIA roles for screen reader usage.
