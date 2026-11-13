import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSolana } from '../context/SolanaContext';

interface RouteSeo {
  title: { es: string; en: string; zh: string };
  desc: { es: string; en: string; zh: string };
}

const SEO_MAP: Record<string, RouteSeo> = {
  '/': {
    title: {
      es: 'CASA SOLANA Hoteles | Miraflores · Valle Sagrado · Paracas - Lujo en Perú',
      en: 'CASA SOLANA Hotels | Miraflores · Sacred Valley · Paracas - Luxury Peru',
      zh: 'CASA SOLANA 索拉纳奢华酒店 | 米拉弗洛雷斯 · 圣谷 · 帕拉卡斯',
    },
    desc: {
      es: 'Cadena hotelera boutique de lujo en Perú. Sedes en Miraflores (Lima), Valle Sagrado (Cusco) y Paracas (Ica). -12% con Club Solana, spa termal y gastronomía de autor.',
      en: 'Luxury boutique hotel collection in Peru. Properties in Miraflores (Lima), Sacred Valley (Cusco), and Paracas (Ica). 12% off with Club Solana, thermal spa & fine dining.',
      zh: '秘鲁顶级精品奢华度假酒店。坐落于利马米拉弗洛雷斯、库斯科圣谷与伊卡帕拉卡斯湾。享Club Solana会员专属12%折扣、温泉水疗与安第斯名厨美馔。',
    },
  },
  '/habitaciones': {
    title: {
      es: 'Suites & Habitaciones de Lujo | CASA SOLANA Hoteles Perú',
      en: 'Luxury Suites & Rooms | CASA SOLANA Hotels Peru',
      zh: '尊享套房与客房 | CASA SOLANA 秘鲁索拉纳酒店',
    },
    desc: {
      es: 'Explora nuestras suites coloniales y residenciales en Lima, Cusco y Paracas. Cama king, lino lavado, hidromasaje y vistas exclusivas. Reserva directa garantizada.',
      en: 'Explore our colonial and residential suites in Lima, Cusco, and Paracas. King bedding, washed linen, hydrotherapy tubs and breathtaking views.',
      zh: '探索利马、库斯科与帕拉卡斯的殖民风格与现代奢华套房。配备特大床、天然水洗亚麻织物、水疗按摩池及壮丽景观。',
    },
  },
  '/destinos': {
    title: {
      es: 'Destinos & Hoteles en Perú | Miraflores · Valle Sagrado · Paracas',
      en: 'Destinations & Properties in Peru | Miraflores · Sacred Valley · Paracas',
      zh: '秘鲁度假目的地与酒店 | 米拉弗洛雷斯 · 圣谷 · 帕拉卡斯',
    },
    desc: {
      es: 'Conoce los 3 destinos icónicos de Casa Solana en Perú: el malecón de Miraflores, el corazón andino del Valle Sagrado y el santuario marino de Paracas.',
      en: 'Discover Casa Solana’s three iconic Peruvian destinations: Miraflores oceanfront, the Andean Sacred Valley, and the coastal marine sanctuary of Paracas.',
      zh: '探索 Casa Solana 位于秘鲁的三大代表胜地：利马米拉弗洛雷斯海岸、安第斯山脉圣谷腹地与帕拉卡斯国家海洋保护区。',
    },
  },
  '/ofertas': {
    title: {
      es: 'Ofertas & Cyber Casa Solana | Hasta 50% Dto. y Cuotas sin Intereses',
      en: 'Special Offers & Cyber Solana | Up to 50% Off & Zero-Interest Installments',
      zh: '特别优惠与 Cyber 狂欢 | 高达50%折扣及免息分期',
    },
    desc: {
      es: 'Aprovecha las promociones exclusivas de Casa Solana: Cyber Solana hasta 50% dto, paquetes con estadía y gastronomía, y hasta 12 cuotas sin intereses con bancos peruanos.',
      en: 'Book Casa Solana exclusive deals: Cyber Solana up to 50% off, stay & dining packages, and up to 12 interest-free installments with top Peruvian banks.',
      zh: '把握 Casa Solana 专享特惠：Cyber 大促高达50%直减、住宿加美食尊享套餐、以及秘鲁主流银行最高12期免息分期。',
    },
  },
  '/restaurantes': {
    title: {
      es: 'Restaurantes & Gastronomía Peruana | Q’iswar, Killa Brasas & Brisa Marina',
      en: 'Dining & Peruvian Cuisine | Q’iswar, Killa Brasas & Brisa Marina',
      zh: '餐厅与秘鲁美食文化 | Q’iswar、Killa Brasas 与 Brisa Marina',
    },
    desc: {
      es: 'Experiencias culinarias de autor en Casa Solana: cocina andina contemporánea en Cusco, brasas y huerto orgánico en Valle Sagrado, y ceviches frente al mar en Paracas.',
      en: 'Signature culinary journeys at Casa Solana: contemporary Andean cuisine in Cusco, live embers in Sacred Valley, and coastal seafood in Paracas.',
      zh: 'Casa Solana 招牌美馔体验：库斯科现代安第斯创意料理、圣谷生态果木炭火烤肉、以及帕拉卡斯海滨极鲜刺身生腌。',
    },
  },
  '/servicios': {
    title: {
      es: 'Spa Termal, Bienestar & Experiencias | CASA SOLANA Hoteles Perú',
      en: 'Thermal Spa, Wellness & Experiences | CASA SOLANA Hotels Peru',
      zh: '温泉水疗、康养与探索体验 | CASA SOLANA 秘鲁酒店',
    },
    desc: {
      es: 'Circuito termal, saunas andinos, masajes terapéuticos de 60 minutos, cabalgatas de paso y navegación a las Islas Ballestas. Bienestar integral en Perú.',
      en: 'Thermal hydrotherapy circuit, Andean saunas, therapeutic 60-min massages, Peruvian Paso horse riding, and Ballestas Islands sailing.',
      zh: '水疗温泉循环池、安第斯天然草本桑拿、60分钟深层理疗按摩、秘鲁步马骑行体验与巴列斯塔斯群岛私家游艇巡航。',
    },
  },
  '/club': {
    title: {
      es: 'Club Solana | Programa de Socios, -12% Exclusivo y Desayuno Buffet',
      en: 'Club Solana | Loyalty Program, 12% Off & Complimentary Breakfast',
      zh: 'Club Solana 贵宾俱乐部 | 会员专属12%折扣与免费手工早餐',
    },
    desc: {
      es: 'Únete gratis a Club Solana. Accede al código SOLANA12 para un 12% de descuento directo en todas las sedes, desayuno buffet artesanal y noches gratis por puntos.',
      en: 'Join Club Solana for free. Use code SOLANA12 for instant 12% off across all properties, daily artisan breakfast, and points toward complimentary nights.',
      zh: '免费加入 Club Solana 俱乐部。输入优惠码 SOLANA12 即刻享所有分店立减12%折扣、每日手工自助早餐与积分兑换免费房晚。',
    },
  },
  '/corporativo': {
    title: {
      es: 'Corporativo & Retiros Empresariales B2B | CASA SOLANA Hoteles Perú',
      en: 'Corporate & B2B Executive Retreats | CASA SOLANA Hotels Peru',
      zh: '商务会议与企业高管休养计划 | CASA SOLANA 秘鲁',
    },
    desc: {
      es: 'Salones acústicos 4K, retiros de planeamiento estratégico en Valle Sagrado y Miraflores, coffee break continuo y tarifas corporativas con crédito a 30 días.',
      en: '4K acoustic boardrooms, executive strategic planning retreats in Sacred Valley and Miraflores, continuous artisan coffee break, and 30-day B2B credit.',
      zh: '4K高清声学会议厅、圣谷与利马高管战略研讨度假方案、不间断手工茶歇及30天账期企业专属特惠。',
    },
  },
  '/eventos': {
    title: {
      es: 'Bodas de Destino & Eventos Sociales | CASA SOLANA Hoteles Perú',
      en: 'Destination Weddings & Social Galas | CASA SOLANA Hotels Peru',
      zh: '目的地海岛田园婚礼与高端宴会 | CASA SOLANA 秘鲁',
    },
    desc: {
      es: 'Celebra bodas andinas en los jardines del Valle Sagrado, aniversarios frente al mar en Paracas o galas en Miraflores. Asesoría integral y catering gourmet.',
      en: 'Host Andean destination weddings in Sacred Valley gardens, sunset oceanfront galas in Paracas, or chic celebrations in Miraflores.',
      zh: '在圣谷鲜花草坪举行安第斯浪漫婚礼、在帕拉卡斯海平线日落下举行晚宴，或在利马米拉弗洛雷斯定制私享派对。',
    },
  },
  '/reservar': {
    title: {
      es: 'Reservas Directas Online | CASA SOLANA Hoteles & Spa Perú',
      en: 'Direct Online Reservations | CASA SOLANA Hotels & Spa Peru',
      zh: '官方在线快速直订 | CASA SOLANA 秘鲁索拉纳酒店',
    },
    desc: {
      es: 'Reserva tu suite directamente con la mejor tarifa garantizada, -12% con Club Solana, confirmación inmediata y hasta 12 cuotas sin intereses.',
      en: 'Book your luxury suite directly with best rate guarantee, 12% off for Club Solana members, instant confirmation and interest-free installments.',
      zh: '官网直订保证全网最优价格，Club Solana 会员立享 12% 折扣，实时即时确认，支持秘鲁主流银行最高 12 期免息分期。',
    },
  },
};

export const SeoHead: React.FC = () => {
  const { pathname } = useLocation();
  const { lang } = useSolana();

  useEffect(() => {
    // 1. Update <html lang="..."> attribute for accessibility and crawlers
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en' : 'es';

    // 2. Determine best SEO config based on current route
    let routeKey = pathname;
    if (pathname.startsWith('/habitaciones/')) {
      // Room detail page
      const title =
        lang === 'zh'
          ? '套房详情与预订 | CASA SOLANA 秘鲁奢华酒店'
          : lang === 'en'
          ? 'Luxury Suite Details & Booking | CASA SOLANA Hotels Peru'
          : 'Detalle de Suite & Reserva Directa | CASA SOLANA Hoteles Perú';
      const desc =
        lang === 'zh'
          ? '查看套房设施规格、全景图集、实时房态及会员直减12%优惠价。'
          : lang === 'en'
          ? 'View suite amenities, gallery, real-time rates and 12% Club Solana direct discount.'
          : 'Revisa comodidades, galería fotográfica, tarifas en tiempo real y -12% directo Club Solana.';
      document.title = title;
      updateMetaDescription(desc);
      return;
    }

    const matched = SEO_MAP[routeKey] || SEO_MAP['/'];
    const currentTitle = matched.title[lang] || matched.title.es;
    const currentDesc = matched.desc[lang] || matched.desc.es;

    document.title = currentTitle;
    updateMetaDescription(currentDesc);
  }, [pathname, lang]);

  return null;
};

function updateMetaDescription(description: string) {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', description);

  // Also sync og:description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', description);
  }
}

export default SeoHead;
