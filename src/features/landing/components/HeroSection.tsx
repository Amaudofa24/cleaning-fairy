"use client";

import Image from "next/image";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CreditCard,
  MapPin,
} from "lucide-react";
import { HERO_TRUST_MARKERS, ITrustMarker } from "../constants";
import { useBooking } from "@/features/booking";

const ICON_MAP = {
  Clock,
  CreditCard,
  ShieldCheck,
  MapPin,
};

export const HeroSection = () => {
  const { openBookingModal } = useBooking();

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/imgs/cleanfairy-hero.png"
          alt="Cleaning Fairy - Professional Home Cleaning"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-teal-400 text-xs sm:text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Cleaning Fairy 🧚🏽</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mb-6 drop-shadow-md">
          Not magic. <br />
          Just perfect cleaning.
        </h1>

        <p className="text-lg sm:text-2xl text-gray-100 font-normal max-w-2xl mb-8 leading-relaxed drop-shadow">
          Professional cleaning, booked in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto fairy-btn-teal px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-3 shadow-2xl transition-all hover:scale-105"
          >
            <span>Book a Cleaning Service</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {HERO_TRUST_MARKERS.map((marker: ITrustMarker) => {
            const IconComponent = ICON_MAP[marker.icon];
            return (
              <div
                key={marker.id}
                className="p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10"
              >
                <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-300 font-medium">
                    {marker.label}
                  </p>
                  <p className="text-sm font-bold text-white">{marker.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
