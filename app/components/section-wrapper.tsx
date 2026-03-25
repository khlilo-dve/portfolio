"use client";

import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mx-auto max-w-4xl xl:max-w-5xl 2xl:max-w-6xl px-6 xl:px-8 py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      <h1
        className="font-mono text-xs xl:text-sm tracking-[0.3em] uppercase"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-sm xl:text-base" style={{ color: "rgba(255,255,255,0.45)" }}>
          {subtitle}
        </p>
      )}
      <div
        className="mt-4 h-px w-8"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      />
    </div>
  );
}
