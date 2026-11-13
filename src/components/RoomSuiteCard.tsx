import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Eye, Lock } from 'lucide-react';
import type { BilingualText, HotelRoom } from '../types/hotel';
import { useSolana } from '../context/SolanaContext';

interface RoomSuiteCardProps {
  suite: HotelRoom;
  onQuickPreview: (suite: HotelRoom) => void;
}

export const RoomSuiteCard: React.FC<RoomSuiteCardProps> = ({ suite, onQuickPreview }) => {
  const { lang, t, formatRate, staySlugs, toggleStaySlug } = useSolana();
  const isSaved = staySlugs.includes(suite.slug);
  const directUsd = Math.round(suite.nightlyUsd * 0.88);
  const ribbonBg =
    suite.locationId === 'miraflores'
      ? 'bg-[#0A1D37]'
      : suite.locationId === 'valle'
      ? 'bg-[#D95326]'
      : 'bg-[#0E7478]';

  const tr = (item: BilingualText | undefined, fallback = ''): string => {
    if (!item) return fallback;
    if (lang === 'zh' && item.zh) return item.zh;
    if (lang === 'en' && item.en) return item.en;
    return item.es || item.en || fallback;
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Link to={`/habitaciones/${suite.slug}`} className="block w-full h-full">
          <img
            src={suite.heroImage}
            alt={tr(suite.title)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div
          className={`absolute top-3 right-0 ribbon-corner ${ribbonBg} text-white pl-4 pr-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow`}
        >
          {tr(suite.locationName)}
        </div>

        {suite.promoBadge && (
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#D91E5B] text-white text-[10px] font-extrabold uppercase tracking-wide shadow">
            {tr(suite.promoBadge)}
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-[#C88A36]">
            <span>{tr(suite.viewType)}</span>
            <span className="num-tabular text-[#0A1D37]">{suite.sqm} m²</span>
          </div>

          <Link to={`/habitaciones/${suite.slug}`} className="block">
            <h3 className="font-editorial text-xl font-bold text-[#0A1D37] leading-snug group-hover:text-[#C88A36] transition-colors">
              {tr(suite.shortTitle)}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {tr(suite.tagline)}
          </p>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 pt-1">
            <Coffee className="w-3.5 h-3.5 text-[#0A1D37]" />
            <span>
              {lang === 'zh'
                ? '包含自助早餐 · 到店灵活付款'
                : lang === 'es'
                ? 'Desayuno buffet incluido · Paga en hotel'
                : 'Breakfast included · Pay at hotel'}
            </span>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <div className="rounded-xl border border-[#F4B41A] bg-[#FFFDF6] overflow-hidden">
            <div className="bg-[#F4B41A] px-3 py-1 flex items-center gap-1 text-[10px] font-extrabold text-[#0A1D37]">
              <Lock className="w-3 h-3" />
              <span>
                {lang === 'zh'
                  ? '俱乐部会员特惠 (-12%)'
                  : lang === 'es'
                  ? 'Tarifa Socio Club (-12%)'
                  : 'Club Rate (-12%)'}
              </span>
            </div>
            <div className="px-3 py-2 flex items-baseline justify-between gap-2">
              <span className="num-tabular text-xs line-through text-[#D91E5B]/80">
                {formatRate(suite.nightlyUsd)}
              </span>
              <span className="num-tabular text-xl font-black text-[#0A1D37]">
                {formatRate(directUsd)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/habitaciones/${suite.slug}`}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#0A1D37] hover:bg-[#C88A36] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{t.collection.viewSuite}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => onQuickPreview(suite)}
              aria-label={t.collection.quickPreview}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-[#0A1D37] hover:border-[#0A1D37] cursor-pointer"
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
                  : 'border-slate-200 text-slate-600 hover:border-[#0A1D37] hover:text-[#0A1D37]'
              }`}
            >
              <span className="text-xs font-bold leading-none">{isSaved ? '✓' : '+'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
