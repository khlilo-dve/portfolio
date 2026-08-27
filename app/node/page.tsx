import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";

export default function NodePage() {
  const articles = getAllArticles("node");

  return (
    <SectionWrapper>
      <SectionHeader
        title="Node"
        subtitle="技术思考与笔记 — 对工程实践与底层原理的拆解"
      />

      {articles.length === 0 ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "var(--color-text-ghost)" }}
        >
          暂无已发布条目
        </p>
      ) : (
        <div className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
          {articles.map((article, i) => (
            <article
              key={article.slug}
              className="py-8 first:pt-0 last:pb-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <Link
                href={`/node/${article.slug}`}
                className="group block"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h2
                    className="font-serif text-xl md:text-2xl font-normal tracking-[-0.01em] transition-opacity group-hover:opacity-75"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {article.title}
                  </h2>
                  <time
                    className="shrink-0 font-mono text-xs"
                    style={{ color: "var(--color-text-ghost)" }}
                  >
                    {article.date.replace(/-/g, ".")}
                  </time>
                </div>

                {article.preview && (
                  <p
                    className="mt-3 text-base leading-relaxed line-clamp-2"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {article.preview}
                  </p>
                )}

                {article.tags && article.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ color: "var(--color-text-subtle)" }}>
                    {article.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
