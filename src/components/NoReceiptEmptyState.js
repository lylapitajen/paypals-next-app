import Link from "next/link";
import Image from "next/image";
export default function NoReceiptEmptyState() {
  return (
    <div className="flex flex-col h-full my-auto justify-center items-center gap-4">
      <Image
        src="/empty-state.svg"
        alt="Illuustration of hands holding a bank card and wallet"
        width={200}
        height={200}
      />
      <p>
        No receipt data found. Return to{" "}
        <span>
          <Link className="underline font-medium" href="/">
            home
          </Link>
        </span>{" "}
        to upload a receipt.
      </p>
    </div>
  );
}
