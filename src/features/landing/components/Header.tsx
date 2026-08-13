"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { NAV_LINKS, INavLink } from "../constants";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          ? "glass-nav py-3 sm:py-4 shadow-2xl shadow-black/50"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-16 sm:h-20 md:h-24 w-60 sm:w-72 md:w-84 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/imgs/cf-logo-nb.png"
                alt="Cleaning Fairy Logo"
                fill
                className="object-contain object-left brightness-110"
                priority
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 glass-pill px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            {NAV_LINKS.map((link: INavLink) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="fairy-btn-emerald px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm flex items-center gap-2 group shadow-lg"
            >
              <span>Book a Cleaning Service</span>
              <Sparkles className="w-4 h-4 text-emerald-900 group-hover:rotate-12 transition-transform" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white bg-white/5 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-white/10 px-4 pt-4 pb-6 mt-3 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3">
            {NAV_LINKS.map((link: INavLink) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-white/10">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full fairy-btn-emerald py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2"
            >
              <span>Book a Cleaning Service</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
