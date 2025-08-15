"use client";
import Avatar from "@/components/Avatar";
import { useReceipt } from "../receipt-context";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Button from "@/components/Button";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TotalsPage() {
  const { pals, setPals, receiptData, tipAmount } = useReceipt();
  const [loading, setLoading] = useState(true);
  const tipShare = tipAmount / pals.length;
  const serviceChargeMultiplier = receiptData.serviceCharge.rate / 100 || 0;
  const discountsMultiplier = receiptData.discounts.reduce((acc, { percentage }) => acc + percentage / 100, 0);
  const router = useRouter();

  useEffect(() => {
    if (!receiptData) {
      router.push("/");
    }
  }, [receiptData]);

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
    return <LoadingSpinner message="Calculating totals..." />;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Totals</h1>
      <Accordion type="single" collapsible className="w-full flex flex-col gap-2">
        {pals.map((pal) => {
          //prettier-ignore
          const finalTotal = pal.itemsTotal + (pal.itemsTotal * serviceChargeMultiplier) - (pal.itemsTotal * discountsMultiplier) + tipShare;

          return (
            <AccordionItem value={pal.name} key={pal.id} className="card hover:cursor-pointer last:border-b-1">
              <AccordionTrigger className="p-0 items-center gap-2">
                <div className="flex justify-between items-center w-full text-base">
                  <div className="flex gap-2 items-center">
                    <Avatar {...pal} />
                    <span className="font-medium">{pal.name}</span>
                  </div>
                  <span className="font-semibold">£{finalTotal.toFixed(2)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 mt-3 pb-0">
                <span className="font-medium">Items</span>
                {receiptData.items.map(({ assignedPals, name }) => {
                  const isAssigned = assignedPals.some(({ id }) => id === pal.id);
                  if (isAssigned) {
                    return <p key={name}>{name}</p>;
                  }
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <div className="mx-auto mt-auto">
        <Button variant="ghost" onClick={() => router.push("/")}>
          <Upload />
          Upload another receipt
        </Button>
      </div>
    </>
  );
}
