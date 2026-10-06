"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  Calendar,
  Clock,
  RotateCcw,
  AlertTriangle,
  FileText,
  CheckCircle2,
} from "lucide-react";

export type PolicyTab =
  | "cancellation"
  | "rescheduling"
  | "damage"
  | "notice"
  | "terms";

interface IPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const PolicyModal = ({
  isOpen,
  onClose,
  initialTab = "cancellation",
}: IPolicyModalProps) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-modal overflow-y-auto bg-fairy-darker/80 backdrop-blur-md p-2.5 xs:p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-fairy-surface border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-modal-mobile sm:max-h-modal-desktop my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
              <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 dark:text-white truncate">
                Policies & Terms
              </h2>
              <p className="text-2xs sm:text-xs text-slate-500 dark:text-gray-400 truncate">
                Transparent operating standards for Cleaning Fairy customers
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-8 py-2 sm:py-2.5 border-b border-slate-200 dark:border-white/10 overflow-x-auto bg-slate-100/50 dark:bg-white/2">
          <button
            type="button"
            onClick={() => setActiveTab("cancellation")}
            className={`px-3 py-1.5 rounded-lg text-2xs sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "cancellation"
                ? "bg-teal-500 text-white dark:text-teal-950 shadow-sm"
                : "text-slate-600 dark:text-gray-300 hover:bg-slate-200/50 dark:hover:bg-white/5"
            }`}
          >
            Cancellation & Refund
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rescheduling")}
            className={`px-3 py-1.5 rounded-lg text-2xs sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "rescheduling"
                ? "bg-teal-500 text-white dark:text-teal-950 shadow-sm"
                : "text-slate-600 dark:text-gray-300 hover:bg-slate-200/50 dark:hover:bg-white/5"
            }`}
          >
            Rescheduling
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("damage")}
            className={`px-3 py-1.5 rounded-lg text-2xs sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "damage"
                ? "bg-teal-500 text-white dark:text-teal-950 shadow-sm"
                : "text-slate-600 dark:text-gray-300 hover:bg-slate-200/50 dark:hover:bg-white/5"
            }`}
          >
            Damage & Loss
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notice")}
            className={`px-3 py-1.5 rounded-lg text-2xs sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "notice"
                ? "bg-teal-500 text-white dark:text-teal-950 shadow-sm"
                : "text-slate-600 dark:text-gray-300 hover:bg-slate-200/50 dark:hover:bg-white/5"
            }`}
          >
            Booking Notice
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className={`px-3 py-1.5 rounded-lg text-2xs sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "terms"
                ? "bg-teal-500 text-white dark:text-teal-950 shadow-sm"
                : "text-slate-600 dark:text-gray-300 hover:bg-slate-200/50 dark:hover:bg-white/5"
            }`}
          >
            Terms of Service
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 space-y-5 text-slate-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
          {activeTab === "cancellation" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <RotateCcw className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600 dark:text-teal-400" />
                <h3>Cancellation & Refund Policy</h3>
              </div>

              <p className="text-slate-600 dark:text-gray-400">
                We understand schedules change. Our tiered refund structure protects both customer flexibility and cleaner livelihood:
              </p>

              <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-2xs sm:text-xs uppercase font-extrabold text-slate-700 dark:text-gray-300">
                      <th className="py-2.5 px-3 sm:px-5">Notice Given</th>
                      <th className="py-2.5 px-3 sm:px-5">Refund Amount</th>
                      <th className="py-2.5 px-3 sm:px-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-xs">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/2">
                      <td className="py-2.5 px-3 sm:px-5 font-semibold text-slate-900 dark:text-white">
                        More than 24 hours before appointment
                      </td>
                      <td className="py-2.5 px-3 sm:px-5 font-extrabold text-emerald-600 dark:text-emerald-400">
                        100% Refund
                      </td>
                      <td className="py-2.5 px-3 sm:px-5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-2xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                          Full Refund
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/2">
                      <td className="py-2.5 px-3 sm:px-5 font-semibold text-slate-900 dark:text-white">
                        Between 12 and 24 hours before appointment
                      </td>
                      <td className="py-2.5 px-3 sm:px-5 font-extrabold text-amber-600 dark:text-amber-400">
                        50% Refund
                      </td>
                      <td className="py-2.5 px-3 sm:px-5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-2xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300">
                          Partial Refund
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/2">
                      <td className="py-2.5 px-3 sm:px-5 font-semibold text-slate-900 dark:text-white">
                        Less than 12 hours before appointment
                      </td>
                      <td className="py-2.5 px-3 sm:px-5 font-extrabold text-rose-600 dark:text-rose-400">
                        No Refund
                      </td>
                      <td className="py-2.5 px-3 sm:px-5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-2xs font-bold bg-rose-500/10 text-rose-700 dark:text-rose-300">
                          Non-refundable
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-teal-500/5 hover:bg-teal-500/10">
                      <td className="py-2.5 px-3 sm:px-5 font-semibold text-teal-900 dark:text-teal-200">
                        Cleaner fails to show up (No-show guarantee)
                      </td>
                      <td className="py-2.5 px-3 sm:px-5 font-extrabold text-teal-700 dark:text-teal-400">
                        100% Refund or Free Rebooking
                      </td>
                      <td className="py-2.5 px-3 sm:px-5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-2xs font-bold bg-teal-500/20 text-teal-800 dark:text-teal-300">
                          Guaranteed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "rescheduling" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600 dark:text-teal-400" />
                <h3>Rescheduling Policy</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <h4>Free Rescheduling</h4>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-gray-300">
                    Allowed with zero additional cost if requested at least <strong>12 hours before</strong> the scheduled appointment time.
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-extrabold text-xs sm:text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <h4>Late Rescheduling</h4>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-gray-300">
                    If requested <strong>less than 12 hours</strong> prior to service, a standard fee of <strong>₦5,000</strong> applies to cover logistics and cleaner scheduling.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs space-y-1">
                <span className="font-bold text-slate-900 dark:text-white">How to Reschedule:</span>
                <p>
                  Use your Booking Reference in the <strong>Track Booking</strong> portal or contact support directly with your booking ID.
                </p>
              </div>
            </div>
          )}

          {activeTab === "damage" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600 dark:text-teal-400" />
                <h3>Damage & Loss Policy</h3>
              </div>

              <p className="text-slate-600 dark:text-gray-400">
                All Cleaning Fairy professionals are vetted and trained. In the rare event of an incident:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="w-7 h-7 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-400 font-extrabold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      Report Window (Within 24 Hours)
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">
                      Customers must report any suspected property damage or loss within 24 hours of service completion via our reporting form or email.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="w-7 h-7 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-400 font-extrabold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      Investigation SLA (5 Business Days)
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">
                      Our operations team will complete an objective investigation within 5 business days and provide full resolution or reimbursement in accordance with our guarantee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notice" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600 dark:text-teal-400" />
                <h3>Booking Notice Period</h3>
              </div>

              <div className="space-y-3.5">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      Minimum Booking Notice: 48 Hours
                    </h4>
                    <span className="text-2xs font-extrabold px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300">
                      Standard SLA
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-gray-400">
                    This advance notice gives Cleaning Fairy adequate time to:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>Assign an ideal vetted cleaner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>Confirm schedule availability</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>Arrange reliable transportation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>Prepare professional equipment</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      Maximum Advance Booking: 90 Days
                    </h4>
                    <span className="text-2xs font-extrabold px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-gray-300">
                      Advance Planning
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-gray-400">
                    Customers can schedule cleanings up to 3 months in advance. Recommended for:
                  </p>
                  <p className="text-xs text-slate-700 dark:text-gray-300 font-medium">
                    Move-in/Move-out cleanings • Pre-event preparations • Holiday & festive season scheduling.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <FileText className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600 dark:text-teal-400" />
                <h3>Terms of Service Summary</h3>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-gray-400">
                <p>
                  1. <strong>Service Agreement:</strong> By booking through Cleaning Fairy, you agree to grant access to the stated premises during the designated time slot.
                </p>
                <p>
                  2. <strong>Payment Processing:</strong> All payments are securely processed upfront via Paystack. Your booking is confirmed immediately upon successful transaction.
                </p>
                <p>
                  3. <strong>Cleaner Assignment:</strong> Cleaning Fairy guarantees assignment of background-checked, vetted personnel. Confirmation details and cleaner assignment will be emailed prior to your scheduled cleaning.
                </p>
                <p>
                  4. <strong>Rating & Feedback:</strong> Following service completion, customers are invited to rate their cleaner on a 1–5 scale across Punctuality, Professionalism, Thoroughness, and Communication.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 px-4 sm:px-8 py-3 sm:py-3.5 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
          <span className="text-2xs sm:text-xs text-slate-500 dark:text-gray-400">
            Questions? Email us at hello@cleaningfairy.com.ng
          </span>
          <button
            type="button"
            onClick={onClose}
            className="fairy-btn-teal px-5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs font-bold cursor-pointer shadow-md"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
