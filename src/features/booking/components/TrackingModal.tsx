"use client";

import React, { useState, useEffect } from "react";
import { useBooking } from "@/store/context/BookingContext";
import {
  X,
  Search,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Star,
  Sparkles,
  RotateCcw,
  Mail,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import {
  formatDateDisplay,
  getMinBookingDateString,
  getMaxBookingDateString,
} from "@/utils/misc";
import { PolicyTab, PolicyModal } from "@/features/landing/components/PolicyModal";

type BookingStatus =
  | "Pending Payment"
  | "Confirmed"
  | "Cleaner Assigned"
  | "Completed"
  | "Cancelled";

export const TrackingModal = () => {
  const { isTrackingOpen, closeTrackingModal, trackingBookingId, formData } =
    useBooking();

  const [searchRef, setSearchRef] = useState("");
  const [activeRef, setActiveRef] = useState("");
  const [currentStatus, setCurrentStatus] =
    useState<BookingStatus>("Cleaner Assigned");
  const [activeAction, setActiveAction] = useState<
    "overview" | "reschedule" | "cancel" | "report-damage" | "rating"
  >("overview");

  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyInitialTab, setPolicyInitialTab] =
    useState<PolicyTab>("cancellation");

  const [newDate, setNewDate] = useState(getMinBookingDateString());
  const [newTime, setNewTime] = useState("10:00 AM");
  const [rescheduleNoticeHours, setRescheduleNoticeHours] = useState(18);
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);

  const [cancelNoticeHours, setCancelNoticeHours] = useState(30);
  const [cancellationConfirmed, setCancellationConfirmed] = useState(false);

  const [damageDescription, setDamageDescription] = useState("");
  const [damageReported, setDamageReported] = useState(false);

  const [ratings, setRatings] = useState({
    punctuality: 5,
    professionalism: 5,
    thoroughness: 5,
    communication: 5,
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (isTrackingOpen) {
      const initialId = trackingBookingId || "CF-829104";
      setSearchRef(initialId);
      setActiveRef(initialId);
      setActiveAction("overview");
      setRescheduleSuccess(false);
      setCancellationConfirmed(false);
      setDamageReported(false);
      setReviewSubmitted(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isTrackingOpen, trackingBookingId]);

  if (!isTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.trim()) {
      setActiveRef(searchRef.trim().toUpperCase());
      setActiveAction("overview");
    }
  };

  const openPolicy = (tab: PolicyTab) => {
    setPolicyInitialTab(tab);
    setPolicyModalOpen(true);
  };

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRescheduleSuccess(true);
  };

  const handleCancelSubmit = () => {
    setCancellationConfirmed(true);
    setCurrentStatus("Cancelled");
  };

  const handleDamageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (damageDescription.trim()) {
      setDamageReported(true);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
  };

  const displayDate = formData.date || getMinBookingDateString();
  const displayTime = formData.timeSlot || "10:00 AM";
  const displayAddress = formData.address || "14 Admiralty Way, Lekki Phase 1";
  const displayService =
    formData.serviceType === "deep"
      ? "Deep Cleaning"
      : formData.serviceType === "move-in-out"
      ? "Move-in / Move-out Cleaning"
      : "Standard Cleaning";

  const getRefundTier = (hours: number) => {
    if (hours > 24) return { percent: 100, label: "100% Full Refund" };
    if (hours >= 12) return { percent: 50, label: "50% Partial Refund" };
    return { percent: 0, label: "No Refund (Under 12h)" };
  };

  const refundInfo = getRefundTier(cancelNoticeHours);

  return (
    <>
      <div
        className="fixed inset-0 z-modal overflow-y-auto bg-fairy-darker/80 backdrop-blur-md p-2.5 xs:p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
        onClick={closeTrackingModal}
      >
        <div
          className="relative w-full max-w-3xl bg-white dark:bg-fairy-surface border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-modal-mobile sm:max-h-modal-desktop my-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="shrink-0 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 dark:text-white truncate">
                  Booking Tracking & Management
                </h2>
                <p className="text-2xs sm:text-xs text-slate-500 dark:text-gray-400 truncate">
                  Track live status, cleaner assignment, and manage schedule
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeTrackingModal}
              className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Close tracking modal"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>

          <div className="shrink-0 p-3 sm:p-5 border-b border-slate-200 dark:border-white/10 bg-slate-100/40 dark:bg-white/2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchRef}
                  onChange={(e) => setSearchRef(e.target.value)}
                  placeholder="Enter Booking Reference (e.g. CF-829104)"
                  className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button
                type="submit"
                className="fairy-btn-teal px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer shrink-0"
              >
                Track
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 pt-2.5 border-t border-slate-200/60 dark:border-white/5 text-2xs sm:text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-400">
                <span>Simulate Status:</span>
                <select
                  value={currentStatus}
                  onChange={(e) =>
                    setCurrentStatus(e.target.value as BookingStatus)
                  }
                  className="bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg px-2 py-0.5 font-bold text-slate-900 dark:text-white text-2xs cursor-pointer"
                >
                  <option value="Pending Payment">Pending Payment</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cleaner Assigned">Cleaner Assigned</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openPolicy("cancellation")}
                  className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                >
                  Cancellation Policy
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => openPolicy("rescheduling")}
                  className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                >
                  Rescheduling Terms
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 space-y-5 text-slate-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
            {activeAction === "overview" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
                    <div>
                      <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-gray-400 block">
                        Booking Reference
                      </span>
                      <span className="text-sm sm:text-base font-mono font-extrabold text-slate-900 dark:text-white">
                        {activeRef}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs sm:text-xs font-extrabold ${
                          currentStatus === "Confirmed"
                            ? "bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-500/30"
                            : currentStatus === "Cleaner Assigned"
                            ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                            : currentStatus === "Completed"
                            ? "bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-500/30"
                            : currentStatus === "Pending Payment"
                            ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                            : "bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        <span>Status: {currentStatus}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-2xs text-slate-500 dark:text-gray-400 block">
                          Scheduled Time
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {formatDateDisplay(displayDate, displayTime)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-2xs text-slate-500 dark:text-gray-400 block">
                          Service Type
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {displayService}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-2xs text-slate-500 dark:text-gray-400 block">
                          Address
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white truncate block max-w-48">
                          {displayAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {currentStatus === "Cleaner Assigned" && (
                  <div className="p-3.5 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold flex items-center justify-center text-sm sm:text-base shrink-0">
                          AO
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                              Adaeze Okon
                            </h3>
                            <span className="inline-flex items-center gap-0.5 text-2xs font-extrabold bg-amber-500/20 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>4.9 (142 cleanings)</span>
                            </span>
                          </div>
                          <p className="text-2xs sm:text-xs text-slate-600 dark:text-gray-400">
                            Verified Senior Cleaning Fairy • Equipment & Supplies Prepared
                          </p>
                        </div>
                      </div>

                      <span className="text-2xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded-full hidden sm:inline-flex items-center gap-1 shrink-0">
                        <UserCheck className="w-3 h-3" /> Assigned
                      </span>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-emerald-500/20 text-xs font-mono text-slate-700 dark:text-gray-300">
                      Cleaner Adaeze Okon has been assigned to your booking scheduled for {displayDate}.
                    </div>
                  </div>
                )}

                {currentStatus === "Completed" && (
                  <div className="p-3.5 sm:p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold">
                        <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 dark:text-blue-400" />
                        <span>Service Completed Successfully</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveAction("rating")}
                        className="fairy-btn-teal px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer"
                      >
                        Rate Experience
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      Your cleaning service has been completed. Please rate your experience across Punctuality, Professionalism, Thoroughness, and Communication.
                    </p>
                  </div>
                )}

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Customer Actions
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveAction("reschedule")}
                      className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-teal-500 dark:hover:border-teal-400 text-left transition-all cursor-pointer space-y-0.5"
                    >
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs">
                        <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        <span>Reschedule Service</span>
                      </div>
                      <p className="text-2xs text-slate-500 dark:text-gray-400">
                        Free ≥ 12h prior • ₦5,000 if &lt; 12h
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveAction("cancel")}
                      className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-rose-500 dark:hover:border-rose-400 text-left transition-all cursor-pointer space-y-0.5"
                    >
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs">
                        <RotateCcw className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        <span>Cancel Booking</span>
                      </div>
                      <p className="text-2xs text-slate-500 dark:text-gray-400">
                        100% (&gt;24h) • 50% (12-24h)
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveAction("report-damage")}
                      className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-amber-500 dark:hover:border-amber-400 text-left transition-all cursor-pointer space-y-0.5"
                    >
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>Report Damage / Loss</span>
                      </div>
                      <p className="text-2xs text-slate-500 dark:text-gray-400">
                        24h window • 5-day SLA
                      </p>
                    </button>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Transactional Notification Template Preview</span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono text-slate-600 dark:text-gray-300">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <span className="text-2xs text-teal-600 dark:text-teal-400 font-bold block mb-0.5">
                        1. Booking Confirmation Email:
                      </span>
                      Your cleaning service has been booked for {displayDate} at {displayTime}. Booking Reference: {activeRef}.
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <span className="text-2xs text-teal-600 dark:text-teal-400 font-bold block mb-0.5">
                        2. Cleaner Assigned Email:
                      </span>
                      Cleaner Adaeze Okon has been assigned to your booking scheduled for {displayDate}.
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <span className="text-2xs text-teal-600 dark:text-teal-400 font-bold block mb-0.5">
                        3. Service Completed Email:
                      </span>
                      Your cleaning service has been completed. Please rate your experience.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeAction === "reschedule" && (
              <form
                onSubmit={handleRescheduleSubmit}
                className="space-y-4 animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600 dark:text-teal-400" />
                    <span>Reschedule Your Cleaning Service</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveAction("overview")}
                    className="text-xs text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Back to Overview
                  </button>
                </div>

                {rescheduleSuccess ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      Rescheduling Confirmed!
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-gray-300">
                      Your booking {activeRef} has been updated to {newDate} at {newTime}. An updated confirmation email has been dispatched.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveAction("overview")}
                      className="fairy-btn-teal px-6 py-2 rounded-full text-xs font-bold"
                    >
                      Return to Booking
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-gray-300">
                          Notice Window Calculator:
                        </span>
                        <select
                          value={rescheduleNoticeHours}
                          onChange={(e) =>
                            setRescheduleNoticeHours(Number(e.target.value))
                          }
                          className="bg-white dark:bg-white/10 border border-slate-300 dark:border-white/10 rounded px-2 py-0.5 text-2xs font-bold"
                        >
                          <option value={24}>24 Hours Notice (Free)</option>
                          <option value={15}>15 Hours Notice (Free)</option>
                          <option value={8}>8 Hours Notice (₦5,000 Fee)</option>
                          <option value={4}>4 Hours Notice (₦5,000 Fee)</option>
                        </select>
                      </div>

                      {rescheduleNoticeHours >= 12 ? (
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-2xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Free Rescheduling Applied (Notice ≥ 12 Hours)</span>
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-2xs text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Late Rescheduling Notice: Standard ₦5,000 fee applies for changes under 12 hours.</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-gray-300 block mb-1.5">
                          Select New Date (48h Notice to 90 Days Max)
                        </label>
                        <input
                          type="date"
                          value={newDate}
                          min={getMinBookingDateString()}
                          max={getMaxBookingDateString()}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-gray-300 block mb-1.5">
                          Select Arrival Time
                        </label>
                        <select
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="8:00 AM">8:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setActiveAction("overview")}
                        className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="fairy-btn-teal px-6 py-2.5 rounded-full text-xs font-bold shadow-lg"
                      >
                        Confirm New Schedule
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}

            {activeAction === "cancel" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <RotateCcw className="w-4 sm:w-5 h-4 sm:h-5 text-rose-600 dark:text-rose-400" />
                    <span>Cancel Cleaning Booking</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveAction("overview")}
                    className="text-xs text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Back to Overview
                  </button>
                </div>

                {cancellationConfirmed ? (
                  <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-rose-600 dark:text-rose-400 mx-auto" />
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      Booking Cancelled
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-gray-300">
                      Your booking {activeRef} has been cancelled. Refund processing: {refundInfo.label}. Refund will be credited within 3-5 business days via Paystack.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveAction("overview")}
                      className="fairy-btn-teal px-6 py-2 rounded-full text-xs font-bold"
                    >
                      Return to Booking
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-gray-300">
                          Notice Window Simulator:
                        </span>
                        <select
                          value={cancelNoticeHours}
                          onChange={(e) =>
                            setCancelNoticeHours(Number(e.target.value))
                          }
                          className="bg-white dark:bg-white/10 border border-slate-300 dark:border-white/10 rounded px-2 py-0.5 text-2xs font-bold"
                        >
                          <option value={36}>36h Notice (&gt; 24h: 100% Refund)</option>
                          <option value={18}>18h Notice (12–24h: 50% Refund)</option>
                          <option value={6}>6h Notice (&lt; 12h: No Refund)</option>
                        </select>
                      </div>

                      <div className="p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between gap-2 bg-white dark:bg-white/5 border-slate-200 dark:border-white/10">
                        <span>Calculated Refund:</span>
                        <span
                          className={`font-extrabold ${
                            refundInfo.percent === 100
                              ? "text-emerald-600 dark:text-emerald-400"
                              : refundInfo.percent === 50
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {refundInfo.label}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-900 dark:text-teal-200 space-y-1">
                      <span className="font-bold">Cleaner No-Show Guarantee:</span>
                      <p className="text-2xs text-slate-600 dark:text-teal-300/80">
                        If a cleaner ever fails to show up for an appointment, you receive a guaranteed 100% refund or free instant rebooking.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setActiveAction("overview")}
                        className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                      >
                        Keep Booking
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelSubmit}
                        className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md cursor-pointer"
                      >
                        Confirm Cancellation
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeAction === "report-damage" && (
              <form
                onSubmit={handleDamageSubmit}
                className="space-y-4 animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 dark:text-amber-400" />
                    <span>Report Damage or Property Loss</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveAction("overview")}
                    className="text-xs text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Back to Overview
                  </button>
                </div>

                {damageReported ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      Incident Ticket Logged
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-gray-300">
                      Thank you for reporting. Your incident ticket for booking {activeRef} has been received. Our operations team will complete an investigation and contact you within <strong>5 business days</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveAction("overview")}
                      className="fairy-btn-teal px-6 py-2 rounded-full text-xs font-bold"
                    >
                      Return to Booking
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-3 sm:p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                      <span className="font-bold">Damage & Loss Policy SLA:</span>
                      <ul className="text-2xs space-y-0.5 list-disc list-inside">
                        <li>Customer must report incident within 24 hours of service.</li>
                        <li>Investigation completed within 5 business days.</li>
                      </ul>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-gray-300 block mb-1.5">
                        Describe Item & Issue Details *
                      </label>
                      <textarea
                        rows={3}
                        value={damageDescription}
                        onChange={(e) => setDamageDescription(e.target.value)}
                        placeholder="Provide description of the damaged or missing item and what occurred..."
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setActiveAction("overview")}
                        className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="fairy-btn-teal px-6 py-2.5 rounded-full text-xs font-bold shadow-lg"
                      >
                        Submit Damage Report
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}

            {activeAction === "rating" && (
              <form
                onSubmit={handleReviewSubmit}
                className="space-y-4 animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-amber-500 fill-amber-500" />
                    <span>Rate Your Cleaning Experience</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveAction("overview")}
                    className="text-xs text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Back to Overview
                  </button>
                </div>

                {reviewSubmitted ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      Thank You for Your Feedback!
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-gray-300">
                      Your ratings have been submitted to our internal quality control system. Cleaner average ratings are updated in real-time.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveAction("overview")}
                      className="fairy-btn-teal px-6 py-2 rounded-full text-xs font-bold"
                    >
                      Return to Booking
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      Rate your cleaner (1–5 Stars) across each of our 4 quality categories:
                    </p>

                    <div className="space-y-2.5">
                      {(
                        [
                          { key: "punctuality", label: "1. Punctuality" },
                          { key: "professionalism", label: "2. Professionalism" },
                          { key: "thoroughness", label: "3. Thoroughness" },
                          { key: "communication", label: "4. Communication" },
                        ] as const
                      ).map(({ key, label }) => (
                        <div
                          key={key}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between"
                        >
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {label}
                          </span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                onClick={() => handleRatingChange(key, star)}
                                className="p-1 text-slate-300 hover:text-amber-400 dark:text-gray-600 dark:hover:text-amber-400 cursor-pointer"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    star <= ratings[key]
                                      ? "text-amber-500 fill-amber-500"
                                      : ""
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setActiveAction("overview")}
                        className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="fairy-btn-teal px-6 py-2.5 rounded-full text-xs font-bold shadow-lg"
                      >
                        Submit 4-Category Rating
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        initialTab={policyInitialTab}
      />
    </>
  );
};
