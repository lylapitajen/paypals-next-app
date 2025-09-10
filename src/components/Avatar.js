import { getInitials } from "@/lib/utils";

export default function Avatar({ name, size = "md", avatarColor }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full ${avatarColor.bg} ${avatarColor.text} flex items-center justify-center font-medium text-sm`}
    >
      {getInitials(name)}
    </div>
  );
}
