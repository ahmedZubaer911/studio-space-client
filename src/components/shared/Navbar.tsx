"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Clapperboard, Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#host-gurantee" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const themeToggle = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="flex h-10 w-10 items-center justify-center rounded-lg
      border border-[#E5E0F0] bg-[#F7F5FC] text-[#7656D6]
      transition-colors hover:bg-[#EEE9FA]
      disabled:cursor-wait
      dark:border-[#39334F] dark:bg-[#211E32]
      dark:text-[#A78BFA] dark:hover:bg-[#302A45]"
    >
      <Sun size={19} className="dark:hidden" />
      <Moon size={19} className="hidden dark:block" />
    </button>
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/90 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/90">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md shadow-blue-500/20">
            <Clapperboard size={22} strokeWidth={2.2} />
          </span>

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">
              Studio<span className="text-blue-600">Space</span>
            </span>
            <span className="text-[11px] text-gray-800 font-semibold dark:text-gray-200">
              Studio On-Demand
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-blue-500"
                  : "text-gray-800 hover:text-blue-600 hover:bg-gray-100 rounded-lg px-4 py-2.5  dark:text-gray-200  dark:hover:bg-gray-800"
              }`}
            >
              {link.name}

              {isActive(link.href) && (
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full
                font-semibold bg-blue-600"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop authentication buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {themeToggle}
          <Link
            href="/login"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 lg:hidden dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-5 py-5 shadow-lg lg:hidden dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-700 dark:text-blue-300 dark:bg-blue-950"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                Appearance
              </span>
              {themeToggle}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Log in
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
