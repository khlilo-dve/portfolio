"use client";

import { Download } from "lucide-react";

interface DownloadButtonProps {
  rawContent: string;
  filename: string;
}

export function DownloadButton({ rawContent, filename }: DownloadButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([rawContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80 cursor-pointer"
      style={{ color: "var(--color-text-subtle)" }}
      title={`Download ${filename}`}
    >
      <Download size={14} />
      <span className="font-mono">.md</span>
    </button>
  );
}
