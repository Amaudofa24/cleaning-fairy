"use client";

import { Home, Calendar, CreditCard, Smile, Sparkles } from "lucide-react";
import { HOW_IT_WORKS_STEPS, IHowItWorksStep } from "../constants";

const ICON_MAP = {
  Home,
  Calendar,
  CreditCard,
  Smile,
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-fairy-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-teal-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seamless Process</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-400">
            Book your professional cleaner in 4 effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step: IHowItWorksStep) => {
            const IconComponent = ICON_MAP[step.icon];
            return (
              <div
                key={step.number}
                className="glass-card rounded-3xl p-8 glass-card-hover relative flex flex-col justify-between border border-white/10 group"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-teal-950 transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-4xl font-extrabold text-gray-700 group-hover:text-teal-500/40 transition-colors">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
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
