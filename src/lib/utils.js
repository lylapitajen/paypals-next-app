import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getInitials(name) {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
}

export function generateAvatarColor() {
  const colorClasses = [
    { bg: "bg-red-100", text: "text-red-700" },
    { bg: "bg-orange-100", text: "text-orange-700" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-sky-100", text: "text-sky-700" },
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
    { bg: "bg-rose-100", text: "text-rose-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
    { bg: "bg-slate-100", text: "text-slate-700" },
  ];
  return colorClasses[Math.floor(Math.random() * colorClasses.length)];
}
