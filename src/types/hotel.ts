export type LanguageCode = 'es' | 'en' | 'zh';
export type CurrencyCode = 'USD' | 'PEN' | 'EUR';
export type HotelLocationId = 'all' | 'miraflores' | 'valle' | 'paracas';
export type SuiteCategory = 'all' | 'suites' | 'villas' | 'penthouse' | 'lofts';

export interface BilingualText {
  es: string;
  en: string;
  zh?: string;
}

export interface HotelRoom {
  id: string;
  slug: string;
  code: string;
  locationId: Exclude<HotelLocationId, 'all'>;
  locationName: BilingualText;
  countryCode: 'PE';
  category: Exclude<SuiteCategory, 'all'>;
  title: BilingualText;
  shortTitle: BilingualText;
  tagline: BilingualText;
  sqm: number;
  maxGuests: number;
  bedConfig: BilingualText;
  viewType: BilingualText;
  nightlyUsd: number;
  originalNightlyUsd?: number;
  promoBadge?: BilingualText;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  gallery: string[];
  perks: { es: string[]; en: string[] };
  amenities: { es: string[]; en: string[] };
  checkInNote: BilingualText;
}

export interface HotelLocationHub {
  id: Exclude<HotelLocationId, 'all'>;
  code: string;
  name: BilingualText;
  cityTag: BilingualText;
  transferNote: BilingualText;
  climate: BilingualText;
  signatureAmenity: BilingualText;
  summary: BilingualText;
  heroImage: string;
  lat: number;
  lng: number;
  zoom: number;
  startingRateUsd: number;
}

export interface ComfortScene {
  id: string;
  tabLabel: BilingualText;
  kicker: BilingualText;
  headline: BilingualText;
  description: BilingualText;
  specs: { label: BilingualText; value: BilingualText }[];
  image: string;
}
