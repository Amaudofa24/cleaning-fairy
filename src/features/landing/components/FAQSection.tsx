"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_ITEMS, IFaqItem } from "../constants";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-10 sm:py-24 bg-fairy-bg dark:bg-fairy-dark relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-lg text-slate-600 dark:text-gray-300 font-medium">
            Everything you need to know about booking your Cleaning Fairy.
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-4">
          {FAQ_ITEMS.map((faq: IFaqItem, index: number) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="rounded-xl sm:rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-fairy-surface overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-3.5 sm:p-6 text-left flex items-center justify-between gap-2.5 sm:gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="text-xs xs:text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 sm:gap-3 min-w-0">
                    <HelpCircle className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-fairy-teal shrink-0" />
                    <span className="leading-snug">{faq.question}</span>
                  </span>
                  <div className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-fairy-accent-light dark:bg-white/10 flex items-center justify-center text-fairy-teal-dark dark:text-fairy-teal transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3.5 sm:px-6 pb-3.5 sm:pb-6 pt-1 sm:pt-2 text-xs sm:text-base text-slate-600 dark:text-gray-200 border-t border-slate-100 dark:border-white/10 leading-relaxed font-medium animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
