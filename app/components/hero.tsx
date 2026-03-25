"use client";

import { motion } from "framer-motion";

const lines = [
  "探寻事物运转的底层规律，专注于构建具备长期价值的系统。",
  "以工程思维拆解日常，坚信微小行动的指数级力量。",
  "拒绝盲目追逐浪潮。保持清醒的观察与持续的微调，安静地测试每一种可能性。",
];

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="mx-auto max-w-2xl xl:max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span
            className="font-mono text-xs xl:text-sm tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            &gt;_ init
          </span>
        </motion.div>

        <div className="space-y-6">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.3 }}
              className="text-lg leading-relaxed tracking-wide md:text-xl xl:text-2xl"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="mt-12"
        >
          <span
            className="font-mono text-sm"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            █<span className="cursor-blink">_</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
