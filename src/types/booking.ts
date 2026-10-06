export type ServiceType = "standard" | "deep" | "move-in-out" | "commercial";

export type HomeSize = "1bed" | "2bed" | "3bed" | "4bed" | "5bed" | "duplex";

export type BathroomCount = 1 | 2 | 3 | 4;

export type AddonKey =
  | "fridge"
  | "kitchen_deep"
  | "cabinets"
  | "oven"
  | "windows"
  | "wardrobe"
  | "wall_washing"
  | "staircase"
  | "balcony"
  | "laundry";

export type CleaningFrequency = "one-time" | "weekly" | "bi-weekly" | "monthly";

export interface IAddonOption {
  key: AddonKey;
  label: string;
  price: number;
}

export interface ITransportZone {
  zone: string;
  fee: number;
  locations: string[];
}

export interface IBookingFormData {
  serviceType: ServiceType;
  homeSize: HomeSize;
  bathrooms: BathroomCount;
  selectedAddons: AddonKey[];
  address: string;
  building: string;
  area: string;
  landmark: string;
  fullName: string;
  phone: string;
  email: string;
  customerNote: string;
  date: string;
  timeSlot: string;
  frequency: CleaningFrequency;
}

export interface IPricingBreakdown {
  basePrice: number;
  extraBathroomFee: number;
  addonsTotal: number;
  transportFee: number;
  discountAmount: number;
  subtotal: number;
  total: number;
  isLocationSupported: boolean;
  zoneName: string | null;
}
