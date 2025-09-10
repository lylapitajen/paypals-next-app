"use client";
import Logo from "@/components/Logo";
import ReceiptUploader from "@/components/ReceiptUploader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useReceipt } from "./receipt-context";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessageAlert from "@/components/ErrorMessageAlert";

export default function Home() {
  const router = useRouter();
  const { receiptData, setReceiptData } = useReceipt();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Page mounted");
    if (receiptData) {
      console.log("receiptData loaded:", receiptData);
    }
  }, [receiptData]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // reads content of file, returns data URL
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
        console.log(error);
      };
    });
  };

  const handleUpload = async (file) => {
    setLoading(true);
    setErrorMessage(undefined);
    try {
      // convertToBase64 returns a Promise
      const convertedImage = await convertToBase64(file);

      // send image to backend
      const response = await axios.post("/api/process-image", {
        image: convertedImage,
      });

      const data = JSON.parse(response.data);
      setReceiptData(data);
      router.push("/add-pals");
      setLoading(false);
    } catch (error) {
      console.error("Error", error);
      setErrorMessage("There was an issue processing the image. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Scanning image..." />;
  }

  return (
    <div className="h-full flex flex-col flex-1 justify-center">
      <section className="flex flex-col gap-8 items-center">
        <Logo size="lg" />
        <ReceiptUploader handleUpload={handleUpload} />
        {errorMessage && <ErrorMessageAlert>{errorMessage}</ErrorMessageAlert>}
      </section>
    </div>
  );
}
