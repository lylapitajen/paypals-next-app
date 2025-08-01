import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { HandCoins, Plus } from "lucide-react";
import Button from "./Button";
import { Input } from "./ui/input";

export default function TipDialog(handleTip) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <HandCoins />
          Add tip
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a tip</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 mt-3 mb-3">
          {/* TO:DO determine the currency based on receipt data */}
          <p className="font-medium text-neutral-600">£</p>
          <Input type="text" placeholder="Enter amount" />
        </div>
        <DialogFooter>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary">Cancel</Button>
            <Button onClick={() => handleTip}>Add tip</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
