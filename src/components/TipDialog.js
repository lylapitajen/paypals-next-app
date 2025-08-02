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
import { useState } from "react";

export default function TipDialog() {
  const { tipAmount, setTipAmount } = useReceipt();
  const [isOpen, setIsOpen] = useState(false);

  const handleTipChange = (tipAmount) => {
    setTipAmount(tipAmount);
    setIsOpen(false);
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
        <div className="flex items-center gap-2 mt-3 mb-3">
          {/* TO:DO determine the currency based on receipt data */}
          <span className="font-medium text-neutral-600">£</span>
          <Input type="text" placeholder="Enter amount" />
        </div>
        <DialogFooter>
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            {/* TO:DO add validation for the input */}
            <Button onClick={() => handleTipChange(tipAmount)}>Add tip</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
