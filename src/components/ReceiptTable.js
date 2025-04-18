import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "./Button";
import { User, Plus } from "lucide-react";
import { useState } from "react";
import TipDrawer from "./TipDrawer";

export default function ReceiptTable({
  items,
  discounts,
  tax,
  subtotal,
  total,
}) {
  const [tip, setTip] = useState(0);
  const handleTip = (tip) => setTip(tip);
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-medium">Receipt items</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Item</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Payee(s)</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b border-b-neutral-400">
          {items.map(({ name, quantity, price, id }) => {
            return (
              <TableRow key={id}>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>£{price.toFixed(2)}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell className="text-right">
                  <Button text="Assign" icon={User} variant="ghost" />
                </TableCell>
                <TableCell className="text-right">
                  £{quantity * price}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter className="bg-white">
          <TableRow className="border-t border-t-neutral-400">
            <TableCell colSpan={4}>Subtotal</TableCell>
            <TableCell className="text-right">£{subtotal}</TableCell>
          </TableRow>
          {discounts.length > 0 &&
            discounts.map((discount, i) => (
              <TableRow key={i}>
                <TableCell colSpan={4}>
                  Discount - {discount.description}
                </TableCell>
                <TableCell className="text-right">{discount.amount}</TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={4}>Tax</TableCell>
            <TableCell className="text-right">£{tax.amount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Tip</TableCell>
            <TableCell className="text-right">
              <TipDrawer />
            </TableCell>
          </TableRow>
          <TableRow className="border-t-2 border-neutral-800">
            <TableCell colSpan={4} className="text-lg">
              Total
            </TableCell>
            <TableCell className="text-right text-lg">£{total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
