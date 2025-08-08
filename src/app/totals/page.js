"use client";
import Avatar from "@/components/Avatar";
import { useReceipt } from "../receipt-context";
import { useEffect, useState } from "react";

export default function TotalsPage() {
  const { pals, setPals, receiptData, tipAmount } = useReceipt();
  const [loading, setLoading] = useState(true);
  const tipShare = tipAmount / pals.length;

  const calculateTotals = () => {
    setPals((prev) => {
      const palsCopy = prev.map((pal) => ({ ...pal, itemsTotal: 0 }));

      for (const { quantity, price, assignedPals, id } of receiptData.items) {
        // Calculate total share per pal assigned, this is equally shared for now.
        const itemSharePrice = (quantity * price) / assignedPals.length;

        const assignedPalIds = assignedPals.map(({ id }) => id);

        for (const pal of palsCopy) {
          // if current pal doesn't exist in the assignedPals array, move on to the next iteration
          if (assignedPalIds.indexOf(pal.id) === -1) continue;

          pal.itemsTotal += itemSharePrice;
        }
      }

      return palsCopy;
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    calculateTotals();
  }, []);

  if (loading) {
    return <span>loading...</span>;
  }

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
                <span>£{pal.itemsTotal.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
