"use client";

import { useState } from "react";
import { SlidersHorizontal, MapPin } from "lucide-react";

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
}: StudioFiltersProps) {
  const [priceError, setPriceError] = useState("");

  const [priceDraft, setPriceDraft] = useState({
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  const handlePriceChange = (field: "minPrice" | "maxPrice", value: string) => {
    setPriceDraft((prev) => ({
      ...prev,
      [field]: value,
    }));

    setPriceError("");
  };

  const handleApplyFilters = () => {
    const { minPrice, maxPrice } = priceDraft;

    const invalidPrice = [minPrice, maxPrice].some(
      (value) =>
        value !== "" &&
        (!Number.isInteger(Number(value)) ||
          Number(value) < 0 ||
          Number(value) > 100000),
    );

    if (invalidPrice) {
      setPriceError("Price must be between ৳0 and ৳100,000.");
      return;
    }

    if (
      minPrice !== "" &&
      maxPrice !== "" &&
      Number(maxPrice) < Number(minPrice)
    ) {
      setPriceError("Maximum price cannot be lower than minimum price.");
      return;
    }

    setPriceError("");
    onChange({ minPrice, maxPrice });
  };

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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleApplyFilters}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
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
            min={0}
            max={100000}
            step={1}
            placeholder="Min price"
            value={priceDraft.minPrice}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
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
            min={0}
            max={100000}
            step={1}
            placeholder="Max price"
            value={priceDraft.maxPrice}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
            className={inputStyles}
          />
        </div>
        {priceError && (
          <p className="mt-4 text-sm font-medium text-red-500">{priceError}</p>
        )}

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
