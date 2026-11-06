export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const FINE_POINTER_WITH_MOTION = `${FINE_POINTER} and (prefers-reduced-motion: no-preference)`;

export const matches = (query: string) => window.matchMedia(query).matches;

export const prefersReducedMotion = () => matches(REDUCED_MOTION);

/** WebGL on capable devices only: not on reduced motion, data saver, low memory or few cores. */
export function canRender3D() {
  if (prefersReducedMotion()) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 3 || (nav.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
