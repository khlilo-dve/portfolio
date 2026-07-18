import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MdxContent } from "./mdx-content";
import { BilingualBody } from "./bilingual-body";
import { TagBadge } from "./tag-badge";

interface ArticleLayoutProps {
  title: string;
  titleEn?: string;
  date: string;
  tags?: string[];
  backHref: string;
  backLabel: string;
  content: string;
  contentEn?: string;
}

export function ArticleLayout({
  title,
  titleEn,
  date,
  tags,
  backHref,
  backLabel,
  content,
  contentEn,
}: ArticleLayoutProps) {
  const hasEn = !!contentEn;

  if (!hasEn) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
          style={{ color: "var(--color-text-subtle)" }}
        >
          <ArrowLeft size={14} />
          {backLabel}
        </Link>
        <header className="mt-8 mb-12">
          <h1
            className="text-xl font-medium leading-relaxed md:text-2xl"
            style={{ color: "var(--color-text-heading)" }}
          >
            {title}
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <span
              className="font-mono text-xs"
              style={{ color: "var(--color-text-ghost)" }}
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
        <MdxContent source={content} />
      </section>
    );
  }

  const zhBody = <MdxContent source={content} />;
  const enBody = <MdxContent source={contentEn!} />;

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <BilingualBody
        backHref={backHref}
        backLabel={backLabel}
        title={title}
        titleEn={titleEn}
        date={date}
        tags={tags}
        zhBody={zhBody}
        enBody={enBody}
      />
    </section>
  );
}
