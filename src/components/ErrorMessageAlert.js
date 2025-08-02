import { AlertCircle } from "lucide-react";

export default function ErrorMessageAlert({ message }) {
  return (
    <div className="py-2 px-3 flex gap-2 bg-red-50 text-red-700 rounded-sm items-center">
      <AlertCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
}
