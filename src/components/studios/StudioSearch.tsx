"use client";

import { Search, X } from "lucide-react";

interface StudioSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function StudioSearch({
  search,
  onSearchChange,
}: StudioSearchProps) {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Search Input */}
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by studio name, category, or location..."
        aria-label="Search studios"
        className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-12 text-sm text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
      />

      {/* Clear Search Button */}
      {search && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}