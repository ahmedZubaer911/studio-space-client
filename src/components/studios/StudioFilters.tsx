"use client";

import { SlidersHorizontal, RotateCcw, MapPin } from "lucide-react";

export interface StudioFiltersState {
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  order: string;
}

interface StudioFiltersProps {
  filters: StudioFiltersState;
  categories: string[];
  loadingCategories: boolean;
  categoryError: string;
  onChange: (filters: Partial<StudioFiltersState>) => void;
  onClear: () => void;
}

export default function StudioFilters({
  filters,
  categories,
  loadingCategories,
  categoryError,
  onChange,
  onClear,
}: StudioFiltersProps) {
  // Reusable input styling
  const inputStyles =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-[#1c1528] dark:text-white";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-blue-600" />

          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Filter Studios
          </h2>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      {/* Filter Fields */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {/* Category */}
        <div>
          <label
            htmlFor="studio-category"
            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Category
          </label>

          <select
            id="studio-category"
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className={inputStyles}
            disabled={loadingCategories}
          >
            <option value="">
              {loadingCategories ? "Loading..." : "All Categories"}
            </option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {categoryError && (
            <p className="mt-1 text-xs text-red-500">{categoryError}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="studio-location"
            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Location
          </label>

          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="studio-location"
              type="text"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => onChange({ location: e.target.value })}
              className={`${inputStyles} pl-9`}
            />
          </div>
        </div>

        {/* Minimum Price */}
        <div>
          <label
            htmlFor="min-price"
            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Minimum Price (৳)
          </label>

          <input
            id="min-price"
            type="number"
            min="0"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className={inputStyles}
          />
        </div>

        {/* Maximum Price */}
        <div>
          <label
            htmlFor="max-price"
            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Maximum Price (৳)
          </label>

          <input
            id="max-price"
            type="number"
            min="0"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className={inputStyles}
          />
        </div>

        {/* Sorting */}
        <div>
          <label
            htmlFor="studio-sort"
            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Sort By
          </label>

          <select
            id="studio-sort"
            value={`${filters.sortBy}-${filters.order}`}
            onChange={(e) => {
              const [sortBy, order] = e.target.value.split("-");

              onChange({ sortBy, order });
            }}
            className={inputStyles}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="hourlyRate-asc">Price: Low to High</option>
            <option value="hourlyRate-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="title-asc">Name: A to Z</option>
            <option value="title-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
