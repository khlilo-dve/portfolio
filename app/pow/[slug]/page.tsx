import { getAllSlugs, getArticle, getArticleEnglish } from "@/lib/mdx";
import { ProjectLayout } from "@/app/components/project-layout";
import { MdxContent } from "@/app/components/mdx-content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSlugs("pow").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle("pow", slug);
  return {
    title: `${article.title} — khlilo`,
    description: article.summary,
    keywords: article.stack?.join(", "),
    openGraph: {
      title: `${article.title} — khlilo`,
      description: article.summary,
      type: "article",
      siteName: "khlilo",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getAllSlugs("pow");
  if (!slugs.includes(slug)) notFound();

  const article = getArticle("pow", slug);
  const articleEn = getArticleEnglish("pow", slug);

  // Pre-render MDX content as server components so they can be
  // safely consumed by the client-side ProjectLayout.
  const zhBody = <MdxContent source={article.content} />;
  const enBody = articleEn ? <MdxContent source={articleEn.content} /> : null;

  return (
    <ProjectLayout
      title={article.title}
      titleEn={articleEn?.title}
      date={article.date}
      summary={article.summary}
      stack={article.stack}
      github={article.github}
      demo={article.demo}
      zhBody={zhBody}
      enBody={enBody}
    />
  );
}
