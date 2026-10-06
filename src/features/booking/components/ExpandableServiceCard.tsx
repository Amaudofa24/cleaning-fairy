"use client";

import React, { useState } from "react";
import { ChevronDown, CheckCircle2, Check } from "lucide-react";
import { ServiceType } from "@/types/booking";

interface ExpandableServiceCardProps {
  id: ServiceType;
  title: string;
  subtitle: string;
  featuresHeader?: string;
  features: string[];
  isSelected: boolean;
  onSelect: (id: ServiceType) => void;
}

export const ExpandableServiceCard: React.FC<ExpandableServiceCardProps> = ({
  id,
  title,
  subtitle,
  featuresHeader = "What's included",
  features,
  isSelected,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-3.5 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out border ${
        isSelected
          ? "bg-teal-500/10 border-teal-500 shadow-md shadow-teal-500/10"
          : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100/70 dark:hover:bg-white/10"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className={`w-5 sm:w-5.5 h-5 sm:h-5.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                isSelected
                  ? "bg-teal-500 border-teal-400 text-white dark:text-teal-950"
                  : "border-slate-300 dark:border-white/30 bg-slate-100 dark:bg-black/20"
              }`}
            >
              {isSelected && <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-2" />}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 mt-1 pl-7.5 sm:pl-8.5 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleExpand}
          className="inline-flex items-center gap-1 text-2xs sm:text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 py-1 px-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20 transition-colors cursor-pointer self-start sm:self-auto shrink-0 ml-7.5 sm:ml-0"
          aria-expanded={isExpanded}
        >
          <span>{featuresHeader}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-in-out ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100 mt-3.5 pt-3.5 border-t border-slate-200 dark:border-white/10"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 sm:gap-2.5 text-slate-700 dark:text-gray-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
