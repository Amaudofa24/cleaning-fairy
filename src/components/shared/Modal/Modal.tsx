"use client";

import React, { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

export type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "full";

export interface ModalProps {
  open?: boolean;
  isOpen?: boolean;
  handleClose?: () => void;
  onClose?: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  header?: ReactNode;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  hideCloseBtn?: boolean;
  stopOutsideClickClose?: boolean;
  size?: ModalSize;
  showAmbientGlow?: boolean;
  containerClass?: string;
  backdropClass?: string;
  headerClass?: string;
  children: ReactNode;
}

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  full: "max-w-full m-4",
};

export const Modal: React.FC<ModalProps> = ({
  open,
  isOpen,
  handleClose,
  onClose,
  title,
  subtitle,
  header,
  headerLeft,
  headerRight,
  hideCloseBtn = false,
  stopOutsideClickClose = false,
  size = "2xl",
  showAmbientGlow = false,
  containerClass = "",
  backdropClass = "",
  headerClass = "",
  children,
}) => {
  const isVisible = open !== undefined ? open : Boolean(isOpen);
  const closeFn = handleClose || onClose || (() => {});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible && !stopOutsideClickClose) {
        closeFn();
      }
    };
    if (isVisible) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, closeFn, stopOutsideClickClose]);

  if (!isVisible) return null;

  const hasHeader =
    header !== undefined ||
    headerLeft !== undefined ||
    headerRight !== undefined ||
    title !== undefined ||
    !hideCloseBtn;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className={`fixed inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200 ${backdropClass}`}
        onClick={!stopOutsideClickClose ? closeFn : undefined}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div
          className={`w-full ${SIZE_CLASSES[size]} transform rounded-3xl bg-white dark:bg-fairy-card border border-slate-200 dark:border-white/10 p-5 sm:p-8 text-left align-middle shadow-2xl transition-all relative overflow-hidden my-6 z-10 animate-in zoom-in-95 duration-200 ${containerClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showAmbientGlow && (
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          )}

          {hasHeader && (
            <>
              {header ? (
                <div className={`mb-6 ${headerClass}`}>{header}</div>
              ) : (
                <div
                  className={`flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6 relative z-10 ${headerClass}`}
                >
                  <div className="flex items-center gap-3">
                    {headerLeft ? (
                      headerLeft
                    ) : (
                      <div>
                        {title && (
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                            {title}
                          </h3>
                        )}
                        {subtitle && (
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-0.5">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {headerRight}

                    {!hideCloseBtn && (
                      <button
                        type="button"
                        onClick={closeFn}
                        className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
