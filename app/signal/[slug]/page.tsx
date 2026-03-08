import { getAllSlugs, getArticle } from "@/lib/mdx";
import { ArticleLayout } from "@/app/components/article-layout";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSlugs("signal").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle("signal", slug);
  return { title: `${article.title} — khlilo` };
}

export default async function SignalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getAllSlugs("signal");
  if (!slugs.includes(slug)) notFound();

  const article = getArticle("signal", slug);

  return (
    <ArticleLayout
      title={article.title}
      date={article.date}
      tags={article.tags}
      backHref="/signal"
      backLabel="← /Signal"
      content={article.content}
    />
  );
}
