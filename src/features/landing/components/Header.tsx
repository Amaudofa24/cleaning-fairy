"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react";
import { NAV_LINKS, INavLink } from "../constants";
import { useBooking } from "@/features/booking";
import { ThemeToggle } from "@/components/shared";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal, openTrackingModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-header transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 hidden md:block">
        <div className="bg-fairy-deep text-white/90 rounded-full px-6 py-2 flex items-center justify-between text-xs font-medium shadow-md border border-fairy-teal/20">
          <div className="flex items-center gap-6">
            <a
              href="tel:+23480000FAIRY"
              className="flex items-center gap-1.5 hover:text-fairy-teal transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-fairy-teal" />
              <span>+234 (0) 800 FAIRY</span>
            </a>

            <a
              href="mailto:hello@cleaningfairy.com.ng"
              className="flex items-center gap-1.5 hover:text-fairy-teal transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-fairy-teal" />
              <span>hello@cleaningfairy.com.ng</span>
            </a>

            <div className="flex items-center gap-1.5 text-white/75">
              <MapPin className="w-3.5 h-3.5 text-fairy-teal" />
              <span>Serving Lagos (Lekki, VI, Ikoyi, Ikeja, Yaba)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => openTrackingModal()}
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-fairy-teal transition-colors font-semibold cursor-pointer"
            >
              <Search className="w-3 h-3 text-fairy-teal" />
              <span>Track Booking</span>
            </button>

            <div className="flex items-center gap-3 text-white/80 border-l border-white/20 pl-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fairy-teal transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fairy-teal transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fairy-teal transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2">
        <div
          className={`flex items-center justify-between px-3.5 sm:px-8 py-2.5 sm:py-3 rounded-2xl sm:rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 dark:bg-fairy-surface/95 backdrop-blur-md shadow-xl border border-slate-200/80 dark:border-white/10"
              : "bg-white/80 dark:bg-fairy-surface/80 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-sm"
          }`}
        >
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative h-8 sm:h-14 md:h-16 w-28 sm:w-48 md:w-56 transition-transform duration-300 group-hover:scale-105 origin-left">
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

          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
            {NAV_LINKS.map((link: INavLink) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-700 hover:text-fairy-teal dark:text-gray-200 dark:hover:text-fairy-teal transition-colors flex items-center gap-1.5"
              >
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => openBookingModal()}
              className="hidden sm:inline-flex fairy-btn-teal px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold items-center gap-1.5 cursor-pointer shadow-md group"
            >
              <span>Book a Cleaning</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden mx-2 sm:mx-4 mt-2 p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-fairy-surface border border-slate-200 dark:border-white/10 shadow-2xl space-y-3 sm:space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link: INavLink) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm sm:text-base font-semibold text-slate-800 dark:text-gray-100 hover:text-fairy-teal dark:hover:text-fairy-teal px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openTrackingModal();
              }}
              className="text-left text-sm sm:text-base font-semibold text-slate-800 dark:text-gray-100 hover:text-fairy-teal dark:hover:text-fairy-teal px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-fairy-teal" />
              <span>Track My Booking</span>
            </button>
          </nav>

          <div className="pt-2 border-t border-slate-200 dark:border-white/10">
            <ThemeToggle variant="expanded" />
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full fairy-btn-teal py-3 rounded-full text-center text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book a Cleaning Service</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
