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
    e.stopPropagation(); // Prevents card selection when expanding dropdown
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
        isSelected
          ? "bg-teal-500/10 border-teal-500 shadow-md shadow-teal-500/10"
          : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100/70 dark:hover:bg-white/10"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                isSelected
                  ? "bg-teal-500 border-teal-400 text-white dark:text-teal-950"
                  : "border-slate-300 dark:border-white/30 bg-slate-100 dark:bg-black/20"
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-gray-300 mt-1 pl-9 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleExpand}
          className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 py-1 px-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20 transition-colors cursor-pointer"
          aria-expanded={isExpanded}
        >
          <span>{featuresHeader}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs sm:text-sm space-y-2.5 animate-in fade-in duration-200">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
