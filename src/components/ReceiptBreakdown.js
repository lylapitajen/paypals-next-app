import { useState } from "react";
import TipDrawer from "./TipDrawer";
import ReceiptItemCard from "./ReceiptItemCard";

export default function ReceiptBreakdown({
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
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <ReceiptItemCard key={item.name} {...item} />
        ))}
      </div>
      {/* Discounts, tips etc. */}
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Discounts</h2>
        <ul className="flex flex-col gap-1">
          {discounts.map(({ description, amount }) => (
            <li key={description} className="flex justify-between items-center">
              <p>{description}</p>
              <p className="font-medium">£{amount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Others</h2>
        <div className="flex justify-between items-center">
          <p>{`Tax (${tax.rate}%)`}</p>
          <p className="font-medium">£{tax.amount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Tip</p>
          {tip ? (
            <p className="font-medium">£{tip.toFixed(2)}</p>
          ) : (
            <TipDrawer onTip={handleTip}></TipDrawer>
          )}
        </div>
        <div className="flex justify-between items-center text-lg pt-2 border-t border-neutral-200">
          <p>Total</p>
          <p className="font-bold">£{(total + tip).toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
}
