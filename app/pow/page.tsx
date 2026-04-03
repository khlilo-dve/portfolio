"use client";

import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const projects: {
  name: string;
  description: string;
  stack: string[];
  github: string | null;
  demo: string | null;
}[] = [
  {
    name: "Style Decoder (认知盗火者)",
    description:
      "文章风格逆向工程 CLI 工具。输入一篇文章 URL，十维解析写作风格并一键生成可复用的 AI System Prompt，让 LLM 精准复刻任意作者的认知结构与表达节奏。",
    stack: ["Rust", "Tokio", "Reqwest", "LLM API"],
    github: "https://github.com/khlilo-dve/style-decoder",
    demo: null,
  },
  {
    name: "Cognitive Writer (AI Writing Engine)",
    description:
      "面向微信公众号的 AI 文章生成 CLI 工具。Rust 实现骨架-渲染双通道架构，支持风格逆向学习与局部重绘，一键生成微信兼容富文本。",
    stack: ["Rust", "Tokio", "Clap", "LLM API"],
    github: null,
    demo: null,
  },
  {
    name: "Op-Sim (Synthetic Data Engine)",
    description:
      "工业级高并发业务数据仿真引擎。基于 Rust 状态机与时间陷阱算法，专为数据库压力测试与 AI 隐私安全训练生成千万级高保真合成数据。",
    stack: ["Rust", "Serde", "Rand", "HPC"],
    github: "https://github.com/khlilo-dve/substantive-op-mock",
    demo: null,
  },
];

export default function PoWPage() {
  return (
    <SectionWrapper>
      <SectionHeader
        title="/PoW"
        subtitle="Proof of Work — 已完成和进行中的工程项目"
      />

      {projects.length === 0 ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          &gt;_ building...
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="group rounded-lg p-5 transition-all"
              style={{
                border: "1px solid rgba(255,255,255,0.05)",
                backgroundColor: "rgba(255,255,255,0.01)",
              }}
            >
              <div className="flex items-start justify-between">
                <h3
                  className="font-mono text-sm xl:text-base font-medium transition-colors"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {project.name}
                </h3>
                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      className="transition-opacity hover:opacity-70"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                      aria-label="GitHub"
                    >
                      <Github size={14} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="transition-opacity hover:opacity-70"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                      aria-label="Demo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              <p
                className="mt-2 text-xs xl:text-sm"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded px-2 py-0.5 font-mono text-[10px]"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      backgroundColor: "rgba(255,255,255,0.02)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
