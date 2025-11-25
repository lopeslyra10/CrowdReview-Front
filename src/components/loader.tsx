"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-slate-400", className)}>
      <motion.span
        className="h-2 w-2 rounded-full bg-indigo-400"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      />
      <motion.span
        className="h-2 w-2 rounded-full bg-cyan-400"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.span
        className="h-2 w-2 rounded-full bg-emerald-400"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.3 }}
      />
      <span className="text-sm font-medium">Carregando...</span>
    </div>
  );
}
