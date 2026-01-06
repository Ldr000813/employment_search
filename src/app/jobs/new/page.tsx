"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobCategory } from "@/types/job";
import { CATEGORY_LABEL } from "@/types/job";

export default function NewJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<JobCategory | "">("");
  const [salary, setSalary] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || salary === "") return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          salary: Number(salary),
        }),
      });

      if (!res.ok) {
        alert("投稿に失敗しました");
        return;
      }

      // Context は触らず、一覧ページへ遷移
      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 px-6 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">求人投稿</h2>

        <label>カテゴリ</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as JobCategory)}
          required
          className="p-2 border rounded"
        >
          <option value="">カテゴリを選択</option>
          {Object.entries(CATEGORY_LABEL).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <label>年収（万円）</label>
        <input
          type="number"
          value={salary}
          onChange={(e) =>
            setSalary(e.target.value ? Number(e.target.value) : "")
          }
          required
          className="p-2 border rounded"
        />

        <label>求人タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {isSubmitting ? "投稿中..." : "投稿"}
        </button>
      </form>
    </div>
  );
}
