"use client";

import { Github, Mail, Twitter, QrCode, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const socialLinks = [
  { href: "https://github.com/khlilo-dve", icon: Github, label: "GitHub" },
  { href: "mailto:ferkasybilla312@gmail.com", icon: Mail, label: "Email" },
  { href: "https://x.com/khlilo_", icon: Twitter, label: "X" },
];

export function Footer() {
  const [showQr, setShowQr] = useState(false);

  return (
    <>
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
          <p
            className="font-mono text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
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
                style={{ color: "rgba(255,255,255,0.2)" }}
                aria-label={link.label}
              >
                <link.icon size={15} />
              </a>
            ))}
            <button
              onClick={() => setShowQr(true)}
              className="transition-opacity hover:opacity-70 cursor-pointer"
              style={{ color: "rgba(255,255,255,0.2)" }}
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
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={() => setShowQr(false)}
        >
          <div
            className="relative rounded-xl p-6"
            style={{
              backgroundColor: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-3 right-3 transition-opacity hover:opacity-70 cursor-pointer"
              style={{ color: "rgba(255,255,255,0.4)" }}
              aria-label="关闭"
            >
              <X size={16} />
            </button>

            <p
              className="mb-4 text-center font-mono text-xs"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              微信扫码关注公众号
            </p>
            <div
              className="overflow-hidden rounded-lg"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
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
