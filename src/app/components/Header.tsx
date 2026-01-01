"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-900 text-white flex items-center justify-between px-6 py-4 shadow-md z-50">
      <h2 className="text-xl font-bold">求人検索アプリ</h2>
      <div className="space-x-4">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          求人検索
        </button>
        <button
          onClick={() => router.push("/jobs/new")}
          className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          求人投稿
        </button>
      </div>
    </header>
  );
}
