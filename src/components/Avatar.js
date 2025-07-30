import { getInitials } from "@/lib/utils";
export default function Avatar({ name, size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-medium text-sm`}
    >
      {getInitials(name)}
    </div>
  );
}
