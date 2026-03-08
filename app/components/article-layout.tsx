import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MdxContent } from "./mdx-content";

interface ArticleLayoutProps {
  title: string;
  date: string;
  tags?: string[];
  backHref: string;
  backLabel: string;
  content: string;
}

export function ArticleLayout({
  title,
  date,
  tags,
  backHref,
  backLabel,
  content,
}: ArticleLayoutProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        <ArrowLeft size={14} />
        {backLabel}
      </Link>

      <header className="mt-8 mb-12">
        <h1
          className="text-xl font-medium leading-relaxed md:text-2xl"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {title}
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

      <MdxContent source={content} />
    </section>
  );
}
