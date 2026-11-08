"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Users, ArrowRight } from "lucide-react";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  location: string;
  imageUrl: string;
  maxCapacity: number;
  rating?: number;
  reviewCount?: number;
}

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedStudios = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/studios/featured`,
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error (${response.status}): ${errorText}`);
        }

        const result = await response.json();

        setStudios(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStudios();
  }, []);

  return (
    <section className="bg-gray-50 px-5 py-20 dark:bg-[#10091d] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-violet-500/15 dark:text-violet-300">
            Handpicked Spaces
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Explore Our{" "}
            <span className="text-blue-600 dark:text-blue-600">
              Featured Studios
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Discover inspiring creative spaces designed to bring your ideas and
            projects to life.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-105 animate-pulse rounded-2xl bg-gray-100 dark:bg-white/5"
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

        {/* Empty State */}
        {!loading && !error && studios.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            No featured studios available right now.
          </p>
        )}

        {/* Studio Cards */}
        {!loading && !error && studios.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/4"
              >
                {/* Studio Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
                    {studio.category}
                  </span>

                  <div className="absolute bottom-4 left-4 rounded-lg bg-gray-950/80 px-3 py-1.5 text-[12px] font-semibold text-white">
                    ৳{studio.hourlyRate.toLocaleString("en-BD")}
                    <span className="font-normal text-gray-300">/hr</span>
                  </div>

                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-lg bg-gray-950/80 px-3 py-1.5 text-[12px] font-semibold text-white">
                    <Star size={16} className="fill-amber-400 text-amber-400 " />
                    {studio.rating ?? "New"}
                    {studio.reviewCount ? ` (${studio.reviewCount})` : ""}
                  </div>
                </div>

                {/* Studio Information */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-bold text-gray-900 dark:text-white">
                    {studio.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="shrink-0 text-violet-500" />
                    <span className="line-clamp-1">{studio.location}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                      <Users size={16} className="text-blue-500" />
                      Up to {studio.maxCapacity} guests
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-200">
                      Deposit: ৳{studio.securityDeposit.toLocaleString("en-BD")}
                    </div>
                  </div>

                  {/* View Details */}
                  <Link
                    href={`/studios/${studio._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-violet-700"
                  >
                    View Details
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        {/* View All Studios */}
        {!loading && !error && studios.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/studios"
              className="group inline-flex items-center gap-3 rounded-xl border-2 border-violet-600 px-8 py-3.5 font-semibold text-blue-600 transition-all duration-300 hover:bg-violet-600 hover:text-white dark:text-violet-300 dark:hover:text-white"
            >
              Explore All Studios
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
