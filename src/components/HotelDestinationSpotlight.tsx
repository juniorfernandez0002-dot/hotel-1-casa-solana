import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Sparkles, Check, X } from 'lucide-react';
import { useSolana } from '../context/SolanaContext';
import type { BilingualText } from '../types/hotel';

interface DestinationSpotlightData {
  id: string;
  badge: BilingualText;
  title: BilingualText;
  subtitle: BilingualText;
  heroImage: string;
  pricePennies: number; // nightly PEN
  priceUsd: number;
  taxesNote: BilingualText;
  linkTo: string;
}

const SPOTLIGHTS: DestinationSpotlightData[] = [
  {
    id: 'paracas',
    badge: {
      es: 'CASA SOLANA RESORT · BAHÍA DE PARACAS',
      en: 'CASA SOLANA RESORT · PARACAS BAY',
      zh: 'CASA SOLANA 度假村 · 帕拉卡斯海湾'
    },
    title: {
      es: 'BAHÍA DE PARACAS & RESERVA NATURAL',
      en: 'PARACAS BAY & NATURAL MARINE SANCTUARY',
      zh: '帕拉卡斯海湾与国家级海洋自然保护区'
    },
    subtitle: {
      es: 'Cambia la rutina por mar, calma, atardeceres dorados y momentos que realmente se disfrutan.',
      en: 'Trade routine for ocean breeze, golden sunsets, and moments that truly restore the spirit.',
      zh: '告别日常喧嚣，置身蔚蓝海洋、宁静海风与金色日落之中，重焕身心活力。'
    },
    heroImage: './images/hotel/bay-sunset-resort.jpg',
    pricePennies: 289,
    priceUsd: 78,
    taxesNote: {
      es: '+ S/ 81 de IGV y servicios',
      en: '+ $22 taxes and service fees',
      zh: '+ 22美元 税费及服务费'
    },
    linkTo: '/habitaciones/paracas-oceanfront-villa'
  },
  {
    id: 'valle',
    badge: {
      es: 'CASA SOLANA SANCTUARY · VALLE SAGRADO',
      en: 'CASA SOLANA SANCTUARY · SACRED VALLEY',
      zh: 'CASA SOLANA 圣所 · 安第斯神圣谷'
    },
    title: {
      es: 'VALLE SAGRADO DE LOS INCAS, CUSCO',
      en: 'SACRED VALLEY OF THE INCAS, CUSCO',
      zh: '库斯科印加神圣谷·秘鲁圣境'
    },
    subtitle: {
      es: 'Respira la paz de los Andes entre andenes sagrados, huertos orgánicos y vistas al río Vilcanota.',
      en: 'Breathe the peace of the Andes amidst terraces, organic orchards, and river views.',
      zh: '在古老印加梯田、有机果园与乌鲁班巴河壮丽风光中，呼吸安第斯山脉的宁静。'
    },
    heroImage: './images/hotel/sacred-valley-andes.jpg',
    pricePennies: 349,
    priceUsd: 94,
    taxesNote: {
      es: '+ S/ 97 de IGV y servicios',
      en: '+ $26 taxes and service fees',
      zh: '+ 26美元 税费及服务费'
    },
    linkTo: '/habitaciones/sanctuary-master-suite'
  },
  {
    id: 'miraflores',
    badge: {
      es: 'CASA SOLANA SIGNATURE · MIRAFLORES LIMA',
      en: 'CASA SOLANA SIGNATURE · MIRAFLORES LIMA',
      zh: 'CASA SOLANA 经典 · 利马米拉弗洛雷斯'
    },
    title: {
      es: 'MIRAFLORES & MALECÓN DE LA COSTA VERDE',
      en: 'MIRAFLORES & PACIFIC CLIFFTOP PROMENADE',
      zh: '米拉弗洛雷斯与太平洋悬崖海滨长廊'
    },
    subtitle: {
      es: 'La mejor ubicación de Lima: alta gastronomía, jardines coloniales y el encanto del océano Pacífico.',
      en: 'Lima’s premier enclave: contemporary fine dining, colonial courtyards, and Pacific vistas.',
      zh: '利马黄金地段：当代顶级名厨珍馐、殖民风格古典庭院与无垠太平洋海景。'
    },
    heroImage: './images/hotel/breakfast-gourmet-table.jpg',
    pricePennies: 319,
    priceUsd: 86,
    taxesNote: {
      es: '+ S/ 89 de IGV y servicios',
      en: '+ $24 taxes and service fees',
      zh: '+ 24美元 税费及服务费'
    },
    linkTo: '/habitaciones/miraflores-signature-suite'
  }
];

export const HotelDestinationSpotlight: React.FC = () => {
  const { lang, currency, formatRate } = useSolana();
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regName, setRegName] = useState('');

  const tr = (item: BilingualText | undefined, fallback = ''): string => {
    if (!item) return fallback;
    if (lang === 'zh' && item.zh) return item.zh;
    if (lang === 'en' && item.en) return item.en;
    return item.es || item.en || fallback;
  };

  const current = SPOTLIGHTS[activeIdx];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regEmail && regName) {
      setRegistered(true);
    }
  };

  return (
    <>
      {/* 1. Cinematic Full-Width Destination Banner */}
      <section className="relative w-full overflow-hidden bg-[#0A1D37] text-white">
        <div className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center">
          <img
            src={current.heroImage}
            alt={tr(current.title)}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform scale-100 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Destination Selector Tabs in Upper Right */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1.5 rounded-xl border border-white/20">
            {SPOTLIGHTS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-[#C88A36] text-white shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {s.id === 'paracas'
                  ? (lang === 'zh' ? '帕拉卡斯' : 'Paracas')
                  : s.id === 'valle'
                  ? (lang === 'zh' ? '神圣谷' : 'Valle Sagrado')
                  : (lang === 'zh' ? '米拉弗洛雷斯' : 'Miraflores')}
              </button>
            ))}
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Editorial Copy */}
            <div className="space-y-4 max-w-xl text-left">
              <p className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-[#C88A36] uppercase drop-shadow-sm">
                {tr(current.badge)}
              </p>

              <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">
                {tr(current.title)}
              </h2>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light max-w-lg drop-shadow-xs">
                {tr(current.subtitle)}
              </p>

              <div className="pt-2">
                <Link
                  to={current.linkTo}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all transform hover:translate-x-1"
                >
                  <span>{lang === 'zh' ? '查看酒店与套房' : lang === 'es' ? 'Ver Hotel & Suites' : 'View Property'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Floating Glassmorphism Price Card */}
            <div className="lg:w-80 bg-white/10 backdrop-blur-md border border-white/35 rounded-2xl p-6 text-white shadow-2xl space-y-3 shrink-0 self-start lg:self-center">
              <span className="text-xs font-medium text-white/90 block">
                {lang === 'zh'
                  ? '您的下一场非凡之旅正等待启程'
                  : lang === 'es'
                  ? 'Tu próxima aventura te espera'
                  : 'Your next escape awaits'}
              </span>

              <div className="pt-1">
                <span className="text-[11px] font-semibold text-white/75 block">
                  {lang === 'zh' ? '每晚起' : lang === 'es' ? 'Noche desde' : 'Rates from'}
                </span>
                <div className="flex items-baseline gap-1.5 leading-none mt-1">
                  <span className="num-tabular font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-white">
                    {currency === 'PEN'
                      ? `S/ ${current.pricePennies}`
                      : formatRate(current.priceUsd)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-white/80 mt-1">
                  <span>{tr(current.taxesNote)}</span>
                  <Info className="w-3 h-3 text-white/60 shrink-0" />
                </div>
              </div>

              {/* Gold Member Highlight Pill */}
              <div className="pt-2 border-t border-white/20">
                <div className="inline-block px-3 py-1.5 rounded-lg bg-[#F4B41A] text-[#0A1D37] text-xs font-black uppercase tracking-wider shadow-xs">
                  {lang === 'zh'
                    ? '+ 俱乐部会员专享额外88折'
                    : lang === 'es'
                    ? '+ 12% adicional para socios Club'
                    : '+ Extra 12% off for Club Members'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Full-Bleed Loyalty Club Bar */}
        <div className="bg-black text-white border-t border-white/15 py-5 sm:py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="font-editorial text-lg sm:text-xl font-bold tracking-widest text-white uppercase">
                  CASA SOLANA
                </span>
                <span className="font-serif italic text-xl text-[#C88A36] lowercase">
                  club
                </span>
              </div>

              <p className="text-xs sm:text-sm text-white/80 font-normal">
                {lang === 'zh'
                  ? '还不是会员？立即免费加入索拉纳俱乐部，立享免费房晚兑换、房型升级及额外88折礼遇。'
                  : lang === 'es'
                  ? '¿Aún no eres socio? Conviértete en socio Club y canjea noches gratis, upgrades y 12% adicional.'
                  : 'Not a member yet? Join Club Solana to enjoy free nights, suite upgrades, and an instant 12% off.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-5 py-2 rounded-lg border border-white/80 hover:border-[#C88A36] hover:bg-[#C88A36] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer shadow-xs"
            >
              {lang === 'zh' ? '免费注册会员' : lang === 'es' ? 'Regístrate gratis' : 'Join for free'}
            </button>
          </div>
        </div>
      </section>

      {/* 3. Club Solana Free Membership Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1050] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar modal"
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-[#0A1D37] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F7] border border-slate-200 text-[#C88A36] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'zh' ? '索拉纳俱乐部专属直订会员' : 'Club Solana Membresía Directa'}</span>
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#0A1D37]">
                {registered
                  ? (lang === 'zh' ? '欢迎加入索拉纳俱乐部！' : '¡Bienvenido a Club Solana!')
                  : (lang === 'zh' ? '即刻解锁尊享会员礼遇' : 'Accede a tus beneficios exclusivos')}
              </h3>
              <p className="text-xs text-slate-600">
                {registered
                  ? (lang === 'zh'
                      ? '已向您的邮箱发送验证链接。使用优惠码 SOLANA12 预订，立享专属优惠。'
                      : 'Hemos enviado tu credencial a tu correo. Aplica el cupón SOLANA12 en tu próxima reserva.')
                  : (lang === 'zh'
                      ? '注册即可立即在所有分店享受额外88折、免费双人早餐与灵活退改政策。'
                      : 'Regístrate en 30 segundos y accede a 12% extra, desayuno artesanal incluido y política flexible.')}
              </p>
            </div>

            {registered ? (
              <div className="p-4 rounded-2xl bg-[#EAF7EE] border border-[#BCE5C8] text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#00843D] text-white flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-[#00843D]">
                  {lang === 'zh' ? '会员资格已生效：SOLANA12' : 'Código de socio activo: SOLANA12'}
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#0A1D37] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C88A36] transition-colors"
                >
                  {lang === 'zh' ? '返回浏览' : 'Continuar navegando'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0A1D37] mb-1.5">
                    {lang === 'zh' ? '姓名' : 'Nombre completo'}
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder={lang === 'zh' ? '例如：张三' : 'Ej. Carlos Mendoza'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-[#0A1D37] focus:outline-none focus:border-[#C88A36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0A1D37] mb-1.5">
                    {lang === 'zh' ? '电子邮箱' : 'Correo electrónico'}
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="carlos@empresa.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-[#0A1D37] focus:outline-none focus:border-[#C88A36]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                >
                  {lang === 'zh' ? '免费获取会员礼遇' : 'Quiero mis beneficios'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
