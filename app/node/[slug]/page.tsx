import { getAllSlugs, getArticle } from "@/lib/mdx";
import { ArticleLayout } from "@/app/components/article-layout";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSlugs("node").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle("node", params.slug);
  return { title: `${article.title} — khlilo` };
}

export default function NodeArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const slugs = getAllSlugs("node");
  if (!slugs.includes(params.slug)) notFound();

  const article = getArticle("node", params.slug);

  return (
    <ArticleLayout
      title={article.title}
      date={article.date}
      tags={article.tags}
      backHref="/node"
      backLabel="← /Node"
      content={article.content}
    />
  );
}
