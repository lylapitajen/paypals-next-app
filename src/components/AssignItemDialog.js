import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import Button from "./Button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { User } from "lucide-react";
import { useReceipt } from "../app/receipt-context";
import { ScrollArea } from "./ui/scroll-area";

export default function AssignItemDialog({}) {
  const { payees } = useReceipt();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <User />
          Assign
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign item</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-80">
          <div className="flex flex-col gap-2">
            {payees.map(({ name, id }) => (
              <Label
                key={id}
                className="flex items-center gap-3 rounded-sm border p-3 has-[[aria-checked=true]]:border-green-950 has-[[aria-checked=true]]:bg-green-50"
              >
                <Checkbox className="data-[state=checked]:border-green-950 data-[state=checked]:bg-green-950 data-[state=checked]:text-white" />
                <span className="text-base">{name}</span>
              </Label>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button>Assign to pals</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
