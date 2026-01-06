export type Database = {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: number;
          title: string;
          category: Database["public"]["Enums"]["job_category"];
          salary: number;
          created_at: string;
        };
        Insert: {
          title: string;
          category: Database["public"]["Enums"]["job_category"];
          salary: number;
        };
        Update: {
          title?: string;
          category?: Database["public"]["Enums"]["job_category"];
          salary?: number;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      job_category:
        | "office"
        | "engineer"
        | "sales"
        | "design"
        | "marketing";
    };
  };
};
