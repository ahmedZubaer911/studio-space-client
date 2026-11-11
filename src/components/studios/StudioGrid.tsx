"use client";

import { SearchX, Sparkles } from "lucide-react";
import StudioCard, { Studio } from "./StudioCard";

interface StudioGridProps {
  studios: Studio[];
  loading?: boolean;
}

export default function StudioGrid({
  studios,
  loading = false,
}: StudioGridProps) {
  // Loading Skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-white/10 dark:bg-white/4"
          >
            <div className="h-56 animate-pulse bg-gray-200 dark:bg-white/10" />

            <div className="space-y-4 p-5">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

              <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />

              <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (studios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-20 text-center dark:border-white/15 dark:bg-white/4">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
          <SearchX size={30} className="text-blue-600 dark:text-blue-400" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          No Studios Found
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
          We couldn&apos;t find any studios matching your search or filters. Try
          adjusting your search criteria to discover more creative spaces.
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
          <Sparkles size={16} />
          Your perfect creative space might be just one search away!
        </div>
      </div>
    );
  }

  // Studio Cards
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}