"use client";

import Image from "next/image";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { CLEANING_SERVICES, ICleaningService } from "../constants";
import { useBooking } from "@/features/booking";

export const WhatWeClean = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="what-we-clean" className="py-24 bg-slate-50/70 dark:bg-fairy-card relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-teal-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Cleaning Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            What We Clean
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400">
            Pick what fits your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CLEANING_SERVICES.map((service: ICleaningService) => (
            <div
              key={service.id}
              className="glass-card rounded-3xl overflow-hidden glass-card-hover flex flex-col justify-between group border border-slate-200/90 dark:border-white/10"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 dark:from-fairy-card-alt via-transparent to-black/30" />

                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-teal-300 dark:text-teal-400 border border-teal-500/30">
                    {service.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feat: string, fIdx: number) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 dark:border-white/5 flex items-center justify-end mt-4">
                <button
                  type="button"
                  onClick={() => openBookingModal("standard")}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white hover:bg-teal-600 dark:bg-white/10 dark:hover:bg-teal-500 dark:text-white dark:hover:text-teal-950 font-bold text-sm flex items-center justify-center gap-2 transition-all group/btn cursor-pointer shadow-sm"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
