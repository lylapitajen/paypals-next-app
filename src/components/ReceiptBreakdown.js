import TipDialog from "./TipDialog";
import ReceiptItemCard from "./ReceiptItemCard";
import { useReceipt } from "../app/receipt-context";
import ErrorMessageAlert from "./ErrorMessageAlert";

export default function ReceiptBreakdown({ items, discounts, subtotal, total, serviceCharge }) {
  const { tipAmount } = useReceipt();
  const calculatedSubtotal =
    Math.round(items.reduce((acc, { price, quantity }) => acc + price * quantity, 0) * 100) / 100;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ReceiptItemCard key={item.name} {...item} />
        ))}
      </div>
      {/* Discounts, tips etc. */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span className="font-medium">
            £{calculatedSubtotal.toFixed(2)}
            {/* TODO: Add a check here if subtotal is different to receipData.subtotal i.e. if scanning didn't work properly */}
          </span>
        </div>
        {subtotal && subtotal !== calculatedSubtotal && (
          <ErrorMessageAlert>
            <p>{"Subtotal doesn't match the scanned value from the receipt. Check all item details are correct."}</p>
          </ErrorMessageAlert>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Discounts</h2>
        {discounts.length ? (
          <ul className="flex flex-col gap-1">
            {discounts.map(({ description, amount }) => (
              <li key={description} className="flex justify-between items-center">
                <span>{description}</span>
                <span className="font-medium">-£{Math.abs(amount).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span className="italic text-stone-600">No discounts found</span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Gratuities</h2>
        <div className="flex justify-between items-center">
          <span>Service charge</span>
          <span className="font-medium">+£{serviceCharge.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span>Cash tip</span>
            <TipDialog></TipDialog>
          </div>
          <span className="font-medium">+£{tipAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-lg pt-2 border-t">
          <span>Total</span>
          <span className="font-bold">£{(total + tipAmount).toFixed(2)}</span>{" "}
        </div>
      </div>
    </section>
  );
}
