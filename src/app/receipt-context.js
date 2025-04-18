"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {
  const [rawReceiptData, setRawReceiptData] = useState(x);
  const [calculatedReceiptData, setCalculatedReceiptData] = useState(null);
  const [payees, setPayees] = useState([]);
  const [payeeID, setPayeeID] = useState(0);
  useEffect(() => console.log(payees), [payees]);

  const addPayee = (name) => {
    setPayees((prev) => [...prev, { name, id: payeeID }]);
    setPayeeID((prevID) => prevID + 1);
    console.log(payees);
  };

  const removePayee = (id) => {
    setPayees((payees) => payees.filter((payee) => payee.id !== id));
  };

  return (
    <ReceiptContext.Provider
      value={{
        rawReceiptData,
        calculatedReceiptData,
        payees,
        setRawReceiptData,
        setCalculatedReceiptData,
        addPayee,
        removePayee,
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
    },
    {
      name: "Pan de Coca",
      quantity: 1,
      price: 3.5,
      id: 2,
    },
    {
      name: "Solomillo a la Sal",
      quantity: 2,
      price: 22,
      id: 3,
    },
    {
      name: "Chocolate fondat",
      quantity: 1,
      price: 8.5,
      id: 4,
    },
    {
      name: "Agua 1/2",
      quantity: 1,
      price: 4.5,
      id: 5,
    },
    {
      name: "Copa Aphrodisiaque T.",
      quantity: 2,
      price: 6,
      id: 6,
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
