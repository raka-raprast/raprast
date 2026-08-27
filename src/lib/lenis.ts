import type Lenis from "lenis";

/**
 * Shared handle to the single Lenis smooth-scroll instance so overlays (e.g. the
 * intro) can pause/resume scrolling without prop-drilling through the tree.
 */
export const lenisStore: { current: Lenis | null } = { current: null };
