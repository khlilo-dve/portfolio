import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  preview?: string;
  tags?: string[];
  github?: string;
  demo?: string;
  stack?: string[];
}

export interface Article extends ArticleMeta {
  content: string;
}

function getDir(category: string) {
  return path.join(contentDir, category);
}

export function getAllSlugs(category: string): string[] {
  const dir = getDir(category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") && !f.endsWith(".en.mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function extractMeta(slug: string, data: Record<string, unknown>): ArticleMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    summary: data.summary as string | undefined,
    preview: data.preview as string | undefined,
    tags: data.tags as string[] | undefined,
    github: data.github as string | undefined,
    demo: data.demo as string | undefined,
    stack: data.stack as string[] | undefined,
  };
}

export function getAllArticles(category: string): ArticleMeta[] {
  const slugs = getAllSlugs(category);
  const articles = slugs.map((slug) => {
    const filePath = path.join(getDir(category), `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return extractMeta(slug, data);
  });
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticle(category: string, slug: string): Article {
  const filePath = path.join(getDir(category), `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...extractMeta(slug, data), content };
}

export function getRawArticle(category: string, slug: string): string {
  const filePath = path.join(getDir(category), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf-8");
}

export function getRawArticleEnglish(
  category: string,
  slug: string
): string | null {
  const filePath = path.join(getDir(category), `${slug}.en.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getArticleEnglish(
  category: string,
  slug: string
): Article | null {
  const filePath = path.join(getDir(category), `${slug}.en.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...extractMeta(slug, data), content };
}
