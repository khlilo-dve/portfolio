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
        border: "1px solid rgba(255,255,255,0.1)",
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      <button
        onClick={() => setLang("en")}
        className="px-2.5 py-1 rounded-l-md transition-all cursor-pointer"
        style={{
          color:
            lang === "en"
              ? "rgba(255,255,255,0.9)"
              : "rgba(255,255,255,0.3)",
          backgroundColor:
            lang === "en" ? "rgba(255,255,255,0.08)" : "transparent",
        }}
      >
        EN
      </button>
      <div
        style={{
          width: "1px",
          height: "14px",
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      />
      <button
        onClick={() => setLang("zh")}
        className="px-2.5 py-1 rounded-r-md transition-all cursor-pointer"
        style={{
          color:
            lang === "zh"
              ? "rgba(255,255,255,0.9)"
              : "rgba(255,255,255,0.3)",
          backgroundColor:
            lang === "zh" ? "rgba(255,255,255,0.08)" : "transparent",
        }}
      >
        ZH
      </button>
    </div>
  );
}
