"use client";

import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { motion } from "framer-motion";

const beaconData = {
  currentStatus: [
    { label: "Role", value: "Independent Builder / 独立开发者" },
    { label: "Focus", value: "Low-level Architecture · AI Workflow · ZK" },
    { label: "Location", value: "Cyberspace / Web3 Nodes" },
    { label: "Status", value: "Absorbing Knowledge & Building Prototypes" },
  ],
  techStack: [
    { label: "Core Weapon", value: "Rust · System Thinking (系统思维)" },
    { label: "AI & Workflow", value: "AI-Driven Dev (Cursor / LLM) · Prompt Engineering" },
    { label: "Infrastructure", value: "Web3 · Decentralized Networks" },
    { label: "Interests", value: "ZK-Proofs · Autonomous Agent · Asset Allocation" },
  ],
  principles: [
    {
      title: "Extreme AI Leverage (极致的算力杠杆)",
      desc: "将前端页面等一切可被标准化的技能外包给 AI。把人类极其稀缺的注意力，绝对聚焦于底层架构与高维策略的演进。",
    },
    {
      title: "Reject Linear Time-Trading (拒绝线性消耗)",
      desc: "绝不参与纯粹用体力或线性时间换取金钱、且无法带来认知增长的零和博弈（如无效兼职）。",
    },
    {
      title: "Attention is Currency (注意力即绝对货币)",
      desc: "深刻认知时间的复利价值。在启动任何‘思考’与‘行动’之前，必须先植入一道‘决策防火墙’，拦截低信噪比的信息。",
    },
    {
      title: "Producer's Lens (绝对生产者视角)",
      desc: "剥离消费者的外衣，去审视和破解这个世界的底层运行代码。不要只做应用的使用者，去做规则的审计者和系统的构建者。",
    },
    {
      title: "Radical Long-termism (激进的长期主义)",
      desc: "个人成长就是最顶级的资产配置。相信微小行动的指数级力量，敢于试错，让认知和数字资产在时间长河里产生疯狂的复利。",
    },
  ],
};

export default function BeaconPage() {
  return (
    <SectionWrapper>
      <SectionHeader
        title="Beacon"
        subtitle="底层操作系统、原则与系统标引 (README)"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-16"
      >
        {/* 状态清单 */}
        <section>
          <h2
            className="font-serif text-xl md:text-2xl font-normal mb-6 pb-2 border-b"
            style={{
              color: "var(--color-text-heading)",
              borderColor: "var(--color-border-subtle)",
            }}
          >
            Current Status
          </h2>
          <dl className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
            {beaconData.currentStatus.map((item) => (
              <div
                key={item.label}
                className="py-3.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
              >
                <dt
                  className="font-mono text-xs uppercase tracking-wider shrink-0 w-36"
                  style={{ color: "var(--color-text-subtle)" }}
                >
                  {item.label}
                </dt>
                <dd
                  className="text-base leading-relaxed flex-1"
                  style={{ color: "var(--color-text-body)" }}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 技术栈 */}
        <section>
          <h2
            className="font-serif text-xl md:text-2xl font-normal mb-6 pb-2 border-b"
            style={{
              color: "var(--color-text-heading)",
              borderColor: "var(--color-border-subtle)",
            }}
          >
            Technical Stack &amp; Focus
          </h2>
          <dl className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
            {beaconData.techStack.map((item) => (
              <div
                key={item.label}
                className="py-3.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
              >
                <dt
                  className="font-mono text-xs uppercase tracking-wider shrink-0 w-36"
                  style={{ color: "var(--color-text-subtle)" }}
                >
                  {item.label}
                </dt>
                <dd
                  className="text-base leading-relaxed flex-1"
                  style={{ color: "var(--color-text-body)" }}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 核心原则 */}
        <section>
          <h2
            className="font-serif text-xl md:text-2xl font-normal mb-6 pb-2 border-b"
            style={{
              color: "var(--color-text-heading)",
              borderColor: "var(--color-border-subtle)",
            }}
          >
            Operating Principles
          </h2>
          <div className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
            {beaconData.principles.map((principle, i) => (
              <article key={i} className="py-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--color-text-ghost)" }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="font-serif text-lg md:text-xl font-normal"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {principle.title}
                  </h3>
                </div>
                <p
                  className="pl-7 text-base leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {principle.desc}
                </p>
              </article>
            ))}
          </div>
        </section>
      </motion.div>
    </SectionWrapper>
  );
}
