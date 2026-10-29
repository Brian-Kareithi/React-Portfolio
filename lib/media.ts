export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const FINE_POINTER_WITH_MOTION = `${FINE_POINTER} and (prefers-reduced-motion: no-preference)`;

export const matches = (query: string) => window.matchMedia(query).matches;

export const prefersReducedMotion = () => matches(REDUCED_MOTION);
