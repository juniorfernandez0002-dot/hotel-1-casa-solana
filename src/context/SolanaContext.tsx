import React, { createContext, useContext, useMemo, useState } from 'react';
import { HOTEL_COPY } from '../data/hotelTranslations';
import type { CurrencyCode, LanguageCode } from '../types/hotel';

interface SolanaContextType {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  toggleLang: () => void;
  t: (typeof HOTEL_COPY)['es'];
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatRate: (usdAmount: number) => string;
  staySlugs: string[];
  toggleStaySlug: (slug: string) => void;
  clearStayBag: () => void;
  guestsCount: number;
  setGuestsCount: (n: number) => void;
  checkInDate: string;
  setCheckInDate: (d: string) => void;
  checkOutDate: string;
  setCheckOutDate: (d: string) => void;
  nightsCount: number;
  buildWhatsAppUrl: (message: string) => string;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

const CURRENCY_RATES: Record<CurrencyCode, { rate: number; symbol: string }> = {
  USD: { rate: 1, symbol: 'USD $' },
  PEN: { rate: 3.72, symbol: 'S/ ' },
  EUR: { rate: 0.92, symbol: 'EUR €' }
};

export const SolanaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<LanguageCode>('es');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [staySlugs, setStaySlugs] = useState<string[]>([
    'master-suite-terraza-oceanica-miraflores'
  ]);
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [checkInDate, setCheckInDate] = useState<string>('2026-07-14');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-07-17');

  const nightsCount = useMemo(() => {
    const start = new Date(checkInDate).getTime();
    const end = new Date(checkOutDate).getTime();
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 1;
    return Math.min(28, Math.max(1, Math.round((end - start) / 86400000)));
  }, [checkInDate, checkOutDate]);

  const toggleLang = () => setLang((prev) => (prev === 'es' ? 'en' : 'es'));

  const toggleStaySlug = (slug: string) => {
    setStaySlugs((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
    );
  };

  const clearStayBag = () => setStaySlugs([]);

  const formatRate = (usdAmount: number) => {
    const cfg = CURRENCY_RATES[currency];
    const converted = Math.round(usdAmount * cfg.rate);
    return `${cfg.symbol}${converted.toLocaleString('en-US')}`;
  };

  const buildWhatsAppUrl = (message: string) => {
    const phone = '51984248890';
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: HOTEL_COPY[lang],
      currency,
      setCurrency,
      formatRate,
      staySlugs,
      toggleStaySlug,
      clearStayBag,
      guestsCount,
      setGuestsCount,
      checkInDate,
      setCheckInDate,
      checkOutDate,
      setCheckOutDate,
      nightsCount,
      buildWhatsAppUrl
    }),
    [lang, currency, staySlugs, guestsCount, checkInDate, checkOutDate, nightsCount]
  );

  return <SolanaContext.Provider value={value}>{children}</SolanaContext.Provider>;
};

export const useSolana = () => {
  const ctx = useContext(SolanaContext);
  if (!ctx) throw new Error('useSolana must be used inside SolanaProvider');
  return ctx;
};
