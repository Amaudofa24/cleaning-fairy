"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, ShieldCheck, Heart } from "lucide-react";
import { FOOTER_SECTIONS } from "../constants";

export const Footer = () => {
  return (
    <footer className="bg-fairy-darker text-gray-400 pt-16 pb-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-20 sm:h-24 w-64 sm:w-80 transition-transform duration-300 hover:scale-105 origin-left scale-115 sm:scale-125">
                <Image
                  src="/assets/imgs/cf-logo-text-white.png"
                  alt="Cleaning Fairy Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-300 font-medium max-w-sm">
              Not magic. Just perfect cleaning.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Digital-first professional cleaning service across Lagos.
              Book, pay, and get instant confirmation without WhatsApp
              back-and-forth.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-teal-400 hover:border-teal-500/40 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="mailto:hello@cleaningfairy.com"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-teal-400 hover:border-teal-500/40 transition-colors"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {FOOTER_SECTIONS.company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {FOOTER_SECTIONS.support.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <span className="text-teal-400 text-xs flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Serving Lagos, NG
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {FOOTER_SECTIONS.legal.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © {new Date().getFullYear()} Cleaning Fairy. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-teal-400 fill-teal-400" />
            <span>for homes in Lagos</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
