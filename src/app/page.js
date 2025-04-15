"use client";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import ReceiptUploader from "@/components/ReceiptUploader";
import axios from "axios";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [receiptData, setReceiptData] = useState(null);
  const router = useRouter();

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

      console.log(response.data);
      // set receiptData state so table component re-renders when data is available
      setReceiptData(response.data);
      router.push("/receipt");
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
