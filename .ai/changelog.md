# Changelog & Decisions

*   **Initial Setup:** Scaffolding with Vite, React, TypeScript.
*   **CSS Framework:** Chose Tailwind CSS v4 (`@tailwindcss/vite`).
*   **RTL Strategy:** Stick to logical CSS properties (`padding-inline`, `margin-block`, flex/grid natural flow in `dir="rtl"`). No hardcoded `left`/`right`.
*   **Animations:** Using Framer Motion for layout transitions, exit animations (like tasks burning to ash), and bottom sheets.
*   **State Management:** Initial mock state using React Context to simulate Supabase realtime changes before full backend integration.

*   **184297f**: Adjusted repository structure, resolved build issues, and configured Vite for GitHub Pages deployment.
*   **210a325**: Implemented major UI overhaul per the master PRD guidelines.
*   **c0171b6**: Redesigned UI to incorporate a metal/startup aesthetic and added the BottomNav navigation component.
*   **5c99eae**: Refactored UI to implement a light brutalist theme, added Weekly View functionality, and enhanced the login screen.
*   **e31f8ae**: Enhanced UI animations, integrated visual elements, added gender selection, and updated app context.
*   **9e67e9f / 080f47c**: Updated UX and thoroughly applied the cynical metal styling across components.
