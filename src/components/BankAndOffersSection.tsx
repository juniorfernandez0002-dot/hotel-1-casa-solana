import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSolana } from '../context/SolanaContext';
import { BankPartnerMarks } from './PaymentBadges';
import { CyberCampaignBanner } from './CyberCampaignBanner';

interface OfferCardData {
  id: string;
  bgHex: string;
  accentTextHex: string;
  logoImg?: string;
  customBadge?: string;
  kicker: string;
  discountNum: string;
  discountSymbol: string;
  discountLabel: string;
  installments?: string;
  subline?: string;
  to: string;
}

export const BankAndOffersSection: React.FC = () => {
  const { lang } = useSolana();
  const [carouselOffset, setCarouselOffset] = useState(0);

  const bankCards: OfferCardData[] = [
    {
      id: 'cyber',
      bgHex: '#eb3a7d',
      accentTextHex: '#eb3a7d',
      customBadge: 'CYBER CASA SOLANA',
      kicker: lang === 'zh' ? '最高' : lang === 'es' ? 'Hasta' : 'Up to',
      discountNum: '50',
      discountSymbol: '%',
      discountLabel: lang === 'zh' ? '特惠' : lang === 'es' ? 'Dscto.' : 'Off',
      subline:
        lang === 'zh'
          ? '在 Cyber 索拉纳狂欢特惠季'
          : lang === 'es'
          ? 'en el Cyber Casa Solana'
          : 'during Cyber Casa Solana',
      to: '/habitaciones'
    },
    {
      id: 'interbank',
      bgHex: '#06be4f',
      accentTextHex: '#06be4f',
      logoImg: './images/brands/interbank-card.webp',
      kicker: lang === 'zh' ? '最高' : lang === 'es' ? 'Hasta' : 'Up to',
      discountNum: '25',
      discountSymbol: '%',
      discountLabel: lang === 'zh' ? '优惠' : lang === 'es' ? 'Dscto.' : 'Off',
      installments: '12',
      to: '/reservar'
    },
    {
      id: 'bcp',
      bgHex: '#002a8e',
      accentTextHex: '#002a8e',
      logoImg: './images/brands/bcp-card.png',
      kicker: lang === 'zh' ? '最高' : lang === 'es' ? 'Hasta' : 'Up to',
      discountNum: '25',
      discountSymbol: '%',
      discountLabel: lang === 'zh' ? '优惠' : lang === 'es' ? 'Dscto.' : 'Off',
      installments: '12',
      to: '/reservar'
    },
    {
      id: 'bbva',
      bgHex: '#0e457e',
      accentTextHex: '#0e457e',
      logoImg: './images/brands/bbva-card.webp',
      kicker: lang === 'zh' ? '最高' : lang === 'es' ? 'Hasta' : 'Up to',
      discountNum: '25',
      discountSymbol: '%',
      discountLabel: lang === 'zh' ? '优惠' : lang === 'es' ? 'Dscto.' : 'Off',
      installments: '12',
      to: '/reservar'
    },
    {
      id: 'diners',
      bgHex: '#497d9c',
      accentTextHex: '#497d9c',
      logoImg: './images/brands/diners-card.png',
      kicker: lang === 'zh' ? '最高' : lang === 'es' ? 'Hasta' : 'Up to',
      discountNum: '22',
      discountSymbol: '%',
      discountLabel: lang === 'zh' ? '优惠' : lang === 'es' ? 'Dscto.' : 'Off',
      installments: '6',
      to: '/reservar'
    },
    {
      id: 'scotiabank',
      bgHex: '#e30613',
      accentTextHex: '#e30613',
      logoImg: './images/brands/scotiabank-card.png',
      kicker: lang === 'zh' ? '最高' : lang === 'es' ? 'Hasta' : 'Up to',
      discountNum: '22',
      discountSymbol: '%',
      discountLabel: lang === 'zh' ? '优惠' : lang === 'es' ? 'Dscto.' : 'Off',
      subline:
        lang === 'zh'
          ? '持丰业银行卡（Scotiabank）支付享专属优惠'
          : lang === 'es'
          ? 'Pagando con tus tarjetas Scotiabank'
          : 'Paying with your Scotiabank cards',
      to: '/reservar'
    }
  ];

  const visibleCards = bankCards.slice(carouselOffset, carouselOffset + 3);

  return (
    <>
      {/* 1. Pure Black Bank Zero-Interest Installments Strip (Official Logos) */}
      <section className="bg-black text-white py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-5 text-center lg:text-left">
          <p className="text-sm sm:text-base font-medium tracking-wide uppercase shrink-0">
            {lang === 'zh' ? (
              <>
                使用指定银行卡支付享{' '}
                <strong className="font-extrabold text-white">
                  最高 6 至 12 期免息分期付款：
                </strong>
              </>
            ) : lang === 'es' ? (
              <>
                Paga tu estadía en{' '}
                <strong className="font-extrabold text-white">
                  HASTA 6 O 12 CUOTAS SIN INTERESES CON
                </strong>
              </>
            ) : (
              <>
                Pay your stay in{' '}
                <strong className="font-extrabold text-white">
                  UP TO 6 OR 12 ZERO-INTEREST INSTALLMENTS WITH
                </strong>
              </>
            )}
          </p>
          <BankPartnerMarks />
        </div>
      </section>

      {/* 2. Flagship Cyber Solana Campaign Banner (Exact to Image 3 Reference) */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <CyberCampaignBanner />
        </div>
      </section>

      {/* 3. "Aprovecha las ofertas de Casa Solana Perú" */}
      <section id="ofertas-solana" className="py-12 sm:py-16 bg-[#FAF9F7] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#141923]">
              {lang === 'zh'
                ? '探索 Casa Solana 秘鲁特惠与各大银行专属折扣'
                : lang === 'es'
                ? 'Aprovecha las ofertas de Casa Solana Perú'
                : 'Exclusive bank & seasonal offers at Casa Solana'}
            </h2>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setCarouselOffset((p) => Math.max(0, p - 1))}
                disabled={carouselOffset === 0}
                aria-label="Ofertas anteriores"
                className="w-9 h-9 rounded-full border border-slate-200 bg-white text-[#C88A36] hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCarouselOffset((p) =>
                    Math.min(bankCards.length - 3, p + 1)
                  )
                }
                disabled={carouselOffset >= bankCards.length - 3}
                aria-label="Siguientes ofertas"
                className="w-9 h-9 rounded-full border border-slate-200 bg-white text-[#C88A36] hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center shadow-2xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCards.map((card) => (
              <Link
                key={card.id}
                to={card.to}
                style={{ backgroundColor: card.bgHex }}
                className="group rounded-2xl p-7 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[260px]"
              >
                {/* Brand Logo Header */}
                <div className="h-12 flex items-center justify-center">
                  {card.logoImg ? (
                    <img
                      src={card.logoImg}
                      alt={card.id.toUpperCase()}
                      className="max-h-9 w-auto object-contain"
                    />
                  ) : (
                    <div className="px-4 py-1.5 bg-white/20 border border-white/30 rounded -skew-x-6">
                      <span className="inline-block skew-x-6 font-extrabold italic text-xs tracking-wider uppercase">
                        {card.customBadge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Massive Discount Display */}
                <div className="py-4 text-center">
                  <span className="block text-xs font-medium text-white/95 text-left pl-4">
                    {card.kicker}
                  </span>
                  <div className="inline-flex items-start justify-center gap-1 leading-none">
                    <span className="num-tabular text-5xl sm:text-6xl font-black tracking-tight">
                      {card.discountNum}
                    </span>
                    <div className="text-left pt-1">
                      <span className="block text-2xl font-extrabold leading-none">
                        {card.discountSymbol}
                      </span>
                      <span className="block text-[11px] font-bold mt-0.5">
                        {card.discountLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Installments Block or Subline */}
                <div className="pt-2">
                  {card.installments ? (
                    <div className="space-y-1">
                      <span className="block text-xs font-medium text-white/95">
                        {lang === 'zh' ? '支持最高' : lang === 'es' ? 'Y paga hasta' : 'And pay up to'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="num-tabular text-4xl font-extrabold leading-none">
                          {card.installments}
                        </span>
                        <div className="leading-none">
                          <span className="block text-xs font-extrabold uppercase tracking-wide">
                            {lang === 'zh' ? '期分期' : lang === 'es' ? 'CUOTAS' : 'INSTALLMENTS'}
                          </span>
                          <span
                            style={{ color: card.accentTextHex }}
                            className="inline-block mt-1 px-1.5 py-0.5 rounded bg-white text-[10px] font-black uppercase tracking-tight"
                          >
                            {lang === 'zh' ? '0 利息' : lang === 'es' ? 'SIN INTERESES' : '0% INTEREST'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-white/95 text-center leading-snug">
                      {card.subline}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
