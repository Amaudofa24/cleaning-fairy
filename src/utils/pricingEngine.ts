import {
  ServiceType,
  HomeSize,
  BathroomCount,
  AddonKey,
  IAddonOption,
  ITransportZone,
  IBookingFormData,
  IPricingBreakdown,
} from "@/types/booking";

export const BASE_PRICES: Record<HomeSize, Record<ServiceType, number>> = {
  "1bed": {
    standard: 18000,
    deep: 35000,
    "move-in-out": 40000,
  },
  "2bed": {
    standard: 25000,
    deep: 50000,
    "move-in-out": 55000,
  },
  "3bed": {
    standard: 32000,
    deep: 65000,
    "move-in-out": 70000,
  },
  "4bed": {
    standard: 40000,
    deep: 80000,
    "move-in-out": 85000,
  },
  "5bed": {
    standard: 50000,
    deep: 95000,
    "move-in-out": 100000,
  },
  duplex: {
    standard: 55000,
    deep: 110000,
    "move-in-out": 120000,
  },
};

export const ADDONS_CONFIG: IAddonOption[] = [
  { key: "fridge", label: "Inside refrigerator", price: 5000 },
  { key: "kitchen_deep", label: "Kitchen deep clean", price: 5000 },
  { key: "cabinets", label: "Inside cabinets", price: 5000 },
  { key: "oven", label: "Inside oven", price: 5000 },
  { key: "windows", label: "Window cleaning", price: 5000 },
  { key: "wardrobe", label: "Wardrobe interior", price: 2000 },
  { key: "wall_washing", label: "Wall washing", price: 5000 },
  { key: "staircase", label: "Staircase", price: 3000 },
  { key: "balcony", label: "Balcony / Patio", price: 2000 },
  { key: "laundry", label: "Laundry", price: 5000 },
];

export const TRANSPORT_ZONES: ITransportZone[] = [
  {
    zone: "Z1",
    fee: 1500,
    locations: [
      "surulere",
      "yaba",
      "jibowu",
      "fadeyi",
      "mushin",
      "ilupeju",
      "onipanu",
      "palmgrove",
      "akoka",
      "ojota",
      "ebute metta",
    ],
  },
  {
    zone: "Z2",
    fee: 2000,
    locations: [
      "ogudu",
      "gbagada",
      "shomolu",
      "anthony",
      "maryland",
      "ajao",
      "ikeja",
      "ikeja along",
      "magodo phase 1",
      "magodo phase 2",
      "omole phase 1",
      "omole phase 2",
    ],
  },
  {
    zone: "Z4",
    fee: 3000,
    locations: ["festac"],
  },
  {
    zone: "Z5",
    fee: 3000,
    locations: [
      "marina",
      "lagos island",
      "ikoyi",
      "victoria island",
      "vi",
      "v.i.",
      "ikate",
      "chisco",
      "maruwa",
      "salem",
      "elegushi",
      "lekki phase 1",
      "osapa",
      "ologolo",
      "agungi",
      "chevron",
      "eleganza",
    ],
  },
  {
    zone: "Z5/Z6",
    fee: 3500,
    locations: ["ikota", "orchid road", "new road", "igboefon"],
  },
  {
    zone: "Z6",
    fee: 4000,
    locations: [
      "lekki phase 2",
      "ajah",
      "badore",
      "addo road",
      "abraham adesanya",
      "ogombo",
      "sangotedo",
      "awoyaya",
      "lekki gardens phase 3",
    ],
  },
  {
    zone: "Z6/Z8",
    fee: 4500,
    locations: ["lakowe"],
  },
  {
    zone: "Z8",
    fee: 5000,
    locations: ["ibeju-lekki", "lbs", "lekki free trade zone"],
  },
];

export const getTransportDetails = (
  areaName: string
): { isSupported: boolean; fee: number; zone: string | null } => {
  if (!areaName || !areaName.trim()) {
    return { isSupported: true, fee: 3000, zone: "Z5" }; // Default initial estimate until customer specifies area
  }

  const query = areaName.trim().toLowerCase();
  for (const tz of TRANSPORT_ZONES) {
    if (
      tz.locations.some(
        (loc) => query.includes(loc) || loc.includes(query)
      )
    ) {
      return { isSupported: true, fee: tz.fee, zone: tz.zone };
    }
  }

  return { isSupported: false, fee: 0, zone: null };
};

export const calculateBookingPrice = (
  data: Partial<IBookingFormData>
): IPricingBreakdown => {
  const serviceType: ServiceType = data.serviceType || "standard";
  const homeSize: HomeSize = data.homeSize || "2bed";
  const bathrooms: BathroomCount = data.bathrooms || 1;
  const selectedAddons: AddonKey[] = data.selectedAddons || [];
  const area = data.area || "";

  const basePrice = BASE_PRICES[homeSize][serviceType];
  const extraBathroomCount = Math.max(0, bathrooms - 1);
  const extraBathroomFee = extraBathroomCount * 3000;

  const addonsTotal = selectedAddons.reduce((sum, key) => {
    const addon = ADDONS_CONFIG.find((a) => a.key === key);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const { isSupported, fee: transportFee, zone } = getTransportDetails(area);
  const subtotal = basePrice + extraBathroomFee + addonsTotal;

  let discountPercent = 0;
  if (data.frequency === "weekly") discountPercent = 0.1;
  else if (data.frequency === "bi-weekly") discountPercent = 0.05;

  const discountAmount = Math.round(subtotal * discountPercent);
  const total = isSupported ? subtotal + transportFee - discountAmount : 0;

  return {
    basePrice,
    extraBathroomFee,
    addonsTotal,
    transportFee,
    discountAmount,
    subtotal,
    total,
    isLocationSupported: isSupported,
    zoneName: zone,
  };
};
