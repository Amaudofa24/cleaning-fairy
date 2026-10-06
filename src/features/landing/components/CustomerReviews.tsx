"use client";

import { Star, Quote, MapPin } from "lucide-react";
import { CUSTOMER_REVIEWS, ICustomerReview } from "../constants";

export const CustomerReviews = () => {
  return (
    <section id="reviews" className="py-10 sm:py-24 bg-fairy-bg dark:bg-fairy-dark relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-4">
            Loved by People Across Lagos
          </h2>
          <p className="text-xs sm:text-lg text-slate-600 dark:text-gray-300 font-medium">
            See why homeowners and professionals trust Cleaning Fairy for effortless cleaning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CUSTOMER_REVIEWS.map((rev: ICustomerReview) => (
            <div
              key={rev.id}
              className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-fairy-surface border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 sm:mb-6">
                  <div className="flex items-center gap-1 text-fairy-teal">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 sm:w-8 h-5 sm:h-8 text-slate-200 dark:text-white/10 group-hover:text-fairy-teal/30 transition-colors" />
                </div>

                <p className="text-slate-700 dark:text-gray-200 text-xs sm:text-base italic leading-relaxed mb-4 sm:mb-8 font-medium">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 pt-3.5 sm:pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="w-8 sm:w-11 h-8 sm:h-11 rounded-xl sm:rounded-2xl bg-fairy-teal-dark text-white flex items-center justify-center font-extrabold text-xs sm:text-sm shadow-sm shrink-0">
                  {rev.author[0]}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {rev.author}
                  </h4>
                  <div className="flex items-center gap-1 text-2xs sm:text-xs text-fairy-teal-dark dark:text-fairy-teal font-semibold">
                    <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    <span>{rev.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
