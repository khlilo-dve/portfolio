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
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="flex items-center justify-between pb-6 border-b" style={{ borderColor: "var(--color-border-subtle)" }}>
        <Link
          href="/pow"
          className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-75"
          style={{ color: "var(--color-text-subtle)" }}
        >
          <ArrowLeft size={13} />
          ← /PoW
        </Link>
        {hasEn && <LangToggle lang={lang} setLang={setLang} />}
      </div>

      <header className="mt-10 mb-12">
        <h1
          className="font-serif text-3xl md:text-4xl lg:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em]"
          style={{ color: "var(--color-text-heading)" }}
        >
          {lang === "en" && titleEn ? titleEn : title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs">
          <time
            className="font-mono text-xs"
            style={{ color: "var(--color-text-ghost)" }}
          >
            {date}
          </time>
          {stack && stack.length > 0 && (
            <div className="font-mono text-xs" style={{ color: "var(--color-text-subtle)" }}>
              {stack.join(" · ")}
            </div>
          )}
        </div>

        {summary && (
          <p
            className="mt-6 text-base md:text-lg leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            {summary}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
          {isCognitiveWriter && (
            <a
              href="/cognitive-writer.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline underline-offset-4 transition-opacity hover:opacity-75"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Sparkles size={14} />
              产品介绍页 ↗
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline underline-offset-4 transition-opacity hover:opacity-75"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Github size={14} />
              GitHub ↗
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline underline-offset-4 transition-opacity hover:opacity-75"
              style={{ color: "var(--color-text-primary)" }}
            >
              <ExternalLink size={14} />
              Live Demo ↗
            </a>
          )}
        </div>
      </header>

      <div style={{ display: lang === "zh" ? "block" : "none" }}>
        {zhBody}
      </div>
      {hasEn && (
        <div style={{ display: lang === "en" ? "block" : "none" }}>
          {enBody}
        </div>
      )}
    </article>
  );
}
