"use client";

import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { motion } from "framer-motion";

const beaconData = {
  currentStatus: {
    role: "Independent Builder (独立开发者)",
    focus: "Low-level Architecture · AI Workflow · ZK (底层架构 / AI工作流建设 / 零知识证明)",
    location: "Cyberspace / Web3 Nodes (赛博空间 / Web3 节点)",
    availability: "Absorbing Knowledge & Building Prototypes (高维认知吸收与系统试错中)",
  },
  techStack: {
    primary: ["Rust (Core Weapon)", "System Thinking (系统思维)"],
    frameworks: ["AI-Driven Dev (Cursor/LLM)", "Prompt Engineering"],
    infrastructure: ["Web3", "Decentralized Networks"],
    interests: ["ZK-Proofs", "AI Workflow", "Asset Allocation"],
  },
  principles: [
    "**Extreme AI Leverage (极致的算力杠杆)**：将前端页面等一切可被标准化的技能外包给 AI。把人类极其稀缺的注意力，绝对聚焦于底层架构与高维策略的演进。",
    "**Reject Linear Time-Trading (拒绝线性消耗)**：绝不参与纯粹用体力或线性时间换取金钱、且无法带来认知增长的零和博弈（如无效兼职）。",
    "**Attention is Currency (注意力即绝对货币)**：深刻认知时间的复利价值。在启动任何‘思考’与‘行动’之前，必须先植入一道‘决策防火墙’，拦截低信噪比的信息。",
    "**Producer's Lens (绝对生产者视角)**：剥离消费者的外衣，去审视和破解这个世界的底层运行代码。不要只做应用的使用者，去做规则的审计者和系统的构建者。",
    "**Radical Long-termism (激进的长期主义)**：个人成长就是最顶级的资产配置。相信微小行动的指数级力量，敢于试错，让认知和数字资产在时间长河里产生疯狂的复利。"
  ],
};

function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  if (!value) return null;
  return (
    <div
      className="flex gap-4 py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <span
        className="w-32 shrink-0 font-mono text-xs xl:text-sm uppercase tracking-wider"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        {label}
      </span>
      <span
        className={`text-sm xl:text-base ${mono ? "font-mono text-xs xl:text-sm" : ""}`}
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        {value}
      </span>
    </div>
  );
}

const hasStatus = Object.values(beaconData.currentStatus).some(Boolean);
const hasStack = Object.values(beaconData.techStack).some((v) => v.length > 0);
const hasPrinciples = beaconData.principles.length > 0;
const isEmpty = !hasStatus && !hasStack && !hasPrinciples;

export default function BeaconPage() {
  return (
    <SectionWrapper>
      <SectionHeader
        title="/Beacon"
        subtitle="个人信标 — 底层操作系统 & README.md"
      />

      {isEmpty ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          &gt;_ initializing beacon...
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-12"
        >
          {hasStatus && (
            <div>
              <h2
                className="mb-4 font-mono text-xs tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Current_Status
              </h2>
              <div
                className="rounded-lg px-5"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  backgroundColor: "rgba(255,255,255,0.01)",
                }}
              >
                <Field label="Role" value={beaconData.currentStatus.role} />
                <Field label="Focus" value={beaconData.currentStatus.focus} mono />
                <Field label="Location" value={beaconData.currentStatus.location} mono />
                <Field label="Status" value={beaconData.currentStatus.availability} />
              </div>
            </div>
          )}

          {hasStack && (
            <div>
              <h2
                className="mb-4 font-mono text-xs tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Tech_Stack
              </h2>
              <div
                className="rounded-lg p-5"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  backgroundColor: "rgba(255,255,255,0.01)",
                }}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  {Object.entries(beaconData.techStack)
                    .filter(([, values]) => values.length > 0)
                    .map(([key, values]) => (
                      <div key={key}>
                        <span
                          className="font-mono text-[11px] uppercase"
                          style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                          {key}
                        </span>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {values.map((v) => (
                            <span
                              key={v}
                              className="rounded px-2 py-0.5 font-mono text-[11px]"
                              style={{
                                border: "1px solid rgba(255,255,255,0.1)",
                                backgroundColor: "rgba(255,255,255,0.03)",
                                color: "rgba(255,255,255,0.45)",
                              }}
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {hasPrinciples && (
            <div>
              <h2
                className="mb-4 font-mono text-xs tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Operating_Principles
              </h2>
              <div
                className="rounded-lg px-5"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  backgroundColor: "rgba(255,255,255,0.01)",
                }}
              >
                {beaconData.principles.map((principle, i) => (
                  <div
                    key={i}
                    className="flex gap-4 py-4"
                    style={{
                      borderBottom:
                        i < beaconData.principles.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                    }}
                  >
                    <span
                      className="font-mono text-xs shrink-0 pt-0.5"
                      style={{ color: "rgba(255,255,255,0.12)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </SectionWrapper>
  );
}