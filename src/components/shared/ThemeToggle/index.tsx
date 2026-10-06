"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "pill" | "expanded";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  variant = "icon",
}) => {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return (
      <div
        className={`w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border cursor-pointer ${
          isDark
            ? "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-teal-500/40"
            : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 hover:border-teal-500/40 shadow-xs"
        } ${className}`}
        aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
        title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      >
        <span className="relative w-4 h-4 flex items-center justify-center">
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-teal-400" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          )}
        </span>
        <span>{isDark ? "Dark" : "Light"}</span>
      </button>
    );
  }

  if (variant === "expanded") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
          isDark
            ? "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
            : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
        } ${className}`}
        aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isDark ? "bg-teal-500/20 text-teal-400" : "bg-amber-100 text-amber-600"
            }`}
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold">
              {isDark ? "Dark Theme Active" : "Light Theme Active"}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-400">
              Tap to switch to {isDark ? "Light" : "Dark"} Mode
            </p>
          </div>
        </div>

        <div
          className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${
            isDark ? "bg-teal-500" : "bg-slate-300"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
              isDark ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl transition-all duration-300 border flex items-center justify-center group overflow-hidden cursor-pointer ${
        isDark
          ? "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-teal-500/40"
          : "bg-white/80 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:border-teal-500/40 shadow-xs"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`w-5 h-5 text-amber-500 absolute transition-all duration-500 transform ${
            isDark
              ? "rotate-90 scale-0 opacity-0 pointer-events-none"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`w-5 h-5 text-teal-400 absolute transition-all duration-500 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0 pointer-events-none"
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
