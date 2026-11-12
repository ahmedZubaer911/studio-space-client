import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import ThemeProvider from "@/components/shared/ThemeProvider";
import Footer from "@/components/shared/Footer";
import { Suspense } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudioSpace | Find Your Creative Space",
  description:
    "Discover and book inspiring creative studios, photography spaces, sound stages, and production facilities.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body>
        <ThemeProvider>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
