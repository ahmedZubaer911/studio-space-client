import {
  ShieldCheck,
  BadgeCheck,
  Shield,
  Headset,
  ArrowUpRight,
} from "lucide-react";

const assurances = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Clear booking policies and transparent terms for a smoother studio rental experience.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description:
      "Explore transparent studio listings with helpful host and creator information.",
  },
  {
    icon: Shield,
    title: "Equipment Safety",
    description:
      "Review equipment details, available facilities, and studio guidelines before booking.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Get assistance with your booking questions and studio rental experience.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0d0a18] py-20 sm:py-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-200/30 dark:bg-violet-900/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-200/30 dark:bg-violet-900/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
            <ShieldCheck size={16} />
            Your Trust Matters
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Create with Confidence,
            <span className="text-blue-600 dark:text-blue-500">
              {" "}
              Every Step.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
            A better creative experience starts with transparency, reliable
            information, and support when you need it.
          </p>
        </div>

        {/* Assurance cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-violet-100 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/70 dark:border-violet-900/60 dark:bg-[#171225] dark:hover:border-violet-700 dark:hover:shadow-violet-950/40"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-purple-800 text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-bold tracking-widest text-blue-300 dark:text-blue-950 dark:group-hover:text-blue-800">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-violet-700 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>

                <div className="mt-6 flex justify-end text-violet-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-600">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
