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

export const formatAsMoney = (amount: number, currency = "₦"): string => {
  if (isNaN(amount)) return `${currency}0`;
  return `${currency}${amount.toLocaleString("en-NG")}`;
};

export const capitalizeStrings = (str: string): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getMinBookingDateString = (): string => {
  return dayjs().add(2, "day").format("YYYY-MM-DD");
};

export const getMaxBookingDateString = (): string => {
  return dayjs().add(90, "day").format("YYYY-MM-DD");
};

export const getTomorrowDateString = (): string => {
  return dayjs().add(2, "day").format("YYYY-MM-DD");
};

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
    const formattedDate = parsed.format("dddd, MMM D, YYYY");
    return timeSlot ? `${formattedDate} · ${timeSlot}` : formattedDate;
  } catch {
    return timeSlot ? `${dateStr} · ${timeSlot}` : dateStr;
  }
};

export const time24To12 = (time24: string): string => {
  if (!time24) return "";
  const parsed = dayjs(`2000-01-01 ${time24}`, "YYYY-MM-DD HH:mm");
  if (!parsed.isValid()) return time24;
  return parsed.format("h:mm A");
};

export const time12To24 = (time12: string): string => {
  if (!time12) return "";
  const parsed = dayjs(`2000-01-01 ${time12}`, "YYYY-MM-DD h:mm A");
  if (!parsed.isValid()) return "";
  return parsed.format("HH:mm");
};

export const generateBookingReference = (prefix = "CF"): string => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomDigits}`;
};
