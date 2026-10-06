import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const dayJs = dayjs;
export { dayjs };

/**
 * Formats numerical values to Nigerian Naira (NGN) currency string or formatted money
 */
export const formatAsMoney = (amount: number, currency = "₦"): string => {
  if (isNaN(amount)) return `${currency}0`;
  return `${currency}${amount.toLocaleString("en-NG")}`;
};

/**
 * Capitalizes words in a given string
 */
export const capitalizeStrings = (str: string): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Gets tomorrow's date string in YYYY-MM-DD format using dayjs
 */
export const getTomorrowDateString = (): string => {
  return dayjs().add(1, "day").format("YYYY-MM-DD");
};

/**
 * Formats a date string and time slot into a human-readable booking date display
 * e.g. "Saturday, Aug 15 · 10:00 AM"
 */
export const formatDateDisplay = (
  dateStr?: string,
  timeSlot?: string
): string => {
  if (!dateStr) return "Scheduled Cleaning";
  try {
    const parsed = dayjs(dateStr);
    if (!parsed.isValid()) {
      return timeSlot ? `${dateStr} · ${timeSlot}` : dateStr;
    }
    const formattedDate = parsed.format("dddd, MMM D");
    return timeSlot ? `${formattedDate} · ${timeSlot}` : formattedDate;
  } catch {
    return timeSlot ? `${dateStr} · ${timeSlot}` : dateStr;
  }
};

/**
 * Converts 24-hour time string ("14:30") to 12-hour format ("2:30 PM") using dayjs custom parsing
 */
export const time24To12 = (time24: string): string => {
  if (!time24) return "";
  const parsed = dayjs(`2000-01-01 ${time24}`, "YYYY-MM-DD HH:mm");
  if (!parsed.isValid()) return time24;
  return parsed.format("h:mm A");
};

/**
 * Converts 12-hour time string ("2:30 PM") to 24-hour format ("14:30") using dayjs
 */
export const time12To24 = (time12: string): string => {
  if (!time12) return "";
  const parsed = dayjs(`2000-01-01 ${time12}`, "YYYY-MM-DD h:mm A");
  if (!parsed.isValid()) return "";
  return parsed.format("HH:mm");
};

/**
 * Generates a unique human-referenceable booking reference (e.g. "CF-839201")
 */
export const generateBookingReference = (prefix = "CF"): string => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomDigits}`;
};
