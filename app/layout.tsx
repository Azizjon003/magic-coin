import type { Metadata } from "next";
import "./globals.css"; // Importing global styles

// Optional: If you want to use a specific font like Inter
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Magic Coin Game",
  description: "Tap to earn coins!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>{children}</body>
    </html>
  );
}
