"use client";
import { useRef } from "react";
import Button from "./Button";
import { Upload } from "lucide-react";

function ReceiptUploader({ handleUpload }) {
  const imageInput = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      handleUpload(file);
    }
  };

  const handleClick = () => {
    imageInput.current.click();
  };
  return (
    <div>
      <Button icon={Upload} onClick={handleClick}>Upload receipt</Button>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={imageInput}
        onChange={handleImageChange}
      />
    </div>
  );
}

export default ReceiptUploader;
