"use client";

import { useMyContext } from "@/context/myContext";

export default function Left() {
  const categories = [
    "事務",
    "エンジニア",
    "営業",
    "デザイン",
    "マーケティング",
    "財務・経理",
    "人事",
    "カスタマーサポート",
    "製造",
    "医療・介護",
  ];

  const { filters, setFilters } = useMyContext();

  const handleCheck = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];

    setFilters({
      ...filters,
      category: newCategories,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setFilters({
      ...filters,
      salary: value,
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">求人カテゴリ</h2>

      <div className="space-y-2 mb-6">
        {categories.map((cat) => (
          <label key={cat} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.category.includes(cat)}
              onChange={() => handleCheck(cat)}
              className="w-4 h-4"
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      <h3 className="text-lg font-medium mb-2">年収</h3>
      <select
        value={filters.salary}
        onChange={handleSelect}
        className="w-full p-2 border rounded"
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
