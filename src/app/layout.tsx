import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Financial data extractor",
  description: "Peridot financial data extractor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
