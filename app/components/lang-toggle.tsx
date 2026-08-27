"use client";

interface LangToggleProps {
  lang: "zh" | "en";
  setLang: (l: "zh" | "en") => void;
}

export function LangToggle({ lang, setLang }: LangToggleProps) {
  return (
    <div
      className="flex items-center rounded-md font-mono text-[11px]"
      style={{
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-bg-surface-raised)",
      }}
    >
      <button
        onClick={() => setLang("en")}
        className="px-2.5 py-1 rounded-l-md transition-all cursor-pointer"
        style={{
          color:
            lang === "en"
              ? "var(--color-text-heading)"
              : "var(--color-text-ghost)",
          backgroundColor:
            lang === "en" ? "var(--color-bg-active)" : "transparent",
        }}
      >
        EN
      </button>
      <div
        style={{
          width: "1px",
          height: "14px",
          backgroundColor: "var(--color-border-default)",
        }}
      />
      <button
        onClick={() => setLang("zh")}
        className="px-2.5 py-1 rounded-r-md transition-all cursor-pointer"
        style={{
          color:
            lang === "zh"
              ? "var(--color-text-heading)"
              : "var(--color-text-ghost)",
          backgroundColor:
            lang === "zh" ? "var(--color-bg-active)" : "transparent",
        }}
      >
        ZH
      </button>
    </div>
  );
}
