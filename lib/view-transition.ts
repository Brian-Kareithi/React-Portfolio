/**
 * Inlined in <head>. React skips the "invalid state" error a view transition throws when the tab is hidden,
 * but it matches the message exactly, and Chromium now appends ". Document hidden". This wraps
 * document.startViewTransition so that message reaches React in the wording it already ignores.
 */
export const viewTransitionScript = `try{var d=document,o=d.startViewTransition;if(o&&!o.__kb){var w=function(){var t=o.apply(d,arguments),m="Transition was aborted because of invalid state";return{ready:t.ready.catch(function(e){if(e&&e.name==="InvalidStateError"&&String(e.message).indexOf(m)===0)throw new DOMException(m,"InvalidStateError");throw e}),finished:t.finished,updateCallbackDone:t.updateCallbackDone,get types(){return t.types},set types(v){t.types=v},skipTransition:function(){t.skipTransition()}}};w.__kb=1;d.startViewTransition=w}}catch(e){}`;
