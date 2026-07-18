"use client";
import { useState } from "react";

export function useBilingual() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  return { lang, setLang };
}
