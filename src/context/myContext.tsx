"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Job, JobCategory } from "@/types/job";

type Filters = {
  category: JobCategory[];
  salary: number;
};

type MyContextType = {
  jobs: Job[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
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
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
      setIsLoading(false);
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
      value={{ jobs, filters, setFilters, filteredJobs, isLoading }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const ctx = useContext(MyContext);
  if (!ctx) throw new Error("useMyContext must be used within MyProvider");
  return ctx;
};
