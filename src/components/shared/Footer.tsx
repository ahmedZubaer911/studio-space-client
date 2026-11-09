
import Link from "next/link";
import {
  Clapperboard,
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/about" },
];

const categories = [
  "Photography Studios",
  "Film & Production",
  "Podcast Rooms",
  "Music Studios",
  "Creative Workshops",
];

export default function Footer() {
  return (
    <footer className="border-t border-violet-200/60 bg-[#F7F5FC] text-gray-700 dark:border-white/10 dark:bg-[#171525] dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                <Clapperboard size={23} />
              </span>

              <span className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                Studio<span className="text-blue-600">Space</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-600 dark:text-gray-400">
              A creative home for creators. Discover inspiring spaces,
              connect with studio hosts, and bring your next big idea to life.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-blue-500" />
                <span>Connect with our team</span>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-red-700" />
                <span>Made for creators, everywhere</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-white text-gray-600 transition-all hover:-translate-y-1 hover:border-blue hover:bg-blue-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-blue-700 dark:text-gray-300"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-white text-gray-600 transition-all hover:-translate-y-1 hover:border-blue hover:bg-blue-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-blue-700"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-white text-gray-600 transition-all hover:-translate-y-1 hover:border-blue hover:bg-blue-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-blue-700"
              >
                	<FaYoutube size={18} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-white text-gray-600 transition-all hover:-translate-y-1 hover:border-blue hover:bg-blue-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-blue-700"
              >
                <FaLinkedinIn size={18} />
              </a>

              {/* New X Logo */}
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-white text-gray-600 transition-all hover:-translate-y-1 hover:border-blue hover:bg-blue-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-blue-700"
              >
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-base font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-700 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="mb-6 text-base font-bold text-gray-900 dark:text-white">
              Explore Categories
            </h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href="/studios"
                    className="group inline-flex items-center gap-1 text-sm text-gray-700 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    {category}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
              Stay in the Creative Loop
            </h3>

            <p className="mb-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Get updates about new studio spaces, creative opportunities,
              and what&apos;s happening at StudioSpace.
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                disabled
                className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />

              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-blue-400 px-5 py-3 text-sm font-semibold text-white opacity-70 dark:bg-blue-500 dark:opacity-70"
              >
                Subscribe — Coming Soon
                <ArrowUpRight size={16} />
              </button>
            </form>

            <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
              Newsletter subscriptions will be available soon.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-violet-200/70 py-7 text-center sm:flex-row sm:text-left dark:border-white/10">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 StudioSpace. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-500">
            Made with creativity for creators everywhere.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/privacy"
              className="text-gray-500 transition-colors hover:text-blue-200 dark:text-gray-400 dark:hover:text-violet-400"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-gray-500 transition-colors hover:text-blue-200 dark:text-gray-400 dark:hover:text-violet-400"
            >
              Terms of Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
