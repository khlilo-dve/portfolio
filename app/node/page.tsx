"use client";

import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { motion } from "framer-motion";
import Link from "next/link";

const notes: {
  slug: string;
  title: string;
  tags: string[];
  date: string;
  preview: string;
}[] = [
  // 新增笔记格式：
  // {
  //   slug: "your-file-name",
  //   title: "文章标题",
  //   tags: ["Rust", "ZK"],
  //   date: "2026.03.08",
  //   preview: "摘要文字……",
  // },
];

function TagBadge({ label }: { label: string }) {
  return (
    <span
      className="rounded px-2 py-0.5 font-mono text-[11px]"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        backgroundColor: "rgba(255,255,255,0.03)",
        color: "rgba(255,255,255,0.4)",
      }}
    >
      {label}
    </span>
  );
}

export default function NodePage() {
  return (
    <SectionWrapper>
      <SectionHeader
        title="/Node"
        subtitle="技术思考与笔记 — 对工程实践与底层原理的拆解"
      />

      {notes.length === 0 ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          &gt;_ compiling...
        </p>
      ) : (
        <div className="space-y-4">
          {notes.map((note, i) => (
            <motion.div
              key={note.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <Link
                href={`/node/${note.slug}`}
                className="group block rounded-lg p-5 transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  backgroundColor: "rgba(255,255,255,0.01)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3
                      className="text-sm font-medium transition-colors"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {note.title}
                    </h3>
                    <p
                      className="mt-2 text-xs leading-relaxed line-clamp-2"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {note.preview}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <TagBadge key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                  <span
                    className="shrink-0 font-mono text-[11px]"
                    style={{ color: "rgba(255,255,255,0.18)" }}
                  >
                    {note.date}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
