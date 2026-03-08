"use client";

import { SectionWrapper, SectionHeader } from "../components/section-wrapper";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const articles: { slug: string; date: string; title: string }[] = [
  { slug: "我为什么不推荐大学生家教？", date: "2026.03.08", title: "我为什么不推荐大学生家教？" },
];

export default function SignalPage() {
  return (
    <SectionWrapper>
      <SectionHeader
        title="/Signal"
        subtitle="认知沉淀 — 经过深度思考后输出的观点与方法论"
      />

      {articles.length === 0 ? (
        <p
          className="py-12 text-center font-mono text-sm"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          &gt;_ awaiting signal...
        </p>
      ) : (
        <div className="space-y-0">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <Link
                href={`/signal/${article.slug}`}
                className="group flex items-baseline justify-between py-4 transition-all"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-mono text-xs shrink-0"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {article.date}
                  </span>
                  <span
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {article.title}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-40"
                  style={{ color: "#fff" }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-16 rounded-lg p-6"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div
            className="h-28 w-28 shrink-0 overflow-hidden rounded-lg"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
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
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              &gt;_ Subscribe to Signal
            </p>
            <p
              className="mt-2 text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              扫描二维码关注微信公众号，获取最新的认知输出与深度思考。
              <br />
              低频更新，仅在有真正值得分享的内容时推送。
            </p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
