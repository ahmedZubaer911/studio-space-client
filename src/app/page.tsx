import HeroSection from "@/components/home/HeroSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense
        fallback={
          <section
            className="flex min-h-135 items-center justify-center bg-cover bg-center sm:min-h-150 lg:min-h-170"
            style={{
              backgroundImage:`linear-gradient(90deg, rgba(20, 10, 40, 0.85), rgba(35, 15, 65, 0.65)), url("https://images.unsplash.com/photo-1497366811353-6870744d04b2")`,
            }}
          >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-300/30 border-t-violet-400" />
          </section>
        }
      >
        <HeroSection />
      </Suspense>
    </main>
  );
}
