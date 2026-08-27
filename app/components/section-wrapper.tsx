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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`mx-auto max-w-3xl xl:max-w-4xl px-6 xl:px-8 py-16 md:py-24 ${className}`}
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
    <div className="mb-14 pb-6 border-b" style={{ borderColor: "var(--color-border-subtle)" }}>
      <h1
        className="font-serif text-3xl md:text-4xl font-normal tracking-[-0.02em]"
        style={{ color: "var(--color-text-heading)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="mt-3 text-base leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
