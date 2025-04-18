import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Plus } from "lucide-react";
import Button from "./Button";
import { Input } from "./ui/input";

export default function TipDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          text="Add tip"
          variant="ghost"
          icon={Plus}
          //   onClick={handleTip}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a tip</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 mt-3 mb-3">
          {/* TO:DO determine the currency based on receipt data */}
          <p className="font-medium text-neutral-600">£</p>
          <Input type="text" placeholder="Enter tip amount" />
        </div>
        <DialogFooter>
          <Button variant="secondary" text="Cancel"></Button>
          <Button text="Add tip"></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
