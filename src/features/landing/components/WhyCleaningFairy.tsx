"use client";

import Image from "next/image";
import { Clock, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import {
  WHY_CLEANING_FAIRY_FEATURES,
  IWhyCleaningFairyItem,
} from "../constants";

const ICON_MAP = {
  Clock,
  Lock,
  ShieldCheck,
};

export const WhyCleaningFairy = () => {
  return (
    <section id="why-us" className="py-10 sm:py-24 bg-fairy-bg dark:bg-fairy-dark relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-4">
            Why Cleaning Fairy
          </h2>
          <p className="text-xs sm:text-lg text-slate-600 dark:text-gray-300 font-medium">
            Built for convenient, frictionless cleaning across Lagos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch mb-4 sm:mb-6">
          <div className="lg:col-span-6 p-4.5 xs:p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-fairy-teal text-fairy-midnight flex flex-col justify-between shadow-xl relative overflow-hidden border border-teal-600">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-8">
                <span className="text-2xs sm:text-xs font-extrabold uppercase tracking-widest text-fairy-midnight/85 bg-white/40 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-xs">
                  {WHY_CLEANING_FAIRY_FEATURES[0].highlight}
                </span>
                <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-xl sm:rounded-2xl bg-fairy-deep text-fairy-teal flex items-center justify-center shadow-md">
                  <Clock className="w-4 sm:w-6 h-4 sm:h-6" />
                </div>
              </div>

              <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-fairy-midnight leading-tight mb-2 sm:mb-4 tracking-tight">
                {WHY_CLEANING_FAIRY_FEATURES[0].title}
              </h3>

              <p className="text-xs sm:text-base text-fairy-midnight/90 font-medium leading-relaxed mb-4 sm:mb-6">
                {WHY_CLEANING_FAIRY_FEATURES[0].description}
              </p>
            </div>

            <div className="pt-3.5 sm:pt-6 border-t border-fairy-midnight/15 flex items-center gap-2 text-2xs sm:text-xs font-bold text-fairy-midnight">
              <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
              <span>Guaranteed quality experience across Lagos</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-48 sm:h-80 lg:h-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 dark:border-white/10 group min-h-44 sm:min-h-72">
            <Image
              src="/assets/imgs/cleaner-portrait.jpg"
              alt="Vetted & Reliable Cleaners"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fairy-midnight/85 via-fairy-midnight/20 to-transparent" />
            
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-white">
              <div>
                <p className="text-sm sm:text-xl font-bold">Trusted Professionals</p>
                <p className="text-2xs sm:text-sm text-white/80">Every Fairy is background-checked and identity-verified.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {WHY_CLEANING_FAIRY_FEATURES.slice(1).map((item: IWhyCleaningFairyItem) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <div
                key={item.id}
                className="p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-fairy-surface border border-slate-200/80 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-6">
                    <div className="w-9 sm:w-14 h-9 sm:h-14 rounded-xl sm:rounded-2xl bg-fairy-accent-light dark:bg-white/10 text-fairy-teal-dark dark:text-fairy-teal flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-4 sm:w-7 h-4 sm:h-7" />
                    </div>
                    <span className="text-2xs sm:text-xs font-bold text-fairy-teal-dark dark:text-fairy-teal bg-fairy-accent-light dark:bg-white/10 px-2.5 sm:px-3 py-1 rounded-full border border-fairy-teal/30">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-2xl font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-3 group-hover:text-fairy-teal-dark dark:group-hover:text-fairy-teal transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 text-xs sm:text-base leading-relaxed mb-3 sm:mb-6 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 text-2xs sm:text-xs font-semibold text-fairy-teal-dark dark:text-fairy-teal">
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                  <span>Guaranteed quality experience</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
