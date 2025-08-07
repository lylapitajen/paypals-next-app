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
  const [hasError, setHasError] = useState();
  const [unAssignedItems, setUnassignedItems] = useState([]);

  const handleContinue = () => {
    setUnassignedItems(
      receiptData.items.filter((item) => !item.assignedPals.length)
    );
    if (unAssignedItems.length) {
      setHasError(true);
      return;
    } else {
      setHasError(false);
      // router.push("/receipt-breakdown");
    }
  };

  useEffect(() => {
    console.log("receiptData on Receipt Page:", receiptData);
  }, [receiptData]);

  if (!receiptData || !receiptData.items) {
    return <p>Loading receipt data...</p>; // Or any placeholder content
  }
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
                {unAssignedItems.map((item) => (
                  <li className="font-medium list-disc ml-4">{item.name}</li>
                ))}
              </ul>
            </div>
          </ErrorMessageAlert>
        )}
        <Button onClick={() => handleContinue()}>
          Calculate individual totals
        </Button>
        <Button variant="secondary" onClick={() => router.push("/add-pals")}>
          Back
        </Button>
      </div>
    </>
  );
}
