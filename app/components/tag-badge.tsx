interface TagBadgeProps {
  label: string;
}

export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span
      className="rounded px-2 py-0.5 font-mono text-[11px]"
      style={{
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-bg-surface-raised)",
        color: "var(--color-text-subtle)",
      }}
    >
      {label}
    </span>
  );
}
