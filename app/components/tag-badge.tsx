interface TagBadgeProps {
  label: string;
}

export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span
      className="text-xs tracking-tight"
      style={{
        color: "var(--color-text-subtle)",
      }}
    >
      #{label}
    </span>
  );
}
