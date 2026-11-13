import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { BankPartnerMarks } from '../components/PaymentBadges';
import { CyberCampaignBanner } from '../components/CyberCampaignBanner';
import { BankBadgesRow } from '../components/OfficialBankBadges';
import type { BankId } from '../components/OfficialBankBadges';
import { HOTEL_MEDIA } from '../data/hotelMedia';
import { useSolana } from '../context/SolanaContext';
import { trOffer } from '../data/ofertasI18n';

interface OfferCard {
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

const BANK_OFFERS: OfferCard[] = [
  {
    id: 'cyber',
    bgHex: '#eb3a7d',
    accentTextHex: '#eb3a7d',
    customBadge: 'CYBER CASA SOLANA',
    kicker: 'Hasta',
    discountNum: '50',
    discountSymbol: '%',
    discountLabel: 'Dscto.',
    subline: 'en el Cyber Casa Solana',
    to: '/habitaciones'
  },
  {
    id: 'interbank',
    bgHex: '#06be4f',
    accentTextHex: '#06be4f',
    logoImg: './images/brands/interbank-card.webp',
    kicker: 'Hasta',
    discountNum: '25',
    discountSymbol: '%',
    discountLabel: 'Dscto.',
    installments: '12',
    to: '/reservar'
  },
  {
    id: 'bcp',
    bgHex: '#002a8e',
    accentTextHex: '#002a8e',
    logoImg: './images/brands/bcp-card.png',
    kicker: 'Hasta',
    discountNum: '25',
    discountSymbol: '%',
    discountLabel: 'Dscto.',
    installments: '12',
    to: '/reservar'
  },
  {
    id: 'bbva',
    bgHex: '#0e457e',
    accentTextHex: '#0e457e',
    logoImg: './images/brands/bbva-card.webp',
    kicker: 'Hasta',
    discountNum: '25',
    discountSymbol: '%',
    discountLabel: 'Dscto.',
    installments: '12',
    to: '/reservar'
  },
  {
    id: 'diners',
    bgHex: '#497d9c',
    accentTextHex: '#497d9c',
    logoImg: './images/brands/diners-card.png',
    kicker: 'Hasta',
    discountNum: '22',
    discountSymbol: '%',
    discountLabel: 'Dscto.',
    installments: '6',
    to: '/reservar'
  },
  {
    id: 'scotiabank',
    bgHex: '#e30613',
    accentTextHex: '#e30613',
    logoImg: './images/brands/scotiabank-card.png',
    kicker: 'Hasta',
    discountNum: '22',
    discountSymbol: '%',
    discountLabel: 'Dscto.',
    subline: 'Pagando con tus tarjetas Scotiabank',
    to: '/reservar'
  }
];

interface PackageOffer {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  destinations: string;
  image: string;
  priceFrom: string;
  inclusions: string[];
  banks: BankId[];
  installments: string;
  to: string;
}

const PACKAGES: PackageOffer[] = [
  {
    id: 'estadia-comida',
    title: 'Paquete Estadía y Comida Incluidas',
    subtitle: 'Hospedaje de lujo con pensión completa: desayuno buffet artesanal más almuerzo o cena gourmet a la carta.',
    discount: '-30% DSCTO',
    destinations: 'Miraflores · Valle Sagrado · Paracas',
    image: HOTEL_MEDIA.foodLomoSaltado,
    priceFrom: 'S/ 389 por noche',
    inclusions: [
      'Desayuno buffet con panes de masa madre y café de altura',
      'Almuerzo o cena a la carta en Q’iswar o Killa Brasas',
      'Cóctel de bienvenida de cortesía (Pisco Sour Catedral)',
      'Late check-out extendido hasta las 14:00 h sujeto a disponibilidad'
    ],
    banks: ['interbank', 'bcp', 'bbva', 'diners'],
    installments: 'Hasta 12 cuotas sin intereses',
    to: '/reservar'
  },
  {
    id: 'spa-termal',
    title: 'Relájate en Casa Solana (Circuito Termal)',
    subtitle: 'Escapada holística de descanso: hospedaje, acceso libre al circuito de hidroterapia y masaje andino.',
    discount: '-25% DSCTO',
    destinations: 'Valle Sagrado · Paracas',
    image: HOTEL_MEDIA.spaThermal,
    priceFrom: 'S/ 420 por noche',
    inclusions: [
      'Acceso diario de 60 min al circuito termal (sauna y vapor)',
      'Masaje andino de relajación de 50 min por persona',
      'Infusiones orgánicas de muña, eucalipto y cedrón ilimitadas',
      'Desayuno buffet servido en la terraza o habitación'
    ],
    banks: ['bbva', 'diners', 'interbank'],
    installments: 'Hasta 12 cuotas sin intereses',
    to: '/reservar'
  },
  {
    id: 'escapada-romantica',
    title: 'Enamórate en Casa Solana',
    subtitle: 'Noche romántica frente al mar o al pie de las montañas con cena privada a la luz de las velas.',
    discount: '-35% DSCTO',
    destinations: 'Todas las Sedes',
    image: HOTEL_MEDIA.villaTerrace,
    priceFrom: 'S/ 460 por noche',
    inclusions: [
      'Botella de espumante reserva y fresas con chocolate al ingresar',
      'Cena romántica de 3 tiempos con maridaje de vino reserva',
      'Desayuno artesanal en la cama o terraza privada',
      'Late check-out garantizado hasta las 16:00 h'
    ],
    banks: ['bcp', 'interbank', 'scotiabank'],
    installments: 'Hasta 12 cuotas sin intereses',
    to: '/reservar'
  },
  {
    id: 'tour-valle-sagrado',
    title: 'Tour Vivencial & Salineras de Maras',
    subtitle: 'Alojamiento en el Valle Sagrado más recorrido privado por las terrazas circulares de Moray y minas de sal.',
    discount: '-20% DSCTO',
    destinations: 'Valle Sagrado · Cusco',
    image: HOTEL_MEDIA.sacredValley,
    priceFrom: 'S/ 510 por noche',
    inclusions: [
      'Hospedaje en Sanctuary Valle Sagrado con vista a los Andes',
      'Transporte privado y guía oficial de turismo bilingüe',
      'Degustación de productos andinos y sal rosada de Maras',
      'Pisco Sour de bienvenida junto a la chimenea'
    ],
    banks: ['interbank', 'bcp', 'bbva'],
    installments: 'Hasta 6 cuotas sin intereses',
    to: '/reservar'
  },
  {
    id: 'tour-islas-ballestas',
    title: 'Navegación Islas Ballestas & Reserva Paracas',
    subtitle: 'Hospedaje frente al mar en Resort Paracas con excursión marítima hacia las Islas Ballestas y cata de piscos.',
    discount: '-20% DSCTO',
    destinations: 'Bahía de Paracas · Ica',
    image: HOTEL_MEDIA.bayResort,
    priceFrom: 'S/ 395 por noche',
    inclusions: [
      'Alojamiento con vista panorámica a la bahía de Paracas',
      'Tickets de navegación en deslizador moderno a Islas Ballestas',
      'Visita guiada al Candelabro y avistamiento de fauna marina',
      'Cata guiada de piscos y chilcanos en Brisa Marina Bar'
    ],
    banks: ['diners', 'bcp', 'bbva'],
    installments: 'Hasta 6 cuotas sin intereses',
    to: '/reservar'
  },
  {
    id: 'planeamiento-b2b',
    title: 'Planeamiento Estratégico & Retiro Corporativo',
    subtitle: 'Salones acústicos con tecnología 4K, coffee break continuo de especialidad y tarifas B2B preferenciales.',
    discount: 'TARIFA B2B',
    destinations: 'Miraflores · Valle Sagrado',
    image: HOTEL_MEDIA.corpBoardroomGlass,
    priceFrom: 'Tarifa especial corporativa',
    inclusions: [
      'Alquiler de sala ejecutiva con proyector láser y sonido',
      'Estación continua de café de Chanchamayo y jugos prensados',
      'Almuerzo buffet ejecutivo o menú criollo de 3 pasos',
      'Tarifas preferenciales de alojamiento para delegaciones'
    ],
    banks: ['bcp', 'bbva', 'interbank'],
    installments: 'Crédito corporativo 30 días o cuotas',
    to: '/corporativo'
  }
];

interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  tag: string;
  banks: BankId[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'cata-pisco',
    title: 'Cata de Piscos de la Quebrada & Tapas Criollas',
    subtitle: 'Masterclass con nuestro sommelier probando piscos puros y acholados con maridaje de causas y anticuchos.',
    badge: '-25% DCTO.',
    image: HOTEL_MEDIA.foodCeviche,
    tag: 'Miraflores & Paracas',
    banks: ['interbank', 'bcp']
  },
  {
    id: 'termas-piedras',
    title: 'Ritual de Piedras Calientes & Baño de Flores Andinas',
    subtitle: 'Sesión de relajación profunda con piedras volcánicas del Vilcanota y aceites esenciales de hierbas andinas.',
    badge: '-30% DCTO.',
    image: HOTEL_MEDIA.bathMarble,
    tag: 'Valle Sagrado & Miraflores',
    banks: ['bbva', 'diners']
  },
  {
    id: 'tour-bicicletas',
    title: 'Ruta en Bicicleta por los Andenes del Urubamba',
    subtitle: 'Paseo guiado por senderos rurales entre campos de maíz blanco gigante, huertos y antiguos molinos coloniales.',
    badge: '-20% DCTO.',
    image: HOTEL_MEDIA.cuscoPortal,
    tag: 'Valle Sagrado, Cusco',
    banks: ['bcp', 'scotiabank']
  }
];

export const OfertasPage: React.FC = () => {
  const { lang } = useSolana();
  const tx = (s?: string) => trOffer(s, lang);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q:
        lang === 'zh'
          ? '如何申请免息分期付款？'
          : lang === 'en'
          ? 'How do I apply interest-free installments when booking?'
          : '¿Cómo aplico las cuotas sin intereses al reservar?',
      a:
        lang === 'zh'
          ? '在我们的官方网站或前台办理预订时，选择支持的 BBVA、Interbank、BCP 或 Diners Club 信用卡作为支付方式。系统将允许您选择 6 期或 12 期免息分期付款，免除任何额外金融利息。'
          : lang === 'en'
          ? 'When booking on our official website or at reception, choose your eligible BBVA, Interbank, BCP or Diners Club credit card as payment method. The system will let you choose between 6 or 12 installments with no financial interest.'
          : 'Al momento de realizar tu reserva en nuestra web oficial o en recepción, selecciona como método de pago tu tarjeta de crédito BBVA, Interbank, BCP o Diners Club habilitada. El sistema te permitirá elegir entre 6 o 12 cuotas sin ningún tipo de interés financiero.'
    },
    {
      q:
        lang === 'zh'
          ? '银行卡优惠是否可与索拉纳俱乐部会员特惠叠加？'
          : lang === 'en'
          ? 'Can bank discounts be combined with the Club Solana benefit?'
          : '¿Los descuentos bancarios son acumulables con el beneficio Club Solana?',
      a:
        lang === 'zh'
          ? '是的。所有注册的索拉纳俱乐部会员在线预订时输入会员优惠码 SOLANA12 或致电预订时提及该代码，即可在银行卡优惠基础上叠加享受额外会员折扣。'
          : lang === 'en'
          ? 'Yes. All registered Casa Solana Club members get an additional 10% off the promotional rate by entering their membership code SOLANA12 during online booking or mentioning it by phone.'
          : 'Sí. Todos los socios registrados en Casa Solana Club acumulan un 10% de descuento adicional sobre la tarifa promocional ingresando su código de membresía SOLANA12 durante el proceso de reserva en línea o mencionándolo por teléfono.'
    },
    {
      q:
        lang === 'zh'
          ? '取消与灵活改签政策是什么？'
          : lang === 'en'
          ? 'What are the cancellation and flexible rescheduling policies?'
          : '¿Cuáles son las políticas de cancelación y reprogramación flexible?',
      a:
        lang === 'zh'
          ? '我们的特惠房价与套餐在入住日期前48小时内均可免费取消且无罚金。您可以在接下来的12个月内无手续费改签您的住宿（视所选分店的房态而定）。'
          : lang === 'en'
          ? 'Our promotional rate and packages include flexible cancellation without penalty up to 48 hours before check-in. You may reschedule your stay at no cost within the next 12 months, subject to availability at the selected location.'
          : 'Nuestra tarifa promocional y paquetes incluyen cancelación flexible sin penalidad hasta 48 horas antes de la fecha de check-in. Puedes reprogramar tu estadía sin costo dentro de los siguientes 12 meses, sujeto a disponibilidad de la sede seleccionada.'
    },
    {
      q:
        lang === 'zh'
          ? '套餐与特惠房价包含哪些权益？'
          : lang === 'en'
          ? 'What does the package and promotion rate include?'
          : '¿Qué incluye la tarifa de paquetes y promociones?',
      a:
        lang === 'zh'
          ? '所有特惠套餐均包含每日新鲜手工制作的自助早餐、套房与公共区域极速高速Wi-Fi、泳池与健身中心免费通行，以及24小时一对一个人专属礼宾服务。'
          : lang === 'en'
          ? 'All our promotions include a daily artisan buffet breakfast, high-speed Wi-Fi in suites and common areas, access to pools and gym, and personalized 24-hour concierge service.'
          : 'Todas nuestras promociones incluyen desayuno buffet artesanal servido a diario, conexión Wi-Fi de alta velocidad en suites y áreas comunes, acceso a piscinas y gimnasio, y atención personalizada de concierge las 24 horas.'
    }
  ];

  return (
    <div className="bg-[#FAF9F7] text-[#141923] overflow-x-hidden">
      {/* 1. Pure Black Zero-Interest Installments Strip (Exact to Casa Andina Image 2) */}
      <section className="bg-black text-white py-6 sm:py-7 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-5 text-center lg:text-left">
          <p className="text-xs sm:text-sm font-medium tracking-wide uppercase shrink-0">
            {lang === 'zh' ? (
              <>
                使用指定银行卡支付享{' '}
                <strong className="font-extrabold text-white">
                  最高 6 至 12 期免息分期付款：
                </strong>
              </>
            ) : (
              <>
                {lang === 'en' ? 'PAY FOR YOUR STAY IN' : 'PAGA TU ESTADÍA EN'}{' '}
                <strong className="font-extrabold text-white">
                  {lang === 'en' ? 'UP TO 6 OR 12 INTEREST-FREE INSTALLMENTS WITH' : 'HASTA 6 O 12 CUOTAS SIN INTERESES CON'}
                </strong>
              </>
            )}
          </p>
          <BankPartnerMarks />
        </div>
      </section>

      {/* 2. Flagship Cyber Solana Campaign Banner (Exact to Image 3 Reference) */}
      <section className="py-8 sm:py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <CyberCampaignBanner />
        </div>
      </section>

      {/* 3. Official Bank Cards Grid ("Aprovecha las ofertas de Casa Solana Perú") */}
      <section className="py-14 sm:py-20 bg-[#FAF9F7] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="eyebrow-solana text-[#C88A36]">
              {lang === 'zh' ? '银行卡专属促销' : lang === 'en' ? 'BANK PROMOTIONS' : 'PROMOCIONES BANCARIAS'}
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#141923]">
              {lang === 'zh'
                ? '探索 Casa Solana 秘鲁特惠与各大银行专属折扣'
                : lang === 'en' ? 'Enjoy the Casa Solana Peru offers' : 'Aprovecha las ofertas de Casa Solana Perú'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              {lang === 'zh'
                ? '直接住宿折扣以及与秘鲁主流金融机构合作提供的免息分期付款服务。'
                : lang === 'en' ? 'Direct lodging discounts and interest-free installments with the country’s leading financial institutions.' : 'Descuentos directos en alojamiento y cuotas sin intereses con las principales entidades financieras del país.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BANK_OFFERS.map((card) => (
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
                        {tx(card.customBadge)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Massive Discount Display */}
                <div className="py-4 text-center">
                  <span className="block text-xs font-medium text-white/95 text-left pl-4">
                    {tx(card.kicker)}
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
                        {tx(card.discountLabel)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Installments Block or Subline */}
                <div className="pt-2">
                  {card.installments ? (
                    <div className="space-y-1">
                      <span className="block text-xs font-medium text-white/95">
                        {tx('Y paga hasta')}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="num-tabular text-4xl font-extrabold leading-none">
                          {card.installments}
                        </span>
                        <div className="leading-none">
                          <span className="block text-xs font-extrabold uppercase tracking-wide">
                            {tx('CUOTAS')}
                          </span>
                          <span
                            style={{ color: card.accentTextHex }}
                            className="inline-block mt-1 px-1.5 py-0.5 rounded bg-white text-[10px] font-black uppercase tracking-tight"
                          >
                            {tx('SIN INTERESES')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-white/95 text-center leading-snug">
                      {tx(card.subline)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Paquetes de Estadía con Ilustraciones Reales y Logos Bancarios */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="eyebrow-solana text-[#C88A36]">EXPERIENCIAS COMPLETAS</span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#141923]">
              Paquetes con Estadía y Beneficios
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Planes integrales diseñados con gastronomía de autor, bienestar termal y tours en los destinos más emblemáticos del Perú.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Visual Photographic Cover */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={pkg.image}
                    alt={tx(pkg.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Top Discount Ribbon */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded bg-[#E6007E] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {tx(pkg.discount)}
                    </span>
                  </div>
                  {/* Destination Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                      {tx(pkg.destinations)}
                    </span>
                  </div>
                </div>

                {/* Card Details & Inclusions */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-editorial text-xl font-bold text-[#0A1D37] group-hover:text-[#C88A36] transition-colors leading-snug">
                      {tx(pkg.title)}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {tx(pkg.subtitle)}
                    </p>

                    {/* Bullet List of Inclusions */}
                    <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                      {pkg.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] leading-snug">
                          <Check className="w-3.5 h-3.5 text-[#00843D] shrink-0 mt-0.5" />
                          <span>{tx(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing + Official Bank Badges Row */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {tx('Tarifa desde')}
                      </span>
                      <span className="font-editorial text-lg font-extrabold text-[#0A1D37]">{tx(pkg.priceFrom)}</span>
                    </div>

                    {/* Official Bank Badges */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                        {tx(pkg.installments)}:
                      </span>
                      <BankBadgesRow banks={pkg.banks} />
                    </div>

                    {/* Action Button */}
                    <Link
                      to={pkg.to}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0A1D37] group-hover:bg-[#C88A36] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                    >
                      <span>{tx('Ver disponibilidad y reservar')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tours y Experiencias Vivenciales con Beneficios Bancarios */}
      <section className="py-14 sm:py-20 bg-[#FAF9F7] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="eyebrow-solana text-[#C88A36]">
                {lang === 'zh' ? '深度体验与探索' : lang === 'en' ? 'SIGNATURE ACTIVITIES & ROUTES' : 'ACTIVIDADES & RUTAS DE AUTOR'}
              </span>
              <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#141923] mt-1">
                {lang === 'zh' ? '银行卡专属礼遇旅游与定制体验' : lang === 'en' ? 'Tours & Experiences with Bank Benefits' : 'Tours y Experiencias con Beneficio Bancario'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md font-light">
              {lang === 'zh'
                ? '将奢华住宿与向导式探险、名厨美馔及温泉疗愈相结合，刷卡享受专属折扣与免息分期。'
                : lang === 'en' ? 'Combine your stay with guided expeditions, gastronomy and spa rituals with exclusive discounts when paying with Peruvian cards.' : 'Combina tu estadía con expediciones guiadas, gastronomía y rituales de spa con descuentos exclusivos al pagar con tarjetas peruanas.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={tx(exp.title)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#E6007E] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {tx(exp.badge)}
                  </span>
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                    {tx(exp.tag)}
                  </span>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0A1D37] leading-snug">
                      {tx(exp.title)}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 font-light leading-relaxed">
                      {tx(exp.subtitle)}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {lang === 'zh' ? '合作金融机构：' : lang === 'en' ? 'Partner banks:' : 'Bancos aliados:'}
                    </span>
                    <BankBadgesRow banks={exp.banks} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Términos y Condiciones Acordeón Detallado */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="eyebrow-solana text-[#C88A36]">
              {lang === 'zh' ? '明晰与信赖' : lang === 'en' ? 'CLARITY & TRUST' : 'CLARIDAD Y CONFIANZA'}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141923]">
              {lang === 'zh' ? '促销细则、免息政策与取消条款' : lang === 'en' ? 'Terms, Conditions & Cancellation Policies' : 'Términos, Condiciones y Políticas de Cancelación'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'zh'
                ? '查看享受免息分期和官网直订礼遇的详细细则与说明。'
                : lang === 'en' ? 'Review the conditions to enjoy interest-free installments and direct-booking benefits.' : 'Consulta las condiciones para disfrutar de las cuotas sin intereses y beneficios de reserva directa.'}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-[#FAF9F7] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0A1D37] hover:text-[#C88A36] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C88A36] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct Help Desk Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-5 h-5 text-[#C88A36] shrink-0" />
              <span>
                {lang === 'zh'
                  ? '对任何银行促销或分期政策有疑问？'
                  : lang === 'en' ? 'Questions about a promotion or bank card?' : '¿Tienes dudas sobre alguna promoción o tarjeta bancaria?'}
              </span>
            </div>
            <a
              href="tel:+5113916565"
              className="text-[#C88A36] font-bold hover:underline shrink-0"
            >
              {lang === 'zh' ? '总台服务专线：+51 (01) 391-6565' : lang === 'en' ? 'Call our switchboard: +51 (01) 391-6565' : 'Llámanos a Central: +51 (01) 391-6565'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
