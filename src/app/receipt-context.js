"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {
  //TODO: Replace with actual data fetching logic
  const [receiptData, setReceiptData] = useState(x);
  const [pals, setPals] = useState([]);
  const [palID, setPalID] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);

  const addPal = (name) => {
    setPals((prev) => [...prev, { name, id: palID }]);
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

const x = {
  items: [
    {
      name: "Burrata",
      quantity: 1,
      price: 16,
      id: 1,
      assignedPals: [],
    },
    {
      name: "Pan de Coca",
      quantity: 1,
      price: 3.5,
      id: 2,
      assignedPals: [],
    },
    {
      name: "Solomillo a la Sal",
      quantity: 2,
      price: 22,
      id: 3,
      assignedPals: [],
    },
    {
      name: "Chocolate fondat",
      quantity: 1,
      price: 8.5,
      id: 4,
      assignedPals: [],
    },
    {
      name: "Agua 1/2",
      quantity: 1,
      price: 4.5,
      id: 5,
      assignedPals: [],
    },
    {
      name: "Copa Aphrodisiaque T.",
      quantity: 2,
      price: 6,
      id: 6,
      assignedPals: [],
    },
  ],
  discounts: [
    {
      description: "Portal Reserva 30%",
      amount: -26.55,
      percentage: 30,
    },
  ],
  tax: {
    amount: 5.63,
    rate: 10,
    base: 61.95,
  },
  total: 61.95,
  net_total: 56.32,
  subtotal: 61.95,
};
