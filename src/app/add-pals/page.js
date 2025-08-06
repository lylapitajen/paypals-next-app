"use client";
import Button from "@/components/Button";
import { AlertCircle, Plus, X } from "lucide-react";
import { useReceipt } from "@/app/receipt-context";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";
import ErrorMessageAlert from "@/components/ErrorMessageAlert";

export default function AddPalsPage() {
  const { pals, addPal, removePal } = useReceipt();
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleAddPal = (inputValue) => {
    if (inputValue.length === 0) {
      setErrorMessage("Please enter a name");
      return;
    }
    if (
      pals.find((pal) => pal.name.toLowerCase() === inputValue.toLowerCase())
    ) {
      setErrorMessage("This pal is already added");
      return;
    }
    addPal(inputValue);
    setErrorMessage(undefined);
    setInputValue("");
  };

  const handleContinue = () => {
    if (pals.length === 0) {
      setErrorMessage("Add at least one pal to continue");
      return;
    }
    router.push("/receipt");
  };

  const router = useRouter();
  return (
    <div className="flex flex-col gap-6 flex-1">
      <h1 className="text-2xl font-semibold">Add your pals</h1>
      <ul className="flex flex-col gap-2">
        {pals.map(({ name, id, avatarColor }) => (
          <li key={id}>
            <div className="flex justify-between items-center py-2 px-3 rounded-sm border border-neutral-200">
              <div className="flex gap-2 items-center">
                <Avatar name={name} avatarColor={avatarColor} />
                {name}
              </div>
              <Button variant="ghost" onClick={() => removePal(id)}>
                <X />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 mt-auto">
        {errorMessage && <ErrorMessageAlert message={errorMessage} />}
        <form className="flex gap-2">
          <Input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={() => {
              if (errorMessage) setErrorMessage(undefined);
            }}
            value={inputValue}
          />
          <Button
            variant="secondary"
            onClick={(e) => {
              handleAddPal(inputValue);
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
