import "./globals.css";
import { ReceiptProvider } from "./receipt-context";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata = {
  title: "PayPals",
  description: "Scan a receipt, assign items and calculate how much each pal owes!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased bg-neutral-100 text-stone-800 text-base`}>
        <main className="max-w-[576px] mx-auto flex flex-col gap-12 min-h-screen bg-[#FFFAF4] py-8 px-6">
          <ReceiptProvider>{children}</ReceiptProvider>
        </main>
      </body>
    </html>
  );
}
