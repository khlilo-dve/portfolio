"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, X } from "lucide-react";

function XLogo({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/signal", label: "/Signal 认知" },
  { href: "/node", label: "/Node 技术" },
  { href: "/pow", label: "/PoW 项目" },
  { href: "/beacon", label: "/Beacon 信标" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl items-center justify-between px-6 xl:px-8">
        <Link
          href="/"
          className="font-mono text-sm tracking-widest transition-colors"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          khlilo
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-[13px] transition-colors hover:opacity-90"
              style={{
                color:
                  pathname === link.href
                    ? "#ffffff"
                    : "rgba(255,255,255,0.5)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/khlilo-dve"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <Github size={16} />
          </a>
          <a
            href="https://x.com/khlilo_"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <XLogo size={16} />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-2 md:hidden transition-opacity hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden backdrop-blur-xl md:hidden"
            style={{
              backgroundColor: "rgba(0,0,0,0.92)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex flex-col px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm transition-opacity hover:opacity-80"
                  style={{
                    color:
                      pathname === link.href
                        ? "#ffffff"
                        : "rgba(255,255,255,0.5)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
