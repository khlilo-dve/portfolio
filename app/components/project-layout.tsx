import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { MdxContent } from "./mdx-content";

interface ProjectLayoutProps {
  title: string;
  date: string;
  summary?: string;
  stack?: string[];
  github?: string;
  demo?: string;
  content: string;
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

export function ProjectLayout({
  title,
  date,
  summary,
  stack,
  github,
  demo,
  content,
}: ProjectLayoutProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/pow"
        className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        <ArrowLeft size={14} />
        ← /PoW
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

      <MdxContent source={content} />
    </section>
  );
}
