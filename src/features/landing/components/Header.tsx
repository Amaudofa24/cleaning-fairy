"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { NAV_LINKS, INavLink } from "../constants";
import { useBooking } from "@/features/booking";
import { ThemeToggle } from "@/components/shared";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-2.5 sm:py-3 shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/50"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-20 sm:h-24 md:h-28 w-64 sm:w-80 md:w-96 transition-transform duration-300 group-hover:scale-105 origin-left scale-115 sm:scale-125">
              <Image
                src="/assets/imgs/cf-logo-text-white.png"
                alt="Cleaning Fairy Logo"
                fill
                className="object-contain object-left hidden dark:block"
                priority
              />
              <Image
                src="/assets/imgs/cf-logo-nb.png"
                alt="Cleaning Fairy Logo"
                fill
                className="object-contain object-left block dark:hidden"
                priority
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 glass-pill px-6 py-2.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-xs dark:shadow-none">
            {NAV_LINKS.map((link: INavLink) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => openBookingModal()}
              className="fairy-btn-teal px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 group shadow-lg cursor-pointer"
            >
              <span>Book a Cleaning Service</span>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-slate-200 dark:border-white/10 px-4 pt-4 pb-6 mt-3 space-y-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link: INavLink) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-200 dark:border-white/10">
            <ThemeToggle variant="expanded" />
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full fairy-btn-teal py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book a Cleaning Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
