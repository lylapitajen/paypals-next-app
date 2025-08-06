import AssignItemDialog from "./AssignItemDialog";
import Button from "./Button";
import { Edit, Edit2, EditIcon, Plus, User } from "lucide-react";
import { useReceipt } from "@/app/receipt-context";
import Avatar from "./Avatar";

export default function ReceiptItemCard({ name, price, quantity, id }) {
  const { receiptData } = useReceipt();
  const selectedItem = receiptData.items.find((item) => item.id === id);

  return (
    <div className="border border-neutral-200 rounded-sm flex flex-col">
      <div className="flex justify-between py-2 px-3">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-md">{name}</span>
          <span className="text-sm text-neutral-600">
            £{price.toFixed(2)} x {quantity}
          </span>
        </div>
        <span>{`£${(price * quantity).toFixed(2)}`}</span>
      </div>
      <div className="flex justify-between items-center py-2 px-3 border-t border-neutral-200">
        <AssignItemDialog selectedItemID={id} />
        {selectedItem.assignedPals && (
          <div className="flex -space-x-1">
            {selectedItem.assignedPals.map((pal) => (
              <Avatar key={pal.id} {...pal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
