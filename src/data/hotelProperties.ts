import type { ComfortScene, HotelLocationHub } from '../types/hotel';
import { HOTEL_MEDIA } from './hotelMedia';

export const HOTEL_PROPERTIES: HotelLocationHub[] = [
  {
    id: 'miraflores',
    code: 'LIM-MF',
    name: {
      es: 'Casa Solana Miraflores',
      en: 'Casa Solana Miraflores',
      zh: 'Casa Solana 米拉弗洛雷斯'
    },
    cityTag: {
      es: 'Lima · Frente al Malecón',
      en: 'Lima · Coastal Cliffside',
      zh: '利马 · 悬崖海滨一线'
    },
    transferNote: {
      es: '35 min auto privado Aeropuerto LIM',
      en: '35m private sedan from LIM Airport',
      zh: '利马机场专车35分钟直达'
    },
    climate: {
      es: '18°C – 26°C · Brisa Marina',
      en: '64°F – 79°F · Pacific Mist',
      zh: '18°C – 26°C · 太平洋海风'
    },
    signatureAmenity: {
      es: 'Rooftop Piscina Climatizada & Cava',
      en: 'Heated Rooftop Pool & Cellar',
      zh: '顶层恒温无边泳池与私人酒窖'
    },
    summary: {
      es: 'Casona contemporánea a pasos del Malecón Cisneros con suites insonorizadas, biblioteca de vinos y desayuno orgánico en patio interior.',
      en: 'Contemporary townhouse steps from Malecon cliffs with soundproofed oak suites, private wine library and leafy courtyard breakfast.',
      zh: '距西斯内罗斯海滨仅数步之遥的现代宅邸，配有隔音橡木套房、珍藏红酒馆以及庭院有机手工早餐。'
    },
    heroImage: HOTEL_MEDIA.lobbyLounge,
    lat: -12.1211,
    lng: -77.0365,
    zoom: 13,
    startingRateUsd: 215
  },
  {
    id: 'valle',
    code: 'CUZ-VS',
    name: {
      es: 'Casa Solana Valle Sagrado',
      en: 'Casa Solana Sacred Valley',
      zh: 'Casa Solana 库斯科圣谷'
    },
    cityTag: {
      es: 'Urubamba · Refugio Termal',
      en: 'Urubamba · Thermal Retreat',
      zh: '乌鲁班巴 · 安第斯温泉隐逸'
    },
    transferNote: {
      es: '65 min vehículo privado desde Cusco',
      en: '65m scenic chauffeur from Cusco',
      zh: '库斯科专车65分钟景致之旅'
    },
    climate: {
      es: '14°C – 22°C · Cielo Despejado',
      en: '57°F – 72°F · Sunlit Valley',
      zh: '14°C – 22°C · 晴朗安第斯谷'
    },
    signatureAmenity: {
      es: 'Circuito Termal en Piedra & Chimenea',
      en: 'Stone Thermal Circuit & Hearth',
      zh: '天然石砌温泉池与独立壁炉'
    },
    summary: {
      es: 'Villas independientes en adobe noble rodeadas de molles, agua de manantial tibia, chimenea encendida al atardecer y huerto propio.',
      en: 'Detached earthen-clay villas nestled under willow groves with warm spring hydrotherapy, evening hearth fires and kitchen gardens.',
      zh: '环抱于柳林间的安第斯陶土独立别墅，享受天然矿物温水浴、傍晚燃起的壁炉及有机农园风味。'
    },
    heroImage: HOTEL_MEDIA.villaTerrace,
    lat: -13.3045,
    lng: -72.1165,
    zoom: 12,
    startingRateUsd: 295
  },
  {
    id: 'paracas',
    code: 'ICA-PB',
    name: {
      es: 'Casa Solana Bahía Paracas',
      en: 'Casa Solana Paracas Bay',
      zh: 'Casa Solana 帕拉卡斯海湾'
    },
    cityTag: {
      es: 'Costa Sur · Pie de Playa',
      en: 'South Coast · Beachfront',
      zh: '南部海岸 · 临海沙滩一线'
    },
    transferNote: {
      es: '3h 15m chofer privado desde Lima',
      en: '3h 15m private SUV from Lima',
      zh: '利马豪华专车直达 3小时15分'
    },
    climate: {
      es: '22°C – 29°C · Sol Permanente',
      en: '72°F – 84°F · Year-Round Sun',
      zh: '22°C – 29°C · 全年暖阳'
    },
    signatureAmenity: {
      es: 'Muelles Privados & Piscina Infinita',
      en: 'Private Jetty & Infinity Pool',
      zh: '专属私家码头与海景无边泳池'
    },
    summary: {
      es: 'Arquitectura baja blanca frente a la bahía calma de Paracas con terrazas privadas, sombrillas de palma y coctelería botánica.',
      en: 'Low-slung limestone bungalows facing the tranquil bay with private plunge terraces, shaded cabanas and coastal sunset lounge.',
      zh: '面朝平静帕拉卡斯湾的纯白石灰岩洋房，设有私人跳水露台、棕榈凉亭与海滨日落鸡尾酒吧。'
    },
    heroImage: HOTEL_MEDIA.bayResort,
    lat: -13.8405,
    lng: -76.2512,
    zoom: 13,
    startingRateUsd: 260
  }
];

export const COMFORT_SCENES: ComfortScene[] = [
  {
    id: 'sleep',
    tabLabel: { es: '01 · Descanso & Lino', en: '01 · Deep Sleep', zh: '01 · 深度睡眠与亚麻' },
    kicker: { es: 'Santuario Nocturno', en: 'Sleep Engineering', zh: '夜间深度睡眠系统' },
    headline: {
      es: 'Algodón Pima 600 hilos, carta de 5 almohadas y silencio acústico',
      en: '600-thread Pima cotton, 5-pillow menu and triple-glazed silence',
      zh: '600针秘鲁皮马棉床品、5款定制枕头菜单与全降噪静谧'
    },
    description: {
      es: 'Cada habitación incorpora colchón ortopédico de capas naturales, cortinas blackout motorizadas, control térmico por zonas e infusión nocturna de cortesía antes de dormir.',
      en: 'Each room blends multi-zone natural latex mattresses, motorized blackout drapery, climate zoning and complimentary herbal turndown infusions.',
      zh: '每间客房均配备天然乳胶分级床垫、智能全遮光窗帘、分区温控系统以及睡前安神草本茶礼遇。'
    },
    specs: [
      {
        label: { es: 'Lencería', en: 'Bedding', zh: '床品织物' },
        value: { es: 'Algodón Pima 600H', en: '600TC Pima Cotton', zh: '600针皮马棉' }
      },
      {
        label: { es: 'Climatización', en: 'Climate', zh: '静音控温' },
        value: { es: 'Silenciosa 19–22°C', en: 'Whisper 66–72°F', zh: '静音 19–22°C' }
      },
      {
        label: { es: 'Almohadas', en: 'Pillows', zh: '枕头定制' },
        value: { es: 'Carta 5 Firmezas', en: '5-Loft Concierge Menu', zh: '5款软硬菜单' }
      }
    ],
    image: HOTEL_MEDIA.suiteMaster
  },
  {
    id: 'spa',
    tabLabel: { es: '02 · Spa Termal', en: '02 · Thermal Spa', zh: '02 · 天然石疗水疗' },
    kicker: { es: 'Bienestar en Piedra', en: 'Stone Hydrotherapy', zh: '石境水疗与矿物滋润' },
    headline: {
      es: 'Circuito de aguas tibias, sauna de eucalipto y cabinas privadas',
      en: 'Warm mineral pools, eucalyptus sauna and bespoke treatment suites',
      zh: '矿物温水循环池、桉树蒸汽桑拿与私密理疗套房'
    },
    description: {
      es: 'Incluye acceso diario reservado por 60 minutos sin aglomeraciones, aceites esenciales andinos y masajes descontracturantes tras largas jornadas o vuelos internacionales.',
      en: 'Includes daily 60-minute uncrowded guest slots, botanical essential oils and restorative jet-lag therapy upon arrival.',
      zh: '含每日专属60分钟不拥挤体验时段、安第斯纯天然精油理疗及长途飞行后的深层舒缓按摩。'
    },
    specs: [
      {
        label: { es: 'Piscina Termal', en: 'Thermal Pool', zh: '温泉泳池' },
        value: { es: '34°C Todo el Año', en: '93°F Year-Round', zh: '全年恒温 34°C' }
      },
      {
        label: { es: 'Horarios', en: 'Hours', zh: '开放时间' },
        value: { es: '07:00 – 22:00', en: '07:00 AM – 10:00 PM', zh: '07:00 – 22:00' }
      },
      {
        label: { es: 'Amenidades', en: 'Amenities', zh: '天然备品' },
        value: { es: 'Botánica Orgánica', en: 'Organic Apothecary', zh: '安第斯有机植物萃取' }
      }
    ],
    image: HOTEL_MEDIA.spaThermal
  },
  {
    id: 'dining',
    tabLabel: { es: '03 · Mesa & Desayuno', en: '03 · Dining & Breakfast', zh: '03 · 餐厅与早餐' },
    kicker: { es: 'Cocina de Temporada', en: 'Seasonal Table', zh: '时令秘鲁美食' },
    headline: {
      es: 'Desayuno artesanal a la carta en terraza o servido en tu suite',
      en: 'Made-to-order morning table on the courtyard terrace or in-suite',
      zh: '露天花园庭院或套房内现点现做的手工丰盛早餐'
    },
    description: {
      es: 'Panadería de masa madre horneada al alba, café de especialidad de Chanchamayo, jugos de estación y carta de habitación disponible las 24 horas sin recargos.',
      en: 'Artisan sourdough baked before dawn, high-altitude single-origin coffee, seasonal orchards and round-the-clock room service.',
      zh: '清晨现烤天然酵母欧包、钱查马约高山单一产区精品咖啡、鲜榨时令果汁与24小时全天候客房送餐服务。'
    },
    specs: [
      {
        label: { es: 'Desayuno', en: 'Breakfast', zh: '早餐时间' },
        value: { es: 'Incluido 06:30–11:00', en: 'Included 6:30–11 AM', zh: '包含 06:30–11:00' }
      },
      {
        label: { es: 'Room Service', en: 'In-Room Dining', zh: '客房餐饮' },
        value: { es: 'Activo 24 Horas', en: '24/7 Butler Delivery', zh: '24小时全天候' }
      },
      {
        label: { es: 'Dietas', en: 'Dietary', zh: '定制饮食' },
        value: { es: 'Sin Gluten / Vegano', en: 'Vegan & GF Ready', zh: '提供无麸质与纯素' }
      }
    ],
    image: HOTEL_MEDIA.breakfastTable
  },
  {
    id: 'concierge',
    tabLabel: { es: '04 · Concierge 24/7', en: '04 · 24/7 Concierge', zh: '04 · 24/7专属管家' },
    kicker: { es: 'Recepción Sin Filas', en: 'Effortless Arrival', zh: '无缝免排队入住' },
    headline: {
      es: 'Check-in privado en tu habitación, traslados dedicados y late check-out',
      en: 'In-suite welcome check-in, private chauffeurs and unhurried check-out',
      zh: '客房内专属欢迎入住、豪华专车接送与延后退房礼遇'
    },
    description: {
      es: 'Olvida los mostradores lentos: un anfitrión asignado coordina tu recogida en aeropuerto, planifica reservas gastronómicas y prepara tu partida según tu horario de vuelo.',
      en: 'Skip traditional lobby queues: your dedicated host coordinates tarmac pickups, priority dining tables and flight-aligned departure times.',
      zh: '告别前台排队：专属礼宾管家为您协调机场停机坪接机、优先预订米其林餐厅席位并根据航班时刻安排退房。'
    },
    specs: [
      {
        label: { es: 'Wi-Fi Fibra', en: 'Connectivity', zh: '极速网络' },
        value: { es: '1 Gbps Privado', en: '1 Gbps Mesh', zh: '1 Gbps 私密专线' }
      },
      {
        label: { es: 'Traslados', en: 'Transfers', zh: '专车车队' },
        value: { es: 'Flota Privada SUV', en: 'Private Chauffeur', zh: '专属豪华SUV车队' }
      },
      {
        label: { es: 'Idiomas', en: 'Languages', zh: '管家语言' },
        value: { es: 'ES / EN 24 Horas', en: 'EN / ES 24 Hours', zh: '中 / 西 / 英 全天候' }
      }
    ],
    image: HOTEL_MEDIA.bathMarble
  }
];
