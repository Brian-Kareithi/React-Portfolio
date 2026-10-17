export const BOOT_KEY = "kb-booted";

/**
 * Runs before paint (inlined in <head>): flags a first visit so the CSS can show the boot line.
 * Skipped entirely under reduced motion, and if storage is unavailable.
 */
export const bootScript = `try{if(!localStorage.getItem("${BOOT_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-boot","")}}catch(e){}`;
