"use client";

import { Clock, ShieldCheck, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { WHY_CLEANING_FAIRY_FEATURES, IWhyCleaningFairyItem } from "../constants";

const ICON_MAP = {
  Clock,
  Lock,
  ShieldCheck,
};

export const WhyCleaningFairy = () => {
  return (
    <section id="why-us" className="py-24 bg-fairy-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Cleaning Fairy Difference</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Cleaning Fairy
          </h2>
          <p className="text-lg text-gray-400">
            Built for convenient, frictionless home cleaning across Lagos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CLEANING_FAIRY_FEATURES.map((item: IWhyCleaningFairyItem) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <div
                key={item.id}
                className="glass-card rounded-3xl p-8 glass-card-hover border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
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
