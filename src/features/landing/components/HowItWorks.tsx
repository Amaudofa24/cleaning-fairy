"use client";

import { Home, Calendar, CreditCard, Smile } from "lucide-react";
import { HOW_IT_WORKS_STEPS, IHowItWorksStep } from "../constants";

const ICON_MAP = {
  Home,
  Calendar,
  CreditCard,
  Smile,
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-10 sm:py-24 bg-fairy-bg dark:bg-fairy-dark relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-4">
            How It Works
          </h2>
          <p className="text-xs sm:text-lg text-slate-600 dark:text-gray-300 font-medium">
            Book your professional cleaner in 4 effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step: IHowItWorksStep) => {
            const IconComponent = ICON_MAP[step.icon];
            return (
              <div
                key={step.number}
                className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-fairy-surface border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3.5 sm:mb-8">
                  <div className="w-9 sm:w-14 h-9 sm:h-14 rounded-xl sm:rounded-2xl bg-fairy-accent-light dark:bg-white/10 text-fairy-teal-dark dark:text-fairy-teal flex items-center justify-center group-hover:bg-fairy-deep group-hover:text-fairy-teal dark:group-hover:bg-fairy-teal dark:group-hover:text-fairy-midnight transition-all duration-300">
                    <IconComponent className="w-4 sm:w-7 h-4 sm:h-7" />
                  </div>
                  <span className="text-2xl sm:text-4xl font-black text-slate-200 dark:text-white/10 group-hover:text-fairy-teal/40 transition-colors select-none">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2.5 group-hover:text-fairy-teal-dark dark:group-hover:text-fairy-teal transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
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
