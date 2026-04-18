# Chores in Hell - AI Configuration

## Vibe & Tone
*   **Theme:** Hellish, Purgatory, Dark, Cynical humor.
*   **Tone:** Sarcastic metalhead. Tasks are not "completed", they are "burned" or "sent to the void". Failures are "damned to Purgatory".
*   **Language:** Hebrew (RTL). Greetings should be somewhat cynical (e.g., "בוקר טוב, סאנשיין").

## Technologies
*   React (with TypeScript)
*   Vite
*   Tailwind CSS (Dark mode optimized, using `@tailwindcss/vite`)
*   Supabase (Database, Auth, Realtime)
*   Framer Motion (for buttery smooth 120fps animations)
*   vite-plugin-pwa (for Mobile PWA capabilities)

## Architecture Guidelines
*   **RTL First:** Always use logical properties for layout (`ms-` instead of `ml-`, `start-` instead of `left-`).
*   **Mobile PWA:** UI must be optimized for thumb zones (bottom 60% of the screen). 120fps animations are mandatory.
