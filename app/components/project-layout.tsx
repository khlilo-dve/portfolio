"use client";

import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Sparkles } from "lucide-react";
import { TagBadge } from "./tag-badge";
import { LangToggle } from "./lang-toggle";
import { useBilingual } from "../hooks/use-bilingual";

interface ProjectLayoutProps {
  slug?: string;
  title: string;
  titleEn?: string;
  date: string;
  summary?: string;
  stack?: string[];
  github?: string;
  demo?: string;
  zhBody: React.ReactNode;
  enBody: React.ReactNode | null;
}

export function ProjectLayout({
  slug,
  title,
  titleEn,
  date,
  summary,
  stack,
  github,
  demo,
  zhBody,
  enBody,
}: ProjectLayoutProps) {
  const { lang, setLang } = useBilingual();
  const hasEn = !!enBody;
  const isCognitiveWriter = slug === "cognitive-writer";

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex items-center justify-between">
        <Link
          href="/pow"
          className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
          style={{ color: "var(--color-text-subtle)" }}
        >
          <ArrowLeft size={14} />
          ← /PoW
        </Link>
        {hasEn && <LangToggle lang={lang} setLang={setLang} />}
      </div>

      <header className="mt-8 mb-12">
        <h1
          className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.3] tracking-tight"
          style={{ color: "var(--color-text-heading)" }}
        >
          {lang === "en" && titleEn ? titleEn : title}
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <span
            className="font-mono text-xs"
            style={{ color: "var(--color-text-subtle)" }}
          >
            {date}
          </span>
          {stack && stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {stack.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {isCognitiveWriter && (
            <a
              href="/cognitive-writer.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: "#ea580c",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)",
              }}
            >
              <Sparkles size={13} />
              查看产品宣传页
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-all hover:opacity-80"
              style={{
                border: "1px solid var(--color-border-default)",
                backgroundColor: "var(--color-bg-hover)",
                color: "var(--color-text-muted)",
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
                border: "1px solid var(--color-border-default)",
                backgroundColor: "var(--color-bg-hover)",
                color: "var(--color-text-muted)",
              }}
            >
              <ExternalLink size={13} />
              Demo
            </a>
          )}
        </div>

        {summary && (
          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: "var(--color-text-body)" }}
          >
            {summary}
          </p>
        )}

        <div
          className="mt-6 h-px"
          style={{ backgroundColor: "var(--color-border-subtle)" }}
        />
      </header>

      <div style={{ display: lang === "zh" ? "block" : "none" }}>
        {zhBody}
      </div>
      {hasEn && (
        <div style={{ display: lang === "en" ? "block" : "none" }}>
          {enBody}
        </div>
      )}
    </section>
  );
}
