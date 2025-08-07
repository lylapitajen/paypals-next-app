"use client";
import Avatar from "@/components/Avatar";
import { useReceipt } from "../receipt-context";
import { useEffect } from "react";
import { ReceiptIcon } from "lucide-react";

export default function TotalsPage() {
  const { pals, receiptData, tipAmount } = useReceipt();

  useEffect(() => {
    console.log(pals, "pals");
    console.log(receiptData.items, "Items");
    console.log(totalDiscountShare, "Total Discount");
  }, [pals, receiptData]);

  const totalDiscountShare = receiptData.discounts.reduce((acc, discount) => acc + discount.amount, 0) / pals.length;
  const tipShare = tipAmount / pals.length;

  // temp array to add to total share for each item is calculated
  const palSharesArray = pals.map((pal) => ({ id: pal.id, shares: [] }));

  // Calculate share for each item for each pal assigned to item
  for (const { quantity, price, assignedPals, id } of receiptData.items) {
    // Calculate total share per pal assigned, this is equally shared for now.
    const palShare = (quantity * price) / assignedPals.length;

    for (const assignedPal of assignedPals) {
      const currentPal = palSharesArray.find((p) => p.id === assignedPal.id);
      if (currentPal) {
        currentPal.shares.push(palShare);
      }
    }
  }

  //   Calculate total share per pal
  for (const pal of palSharesArray) {
    const currentPal = pals.find((p) => p.id === pal.id);
    const palItemsTotal = pal.shares.reduce((acc, share) => acc + share, 0);
    currentPal.total = palItemsTotal + tipShare - totalDiscountShare;
  }

  // KUBS
  //   const palsTotal = pals.map((pal) => ({
  //     ...pal,
  //     total:
  //       receiptData.items.reduce(
  //         (a, c) => a + (c.assignedPals.some((x) => x.id === pal.id) ? c.price / c.assignedPals.length : 0),
  //         0
  //       ) +
  //       receiptData.discounts[0].amount / pals.length,
  //   }));

  return (
    <>
      <h1 className="text-2xl font-semibold">Totals</h1>
      <div className="flex flex-col gap-4">
        {pals.map((pal) => {
          return (
            <div key={pal.id} className="flex flex-col gap-4 border border-neutral-200 rounded-sm py-2 px-3">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Avatar {...pal} />
                  <span className="font-medium">{pal.name}</span>
                </div>
                <span>£{pal.total.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
