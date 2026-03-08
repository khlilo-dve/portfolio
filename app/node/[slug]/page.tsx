import { getAllSlugs, getArticle, getArticleEnglish } from "@/lib/mdx";
import { ArticleLayout } from "@/app/components/article-layout";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSlugs("node").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle("node", slug);
  return { title: `${article.title} — khlilo` };
}

export default async function NodeArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getAllSlugs("node");
  if (!slugs.includes(slug)) notFound();

  const article = getArticle("node", slug);
  const articleEn = getArticleEnglish("node", slug);

  return (
    <ArticleLayout
      title={article.title}
      titleEn={articleEn?.title}
      date={article.date}
      tags={article.tags}
      backHref="/node"
      backLabel="← /Node"
      content={article.content}
      contentEn={articleEn?.content}
    />
  );
}
