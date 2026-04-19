# Design System

## Core Vibe
*   **Aesthetic:** "Israeli Advanced Startup"
*   **Tone:** Cool, poppy, neat, professional yet highly playful and dynamic.
*   **Key Concept:** Continuous, smooth motion. Elements should feel alive, using continuous background idle animations to create nuances of motion and life, even without direct interaction.

## Colors
*   **Background (Startup Clean):** `#f8fafc` (Slate 50)
*   **Card/Surface (Neat Glass):** `#ffffff` (White) with very thin, subtle, clean borders (`#e2e8f0` - Slate 200).
*   **Primary Text:** `#0f172a` (Slate 900)
*   **Secondary Text:** `#64748b` (Slate 500)
*   **Accents:**
    *   **Vibrant Tech Blue (Primary Action):** `#3b82f6` (Blue 500)
    *   **Electric Purple (Secondary/Shared/Creative):** `#8b5cf6` (Violet 500)
    *   **Neon Coral (Alert/Overdue):** `#ff6b6b`
    *   **Startup Green (Success):** `#10b981` (Emerald 500)

## Typography
*   System default sans-serif, optimized for clean Hebrew readability.
*   Clear hierarchies. Bold, impactful titles (often tracking-wider), extremely legible and neat body text.

## Spacing
*   8px grid system (`gap-2`, `p-4`, `m-8`).
*   Thumb Zone: Critical buttons (like FAB and Save buttons) should sit in the bottom area.

## Animations & Easing
*   Targeting 120Hz smooth curves.
*   **Continuous Motion:** Elements like background abstract orbs or inactive task cards should have subtle floating/breathing animations to emphasize life.
*   **Button tap:** Scale down to 0.95, quick snap back.
*   **Swipe actions:** Smooth linear tracking, fast snap on release.
*   **Modals:** Bottom sheet slides up (`type: "spring", bounce: 0.2, duration: 0.4`).
*   **State changes:** High-tech, bouncy layout transitions.
