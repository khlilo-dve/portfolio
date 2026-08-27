"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, X } from "lucide-react";
import { XLogo } from "./x-logo";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/signal", label: "Signal" },
  { href: "/node", label: "Node" },
  { href: "/pow", label: "PoW" },
  { href: "/beacon", label: "Beacon" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "var(--color-bg-header)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-3xl xl:max-w-4xl items-center justify-between px-6 xl:px-8">
        <Link
          href="/"
          className="font-serif text-lg font-normal tracking-[-0.01em] transition-opacity hover:opacity-75"
          style={{ color: "var(--color-text-primary)" }}
        >
          khlilo
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-opacity hover:opacity-100"
              style={{
                color:
                  pathname === link.href
                    ? "var(--color-text-primary)"
                    : "var(--color-text-muted)",
                fontWeight: pathname === link.href ? "500" : "400",
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
            className="transition-opacity hover:opacity-75"
            style={{ color: "var(--color-text-subtle)" }}
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://x.com/khlilo_"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-75"
            style={{ color: "var(--color-text-subtle)" }}
            aria-label="X (Twitter)"
          >
            <XLogo size={15} />
          </a>
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-2 md:hidden transition-opacity hover:opacity-75"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
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
              backgroundColor: "var(--color-bg-mobile-nav)",
              borderTop: "1px solid var(--color-border-dim)",
            }}
          >
            <div className="flex flex-col px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-base transition-opacity hover:opacity-80"
                  style={{
                    color:
                      pathname === link.href
                        ? "var(--color-text-primary)"
                        : "var(--color-text-muted)",
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
