# Design System

## Colors
*   **Background (Deep Dark):** `#0A0A0A`
*   **Card/Surface (Glassmorphism):** Blurred dark grey/black with very thin, subtle charcoal borders (`border-white/10`).
*   **Accents:**
    *   **Toxic Neon Green (Success):** `#39FF14` or equivalent bright green for "completed" tasks.
    *   **Blood Red (Danger/Purgatory):** `#8A0303` or `#FF0000` for failing tasks and purgatory borders.
    *   **User Auras:** Each user gets a specific neon color for their avatar/halo.

## Typography
*   System default sans-serif, optimized for Hebrew readability.
*   Clear hierarchies (Large titles for modals, legible small text for task descriptions).

## Spacing
*   8px grid system (`gap-2`, `p-4`, `m-8`).
*   Thumb Zone: Critical buttons (like FAB and Save buttons) should sit in the bottom area.

## Animations & Easing
*   Targeting 120Hz smooth curves.
*   Button tap: scale down to 0.95, quick snap back.
*   Swipe actions: smooth linear tracking, fast snap on release.
*   Modals: Bottom sheet slides up (`type: "spring", bounce: 0, duration: 0.3`).
