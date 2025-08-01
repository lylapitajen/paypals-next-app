"use client";
import { useReceipt } from "../receipt-context";
import { useEffect } from "react";
import Button from "@/components/Button";
import ReceiptBreakdown from "@/components/ReceiptBreakdown";
import { useRouter } from "next/navigation";

export default function ReceiptPage() {
  const router = useRouter();
  const { rawReceiptData } = useReceipt();
  useEffect(() => {
    console.log("rawReceiptData on Receipt Page:", rawReceiptData);
  }, [rawReceiptData]);

  if (!rawReceiptData || !rawReceiptData.items) {
    return <p>Loading receipt data...</p>; // Or any placeholder content
  }
  return (
    <>
      <h1 className="text-2xl font-semibold">Receipt Breakdown</h1>
      <ReceiptBreakdown {...rawReceiptData} />
      <div className="flex flex-col gap-2 mt-auto">
        <Button>Calculate individual totals</Button>
        <Button variant="secondary" onClick={() => router.push("/add-pals")}>
          Back
        </Button>
      </div>
    </>
  );
}
