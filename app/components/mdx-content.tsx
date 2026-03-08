import { MDXRemote } from "next-mdx-remote/rsc";

interface MdxContentProps {
  source: string;
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <article className="mdx-content">
      <MDXRemote source={source} />
    </article>
  );
}
