"use client";

import React, { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  subtitle?: string;
  hideCloseBtn?: boolean;
  stopOutsideClickClose?: boolean;
  children: ReactNode;
  containerClass?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  title,
  subtitle,
  hideCloseBtn = false,
  stopOutsideClickClose = false,
  children,
  containerClass = "",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !stopOutsideClickClose) {
        handleClose();
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleClose, stopOutsideClickClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={!stopOutsideClickClose ? handleClose : undefined}
      />

      {/* Modal Box */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div
          className={`w-full max-w-2xl transform rounded-3xl bg-fairy-card border border-white/10 p-5 sm:p-8 text-left align-middle shadow-2xl transition-all relative overflow-hidden my-6 z-10 animate-in zoom-in-95 duration-200 ${containerClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || !hideCloseBtn) && (
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                {title && (
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                )}
                {subtitle && (
                  <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
                )}
              </div>
              {!hideCloseBtn && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-full text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
