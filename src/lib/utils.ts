import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Capitalize the first character of a trimmed first name. */
export function formatFirstName(firstName: string): string {
  const trimmed = firstName.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/** Replace `{firstName}` placeholders with a formatted name, or strip cleanly when empty. */
export function personalizeText(text: string, firstName: string): string {
  const name = formatFirstName(firstName);
  if (name) {
    return text.replaceAll("{firstName}", name);
  }
  return text
    .replace(/,\s*\{firstName\}/g, "")
    .replace(/\{firstName\},\s*/g, "")
    .replace(/\s*\{firstName\}/g, "")
    .replace(/\{firstName\}/g, "");
}
