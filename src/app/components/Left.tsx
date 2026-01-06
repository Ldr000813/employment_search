"use client";

import { useMyContext } from "@/context/myContext";
import { JobCategory } from "@/types/job";
import { CATEGORY_LABEL } from "@/types/job";

const CATEGORIES: JobCategory[] = [
  "office",
  "engineer",
  "sales",
  "design",
  "marketing",
];

export default function Left() {
  const { filters, setFilters } = useMyContext();

  const toggleCategory = (category: JobCategory) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-lg font-semibold mb-4">職種</h2>

      {CATEGORIES.map((cat) => (
        <label key={cat} className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={filters.category.includes(cat)}
            onChange={() => toggleCategory(cat)}
          />
          <span>{CATEGORY_LABEL[cat]}</span>
        </label>
      ))}

      <h3 className="text-lg font-semibold mt-6 mb-2">年収</h3>
      <select
        value={filters.salary}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            salary: Number(e.target.value),
          }))
        }
        className="w-full border p-2 rounded"
      >
        <option value={0}>指定なし</option>
        <option value={300}>300万円以上</option>
        <option value={400}>400万円以上</option>
        <option value={500}>500万円以上</option>
        <option value={600}>600万円以上</option>
      </select>
    </div>
  );
}
