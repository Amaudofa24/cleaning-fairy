import * as Yup from "yup";

/**
 * Validation schema for Step 4 (Location & Contact Details)
 */
export const step4LocationContactValidation = Yup.object().shape({
  address: Yup.string().trim().required("Address is required."),
  area: Yup.string().trim().required("Area is required."),
  building: Yup.string().optional(),
  landmark: Yup.string().optional(),
  fullName: Yup.string().trim().required("Please enter your full name."),
  phone: Yup.string()
    .trim()
    .required("Please enter a valid phone number.")
    .min(8, "Please enter a valid phone number."),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Please enter a valid email address."),
  customerNote: Yup.string().optional(),
});

/**
 * Validation schema for Step 5 (Date & Time)
 */
export const step5DateTimeValidation = Yup.object().shape({
  date: Yup.string().required("Please select a date for your cleaning."),
  timeSlot: Yup.string().required("Please select or pick an arrival time slot."),
});

/**
 * Comprehensive Validation schema for the complete Booking Form
 */
export const bookingValidationSchema = Yup.object().shape({
  serviceType: Yup.string()
    .oneOf(["standard", "deep", "move-in-out"], "Invalid service type")
    .required("Service type is required"),
  homeSize: Yup.string()
    .oneOf(["1bed", "2bed", "3bed", "4bed", "5bed", "duplex"], "Invalid home size")
    .required("Home size is required"),
  bathrooms: Yup.number()
    .oneOf([1, 2, 3, 4], "Invalid bathroom count")
    .required("Bathroom count is required"),
  selectedAddons: Yup.array().of(Yup.string()),
  address: Yup.string().trim().required("Address is required."),
  area: Yup.string().trim().required("Area is required."),
  building: Yup.string().optional(),
  landmark: Yup.string().optional(),
  fullName: Yup.string().trim().required("Please enter your full name."),
  phone: Yup.string()
    .trim()
    .required("Please enter a valid phone number.")
    .min(8, "Please enter a valid phone number."),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Please enter a valid email address."),
  customerNote: Yup.string().optional(),
  date: Yup.string().required("Please select a date for your cleaning."),
  timeSlot: Yup.string().required("Please select or pick an arrival time slot."),
  frequency: Yup.string()
    .oneOf(["one-time", "weekly", "bi-weekly", "monthly"])
    .required("Frequency is required"),
});
