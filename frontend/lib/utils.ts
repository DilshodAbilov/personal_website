import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind class'larni xavfsiz birlashtirish. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ko'p tilli obyektdan joriy tilga mos maydonni tanlash.
 * Masalan: localized(post, "title", "uz") -> post.title_uz (yoki fallback).
 */
export function localized<T extends object>(
  obj: T,
  field: string,
  locale: string,
): string {
  const rec = obj as Record<string, unknown>;
  const value = rec[`${field}_${locale}`] as string | undefined;
  if (value) return value;
  // Fallback tartibi: en -> uz -> ru
  for (const fallback of ["en", "uz", "ru"]) {
    const v = rec[`${field}_${fallback}`] as string | undefined;
    if (v) return v;
  }
  return "";
}
