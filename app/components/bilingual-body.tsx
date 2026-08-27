"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LangToggle } from "./lang-toggle";
import { TagBadge } from "./tag-badge";
import { DownloadButton } from "./download-button";
import { useBilingual } from "../hooks/use-bilingual";

interface BilingualBodyProps {
  backHref: string;
  backLabel: string;
  title: string;
  titleEn?: string;
  date: string;
  tags?: string[];
  zhBody: React.ReactNode;
  enBody: React.ReactNode;
  rawContent: string;
  rawContentEn?: string | null;
  dlFilename: string;
  dlFilenameEn: string;
}

export function BilingualBody({
  backHref,
  backLabel,
  title,
  titleEn,
  date,
  tags,
  zhBody,
  enBody,
  rawContent,
  rawContentEn,
  dlFilename,
  dlFilenameEn,
}: BilingualBodyProps) {
  const { lang, setLang } = useBilingual();

  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
          style={{ color: "var(--color-text-subtle)" }}
        >
          <ArrowLeft size={14} />
          {backLabel}
        </Link>

        <div className="flex items-center gap-3">
          <DownloadButton
            rawContent={lang === "en" && rawContentEn ? rawContentEn : rawContent}
            filename={lang === "en" && rawContentEn ? dlFilenameEn : dlFilename}
          />
          <LangToggle lang={lang} setLang={setLang} />
        </div>
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
          {tags && tags.length > 0 && (
            <div className="flex gap-2">
              {tags.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
          )}
        </div>
        <div
          className="mt-6 h-px"
          style={{ backgroundColor: "var(--color-border-subtle)" }}
        />
      </header>

      <div style={{ display: lang === "zh" ? "block" : "none" }}>{zhBody}</div>
      <div style={{ display: lang === "en" ? "block" : "none" }}>{enBody}</div>
    </>
  );
}
