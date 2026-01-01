// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { MyProvider } from "@/context/myContext";
import ClientWrapper from "./ClientWrapper"; // 後述

export const metadata: Metadata = {
  title: "Job App",
  description: "求人投稿アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        {/* ClientWrapper 内で MyProvider をラップ */}
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
