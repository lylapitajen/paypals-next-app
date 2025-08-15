"use client";
import { useReceipt } from "../receipt-context";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ReceiptBreakdown from "@/components/ReceiptBreakdown";
import { useRouter } from "next/navigation";
import ErrorMessageAlert from "@/components/ErrorMessageAlert";

export default function ReceiptPage() {
  const router = useRouter();
  const { receiptData } = useReceipt();
  const [hasError, setHasError] = useState(false);
  const [unassignedItems, setUnassignedItems] = useState([]);

  useEffect(() => {
    if (!receiptData) {
      router.push("/");
    }
  }, [receiptData]);

  useEffect(() => {
    unassignedItems.length ? setHasError(true) : setHasError(false);
  }, [unassignedItems]);

  const handleContinue = () => {
    const unassignedItemsCopy = receiptData.items.filter((item) => !item.assignedPals?.length);
    setUnassignedItems(unassignedItemsCopy);

    if (!unassignedItemsCopy.length) {
      router.push("/totals");
    }
  };

  useEffect(() => {
    console.log("receiptData on Receipt Page:", receiptData);
  }, [receiptData]);

  return (
    <>
      <h1 className="text-2xl font-semibold">Receipt Breakdown</h1>
      <ReceiptBreakdown {...receiptData} />
      <div className="flex flex-col gap-2 mt-auto">
        {hasError && (
          <ErrorMessageAlert>
            <div className="flex flex-col gap-1">
              <p>Please assign items to at least one pal:</p>
              <ul>
                {unassignedItems.map((item) => (
                  <li key={item.id} className="font-medium list-disc ml-4">
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </ErrorMessageAlert>
        )}
        <Button onClick={() => handleContinue()}>Calculate individual totals</Button>
        <Button variant="secondary" onClick={() => router.push("/add-pals")}>
          Back
        </Button>
      </div>
    </>
  );
}
