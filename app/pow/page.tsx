import Link from "next/link";
import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { Github, ExternalLink } from "lucide-react";
import { getAllArticles } from "@/lib/mdx";

export default function PoWPage() {
  const projects = getAllArticles("pow");

  return (
    <SectionWrapper>
      <SectionHeader
        title="/PoW"
        subtitle="Proof of Work — 已完成和进行中的工程项目"
      />

      {projects.length === 0 ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "var(--color-text-ghost)" }}
        >
          &gt;_ building...
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="group rounded-lg p-5 transition-all animate-fade-in-up"
              style={{
                animationDelay: `${i * 0.06}s`,
                border: "1px solid var(--color-border-dim)",
                backgroundColor: "var(--color-bg-surface)",
              }}
            >
              <div className="flex items-start justify-between">
                <Link
                  href={`/pow/${project.slug}`}
                  className="font-mono text-sm xl:text-base font-medium transition-colors hover:opacity-80"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {project.title}
                </Link>
                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      className="transition-opacity hover:opacity-70"
                      style={{ color: "var(--color-text-subtle)" }}
                      aria-label="GitHub"
                    >
                      <Github size={14} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="transition-opacity hover:opacity-70"
                      style={{ color: "var(--color-text-subtle)" }}
                      aria-label="Demo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {project.summary && (
                <p
                  className="mt-2 text-xs xl:text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {project.summary}
                </p>
              )}

              {project.stack && project.stack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded px-2 py-0.5 font-mono text-[10px] font-medium"
                      style={{
                        border: "1px solid var(--color-border-default)",
                        backgroundColor: "var(--color-bg-surface-raised)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
