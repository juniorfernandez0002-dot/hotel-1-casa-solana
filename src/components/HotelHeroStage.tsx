import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import { HOTEL_MEDIA } from '../data/hotelMedia';
import { useSolana } from '../context/SolanaContext';
import type { HotelLocationId } from '../types/hotel';

function parseDateParts(iso: string, lang: 'es' | 'en' | 'zh') {
  const parts = iso.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return {
      day: '14',
      monthYear: lang === 'zh' ? '7月 26' : lang === 'es' ? 'JUL 26' : 'JUL 26',
      weekday: lang === 'zh' ? '周二' : lang === 'es' ? 'Martes' : 'Tuesday'
    };
  }
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  if (lang === 'zh') {
    const zhWeekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return {
      day: String(d.getDate()).padStart(2, '0'),
      monthYear: `${d.getMonth() + 1}月 ${String(d.getFullYear()).slice(-2)}`,
      weekday: zhWeekdays[d.getDay()]
    };
  }
  const months =
    lang === 'es'
      ? ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC']
      : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const weekdays =
    lang === 'es'
      ? ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
      : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return {
    day: String(d.getDate()).padStart(2, '0'),
    monthYear: `${months[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`,
    weekday: weekdays[d.getDay()]
  };
}

export const HotelHeroStage: React.FC = () => {
  const {
    lang,
    t,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guestsCount,
    setGuestsCount,
    nightsCount
  } = useSolana();
  const navigate = useNavigate();

  const [propertyChoice, setPropertyChoice] = useState<HotelLocationId>('all');
  const [promoCode, setPromoCode] = useState('SOLANA12');
  const [slideIdx, setSlideIdx] = useState(0);

  const slides =
    lang === 'zh'
      ? [
          {
            badge: '新季精选',
            kicker: 'CASA SOLANA · 利马米拉弗洛雷斯',
            headlineLead: '尊贵',
            headlineMain: '避世圣所',
            subHeadline: '俯瞰利马太平洋悬崖海岸与神圣谷秘境。',
            ctaLabel: '立即预订',
            promoTag: '官网专享最高5折优惠 + 自助早餐',
            leftImg: HOTEL_MEDIA.lobbyLounge,
            rightImg: HOTEL_MEDIA.suiteMaster,
            link: '/habitaciones?location=miraflores'
          },
          {
            badge: '安第斯温泉',
            kicker: 'CASA SOLANA · 库斯科圣谷',
            headlineLead: '独栋别墅',
            headlineMain: '安第斯水疗',
            subHeadline: '独立壁炉与私人矿物温泉的温润滋养。',
            ctaLabel: '探索别墅',
            promoTag: '俱乐部会员专享额外88折 · 优惠码 SOLANA12',
            leftImg: HOTEL_MEDIA.sacredValley,
            rightImg: HOTEL_MEDIA.villaTerrace,
            link: '/habitaciones?location=valle'
          },
          {
            badge: '全年暖阳',
            kicker: 'CASA SOLANA · 帕拉卡斯海湾度假村',
            headlineLead: '漫步海滨',
            headlineMain: '无尽蔚蓝',
            subHeadline: '私人码头与海滨吊床的宁静度假体验。',
            ctaLabel: '预订海滨',
            promoTag: '支持最高12期免息分期付款',
            leftImg: HOTEL_MEDIA.paracasBay,
            rightImg: HOTEL_MEDIA.bayResort,
            link: '/habitaciones?location=paracas'
          }
        ]
      : lang === 'es'
      ? [
          {
            badge: 'NUEVA TEMPORADA',
            kicker: 'CASA SOLANA SIGNATURE · MIRAFLORES',
            headlineLead: 'NUEVO',
            headlineMain: 'SANTUARIO',
            subHeadline: 'FRENTE AL PACÍFICO EN LIMA Y CUSCO.',
            ctaLabel: 'RESERVA AQUÍ',
            promoTag: 'Hasta -35% Tarifa Web Directa + Desayuno Buffet',
            leftImg: HOTEL_MEDIA.lobbyLounge,
            rightImg: HOTEL_MEDIA.suiteMaster,
            link: '/habitaciones?location=miraflores'
          },
          {
            badge: 'CIRCUITO TERMAL',
            kicker: 'CASA SOLANA SANCTUARY · VALLE SAGRADO',
            headlineLead: 'VILLAS',
            headlineMain: 'TERMAS',
            subHeadline: 'CHIMENEA PRIVADA Y AGUAS DE MANANTIAL.',
            ctaLabel: 'VER VILLAS',
            promoTag: '-12% Extra Socios Club Solana · Código SOLANA12',
            leftImg: HOTEL_MEDIA.sacredValley,
            rightImg: HOTEL_MEDIA.villaTerrace,
            link: '/habitaciones?location=valle'
          },
          {
            badge: 'SOL TODO EL AÑO',
            kicker: 'CASA SOLANA RESORT · BAHÍA PARACAS',
            headlineLead: 'FRENTE',
            headlineMain: 'AL MAR',
            subHeadline: 'MUELLE PRIVADO Y HAMACAS SOBRE LA BAHÍA.',
            ctaLabel: 'RESERVAR PLAYA',
            promoTag: 'Hasta 12 Cuotas Sin Intereses con BCP, BBVA e Interbank',
            leftImg: HOTEL_MEDIA.paracasBay,
            rightImg: HOTEL_MEDIA.bayResort,
            link: '/habitaciones?location=paracas'
          }
        ]
      : [
          {
            badge: 'NEW SEASON',
            kicker: 'CASA SOLANA SIGNATURE · MIRAFLORES',
            headlineLead: 'BOUTIQUE',
            headlineMain: 'SANCTUARY',
            subHeadline: 'COASTAL MIRAFLORES TO SACRED VALLEY.',
            ctaLabel: 'BOOK DIRECT',
            promoTag: 'Up to -35% Direct Web Rate + Artisan Breakfast',
            leftImg: HOTEL_MEDIA.lobbyLounge,
            rightImg: HOTEL_MEDIA.suiteMaster,
            link: '/habitaciones?location=miraflores'
          },
          {
            badge: 'THERMAL WATERS',
            kicker: 'CASA SOLANA SANCTUARY · SACRED VALLEY',
            headlineLead: 'ANDES',
            headlineMain: 'VILLAS',
            subHeadline: 'HEARTHSTONE FIREPLACE & HOT SPRINGS.',
            ctaLabel: 'VIEW VILLAS',
            promoTag: '-12% Extra Club Rate · Code SOLANA12',
            leftImg: HOTEL_MEDIA.sacredValley,
            rightImg: HOTEL_MEDIA.villaTerrace,
            link: '/habitaciones?location=valle'
          },
          {
            badge: 'COASTAL ESCAPE',
            kicker: 'CASA SOLANA RESORT · PARACAS BAY',
            headlineLead: 'PACIFIC',
            headlineMain: 'RESORT',
            subHeadline: 'PRIVATE JETTY & SUNLIT BUNGALOWS.',
            ctaLabel: 'RESERVE STAY',
            promoTag: 'Flexible Check-in & Free 48h Cancellation',
            leftImg: HOTEL_MEDIA.paracasBay,
            rightImg: HOTEL_MEDIA.bayResort,
            link: '/habitaciones?location=paracas'
          }
        ];

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const active = slides[slideIdx];
  const ci = parseDateParts(checkInDate, lang);
  const co = parseDateParts(checkOutDate, lang);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (propertyChoice !== 'all') params.set('location', propertyChoice);
    if (promoCode.trim()) params.set('promo', promoCode.trim().toUpperCase());
    navigate(`/habitaciones${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section className="relative bg-[#FAF9F7] pb-6 sm:pb-8">
      {/* Dual-Photo Flagship Campaign Hero Banner (Echoing Casa Andina's High-Impact Split Composition) */}
      <div className="relative h-[430px] sm:h-[490px] lg:h-[520px] w-full overflow-hidden bg-[#0A1D37]">
        {/* Split Photography Layer */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          <div className="relative overflow-hidden h-full">
            <img
              src={active.leftImg}
              alt={active.kicker}
              className="w-full h-full object-cover transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1D37]/80 via-[#0A1D37]/50 to-[#0A1D37]/30" />
          </div>
          <div className="hidden md:block relative overflow-hidden h-full">
            <img
              src={active.rightImg}
              alt={active.subHeadline}
              className="w-full h-full object-cover transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0A1D37]/75 via-[#0A1D37]/40 to-[#0A1D37]/20" />
          </div>
        </div>

        {/* Diagonal Divider Highlight on Desktop */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-4 w-8 bg-white/15 -skew-x-12 backdrop-blur-[1px] pointer-events-none"
        />

        {/* Foreground Flagship Campaign Copy */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-14 lg:px-16 h-full flex flex-col justify-center pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
            {/* Left Bold Slab Display Title + Property Badge */}
            <div className="md:col-span-6 space-y-3">
              <span className="inline-block px-3 py-1 rounded bg-[#D91E5B] text-white text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-sm">
                {active.badge}
              </span>
              <h1 className="font-editorial text-white uppercase leading-[0.88] tracking-tight drop-shadow-md">
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold">
                  {active.headlineLead}{' '}
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-[4.3rem] font-bold text-[#F6D37A]">
                  {active.headlineMain}
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#F6D37A] drop-shadow-sm">
                {active.kicker}
              </p>
            </div>

            {/* Right Promise Headline + Navy RESERVA AQUÍ Button */}
            <div className="md:col-span-6 md:text-right flex flex-col md:items-end space-y-4">
              <p className="text-lg sm:text-2xl lg:text-[1.7rem] font-extrabold text-white uppercase tracking-tight leading-snug max-w-md drop-shadow">
                {active.subHeadline}
              </p>
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/25 text-[11px] font-semibold text-white">
                {active.promoTag}
              </span>
              <div>
                <button
                  type="button"
                  onClick={() => navigate(active.link)}
                  className="px-7 py-3 rounded-lg bg-[#0A1D37] hover:bg-[#C88A36] text-white font-extrabold text-xs sm:text-sm uppercase tracking-[0.14em] border border-white/25 shadow-xl transition-colors cursor-pointer"
                >
                  {active.ctaLabel}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Prev / Next Arrows (Desktop >= lg so Tablet copy never crowds icons) */}
        <button
          type="button"
          onClick={() => setSlideIdx((p) => (p - 1 + slides.length) % slides.length)}
          aria-label={lang === 'zh' ? '上一张海报' : lang === 'es' ? 'Banner anterior' : 'Previous banner'}
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 text-white items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setSlideIdx((p) => (p + 1) % slides.length)}
          aria-label={lang === 'zh' ? '下一张海报' : lang === 'es' ? 'Banner siguiente' : 'Next banner'}
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 text-white items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-14 inset-x-0 z-20 flex items-center justify-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.kicker}
              type="button"
              onClick={() => setSlideIdx(idx)}
              aria-label={s.kicker}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === slideIdx ? 'w-7 bg-[#C88A36]' : 'w-2.5 bg-white/75 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Elevated White Rounded Booking Bar (Overlapping Hero Bottom) */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-11">
        <form
          id="hotel-booking-bar"
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-[0_14px_40px_rgba(10,29,55,0.16)] border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-stretch divide-y sm:divide-y-0 lg:divide-x divide-slate-200"
        >
          {/* 1. Hotel / Destination */}
          <div className="lg:col-span-3 px-4 py-3.5 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#C88A36] shrink-0" />
            <div className="min-w-0 flex-1">
              <label htmlFor="hotel-location" className="sr-only">
                {t.booking.locationLabel}
              </label>
              <select
                id="hotel-location"
                value={propertyChoice}
                onChange={(e) => setPropertyChoice(e.target.value as HotelLocationId)}
                className="w-full text-xs sm:text-sm font-bold text-[#0A1D37] bg-transparent focus:outline-none cursor-pointer truncate"
              >
                <option value="all">
                  {lang === 'zh'
                    ? '选择您的理想酒店（全部）'
                    : lang === 'es'
                    ? 'Encuentra tu hotel ideal (Todas)'
                    : 'Find your hotel (All Properties)'}
                </option>
                <option value="miraflores">{t.collection.mirafloresTab}</option>
                <option value="valle">{t.collection.valleTab}</option>
                <option value="paracas">{t.collection.paracasTab}</option>
              </select>
              <span className="text-[10px] text-slate-500 block truncate">
                {lang === 'zh'
                  ? '米拉弗洛雷斯 · 圣谷 · 帕拉卡斯'
                  : lang === 'en'
                  ? 'Miraflores · Sacred Valley · Paracas'
                  : 'Miraflores · Valle Sagrado · Paracas'}
              </span>
            </div>
          </div>

          {/* 2. Check-In Formatted Big Numerals + Native Date Overlay */}
          <label
            htmlFor="hotel-checkin"
            className="lg:col-span-2 px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors relative"
          >
            <Calendar className="w-5 h-5 text-[#C88A36] shrink-0" />
            <div className="flex items-center gap-2">
              <span className="num-tabular text-2xl sm:text-3xl font-extrabold text-[#0A1D37] leading-none">
                {ci.day}
              </span>
              <div className="leading-tight text-[11px]">
                <span className="font-extrabold text-[#0A1D37] block">{ci.monthYear}</span>
                <span className="text-slate-500 block">{ci.weekday}</span>
              </div>
            </div>
            <input
              id="hotel-checkin"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
          </label>

          {/* 3. Check-Out Formatted Big Numerals + Night Badge */}
          <label
            htmlFor="hotel-checkout"
            className="lg:col-span-2 px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors relative"
          >
            <Calendar className="w-5 h-5 text-[#C88A36] shrink-0" />
            <div className="flex items-center gap-2">
              <span className="num-tabular text-2xl sm:text-3xl font-extrabold text-[#0A1D37] leading-none">
                {co.day}
              </span>
              <div className="leading-tight text-[11px]">
                <span className="font-extrabold text-[#0A1D37] block">{co.monthYear}</span>
                <span className="text-[#C88A36] font-bold block num-tabular">
                  {co.weekday} · {nightsCount}N
                </span>
              </div>
            </div>
            <input
              id="hotel-checkout"
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
          </label>

          {/* 4. Guests + Promo Code Input */}
          <div className="lg:col-span-3 px-3 py-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#C88A36] shrink-0" />
            <div className="grid grid-cols-[1.25fr_0.85fr] gap-1.5 flex-1 min-w-0">
              <select
                id="hotel-guests"
                aria-label={t.booking.guestsLabel}
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="text-xs font-bold text-[#0A1D37] bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? t.booking.guestSingular : t.booking.guestPlural}
                  </option>
                ))}
              </select>
              <input
                id="hotel-promo"
                type="text"
                aria-label={lang === 'zh' ? '优惠码' : lang === 'es' ? 'Código promocional' : 'Promo code'}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={lang === 'zh' ? '优惠码' : lang === 'es' ? 'Código' : 'Code'}
                className="text-xs font-bold uppercase tracking-wider text-[#0A1D37] bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#C88A36]"
              />
            </div>
          </div>

          {/* 5. Buscar CTA Button in Signature Ochre */}
          <div className="lg:col-span-2 p-2.5 flex items-center">
            <button
              type="submit"
              className="w-full h-full min-h-[46px] rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white font-extrabold text-sm tracking-wide shadow-sm transition-colors cursor-pointer"
            >
              {lang === 'zh' ? '搜索' : lang === 'es' ? 'Buscar' : 'Search'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
