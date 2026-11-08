// AI generated section

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Camera, Sparkles } from "lucide-react";
import Image from "next/image";

export default function BecomeHost() {
  return (
    <section className="bg-gray-50 py-20 dark:bg-[#10091d]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-[#EDE4FF] dark:bg-[#211632]">
          {/* Decorative Elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl dark:bg-violet-400/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-purple-300/40 blur-3xl dark:bg-purple-400/10" />

          <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/60 px-4 py-2 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-white/5 dark:text-blue-300">
                <Sparkles size={16} />
                Become a Studio Host
              </div>

              <h2 className="text-3xl font-bold leading-tight text-[#38205F] sm:text-4xl lg:text-5xl dark:text-white">
                Your Studio.
                <br />
                Your{" "}
                <span className="text-blue-600 dark:text-blue-700">
                  Opportunity.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg dark:text-gray-100/70">
                Turn your creative space into an opportunity. List your studio,
                connect with creators, and make your space part of something
                inspiring.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/add-studio"
                  className="group inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-blue-700/30"
                >
                  <Camera size={18} />
                  List Your Studio
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/studios"
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-300 bg-white/60 px-6 py-3.5 font-semibold text-blue-800 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-white dark:border-blue-700 dark:bg-white/5 dark:text-blue-200 dark:hover:bg-white/10"
                >
                  Explore Studios
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-violet-950/15">
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&q=85"
                  alt="Creative studio workspace"
                  width={1000}
                  height={700}
                  className="h-75 w-full object-conver sm:h-95 lg:h-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white shadow-lg backdrop-blur-md">
                    <Camera size={20} />
                    <span className="text-sm font-medium">
                      Make your space a creative destination
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Icon */}
              <div className="absolute -right-4 -top-4 flex h-12 w-14 items-center justify-center rounded-2xl bg-blue-600 opacity-80 text-white shadow-xl shadow-violet-700/20 sm:-right-6 sm:-top-6">
                <Sparkles size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
