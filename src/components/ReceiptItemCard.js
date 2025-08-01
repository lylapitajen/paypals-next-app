import Button from "./Button";
import { Edit, Plus, User } from "lucide-react";
export default function ReceiptItemCard({ name, price, quantity }) {
  return (
    <div className="border border-neutral-200 rounded-sm flex flex-col">
      <div className="flex justify-between py-2 px-3">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-md">{name}</p>
          <p className="text-sm text-neutral-600">
            £{price.toFixed(2)} x {quantity}
          </p>
        </div>
        <p>{`£${(price * quantity).toFixed(2)}`}</p>
      </div>
      <div className="flex justify-between items-center py-2 px-3 border-t border-neutral-200">
        <Button variant="ghost" icon={User}>
          Assign
        </Button>

        <div className="flex gap-2">
          <Button variant="secondary" icon={Edit} />
          <Button variant="secondary" icon={Plus} />
        </div>
      </div>
    </div>
  );
}
