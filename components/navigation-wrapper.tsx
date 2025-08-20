// components/navigation-wrapper.tsx
"use client"

import { Navigation } from './navigation' // Your main navigation component

/**
 * A simple wrapper that renders the Navigation component.
 * All dynamic theme and language functions have been removed
 * to create a static, French-only navigation experience.
 */
export function NavigationWrapper() {
  // The Navigation component is now self-contained and hardcoded to French.
  // No props are needed.
  return <Navigation />
}