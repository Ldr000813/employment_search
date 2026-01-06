"use client";

import { useState, useEffect } from "react";
import { useMyContext } from "@/context/myContext";
import { CATEGORY_LABEL } from "@/types/job";

export default function Right() {
  const { filteredJobs, isLoading } = useMyContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // フィルター結果が変わったら1ページ目に戻す
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredJobs]);

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-md shadow-md">
        <p>Loading...</p>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">求人一覧</h3>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">条件に一致する求人がありません</p>
      ) : (
        <>
          <ul className="space-y-2">
            {currentJobs.map((job) => (
              <li
                key={job.id}
                className="p-4 border border-gray-200 rounded bg-gray-50"
              >
                <div className="font-medium">{job.title}</div>
                <div>カテゴリ: {CATEGORY_LABEL[job.category]}</div>
                <div>給与: {job.salary}万円</div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ◀
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
