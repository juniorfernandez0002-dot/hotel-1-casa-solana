import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag,
  Clock,
  Coffee,
  Droplets,
  Star,
  ArrowUp,
  Zap,
  Headphones,
  Check,
  Shield,
  Gift,
  ChevronDown,
  ChevronRight,
  Ticket,
  Award,
  CreditCard,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { useSolana } from '../context/SolanaContext';
import { HOTEL_MEDIA } from '../data/hotelMedia';

const NAVY = '#0A1D37';
const GOLD = '#C88A36';
const BLACK = '#141618';

interface BenefitItem {
  icon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }>;
  titleEs: string;
  titleEn: string;
  titleZh: string;
  descEs: string;
  descEn: string;
  descZh: string;
}

const BENEFITS: BenefitItem[] = [
  {
    icon: Tag,
    titleEs: '-12% descuento garantizado en todas las sedes',
    titleEn: 'Guaranteed 12% off across all properties',
    titleZh: '所有酒店保证享 12% 折扣',
    descEs: 'Tarifa preferencial en Lima, Cusco y Paracas sobre la mejor tarifa pública disponible todo el año.',
    descEn: 'Preferential member rate in Lima, Cusco, and Paracas on top of our best public rate year-round.',
    descZh: '全年在利马、库斯科与帕拉卡斯最优惠公开房价基础上享会员专属优惠价。',
  },
  {
    icon: Clock,
    titleEs: 'Check-in express / Check-out tardío',
    titleEn: 'Express check-in / Late check-out',
    titleZh: '快速入住 / 延迟退房',
    descEs: 'Ingreso prioritario desde las 11:00 h y salida extendida hasta las 14:00 h sin cargo adicional.',
    descEn: 'Priority arrival from 11:00 AM and extended departure until 2:00 PM at no extra charge.',
    descZh: '上午 11:00 起优先办理入住，并可免费延迟至 14:00 退房。',
  },
  {
    icon: Coffee,
    titleEs: 'Desayuno buffet artesanal incluido',
    titleEn: 'Artisanal breakfast buffet included',
    titleZh: '含每日手工自助早餐',
    descEs: 'Despierta con panes de masa madre, fruta de estación, quesos andinos y café de altura peruano.',
    descEn: 'Wake up to sourdough breads, seasonal fruit, Andean cheeses, and Peruvian specialty coffee.',
    descZh: '每日清晨享用酸面包、时令鲜果、安第斯芝士与秘鲁高地精品咖啡。',
  },
  {
    icon: Droplets,
    titleEs: 'Acceso al circuito termal del spa (60 min/estadía)',
    titleEn: 'Thermal spa circuit access (60 min/stay)',
    titleZh: '水疗温泉水疗循环体验（每次入住 60 分钟）',
    descEs: 'Sesión de hidromasaje, sauna seco y cámara de vapor incluida por estadía en nuestras sedes con spa.',
    descEn: 'Hydrotherapy pool, dry sauna, and steam chamber session included per stay at spa properties.',
    descZh: '在我们设有水疗中心的酒店，每次入住均含水疗按摩池、干蒸桑拿与蒸汽房体验。',
  },
  {
    icon: Gift,
    titleEs: 'Noches gratis por acumulación de puntos',
    titleEn: 'Free nights with accumulated points',
    titleZh: '积分累计兑换免费住宿',
    descEs: 'Cada reserva directa suma puntos Solana que puedes canjear por noches completas en cualquier destino.',
    descEn: 'Every direct stay earns Solana points redeemable for complimentary nights at any destination.',
    descZh: '每次官网直订均可累计 Solana 积分，随时在任意目的地兑换免费入住晚数。',
  },
  {
    icon: ArrowUp,
    titleEs: 'Upgrades de habitación sujeto a disponibilidad',
    titleEn: 'Complimentary room upgrades upon availability',
    titleZh: '视房态免费升级房型',
    descEs: 'Prioridad automática al llegar para ascender a una categoría superior sin costo extra.',
    descEn: 'Automatic priority at check-in for an upgrade to the next room category at no extra cost.',
    descZh: '到店自动享优先升房礼遇，免费升级至更高一级房型。',
  },
  {
    icon: Zap,
    titleEs: 'Acceso anticipado a ofertas y cyber',
    titleEn: 'Early access to Cyber & seasonal sales',
    titleZh: '抢先体验 Cyber 大促与季节优惠',
    descEs: 'Ingresa 24 horas antes que el público general a nuestras campañas Cyber Solana y escapadas.',
    descEn: 'Shop Cyber Solana campaigns and seasonal getaways 24 hours before general public release.',
    descZh: '比公众提前 24 小时解锁 Cyber Solana 狂欢活动与季节性度假特惠。',
  },
  {
    icon: Headphones,
    titleEs: 'Atención concierge prioritaria',
    titleEn: 'Priority 24/7 concierge care',
    titleZh: '24/7 优先礼宾专属服务',
    descEs: 'Canal directo con nuestro equipo para traslados privados, reservas gastronómicas y excursiones.',
    descEn: 'Direct line to our concierge desk for private transfers, dining bookings, and curated tours.',
    descZh: '直连礼宾团队，快速安排私人接送、美食预订与精选行程定制。',
  },
];

const STEPS = [
  {
    num: '01',
    titleEs: 'Regístrate gratis',
    titleEn: 'Join for free',
    titleZh: '免费注册入会',
    descEs: 'Completa tus datos en menos de un minuto. Sin anualidades, sin tarjetas ni compromisos.',
    descEn: 'Complete your details in under a minute. No annual fees, no cards, and no obligations.',
    descZh: '不到一分钟填写您的资料即可完成注册。无年费、无需信用卡、无任何捆绑限制。',
  },
  {
    num: '02',
    titleEs: 'Reserva con tu código',
    titleEn: 'Book with your code',
    titleZh: '使用专属码预订',
    descEs: 'Ingresa el código SOLANA12 al reservar directo y obtén tu descuento de socio al instante.',
    descEn: 'Apply code SOLANA12 when booking direct and receive your member discount immediately.',
    descZh: '官网直订时输入优惠码 SOLANA12，即刻立享会员专享折扣。',
  },
  {
    num: '03',
    titleEs: 'Acumula y canjea',
    titleEn: 'Earn and redeem',
    titleZh: '积分累计与兑换',
    descEs: 'Suma 100 puntos Solana por cada noche hospedada y canjea noches libres en Lima, Cusco o Paracas.',
    descEn: 'Earn 100 Solana points per night stayed and redeem complimentary nights in Lima, Cusco, or Paracas.',
    descZh: '每入住一晚即可获 100 点 Solana 积分，可在利马、库斯科或帕拉卡斯兑换免费住宿。',
  },
];

const TIERS = [
  {
    name: 'Classic',
    nameZh: '经典 Classic',
    requirementEs: 'Gratis al registrarte',
    requirementEn: 'Free upon sign-up',
    requirementZh: '注册即免费获得',
    discount: '-12%',
    accent: '#94A3B8',
    perksEs: ['Descuento -12% directo', 'Desayuno buffet incluido', 'Check-in express'],
    perksEn: ['12% direct discount', 'Breakfast buffet included', 'Express check-in'],
    perksZh: ['官网直减 12%', '含手工自助早餐', '快速办理入住'],
  },
  {
    name: 'Silver',
    nameZh: '白银 Silver',
    requirementEs: '5+ noches al año',
    requirementEn: '5+ nights per year',
    requirementZh: '每年入住满 5 晚',
    discount: '-15%',
    accent: '#CBD5E1',
    perksEs: ['Todo Classic + 15% dscto.', 'Circuito termal 60 min', 'Late check-out hasta 14 h'],
    perksEn: ['All Classic + 15% off', '60-min thermal circuit', 'Late check-out until 2 PM'],
    perksZh: ['经典版全礼遇 + 享 15% 折扣', '60 分钟温泉水疗循环', '延迟退房至 14:00'],
  },
  {
    name: 'Gold',
    nameZh: '黄金 Gold',
    requirementEs: '12+ noches al año',
    requirementEn: '12+ nights per year',
    requirementZh: '每年入住满 12 晚',
    discount: '-18%',
    accent: GOLD,
    perksEs: ['Todo Silver + 18% dscto.', 'Upgrade garantizado*', 'Concierge privado 24/7'],
    perksEn: ['All Silver + 18% off', 'Priority suite upgrade*', 'Dedicated 24/7 concierge'],
    perksZh: ['白银版全礼遇 + 享 18% 折扣', '优先套房升级*', '24/7 私人专属礼宾'],
  },
];

const COMPARISON_ROWS = [
  {
    labelEs: 'Tarifa por noche',
    labelEn: 'Nightly rate',
    labelZh: '每晚房价',
    nonMemberEs: 'Tarifa pública estándar',
    nonMemberEn: 'Standard public rate',
    nonMemberZh: '标准公开房价',
    memberEs: 'Tarifa pública -12% garantizado',
    memberEn: 'Public rate -12% guaranteed',
    memberZh: '公开价保证直减 12%',
  },
  {
    labelEs: 'Desayuno buffet artesanal',
    labelEn: 'Artisanal breakfast buffet',
    labelZh: '手工自助早餐',
    nonMemberEs: 'S/ 65 por persona',
    nonMemberEn: 'S/ 65 per guest',
    nonMemberZh: '每位 S/ 65',
    memberEs: 'Incluido sin costo',
    memberEn: 'Included complimentary',
    memberZh: '免费包含',
  },
  {
    labelEs: 'Circuito termal del spa (60 min)',
    labelEn: 'Spa thermal circuit (60 min)',
    labelZh: '水疗温泉水疗循环（60 分钟）',
    nonMemberEs: 'S/ 90 por estadía',
    nonMemberEn: 'S/ 90 per stay',
    nonMemberZh: '每次入住 S/ 90',
    memberEs: 'Incluido por estadía',
    memberEn: 'Included per stay',
    memberZh: '每次入住免费包含',
  },
  {
    labelEs: 'Check-in express & late check-out',
    labelEn: 'Express check-in & late check-out',
    labelZh: '快速入住与延迟退房',
    nonMemberEs: 'Sujeto a cargo adicional',
    nonMemberEn: 'Additional fee applies',
    nonMemberZh: '需另行收费',
    memberEs: 'Incluido (11 h / 14 h)',
    memberEn: 'Included (11 AM / 2 PM)',
    memberZh: '免费包含 (11:00 / 14:00)',
  },
  {
    labelEs: 'Upgrade de habitación',
    labelEn: 'Room category upgrade',
    labelZh: '房型升级礼遇',
    nonMemberEs: 'No incluido',
    nonMemberEn: 'Not included',
    nonMemberZh: '不包含',
    memberEs: 'Sujeto a disponibilidad',
    memberEn: 'Subject to availability',
    memberZh: '视房态免费升级',
  },
  {
    labelEs: 'Noches gratis por puntos',
    labelEn: 'Free nights via points',
    labelZh: '积分兑换免费住宿',
    nonMemberEs: 'No acumula',
    nonMemberEn: 'Does not earn',
    nonMemberZh: '不累计积分',
    memberEs: '100 pts por noche (500 pts = 1 noche)',
    memberEn: '100 pts per night (500 pts = 1 night)',
    memberZh: '每晚 100 积分（500 积分 = 1 晚）',
  },
  {
    labelEs: 'Acceso anticipado Cyber Solana',
    labelEn: 'Early Cyber Solana access',
    labelZh: 'Cyber Solana 抢先入场',
    nonMemberEs: 'Público general',
    nonMemberEn: 'General release',
    nonMemberZh: '面向公众开放时间',
    memberEs: '24 horas de anticipación',
    memberEn: '24-hour early access',
    memberZh: '提前 24 小时抢先预订',
  },
  {
    labelEs: 'Atención concierge prioritaria',
    labelEn: 'Priority concierge desk',
    labelZh: '优先礼宾台服务',
    nonMemberEs: 'Recepción regular',
    nonMemberEn: 'Standard reception',
    nonMemberZh: '常规前台服务',
    memberEs: 'Línea directa 24/7',
    memberEn: 'Dedicated 24/7 line',
    memberZh: '24/7 专属直通专线',
  },
];

const TESTIMONIALS = [
  {
    name: 'Mariela Quispe Huanca',
    city: 'Miraflores, Lima',
    cityZh: '米拉弗洛雷斯 · 利马',
    staysEs: '8 estadías',
    staysEn: '8 stays',
    staysZh: '8 次入住',
    textEs:
      'Desde que me uní al Club Solana cada viaje a Cusco tiene otro ritmo. El desayuno artesanal incluido y el upgrade que recibimos en el Valle Sagrado superaron nuestras expectativas.',
    textEn:
      'Since joining Club Solana every trip to Cusco feels effortless. The included artisanal breakfast and the room upgrade in the Sacred Valley exceeded all expectations.',
    textZh:
      '自从加入 Club Solana 后，每次前往库斯科的旅程都格外惬意。包含的手工自助早餐以及在圣谷获得的免费房型升级完全超出了我们的预期。',
  },
  {
    name: 'Rodrigo Fernández Palomino',
    city: 'Yanahuara, Arequipa',
    cityZh: '亚纳瓦拉 · 阿雷基帕',
    staysEs: '12 estadías',
    staysEn: '12 stays',
    staysZh: '12 次入住',
    textEs:
      'Viajo por trabajo entre Lima y Paracas casi todos los meses. El check-in express me ahorra tiempo valioso y ya canjeé dos noches libres en familia gracias a los puntos acumulados.',
    textEn:
      'I travel monthly between Lima and Paracas for work. Express check-in saves valuable time and I already redeemed two complimentary family nights with my earned points.',
    textZh:
      '我几乎每个月都会因公往返于利马和帕拉卡斯。快速入住为我节省了宝贵时间，而且我还用累计积分兑换了两晚家庭免费住宿。',
  },
  {
    name: 'Carla Mendoza Rivas',
    city: 'Víctor Larco, Trujillo',
    cityZh: '维克多拉科 · 特鲁希略',
    staysEs: '5 estadías',
    staysEn: '5 stays',
    staysZh: '5 次入住',
    textEs:
      'El circuito termal incluido después de recorrer Cusco todo el día es un detalle incomparable. La atención por el canal prioritario de concierge siempre resuelve todo en minutos.',
    textEn:
      'Having the thermal spa circuit included after a full day exploring Cusco is unbeatable. Their priority concierge channel always handles requests in minutes.',
    textZh:
      '在库斯科游玩一整天后能免费享受温泉水疗循环真是无可比拟的礼遇。通过会员优先礼宾专线沟通，任何需求几分钟内就能妥善解决。',
  },
];

const FAQS = [
  {
    qEs: '¿Tiene algún costo registrarse en Club Solana?',
    qEn: 'Is there any fee to join Club Solana?',
    qZh: '注册成为 Club Solana 会员需要付费吗？',
    aEs: 'No. La membresía Classic es 100% gratuita y no tiene costo de mantenimiento ni renovación anual. Solo completas el formulario y recibes tu código de bienvenida al instante.',
    aEn: 'No. Classic membership is 100% free with zero annual or maintenance fees. Simply submit the form to receive your welcome code immediately.',
    aZh: '完全免费。Classic 经典会员 100% 免费加入，无年费也无账户维护费。只需填写表格，即可立即获取您的迎新优惠码。',
  },
  {
    qEs: '¿Cómo aplico el código SOLANA12 en mi primera reserva?',
    qEn: 'How do I apply the SOLANA12 code on my first booking?',
    qZh: '首次预订时如何使用优惠码 SOLANA12？',
    aEs: 'Al reservar directamente desde nuestra web o por WhatsApp Concierge, menciona o ingresa el código SOLANA12 para descontar automáticamente el 12% sobre la tarifa pública vigente.',
    aEn: 'When booking directly on our website or via WhatsApp Concierge, enter or mention code SOLANA12 to automatically apply 12% off our best available public rate.',
    aZh: '在官网或通过 WhatsApp 礼宾专线直订时，输入或告知优惠码 SOLANA12，系统将在当前最优公开房价基础上自动立减 12%。',
  },
  {
    qEs: '¿Cómo se acumulan y canjean las noches gratis?',
    qEn: 'How are free nights earned and redeemed?',
    qZh: '如何累计积分并兑换免费住宿？',
    aEs: 'Cada noche de estadía reservada de forma directa con tu cuenta de socio suma 100 puntos Solana. Al reunir 500 puntos puedes canjear una noche gratuita en Lima, Cusco o Paracas.',
    aEn: 'Each night booked directly under your member profile earns 100 Solana points. At 500 points you can redeem one complimentary night in Lima, Cusco, or Paracas.',
    aZh: '使用会员账号直订每入住一晚可获 100 点 Solana 积分。累计满 500 积分即可在利马、库斯科或帕拉卡斯兑换 1 晚免费住宿。',
  },
  {
    qEs: '¿El circuito termal de 60 minutos aplica en todas las sedes?',
    qEn: 'Is the 60-minute thermal spa circuit available at all hotels?',
    qZh: '所有酒店都包含 60 分钟水疗温泉循环体验吗？',
    aEs: 'El circuito termal completo opera en Valle Sagrado (Cusco) y Bahía de Paracas (Ica). En Miraflores (Lima), los socios reciben 60 minutos de acceso reservado a la zona de hidromasaje y sauna.',
    aEn: 'The full thermal circuit operates in Sacred Valley (Cusco) and Paracas Bay (Ica). In Miraflores (Lima), members receive a reserved 60-minute hydrotherapy and sauna session.',
    aZh: '完整水疗温泉循环设施设于圣谷（库斯科）与帕拉卡斯湾（伊卡）酒店；在米拉弗洛雷斯（利马），会员专享 60 分钟预约制水疗按摩池与桑拿体验。',
  },
  {
    qEs: '¿Puedo combinar el -12% del Club con ofertas Cyber Solana o bancos?',
    qEn: 'Can I combine the 12% Club rate with Cyber Solana or bank promos?',
    qZh: '会员 12% 折扣可以与 Cyber Solana 或银行优惠叠加吗？',
    aEs: 'Sí, los socios Club Solana reciben acceso anticipado de 24 horas a las campañas Cyber Solana y un beneficio adicional en paquetes seleccionados. Consulta los términos vigentes de cada promoción.',
    aEn: 'Yes, Club Solana members enjoy 24-hour early access to Cyber Solana sales plus stacked member perks on selected packages. Check each offer’s specific terms.',
    aZh: '可以。Club Solana 会员不仅享提前 24 小时抢先进入 Cyber Solana 活动，还可在指定套餐中叠加会员专属礼遇，具体以各活动当前细则为准。',
  },
];

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const GoldDivider: React.FC = () => (
  <div className="flex items-center gap-3 justify-center my-3">
    <span className="block w-10 h-px bg-[#C88A36]" />
    <span className="block w-2 h-2 rounded-full bg-[#C88A36]" />
    <span className="block w-10 h-px bg-[#C88A36]" />
  </div>
);

export const ClubSolanaPage: React.FC = () => {
  const { lang } = useSolana();
  const T = (es: string, en: string, zh: string) =>
    lang === 'zh' ? zh : lang === 'en' ? en : es;
  const pickList = (es: string[], en: string[], zh: string[]) =>
    lang === 'zh' ? zh : lang === 'en' ? en : es;

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    nacimiento: '',
    ciudad: '',
    terminos: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.terminos || !form.nombre.trim() || !form.apellido.trim() || !form.email.trim()) return;
    setSubmitted(true);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('SOLANA12').catch(() => {});
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const memberCodeNumber = `CS-${(form.nombre.slice(0, 2) || 'SL').toUpperCase()}2026-8419`;

  return (
    <div className="bg-[#FAF9F7] text-[#111317]">
      {/* 1. HERO IN DEEP BLACK */}
      <section
        className="relative min-h-[520px] lg:min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-6 py-20"
        style={{ background: BLACK }}
      >
        <img
          src={HOTEL_MEDIA.lobbyLounge}
          alt="Casa Solana Club Lounge"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(200,138,54,0.16) 0%, rgba(20,22,24,0.92) 72%)',
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <FadeUp>
            <p className="eyebrow-solana text-[#C88A36] mb-5">
              {T('Programa de Fidelización', 'Loyalty Membership', '会员忠诚计划')}
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-3 flex flex-wrap items-baseline justify-center gap-x-4">
              <span className="font-editorial tracking-wide">CASA SOLANA</span>
              <span className="font-serif italic font-normal text-[#C88A36]">club</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <GoldDivider />
            <p className="text-base sm:text-xl text-white/80 mt-4 max-w-xl mx-auto leading-relaxed">
              {T(
                'El programa de fidelización exclusivo',
                'The exclusive hospitality loyalty program',
                'Casa Solana 专属会员尊享礼遇计划'
              )}
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('registro-club')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                {T('Activar Membresía Gratis', 'Activate Free Membership', '免费激活会员资格')}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('beneficios-club')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/25 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {T('Ver Beneficios', 'Explore Benefits', '查看专属礼遇')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </FadeUp>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
        />
      </section>

      {/* 2. WELCOME CODE BANNER */}
      <div className="bg-[#0A1D37] text-white border-b border-[#C88A36]/30 py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#C88A36]/20 border border-[#C88A36]/40 flex items-center justify-center shrink-0">
              <Ticket className="w-4 h-4 text-[#C88A36]" />
            </span>
            <p className="text-sm font-medium text-white/90">
              {lang === 'es' ? (
                <>
                  Usa el código{' '}
                  <strong className="font-extrabold tracking-widest text-[#C88A36] mx-1">
                    SOLANA12
                  </strong>{' '}
                  y obtén -12% en tu primera reserva
                </>
              ) : lang === 'zh' ? (
                <>
                  使用优惠码{' '}
                  <strong className="font-extrabold tracking-widest text-[#C88A36] mx-1">
                    SOLANA12
                  </strong>{' '}
                  ，首次预订立享 12% 折扣
                </>
              ) : (
                <>
                  Use code{' '}
                  <strong className="font-extrabold tracking-widest text-[#C88A36] mx-1">
                    SOLANA12
                  </strong>{' '}
                  and get 12% off your first reservation
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{T('Copiado', 'Copied', '已复制')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#C88A36]" />
                  <span>{T('Copiar código', 'Copy code', '复制优惠码')}</span>
                </>
              )}
            </button>
            <Link
              to="/reservar"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-extrabold uppercase tracking-wider transition-colors"
            >
              {T('Reservar ahora', 'Book now', '立即预订')}
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. BENEFITS IN 3 COLUMNS */}
      <section id="beneficios-club" className="py-20 px-6 bg-[#FAF9F7]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="eyebrow-solana text-[#C88A36] mb-3">
                {T('Privilegios de Socio', 'Member Privileges', '会员专属特权')}
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0A1D37] mb-3">
                {T('Beneficios exclusivos en cada estadía', 'Exclusive benefits on every stay', '每次入住尽享专属礼遇')}
              </h2>
              <GoldDivider />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <FadeUp key={benefit.titleEs} delay={idx * 0.05}>
                  <div className="h-full p-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#C88A36]/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF9F7] border border-[#C88A36]/25 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-[#C88A36]" />
                    </div>
                    <h3 className="font-editorial text-lg font-bold text-[#0A1D37] mb-2">
                      {T(benefit.titleEs, benefit.titleEn, benefit.titleZh)}
                    </h3>
                    <p className="text-sm text-[#555E6B] leading-relaxed">
                      {T(benefit.descEs, benefit.descEn, benefit.descZh)}
                    </p>
                  </div>
                </FadeUp>
              );
            })}

            {/* 9th balanced card inviting membership */}
            <FadeUp delay={BENEFITS.length * 0.05}>
              <div
                className="h-full p-7 rounded-2xl flex flex-col justify-between text-white shadow-md"
                style={{ background: `linear-gradient(145deg, ${NAVY} 0%, ${BLACK} 100%)` }}
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C88A36]/20 text-[#C88A36] text-[11px] font-bold uppercase tracking-wider mb-5">
                    <Award className="w-3.5 h-3.5" />
                    {T('Sin costo anual', 'Zero annual fee', '免年费永久免费')}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-white mb-2">
                    {T('Membresía inmediata y digital', 'Instant digital membership', '即时开通数字会员卡')}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {T(
                      'Activa tu cuenta hoy y disfruta de tu primer -12% con el código SOLANA12 desde tu primera noche.',
                      'Activate your profile today and unlock your first 12% off with code SOLANA12 from night one.',
                      '今日注册激活账号，首晚即可使用优惠码 SOLANA12 享受 12% 折扣。'
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('registro-club')}
                  className="mt-6 w-full py-3 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {T('Unirme gratis ahora', 'Join free now', '立即免费加入')}
                </button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (3 STEPS) */}
      <section className="py-20 px-6 bg-[#0A1D37] text-white">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="eyebrow-solana text-[#C88A36] mb-3">
                {T('Proceso Simple', 'Simple Process', '简单三步')}
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white mb-3">
                {T('¿Cómo funciona?', 'How does it work?', '如何运作？')}
              </h2>
              <GoldDivider />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {STEPS.map((step, idx) => (
              <FadeUp key={step.num} delay={idx * 0.1}>
                <div className="relative flex flex-col items-center text-center p-7 rounded-2xl bg-white/5 border border-white/10 h-full">
                  <div className="w-16 h-16 rounded-full bg-[#C88A36] text-[#141618] flex items-center justify-center font-editorial font-bold text-2xl num-tabular mb-5 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white mb-2.5">
                    {T(step.titleEs, step.titleEn, step.titleZh)}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {T(step.descEs, step.descEn, step.descZh)}
                  </p>
                  {idx < STEPS.length - 1 && (
                    <ChevronRight className="hidden md:block w-6 h-6 text-[#C88A36] absolute -right-7 top-1/2 -translate-y-1/2" />
                  )}
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Tiers strip */}
          <FadeUp delay={0.2}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className="p-6 rounded-2xl bg-[#10151C] border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="font-editorial text-xl font-bold"
                        style={{ color: tier.accent }}
                      >
                        {lang === 'zh' ? tier.nameZh : tier.name}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#C88A36]/20 text-[#C88A36] text-xs font-extrabold num-tabular">
                        {tier.discount}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-4">
                      {T(tier.requirementEs, tier.requirementEn, tier.requirementZh)}
                    </p>
                    <ul className="space-y-2 text-xs text-white/85">
                      {pickList(tier.perksEs, tier.perksEn, tier.perksZh).map((perk) => (
                        <li key={perk} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C88A36] shrink-0" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 5. COMPARISON TABLE: NO SOCIO VS SOCIO CLUB */}
      <section className="py-20 px-6 bg-[#F2EFE9]">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="eyebrow-solana text-[#C88A36] mb-3">
                {T('Comparativa Directa', 'Direct Comparison', '会员权益直观对比')}
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0A1D37] mb-3">
                {T('No Socio vs Socio Club', 'Non-Member vs Club Member', '非会员 vs 俱乐部会员')}
              </h2>
              <GoldDivider />
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-lg bg-white">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left px-6 py-4 bg-[#0A1D37] text-white/75 text-xs font-bold uppercase tracking-wider w-[40%]">
                      {T('Beneficio / Tarifa', 'Benefit / Rate', '礼遇 / 房价')}
                    </th>
                    <th className="text-center px-6 py-4 bg-[#0A1D37] text-white/75 text-xs font-bold uppercase tracking-wider">
                      {T('No Socio', 'Non-Member', '非会员')}
                    </th>
                    <th className="text-center px-6 py-4 bg-[#C88A36] text-[#141618] text-xs font-extrabold uppercase tracking-wider">
                      {T('Socio Club', 'Club Member', '俱乐部会员')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={row.labelEs}
                      className={`border-b border-slate-100 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F7]'
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-[#0A1D37]">
                        {T(row.labelEs, row.labelEn, row.labelZh)}
                      </td>
                      <td className="px-6 py-4 text-center text-[#555E6B] num-tabular">
                        {T(row.nonMemberEs, row.nonMemberEn, row.nonMemberZh)}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-[#0A1D37] num-tabular">
                        <span className="inline-flex items-center justify-center gap-1.5">
                          <Check className="w-4 h-4 text-[#C88A36] shrink-0" />
                          <span>{T(row.memberEs, row.memberEn, row.memberZh)}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 6. FULL REGISTRATION FORM + DIGITAL MEMBER CARD */}
      <section id="registro-club" className="py-20 px-6 bg-[#141618] text-white">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="eyebrow-solana text-[#C88A36] mb-3">
                {T('Registro Gratuito', 'Complimentary Enrollment', '免费注册通道')}
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white mb-3">
                {T('Activa tu Membresía Gratis', 'Activate Your Free Membership', '免费激活您的会员资格')}
              </h2>
              <GoldDivider />
              <p className="text-sm text-white/70 mt-3 max-w-lg mx-auto">
                {T(
                  'Completa el formulario para generar tu tarjeta digital de socio y desbloquear tu código SOLANA12.',
                  'Complete the form below to generate your digital membership card and unlock code SOLANA12.',
                  '填写下方表格即可生成您的电子会员卡，并立即解锁专属优惠码 SOLANA12。'
                )}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Digital Member Card */}
                <div
                  className="relative p-7 sm:p-9 rounded-2xl border border-[#C88A36]/60 shadow-2xl overflow-hidden max-w-lg mx-auto"
                  style={{
                    background: `linear-gradient(135deg, ${NAVY} 0%, ${BLACK} 65%, #2a1f10 100%)`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C88A36]">
                        {T('Tarjeta Digital de Socio', 'Digital Member Card', '电子会员卡')}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-editorial text-xl font-bold tracking-wider text-white">
                          CASA SOLANA
                        </span>
                        <span className="font-serif italic text-xl text-[#C88A36]">club</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#C88A36] text-[#141618] text-[10px] font-extrabold uppercase tracking-widest">
                      {T('Classic', 'Classic', '经典 Classic')}
                    </span>
                  </div>

                  <div className="space-y-1 mb-6">
                    <p className="text-[11px] uppercase tracking-widest text-white/50">
                      {T('Titular', 'Member Name', '持卡人姓名')}
                    </p>
                    <p className="font-editorial text-2xl font-bold text-white">
                      {form.nombre} {form.apellido}
                    </p>
                    {form.ciudad && (
                      <p className="text-xs text-white/65">{form.ciudad}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/15 text-xs">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-white/50">
                        {T('Nro. de Socio', 'Member ID', '会员编号')}
                      </span>
                      <span className="font-bold num-tabular text-white">{memberCodeNumber}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-white/50">
                        {T('Código Activo', 'Active Code', '已激活优惠码')}
                      </span>
                      <span className="font-extrabold tracking-widest text-[#C88A36]">
                        SOLANA12 (-12%)
                      </span>
                    </div>
                    <CreditCard className="w-6 h-6 text-[#C88A36]" />
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {T(
                        `Membresía activada para ${form.email}`,
                        `Membership activated for ${form.email}`,
                        `已为 ${form.email} 激活会员资格`
                      )}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                      to="/reservar"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-extrabold uppercase tracking-wider transition-all"
                    >
                      {T('Usar mi -12% ahora', 'Use my 12% off now', '立即使用 12% 折扣预订')}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {T('Editar datos', 'Edit details', '修改资料')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-10 rounded-2xl bg-white/[0.04] border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                <div>
                  <label
                    htmlFor="club-nombre"
                    className="block text-xs font-bold tracking-wider uppercase mb-2 text-white/75"
                  >
                    {T('Nombre *', 'First Name *', '名字 *')}
                  </label>
                  <input
                    id="club-nombre"
                    type="text"
                    name="nombre"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder={T('Ej. Camila', 'e.g. Camila', '例如：雨桐')}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 focus:outline-none focus:border-[#C88A36] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="club-apellido"
                    className="block text-xs font-bold tracking-wider uppercase mb-2 text-white/75"
                  >
                    {T('Apellido *', 'Last Name *', '姓氏 *')}
                  </label>
                  <input
                    id="club-apellido"
                    type="text"
                    name="apellido"
                    required
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder={T('Ej. Paredes', 'e.g. Paredes', '例如：林')}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 focus:outline-none focus:border-[#C88A36] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="club-email"
                    className="block text-xs font-bold tracking-wider uppercase mb-2 text-white/75"
                  >
                    {T('Email *', 'Email *', '电子邮箱 *')}
                  </label>
                  <input
                    id="club-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={T('nombre@correo.com', 'name@email.com', 'name@example.com')}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 focus:outline-none focus:border-[#C88A36] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="club-telefono"
                    className="block text-xs font-bold tracking-wider uppercase mb-2 text-white/75"
                  >
                    {T('Teléfono *', 'Phone *', '联系电话 *')}
                  </label>
                  <input
                    id="club-telefono"
                    type="tel"
                    name="telefono"
                    required
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+51 984 000 000"
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 focus:outline-none focus:border-[#C88A36] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="club-nacimiento"
                    className="block text-xs font-bold tracking-wider uppercase mb-2 text-white/75"
                  >
                    {T('Fecha de nacimiento *', 'Date of birth *', '出生日期 *')}
                  </label>
                  <input
                    id="club-nacimiento"
                    type="date"
                    name="nacimiento"
                    required
                    value={form.nacimiento}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 focus:outline-none focus:border-[#C88A36] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="club-ciudad"
                    className="block text-xs font-bold tracking-wider uppercase mb-2 text-white/75"
                  >
                    {T('Ciudad *', 'City *', '所在城市 *')}
                  </label>
                  <input
                    id="club-ciudad"
                    type="text"
                    name="ciudad"
                    required
                    value={form.ciudad}
                    onChange={handleChange}
                    placeholder={T('Lima, Cusco, Arequipa...', 'Lima, Cusco, Arequipa...', '利马、库斯科、阿雷基帕…')}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 focus:outline-none focus:border-[#C88A36] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2 flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    name="terminos"
                    id="club-terminos"
                    required
                    checked={form.terminos}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 shrink-0 accent-[#C88A36] cursor-pointer"
                  />
                  <label
                    htmlFor="club-terminos"
                    className="text-xs text-white/65 leading-relaxed cursor-pointer"
                  >
                    {T(
                      'Acepto los Términos y Condiciones del programa Club Solana y la Política de Privacidad para recibir mi código de bienvenida y promociones exclusivas.',
                      'I accept the Club Solana Terms & Conditions and Privacy Policy to receive my welcome code and member-only offers.',
                      '我同意 Club Solana 会员条款与隐私政策，以接收迎新优惠码及会员专属礼遇通知。'
                    )}
                  </label>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Shield className="w-4 h-4" />
                    {T('Activar Membresía Gratis', 'Activate Free Membership', '免费激活会员资格')}
                  </button>
                </div>
              </form>
            )}
          </FadeUp>
        </div>
      </section>

      {/* 7. MEMBER TESTIMONIALS */}
      <section className="py-20 px-6 bg-[#FAF9F7]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="eyebrow-solana text-[#C88A36] mb-3">
                {T('Experiencias Reales', 'Member Stories', '真实会员心声')}
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0A1D37] mb-3">
                {T('Testimonios de Socios', 'Member Testimonials', '会员评价')}
              </h2>
              <GoldDivider />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {TESTIMONIALS.map((item, idx) => (
              <FadeUp key={item.name} delay={idx * 0.08}>
                <div className="h-full p-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm border-t-4 border-t-[#C88A36] flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-4 h-4 text-[#C88A36] fill-[#C88A36]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#555E6B] leading-relaxed italic flex-1 mb-6">
                    &ldquo;{T(item.textEs, item.textEn, item.textZh)}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-[#0A1D37] text-[#C88A36] font-editorial font-bold text-sm flex items-center justify-center shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#0A1D37]">{item.name}</p>
                      <p className="text-xs text-[#555E6B]">
                        {lang === 'zh' ? item.cityZh : item.city} &middot;{' '}
                        {T(item.staysEs, item.staysEn, item.staysZh)}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION (5 QUESTIONS) */}
      <section className="py-20 px-6 bg-[#0A1D37] text-white">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="eyebrow-solana text-[#C88A36] mb-3">
                {T('Resolvemos tus dudas', 'Frequently Asked', '常见问题解答')}
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white mb-3">
                {T('Preguntas Frecuentes', 'FAQ', '常见问题')}
              </h2>
              <GoldDivider />
            </div>
          </FadeUp>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <FadeUp key={faq.qEs} delay={idx * 0.05}>
                  <div
                    className={`rounded-xl border transition-colors ${
                      isOpen
                        ? 'border-[#C88A36]/60 bg-white/[0.06]'
                        : 'border-white/15 bg-white/[0.02]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-semibold text-sm sm:text-base text-white">
                        {T(faq.qEs, faq.qEn, faq.qZh)}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 text-[#C88A36]"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-sm text-white/75 leading-relaxed">
                            {T(faq.aEs, faq.aEn, faq.aZh)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClubSolanaPage;
