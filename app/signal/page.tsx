import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";

export default function SignalPage() {
  const articles = getAllArticles("signal");

  return (
    <SectionWrapper>
      <SectionHeader
        title="Signal"
        subtitle="认知沉淀 — 经过深度思考后输出的观点与方法论"
      />

      {articles.length === 0 ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "var(--color-text-ghost)" }}
        >
          暂无已发布信号
        </p>
      ) : (
        <div className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
          {articles.map((article, i) => (
            <div
              key={article.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <Link
                href={`/signal/${article.slug}`}
                className="group flex items-baseline justify-between py-5 transition-opacity hover:opacity-75"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                  <time
                    className="font-mono text-xs shrink-0"
                    style={{ color: "var(--color-text-ghost)" }}
                  >
                    {article.date.replace(/-/g, ".")}
                  </time>
                  <span
                    className="font-serif text-lg md:text-xl font-normal tracking-[-0.01em]"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {article.title}
                  </span>
                </div>
                <span
                  className="font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: "var(--color-text-ghost)" }}
                >
                  ↗
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* 尾注订阅区 (Colophon) — 纯排版去卡片 */}
      <div
        className="mt-20 pt-10 border-t animate-fade-in"
        style={{
          borderColor: "var(--color-border-subtle)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div
            className="h-24 w-24 shrink-0 overflow-hidden border"
            style={{
              borderColor: "var(--color-border-default)",
            }}
          >
            <Image
              src="/wechat-qrcode.png"
              alt="微信公众号二维码"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3
              className="font-serif text-base md:text-lg font-normal"
              style={{ color: "var(--color-text-heading)" }}
            >
              微信公众号订阅
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              扫描二维码关注公众号，获取最新的认知输出与深度思考。
              低频更新，仅在有真正值得分享的内容时推送。
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
