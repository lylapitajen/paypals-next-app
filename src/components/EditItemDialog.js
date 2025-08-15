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
import { useReceipt } from "@/app/receipt-context";
import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function EditItemDialog({ selectedItemID }) {
  const { receiptData, setReceiptData } = useReceipt();
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = receiptData.items.find((item) => item.id === selectedItemID);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedItem = {
      name: formData.get("item-name"),
      price: parseFloat(formData.get("item-price")),
      quantity: parseInt(formData.get("item-quantity"), 10),
    };
    setReceiptData((prev) => {
      return {
        ...prev,
        items: prev.items.map((item) => (item.id === selectedItemID ? { id: selectedItem, ...updatedItem } : item)),
      };
    });
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
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription className="sr-only">Edit details of {selectedItem.name}</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input type="text" name="item-name" defaultValue={selectedItem.name}></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Price</Label>
            <Input type="number" name="item-price" step="any" defaultValue={selectedItem.price}></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Quantity</Label>
            <Input type="number" name="item-quantity" defaultValue={selectedItem.quantity}></Input>
          </div>
          <DialogFooter className="flex gap-2 justify-end mt-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
