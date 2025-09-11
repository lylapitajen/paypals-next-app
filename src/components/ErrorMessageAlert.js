import { AlertTriangle } from "lucide-react";

export default function ErrorMessageAlert({ children }) {
  return (
    <div className="py-2 px-3 flex gap-3 bg-red-100/80 text-red-700 items-center font-medium">
      <AlertTriangle className="min-w-4 min-h-4" />
      {children}
    </div>
  );
}
