"use client";

import { useEffect, useState } from "react";
import {
  RefreshCw,
  SearchX,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

import StudioSearch from "@/components/studios/StudioSearch";
import StudioFilters, {
  StudioFiltersState,
} from "@/components/studios/StudioFilters";
import StudioGrid from "@/components/studios/StudioGrid";
import { Studio } from "@/components/studios/StudioCard";

interface StudiosResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: Studio[];
  message?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

const initialFilters: StudioFiltersState = {
  category: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "createdAt",
  order: "desc",
};

export default function StudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [filters, setFilters] = useState<StudioFiltersState>(initialFilters);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState("");
  const [filterResetKey, setFilterResetKey] = useState(0);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!API_URL) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(`${API_URL}/studios/categories`);

        if (!response.ok) {
          throw new Error("Failed to load categories.");
        }

        const result = await response.json();
        setCategories(result.data || []);
      } catch (error) {
        setCategoryError(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch studios from backend
  useEffect(() => {
    const controller = new AbortController();

    async function fetchStudios() {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error(
            "API URL is missing. Please check your frontend environment variables.",
          );
        }

        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", "12");

        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        }

        if (filters.category) {
          params.set("category", filters.category);
        }

        if (filters.location.trim()) {
          params.set("location", filters.location.trim());
        }

        if (filters.minPrice) {
          params.set("minPrice", filters.minPrice);
        }

        if (filters.maxPrice) {
          params.set("maxPrice", filters.maxPrice);
        }

        params.set("sortBy", filters.sortBy);
        params.set("order", filters.order);

        const response = await fetch(
          `${API_URL}/studios?${params.toString()}`,
          { signal: controller.signal },
        );

        const result: StudiosResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load studios.");
        }

        setStudios(result.data || []);
        setTotal(result.total || 0);
        setTotalPages(result.totalPages || 0);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading studios.",
        );

        setStudios([]);
        setTotal(0);
        setTotalPages(0);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchStudios();

    return () => controller.abort();
  }, [debouncedSearch, filters, page, retryCount]);

  // Update filters
  const handleFilterChange = (updatedFilters: Partial<StudioFiltersState>) => {
    setFilters((previous) => ({
      ...previous,
      ...updatedFilters,
    }));

    setPage(1);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters(initialFilters);
    setPage(1);
    setFilterResetKey((prev) => prev + 1);
  };

  // Update search
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Retry fetching
  const handleRetry = () => {
    setRetryCount((previous) => previous + 1);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-28 text-gray-900 dark:bg-[#100f17] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Explore StudioSpace
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Find Your Perfect{" "}
            <span className="text-blue-600 dark:text-blue-500">
              Creative Space
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
            Discover photography studios, creative spaces, and professional
            environments for your next project. Find the right space that
            matches your needs and budget.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-5">
          {/* Search Bar + Filter Button */}
          <div className="flex h-12 items-stretch gap-3">
            <div className="min-w-0 flex-1">
              <StudioSearch
                search={search}
                onSearchChange={handleSearchChange}
              />
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen((previous) => !previous)}
              aria-expanded={filtersOpen}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-violet-500 hover:text-violet-600 dark:border-gray-700 dark:bg-[#191824] dark:text-gray-200"
            >
              <SlidersHorizontal size={18} />
              Filter
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  filtersOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Category Navigation */}
          {!filtersOpen ? (
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Category:
              </span>

              {/* All - Always Visible */}
              <button
                type="button"
                onClick={() => handleFilterChange({ category: "" })}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  !filters.category
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-violet-50 hover:text-violet-600 dark:bg-[#191824] dark:text-gray-300"
                }`}
              >
                All
              </button>

              {/* Scrollable Categories */}
              <div className="min-w-0 flex-1 overflow-x-auto scrollbar-hide">
                <div className="flex w-max items-center gap-2">
                  {categories
                    .filter(
                      (category) =>
                        category.trim() !== "" &&
                        category.toLowerCase() !== "others",
                    )
                    .map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleFilterChange({ category })}
                        className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                          filters.category === category
                            ? "bg-violet-600 text-white shadow-sm"
                            : "bg-white text-gray-600 hover:bg-violet-50 hover:text-violet-600 dark:bg-[#191824] dark:text-gray-300"
                        }`}
                      >
                        {category}
                      </button>
                    ))}

                  {/* Others */}
                  <button
                    type="button"
                    onClick={() => handleFilterChange({ category: "others" })}
                    className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      filters.category === "others"
                        ? "bg-violet-600 text-white shadow-sm"
                        : "bg-white text-gray-600 hover:bg-violet-50 hover:text-violet-600 dark:bg-[#191824] dark:text-gray-300"
                    }`}
                  >
                    Others
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Advanced Filter Form */
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              <StudioFilters
                key={filterResetKey}
                filters={filters}
                categories={categories}
                loadingCategories={loadingCategories}
                categoryError={categoryError}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>
          )}

          {/* Clear Filters */}
          {(filters.category ||
            filters.location ||
            filters.minPrice ||
            filters.maxPrice) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results Header */}
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Available Studios</h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {loading
                ? "Finding studios..."
                : `Showing ${studios.length} of ${total} studios`}
            </p>
          </div>
        </div>

        {/* Error State */}
        {error ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-white px-5 py-16 text-center dark:border-red-900 dark:bg-[#191824]">
            <SearchX className="mb-4 h-12 w-12 text-red-500" />

            <h3 className="text-lg font-semibold">Unable to load studios</h3>

            <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
              {error}
            </p>

            <button
              onClick={handleRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Studios Grid */}
            <StudioGrid studios={studios} loading={loading} />

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setPage((previous) => previous - 1)}
                  disabled={page <= 1}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700"
                >
                  Previous
                </button>

                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((previous) => previous + 1)}
                  disabled={page >= totalPages}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
