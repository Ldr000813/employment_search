"use client";

import { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
};

export default function Right() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // データベースから取得
  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      // 配列でない場合は空配列にする
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setJobs([]);
    }
  };
  fetchJobs();
}, []);


  // ページネーション計算
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">求人一覧</h3>

      {jobs.length === 0 ? (
        <p className="text-gray-500">求人データがありません</p>
      ) : (
        <>
          <ul className="space-y-2">
            {currentJobs.map(job => (
              <li key={job.id} className="p-4 border border-gray-200 rounded bg-gray-50">
                <div className="font-medium">{job.title}</div>
                <div>カテゴリ: {job.category}</div>
                <div>給与: {job.salary}万円</div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
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
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
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
