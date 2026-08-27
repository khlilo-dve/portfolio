import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { TagBadge } from "../components/tag-badge";
import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";

export default function NodePage() {
  const articles = getAllArticles("node");

  return (
    <SectionWrapper>
      <SectionHeader
        title="/Node"
        subtitle="技术思考与笔记 — 对工程实践与底层原理的拆解"
      />

      {articles.length === 0 ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "var(--color-text-ghost)" }}
        >
          &gt;_ compiling...
        </p>
      ) : (
        <div className="space-y-4">
          {articles.map((article, i) => (
            <div
              key={article.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Link
                href={`/node/${article.slug}`}
                className="group block rounded-lg p-5 transition-all"
                style={{
                  border: "1px solid var(--color-border-dim)",
                  backgroundColor: "var(--color-bg-surface)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3
                      className="font-serif text-base xl:text-lg font-medium transition-colors group-hover:opacity-85"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {article.title}
                    </h3>
                    {article.preview && (
                      <p
                        className="mt-2 text-xs xl:text-sm leading-relaxed line-clamp-2"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {article.preview}
                      </p>
                    )}
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <TagBadge key={tag} label={tag} />
                        ))}
                      </div>
                    )}
                  </div>
                  <span
                    className="shrink-0 font-mono text-[11px]"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    {article.date.replace(/-/g, ".")}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
