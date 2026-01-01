// src/app/ClientWrapper.tsx
"use client";

import { ReactNode } from "react";
import { MyProvider } from "@/context/myContext";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <MyProvider>{children}</MyProvider>;
}
