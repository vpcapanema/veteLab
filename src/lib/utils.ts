import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function publicAsset(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}/${path.replace(/^\//, "")}`;
}

export function formatPhone(digits: string) {
  const only = digits.replace(/\D/g, "");
  if (only.length === 11) {
    return `(${only.slice(0, 2)}) ${only.slice(2, 7)}-${only.slice(7)}`;
  }
  if (only.length === 10) {
    return `(${only.slice(0, 2)}) ${only.slice(2, 6)}-${only.slice(6)}`;
  }
  return digits;
}

export function whatsappLink(rawPhone: string, message?: string) {
  const digits = rawPhone.replace(/\D/g, "");
  const base = `https://wa.me/55${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
