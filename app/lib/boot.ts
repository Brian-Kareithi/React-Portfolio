export const BOOT_KEY = "kb-booted";
export const VISITS_KEY = "kb-visits";

/**
 * Runs before paint (inlined in <head>).
 * 1. Flags a first visit so the CSS can show the boot line. Skipped under reduced motion.
 * 2. Counts visits once per browser session. Odd and even visits swap the hero's mint and plum
 *    (html[data-visit]), and returning visitors get a greeting (html[data-return]).
 * Each part is skipped silently if storage is unavailable.
 */
export const bootScript = `try{if(!localStorage.getItem("${BOOT_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-boot","")}}catch(e){}try{var s=sessionStorage,l=localStorage,d=document.documentElement,n=+s.getItem("kb-visit");if(!n){n=(+l.getItem("${VISITS_KEY}")||0)+1;l.setItem("${VISITS_KEY}",String(n));s.setItem("kb-visit",String(n))}d.setAttribute("data-visit",n%2?"odd":"even");if(n>1)d.setAttribute("data-return","")}catch(e){}`;
