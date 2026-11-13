import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  Coffee,
  Crown,
  Flower2,
  GlassWater,
  Heart,
  Mail,
  MapPin,
  Music,
  Phone,
  Quote,
  Send,
  Sparkles,
  Sun,
  Users,
  Utensils,
  Wine
} from 'lucide-react';
import { HOTEL_MEDIA } from '../data/hotelMedia';
import { useSolana } from '../context/SolanaContext';
import { WhatsAppLogo } from '../components/SocialIcons';

type CelebrationTab = 'bodas' | 'sociales' | 'aniversarios' | 'quinceaneras';

interface WeddingPackage {
  id: string;
  name: { es: string; en: string; zh: string };
  badge: { es: string; en: string; zh: string };
  pricePen: number;
  maxGuests: number;
  featured?: boolean;
  subtitle: { es: string; en: string; zh: string };
  inclusions: { es: string[]; en: string[]; zh: string[] };
}

interface CateringTier {
  id: string;
  title: { es: string; en: string; zh: string };
  tag: { es: string; en: string; zh: string };
  pricePen: number;
  image: string;
  icon: typeof Utensils;
  description: { es: string; en: string; zh: string };
  highlights: { es: string[]; en: string[]; zh: string[] };
}

const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: 'essentials',
    name: { es: 'Paquete Essentials', en: 'Essentials Package', zh: 'Essentials 精选套餐' },
    badge: { es: 'Celebración Íntima', en: 'Intimate Gathering', zh: '私密温馨庆典' },
    pricePen: 15000,
    maxGuests: 50,
    subtitle: {
      es: 'Ideal para ceremonias boutique frente al mar o en patio colonial con sus seres más cercanos.',
      en: 'Ideal for boutique oceanfront or colonial courtyard vows with your closest circle.', zh: '专为至亲好友打造的精品海滨或殖民庭院誓言仪式，温馨而私密。'
    },
    inclusions: {
      es: [
        'Decoración floral de ceremonia y centros de mesa estacionales',
        'Catering gourmet de 3 tiempos y mesa de quesos andinos',
        'Barra abierta de bienvenida con Pisco Sour y chilcanos (3 h)',
        'Coordinadora dedicada el día del evento y protocolo completo',
        'Musicalización ambiental y sistema de audio profesional',
        'Noche de bodas cortesía en Junior Suite con desayuno en terraza'
      ],
      en: [
        'Seasonal floral ceremony arch and curated table centerpieces',
        '3-course gourmet plated dinner and Andean artisan cheese display',
        'Welcome open craft Pisco Sour & chilcano bar (3 hours)',
        'Dedicated day-of wedding coordinator and full ceremony timeline',
        'Curated acoustic sound system and ambient lighting',
        'Complimentary wedding night in a Junior Suite with terrace breakfast'
      ], zh: ['应季花艺仪式拱门与精心设计的餐桌花艺', '三道式美食晚宴及安第斯手工奶酪拼盘', '迎宾精酿皮斯科酸酒与奇尔卡诺鸡尾酒畅饮吧（3小时）', '婚礼当天专属统筹师与完整仪式流程把控', '精心调校的音响系统与氛围灯光', '赠送一晚初级套房新婚之夜，含露台早餐']
    }
  },
  {
    id: 'premium',
    name: { es: 'Paquete Premium', en: 'Premium Package', zh: 'Premium 尊享套餐' },
    badge: { es: 'Más Solicitado', en: 'Most Popular', zh: '最受欢迎' },
    pricePen: 28000,
    maxGuests: 150,
    featured: true,
    subtitle: {
      es: 'El equilibrio perfecto entre arquitectura peruana, banquete de autor y fiesta hasta el amanecer.',
      en: 'The quintessential blend of Peruvian architecture, chef banquet, and celebration until dawn.', zh: '秘鲁建筑之美、主厨盛宴与通宵狂欢的完美融合。'
    },
    inclusions: {
      es: [
        'Diseño integral de decoración, iluminación cálida y mobiliario lounge',
        'Catering Cocktail Gala + Banquete Nupcial de 4 pasos con degustación previa',
        'Barra libre premium nacional e internacional por 5 horas + cava de brindis',
        'Coordinadora Senior durante 6 meses de planificación y ensayo general',
        'Musicalización con DJ residente, pista iluminada y hora loca elegante',
        '2 noches en Master Suite Vista al Mar o Valle + acceso Spa Termal en pareja'
      ],
      en: [
        'Full floral styling, warm architectural lighting, and lounge seating',
        'Welcome Gala Cocktail + 4-course signature banquet with prior tasting',
        '5-hour premium open bar plus sparkling champagne toast service',
        'Senior Wedding Planner for 6 months of prep and rehearsal coordination',
        'Resident DJ, illuminated dance floor, and curated late-night set',
        '2 nights in a Master Suite plus private Thermal Stone Spa ritual'
      ], zh: ['全套花艺造型、温暖的建筑灯光与休闲沙发区', '迎宾鸡尾酒会 + 四道式招牌婚宴（含提前试菜）', '5小时高端畅饮酒吧，另含香槟敬酒服务', '资深婚礼策划师提供6个月筹备及彩排统筹', '驻场DJ、发光舞池与精心编排的深夜歌单', '2晚豪华主套房，另含私人温泉石疗水疗仪式']
    }
  },
  {
    id: 'grand-luxe',
    name: { es: 'Paquete Grand Luxe', en: 'Grand Luxe Package', zh: 'Grand Luxe 至尊奢华套餐' },
    badge: { es: 'Exclusividad Total', en: 'Full Estate Buyout', zh: '整座庄园专享' },
    pricePen: 55000,
    maxGuests: 350,
    subtitle: {
      es: 'Privatización de jardines o salones principales para una boda de destino inolvidable de fin de semana.',
      en: 'Private estate lawns or grand ballroom buyout for an unforgettable destination wedding weekend.', zh: '包下庄园草坪或大宴会厅，打造难忘的目的地婚礼周末。'
    },
    inclusions: {
      es: [
        'Dirección artística de floristería de autor, toldo arquitectónico y cristalería fina',
        'Banquete Nupcial de 5 pasos con maridaje sommelier y estación criolla de trasnoche',
        'Barra libre de autor ilimitada (6 h), estación de gin botánico y champagne francés',
        'Equipo completo de coordinación (Directora + 3 asistentes) desde el día cero',
        'Orquesta en vivo o banda de cámara + DJ, sonido 4K e iluminación escénica',
        'Villa Privada para los novios (3 noches) y tarifa preferencial para invitados'
      ],
      en: [
        'Bespoke floral art direction, architectural marquee, and fine crystal tableware',
        '5-course sommelier-paired banquet plus midnight Peruvian street-food cart',
        'Unlimited signature open bar (6 h), botanical gin cart, and French champagne',
        'Full planning team (Lead Director + 3 assistants) from day one',
        'Live chamber ensemble or band + resident DJ, 4K audio, and stage lighting',
        'Private Bridal Villa (3 nights) plus preferential room block for guests'
      ], zh: ['定制花艺艺术总监、建筑式大帐篷与精美水晶餐具', '五道式侍酒师配酒婚宴，另设午夜秘鲁街头美食车', '无限量招牌畅饮酒吧（6小时）、植物琴酒车与法国香槟', '从第一天起配备完整策划团队（总监 + 3名助理）', '现场室内乐团或乐队 + 驻场DJ、4K级音响与舞台灯光', '新人专属私人别墅（3晚），并为宾客提供优惠客房']
    }
  }
];

const CATERING_PACKAGES: CateringTier[] = [
  {
    id: 'coffee-break',
    title: { es: 'Coffee Break', en: 'Artisan Coffee Break', zh: '精品茶歇' },
    tag: { es: 'Mañanas & Recepciones', en: 'Mornings & Receptions', zh: '晨间活动与招待会' },
    pricePen: 45,
    image: HOTEL_MEDIA.breakfastTable,
    icon: Coffee,
    description: {
      es: 'Café de especialidad de Chanchamayo, infusiones de muña y hierba luisa, jugos prensados, croissant de mantequilla y bocaditos dulces y salados.',
      en: 'Single-estate Peruvian coffee, Andean herbal teas, cold-pressed juices, butter croissants, and savory sourdough bites.', zh: '单一庄园秘鲁咖啡、安第斯草本茶、冷压果汁、黄油羊角包及咸味酸面包小点。'
    },
    highlights: {
      es: ['Estación continua por 2 horas', 'Opciones veganas y sin gluten', 'Vajilla de cerámica artesanal'],
      en: ['Continuous 2-hour station', 'Vegan & gluten-free options', 'Artisan stoneware service'], zh: ['持续2小时的茶歇台', '提供纯素与无麸质选择', '手工陶瓷餐具']
    }
  },
  {
    id: 'buffet-criollo',
    title: { es: 'Buffet Criollo', en: 'Peruvian Heritage Buffet', zh: '秘鲁传统自助餐' },
    tag: { es: 'Almuerzos & Celebraciones', en: 'Luncheons & Family Feasts', zh: '午宴与家庭聚餐' },
    pricePen: 95,
    image: HOTEL_MEDIA.sacredValley,
    icon: Utensils,
    description: {
      es: 'Barra fría de ceviches y causas limeñas, fondos clásicos como Lomo Saltado al wok y Seco norteño, más mesa de suspiro a la limeña y mazamorra.',
      en: 'Live ceviche and causa station, wok-fired Lomo Saltado and braised classics, paired with traditional Lima desserts.', zh: '现场制作酸橘汁腌鱼与土豆鱼泥卷，镬气十足的炒牛肉及经典炖菜，搭配利马传统甜点。'
    },
    highlights: {
      es: ['Chef en vivo en estación fría', '3 fondos y 4 guarniciones', 'Mesa de postres de convento'],
      en: ['Live chef cold station', '3 mains & 4 heritage sides', 'Traditional Peruvian dessert bar'], zh: ['主厨现场冷盘台', '3道主菜与4款传统配菜', '秘鲁传统甜点台']
    }
  },
  {
    id: 'cocktail-gala',
    title: { es: 'Cocktail Gala', en: 'Gala Cocktail & Pisco Bar', zh: '盛会鸡尾酒与皮斯科吧' },
    tag: { es: 'Cócteles & Aniversarios', en: 'Sunset Mixers & Galas', zh: '日落社交与盛会' },
    pricePen: 120,
    image: HOTEL_MEDIA.bayResort,
    icon: Wine,
    description: {
      es: '10 variedades de canapés fríos y calientes pasados en bandeja, tabla de quesos madurados del Valle Sagrado y barra de Pisco Sour y espumantes.',
      en: '10 passed hot and cold hors d’oeuvres, Sacred Valley aged cheese board, and open craft Pisco & sparkling wine bar.', zh: '10款冷热开胃小点由侍者托盘递送，配神圣山谷熟成奶酪拼盘，以及精酿皮斯科与气泡酒畅饮吧。'
    },
    highlights: {
      es: ['Servicio de mozos guante blanco', 'Barra libre de autor por 3 horas', 'Estación de ostras o tiraditos'],
      en: ['White-glove butler service', '3-hour craft open bar', 'Fresh tiradito or oyster bar'], zh: ['白手套管家式服务', '3小时精酿畅饮吧', '新鲜生鱼片或生蚝吧']
    }
  },
  {
    id: 'banquete-nupcial',
    title: { es: 'Banquete Nupcial', en: 'Signature Wedding Banquet', zh: '招牌婚宴' },
    tag: { es: 'Bodas & Grandes Galas', en: 'Weddings & Grand Galas', zh: '婚礼与盛大晚宴' },
    pricePen: 165,
    image: HOTEL_MEDIA.villaTerrace,
    icon: GlassWater,
    description: {
      es: 'Cena de gala emplatada de 4 pasos diseñada por nuestro Chef Ejecutivo, maridaje de vinos reserva, copa de champagne para el brindis y trasnoche.',
      en: '4-course plated dinner curated by our Executive Chef, reserve wine pairings, champagne toast, and late-night bites.', zh: '由行政主厨精心设计的四道式晚宴，搭配珍藏葡萄酒、香槟敬酒与深夜小食。'
    },
    highlights: {
      es: ['Degustación previa para 4 personas', 'Menús impresos en papel algodón', 'Torta nupcial o mesa de dulces'],
      en: ['Pre-wedding tasting for 4', 'Cotton-paper printed menus', 'Wedding cake or dessert table'], zh: ['婚前试菜（4人）', '棉纸印制菜单', '婚礼蛋糕或甜品台']
    }
  }
];

const VENUE_CAPACITIES = [
  {
    venue: { es: 'Gran Salón Miraflores', en: 'Miraflores Grand Ballroom', zh: '米拉弗洛雷斯大宴会厅' },
    city: { es: 'Lima', en: 'Lima', zh: '利马' },
    capacity: {
      es: '350 pax Banquete · 450 pax Cóctel',
      en: '350 guests Banquet · 450 guests Cocktail',
      zh: '宴会 350 人 · 鸡尾酒会 450 人'
    },
    setting: { es: 'Salón acústico con foyer y terraza privada', en: 'Acoustic ballroom with foyer & terrace', zh: '配前厅与露台的声学宴会厅' }
  },
  {
    venue: { es: 'Jardines Sanctuary Valle Sagrado', en: 'Sanctuary Sacred Valley Gardens', zh: '神圣山谷庇护所花园' },
    city: { es: 'Cusco', en: 'Cusco', zh: '库斯科' },
    capacity: {
      es: '200 pax Banquete · 260 pax Ceremonia',
      en: '200 guests Banquet · 260 guests Ceremony',
      zh: '宴会 200 人 · 仪式 260 人'
    },
    setting: { es: 'Jardines frente al río Urubamba y los Andes', en: 'Urubamba riverside lawns & Andean peaks', zh: '乌鲁班巴河畔草坪与安第斯雪峰' }
  },
  {
    venue: { es: 'Terraza Bahía de Paracas', en: 'Paracas Bay Terrace', zh: '帕拉卡斯湾露台' },
    city: { es: 'Ica', en: 'Ica', zh: '伊卡' },
    capacity: {
      es: '80 pax Banquete · 120 pax Cóctel',
      en: '80 guests Banquet · 120 guests Cocktail',
      zh: '宴会 80 人 · 鸡尾酒会 120 人'
    },
    setting: { es: 'Deck frente al océano al atardecer', en: 'Oceanfront sunset deck & pergola', zh: '海滨日落观景台与藤架' }
  },
  {
    venue: { es: 'Patio de los Naranjos Boutique', en: 'Boutique Orange Tree Courtyard', zh: '精品橙树庭院' },
    city: { es: 'Lima / Cusco', en: 'Lima / Cusco', zh: '利马 / 库斯科' },
    capacity: {
      es: '50 pax Banquete · 70 pax Íntimo',
      en: '50 guests Banquet · 70 guests Intimate',
      zh: '宴会 50 人 · 私密聚会 70 人'
    },
    setting: { es: 'Claustro privado bajo pérgola iluminada', en: 'Private lit colonial courtyard', zh: '灯光璀璨的私人殖民庭院' }
  }
];

const GALLERY_ITEMS = [
  {
    image: HOTEL_MEDIA.villaTerrace,
    location: { es: 'Sanctuary Valle Sagrado · Cusco', en: 'Sanctuary Sacred Valley · Cusco', zh: '神圣山谷庇护所 · 库斯科' },
    title: { es: 'Ceremonia al aire libre bajo pérgola andina', en: 'Open-air ceremony beneath Andean pergola', zh: '安第斯藤架下的露天仪式' },
    span: 'lg:col-span-7'
  },
  {
    image: HOTEL_MEDIA.suiteMaster,
    location: { es: 'Miraflores Signature · Lima', en: 'Miraflores Signature · Lima', zh: '米拉弗洛雷斯 Signature · 利马' },
    title: { es: 'Preparativos nupciales en Master Suite con luz natural', en: 'Bridal morning preparations in Master Suite', zh: '主套房内的新娘晨间准备' },
    span: 'lg:col-span-5'
  },
  {
    image: HOTEL_MEDIA.bayResort,
    location: { es: 'Resort Bahía de Paracas · Ica', en: 'Paracas Bay Resort · Ica', zh: '帕拉卡斯湾度假村 · 伊卡' },
    title: { es: 'Cóctel de bienvenida frente al Pacífico al caer el sol', en: 'Sunset welcome cocktail overlooking the Pacific', zh: '日落时分俯瞰太平洋的迎宾鸡尾酒' },
    span: 'lg:col-span-5'
  },
  {
    image: HOTEL_MEDIA.sacredValley,
    location: { es: 'Jardines del Urubamba · Valle Sagrado', en: 'Urubamba Gardens · Sacred Valley', zh: '乌鲁班巴花园 · 神圣山谷' },
    title: { es: 'Banquete bajo carpa transparente rodeado de montañas', en: 'Glass-marquee reception framed by the Andes', zh: '安第斯群山环绕的玻璃帐篷宴会' },
    span: 'lg:col-span-7'
  }
];

interface Opt {
  key: string;
  es: string;
  en: string;
  zh: string;
}

const LEAD_DEST: Opt[] = [
  { key: 'Miraflores, Lima (Salones 4K)', es: 'Miraflores · Lima (Salones 4K)', en: 'Miraflores · Lima (4K Ballrooms)', zh: '米拉弗洛雷斯 · 利马（4K 宴会厅）' },
  { key: 'Valle Sagrado, Cusco (Jardines & Salón Colonial)', es: 'Valle Sagrado · Cusco (Jardines & Salón)', en: 'Sacred Valley · Cusco (Gardens & Hall)', zh: '神圣山谷 · 库斯科（花园与殖民宴会厅）' },
  { key: 'Bahía de Paracas, Ica (Terrazas Frente al Mar)', es: 'Paracas · Ica (Terrazas al Mar)', en: 'Paracas · Ica (Oceanfront Terraces)', zh: '帕拉卡斯 · 伊卡（海滨露台）' }
];

const LEAD_CAP: Opt[] = [
  { key: 'Hasta 50 personas', es: 'Hasta 50 personas', en: 'Up to 50 guests', zh: '最多 50 位宾客' },
  { key: '50 a 100 personas', es: '50 a 100 personas', en: '50 to 100 guests', zh: '50 至 100 位宾客' },
  { key: '100 a 250 personas', es: '100 a 250 personas', en: '100 to 250 guests', zh: '100 至 250 位宾客' },
  { key: 'Más de 250 personas', es: 'Más de 250 personas', en: 'Over 250 guests', zh: '250 位以上大型峰会' }
];

const LEAD_DUR: Opt[] = [
  { key: 'Medio día (4 a 5 horas)', es: 'Medio día (4 a 5 horas)', en: 'Half day (4 to 5 hours)', zh: '半日 (4-5小时)' },
  { key: '1', es: '1 día completo (8 horas)', en: '1 full day (8 hours)', zh: '1个整天 (8小时)' },
  { key: '2 a 3', es: '2 a 3 días con hospedaje', en: '2 to 3 days with lodging', zh: '2至3天会议/研讨（含住宿）' },
  { key: 'Más de 3', es: 'Más de 3 días', en: 'More than 3 days', zh: '多日大会或定制峰会' }
];

const LEAD_FOOD: Opt[] = [
  { key: 'Coffee Break Continuo', es: 'Coffee Break Continuo & Bebidas', en: 'Continuous Coffee Break & Beverages', zh: '全天不间断精品茶歇与饮品' },
  { key: 'Buffet Criollo & Internacional', es: 'Buffet Criollo & Internacional', en: 'Peruvian & International Buffet', zh: '秘鲁风味与国际自助盛宴' },
  { key: 'Banquete de Gala 4 Pasos', es: 'Banquete de Gala 4 Pasos', en: '4-Course Gala Banquet', zh: '主厨四道式晚宴' },
  { key: 'Cóctel & Bocaditos', es: 'Cóctel & Bocaditos', en: 'Cocktail & Canapés', zh: '名酒鸡尾酒会与精选小食' },
  { key: 'Solo Alquiler de Sala', es: 'Solo alquiler de sala (Sin catering)', en: 'Venue rental only (no catering)', zh: '仅租用场地/暂不需餐饮' }
];

const VENUE_OPTIONS: Opt[] = [
  { key: 'Valle Sagrado (Cusco)', es: 'Sanctuary Valle Sagrado (Cusco)', en: 'Sanctuary Sacred Valley (Cusco)', zh: '神圣山谷庇护所（库斯科）' },
  { key: 'Bahía de Paracas (Ica)', es: 'Resort Bahía de Paracas (Ica)', en: 'Paracas Bay Resort (Ica)', zh: '帕拉卡斯湾度假村（伊卡）' },
  { key: 'Miraflores Signature (Lima)', es: 'Miraflores Signature (Lima)', en: 'Miraflores Signature (Lima)', zh: '米拉弗洛雷斯 Signature（利马）' },
  { key: 'Patio Colonial Cusco', es: 'Patio Colonial Cusco', en: 'Colonial Courtyard Cusco', zh: '库斯科殖民庭院' }
];

const STYLE_OPTIONS: Opt[] = [
  { key: 'Romántica al aire libre en jardín', es: 'Romántica al aire libre en jardín', en: 'Romantic Open-Air Garden', zh: '浪漫露天花园' },
  { key: 'Atardecer frente al mar (Boho Chic)', es: 'Atardecer frente al mar', en: 'Oceanfront Sunset', zh: '海滨日落' },
  { key: 'Gala nocturna de etiqueta en salón', es: 'Gala nocturna de etiqueta en salón', en: 'Black-Tie Ballroom Gala', zh: '正装宴会厅晚宴' },
  { key: 'Ceremonia andina tradicional & banquete', es: 'Ceremonia andina & banquete boutique', en: 'Andean Heritage & Boutique Dinner', zh: '安第斯传统仪式与精品晚宴' }
];

const BUDGET_OPTIONS: Opt[] = [
  { key: 'S/ 15,000 - S/ 25,000 (Essentials)', es: 'S/ 15,000 - S/ 25,000 (Essentials)', en: 'S/ 15,000 - S/ 25,000 (Essentials)', zh: 'S/ 15,000 - S/ 25,000（Essentials 精选）' },
  { key: 'S/ 28,000 - S/ 45,000 (Premium)', es: 'S/ 28,000 - S/ 45,000 (Premium)', en: 'S/ 28,000 - S/ 45,000 (Premium)', zh: 'S/ 28,000 - S/ 45,000（Premium 尊享）' },
  { key: 'Más de S/ 55,000 (Grand Luxe)', es: 'Desde S/ 55,000 (Grand Luxe)', en: 'From S/ 55,000 (Grand Luxe)', zh: 'S/ 55,000 起（Grand Luxe 至尊奢华）' }
];

const EXTRA_OPTIONS: Opt[] = [
  { key: 'Decoración floral de autor', es: 'Decoración floral de autor', en: 'Bespoke floral styling', zh: '定制花艺装饰' },
  { key: 'Música en vivo / DJ', es: 'Música en vivo / DJ', en: 'Live ensemble / DJ', zh: '现场乐队 / DJ' },
  { key: 'Alojamiento de invitados', es: 'Alojamiento de invitados', en: 'Guest room block', zh: '宾客住宿安排' },
  { key: 'Ritual de Spa pre-boda', es: 'Ritual de Spa pre-boda', en: 'Pre-wedding Spa ritual', zh: '婚前水疗仪式' },
  { key: 'Fotografía y cine nupcial', es: 'Fotografía y cine nupcial', en: 'Photography & film crew', zh: '婚礼摄影与摄像' },
  { key: 'Traslados privados SUV', es: 'Traslados privados SUV', en: 'Private SUV transfers', zh: 'SUV 私人接送' }
];

export const EventosPage: React.FC = () => {
  const { lang, formatRate, buildWhatsAppUrl } = useSolana();
  const l: 'es' | 'en' | 'zh' = lang === 'es' ? 'es' : lang === 'zh' ? 'zh' : 'en';
  const tr = (es: string, en: string, zh: string) => (l === 'es' ? es : l === 'zh' ? zh : en);
  const [activeTab, setActiveTab] = useState<CelebrationTab>('bodas');

  // Casa Andina Pattern Direct Event Inquiries (Image 4 Reference)
  const [leadType, setLeadType] = useState<'corporativo' | 'social'>('corporativo');
  const [leadNombre, setLeadNombre] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadTelefono, setLeadTelefono] = useState('');
  const [leadRuc, setLeadRuc] = useState('');
  const [leadEmpresa, setLeadEmpresa] = useState('');
  const [leadFecha, setLeadFecha] = useState('2026-11-20');
  const [leadDuracion, setLeadDuracion] = useState('1');
  const [leadDestino, setLeadDestino] = useState('Miraflores, Lima (Salones 4K)');
  const [leadCapacidad, setLeadCapacidad] = useState('50 a 100 personas');
  const [leadAlimento, setLeadAlimento] = useState('Buffet Criollo & Internacional');
  const [leadTerms, setLeadTerms] = useState(false);
  const [leadMarketing, setLeadMarketing] = useState(false);
  const [leadEnviado, setLeadEnviado] = useState(false);

  const optLabelLead = (list: Opt[], key: string) => {
    const o = list.find((x) => x.key === key);
    return o ? o[l] : key;
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadNombre && leadEmail && leadTelefono && leadTerms) {
      setLeadEnviado(true);
    }
  };

  // Quote Form State
  const [coupleNames, setCoupleNames] = useState('');
  const [tentativeDate, setTentativeDate] = useState('2026-10-17');
  const [venuePlace, setVenuePlace] = useState('Valle Sagrado (Cusco)');
  const [guestCount, setGuestCount] = useState('80-120');
  const [weddingStyle, setWeddingStyle] = useState('Romántica al aire libre en jardín');
  const [budgetRange, setBudgetRange] = useState('S/ 28,000 - S/ 45,000 (Premium)');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [extraServices, setExtraServices] = useState<string[]>([
    'Decoración floral de autor',
    'Música en vivo / DJ',
    'Alojamiento de invitados'
  ]);
  const [submitted, setSubmitted] = useState(false);

  const optLabel = (list: Opt[], key: string) => {
    const o = list.find((x) => x.key === key);
    return o ? o[l] : key;
  };

  const toggleExtraService = (service: string) => {
    setExtraServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleNames.trim() || !contactEmail.trim()) return;
    setSubmitted(true);
  };

  const extrasText = extraServices.map((k) => optLabel(EXTRA_OPTIONS, k)).join(l === 'zh' ? '、' : ', ');
  const weddingWhatsAppMessage =
    l === 'es'
      ? `Hola Valeria, Área de Bodas & Eventos de Casa Solana. Somos ${coupleNames || 'una pareja interesada'} y deseamos cotizar nuestra celebración en ${optLabel(VENUE_OPTIONS, venuePlace)} para aprox. ${guestCount} invitados el ${tentativeDate}. Estilo: ${optLabel(STYLE_OPTIONS, weddingStyle)}. Presupuesto estimado: ${optLabel(BUDGET_OPTIONS, budgetRange)}. Servicios: ${extrasText || 'Por definir'}.`
      : l === 'zh'
      ? `您好 Valeria，Casa Solana 婚礼与活动部。我们是${coupleNames || '一对准新人'}，想咨询在${optLabel(VENUE_OPTIONS, venuePlace)}举办庆典，约${guestCount}位宾客，日期为${tentativeDate}。风格：${optLabel(STYLE_OPTIONS, weddingStyle)}。预估预算：${optLabel(BUDGET_OPTIONS, budgetRange)}。附加服务：${extrasText || '待定'}。`
      : `Hello Valeria, Casa Solana Weddings & Events. We are ${coupleNames || 'an engaged couple'} inquiring about a celebration at ${optLabel(VENUE_OPTIONS, venuePlace)} for approx. ${guestCount} guests on ${tentativeDate}. Style: ${optLabel(STYLE_OPTIONS, weddingStyle)}. Budget: ${optLabel(BUDGET_OPTIONS, budgetRange)}. Extras: ${extrasText || 'TBD'}.`;

  const socialCategories = [
    {
      icon: Sparkles,
      title: { es: 'Cumpleaños & Cenas Privadas', en: 'Milestone Birthdays & Private Dinners', zh: '重要生日与私人晚宴' },
      capacity: { es: '20 - 120 pax', en: '20 - 120 guests', zh: '20 - 120 人' },
      desc: {
        es: 'Mesas largas con iluminación de velas, menú degustación de 4 tiempos y sommelier dedicado en salones privados o terrazas.',
        en: 'Candlelit long-table dinners, 4-course chef tasting menus, and dedicated sommeliers in private salons or terraces.', zh: '烛光长桌晚宴、主厨四道式品鉴菜单，并在私人沙龙或露台配专属侍酒师。'
      }
    },
    {
      icon: Heart,
      title: { es: 'Aniversarios & Renovación de Votos', en: 'Anniversaries & Vow Renewals', zh: '纪念日与誓言重温' },
      capacity: { es: '2 - 80 pax', en: '2 - 80 guests', zh: '2 - 80 人' },
      desc: {
        es: 'Ceremonias simbólicas al atardecer frente al mar de Paracas o en los jardines del Valle Sagrado con brindis de champagne.',
        en: 'Symbolic sunset ceremonies overlooking Paracas Bay or the Sacred Valley gardens with champagne service.', zh: '在帕拉卡斯湾海景或神圣山谷花园举行日落象征性仪式，并提供香槟服务。'
      }
    },
    {
      icon: Wine,
      title: { es: 'Despedidas Íntimas & Pedidas de Mano', en: 'Elegant Bridal Showers & Proposals', zh: '优雅的告别单身派对与求婚' },
      capacity: { es: '10 - 60 pax', en: '10 - 60 guests', zh: '10 - 60 人' },
      desc: {
        es: 'Tardes de té gourmet, brunch dominical en patio colonial o montajes privados sorpresa para una pedida inolvidable.',
        en: 'Gourmet afternoon tea, courtyard Sunday brunch, or bespoke private terrace setups for unforgettable proposals.', zh: '美食下午茶、庭院周日早午餐，或为难忘求婚定制的私人露台布置。'
      }
    },
    {
      icon: Flower2,
      title: { es: 'Baby Showers & Bautizos', en: 'Baby Showers & Christenings', zh: '宝宝派对与洗礼' },
      capacity: { es: '25 - 100 pax', en: '25 - 100 guests', zh: '25 - 100 人' },
      desc: {
        es: 'Ambientes bañados en luz natural con pastelería artesanal, estación de infusiones orgánicas y coordinación completa.',
        en: 'Sunlit garden pavilions with artisan patisserie, organic infusion bars, and seamless family hospitality.', zh: '阳光洒落的花园亭阁，配手工糕点、有机花草茶吧与无微不至的家庭款待。'
      }
    }
  ];

  const planningSteps = [
    {
      step: '01',
      title: { es: 'Visión & Elección de Sede', en: 'Vision & Venue Selection', zh: '愿景与场地选择' },
      desc: {
        es: 'Recorrido privado por nuestros patios de Miraflores, jardines del Valle Sagrado o terrazas frente al mar en Paracas.',
        en: 'Private walkthrough of our Miraflores courtyards, Sacred Valley lawns, or Paracas ocean terraces.', zh: '私人导览米拉弗洛雷斯庭院、神圣山谷草坪或帕拉卡斯海滨露台。'
      }
    },
    {
      step: '02',
      title: { es: 'Diseño Culinario & Degustación', en: 'Culinary Design & Tasting', zh: '餐饮设计与试菜' },
      desc: {
        es: 'Encuentro con nuestro Chef Ejecutivo y Sommelier para personalizar el menú nupcial, coctelería y mesa de postres.',
        en: 'Private tasting with our Executive Chef and Sommelier to tailor courses, craft cocktails, and desserts.', zh: '与行政主厨和侍酒师私人品鉴，量身定制菜品、特调鸡尾酒与甜点。'
      }
    },
    {
      step: '03',
      title: { es: 'Arquitectura Floral & Ritmos', en: 'Floral Styling & Timeline', zh: '花艺造型与流程安排' },
      desc: {
        es: 'Curaduría de flores peruanas de temporada, iluminación cálida, sonido en vivo y bloqueo de suites para sus invitados.',
        en: 'Seasonal Peruvian florals, warm architectural lighting, live acoustics, and curated guest room blocks.', zh: '应季秘鲁花卉、温暖的建筑灯光、现场原声音乐及精选宾客客房。'
      }
    },
    {
      step: '04',
      title: { es: 'Celebración Sin Preocupaciones', en: 'Effortless Celebration Day', zh: '轻松无忧的庆典之日' },
      desc: {
        es: 'Nuestra coordinadora dirige cada minuto entre bastidores para que ustedes solo disfruten el momento.',
        en: 'Our lead planner orchestrates every behind-the-scenes cue so you remain fully present.', zh: '我们的首席策划师统筹幕后每一个环节，让您全心享受当下。'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#111317]">
      {/* 1. HERO SPLIT SECTION (Exact to Casa Andina Reference Image 4) */}
      <section className="relative w-full overflow-hidden bg-[#120E0C] text-white py-12 lg:py-20 border-b border-[#30221A]">
        {/* Background dark wood & conference ambience */}
        <div className="absolute inset-0 z-0">
          <img
            src={HOTEL_MEDIA.corpBoardroomGlass}
            alt="Casa Solana Eventos y Convenciones"
            className="w-full h-full object-cover object-center opacity-25 filter brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0908]/95 via-[#140F0D]/90 to-[#0C0908]/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Bold Casa Andina Editorial Presentation */}
            <div className="lg:col-span-6 space-y-8 text-white">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-[#C88A36]">
                  {lang === 'zh' ? '秘鲁会议与定制庆典' : lang === 'es' ? 'CASA SOLANA HOTELES PERÚ' : 'CASA SOLANA HOTELS PERU'}
                </span>
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] text-white">
                  {lang === 'zh' ? (
                    <>
                      您的专属盛会，
                      <br />
                      <span className="text-[#F4B41A]">遍布秘鲁荣耀胜地</span>
                    </>
                  ) : lang === 'es' ? (
                    <>
                      TU EVENTO,
                      <br />
                      <span className="text-white">EN CUALQUIER LUGAR DEL PERÚ</span>
                    </>
                  ) : (
                    <>
                      YOUR EVENT,
                      <br />
                      <span className="text-white">ACROSS PERU’S PREMIER ENCLAVES</span>
                    </>
                  )}
                </h1>
              </div>

              {/* Big Metric Numbers (Exact to Casa Andina: 14 DESTINOS / +70 SALAS) */}
              <div className="flex items-center gap-10 sm:gap-14 border-y border-white/15 py-6">
                <div>
                  <div className="font-editorial text-4xl sm:text-5xl font-black text-white tracking-tight">
                    3
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#C88A36] mt-1">
                    {lang === 'zh' ? '三大地标胜地' : lang === 'es' ? 'DESTINOS' : 'DESTINATIONS'}
                  </div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <div className="font-editorial text-4xl sm:text-5xl font-black text-white tracking-tight">
                    +18
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#C88A36] mt-1">
                    {lang === 'zh' ? '多功能宴会厅与花园' : lang === 'es' ? 'SALAS & JARDINES' : 'HALLS & GARDENS'}
                  </div>
                </div>
              </div>

              {/* Event Type Bullets */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-light">
                <p className="font-semibold text-white">
                  {lang === 'zh' ? '全方位适配各类规格盛会：' : lang === 'es' ? 'Ambientes adaptados a cada tipo de evento:' : 'Venues tailored for every occasion:'}
                </p>
                <ul className="space-y-1.5 pl-4 list-disc text-white/80 marker:text-[#C88A36]">
                  <li>{lang === 'zh' ? '企业年会、董事会议与战略研讨' : lang === 'es' ? 'Corporativos (Congresos, Directorios & Retiros)' : 'Corporate (Summits, Boardrooms & Retreats)'}</li>
                  <li>{lang === 'zh' ? '社交名流宴会、庆典与周年晚宴' : lang === 'es' ? 'Sociales (Galas, Cumpleaños & Aniversarios)' : 'Social (Galas, Anniversaries & Birthdays)'}</li>
                  <li>{lang === 'zh' ? '安第斯与海滨唯美目的地婚礼' : lang === 'es' ? 'Bodas de Destino (Valle Sagrado, Miraflores & Paracas)' : 'Destination Weddings (Sacred Valley & Oceanfront)'}</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Floating White Direct Inquiry Form (Exact to Image 4) */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-[#141923] border border-slate-200">
                <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#141923] mb-4">
                  {lang === 'zh' ? '填写您的需求，我们将在最短时间内与您联络' : lang === 'es' ? 'Completa el formulario para ponernos en contacto' : 'Complete the form and our event planner will contact you'}
                </h2>

                {leadEnviado ? (
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h3 className="font-editorial text-lg font-bold text-emerald-950">
                      {lang === 'zh' ? '活动需求已成功提交！' : lang === 'es' ? '¡Solicitud recibida con éxito!' : 'Event Request Submitted!'}
                    </h3>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      {lang === 'zh'
                        ? '我们的专业会议与活动策划总监将尽快与您联系，为您呈送定制提案。'
                        : lang === 'es'
                        ? 'Un ejecutivo comercial de eventos se comunicará contigo al correo o WhatsApp indicado.'
                        : 'Our event specialist will contact you shortly with a personalized proposal.'}
                    </p>
                    <a
                      href={`https://wa.me/51986849173?text=${encodeURIComponent(
                        tr(
                          `Hola Casa Solana Eventos, soy ${leadNombre}. Acabo de solicitar información para un evento ${leadType} en ${leadDestino} para ${leadCapacidad}.`,
                          `Hello Casa Solana Events, I am ${leadNombre}. I just requested information for a ${leadType} event in ${optLabelLead(LEAD_DEST, leadDestino)} for ${optLabelLead(LEAD_CAP, leadCapacidad)}.`,
                          `您好 Casa Solana 活动部，我是${leadNombre}。我刚提交了${leadType === 'corporativo' ? '企业商务' : '社交庆典'}活动咨询，地点：${optLabelLead(LEAD_DEST, leadDestino)}，规模：${optLabelLead(LEAD_CAP, leadCapacidad)}。`
                        )
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors shadow-sm"
                    >
                      <WhatsAppLogo className="w-4 h-4 fill-white" />
                      <span>{tr('Coordinar directo por WhatsApp', 'Coordinate directly on WhatsApp', '立即通过 WhatsApp 咨询总监')}</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-xs">
                    {/* Radio Options: Corporativo vs Social */}
                    <div className="flex items-center gap-6 pb-2 border-b border-slate-100">
                      <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                        <input
                          type="radio"
                          name="leadType"
                          value="corporativo"
                          checked={leadType === 'corporativo'}
                          onChange={() => setLeadType('corporativo')}
                          className="accent-[#C88A36] w-4 h-4"
                        />
                        <span>{lang === 'zh' ? '企业商务活动' : lang === 'es' ? 'Evento corporativo' : 'Corporate event'}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                        <input
                          type="radio"
                          name="leadType"
                          value="social"
                          checked={leadType === 'social'}
                          onChange={() => setLeadType('social')}
                          className="accent-[#C88A36] w-4 h-4"
                        />
                        <span>{lang === 'zh' ? '社交庆典 / 婚礼' : lang === 'es' ? 'Evento social / Boda' : 'Social event / Wedding'}</span>
                      </label>
                    </div>

                    {/* Nombre y Apellido */}
                    <div>
                      <label className="block text-slate-600 mb-1 font-medium">
                        {lang === 'zh' ? '姓名*' : lang === 'es' ? 'Nombre y Apellido*' : 'Full Name*'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={tr('Ej: Valeria Benavides', 'e.g. Valeria Benavides', '请输入您的姓名')}
                        value={leadNombre}
                        onChange={(e) => setLeadNombre(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs"
                      />
                    </div>

                    {/* Correo | Celular */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">
                          {lang === 'zh' ? '电子邮箱*' : lang === 'es' ? 'Correo electrónico*' : 'Email*'}
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="contacto@empresa.com"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">
                          {lang === 'zh' ? '联系电话/手机*' : lang === 'es' ? 'Celular*' : 'Phone*'}
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+51 987 654 321"
                          value={leadTelefono}
                          onChange={(e) => setLeadTelefono(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs"
                        />
                      </div>
                    </div>

                    {/* RUC | Empresa */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">
                          {lang === 'zh' ? '税号 (RUC / ID)' : lang === 'es' ? 'Número de RUC (Opcional)' : 'Tax ID (Optional)'}
                        </label>
                        <input
                          type="text"
                          placeholder="20601234567"
                          value={leadRuc}
                          onChange={(e) => setLeadRuc(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">
                          {lang === 'zh' ? '公司 / 机构名称' : lang === 'es' ? 'Nombre de la empresa' : 'Company Name'}
                        </label>
                        <input
                          type="text"
                          placeholder={tr('Razón social', 'Registered company name', '如：安第斯控股集团')}
                          value={leadEmpresa}
                          onChange={(e) => setLeadEmpresa(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs"
                        />
                      </div>
                    </div>

                    {/* Section Subtitle: Datos del evento */}
                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        {lang === 'zh' ? '活动详情' : lang === 'es' ? 'Datos del evento:' : 'Event Details:'}
                      </span>
                    </div>

                    {/* Fecha | Duración */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="date"
                          required
                          value={leadFecha}
                          onChange={(e) => setLeadFecha(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs text-slate-700 bg-white"
                        />
                      </div>
                      <div>
                        <select
                          value={leadDuracion}
                          onChange={(e) => setLeadDuracion(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs text-slate-700 bg-white cursor-pointer"
                        >
                          {LEAD_DUR.map((o) => (
                            <option key={o.key} value={o.key}>
                              {o[l]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Destino | Capacidad */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <select
                          value={leadDestino}
                          onChange={(e) => setLeadDestino(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs text-slate-700 bg-white cursor-pointer"
                        >
                          {LEAD_DEST.map((o) => (
                            <option key={o.key} value={o.key}>
                              {o[l]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <select
                          value={leadCapacidad}
                          onChange={(e) => setLeadCapacidad(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs text-slate-700 bg-white cursor-pointer"
                        >
                          {LEAD_CAP.map((o) => (
                            <option key={o.key} value={o.key}>
                              {o[l]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Tipo de alimento */}
                    <div>
                      <select
                        value={leadAlimento}
                        onChange={(e) => setLeadAlimento(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs text-slate-700 bg-white cursor-pointer"
                      >
                          {LEAD_FOOD.map((o) => (
                            <option key={o.key} value={o.key}>
                              {o[l]}
                            </option>
                          ))}
                        </select>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={leadTerms}
                          onChange={(e) => setLeadTerms(e.target.checked)}
                          className="mt-0.5 accent-[#C88A36]"
                        />
                        <span>
                          {lang === 'zh'
                            ? '我已阅读并同意 Casa Solana Hoteles 的条款细则及隐私政策 *'
                            : lang === 'es'
                            ? 'Acepto los Términos y Condiciones de Casa Solana Hoteles y la Política de privacidad *'
                            : 'I accept the Terms & Conditions and Privacy Policy *'}
                        </span>
                      </label>
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={leadMarketing}
                          onChange={(e) => setLeadMarketing(e.target.checked)}
                          className="mt-0.5 accent-[#C88A36]"
                        />
                        <span>
                          {lang === 'zh'
                            ? '我同意接收活动策划方案、特惠礼遇及相关商业资讯'
                            : lang === 'es'
                            ? 'He leído y acepto el envío de publicidad y el tratamiento de mis datos para la finalidad opcional'
                            : 'I agree to receive promotional updates and event proposals'}
                        </span>
                      </label>
                    </div>

                    {/* Submit Button (Casa Andina Ochre #C88A36) */}
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#C88A36] hover:bg-[#b0782e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer mt-3"
                    >
                      {lang === 'zh' ? '立即提交咨询需求' : lang === 'es' ? 'Solicitar información' : 'Request Event Information'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABS PRINCIPALES + CONTENIDO DINÁMICO */}
      <section className="py-12 sm:py-16 bg-andean-pattern border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Tab Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="eyebrow-solana text-[#C88A36] block">
                {lang === 'es' ? 'Experiencias a Medida' : lang === 'zh' ? '定制庆典体验' : 'Curated Celebrations'}
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                {lang === 'es' ? 'Elige el capítulo de tu celebración' : lang === 'zh' ? '选择您的庆典篇章' : 'Choose your celebration chapter'}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label={tr('Categorías de eventos', 'Event categories', '活动类别')}>
              {(
                [
                  { id: 'bodas', es: 'Bodas de Destino', en: 'Destination Weddings', zh: '目的地婚礼' },
                  { id: 'sociales', es: 'Eventos Sociales', en: 'Social Events', zh: '社交庆典' },
                  { id: 'aniversarios', es: 'Aniversarios & Celebraciones', en: 'Anniversaries & Vows', zh: '纪念日与誓言' },
                  { id: 'quinceaneras', es: 'Quinceañeras', en: 'Quinceañeras', zh: '十五岁成人礼 (Quinceañera)' }
                ] as const
              ).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0A1D37] text-white shadow-sm'
                        : 'bg-white text-[#555E6B] border border-slate-200 hover:border-[#C88A36] hover:text-[#0A1D37]'
                    }`}
                  >
                    {tab[l]}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'bodas' && (
              <motion.div
                key="bodas"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-14"
              >
                {/* Lyrical Narrative & Venue Capacities */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <span className="eyebrow-solana text-[#D91E5B]">
                      {lang === 'es' ? 'Poesía Arquitectónica en Tres Paisajes' : lang === 'zh' ? '三大秘鲁标志性背景' : 'Three Iconic Peruvian Backdrops'}
                    </span>
                    <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1D37] leading-tight">
                      {lang === 'es'
                        ? 'Donde la cordillera, el desierto costero y la brisa de Lima sellan su promesa'
                        : lang === 'zh' ? '安第斯雪峰、海岸沙丘与利马庭院，见证您的誓言' : 'Where Andean peaks, coastal dunes, and Lima courtyards frame your vows'}
                    </h3>
                    <p className="text-sm sm:text-base text-[#555E6B] leading-relaxed">
                      {lang === 'es'
                        ? 'En Casa Solana concebimos cada boda como una obra íntima de hospitalidad peruana. Desde el sonido sereno del río Urubamba al caer la tarde hasta el resplandor dorado sobre la Bahía de Paracas, cuidamos la luz, los aromas florales, la música en vivo y cada plato servido en mesa.'
                        : lang === 'zh' ? '在 Casa Solana，每一场婚礼都是一件亲密的秘鲁待客艺术品。从黄昏时乌鲁班巴河的静谧韵律，到帕拉卡斯湾的金色倒影，我们精心雕琢每一枝花、每一款配酒、每一个音符。' : 'At Casa Solana, every wedding is composed as an intimate work of Peruvian hospitality. From the quiet cadence of the Urubamba river at dusk to golden reflections over Paracas Bay, we curate every floral stem, wine pairing, and acoustic note.'}
                    </p>
                  </div>

                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {VENUE_CAPACITIES.map((item) => (
                      <div
                        key={item.venue.es}
                        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C88A36]">
                            {item.city[l]}
                          </span>
                          <MapPin className="w-3.5 h-3.5 text-[#C88A36]" />
                        </div>
                        <h4 className="font-editorial text-lg font-bold text-[#0A1D37] leading-snug">{item.venue[l]}</h4>
                        <p className="text-xs font-bold text-[#D91E5B] mt-1 num-tabular">{item.capacity[l]}</p>
                        <p className="text-xs text-[#555E6B] mt-1">{item.setting[l]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4-Step Planning Process */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <span className="eyebrow-solana text-[#C88A36]">
                        {lang === 'es' ? 'Metodología Atelier Nupcial' : lang === 'zh' ? '专属策划之旅' : 'Bespoke Planning Journey'}
                      </span>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                        {lang === 'es' ? 'Proceso de planificación sin estrés' : lang === 'zh' ? '从容舒心的四阶段策划流程' : 'A serene four-stage planning flow'}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold text-[#555E6B]">
                      {lang === 'es'
                        ? 'Acompañamiento presencial y virtual para novios en Perú o el extranjero'
                        : lang === 'zh' ? '为身在秘鲁或海外的新人提供现场与线上策划服务' : 'On-site & virtual planning for couples in Peru and abroad'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {planningSteps.map((st) => (
                      <div key={st.step} className="p-5 rounded-2xl bg-[#FAF9F7] border border-slate-200/70 space-y-2">
                        <span className="font-editorial text-2xl font-bold text-[#C88A36] num-tabular block">
                          {st.step}
                        </span>
                        <h4 className="font-editorial text-lg font-bold text-[#0A1D37]">{st.title[l]}</h4>
                        <p className="text-xs text-[#555E6B] leading-relaxed">{st.desc[l]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wedding Packages (Essentials / Premium / Grand Luxe) */}
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="eyebrow-solana text-[#C88A36]">
                      {lang === 'es' ? 'Colección Nupcial Todo Incluido' : lang === 'zh' ? '全包式婚礼套餐' : 'All-Inclusive Wedding Tiers'}
                    </span>
                    <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1D37]">
                      {lang === 'es' ? 'Paquetes Nupciales Casa Solana' : lang === 'zh' ? 'Casa Solana 婚礼套餐' : 'Casa Solana Wedding Packages'}
                    </h3>
                    <p className="text-sm text-[#555E6B]">
                      {lang === 'es'
                        ? 'Cada paquete integra decoración floral, catering de autor, barra libre, coordinación experta y musicalización.'
                        : lang === 'zh' ? '每款套餐均包含花艺造型、招牌餐饮、畅饮酒吧、专属统筹与音乐。' : 'Every tier includes floral styling, signature catering, open bar, dedicated coordination, and music.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    {WEDDING_PACKAGES.map((pkg) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative rounded-2xl bg-white overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg ${
                          pkg.featured
                            ? 'border-2 border-[#C88A36] shadow-md'
                            : 'border border-slate-200/80 shadow-sm'
                        }`}
                      >
                        {/* Ribbon Corner */}
                        <div
                          className={`absolute top-0 right-0 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white ribbon-corner ${
                            pkg.featured ? 'bg-[#D91E5B]' : 'bg-[#0A1D37]'
                          }`}
                        >
                          {pkg.badge[l]}
                        </div>

                        <div className="p-6 sm:p-7 space-y-5">
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#C88A36]">
                              <Crown className="w-4 h-4" />
                              <span>
                                {tr(`Hasta ${pkg.maxGuests} personas`, `Up to ${pkg.maxGuests} guests`, `最多 ${pkg.maxGuests} 位宾客`)}
                              </span>
                            </div>
                            <h4 className="font-editorial text-2xl font-bold text-[#0A1D37]">{pkg.name[l]}</h4>
                            <p className="text-xs text-[#555E6B] leading-relaxed">{pkg.subtitle[l]}</p>
                          </div>

                          <div className="p-4 rounded-xl bg-[#FAF9F7] border border-slate-200/80">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#555E6B] block">
                              {lang === 'es' ? 'Inversión desde' : lang === 'zh' ? '起价' : 'Starting from'}
                            </span>
                            <div className="flex items-baseline justify-between gap-2 mt-0.5">
                              <span className="font-editorial text-3xl font-bold text-[#0A1D37] num-tabular">
                                S/ {pkg.pricePen.toLocaleString('en-US')}
                              </span>
                              <span className="text-xs font-bold text-[#C88A36] num-tabular">
                                {formatRate(Math.round(pkg.pricePen / 3.72))}
                              </span>
                            </div>
                          </div>

                          <ul className="space-y-2.5">
                            {pkg.inclusions[l].map((line: string, i: number) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-[#141923] leading-relaxed">
                                <Check className="w-4 h-4 text-[#C88A36] shrink-0 mt-0.5" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="px-6 pb-6 pt-2">
                          <a
                            href="#cotizador-bodas"
                            onClick={() =>
                              setBudgetRange(
                                pkg.id === 'essentials'
                                  ? 'S/ 15,000 - S/ 25,000 (Essentials)'
                                  : pkg.id === 'premium'
                                    ? 'S/ 28,000 - S/ 45,000 (Premium)'
                                    : 'Más de S/ 55,000 (Grand Luxe)'
                              )
                            }
                            className={`w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] ${
                              pkg.featured
                                ? 'bg-[#C88A36] hover:bg-[#AE7225] text-white'
                                : 'bg-[#0A1D37] hover:bg-[#C88A36] text-white'
                            }`}
                          >
                            <span>{lang === 'es' ? 'Seleccionar Paquete' : lang === 'zh' ? '选择套餐' : 'Select Package'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'sociales' && (
              <motion.div
                key="sociales"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <div className="max-w-3xl space-y-2">
                  <span className="eyebrow-solana text-[#C88A36]">
                    {lang === 'es' ? 'Momentos que Merecen Escenario Propio' : lang === 'zh' ? '值得铭记的相聚时刻' : 'Gatherings Worth Remembering'}
                  </span>
                  <h3 className="font-editorial text-3xl font-bold text-[#0A1D37]">
                    {lang === 'es'
                      ? 'Cumpleaños, Aniversarios, Despedidas y Baby Showers'
                      : lang === 'zh' ? '生日、纪念日、告别单身派对与宝宝派对' : 'Birthdays, Anniversaries, Bridal Showers & Baby Showers'}
                  </h3>
                  <p className="text-sm text-[#555E6B] leading-relaxed">
                    {lang === 'es'
                      ? 'Salones privados con luz natural, jardines con pérgola iluminada y terrazas frente al mar equipadas con gastronomía de autor y atención sin interrupciones.'
                      : lang === 'zh' ? '阳光洒落的私人沙龙、灯光璀璨的花园藤架与海滨露台，搭配行政主厨菜单与低调周到的款待。' : 'Sunlit private salons, illuminated garden pergolas, and oceanfront decks paired with executive chef menus and discreet hospitality.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {socialCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div
                        key={cat.title.es}
                        className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-[#0A1D37] text-[#C88A36] flex items-center justify-center">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-[#F2EFE9] text-[#0A1D37] text-[10px] font-bold uppercase tracking-wider num-tabular">
                              {cat.capacity[l]}
                            </span>
                          </div>
                          <h4 className="font-editorial text-xl font-bold text-[#0A1D37]">{cat.title[l]}</h4>
                          <p className="text-sm text-[#555E6B] leading-relaxed">{cat.desc[l]}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#C88A36]">
                            {lang === 'es' ? 'Incluye decoración base y coordinación' : lang === 'zh' ? '含基础布置与策划师' : 'Includes base styling & planner'}
                          </span>
                          <a
                            href="#cotizador-bodas"
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0A1D37] hover:text-[#C88A36]"
                          >
                            <span>{lang === 'es' ? 'Cotizar' : lang === 'zh' ? '立即咨询' : 'Inquire'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'aniversarios' && (
              <motion.div
                key="aniversarios"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="lg:col-span-5 relative min-h-[280px]">
                  <img
                    src={HOTEL_MEDIA.bayResort}
                    alt="Aniversarios frente al mar Casa Solana"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D91E5B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    {lang === 'es' ? 'Bodas de Plata & Oro' : lang === 'zh' ? '银婚与金婚纪念' : 'Silver & Golden Milestones'}
                  </span>
                </div>
                <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="eyebrow-solana text-[#C88A36]">
                      {lang === 'es' ? 'Renovación de Votos & Cenas Privadas' : lang === 'zh' ? '誓言重温与私人晚宴' : 'Vow Renewals & Private Dinners'}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                      {lang === 'es'
                        ? 'Celebrar el camino compartido en íntima serenidad'
                        : lang === 'zh' ? '在宁静私密中庆祝相伴的岁月' : 'Celebrating years together in serene intimacy'}
                    </h3>
                    <p className="text-sm text-[#555E6B] leading-relaxed">
                      {lang === 'es'
                        ? 'Ya sea una cena privada para dos en nuestra terraza de Paracas con violín en vivo o una recepción familiar para 100 invitados celebrando 25 o 50 años juntos, diseñamos la atmósfera perfecta.'
                        : lang === 'zh' ? '无论是在帕拉卡斯海滨烛光双人晚餐配现场弦乐，还是为25周年或50周年纪念举办百位宾客的家庭庆典，我们都为您量身定制每一刻。' : 'From a candlelit oceanfront table for two with live strings in Paracas to a 100-guest family tribute for 25th or 50th anniversaries, we tailor every moment.'}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {(l === 'es'
                        ? [
                            'Ceremonia simbólica andina o costera',
                            'Maridaje con vinos de colección privada',
                            'Música de cámara o trío criollo en vivo',
                            'Suite Master + circuito termal en pareja'
                          ]
                        : l === 'zh'
                        ? [
                            '安第斯或海滨象征性仪式',
                            '私人酒窖年份葡萄酒配餐',
                            '现场弦乐三重奏或原声乐队',
                            '主套房 + 双人温泉疗程'
                          ]
                        : [
                            'Symbolic Andean or coastal ceremony',
                            'Private cellar vintage wine pairings',
                            'Live string trio or acoustic ensemble',
                            'Master Suite + couples thermal circuit'
                          ]
                      ).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-[#141923]">
                          <Check className="w-4 h-4 text-[#C88A36] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                    <a
                      href="#cotizador-bodas"
                      className="px-5 py-3 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-extrabold uppercase tracking-wider transition-all"
                    >
                      {lang === 'es' ? 'Diseñar Aniversario' : lang === 'zh' ? '策划您的纪念日' : 'Plan Your Anniversary'}
                    </a>
                    <Link
                      to="/habitaciones"
                      className="px-5 py-3 rounded-xl bg-[#FAF9F7] border border-slate-200 text-[#0A1D37] text-xs font-bold uppercase tracking-wider hover:border-[#0A1D37] transition-colors"
                    >
                      {lang === 'es' ? 'Ver Suites para Novios' : lang === 'zh' ? '探索新人套房' : 'Explore Couple Suites'}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'quinceaneras' && (
              <motion.div
                key="quinceaneras"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="lg:col-span-5 relative min-h-[280px]">
                  <img
                    src={HOTEL_MEDIA.suiteMaster}
                    alt="Quinceañeras de etiqueta Casa Solana"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0A1D37] text-[#C88A36] text-[10px] font-extrabold uppercase tracking-wider">
                    {lang === 'es' ? 'Etiqueta & Alta Gastronomía' : lang === 'zh' ? '正装成人礼' : 'Black-Tie Debut'}
                  </span>
                </div>
                <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="eyebrow-solana text-[#D91E5B]">
                      {lang === 'es' ? 'Elegancia Contemporánea' : lang === 'zh' ? '当代优雅' : 'Contemporary Elegance'}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                      {lang === 'es'
                        ? 'Quinceañeras con sello editorial y seguridad integral'
                        : lang === 'zh' ? '兼具杂志级格调与私密安保的十五岁成人礼' : 'Quinceañeras crafted with editorial grace & private security'}
                    </h3>
                    <p className="text-sm text-[#555E6B] leading-relaxed">
                      {lang === 'es'
                        ? 'Un formato sofisticado pensado para la homenajeada, su familia y amigos: suite privada de preparación con luz natural, protocolo moderno, barra mocktail de autor y pista acústica de última generación.'
                        : lang === 'zh' ? '为主角及其家人精心设计的高雅庆典：阳光充足的梳妆套房、定制无酒精鸡尾酒吧、声学舞池与低调周到的款待。' : 'A refined celebration designed for the guest of honor and her family: sunlit dressing suite, bespoke zero-proof mocktail bar, acoustic dance floor, and discreet hospitality.'}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {(l === 'es'
                        ? [
                            'Suite de cortesía para arreglo y sesión fotográfica',
                            'Barra libre de mocktails botánicos y estación dulce',
                            'Menú diferenciado para adultos y jóvenes',
                            'Control de accesos y seguridad privada 24h'
                          ]
                        : l === 'zh'
                        ? [
                            '赠送梳妆与人像拍摄专属套房',
                            '植物无酒精鸡尾酒畅饮吧与甜品台',
                            '为成人与青少年量身定制的菜单',
                            '全天候私人安保与宾客签到管理'
                          ]
                        : [
                            'Complimentary suite for dressing & portraits',
                            'Craft zero-proof mocktail bar & patisserie',
                            'Tailored adult & teen dining menus',
                            'Dedicated private security & guest check-in'
                          ]
                      ).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-[#141923]">
                          <Check className="w-4 h-4 text-[#C88A36] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                    <a
                      href="#cotizador-bodas"
                      className="px-5 py-3 rounded-xl bg-[#0A1D37] hover:bg-[#C88A36] text-white text-xs font-extrabold uppercase tracking-wider transition-all"
                    >
                      {lang === 'es' ? 'Solicitar Dossier Quinceañera' : lang === 'zh' ? '索取十五岁成人礼方案' : 'Request Quinceañera Dossier'}
                    </a>
                    <a
                      href={buildWhatsAppUrl(
                        lang === 'es'
                          ? 'Hola Casa Solana Eventos, deseo información y paquetes para una fiesta de Quinceañera.'
                          : lang === 'zh' ? '您好，Casa Solana 活动部，我想咨询十五岁成人礼（Quinceañera）套餐。' : 'Hello Casa Solana Events, inquiring about Quinceañera packages.'
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF9F7] border border-slate-200 text-[#0A1D37] text-xs font-bold uppercase tracking-wider hover:border-[#0A1D37]"
                    >
                      <WhatsAppLogo className="w-4 h-4" />
                      <span>{lang === 'es' ? 'Consultar por WhatsApp' : lang === 'zh' ? '通过 WhatsApp 咨询' : 'Ask on WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. GALERÍA DE BODAS E INSPIRACIÓN VISUAL */}
      <section className="py-14 sm:py-20 bg-[#F2EFE9] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="eyebrow-solana text-[#C88A36] flex items-center gap-2">
                <Camera className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Inspiración Visual' : lang === 'zh' ? '视觉灵感' : 'Visual Inspiration'}</span>
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1D37]">
                {lang === 'es' ? 'Galería de Bodas & Escenarios Reales' : lang === 'zh' ? '婚礼图库与真实场地' : 'Wedding Gallery & Real Venues'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#555E6B] max-w-md">
              {lang === 'es'
                ? 'Luz dorada de costa, patios limeños y terrazas en los Andes listos para recibir a sus invitados.'
                : lang === 'zh' ? '海岸金色时光、利马庭院与安第斯露台，恭候您的亲友。' : 'Coastal golden hour, Lima courtyards, and Andean terraces ready to welcome your loved ones.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {GALLERY_ITEMS.map((item, idx) => (
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`${item.span} group relative rounded-2xl overflow-hidden bg-[#0A1D37] shadow-sm hover:shadow-xl transition-all min-h-[260px] sm:min-h-[310px]`}
              >
                <img
                  src={item.image}
                  alt={item.title[l]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37]/85 via-[#0A1D37]/20 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C88A36] block">
                    {item.location[l]}
                  </span>
                  <span className="font-editorial text-lg sm:text-xl font-bold leading-snug block">
                    {item.title[l]}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CATERING ILUSTRADO (4 PAQUETES) */}
      <section className="py-14 sm:py-20 bg-[#FAF9F7] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="eyebrow-solana text-[#C88A36]">
              {lang === 'es' ? 'Alta Gastronomía para Celebraciones' : lang === 'zh' ? '盛会招牌美食' : 'Signature Event Gastronomy'}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1D37]">
              {lang === 'es'
                ? 'Propuestas de Catering & Coctelería de Autor'
                : lang === 'zh' ? '精选餐饮与精酿酒吧方案' : 'Curated Catering & Craft Bar Proposals'}
            </h2>
            <p className="text-sm text-[#555E6B] leading-relaxed">
              {lang === 'es'
                ? 'Cada menú es elaborado en nuestras cocinas con insumos de estación, pesca responsable del litoral y destilados peruanos seleccionados.'
                : lang === 'zh' ? '每份菜单均由我们自家厨房以应季安第斯食材、海岸捕捞海鲜及小批量秘鲁烈酒精心烹制。' : 'Every menu is crafted in-house using seasonal Andean harvests, coastal catch, and small-batch Peruvian spirits.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATERING_PACKAGES.map((pkg, idx) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 bg-[#0A1D37] overflow-hidden">
                      <img src={pkg.image} alt={pkg.title[l]} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37]/80 via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#D91E5B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                        {pkg.tag[l]}
                      </span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                        <div className="w-8 h-8 rounded-lg bg-[#C88A36] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-editorial text-lg font-bold">{pkg.title[l]}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <p className="text-xs text-[#555E6B] leading-relaxed">{pkg.description[l]}</p>
                      <ul className="space-y-1.5 pt-1">
                        {pkg.highlights[l].map((hl: string) => (
                          <li key={hl} className="flex items-center gap-2 text-xs text-[#141923]">
                            <Check className="w-3.5 h-3.5 text-[#C88A36] shrink-0" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-5 py-4 bg-[#FAF9F7] border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#555E6B] block">
                        {lang === 'es' ? 'Desde' : lang === 'zh' ? '起价' : 'From'}
                      </span>
                      <span className="font-editorial text-xl font-bold text-[#0A1D37] num-tabular">
                        S/ {pkg.pricePen} <span className="text-xs font-normal text-[#555E6B]">{tr('/pax', '/guest', '/人')}</span>
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#C88A36] num-tabular">
                      {formatRate(Math.round(pkg.pricePen / 3.72))}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. NUESTRA COORDINADORA DE EVENTOS + TESTIMONIO DE PAREJA NUPCIAL */}
      <section className="py-14 sm:py-20 bg-[#0A1D37] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Coordinator Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 bg-white/5 border border-white/15 rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-12"
          >
            <div className="sm:col-span-5 relative min-h-[260px]">
              <img
                src={HOTEL_MEDIA.spaThermal}
                alt="Valeria Mendoza de Larco - Directora de Bodas y Eventos Casa Solana"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C88A36] text-white text-[10px] font-extrabold uppercase tracking-wider">
                  <Award className="w-3 h-3" />
                  <span>{lang === 'es' ? '12 años en bodas de destino' : lang === 'zh' ? '12年目的地婚礼经验' : '12 yrs Destination Weddings'}</span>
                </span>
              </div>
            </div>

            <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <span className="eyebrow-solana text-[#C88A36]">
                  {lang === 'es' ? 'Nuestra Coordinadora de Eventos' : lang === 'zh' ? '婚礼与活动总监' : 'Lead Wedding & Events Director'}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                  Valeria Mendoza de Larco
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'es'
                    ? 'Especialista en bodas multiculturales en Cusco, Lima y Paracas, con más de 180 celebraciones dirigidas. Valeria lidera personalmente el cronograma, la curaduría de proveedores locales y el hospedaje de sus invitados.'
                    : lang === 'zh' ? '专注库斯科、利马与帕拉卡斯多元文化庆典，已统筹逾180场婚礼。瓦莱丽娅亲自把控时间安排、本地工匠资源与宾客客房。' : 'Specialist in multicultural celebrations across Cusco, Lima, and Paracas with over 180 weddings orchestrated. Valeria personally oversees timelines, local artisans, and guest room blocks.'}
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C88A36] shrink-0" />
                  <span>valeria.mendoza@casasolana.pe</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C88A36] shrink-0" />
                  <span>+51 984 248 890 {tr('(Atención directa ES / EN)', '(Direct line ES / EN)', '（直线电话，支持西语/英语/中文翻译协助）')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Emotional Peruvian Couple Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-5 bg-[#FAF9F7] text-[#111317] rounded-3xl p-7 sm:p-9 flex flex-col justify-between gap-6 border border-[#C88A36]/30"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow-solana text-[#D91E5B]">
                  {lang === 'es' ? 'Historia Real Casa Solana' : lang === 'zh' ? 'Casa Solana 爱情故事' : 'Casa Solana Love Story'}
                </span>
                <Quote className="w-6 h-6 text-[#C88A36]" />
              </div>

              <blockquote className="font-editorial italic text-lg sm:text-xl text-[#0A1D37] leading-relaxed">
                {lang === 'es'
                  ? '"Cuando cayó la tarde sobre el Valle Sagrado y vimos las mesas encendidas frente a las montañas, sentimos que el tiempo se detuvo. Valeria y todo el equipo de Casa Solana cuidaron desde el té de coca para nuestros abuelos hasta el último brindis bajo las estrellas."'
                  : lang === 'zh' ? '“当暮色笼罩神圣山谷，我们看到面朝群山的烛光餐桌，时间仿佛静止了。瓦莱丽娅和 Casa Solana 团队无微不至，从为祖父母准备的热古柯茶，到星空下的最后一次敬酒。”' : '"When dusk settled over the Sacred Valley and we saw the candlelit tables facing the mountains, time stood still. Valeria and the Casa Solana team cared for everything from warm coca tea for our grandparents to our final toast under the stars."'}
              </blockquote>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <div>
                <p className="font-editorial text-base font-bold text-[#0A1D37]">
                  Camila Valdivia &amp; Sebastián Alarcón
                </p>
                <p className="text-xs text-[#555E6B]">
                  {lang === 'es'
                    ? 'Boda en Sanctuary Valle Sagrado · 160 invitados'
                    : lang === 'zh' ? '神圣山谷庇护所婚礼 · 160位宾客' : 'Sanctuary Sacred Valley Wedding · 160 guests'}
                </p>
              </div>
              <Sun className="w-5 h-5 text-[#C88A36] shrink-0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. FORMULARIO DE COTIZACIÓN DE BODAS Y CELEBRACIONES */}
      <section id="cotizador-bodas" className="py-14 sm:py-20 bg-andean-pattern">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="eyebrow-solana text-[#C88A36]">
              {lang === 'es' ? 'Agenda Tu Visita & Propuesta' : lang === 'zh' ? '预约咨询' : 'Reserve Your Consultation'}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1D37]">
              {lang === 'es' ? 'Cotizador Personalizado de Bodas & Eventos' : lang === 'zh' ? '婚礼与活动专属报价' : 'Bespoke Wedding & Event Quotation'}
            </h2>
            <p className="text-sm text-[#555E6B]">
              {lang === 'es'
                ? 'Compártenos los detalles iniciales de tu celebración y recibe una propuesta económica y calendario de disponibilidad en menos de 24 horas.'
                : lang === 'zh' ? '分享您的初步构想，24小时内获取量身定制的预算方案与档期确认。' : 'Share your initial vision and receive a tailored investment proposal and date availability within 24 hours.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">
            {submitted ? (
              <div className="py-10 text-center space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                  {lang === 'es' ? '¡Propuesta Solicitada con Éxito!' : lang === 'zh' ? '婚礼方案申请成功！' : 'Wedding Proposal Requested!'}
                </h3>
                <p className="text-sm text-[#555E6B] leading-relaxed">
                  {tr(
                    `Gracias ${coupleNames}. Valeria Mendoza de Larco revisará la disponibilidad en ${optLabel(VENUE_OPTIONS, venuePlace)} para el ${tentativeDate} (${guestCount} invitados) y se comunicará contigo al ${contactEmail}.`,
                    `Thank you ${coupleNames}. Valeria Mendoza de Larco will verify availability at ${optLabel(VENUE_OPTIONS, venuePlace)} for ${tentativeDate} (${guestCount} guests) and reach out via ${contactEmail}.`,
                    `感谢 ${coupleNames}。Valeria Mendoza de Larco 将确认 ${optLabel(VENUE_OPTIONS, venuePlace)} 在 ${tentativeDate}（${guestCount} 位宾客）的档期，并通过 ${contactEmail} 与您联系。`
                  )}
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-3">
                  <a
                    href={buildWhatsAppUrl(weddingWhatsAppMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EB958] text-white text-xs font-extrabold uppercase tracking-wider transition-colors"
                  >
                    <WhatsAppLogo className="w-4 h-4" variant="badge" />
                    <span>{lang === 'es' ? 'Enviar Resumen por WhatsApp' : lang === 'zh' ? '通过 WhatsApp 发送摘要' : 'Send Summary on WhatsApp'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-3 rounded-xl bg-[#FAF9F7] border border-slate-200 text-[#0A1D37] text-xs font-bold uppercase tracking-wider cursor-pointer hover:border-[#0A1D37]"
                  >
                    {lang === 'es' ? 'Editar Cotización' : lang === 'zh' ? '修改咨询' : 'Edit Inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Nombres de los novios / anfitriones */}
                  <div className="space-y-1.5">
                    <label htmlFor="couple-names" className="text-xs font-bold text-[#0A1D37] flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#D91E5B]" />
                      <span>{lang === 'es' ? 'Nombres de los novios / anfitriones *' : lang === 'zh' ? '新人或主办方姓名 *' : 'Couple or Host Names *'}</span>
                    </label>
                    <input
                      id="couple-names"
                      type="text"
                      required
                      placeholder={lang === 'es' ? 'Ej. Lucía Paredes & Mateo Quispe' : lang === 'zh' ? '例如：李明 & 王芳' : 'e.g. Lucia & Mateo'}
                      value={coupleNames}
                      onChange={(e) => setCoupleNames(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-[#111317] focus:outline-none focus:border-[#C88A36]"
                    />
                  </div>

                  {/* Fecha tentativa */}
                  <div className="space-y-1.5">
                    <label htmlFor="wedding-date" className="text-xs font-bold text-[#0A1D37] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C88A36]" />
                      <span>{lang === 'es' ? 'Fecha tentativa' : lang === 'zh' ? '预定日期' : 'Tentative Date'}</span>
                    </label>
                    <input
                      id="wedding-date"
                      type="date"
                      value={tentativeDate}
                      onChange={(e) => setTentativeDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-[#111317] focus:outline-none focus:border-[#C88A36]"
                    />
                  </div>

                  {/* Lugar / Sede */}
                  <div className="space-y-1.5">
                    <label htmlFor="wedding-venue" className="text-xs font-bold text-[#0A1D37] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C88A36]" />
                      <span>{lang === 'es' ? 'Lugar / Sede Casa Solana' : lang === 'zh' ? 'Casa Solana 场地' : 'Casa Solana Venue'}</span>
                    </label>
                    <select
                      id="wedding-venue"
                      value={venuePlace}
                      onChange={(e) => setVenuePlace(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-[#111317] focus:outline-none focus:border-[#C88A36] bg-white cursor-pointer"
                    >
                          {VENUE_OPTIONS.map((o) => (
                            <option key={o.key} value={o.key}>
                              {o[l]}
                            </option>
                          ))}
                        </select>
                  </div>

                  {/* Número de invitados */}
                  <div className="space-y-1.5">
                    <label htmlFor="wedding-guests" className="text-xs font-bold text-[#0A1D37] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C88A36]" />
                      <span>{lang === 'es' ? 'Número estimado de invitados' : lang === 'zh' ? '预计宾客人数' : 'Estimated Guest Count'}</span>
                    </label>
                    <select
                      id="wedding-guests"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-[#111317] focus:outline-none focus:border-[#C88A36] bg-white cursor-pointer"
                    >
                      <option value="30-50">{lang === 'es' ? '30 a 50 invitados (Íntimo)' : lang === 'zh' ? '30 - 50位宾客（私密型）' : '30 - 50 guests (Intimate)'}</option>
                      <option value="80-120">{lang === 'es' ? '80 a 120 invitados (Clásico)' : lang === 'zh' ? '80 - 120位宾客（经典型）' : '80 - 120 guests (Classic)'}</option>
                      <option value="120-180">{lang === 'es' ? '120 a 180 invitados (Premium)' : lang === 'zh' ? '120 - 180位宾客（尊享型）' : '120 - 180 guests (Premium)'}</option>
                      <option value="200-350">{lang === 'es' ? '200 a 350 invitados (Grand Luxe)' : lang === 'zh' ? '200 - 350位宾客（至尊奢华型）' : '200 - 350 guests (Grand Luxe)'}</option>
                    </select>
                  </div>

                  {/* Estilo de boda */}
                  <div className="space-y-1.5">
                    <label htmlFor="wedding-style" className="text-xs font-bold text-[#0A1D37] flex items-center gap-1.5">
                      <Flower2 className="w-3.5 h-3.5 text-[#C88A36]" />
                      <span>{lang === 'es' ? 'Estilo de celebración' : lang === 'zh' ? '庆典风格' : 'Celebration Style'}</span>
                    </label>
                    <select
                      id="wedding-style"
                      value={weddingStyle}
                      onChange={(e) => setWeddingStyle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-[#111317] focus:outline-none focus:border-[#C88A36] bg-white cursor-pointer"
                    >
                          {STYLE_OPTIONS.map((o) => (
                            <option key={o.key} value={o.key}>
                              {o[l]}
                            </option>
                          ))}
                        </select>
                  </div>

                  {/* Presupuesto */}
                  <div className="space-y-1.5">
                    <label htmlFor="wedding-budget" className="text-xs font-bold text-[#0A1D37] flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-[#C88A36]" />
                      <span>{lang === 'es' ? 'Presupuesto referencial' : lang === 'zh' ? '预估预算' : 'Estimated Budget'}</span>
                    </label>
                    <select
                      id="wedding-budget"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-[#111317] focus:outline-none focus:border-[#C88A36] bg-white cursor-pointer"
                    >
                          {BUDGET_OPTIONS.map((o) => (
                            <option key={o.key} value={o.key}>
                              {o[l]}
                            </option>
                          ))}
                        </select>
                  </div>

                  {/* Email & Teléfono */}
                  <div className="space-y-1.5">
                    <label htmlFor="wedding-email" className="text-xs font-bold text-[#0A1D37]">
                      {lang === 'es' ? 'Correo electrónico *' : lang === 'zh' ? '电子邮箱 *' : 'Email Address *'}
                    </label>
                    <input
                      id="wedding-email"
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-[#111317] focus:outline-none focus:border-[#C88A36]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="wedding-phone" className="text-xs font-bold text-[#0A1D37]">
                      {lang === 'es' ? 'Teléfono / WhatsApp' : lang === 'zh' ? '电话 / WhatsApp' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      id="wedding-phone"
                      type="tel"
                      placeholder="+51 999 000 000"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-[#111317] focus:outline-none focus:border-[#C88A36]"
                    />
                  </div>
                </div>

                {/* Servicios Adicionales */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-[#0A1D37] flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-[#C88A36]" />
                    <span>{lang === 'es' ? 'Servicios adicionales de interés' : lang === 'zh' ? '感兴趣的附加服务' : 'Additional Services of Interest'}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {EXTRA_OPTIONS.map((opt) => {
                      const extra = opt.key;
                      const selected = extraServices.includes(extra);
                      return (
                        <button
                          key={extra}
                          type="button"
                          onClick={() => toggleExtraService(extra)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                            selected
                              ? 'bg-[#0A1D37] text-white border-[#0A1D37]'
                              : 'bg-[#FAF9F7] text-[#555E6B] border-slate-200 hover:border-[#C88A36]'
                          }`}
                        >
                          {selected && <Check className="w-3.5 h-3.5 text-[#C88A36]" />}
                          <span>{opt[l]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit + WhatsApp CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'es' ? 'Solicitar Propuesta de Boda' : lang === 'zh' ? '申请婚礼方案' : 'Request Wedding Proposal'}</span>
                  </button>

                  <a
                    href={buildWhatsAppUrl(weddingWhatsAppMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EB958] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <WhatsAppLogo className="w-5 h-5" variant="badge" />
                    <span>{lang === 'es' ? 'Cotizar Bodas por WhatsApp' : lang === 'zh' ? 'WhatsApp 婚礼专线' : 'WhatsApp Wedding Desk'}</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
