# Changelog & Decisions

*   **Initial Setup:** Scaffolding with Vite, React, TypeScript.
*   **CSS Framework:** Chose Tailwind CSS v4 (`@tailwindcss/vite`).
*   **RTL Strategy:** Stick to logical CSS properties (`padding-inline`, `margin-block`, flex/grid natural flow in `dir="rtl"`). No hardcoded `left`/`right`.
*   **Animations:** Using Framer Motion for layout transitions, exit animations (like tasks burning to ash), and bottom sheets.
*   **State Management:** Initial mock state using React Context to simulate Supabase realtime changes before full backend integration.

## Recent Commits (Last 24 Hours)

*   **080f47c & 9e67e9f**: Merged pull request to finalize the cynical metal styling and update the UX across multiple components. Modified Home, TaskModal, Cemetery, and layout structures to align with the core thematic tone.
*   **e31f8ae**: Enhanced UI animations using Framer Motion, integrated new visual elements, implemented gender selection features, and updated the core application context.
*   **5c99eae**: Executed a major UI refactoring to implement the light brutalist aesthetic. Introduced the WeeklyView screen, enhanced the login experience, and expanded TaskCard capabilities.
*   **c0171b6**: Redesigned UI to combine the metal and startup aesthetics. Introduced and integrated the BottomNav navigation component into the application's layout.
*   **210a325**: Implemented a comprehensive UI overhaul directly adhering to the instructions outlined in the master PRD.
*   **184297f**: Fixed repository structure issues, resolved build errors, scaffolded `AppStateProvider`, and properly configured Vite and `tsconfig` files for deployment to GitHub Pages.
*   **feat(undead-kitten):** Implemented an "undead kitten" site companion. The kitten uses Framer Motion and custom CSS keyframes for various states (idle, walk, jump, sit, etc.) and periodically picks elements on the screen to pathfind towards using a custom `useKittenAI` hook and `KittenContext` for global state management. Added hiding/peeking animations on route changes via `BottomNav`.
