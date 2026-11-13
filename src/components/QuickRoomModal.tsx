import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, BedDouble, Check, Maximize2, Star, Users, X } from 'lucide-react';
import type { HotelRoom } from '../types/hotel';
import { useSolana } from '../context/SolanaContext';
import { WhatsAppLogo } from './SocialIcons';

interface QuickRoomModalProps {
  suite: HotelRoom | null;
  onClose: () => void;
}

export const QuickRoomModal: React.FC<QuickRoomModalProps> = ({ suite, onClose }) => {
  const { lang, t, formatRate, staySlugs, toggleStaySlug, buildWhatsAppUrl } = useSolana();

  useEffect(() => {
    if (!suite) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [suite, onClose]);

  const L = (zh: string, es: string, en: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);
  const tx = (item: { es: string; en: string; zh?: string }) =>
    lang === 'zh' ? item.zh || item.en || item.es : lang === 'es' ? item.es : item.en;
  const txList = (item: { es: string[]; en: string[]; zh?: string[] }) =>
    (lang === 'zh' ? item.zh || item.en : lang === 'es' ? item.es : item.en) || item.es;

  const isSaved = suite ? staySlugs.includes(suite.slug) : false;

  return (
    <AnimatePresence>
      {suite && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#0A1D37]/65 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
          >
            <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
              <img src={suite.heroImage} alt={tx(suite.title)} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={onClose}
                aria-label={L('关闭', 'Cerrar', 'Close')}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-[#0A1D37] flex items-center justify-center shadow-md cursor-pointer hover:bg-[#0A1D37] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0A1D37] text-[#F6D37A] text-[10px] font-extrabold uppercase tracking-wider">
                  {tx(suite.locationName)}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#D91E5B] text-white text-[10px] font-extrabold uppercase num-tabular">
                  {suite.sqm} m²
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-[#C88A36]">
                  <span>{tx(suite.viewType)}</span>
                  <span className="inline-flex items-center gap-1 text-[#0A1D37] num-tabular">
                    <Star className="w-4 h-4 text-[#C88A36]" />
                    {suite.rating} ({suite.reviewsCount})
                  </span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37] mt-1 leading-tight">
                  {tx(suite.title)}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{tx(suite.tagline)}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF9F7] border border-slate-200">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C88A36] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" />
                    {L('面积', 'Superficie', 'Space')}
                  </span>
                  <span className="block font-editorial text-xl font-bold text-[#0A1D37] mt-1 num-tabular">
                    {suite.sqm} m²
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF9F7] border border-slate-200">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C88A36] font-bold">
                    <Users className="w-3.5 h-3.5" />
                    {t.booking.guestsLabel}
                  </span>
                  <span className="block font-editorial text-xl font-bold text-[#0A1D37] mt-1 num-tabular">
                    {suite.maxGuests} {L('人（上限）', 'max.', 'max.')}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FFFDF5] border border-[#F4B41A]">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#0A1D37] font-extrabold">
                    <BedDouble className="w-3.5 h-3.5 text-[#C88A36]" />
                    {L('会员价 -12%', 'Club -12%', 'Direct -12%')}
                  </span>
                  <span className="block font-editorial text-xl font-bold text-[#0A1D37] mt-1 num-tabular">
                    {formatRate(Math.round(suite.nightlyUsd * 0.88))}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#C88A36] mb-2">
                  {L('入住专属礼遇', 'Cortesías incluidas en tu estadía', 'Included stay privileges')}
                </h3>
                <ul className="space-y-2">
                  {txList(suite.perks).map((perk: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#141923]">
                      <Check className="w-4 h-4 text-[#009A3E] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-200">
                <Link
                  to={`/habitaciones/${suite.slug}`}
                  onClick={onClose}
                  className="flex-1 min-w-[160px] py-3.5 px-5 rounded-xl bg-[#0A1D37] hover:bg-[#C88A36] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{t.collection.viewSuite}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => toggleStaySlug(suite.slug)}
                  className={`py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-[#C88A36] border-[#C88A36] text-white'
                      : 'bg-white border-slate-200 text-[#0A1D37] hover:border-[#0A1D37]'
                  }`}
                >
                  {isSaved ? <Check className="w-4 h-4" /> : <BedDouble className="w-4 h-4" />}
                  <span>{isSaved ? t.collection.inStay : t.collection.addToStay}</span>
                </button>

                <a
                  href={buildWhatsAppUrl(
                    L(
                      `您好，Casa Solana预订中心，我想咨询“${tx(suite.title)}” (${suite.code})。`,
                      `Hola Central Casa Solana, consulta por ${suite.title.es} (${suite.code}).`,
                      `Hello Casa Solana Desk, asking about ${suite.title.en} (${suite.code}).`
                    )
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EB958] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
                >
                  <WhatsAppLogo className="w-5 h-5" variant="badge" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
