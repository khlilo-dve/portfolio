import { getAllSlugs, getArticle } from "@/lib/mdx";
import { ArticleLayout } from "@/app/components/article-layout";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSlugs("signal").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle("signal", params.slug);
  return { title: `${article.title} — khlilo` };
}

export default function SignalArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const slugs = getAllSlugs("signal");
  if (!slugs.includes(params.slug)) notFound();

  const article = getArticle("signal", params.slug);

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
