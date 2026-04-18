# Changelog & Decisions

*   **Initial Setup:** Scaffolding with Vite, React, TypeScript.
*   **CSS Framework:** Chose Tailwind CSS v4 (`@tailwindcss/vite`).
*   **RTL Strategy:** Stick to logical CSS properties (`padding-inline`, `margin-block`, flex/grid natural flow in `dir="rtl"`). No hardcoded `left`/`right`.
*   **Animations:** Using Framer Motion for layout transitions, exit animations (like tasks burning to ash), and bottom sheets.
*   **State Management:** Initial mock state using React Context to simulate Supabase realtime changes before full backend integration.
