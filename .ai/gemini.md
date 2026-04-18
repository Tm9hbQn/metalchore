# Chores in Hell - AI Configuration

## Vibe & Tone
*   **Theme:** Hellish, Purgatory, Dark, Cynical humor.
*   **Tone:** Sarcastic metalhead. Tasks are not "completed", they are "burned" or "sent to the void". Failures are "damned to Purgatory".
*   **Language:** Hebrew (RTL). Greetings should be somewhat cynical (e.g., "בוקר טוב, סאנשיין").
*   **No English UI:** Absolutely no English text should be visible to the end user.

## Technologies
*   React (with TypeScript) + Vite
*   Tailwind CSS (Dark mode optimized, logical properties required).
*   Supabase (Database, Auth, Realtime) - **Note: Currently using Mock State + LocalStorage until fully connected.**
*   Framer Motion (for buttery smooth 120fps animations)
*   vite-plugin-pwa (for Mobile PWA capabilities)

## Architecture Guidelines
*   **RTL First:** Always use logical properties for layout (`ps-` instead of `pl-`, `start-` instead of `left-`).
*   **Mobile PWA:** UI must be optimized for thumb zones (bottom 60% of the screen). 120fps animations are mandatory.
*   **Error Boundaries:** Ensure all main components are wrapped, failing gracefully with the "Skull" error component.
*   **The Secret Altar (Debug):** Maintain the 5-tap debug console to allow easy copy-pasting of error states for future AI sessions.
