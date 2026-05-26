"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { MdxContent } from "./mdx-content";

interface ProjectLayoutProps {
  title: string;
  titleEn?: string;
  date: string;
  summary?: string;
  stack?: string[];
  github?: string;
  demo?: string;
  content: string;
  contentEn?: string;
}

function StackTags({ stack }: { stack?: string[] }) {
  if (!stack || stack.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((tag) => (
        <span
          key={tag}
          className="rounded px-2 py-0.5 font-mono text-[11px]"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.03)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function LangToggle({
  lang,
  setLang,
}: {
  lang: "zh" | "en";
  setLang: (l: "zh" | "en") => void;
}) {
  return (
    <div
      className="flex items-center rounded-md font-mono text-[11px]"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      <button
        onClick={() => setLang("en")}
        className="px-2.5 py-1 rounded-l-md transition-all cursor-pointer"
        style={{
          color: lang === "en" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
          backgroundColor: lang === "en" ? "rgba(255,255,255,0.08)" : "transparent",
        }}
      >
        EN
      </button>
      <div style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.1)" }} />
      <button
        onClick={() => setLang("zh")}
        className="px-2.5 py-1 rounded-r-md transition-all cursor-pointer"
        style={{
          color: lang === "zh" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
          backgroundColor: lang === "zh" ? "rgba(255,255,255,0.08)" : "transparent",
        }}
      >
        ZH
      </button>
    </div>
  );
}

export function ProjectLayout({
  title,
  titleEn,
  date,
  summary,
  stack,
  github,
  demo,
  content,
  contentEn,
}: ProjectLayoutProps) {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const hasEn = !!contentEn;

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex items-center justify-between">
        <Link
          href="/pow"
          className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <ArrowLeft size={14} />
          ← /PoW
        </Link>
        {hasEn && <LangToggle lang={lang} setLang={setLang} />}
      </div>

      <header className="mt-8 mb-12">
        <h1
          className="text-xl font-medium leading-relaxed md:text-2xl"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {lang === "en" && titleEn ? titleEn : title}
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {date}
          </span>
          <StackTags stack={stack} />
        </div>

        {(github || demo) && (
          <div className="mt-4 flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-all hover:opacity-80"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <Github size={13} />
                GitHub
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-all hover:opacity-80"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <ExternalLink size={13} />
                Demo
              </a>
            )}
          </div>
        )}

        {summary && (
          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {summary}
          </p>
        )}

        <div
          className="mt-6 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />
      </header>

      <div style={{ display: lang === "zh" ? "block" : "none" }}>
        <MdxContent source={content} />
      </div>
      {hasEn && (
        <div style={{ display: lang === "en" ? "block" : "none" }}>
          <MdxContent source={contentEn!} />
        </div>
      )}
    </section>
  );
}
