interface TagBadgeProps {
  label: string;
}

export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span
      className="rounded px-2 py-0.5 font-mono text-[11px]"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        backgroundColor: "rgba(255,255,255,0.03)",
        color: "rgba(255,255,255,0.4)",
      }}
    >
      {label}
    </span>
  );
}
