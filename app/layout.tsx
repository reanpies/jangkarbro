import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restoran Jangkar",
  description: "Best Rest & Run at Cipanas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased bg-[#092C4C]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
