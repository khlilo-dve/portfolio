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
      <footer style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="mx-auto flex max-w-3xl xl:max-w-4xl items-center justify-between px-6 xl:px-8 py-10">
          <p
            className="text-xs"
            style={{ color: "var(--color-text-ghost)" }}
          >
            © {new Date().getFullYear()} khlilo. Builder &amp; Observer.
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
                className="transition-opacity hover:opacity-75"
                style={{ color: "var(--color-text-ghost)" }}
                aria-label={link.label}
              >
                <link.icon size={15} />
              </a>
            ))}
            <button
              onClick={() => setShowQr(true)}
              className="transition-opacity hover:opacity-75 cursor-pointer"
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: "var(--color-bg-overlay)" }}
          onClick={() => setShowQr(false)}
        >
          <div
            className="relative p-6 border shadow-2xl"
            style={{
              backgroundColor: "var(--color-bg-modal)",
              borderColor: "var(--color-border-default)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-4 right-4 transition-opacity hover:opacity-75 cursor-pointer"
              style={{ color: "var(--color-text-subtle)" }}
              aria-label="关闭"
            >
              <X size={16} />
            </button>

            <h3
              className="mb-4 text-center font-serif text-base font-normal"
              style={{ color: "var(--color-text-heading)" }}
            >
              微信公众号
            </h3>
            <div
              className="overflow-hidden border"
              style={{ borderColor: "var(--color-border-subtle)" }}
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
