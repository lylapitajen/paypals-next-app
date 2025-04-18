import { ReceiptContext, useReceipt } from "@/app/receipt-context";
import Button from "./Button";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { Delete } from "lucide-react";
import { X } from "lucide-react";

export default function UsersTable() {
  const { payees, addPayee, removePayee } = useReceipt();
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    if (e.target.value) {
      setInputValue(e.target.value);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-medium">Payees</h2>
      <div className="flex flex-col gap-2">
        <form className="flex gap-2">
          <Input type="text" onChange={handleInput} value={inputValue} />
          <Button
            text="Add"
            icon={Plus}
            onClick={(e) => {
              addPayee(inputValue);
              setInputValue("");
              e.preventDefault();
            }}
          />
        </form>
        <ul>
          {payees.map(({ name, id }) => (
            <li key={id} className="flex justify-between items-center">
              {name}
              <X
                className="w-4 h-4 hover:text-red-600 cursor-pointer"
                onClick={() => removePayee(id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
