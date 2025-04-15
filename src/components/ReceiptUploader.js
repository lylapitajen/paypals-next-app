"use client";
import { useState, useRef } from "react";
import Button from "./Button";
import { Upload } from "lucide-react";

function ReceiptUploader({ handleUpload }) {
  const [image, setImage] = useState(null);
  const imageInput = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // generate temporary URL for the upload image
      setImage(URL.createObjectURL(file));
      handleUpload(file);
    }
  };

  const handleClick = () => {
    imageInput.current.click();
  };
  return (
    <div>
      <Button text="Upload receipt" icon={Upload} onClick={handleClick} />
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
