import Link from "next/link";
import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { Github, ExternalLink } from "lucide-react";
import { getAllArticles } from "@/lib/mdx";

export default function PoWPage() {
  const projects = getAllArticles("pow");

  return (
    <SectionWrapper>
      <SectionHeader
        title="Proof of Work"
        subtitle="已交付与进行中的工程系统与工具"
      />

      {projects.length === 0 ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "var(--color-text-ghost)" }}
        >
          暂无已发布项目
        </p>
      ) : (
        <div className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="py-8 first:pt-0 last:pb-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href={`/pow/${project.slug}`}
                  className="group inline-block"
                >
                  <h2
                    className="font-serif text-xl md:text-2xl font-normal tracking-[-0.01em] transition-opacity group-hover:opacity-75"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {project.title}
                  </h2>
                </Link>

                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      className="transition-opacity hover:opacity-70"
                      style={{ color: "var(--color-text-subtle)" }}
                      aria-label="GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={15} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="transition-opacity hover:opacity-70"
                      style={{ color: "var(--color-text-subtle)" }}
                      aria-label="Demo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>

              {project.summary && (
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {project.summary}
                </p>
              )}

              {project.stack && project.stack.length > 0 && (
                <div
                  className="mt-4 font-mono text-xs"
                  style={{ color: "var(--color-text-subtle)" }}
                >
                  {project.stack.join(" · ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
