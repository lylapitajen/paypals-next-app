"use client";
import Logo from "@/components/Logo";
import ReceiptUploader from "@/components/ReceiptUploader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useReceipt } from "./receipt-context";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { rawReceiptData, setRawReceiptData } = useReceipt();
  useEffect(() => {
    console.log("Page mounted");
    if (rawReceiptData) {
      console.log("rawReceiptData loaded:", rawReceiptData);
    }
  }, [rawReceiptData]);

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
    try {
      // convertToBase64 returns a Promise
      const convertedImage = await convertToBase64(file);

      // send image to backend
      const response = await axios.post("/api/process-image", {
        image: convertedImage,
      });

      const data = JSON.parse(response.data);
      setRawReceiptData(data);
      router.push("/add-pals");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <section className="flex flex-col gap-8 items-center">
        <Logo size="lg" />
        <ReceiptUploader handleUpload={handleUpload} />
      </section>
    </div>
  );
}
