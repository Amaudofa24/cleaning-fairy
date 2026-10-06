"use client";

import Image from "next/image";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { CLEANING_SERVICES, ICleaningService } from "../constants";
import { useBooking } from "@/features/booking";

export const WhatWeClean = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="what-we-clean" className="py-10 sm:py-24 bg-fairy-bg dark:bg-fairy-dark relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-4">
            What We Clean
          </h2>
          <p className="text-xs sm:text-lg text-slate-600 dark:text-gray-300 font-medium">
            Pick what fits your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {CLEANING_SERVICES.map((service: ICleaningService) => (
            <div
              key={service.id}
              className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-fairy-surface border border-slate-200/80 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 sm:h-64 lg:h-72 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fairy-midnight/85 via-fairy-midnight/30 to-transparent" />

                  <span className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-2xs sm:text-xs font-bold bg-fairy-deep/90 text-fairy-teal border border-fairy-teal/40 backdrop-blur-md shadow-sm">
                    {service.tag}
                  </span>

                  <div className="absolute bottom-2.5 left-3 sm:bottom-4 sm:left-6">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="p-3.5 sm:p-8">
                  <p className="text-slate-600 dark:text-gray-300 text-xs sm:text-base leading-relaxed mb-3 sm:mb-6 font-medium">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 sm:space-y-3 mb-4 sm:mb-6">
                    <p className="text-2xs sm:text-xs font-bold text-slate-400 dark:text-gray-400 uppercase tracking-wider">
                      Included in this service:
                    </p>
                    {service.features.map((feat: string, fIdx: number) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-800 dark:text-gray-200 font-medium bg-fairy-bg dark:bg-white/5 px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5"
                      >
                        <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-fairy-teal/20 flex items-center justify-center text-fairy-teal-dark dark:text-fairy-teal shrink-0">
                          <CheckCircle2 className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3.5 sm:p-8 pt-0 border-t border-slate-100 dark:border-white/5 flex items-center justify-end mt-2">
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal(
                      service.id === "commercial" ? "commercial" : "standard"
                    )
                  }
                  className="w-full py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-fairy-deep text-white hover:bg-fairy-teal-dark dark:bg-fairy-teal dark:hover:bg-fairy-teal-hover dark:text-fairy-midnight font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md group/btn"
                >
                  <span>Book {service.title}</span>
                  <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
