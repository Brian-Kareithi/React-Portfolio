"use client";

import { motion } from "framer-motion";

export function LiquidBackground() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      initial={{ opacity: 0 }}
      animate={{
        scale: [1, 1.02, 1.02, 1.04, 1, 1.01],
        opacity: [0.08, 0.12, 0.2, 0.35, 0.08, 0.25],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border"
        style={{ borderColor: "var(--color-border)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border"
        style={{ borderColor: "var(--color-border)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border"
        style={{ borderColor: "var(--color-border)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border"
        style={{ borderColor: "var(--color-accent)", opacity: 0.6 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border"
        style={{ borderColor: "var(--color-border)" }} />
    </motion.div>
  );
}
