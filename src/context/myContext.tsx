"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
  created_at?: string;
};

type Filters = {
  category: string[];
  salary: number;
};

type MyContextType = {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  filteredJobs: Job[];
  isLoading: boolean;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category: [],
    salary: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch {
        console.error("Failed to fetch jobs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(job.category);

      const salaryMatch =
        filters.salary === 0 || job.salary >= filters.salary;

      return categoryMatch && salaryMatch;
    });
  }, [jobs, filters]);

  return (
    <MyContext.Provider
      value={{ jobs, setJobs, filters, setFilters, filteredJobs, isLoading }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const ctx = useContext(MyContext);
  if (!ctx) {
    throw new Error("useMyContext must be used within MyProvider");
  }
  return ctx;
};
