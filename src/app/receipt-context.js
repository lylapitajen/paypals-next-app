"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { generateAvatarColor } from "@/lib/utils";

export const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {
  //TODO: Replace with actual data fetching logic
  const [receiptData, setReceiptData] = useState();
  const [pals, setPals] = useState([]);
  const [palID, setPalID] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);

  const addPal = (name) => {
    setPals((prev) => [...prev, { name, id: palID, avatarColor: generateAvatarColor() }]);
    setPalID((prevID) => prevID + 1);
  };

  const removePal = (id) => {
    setPals((pals) => pals.filter((pal) => pal.id !== id));
  };

  return (
    <ReceiptContext.Provider
      value={{
        receiptData,
        pals,
        setPals,
        tipAmount,
        setReceiptData,
        addPal,
        removePal,
        setTipAmount,
      }}
    >
      {children}
    </ReceiptContext.Provider>
  );
}

export const useReceipt = () => useContext(ReceiptContext);
