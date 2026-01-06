export type JobCategory =
  | "office"
  | "engineer"
  | "sales"
  | "design"
  | "marketing";

export type Job = {
  id: number;
  title: string;
  category: JobCategory;
  salary: number;
  created_at: string;
};
export const CATEGORY_LABEL: Record<JobCategory, string> = {
  office: "事務",
  engineer: "エンジニア",
  sales: "営業",
  design: "デザイン",
  marketing: "マーケティング",
};
