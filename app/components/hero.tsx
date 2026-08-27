"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-20">
      <div className="mx-auto w-full max-w-2xl xl:max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <span
            className="font-mono text-[11px] xl:text-xs tracking-[0.25em] uppercase"
            style={{ color: "var(--color-text-ghost)" }}
          >
            Thesis &amp; Principles
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-serif text-3xl leading-[1.3] font-normal tracking-[-0.02em] md:text-4xl xl:text-5xl"
          style={{ color: "var(--color-text-heading)" }}
        >
          探寻事物运转的底层规律，
          <br className="hidden sm:inline" />
          <span className="italic" style={{ color: "var(--color-text-muted)" }}>
            专注于构建具备长期价值的系统。
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 space-y-4 border-l pl-5"
          style={{ borderColor: "var(--color-border-default)" }}
        >
          <p
            className="text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-text-body)" }}
          >
            以工程思维拆解日常，坚信微小行动的指数级力量。
          </p>
          <p
            className="text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            拒绝盲目追逐浪潮。保持清醒的观察与持续的微调，安静地测试每一种可能性。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
