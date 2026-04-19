# Chores in Hell - AI Configuration

## Vibe & Tone
*   **Theme:** Israeli Advanced Startup, Clean, High-tech.
*   **Tone:** Cool, poppy, neat, professional yet highly playful and dynamic.
*   **Language:** Hebrew (RTL).
*   **No English UI:** Absolutely no English text should be visible to the end user.

## Technologies
*   React (with TypeScript) + Vite
*   Tailwind CSS (Startup Clean optimized, logical properties required).
*   Supabase (Database, Auth, Realtime) - **Note: Currently using Mock State + LocalStorage until fully connected.**
*   Framer Motion (for buttery smooth 120fps animations)
*   vite-plugin-pwa (for Mobile PWA capabilities)

## Architecture Guidelines
*   **RTL First:** Always use logical properties for layout (`ps-` instead of `pl-`, `start-` instead of `left-`).
*   **Mobile PWA:** UI must be optimized for thumb zones (bottom 60% of the screen). 120fps animations are mandatory.
*   **Error Boundaries:** Ensure all main components are wrapped, failing gracefully with the "Skull" error component.
*   **The Secret Altar (Debug):** Maintain the 5-tap debug console to allow easy copy-pasting of error states for future AI sessions.

## AI Agent Directives
*   **Changelog Maintenance:** You must document every session and significant changes made during your run in `.ai/changelog.md`.
*   **Context Updates:** Always update `.ai/gemini.md` (and other `.ai/` context files if necessary) whenever project settings, styles, functionalities, or logic change so the next agent has optimal and up-to-date context.
*   **Scale of Execution:** Follow instructions completely. If the requested change is large or architectural (e.g., modifying 500 lines of code), do not artificially truncate the work to 10-20 lines. Take the time to execute the requested changes in their entirety.
