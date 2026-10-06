"use client";

import Image from "next/image";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CreditCard,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { HERO_TRUST_MARKERS, ITrustMarker } from "../constants";
import { useBooking } from "@/features/booking";

const ICON_MAP = {
  Clock,
  CreditCard,
  ShieldCheck,
  MapPin,
};

export const HeroSection = () => {
  const { openBookingModal } = useBooking();

  return (
    <section className="relative pt-20 sm:pt-32 lg:pt-40 pb-8 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-stretch mb-4 sm:mb-8">
          <div className="lg:col-span-7 flex flex-col justify-between p-4.5 xs:p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl bg-fairy-deep text-white relative overflow-hidden shadow-2xl min-h-hero-mobile sm:min-h-hero-desktop">
            <div className="absolute inset-0 diamond-pattern opacity-60 pointer-events-none" />
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-fairy-teal/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-white/10 border border-white/15 text-2xs sm:text-xs font-semibold tracking-wide mb-3 sm:mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-fairy-teal" />
                <span>Cleaning Fairy 🧚🏽</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-hero-mobile sm:leading-hero-desktop mb-3 sm:mb-6">
                Not magic. <br />
                <span className="text-fairy-teal">Just perfect cleaning.</span>
              </h1>

              <p className="text-xs xs:text-sm sm:text-lg md:text-xl text-white/85 max-w-lg leading-relaxed font-normal mb-4 sm:mb-8">
                Professional cleaning, booked in minutes.
              </p>
            </div>

            <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="group inline-flex items-center justify-between sm:justify-center gap-2 sm:gap-3 bg-white hover:bg-slate-100 text-fairy-deep font-extrabold pl-4 sm:pl-6 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full shadow-xl transition-all cursor-pointer hover:scale-102"
              >
                <span className="text-xs sm:text-base">
                  Book a Cleaning Service
                </span>
                <div className="w-7 sm:w-9 h-7 sm:h-9 rounded-full bg-fairy-teal flex items-center justify-center text-white group-hover:rotate-45 transition-transform shadow-xs">
                  <ArrowUpRight className="w-3.5 sm:w-5 h-3.5 sm:h-5 stroke-2" />
                </div>
              </button>

              <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-2xs sm:text-xs font-semibold text-white/80 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-black/20 backdrop-blur-xs">
                <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-fairy-teal" />
                <span>Transparent & Vetted in Lagos</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-6 justify-between">
            <div className="relative h-44 sm:h-64 lg:h-72.5 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-white/10 group">
              <Image
                src="/assets/imgs/hero-cleaners.jpg"
                alt="Cleaning Fairy - Professional Cleaning Services"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fairy-midnight/80 via-black/20 to-transparent" />

              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-2xs sm:text-xs font-semibold">
                <span className="bg-fairy-deep/90 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
                  <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-fairy-teal" />
                  <span>Vetted Cleaners</span>
                </span>
                <span className="bg-black/60 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/10">
                  📍 Serving Lagos
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-5 flex-1">
              <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-3xl bg-fairy-deep text-white flex flex-col justify-between shadow-xl relative overflow-hidden border border-white/10">
                <div className="absolute inset-0 diamond-pattern opacity-40 pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between mb-2 sm:mb-3">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-lg sm:rounded-xl bg-fairy-teal/20 flex items-center justify-center text-fairy-teal">
                    <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </div>
                  <span className="text-3xs sm:text-xs-plus font-bold text-fairy-teal bg-fairy-teal/15 px-2 py-0.5 rounded-full">
                    Instant
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="text-xl sm:text-4xl font-extrabold text-white tracking-tight mb-0.5 sm:mb-1">
                    60s
                  </p>
                  <p className="text-2xs sm:text-xs text-white/80 font-medium leading-tight">
                    Book Online in 60 Seconds
                  </p>
                </div>
              </div>

              <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-3xl bg-fairy-teal text-fairy-midnight flex flex-col justify-between shadow-xl relative overflow-hidden border border-teal-600">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-lg sm:rounded-xl bg-fairy-midnight/10 flex items-center justify-center text-fairy-midnight">
                    <CreditCard className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </div>
                  <span className="text-3xs sm:text-xs-plus font-extrabold text-fairy-midnight bg-fairy-midnight/10 px-2 py-0.5 rounded-full">
                    100% Upfront
                  </span>
                </div>
                <div>
                  <p className="text-xl sm:text-4xl font-black text-fairy-midnight tracking-tight mb-0.5 sm:mb-1">
                    ₦0
                  </p>
                  <p className="text-2xs sm:text-xs text-fairy-midnight/85 font-bold leading-tight">
                    Zero Hidden Fees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {HERO_TRUST_MARKERS.map((marker: ITrustMarker) => {
            const IconComponent = ICON_MAP[marker.icon];
            return (
              <div
                key={marker.id}
                className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 bg-white dark:bg-fairy-surface border border-slate-200/80 dark:border-white/10 shadow-sm transition-all hover:shadow-md group"
              >
                <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-fairy-accent-light dark:bg-white/10 text-fairy-teal-dark dark:text-fairy-teal group-hover:scale-105 transition-transform shrink-0">
                  <IconComponent className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-3xs sm:text-xs text-slate-500 dark:text-gray-300 font-medium truncate">
                    {marker.label}
                  </p>
                  <p className="text-xs-plus sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {marker.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
