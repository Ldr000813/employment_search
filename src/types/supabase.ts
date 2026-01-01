export type Database = {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: number;
          title: string;
          category: string;
          salary: number;
          created_at: string;
        };
        Insert: {
          title: string;
          category: string;
          salary: number;
        };
        Update: {
          title?: string;
          category?: string;
          salary?: number;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
