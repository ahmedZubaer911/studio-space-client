"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Users, ArrowRight } from "lucide-react";

export interface Studio {
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

interface StudioCardProps {
  studio: Studio;
}

export default function StudioCard({ studio }: StudioCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/4">
      {/* Studio Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm dark:bg-white dark:text-blue-800 dark:font-normal dark:opacity-80">
          {studio.category}
        </span>

        {/* Hourly Rate */}
        <div className="absolute bottom-4 left-4 rounded-lg bg-gray-950/80 px-3 py-1.5 text-xs font-semibold text-white">
          ৳{studio.hourlyRate.toLocaleString("en-BD")}
          <span className="font-normal text-gray-300">/hr</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-lg bg-gray-950/80 px-3 py-1.5 text-xs font-semibold text-white">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          {studio.rating ?? "New"}
          {studio.reviewCount ? ` (${studio.reviewCount})` : ""}
        </div>
      </div>

      {/* Studio Information */}
      <div className="p-5">
        <h3 className="line-clamp-1 text-xl font-bold text-gray-900 dark:text-white">
          {studio.title}
        </h3>

        {/* Location */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin size={16} className="shrink-0 text-blue-500" />
          <span className="line-clamp-1">{studio.location}</span>
        </div>

        {/* Capacity and Deposit */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-4 dark:border-white/10">
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
            <Users size={16} className="text-blue-500" />
            Up to {studio.maxCapacity} guests
          </div>

          <div className="text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
            Deposit: ৳{studio.securityDeposit.toLocaleString("en-BD")}
          </div>
        </div>

        {/* Details Button */}
        <Link
          href={`/studios/${studio._id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700"
        >
          View Details
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}