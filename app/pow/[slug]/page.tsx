import { getAllSlugs, getArticle } from "@/lib/mdx";
import { ProjectLayout } from "@/app/components/project-layout";
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
  return { title: `${article.title} — khlilo` };
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

  return (
    <ProjectLayout
      title={article.title}
      date={article.date}
      summary={article.summary}
      stack={article.stack}
      github={article.github}
      demo={article.demo}
      content={article.content}
    />
  );
}
