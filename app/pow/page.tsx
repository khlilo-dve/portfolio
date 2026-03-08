"use client";

import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const projects: {
  name: string;
  description: string;
  stack: string[];
  github: string;
  demo: string | null;
}[] = [
  // 新增项目格式：
  // {
  //   name: "项目名",
  //   description: "一句话描述",
  //   stack: ["Rust", "TypeScript"],
  //   github: "https://github.com/khlilo-dve/项目名",
  //   demo: null,
  // },
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
        <div className="grid gap-4 sm:grid-cols-2">
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
                  className="font-mono text-sm font-medium transition-colors"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {project.name}
                </h3>
                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    className="transition-opacity hover:opacity-70"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                    aria-label="GitHub"
                  >
                    <Github size={14} />
                  </a>
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
                className="mt-2 text-xs"
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
