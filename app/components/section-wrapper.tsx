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
        className="font-serif text-2xl md:text-3xl font-normal tracking-tight"
        style={{ color: "var(--color-text-heading)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2.5 text-sm xl:text-base" style={{ color: "var(--color-text-muted)" }}>
          {subtitle}
        </p>
      )}
      <div
        className="mt-4 h-px w-8"
        style={{ backgroundColor: "var(--color-border-default)" }}
      />
    </div>
  );
}
