import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
}

export function GradientCard({ children, className = "" }: GradientCardProps) {
  return (
    <motion.div
      className="relative"
      style={{ perspective: 1000 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{
          rotateX: 1.5,
          rotateY: -1.5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Green/teal glow at bottom */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-emerald-500/30 rounded-full blur-2xl" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-teal-400/20 rounded-full blur-xl" />

        {/* Card body */}
        <div
          className={`relative bg-gradient-to-br from-[#0c1a3a] via-[#0f2449] to-[#0a1628] border border-emerald-500/20 rounded-2xl p-8 shadow-2xl ${className}`}
        >
          {/* Subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
