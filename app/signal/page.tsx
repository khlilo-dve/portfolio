import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";

export default function SignalPage() {
  const articles = getAllArticles("signal");

  return (
    <SectionWrapper>
      <SectionHeader
        title="/Signal"
        subtitle="认知沉淀 — 经过深度思考后输出的观点与方法论"
      />

      {articles.length === 0 ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "var(--color-text-ghost)" }}
        >
          &gt;_ awaiting signal...
        </p>
      ) : (
        <div className="space-y-0">
          {articles.map((article, i) => (
            <div
              key={article.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Link
                href={`/signal/${article.slug}`}
                className="group flex items-baseline justify-between py-4 transition-all"
                style={{ borderBottom: "1px solid var(--color-border-dim)" }}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-mono text-xs xl:text-sm shrink-0"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    {article.date.replace(/-/g, ".")}
                  </span>
                  <span
                    className="font-serif text-base md:text-lg transition-colors group-hover:opacity-80"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {article.title}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-40"
                  style={{ color: "var(--color-text-primary)" }}
                />
              </Link>
            </div>
          ))}
        </div>
      )}

      <div
        className="mt-16 rounded-lg p-6 animate-fade-in"
        style={{
          animationDelay: "0.3s",
          border: "1px solid var(--color-border-default)",
          backgroundColor: "var(--color-bg-surface-raised)",
        }}
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div
            className="h-28 w-28 shrink-0 overflow-hidden rounded-lg"
            style={{
              border: "1px solid var(--color-border-default)",
            }}
          >
            <Image
              src="/wechat-qrcode.png"
              alt="微信公众号二维码"
              width={112}
              height={112}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p
              className="font-mono text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              &gt;_ Subscribe to Signal
            </p>
            <p
              className="mt-2 text-xs leading-relaxed"
              style={{ color: "var(--color-text-ghost)" }}
            >
              扫描二维码关注微信公众号，获取最新的认知输出与深度思考。
              <br />
              低频更新，仅在有真正值得分享的内容时推送。
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
