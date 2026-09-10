const avatarPalette = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
];

/** Deterministic color per name, so the same patient always gets the same avatar color. */
export function getAvatarStyle(name: string): string {
  const code = name.charCodeAt(0) || 0;
  return avatarPalette[code % avatarPalette.length];
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}