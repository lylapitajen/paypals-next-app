"use client";
import Button from "@/components/Button";
import { AlertCircle, Plus, X } from "lucide-react";
import { useReceipt } from "@/app/receipt-context";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";

export default function AddPalsPage() {
  const { payees, addPayee, removePayee } = useReceipt();
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const handleInput = (e) => {
    if (e.target.value) {
      setInputValue(e.target.value);
    }
  };

  const handleContinue = () => {
    if (payees.length === 0) {
      setHasError(true);
      return;
    }
    router.push("/receipt");
  };

  const router = useRouter();
  return (
    <div className="flex flex-col gap-6 flex-1">
      <h1 className="text-2xl font-semibold">Add your pals</h1>
      <ul className="flex flex-col gap-2">
        {payees.map(({ name, id }) => (
          <li key={id}>
            <div className="flex justify-between items-center py-2 px-3 rounded-sm border border-neutral-200">
              <div className="flex gap-2 items-center">
                <Avatar name={name} />
                {name}
              </div>
              <Button
                variant="ghost"
                icon={X}
                onClick={() => removePayee(id)}
              ></Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 mt-auto">
        {hasError && (
          <div className="py-2 px-3 flex gap-2 bg-red-50 text-red-700 rounded-sm items-center">
            <AlertCircle className="w-4 h-4" />
            <p>Add at least one person to continue.</p>
            {/* Remove error message when user starts to type a name */}
          </div>
        )}
        <form className="flex gap-2">
          <Input type="text" onChange={handleInput} value={inputValue} />
          <Button
            variant="secondary"
            onClick={(e) => {
              addPayee(inputValue);
              setInputValue("");
              e.preventDefault();
            }}
          >
            <Plus />
          </Button>
        </form>
        <div className="flex flex-col gap-2 mt-auto">
          <Button onClick={handleContinue}>Continue</Button>
          <Button variant="secondary">Back</Button>
        </div>
      </div>
    </div>
  );
}
