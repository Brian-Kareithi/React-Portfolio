export const BOOT_KEY = "kb-booted";
const VISITS_KEY = "kb-visits";

/** Inlined in <head>: shows the boot screen on a first visit and marks returning visitors before paint. */
export const bootScript = `try{if(!localStorage.getItem("${BOOT_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-boot","")}}catch(e){}try{var s=sessionStorage,l=localStorage,n=+s.getItem("kb-visit");if(!n){n=(+l.getItem("${VISITS_KEY}")||0)+1;l.setItem("${VISITS_KEY}",String(n));s.setItem("kb-visit",String(n))}if(n>1)document.documentElement.setAttribute("data-return","")}catch(e){}`;
