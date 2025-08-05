import { getInitials } from "@/lib/utils";
import { useMemo } from "react";

export default function Avatar({ name, size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-16 h-16",
  };

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

  const getRandomColorClass = () => {
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  };
  // Use useMemo to avoid recalculating the color class on every render i.e. when user types a new name
  const avatarColor = useMemo(() => {
    return getRandomColorClass();
  }, []);

  const { bg, text } = avatarColor;

  return (
    <div
      className={`${sizeClasses[size]} rounded-full ${bg} ${text} flex items-center justify-center font-medium text-sm`}
    >
      {getInitials(name)}
    </div>
  );
}
