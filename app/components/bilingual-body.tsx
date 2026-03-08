"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BilingualBodyProps {
  backHref: string;
  backLabel: string;
  title: string;
  titleEn?: string;
  date: string;
  tags?: string[];
  zhBody: React.ReactNode;
  enBody: React.ReactNode;
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
}: BilingualBodyProps) {
  const [lang, setLang] = useState<"zh" | "en">("zh");

  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <ArrowLeft size={14} />
          {backLabel}
        </Link>

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
              color:
                lang === "en"
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.3)",
              backgroundColor:
                lang === "en" ? "rgba(255,255,255,0.08)" : "transparent",
            }}
          >
            EN
          </button>
          <div
            style={{
              width: "1px",
              height: "14px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />
          <button
            onClick={() => setLang("zh")}
            className="px-2.5 py-1 rounded-r-md transition-all cursor-pointer"
            style={{
              color:
                lang === "zh"
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.3)",
              backgroundColor:
                lang === "zh" ? "rgba(255,255,255,0.08)" : "transparent",
            }}
          >
            ZH
          </button>
        </div>
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
          {tags && tags.length > 0 && (
            <div className="flex gap-2">
              {tags.map((tag) => (
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
          )}
        </div>
        <div
          className="mt-6 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />
      </header>

      <div style={{ display: lang === "zh" ? "block" : "none" }}>{zhBody}</div>
      <div style={{ display: lang === "en" ? "block" : "none" }}>{enBody}</div>
    </>
  );
}
