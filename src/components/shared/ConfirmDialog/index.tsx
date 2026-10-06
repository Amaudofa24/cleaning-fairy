"use client";

import React from "react";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "warning" | "danger" | "info";
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title = "Unsaved Booking Progress",
  description = "You have unsaved booking details. Are you sure you want to exit? Your selected options will be discarded.",
  confirmText = "Discard & Exit",
  cancelText = "Keep Booking",
  onConfirm,
  onCancel,
  variant = "warning",
}) => {
  if (!isOpen) return null;

  const renderIcon = () => {
    switch (variant) {
      case "danger":
        return (
          <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto text-red-600 dark:text-red-400">
            <AlertCircle className="w-6 h-6" />
          </div>
        );
      case "info":
        return (
          <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-600 dark:text-teal-400">
            <Info className="w-6 h-6" />
          </div>
        );
      case "warning":
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 dark:bg-black/80 backdrop-blur-sm rounded-3xl animate-in fade-in duration-200">
      <div
        className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {renderIcon()}

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-md shadow-red-600/20 cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
