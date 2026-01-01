"use client";
import { useMyContext } from "@/context/myContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
  const categories = [
    "事務","エンジニア","営業","デザイン","マーケティング","財務・経理",
    "人事","カスタマーサポート","製造","医療・介護"
  ];
  const { jobs, setJobs } = useMyContext();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || salary === undefined) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, salary }),
      });
      const result = await res.json();

      if (res.ok) {
        const insertedJob = Array.isArray(result) ? result[0] : result;
        setJobs([...jobs, insertedJob]);
        router.push("/");
      } else {
        alert("投稿に失敗しました: " + result.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 px-6 min-h-screen">
      <form
        className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">求人投稿</h2>

        <label>カテゴリ</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">カテゴリを選択</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>年収(万円)</label>
        <input
          type="number"
          value={salary ?? ""}
          onChange={(e) => setSalary(e.target.value ? Number(e.target.value) : undefined)}
          required
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label>求人タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 text-white py-2 px-4 rounded mt-2 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"
          }`}
        >
          {isSubmitting ? "投稿中..." : "投稿"}
        </button>
      </form>
    </div>
  );
}
