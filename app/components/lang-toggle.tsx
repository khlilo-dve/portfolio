"use client";

interface LangToggleProps {
  lang: "zh" | "en";
  setLang: (l: "zh" | "en") => void;
}

export function LangToggle({ lang, setLang }: LangToggleProps) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-xs" style={{ color: "var(--color-text-subtle)" }}>
      <button
        onClick={() => setLang("zh")}
        className="transition-opacity hover:opacity-100 cursor-pointer"
        style={{
          color: lang === "zh" ? "var(--color-text-primary)" : "var(--color-text-ghost)",
          fontWeight: lang === "zh" ? "600" : "400",
        }}
      >
        中
      </button>
      <span style={{ color: "var(--color-border-default)" }}>/</span>
      <button
        onClick={() => setLang("en")}
        className="transition-opacity hover:opacity-100 cursor-pointer"
        style={{
          color: lang === "en" ? "var(--color-text-primary)" : "var(--color-text-ghost)",
          fontWeight: lang === "en" ? "600" : "400",
        }}
      >
        EN
      </button>
    </div>
  );
}
