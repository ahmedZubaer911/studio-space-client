"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Palette,
  Music,
  Mic,
  Clapperboard,
} from "lucide-react";

interface Studio {
  category: string;
  amenities: string[];
}

interface CategoryResponse {
  success: boolean;
  data: string[];
}

const categoryIcons = [Camera, Palette, Music, Mic, Clapperboard];

export default function CategoryBrowser() {
  const [categories, setCategories] = useState<string[]>([]);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const [categoryResponse, studioResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`),
        ]);

        if (!categoryResponse.ok || !studioResponse.ok) {
          throw new Error("Failed to load category information.");
        }

        const categoryResult: CategoryResponse = await categoryResponse.json();

        const studioResult = await studioResponse.json();

        setCategories(categoryResult.data || []);
        setStudios(studioResult.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  const categoriesWithCounts = categories
    .map((category) => ({
      name: category,
      count: studios.filter((studio) => studio.category === category).length,
    }))
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count);

  const renderCategoryCards = (items: typeof categoriesWithCounts) =>
    items.map((item, index) => {
      const Icon = categoryIcons[index % categoryIcons.length];

      const categoryAmenities = [
        ...new Set(
          studios
            .filter((studio) => studio.category === item.name)
            .flatMap((studio) => studio.amenities || []),
        ),
      ].slice(0, 3);

      return (
        <Link
          key={item.name}
          href={`/studios?category=${encodeURIComponent(item.name)}`}
          className="group flex min-h-56 flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl dark:border-white/10 dark:bg-black/4 dark:hover:border-violet-500/40"
        >
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-500/15 dark:text-violet-300">
            <Icon size={25} strokeWidth={1.8} />
          </div>

          {/* Category Name */}
          <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
            {item.name}
          </h3>

          {/* Popular Amenities */}
          <div className="mt-3 flex flex-wrap gap-2 pb-2">
            {categoryAmenities.map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-blue-800 dark:bg-violet-500/10 dark:text-violet-300"
              >
                {amenity}
              </span>
            ))}
          </div>
          {/* Available Spaces */}
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {item.count} {item.count === 1 ? "Space" : "Spaces"}
            </span>

            <ArrowUpRight
              size={20}
              className="rotate-0 transition-transform duration-300 group-hover:rotate-45"
            />
          </div>
        </Link>
      );
    });

  return (
    <section className="bg-gray-50 px-5 py-20 dark:bg-[#160d24] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-violet-300">
            Find Your Space
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Explore by{" "}
            <span className="text-blue-600 dark:text-blue-500">Category</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Discover creative spaces that match your passion, ideas, and
            projects.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/5"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Category Cards */}
        {!loading && !error && (
          <>
            {/* Mobile: 4 categories */}
            <div className="grid grid-cols-2 gap-5 sm:hidden">
              {renderCategoryCards(categoriesWithCounts.slice(0, 4))}
            </div>

            {/* Tablet: 3 categories */}
            <div className="hidden grid-cols-3 gap-5 sm:grid lg:hidden">
              {renderCategoryCards(categoriesWithCounts.slice(0, 3))}
            </div>

            {/* Desktop: 5 categories */}
            <div className="hidden grid-cols-5 gap-5 lg:grid">
              {renderCategoryCards(categoriesWithCounts.slice(0, 5))}
            </div>

            {/* View All Categories */}
            {categoriesWithCounts.length > 5 && (
              <div className="mt-10 flex justify-center">
                <Link
                  href="/studios"
                  className="group inline-flex items-center gap-3 rounded-xl border-2 border-violet-600 px-8 py-3.5 font-semibold text-blue-700 transition-all duration-300 hover:bg-blue-600 hover:text-white dark:text-violet-300 dark:hover:text-white"
                >
                  Explore All Categories
                  <ArrowUpRight
                    size={19}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
