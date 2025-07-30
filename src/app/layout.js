import { Inter } from "next/font/google";
import "./globals.css";
import { ReceiptProvider } from "./receipt-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "PayPals",
  description: "Breakdown your receipts and don't forget to pay your pals!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-neutral-100`}>
        <main className="max-w-[576px] mx-auto flex flex-col gap-12 min-h-screen bg-white py-8 px-6">
          <ReceiptProvider>{children}</ReceiptProvider>
        </main>
      </body>
    </html>
  );
}
