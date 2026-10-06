"use client";

import { Star, Quote, Sparkles, MapPin } from "lucide-react";
import { CUSTOMER_REVIEWS, ICustomerReview } from "../constants";

export const CustomerReviews = () => {
  return (
    <section id="reviews" className="py-24 bg-slate-50/70 dark:bg-fairy-card relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-teal-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Loved by People Across Lagos
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400">
            See why homeowners and professionals trust Cleaning Fairy for
            effortless cleaning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_REVIEWS.map((rev: ICustomerReview) => (
            <div
              key={rev.id}
              className="glass-card rounded-3xl p-8 glass-card-hover border border-slate-200/90 dark:border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-teal-500 dark:text-teal-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-teal-500 dark:fill-teal-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-300 dark:text-white/10 group-hover:text-teal-500/30 transition-colors" />
                </div>

                <p className="text-slate-700 dark:text-gray-200 text-base italic leading-relaxed mb-8">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-white/5">
                <div
                  className={`w-10 h-10 rounded-full bg-linear-to-tr ${rev.avatarBg} flex items-center justify-center font-bold text-gray-950 text-sm shadow-md`}
                >
                  {rev.author[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rev.author}</h4>
                  <div className="flex items-center gap-1 text-xs text-teal-700 dark:text-teal-400 font-medium">
                    <MapPin className="w-3 h-3" />
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
