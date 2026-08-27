import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MdxContent } from "./mdx-content";
import { BilingualBody } from "./bilingual-body";
import { TagBadge } from "./tag-badge";
import { DownloadButton } from "./download-button";

interface ArticleLayoutProps {
  slug: string;
  title: string;
  titleEn?: string;
  date: string;
  tags?: string[];
  backHref: string;
  backLabel: string;
  content: string;
  contentEn?: string;
  rawContent: string;
  rawContentEn?: string | null;
}

export function ArticleLayout({
  slug,
  title,
  titleEn,
  date,
  tags,
  backHref,
  backLabel,
  content,
  contentEn,
  rawContent,
  rawContentEn,
}: ArticleLayoutProps) {
  const hasEn = !!contentEn;
  const dlFilename = `${slug}.md`;
  const dlFilenameEn = `${slug}.en.md`;

  if (!hasEn) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="flex items-center justify-between">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
            style={{ color: "var(--color-text-subtle)" }}
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>
          <DownloadButton rawContent={rawContent} filename={dlFilename} />
        </div>
        <header className="mt-8 mb-12">
          <h1
            className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.3] tracking-tight"
            style={{ color: "var(--color-text-heading)" }}
          >
            {title}
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
        rawContent={rawContent}
        rawContentEn={rawContentEn}
        dlFilename={dlFilename}
        dlFilenameEn={dlFilenameEn}
      />
    </section>
  );
}
