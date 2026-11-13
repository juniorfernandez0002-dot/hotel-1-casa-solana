import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BedDouble, Check, Eye, Lock } from 'lucide-react';
import { HOTEL_SUITES } from '../data/roomsData';
import { useSolana } from '../context/SolanaContext';
import { QuickRoomModal } from './QuickRoomModal';
import { BankBadgesRow } from './OfficialBankBadges';
import type { BilingualText, HotelLocationId, HotelRoom } from '../types/hotel';

export const RoomShowcaseSection: React.FC = () => {
  const { lang, t, formatRate, staySlugs, toggleStaySlug } = useSolana();
  const [filterLoc, setFilterLoc] = useState<HotelLocationId>('all');
  const [previewSuite, setPreviewSuite] = useState<HotelRoom | null>(null);

  const tr = (item: BilingualText | undefined, fallback = ''): string => {
    if (!item) return fallback;
    if (lang === 'zh' && item.zh) return item.zh;
    if (lang === 'en' && item.en) return item.en;
    return item.es || item.en || fallback;
  };

  const filtered = useMemo(() => {
    if (filterLoc === 'all') return HOTEL_SUITES;
    return HOTEL_SUITES.filter((s) => s.locationId === filterLoc);
  }, [filterLoc]);

  const getTierStyle = (locId: HotelLocationId) => {
    if (locId === 'miraflores') {
      return {
        ribbonBg: 'bg-[#0A1D37]',
        tierLabel: lang === 'zh' ? '精选系列\n米拉弗洛雷斯' : 'Signature\nMiraflores',
        discountPct: 30
      };
    }
    if (locId === 'valle') {
      return {
        ribbonBg: 'bg-[#D95326]',
        tierLabel:
          lang === 'zh'
            ? '静修系列\n神圣谷'
            : lang === 'es'
            ? 'Sanctuary\nValle Sagrado'
            : 'Sanctuary\nSacred Valley',
        discountPct: 25
      };
    }
    return {
      ribbonBg: 'bg-[#0E7478]',
      tierLabel: lang === 'zh' ? '度假村\n帕拉卡斯' : 'Resort\nParacas',
      discountPct: 28
    };
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Heading & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="eyebrow-solana text-[#C88A36] block">
              {t.collection.eyebrow}
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#141923] leading-tight">
              {lang === 'zh'
                ? '精选酒店与套房当前最优惠官网直订价'
                : lang === 'es'
                ? 'Los mejores precios en hoteles y suites del momento'
                : 'Best direct hotel and suite rates of the moment'}
            </h2>
          </div>

          <div className="inline-flex flex-wrap sm:flex-nowrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start shrink-0">
            {(
              [
                { id: 'all', label: t.collection.allTab },
                { id: 'miraflores', label: lang === 'zh' ? '精选 · 利马' : 'Signature · Lima' },
                { id: 'valle', label: lang === 'zh' ? '静修 · 库斯科' : 'Sanctuary · Cusco' },
                { id: 'paracas', label: lang === 'zh' ? '度假村 · 帕拉卡斯' : 'Resort · Paracas' }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterLoc(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  filterLoc === tab.id
                    ? 'bg-[#0A1D37] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#0A1D37]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Flagship 3-Column Hotel Conversion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((suite) => {
            const tier = getTierStyle(suite.locationId);
            const publicRackUsd = Math.round(suite.nightlyUsd / (1 - tier.discountPct / 100));
            const webDirectUsd = suite.nightlyUsd;
            const clubMemberUsd = Math.round(suite.nightlyUsd * 0.88);
            const taxesWebUsd = Math.round(webDirectUsd * 0.18);
            const taxesClubUsd = Math.round(clubMemberUsd * 0.18);
            const isSaved = staySlugs.includes(suite.slug);

            return (
              <article
                key={suite.slug}
                className="group bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Photo with Top-Right Slanted Collection Ribbon + Bottom-Left Promo Badge */}
                <div className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
                  <Link to={`/habitaciones/${suite.slug}`} className="block w-full h-full">
                    <img
                      src={suite.heroImage}
                      alt={tr(suite.title)}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Top-Right Slanted Collection Tag (echoing Standard / Select / Premium ribbons) */}
                  <div
                    className={`absolute top-3 right-0 ribbon-corner ${tier.ribbonBg} text-white pl-5 pr-3.5 py-1.5 shadow-md text-right leading-tight`}
                  >
                    <span className="text-[10px] font-medium block opacity-90">
                      {tier.tierLabel.split('\n')[0]}
                    </span>
                    <span className="text-xs font-extrabold block">
                      {tier.tierLabel.split('\n')[1]}
                    </span>
                  </div>

                  {/* Bottom-Left Campaign Pill */}
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#D91E5B] text-white text-[10px] font-extrabold uppercase tracking-wide shadow">
                    {suite.promoBadge ? tr(suite.promoBadge) : (lang === 'zh' ? '索拉纳当季精选' : lang === 'es' ? 'Temporada Solana' : 'Solana Season')}
                  </span>
                </div>

                {/* Card Body: Title + Micro-Guarantees + Dual Rate Architecture */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#C88A36]">
                        <span>{tr(suite.locationName)} · {suite.sqm} m²</span>
                        <span className="num-tabular text-[#0A1D37]">★ {suite.rating}</span>
                      </div>
                      <Link to={`/habitaciones/${suite.slug}`}>
                        <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#0A1D37] group-hover:text-[#C88A36] uppercase tracking-tight leading-snug mt-0.5 transition-colors">
                          {tr(suite.shortTitle)}
                        </h3>
                      </Link>
                    </div>

                    {/* 4 Scannable Direct-Booking Benefits (Official Hospitality Icons) */}
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <img src="./images/brands/benefit-desayuno.png" alt="" className="w-4 h-4 object-contain shrink-0" />
                        <span>{lang === 'zh' ? '手工现做自助早餐' : lang === 'es' ? 'Desayuno buffet artesanal' : 'Artisanal buffet breakfast'}</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <img src="./images/brands/benefit-cuotas.png" alt="" className="w-4 h-4 object-contain shrink-0" />
                          <span>{lang === 'zh' ? '最高12期免息分期' : lang === 'es' ? 'Hasta 12 cuotas sin intereses' : 'Up to 12 zero-interest installments'}</span>
                        </div>
                        <BankBadgesRow banks={['interbank', 'bcp', 'bbva']} className="shrink-0" />
                      </li>
                      <li className="flex items-center gap-2">
                        <img src="./images/brands/benefit-paga-hotel.png" alt="" className="w-4 h-4 object-contain shrink-0" />
                        <span>{lang === 'zh' ? '到店灵活付款' : lang === 'es' ? 'Paga al llegar en el hotel' : 'Pay flexibly upon arrival'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img src="./images/brands/benefit-cancelacion.png" alt="" className="w-4 h-4 object-contain shrink-0" />
                        <span>{lang === 'zh' ? '入住前48小时免费取消' : lang === 'es' ? 'Cancelación flexible 48h' : 'Free 48h cancellation'}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Dual Price Tier Boxes */}
                  <div className="space-y-2.5 pt-2">
                    {/* Box 1: Web Promotional Rate with -XX% Pill */}
                    <div className="relative rounded-xl border border-slate-200 bg-slate-50/70 p-3 flex items-center justify-between gap-2">
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded bg-[#D91E5B] text-white text-[10px] font-extrabold num-tabular shadow-2xs">
                        -{tier.discountPct}%
                      </span>
                      <div className="text-xs font-semibold text-slate-600 leading-tight">
                        {lang === 'zh' ? '官网当季特惠' : lang === 'es' ? 'Tarifa Temporada Solana' : 'Web Season Rate'}
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-500">
                          {lang === 'zh' ? '每晚起' : lang === 'es' ? 'Noche desde' : 'Night from'}
                        </span>
                        <div className="flex items-baseline justify-end gap-1.5">
                          <span className="num-tabular text-xs line-through text-[#D91E5B]/80 font-semibold">
                            {formatRate(publicRackUsd)}
                          </span>
                          <span className="num-tabular text-lg font-extrabold text-[#141923]">
                            {formatRate(webDirectUsd)}
                          </span>
                        </div>
                        <span className="num-tabular text-[10px] text-slate-500 block">
                          + {formatRate(taxesWebUsd)} IGV {lang === 'zh' ? '税费' : lang === 'es' ? 'y servicios' : 'taxes'}
                        </span>
                      </div>
                    </div>

                    {/* Box 2: Club Solana Extra Discount Gold-Capped Tier */}
                    <div className="rounded-xl border-2 border-[#F4B41A] overflow-hidden bg-[#FFFDF6]">
                      <div className="bg-[#F4B41A] px-3 py-1 flex items-center gap-1.5 text-[10px] font-extrabold text-[#0A1D37]">
                        <Lock className="w-3 h-3 shrink-0" />
                        <span>
                          {lang === 'zh'
                            ? '+12% 俱乐部会员专享额外折扣'
                            : lang === 'es'
                            ? '+12% Dscto. adicional Socios CLUB SOLANA'
                            : '+12% Extra off CLUB SOLANA Members'}
                        </span>
                      </div>
                      <div className="p-3 flex items-center justify-between gap-2">
                        <div className="leading-tight">
                          <span className="block text-xs font-extrabold text-[#0A1D37]">
                            {lang === 'zh' ? '俱乐部会员价' : lang === 'es' ? 'Tarifa Socio Club' : 'Club Member Rate'}
                          </span>
                          <span className="block text-[10px] text-slate-500">
                            {lang === 'zh' ? '优惠码 SOLANA12' : lang === 'es' ? 'Código SOLANA12' : 'Code SOLANA12'}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="num-tabular text-2xl font-black text-[#0A1D37] leading-none block">
                            {formatRate(clubMemberUsd)}
                          </span>
                          <span className="num-tabular text-[10px] text-slate-500 block mt-0.5">
                            + {formatRate(taxesClubUsd)} IGV {lang === 'zh' ? '税费' : lang === 'es' ? 'y servicios' : 'taxes'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        to={`/habitaciones/${suite.slug}`}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#0A1D37] hover:bg-[#C88A36] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>{lang === 'zh' ? '查看套房' : lang === 'es' ? 'Ver Suite' : 'Book Suite'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPreviewSuite(suite)}
                        aria-label={t.collection.quickPreview}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:border-[#0A1D37] hover:text-[#0A1D37] transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStaySlug(suite.slug)}
                        aria-label={isSaved ? t.collection.inStay : t.collection.addToStay}
                        className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-[#C88A36] border-[#C88A36] text-white'
                            : 'border-slate-200 text-slate-600 hover:border-[#C88A36] hover:text-[#C88A36]'
                        }`}
                      >
                        {isSaved ? <Check className="w-4 h-4" /> : <BedDouble className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/habitaciones"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border-2 border-[#0A1D37] text-[#0A1D37] hover:bg-[#0A1D37] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>{t.collection.viewAllBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <QuickRoomModal suite={previewSuite} onClose={() => setPreviewSuite(null)} />
    </section>
  );
};
