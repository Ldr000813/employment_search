"use client"; // ← 最重要：pageもクライアントにする

import { MyProvider } from "../context/myContext";
import Header from "./components/Header";
import Left from "./components/Left";
import Right from "./components/Right";

export default function Page() {
  return (
    <MyProvider>
      <div className="pt-28 px-6 min-h-screen flex gap-6">
        <Header />
        <div className="flex gap-6 w-full">
          <div className="w-1/4"><Left /></div>
          <div className="w-3/4"><Right /></div>
        </div>
      </div>
    </MyProvider>
  );
}
