
import Link from "next/link";
import {
  Search,
  CalendarDays,
  BadgeCheck,
  Clapperboard,
  ArrowUpRight,
} from "lucide-react";

const bookingSteps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore a curated collection of creative studios and find the perfect space for your project.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date, shooting hours, and duration based on your schedule.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Review your booking details and confirm your studio reservation with ease.",
    icon: BadgeCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Arrive at your chosen studio, bring your creative vision, and make something amazing.",
    icon: Clapperboard,
  },
];

export default function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      className="overflow-hidden bg-white px-5 py-20 dark:bg-[#160d24] sm:px-8 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            Simple & Seamless
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            How Booking{" "}
            <span className="text-blue-600 dark:text-blue-400">Works</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
            From discovering your ideal studio to bringing your ideas to life,
            booking your creative space is easier than ever.
          </p>
        </div>

        {/* Booking Steps */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden border-t-2 border-dashed border-violet-200 dark:border-violet-500/20 lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-6">
            {bookingSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Icon and Number */}
                  <div className="relative z-10 mb-7">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-100 bg-white text-violet-600 shadow-lg shadow-violet-100/70 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-violet-300 group-hover:bg-violet-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-violet-500/20 dark:border-violet-500/20 dark:bg-[#211332] dark:text-violet-300 dark:shadow-none dark:group-hover:bg-violet-600 dark:group-hover:text-white">
                      <Icon size={32} strokeWidth={1.7} />
                    </div>

                    <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-violet-600 text-xs font-bold text-white dark:border-[#160d24]">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="max-w-xs">
                    <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-5 py-3 text-sm font-medium text-blue-700 dark:bg-violet-500/10 dark:text-violet-300">
            <BadgeCheck size={18} />
            Your creative journey starts with one booking.
          </div>

          <Link
            href="/studios"
            className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-violet-600/30"
          >
            Start Exploring Studios
            <ArrowUpRight
              size={20}
              className="rotate-0 transition-transform duration-300  group-hover:rotate-45"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
