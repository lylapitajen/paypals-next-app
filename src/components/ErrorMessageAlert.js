import { AlertCircle, AlertTriangle } from "lucide-react";

export default function ErrorMessageAlert({ children }) {
  return (
    <div className="py-2 px-3 flex gap-4 bg-red-50 text-red-700 rounded-sm items-center">
      <AlertTriangle className="w-4 h-4" />
      {children}
    </div>
  );
}
