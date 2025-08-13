import { useState } from "react";
import TipDialog from "./TipDialog";
import ReceiptItemCard from "./ReceiptItemCard";
import { useReceipt } from "../app/receipt-context";

export default function ReceiptBreakdown({ items, discounts, subtotal, total, serviceCharge }) {
  const { tipAmount } = useReceipt();
  const calculatedSubtotal = subtotal || items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <ReceiptItemCard key={item.name} {...item} />
        ))}
      </div>
      {/* Discounts, tips etc. */}
      <div className="flex justify-between items-center">
        <span>Subtotal</span>
        <span className="font-medium">£{calculatedSubtotal.toFixed(2)}</span>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Discounts</h2>
        {discounts.length ? (
          <ul className="flex flex-col gap-1">
            {discounts.map(({ description, amount }) => (
              <li key={description} className="flex justify-between items-center">
                <span>{description}</span>
                <span className="font-medium">£{amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span className="italic text-neutral-600">No discounts found</span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Gratuities</h2>
        <div className="flex justify-between items-center">
          <span>Service charge - {serviceCharge.rate}%</span>
          <span className="font-medium">£{serviceCharge.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span>Cash tip</span>
            <TipDialog></TipDialog>
          </div>
          <span className="font-medium">£{tipAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-lg pt-2 border-t border-neutral-200">
          <span>Total</span>
          <span className="font-bold">£{(total + tipAmount).toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}
