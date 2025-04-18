"use client";
import { useReceipt } from "../receipt-context";
import { useEffect } from "react";
import UsersTable from "@/components/UsersTable";
import ReceiptTable from "@/components/ReceiptTable";

export default function ReceiptPage() {
  const { rawReceiptData } = useReceipt();
  useEffect(() => {
    console.log("rawReceiptData on Receipt Page:", rawReceiptData);
  }, [rawReceiptData]);

  if (!rawReceiptData || !rawReceiptData.items) {
    return <p>Loading receipt data...</p>; // Or any placeholder content
  }
  return (
    <>
      <UsersTable />
      <ReceiptTable {...rawReceiptData} />
    </>
  );
}
