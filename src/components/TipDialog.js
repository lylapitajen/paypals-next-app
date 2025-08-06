import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Edit } from "lucide-react";
import Button from "./Button";
import { Input } from "./ui/input";
import { useReceipt } from "../app/receipt-context";
import { useEffect, useState } from "react";
import ErrorMessageAlert from "./ErrorMessageAlert";

export default function TipDialog() {
  const { tipAmount, setTipAmount } = useReceipt();
  const [errorMessage, setErrorMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleTipChange = (tipValue) => {
    if (!tipValue || isNaN(tipValue) || tipValue < 0) {
      setErrorMessage("Please enter a number greater or equal to 0");
      return;
    }
    setTipAmount(Number(tipValue));
    setIsOpen(false);
    setErrorMessage(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a tip</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mt-3 mb-3">
            {/* TODO determine the currency based on receipt data */}
            <span className="font-medium text-neutral-600">£</span>
            <Input
              type="number"
              placeholder="Enter amount"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={() => setErrorMessage(undefined)}
            />
          </div>
          {errorMessage && <ErrorMessageAlert message={errorMessage} />}
        </div>
        <DialogFooter>
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setErrorMessage(undefined)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => handleTipChange(inputValue)}>Add tip</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
