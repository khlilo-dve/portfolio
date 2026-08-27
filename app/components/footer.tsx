"use client";

import { Github, Mail, QrCode, X } from "lucide-react";
import { XLogo } from "./x-logo";
import { useState } from "react";
import Image from "next/image";

const socialLinks = [
  { href: "https://github.com/khlilo-dve", icon: Github, label: "GitHub" },
  { href: "mailto:ferkasybilla312@gmail.com", icon: Mail, label: "Email" },
  { href: "https://x.com/khlilo_", icon: XLogo, label: "X" },
];

export function Footer() {
  const [showQr, setShowQr] = useState(false);

  return (
    <>
      <footer style={{ borderTop: "1px solid var(--color-border-dim)" }}>
        <div className="mx-auto flex max-w-4xl xl:max-w-5xl 2xl:max-w-6xl items-center justify-between px-6 xl:px-8 py-8">
          <p
            className="font-mono text-xs"
            style={{ color: "var(--color-text-ghost)" }}
          >
            © {new Date().getFullYear()} khlilo. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="transition-opacity hover:opacity-70"
                style={{ color: "var(--color-text-ghost)" }}
                aria-label={link.label}
              >
                <link.icon size={15} />
              </a>
            ))}
            <button
              onClick={() => setShowQr(true)}
              className="transition-opacity hover:opacity-70 cursor-pointer"
              style={{ color: "var(--color-text-ghost)" }}
              aria-label="微信公众号"
            >
              <QrCode size={15} />
            </button>
          </div>
        </div>
      </footer>

      {showQr && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "var(--color-bg-overlay)" }}
          onClick={() => setShowQr(false)}
        >
          <div
            className="relative rounded-xl p-6"
            style={{
              backgroundColor: "var(--color-bg-modal)",
              border: "1px solid var(--color-border-default)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-3 right-3 transition-opacity hover:opacity-70 cursor-pointer"
              style={{ color: "var(--color-text-subtle)" }}
              aria-label="关闭"
            >
              <X size={16} />
            </button>

            <p
              className="mb-4 text-center font-mono text-xs"
              style={{ color: "var(--color-text-subtle)" }}
            >
              微信扫码关注公众号
            </p>
            <div
              className="overflow-hidden rounded-lg"
              style={{ border: "1px solid var(--color-border-subtle)" }}
            >
              <Image
                src="/wechat-qrcode.png"
                alt="微信公众号二维码"
                width={200}
                height={200}
                className="block"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
