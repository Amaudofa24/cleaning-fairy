"use client";

import Image from "next/image";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { CLEANING_SERVICES, ICleaningService } from "../constants";

export const WhatWeClean = () => {
  return (
    <section id="what-we-clean" className="py-24 bg-fairy-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Cleaning Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            What We Clean
          </h2>
          <p className="text-lg text-gray-400">Pick what fits your space.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLEANING_SERVICES.map((service: ICleaningService) => (
            <div
              key={service.id}
              className="glass-card rounded-3xl overflow-hidden glass-card-hover flex flex-col justify-between group border border-white/10"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-fairy-card-alt via-transparent to-black/30" />

                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                    {service.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feat: string, fIdx: number) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-end mt-4">
                <a
                  href="#booking"
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-emerald-500 text-white hover:text-emerald-950 font-bold text-sm flex items-center justify-center gap-2 transition-all group/btn"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
