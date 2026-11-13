import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BedDouble,
  Calendar,
  Check,
  Lock,
  Maximize2,
  Minus,
  Plus,
  Sparkles,
  Star,
  Users
} from 'lucide-react';
import { HOTEL_SUITES } from '../data/roomsData';
import { useSolana } from '../context/SolanaContext';
import { WhatsAppLogo } from '../components/SocialIcons';
import { PaymentMethodCards } from '../components/PaymentBadges';

export const RoomDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    lang,
    t,
    formatRate,
    staySlugs,
    toggleStaySlug,
    guestsCount,
    setGuestsCount,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    nightsCount,
    buildWhatsAppUrl
  } = useSolana();

  const suite = useMemo(
    () => HOTEL_SUITES.find((s) => s.slug === slug) ?? HOTEL_SUITES[0],
    [slug]
  );

  const [photoIdx, setPhotoIdx] = useState(0);
  const [pillowChoice, setPillowChoice] = useState('Pluma Suave / Feather Soft');
  const [addTransfer, setAddTransfer] = useState(true);

  const isSaved = staySlugs.includes(suite.slug);
  const directNightlyUsd = Math.round(suite.nightlyUsd * 0.88);
  const stayRoomTotalUsd = directNightlyUsd * nightsCount;
  const transferUsd = addTransfer ? 45 : 0;
  const grandTotalUsd = stayRoomTotalUsd + transferUsd;
  const l: 'es' | 'en' = lang === 'es' ? 'es' : 'en';
  const L = (zh: string, es: string, en: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);
  const tList = (item: { es: string[]; en: string[]; zh?: string[] }) =>
    (lang === 'zh' ? item.zh || item.en : item[l]) || item.es;
  const tText = (item: { es: string; en: string; zh?: string } | undefined) =>
    item ? (lang === 'zh' && item.zh ? item.zh : item[l] || item.es) : '';

  const pillowZh: Record<string, string> = {
    'Pluma Suave / Feather Soft': '天然白鹅绒软枕',
    'Viscoelástica Cervical / Memory Foam': '人体工学记忆慢回弹枕',
    'Lavanda Hipolergénica / Hypoallergenic': '薰衣草香氛防过敏枕'
  };

  const waMessage =
    lang === 'zh'
      ? `您好，Casa Solana预订中心，我想预订“${tText(suite.title)}” (${suite.code})，入住日期：${checkInDate}至${checkOutDate} (共${nightsCount}晚)，入住人数：${guestsCount}人，享受俱乐部会员专属特惠(-12%)。枕头偏好：${pillowZh[pillowChoice] || pillowChoice}。${
          addTransfer ? ' 包含机场专车接送服务。' : ''
        }`
      : lang === 'es'
      ? `Hola Central Casa Solana, deseo reservar "${suite.title.es}" (${suite.code}) del ${checkInDate} al ${checkOutDate} (${nightsCount} noche/s) para ${guestsCount} huésped(es) con tarifa Socio Club (-12%). Preferencia almohadas: ${pillowChoice}.${
          addTransfer ? ' Incluir traslado privado aeropuerto.' : ''
        }`
      : `Hello Casa Solana Desk, requesting "${suite.title.en}" (${suite.code}) from ${checkInDate} to ${checkOutDate} (${nightsCount} night/s) for ${guestsCount} guest(s) with Direct Club rate (-12%). Pillow preference: ${pillowChoice}.${
          addTransfer ? ' Include private airport transfer.' : ''
        }`;

  return (
    <div className="min-h-screen bg-andean-pattern pb-24 lg:pb-16 pt-8 sm:pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link
          to="/habitaciones"
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#C88A36] hover:text-[#0A1D37] transition-colors mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{L('返回客房列表', 'Volver a habitaciones', 'Back to rooms')}</span>
        </Link>

        <div className="mb-6 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0A1D37] text-[#F6D37A] text-xs font-extrabold uppercase tracking-wider">
              {tText(suite.locationName)}
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#0A1D37] inline-flex items-center gap-1 num-tabular">
              <Star className="w-3.5 h-3.5 text-[#C88A36]" />
              {suite.rating} ({suite.reviewsCount})
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0A1D37] leading-tight max-w-4xl">
            {tText(suite.title)}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {tText(suite.tagline)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-10">
          <div className="lg:col-span-9 aspect-[16/9] sm:aspect-[21/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            <img
              src={suite.gallery[photoIdx] || suite.heroImage}
              alt={tText(suite.title)}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-3 grid grid-cols-4 lg:grid-cols-1 gap-2.5">
            {suite.gallery.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPhotoIdx(idx)}
                className={`rounded-xl overflow-hidden aspect-square lg:aspect-[16/6.5] border-2 transition-all cursor-pointer ${
                  photoIdx === idx ? 'border-[#C88A36] shadow-sm' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C88A36]">
                  <Maximize2 className="w-3.5 h-3.5" />
                  {L('客房面积', 'Superficie', 'Suite Area')}
                </span>
                <span className="block font-editorial text-2xl font-bold text-[#0A1D37] mt-1 num-tabular">
                  {suite.sqm} m²
                </span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C88A36]">
                  <BedDouble className="w-3.5 h-3.5" />
                  {L('床型配置', 'Descanso', 'Bedding')}
                </span>
                <span className="block font-bold text-xs text-[#0A1D37] mt-2">
                  {tText(suite.bedConfig)}
                </span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C88A36]">
                  <Users className="w-3.5 h-3.5" />
                  {t.booking.guestsLabel}
                </span>
                <span className="block font-editorial text-2xl font-bold text-[#0A1D37] mt-1 num-tabular">
                  {suite.maxGuests} {L('人（上限）', 'max.', 'max.')}
                </span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C88A36]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {L('景观朝向', 'Vista', 'Orientation')}
                </span>
                <span className="block font-bold text-xs text-[#0A1D37] mt-2">
                  {tText(suite.viewType)}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xs">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#0A1D37] mb-3.5">
                  {L('入住专属礼遇', 'Privilegios de Estadía', 'Included Privileges')}
                </h2>
                <ul className="space-y-2.5 text-sm text-[#141923]">
                  {tList(suite.perks).map((perk: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#009A3E] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#0A1D37] mb-3.5">
                  {L('客房设施与舒适配置', 'Equipamiento & Confort', 'Suite Craft & Amenities')}
                </h2>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {tList(suite.amenities).map((am: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C88A36] shrink-0 mt-0.5" />
                      <span>{am}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#F2EFE9] border border-slate-200 text-xs sm:text-sm font-semibold text-[#0A1D37]">
              {tText(suite.checkInNote)}
            </div>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-24 bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-5">
            <div className="rounded-xl border-2 border-[#F4B41A] bg-[#FFFDF6] overflow-hidden">
              <div className="bg-[#F4B41A] px-3 py-1 flex items-center gap-1.5 text-[10px] font-extrabold text-[#0A1D37]">
                <Lock className="w-3 h-3" />
                <span>
                  {lang === 'zh'
                    ? '索拉纳俱乐部会员专享价 (-12%)'
                    : lang === 'es'
                    ? 'Tarifa Socio Club Solana (-12%)'
                    : 'Direct Club Rate (-12%)'}
                </span>
              </div>
              <div className="p-3.5 flex items-baseline justify-between gap-2">
                <div>
                  <span className="num-tabular font-editorial text-3xl font-bold text-[#0A1D37]">
                    {formatRate(directNightlyUsd)}
                  </span>
                  <span className="num-tabular text-xs line-through text-[#D91E5B]/80 ml-2">
                    {formatRate(suite.nightlyUsd)}
                  </span>
                  <span className="block text-[10px] font-semibold text-slate-500">
                    {t.collection.perNight} · {lang === 'zh' ? '含双人早餐' : lang === 'es' ? 'Incluye desayuno' : 'Breakfast inc.'}
                  </span>
                </div>
                <span className="px-2 py-1 rounded bg-white border border-slate-200 text-[#0A1D37] text-[10px] font-extrabold">
                  {suite.code}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#C88A36] block">
                  {t.booking.checkIn}
                </label>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C88A36]" />
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#0A1D37] focus:outline-none num-tabular"
                  />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#C88A36] block">
                  {t.booking.checkOut}
                </label>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C88A36]" />
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#0A1D37] focus:outline-none num-tabular"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A1D37]">
                  {t.booking.guestsLabel}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                    aria-label={L('减少人数', 'Menos huéspedes', 'Fewer guests')}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-[#0A1D37] hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="num-tabular font-bold text-sm">{guestsCount}</span>
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.min(suite.maxGuests, guestsCount + 1))}
                    aria-label={L('增加人数', 'Más huéspedes', 'More guests')}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-[#0A1D37] hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="pillow-pref"
                  className="text-[10px] font-bold uppercase tracking-wider text-[#C88A36] block mb-1.5"
                >
                  {lang === 'zh' ? '定制枕头菜单礼遇' : lang === 'es' ? 'Carta de Almohadas' : 'Complimentary Pillow Loft'}
                </label>
                <select
                  id="pillow-pref"
                  value={pillowChoice}
                  onChange={(e) => setPillowChoice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0A1D37] cursor-pointer"
                >
                  <option value="Pluma Suave / Feather Soft">
                    {lang === 'zh' ? '天然白鹅绒软枕' : lang === 'es' ? 'Pluma de Ganso Suave' : 'Soft Goose Down'}
                  </option>
                  <option value="Viscoelástica Cervical / Memory Foam">
                    {lang === 'zh' ? '人体工学记忆慢回弹枕' : lang === 'es' ? 'Viscoelástica Ergonómica' : 'Ergonomic Memory Foam'}
                  </option>
                  <option value="Lavanda Hipolergénica / Hypoallergenic">
                    {lang === 'zh' ? '薰衣草香氛防过敏枕' : lang === 'es' ? 'Hipoalergénica & Aroma Lavanda' : 'Hypoallergenic Lavender'}
                  </option>
                </select>
              </div>

              <label className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0A1D37] cursor-pointer">
                <span>
                  {lang === 'zh'
                    ? '增加机场专属豪华专车接送 (+45美元)'
                    : lang === 'es'
                    ? 'Agregar chofer aeropuerto (+USD $45)'
                    : 'Add private airport pickup (+USD $45)'}
                </span>
                <input
                  type="checkbox"
                  checked={addTransfer}
                  onChange={(e) => setAddTransfer(e.target.checked)}
                  className="accent-[#0A1D37] w-4 h-4"
                />
              </label>
            </div>

            <div className="p-4 rounded-xl bg-[#F2EFE9] flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A1D37]">
                {lang === 'zh'
                  ? `预估总价 (共 ${nightsCount} 晚)`
                  : lang === 'es'
                  ? `Total (${nightsCount} noches)`
                  : `Total (${nightsCount} nights)`}
              </span>
              <span className="num-tabular font-editorial text-2xl font-bold text-[#0A1D37]">
                {formatRate(grandTotalUsd)}
              </span>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => toggleStaySlug(suite.slug)}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isSaved ? 'bg-[#C88A36] text-white' : 'bg-[#0A1D37] hover:bg-[#C88A36] text-white'
                }`}
              >
                {isSaved ? <Check className="w-4 h-4" /> : <BedDouble className="w-4 h-4" />}
                <span>{isSaved ? t.collection.inStay : t.collection.addToStay}</span>
              </button>

              <a
                href={buildWhatsAppUrl(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EB958] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors shadow-sm"
              >
                <WhatsAppLogo className="w-5 h-5" variant="badge" />
                <span>{t.footer.waBtn}</span>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <PaymentMethodCards />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A36] block">
            {nightsCount} {L('晚', 'noches', 'nights')} · {L('会员价 -12%', 'Club -12%', 'Club -12%')}
          </span>
          <span className="num-tabular font-editorial text-xl font-bold text-[#0A1D37]">
            {formatRate(grandTotalUsd)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleStaySlug(suite.slug)}
            aria-label={t.collection.addToStay}
            className={`p-3 rounded-xl border cursor-pointer ${
              isSaved ? 'bg-[#C88A36] text-white border-[#C88A36]' : 'bg-slate-50 text-[#0A1D37] border-slate-200'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <BedDouble className="w-4 h-4" />}
          </button>
          <a
            href={buildWhatsAppUrl(waMessage)}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs"
          >
            <WhatsAppLogo className="w-4 h-4" variant="badge" />
            <span>{t.nav.bookCta}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
