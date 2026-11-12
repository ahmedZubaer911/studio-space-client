"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Star, Users, ShieldCheck, Check } from "lucide-react";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  createdAt: string;
}

interface StudioResponse {
  success: boolean;
  data: Studio;
  message?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

function StudioDetailsContent() {
  const params = useParams();
  const id = params.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(`${API_URL}/studios/${id}`);
        const result: StudioResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load studio details.");
        }

        setStudio(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudio();
    }
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-28 dark:bg-[#100f17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading && (
          <p className="text-center text-gray-500">Loading studio details...</p>
        )}

        {!loading && error && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Unable to load studio
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">{error}</p>
          </div>
        )}

        {!loading && !error && studio && (
          <div className="space-y-8">
            {/* Studio Title */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                {studio.title}
              </h1>

              <div
                className="flex flex-wrap items-center gap-x-5 gap-y-2
              pt-2.5 text-sm text-gray-500 dark:text-gray-400"
              >
                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {studio.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={17} />
                  {studio.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Star size={17} className="fill-amber-400 text-amber-400" />
                  {studio.rating} ({studio.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Studio Image */}
            <div className="relative aspect-video max-h-130 w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-[#191824]">
              <Image
                src={studio.imageUrl}
                alt={studio.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-center"
              />
            </div>

            {/* Studio Highlights */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {/* Hourly Rate */}
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm dark:border-blue-900 dark:bg-[#191824]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hourly Rate
                </p>
                <h3 className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-500">
                  ৳{studio.hourlyRate.toLocaleString()}
                </h3>
              </div>

              {/* Security Deposit */}
              <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm dark:border-blue-900 dark:bg-[#191824]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Security Deposit
                </p>
                <h3 className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-500">
                  ৳{studio.securityDeposit.toLocaleString()}
                </h3>
              </div>

              {/* Capacity */}
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm dark:border-blue-900 dark:bg-[#191824]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Maximum Capacity
                </p>
                <h3 className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-500">
                  {studio.maxCapacity} People
                </h3>
              </div>

              {/* Rating */}
              <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm dark:border-blue-900 dark:bg-[#191824]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customer Rating
                </p>
                <h3 className="mt-2 flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-500">
                  <Star size={19} className="fill-amber-400 text-amber-400" />
                  {studio.rating} / 5
                </h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {studio.reviewCount} Reviews
                </p>
              </div>
            </div>

            {/* Main Information */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Studio Details */}
              <div className="space-y-6 lg:col-span-2">
                {/* Overview */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#191824]">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Overview About This Studio
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                    {studio.overview}
                  </p>
                </div>

                {/* Amenities */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#191824]">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Equipment & Amenities
                  </h2>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {studio.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                          <Check size={17} />
                        </span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Studio Pricing and Information */}
              <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#191824]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hourly rental rate
                </p>

                <h2 className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-500">
                  ৳{studio.hourlyRate.toLocaleString("en-BD")}
                  <span className="text-base font-medium text-gray-500">
                    {" "}
                    / hour
                  </span>
                </h2>

                <div className="my-6 space-y-5 border-y border-gray-200 py-6 dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Users size={18} />
                      Maximum capacity
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {studio.maxCapacity} guests
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <ShieldCheck size={18} />
                      Security deposit
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ৳{studio.securityDeposit.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>

                <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Booking and payment options will be available in the next
                  phase.
                </p>
              </aside>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
export default function StudioDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-28 text-center text-gray-500">
          Loading studio details...
        </div>
      }
    >
      <StudioDetailsContent />
    </Suspense>
  );
}
