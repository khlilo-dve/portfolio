"use client";

import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { MdxContent } from "./mdx-content";
import { TagBadge } from "./tag-badge";
import { LangToggle } from "./lang-toggle";
import { useBilingual } from "../hooks/use-bilingual";

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
  const { lang, setLang } = useBilingual();
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
          {stack && stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {stack.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
          )}
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
