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
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="flex items-center justify-between pb-6 border-b" style={{ borderColor: "var(--color-border-subtle)" }}>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-75"
            style={{ color: "var(--color-text-subtle)" }}
          >
            <ArrowLeft size={13} />
            {backLabel}
          </Link>
          <DownloadButton rawContent={rawContent} filename={dlFilename} />
        </div>

        <header className="mt-10 mb-12">
          <h1
            className="font-serif text-3xl md:text-4xl lg:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em]"
            style={{ color: "var(--color-text-heading)" }}
          >
            {title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs">
            <time
              className="font-mono text-xs"
              style={{ color: "var(--color-text-ghost)" }}
            >
              {date}
            </time>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagBadge key={tag} label={tag} />
                ))}
              </div>
            )}
          </div>
        </header>

        <MdxContent source={content} />
      </article>
    );
  }

  const zhBody = <MdxContent source={content} />;
  const enBody = <MdxContent source={contentEn!} />;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
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
    </article>
  );
}
