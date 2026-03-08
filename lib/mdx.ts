import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
}

export interface Article extends ArticleMeta {
  content: string;
}

function parseFrontmatter(raw: string): {
  data: Record<string, string | string[]>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    if (val.startsWith("[") && val.endsWith("]")) {
      data[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else {
      data[key] = val;
    }
  }
  return { data, content: match[2] };
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

export function getAllArticles(category: string): ArticleMeta[] {
  const slugs = getAllSlugs(category);
  const articles = slugs.map((slug) => {
    const filePath = path.join(getDir(category), `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = parseFrontmatter(raw);
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      summary: data.summary as string | undefined,
      tags: data.tags as string[] | undefined,
    };
  });
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticle(category: string, slug: string): Article {
  const filePath = path.join(getDir(category), `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    summary: data.summary as string | undefined,
    tags: data.tags as string[] | undefined,
    content,
  };
}

export function getArticleEnglish(
  category: string,
  slug: string
): Article | null {
  const filePath = path.join(getDir(category), `${slug}.en.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    summary: data.summary as string | undefined,
    tags: data.tags as string[] | undefined,
    content,
  };
}
