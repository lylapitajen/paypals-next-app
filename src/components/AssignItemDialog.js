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
import { useEffect, useState } from "react";

export default function AssignItemDialog({ selectedItemID }) {
  const { pals, receiptData, setReceiptData } = useReceipt();
  const [selectedPals, setSelectedPals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = receiptData.items.find(
    (item) => item.id === selectedItemID
  );

  useEffect(() => {
    console.log("Selected Pals:", selectedPals);
  }, [selectedPals]);

  const handleAssign = () => {
    selectedItem.assignedPals = [...selectedPals];

    setReceiptData((prevData) => ({
      ...prevData,
      // returns a new Items array, if item.id matches selectedItemID, it replaces it with the updated selectedItem
      items: prevData.items.map((item) =>
        item.id === selectedItemID ? selectedItem : item
      ),
    }));
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
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
            {pals.map(({ name, id, avatarColor }) => (
              <Label
                key={id}
                className="flex items-center gap-3 rounded-sm border p-3 has-[[aria-checked=true]]:border-green-950 has-[[aria-checked=true]]:bg-green-50"
              >
                <Checkbox
                  checked={selectedPals.some((pal) => pal.id === id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedPals((prev) => [
                        ...prev,
                        { id, name, avatarColor },
                      ]);
                    } else {
                      setSelectedPals((prev) =>
                        prev.filter((pal) => pal.id !== id)
                      );
                    }
                  }}
                  className="data-[state=checked]:border-green-950 data-[state=checked]:bg-green-950 data-[state=checked]:text-white"
                />
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
            <Button onClick={() => handleAssign()}>Assign to pals</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
