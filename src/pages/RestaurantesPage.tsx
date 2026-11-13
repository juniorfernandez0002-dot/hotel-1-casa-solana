import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Utensils,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { useSolana } from '../context/SolanaContext';
import { HOTEL_MEDIA } from '../data/hotelMedia';
import { WhatsAppLogo } from '../components/SocialIcons';

type T3 = { es: string; en: string; zh: string };

interface RestaurantData {
  id: string;
  name: string;
  brandSeal: string;
  badgeCity: T3;
  heroColor: string;
  address: T3;
  phone: string;
  email: string;
  headline: T3;
  intro: T3;
  serviceType: T3;
  foodType: T3;
  breakfastHours: T3;
  aLaCarteHours: T3;
  heroDishImg: string;
  cardDishImg: string;
  specialties: { name: T3; desc: T3; price: string }[];
}

const RESTAURANTS: RestaurantData[] = [
  {
    id: 'miraflores',
    name: "Q'iswar Bar & Grill Miraflores",
    brandSeal: "Q'ISWAR",
    badgeCity: { es: 'MIRAFLORES · LIMA', en: 'MIRAFLORES · LIMA', zh: '米拉弗洛雷斯 · 利马' },
    heroColor: '#B81D2E', // Casa Andina crimson signature
    address: {
      es: 'Malecón de la Reserva 1035, Miraflores, Lima',
      en: 'Malecón de la Reserva 1035, Miraflores, Lima',
      zh: '利马米拉弗洛雷斯，Malecón de la Reserva 1035 号'
    },
    phone: '+51 (01) 391-6565 / 986 849 173',
    email: 'qiswar@casasolana.pe',
    headline: {
      es: "Conoce nuestro restaurante Q'iswar Bar & Grill Miraflores",
      en: "Discover our restaurant Q'iswar Bar & Grill Miraflores",
      zh: "探索我们的 Q'iswar 米拉弗洛雷斯酒吧烧烤餐厅"
    },
    intro: {
      es: "Q'iswar ofrece una variada carta que fusiona gastronomía peruana marina e internacional en una propuesta contemporánea frente a los acantilados de Miraflores.",
      en: "Q'iswar offers a varied menu that blends Peruvian seafood and international cuisine in a contemporary concept facing the Miraflores cliffs.",
      zh: "Q'iswar 菜单丰富多样，将秘鲁海鲜与国际美食融为一体，在米拉弗洛雷斯悬崖前呈现当代餐饮体验。"
    },
    serviceType: {
      es: 'A la carta y Buffet asistido',
      en: 'À la carte and assisted buffet',
      zh: '单点菜单及服务式自助餐'
    },
    foodType: {
      es: 'Peruana fusión, pescados y mariscos, cortes al carbón',
      en: 'Peruvian fusion, fish and seafood, charcoal-grilled cuts',
      zh: '秘鲁融合菜、鱼类与海鲜、炭烤肉排'
    },
    breakfastHours: { es: 'De 6:00 a.m. a 10:00 a.m.', en: 'From 6:00 a.m. to 10:00 a.m.', zh: '早上6:00至10:00' },
    aLaCarteHours: { es: 'De 12:30 p.m. a 10:30 p.m.', en: 'From 12:30 p.m. to 10:30 p.m.', zh: '中午12:30至晚上10:30' },
    heroDishImg: HOTEL_MEDIA.foodFlatlay,
    cardDishImg: HOTEL_MEDIA.foodLomoSaltado,
    specialties: [
      {
        name: {
          es: 'Lomo Saltado al Wok con Papas Nativas',
          en: 'Wok-Fired Lomo Saltado with Native Potatoes',
          zh: '铁锅爆炒牛里脊配原生土豆'
        },
        desc: {
          es: 'Lomo fino flameado con pisco quebranta, cebollas crocantes, tomate y papas amarillas doradas.',
          en: 'Fine tenderloin flambéed with quebranta pisco, crisp onions, tomato and golden yellow potatoes.',
          zh: '嫩牛里脊以克布兰塔皮斯科酒点火爆香，配脆洋葱、番茄和金黄色黄土豆。'
        },
        price: 'S/ 58'
      },
      {
        name: {
          es: 'Ceviche Clásico de Pesca del Día',
          en: 'Classic Catch-of-the-Day Ceviche',
          zh: '经典每日鲜鱼酸橘汁腌鱼'
        },
        desc: {
          es: 'Corvina fresca en leche de tigre al rocoto ahumado, camote glaseado y choclo tierno.',
          en: 'Fresh sea bass in smoked rocoto tiger’s milk, glazed sweet potato and tender corn.',
          zh: '新鲜海鲈鱼浸于烟熏罗科托辣椒虎奶汁中，配糖渍红薯和嫩玉米。'
        },
        price: 'S/ 54'
      },
      {
        name: {
          es: 'Arroz con Mariscos a la Brasa',
          en: 'Flame-Grilled Seafood Rice',
          zh: '炭火海鲜饭'
        },
        desc: {
          es: 'Arroz meloso al ají amarillo con langostinos, calamares y conchas de abanico flameadas.',
          en: 'Creamy yellow chili rice with prawns, squid and flame-seared scallops.',
          zh: '黄辣椒绵密米饭，配大虾、鱿鱼和火焰煎扇贝。'
        },
        price: 'S/ 62'
      }
    ]
  },
  {
    id: 'valle',
    name: 'Killa Fuego & Brasas Valle Sagrado',
    brandSeal: 'KILLA',
    badgeCity: { es: 'VALLE SAGRADO · CUSCO', en: 'SACRED VALLEY · CUSCO', zh: '圣谷 · 库斯科' },
    heroColor: '#96232E',
    address: {
      es: 'Km 68 Carretera Urubamba - Ollantaytambo, Cusco',
      en: 'Km 68 Urubamba - Ollantaytambo Road, Cusco',
      zh: '库斯科乌鲁班巴—奥扬泰坦博公路68公里处'
    },
    phone: '+51 (084) 581-200 / 984 721 340',
    email: 'killa@casasolana.pe',
    headline: {
      es: 'Conoce nuestro restaurante Killa Fuego & Brasas Valle Sagrado',
      en: 'Discover our restaurant Killa Fuego & Brasas Sacred Valley',
      zh: '探索我们的圣谷 Killa 火焰炭烤餐厅'
    },
    intro: {
      es: 'Cocina a la leña de queñua inspirada en los frutos andinos del Valle Sagrado. Trucha fresca del río Vilcanota, cordero lechal y papas nativas de nuestro huerto orgánico.',
      en: 'Queñua wood-fired cuisine inspired by the Andean bounty of the Sacred Valley. Fresh Vilcanota River trout, suckling lamb and native potatoes from our organic garden.',
      zh: '以克尼亚木柴火烹制，灵感源自圣谷的安第斯物产。选用维尔卡诺塔河鲜鳟鱼、乳羊肉以及自家有机菜园的原生土豆。'
    },
    serviceType: {
      es: 'A la carta, Fogatas & Degustación',
      en: 'À la carte, bonfires & tasting menu',
      zh: '单点菜单、篝火晚宴及品鉴套餐'
    },
    foodType: {
      es: 'Cocina andina de autor, brasas campesinas',
      en: 'Andean signature cuisine, rustic embers grill',
      zh: '安第斯创意料理、乡村炭火烧烤'
    },
    breakfastHours: { es: 'De 6:00 a.m. a 10:30 a.m.', en: 'From 6:00 a.m. to 10:30 a.m.', zh: '早上6:00至10:30' },
    aLaCarteHours: { es: 'De 12:00 p.m. a 10:00 p.m.', en: 'From 12:00 p.m. to 10:00 p.m.', zh: '中午12:00至晚上10:00' },
    heroDishImg: HOTEL_MEDIA.foodFlatlay,
    cardDishImg: HOTEL_MEDIA.breakfastTable,
    specialties: [
      {
        name: {
          es: 'Trucha del Vilcanota a la Leña',
          en: 'Wood-Fired Vilcanota Trout',
          zh: '柴火烤维尔卡诺塔河鳟鱼'
        },
        desc: {
          es: 'Piel crocante, mantequilla de hierbas andinas, huacatay y puré rústico de tarwi.',
          en: 'Crispy skin, Andean herb butter, huacatay and rustic tarwi purée.',
          zh: '鱼皮酥脆，配安第斯香草黄油、黑薄荷和乡村风味羽扇豆泥。'
        },
        price: 'S/ 52'
      },
      {
        name: {
          es: 'Costillar de Cordero Confitado',
          en: 'Confit Lamb Ribs',
          zh: '油封羊肋排'
        },
        desc: {
          es: 'Cocción lenta de 8 horas con hierbas de altura, quinua tricolor perlada y reducción de chicha de jora.',
          en: 'Slow-cooked for 8 hours with highland herbs, pearled tricolor quinoa and a chicha de jora reduction.',
          zh: '以高原香草慢煮8小时，配三色珍珠藜麦和玉米酒浓缩酱汁。'
        },
        price: 'S/ 68'
      },
      {
        name: {
          es: 'Sopa Criolla de los Andes',
          en: 'Andean Creole Soup',
          zh: '安第斯克里奥尔浓汤'
        },
        desc: {
          es: 'Fondo concentrado con carne de res picada a cuchillo, fideos cabello de ángel, leche fresca y huevo escalfado.',
          en: 'Rich broth with knife-minced beef, angel-hair noodles, fresh milk and a poached egg.',
          zh: '浓郁高汤配手切牛肉末、天使细面、鲜牛奶和水波蛋。'
        },
        price: 'S/ 38'
      }
    ]
  },
  {
    id: 'paracas',
    name: 'Brisa Marina Lounge & Bar Paracas',
    brandSeal: 'BRISA',
    badgeCity: { es: 'BAHÍA DE PARACAS · ICA', en: 'PARACAS BAY · ICA', zh: '帕拉卡斯海湾 · 伊卡' },
    heroColor: '#1E3A5F',
    address: {
      es: 'Av. Los Libertadores s/n, Bahía de Paracas, Ica',
      en: 'Av. Los Libertadores s/n, Paracas Bay, Ica',
      zh: '伊卡帕拉卡斯海湾，Av. Los Libertadores 无门牌号'
    },
    phone: '+51 (056) 542-100 / 956 312 890',
    email: 'brisamarina@casasolana.pe',
    headline: {
      es: 'Conoce nuestro restaurante Brisa Marina Lounge Paracas',
      en: 'Discover our restaurant Brisa Marina Lounge Paracas',
      zh: '探索我们的帕拉卡斯 Brisa Marina 休闲餐吧'
    },
    intro: {
      es: 'Ubicado sobre el muelle privado de la bahía con vista a los atardeceres del Pacífico. Coctelería de autor a base de pisco iqueño, conchas de abanico recién extraídas y tiraditos frescos.',
      en: 'Set on the bay’s private pier with views of Pacific sunsets. Signature cocktails made with Ica pisco, freshly harvested scallops and fresh tiraditos.',
      zh: '坐落于海湾私人码头，可欣赏太平洋日落美景。主打以伊卡皮斯科酒调制的特色鸡尾酒、新鲜捕捞的扇贝和鲜切生鱼片。'
    },
    serviceType: {
      es: 'A la carta, Sunset Bar & Tapas',
      en: 'À la carte, sunset bar & tapas',
      zh: '单点菜单、日落酒吧及西班牙小食'
    },
    foodType: {
      es: 'Pescados, mariscos de la bahía y coctelería pisco',
      en: 'Fish, bay seafood and pisco cocktails',
      zh: '鱼类、海湾海鲜及皮斯科鸡尾酒'
    },
    breakfastHours: { es: 'De 6:30 a.m. a 10:30 a.m.', en: 'From 6:30 a.m. to 10:30 a.m.', zh: '早上6:30至10:30' },
    aLaCarteHours: { es: 'De 12:00 p.m. a 11:00 p.m.', en: 'From 12:00 p.m. to 11:00 p.m.', zh: '中午12:00至晚上11:00' },
    heroDishImg: HOTEL_MEDIA.foodFlatlay,
    cardDishImg: HOTEL_MEDIA.foodCeviche,
    specialties: [
      {
        name: {
          es: 'Tiradito de Corvina en Ají Amarillo',
          en: 'Sea Bass Tiradito in Yellow Chili',
          zh: '黄辣椒海鲈鱼生鱼片'
        },
        desc: {
          es: 'Cortes finos con emulsión de ají amarillo sin picor, aceite de oliva virgen y chalaquita.',
          en: 'Thin slices with a mild yellow chili emulsion, extra virgin olive oil and chalaquita salsa.',
          zh: '薄切鱼片配不辣的黄辣椒乳化酱、初榨橄榄油和秘鲁洋葱莎莎。'
        },
        price: 'S/ 48'
      },
      {
        name: {
          es: 'Conchas de Abanico a la Parmesana',
          en: 'Parmesan Scallops',
          zh: '帕尔马干酪焗扇贝'
        },
        desc: {
          es: 'Conchas vivas gratinadas al horno con queso parmesano madurado, mantequilla y gotas de limón sutil.',
          en: 'Live scallops oven-gratinéed with aged Parmesan, butter and a few drops of key lime.',
          zh: '鲜活扇贝配陈年帕尔马干酪与黄油烤至金黄，点缀几滴青柠汁。'
        },
        price: 'S/ 56'
      },
      {
        name: {
          es: 'Catedral de Pisco Sour 2x1',
          en: 'Pisco Sour Cathedral 2x1',
          zh: '皮斯科酸酒“大教堂”买一送一'
        },
        desc: {
          es: 'Pisco Quebranta de bodega centenaria de Ica, limón sutil recién exprimido y amargo de angostura.',
          en: 'Quebranta pisco from a century-old Ica winery, freshly squeezed key lime and Angostura bitters.',
          zh: '选用伊卡百年酒庄的克布兰塔皮斯科酒，配现榨青柠汁和安高天娜苦精。'
        },
        price: 'S/ 38'
      }
    ]
  }
];

export const RestaurantesPage: React.FC = () => {
  const { lang, buildWhatsAppUrl } = useSolana();
  const [activeTab, setActiveTab] = useState('miraflores');

  // Reservation form
  const [resName, setResName] = useState('');
  const [resDate, setResDate] = useState('2026-11-20');
  const [resTime, setResTime] = useState('13:30');
  const [resGuests, setResGuests] = useState('2');
  const [resPhone, setResPhone] = useState('');
  const [resSent, setResSent] = useState(false);

  const L = (es: string, en: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);
  const pick = (v: T3) => v[lang] ?? v.en;

  const current = RESTAURANTS.find((r) => r.id === activeTab) || RESTAURANTS[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resName && resPhone) {
      setResSent(true);
    }
  };

  const getWaMessage = () => {
    return lang === 'zh'
      ? `您好 ${current.name}，我想预订 ${resDate} ${resTime} 的餐桌，共 ${resGuests} 位。姓名：${resName} - 电话：${resPhone}。`
      : lang === 'es'
      ? `Hola ${current.name}, deseo reservar mesa para ${resGuests} personas el día ${resDate} a las ${resTime}. Nombre: ${resName} - Tel: ${resPhone}.`
      : `Hello ${current.name}, I would like to book a table for ${resGuests} guests on ${resDate} at ${resTime}. Name: ${resName} - Phone: ${resPhone}.`;
  };

  return (
    <div className="bg-[#FAF9F7] text-[#141923]">
      {/* 1. Asymmetric Diagonal Split Hero (Exact to Casa Andina Reference) */}
      <section className="relative w-full overflow-hidden bg-black text-white min-h-[380px] sm:min-h-[440px] flex items-stretch">
        <div className="w-full flex flex-col lg:flex-row items-stretch">
          {/* Left Solid Angular Color Block */}
          <div
            style={{ backgroundColor: current.heroColor }}
            className="w-full lg:w-[42%] p-8 sm:p-12 lg:p-14 flex flex-col justify-center text-white relative z-10 shrink-0 lg:[clip-path:polygon(0_0,100%_0,84%_100%,0%_100%)]"
          >
            <div className="space-y-4 max-w-sm">
              {/* Circular Emblem Seal */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white flex flex-col items-center justify-center p-2 text-center shadow-lg">
                <span className="font-editorial text-xs sm:text-sm font-black tracking-widest block leading-tight">
                  {current.brandSeal}
                </span>
                <span className="text-[7px] font-bold tracking-[0.2em] uppercase text-white/90 block mt-0.5">
                  {L('BY CASA SOLANA', 'BY CASA SOLANA', 'CASA SOLANA 出品')}
                </span>
              </div>

              {/* City Title */}
              <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold tracking-wider uppercase text-white">
                {pick(current.badgeCity)}
              </h1>

              {/* Address & Phone */}
              <div className="space-y-1.5 text-xs text-white/95 font-medium pt-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                  <span>{pick(current.address)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-white/80 shrink-0" />
                  <span>{current.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Vibrant Food Photo (Flatlay without dark gloomy filters) */}
          <div className="w-full lg:w-[66%] lg:-ml-16 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full">
            <img
              src={current.heroDishImg}
              alt={current.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* 2. Restaurant Selector Tabs */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 sm:gap-6 py-4 overflow-x-auto no-scrollbar">
            {RESTAURANTS.map((resto) => (
              <button
                key={resto.id}
                type="button"
                onClick={() => setActiveTab(resto.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === resto.id
                    ? 'bg-[#0A1D37] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-[#0A1D37]'
                }`}
              >
                {resto.name.split(' ')[0]} ({pick(resto.badgeCity).split('·')[0].trim()})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Overlapping Editorial Card Presentation (Exact to Casa Andina Reference) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#141923]">
              {pick(current.headline)}
            </h2>
          </div>

          {/* Overlapping 2-Column Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0 pt-4">
            {/* Left Elevated White Card (Overlaps photo on right) */}
            <div className="lg:col-span-6 z-10 bg-white rounded-2xl shadow-2xl border border-slate-100 p-7 sm:p-10 space-y-5 lg:-mr-12">
              <div className="space-y-2">
                <h3
                  style={{ color: current.heroColor }}
                  className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight"
                >
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {pick(current.intro)}
                </p>
              </div>

              {/* Service & Food Bullets */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C88A36] shrink-0" />
                  <span>
                    <strong className="text-[#141923]">{L('Tipo de atención:', 'Service type:', '服务类型：')}</strong> {pick(current.serviceType)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C88A36] shrink-0" />
                  <span>
                    <strong className="text-[#141923]">{L('Tipo de comida:', 'Cuisine:', '菜系：')}</strong> {pick(current.foodType)}
                  </span>
                </div>
              </div>

              {/* Hours Block */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <span className="font-bold text-[#141923] block uppercase tracking-wider text-[11px]">
                  {L('Horario de atención', 'Opening hours', '营业时间')}
                </span>
                <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                  <li>
                    <strong className="text-slate-800">{L('Desayuno Buffet:', 'Breakfast buffet:', '自助早餐：')}</strong> {pick(current.breakfastHours)}
                  </li>
                  <li>
                    <strong className="text-slate-800">{L('A la carta:', 'À la carte:', '单点菜单：')}</strong> {pick(current.aLaCarteHours)}
                  </li>
                </ul>
              </div>

              {/* Contact Info Footer */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C88A36] shrink-0" />
                  <span>{pick(current.address)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C88A36] shrink-0" />
                  <span>{current.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C88A36] shrink-0" />
                  <span>{current.phone}</span>
                </div>
              </div>
            </div>

            {/* Right Large Food Platter Photo with Pinned Seal Badge */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 min-h-[320px]">
              <img
                src={current.cardDishImg}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              {/* Pinned Circular Seal Badge on Top Right */}
              <div
                style={{ backgroundColor: current.heroColor }}
                className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-white flex flex-col items-center justify-center text-white text-center shadow-lg"
              >
                <span className="font-editorial text-[10px] font-bold tracking-wider leading-none">
                  {current.brandSeal}
                </span>
                <span className="text-[6px] font-bold uppercase tracking-widest text-white/90">
                  {L('SOLANA', 'SOLANA', '索拉纳')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Platos Estrella & Carta */}
      <section className="py-14 sm:py-20 bg-[#FAF9F7] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="eyebrow-solana text-[#C88A36] block">
              {L('ESPECIALIDADES DEL CHEF', 'CHEF SPECIALTIES', '主厨招牌菜')}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141923] mt-1">
              {L('Platos Insignia de ', 'Signature Dishes of ', '招牌菜 · ')}{current.name.split(' ')[0]}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {current.specialties.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-editorial text-base font-bold text-[#141923]">
                      {pick(item.name)}
                    </h4>
                    <span className="num-tabular font-bold text-sm text-[#C88A36] shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {pick(item.desc)}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#0A1D37]">
                  <Utensils className="w-3.5 h-3.5 text-[#C88A36]" />
                  <span>{L('Preparado al instante', 'Prepared to order', '现点现做')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Desayuno Buffet Artesanal & Pisco Bar */}
      <section className="py-14 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C88A36]">
              <Coffee className="w-5 h-5" />
              <span className="eyebrow-solana">
                {L('TODAS LAS MAÑANAS', 'EVERY MORNING', '每天清晨')}
              </span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141923]">
              {L('Desayuno Buffet Artesanal Incluido', 'Artisanal Breakfast Buffet Included', '含手工自助早餐')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              {L(
                'Panadería de masa madre horneada en casa, estación de huevos al gusto, frutas de la estación seleccionadas, jugos prensados en frío, quesos andinos y café de especialidad de Chanchamayo.',
                'House-baked sourdough breads, made-to-order egg station, selected seasonal fruits, cold-pressed juices, Andean cheeses and specialty coffee from Chanchamayo.',
                '自家烘焙酸面包、现做鸡蛋档口、精选时令水果、冷压果汁、安第斯奶酪以及查恩查马约精品咖啡。'
              )}
            </p>
            <div className="p-4 rounded-xl bg-[#FAF9F7] border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0A1D37] block">{L('Horario Diario', 'Daily hours', '每日营业时间')}</span>
                <span className="text-slate-500">{L('6:00 a.m. a 10:00 a.m.', '6:00 a.m. to 10:00 a.m.', '早上6:00至10:00')}</span>
              </div>
              <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                {L('Gratis para Socios Club', 'Free for Club members', '俱乐部会员免费')}
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-16/10">
            <img
              src={HOTEL_MEDIA.breakfastTable}
              alt={L('Desayuno Buffet', 'Breakfast Buffet', '自助早餐')}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. Formulario de Reserva de Mesa */}
      <section id="reservar-mesa" className="py-16 bg-[#0A1D37] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-editorial text-3xl font-bold">
              {L('Reserva tu Mesa en ', 'Book Your Table at ', '预订餐桌 · ')}{current.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light">
              {L(
                'Abierto a huéspedes y público general. Te confirmamos disponibilidad al instante.',
                'Open to guests and the general public. We confirm availability instantly.',
                '欢迎住客及公众预订，我们将即时确认是否有位。'
              )}
            </p>
          </div>

          {resSent ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-editorial text-xl font-bold text-white">
                {L('¡Solicitud de Reserva Registrada!', 'Reservation Request Received!', '预订申请已登记！')}
              </h4>
              <p className="text-xs text-white/80">
                {L(
                  `Nos comunicaremos al ${resPhone} para confirmar los detalles de tu mesa.`,
                  `We will contact you at ${resPhone} to confirm your table details.`,
                  `我们将致电 ${resPhone} 与您确认餐桌详情。`
                )}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleBookingSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 text-[#141923] shadow-2xl space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="res-name" className="text-xs font-bold text-slate-700">
                    {L('Nombre completo *', 'Full name *', '姓名 *')}
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    placeholder={L('Ej. Roberto Sánchez', 'e.g. Robert Sanchez', '例如：张伟')}
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#C88A36]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="res-phone" className="text-xs font-bold text-slate-700">
                    {L('Teléfono / WhatsApp *', 'Phone / WhatsApp *', '电话 / WhatsApp *')}
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    placeholder="+51 987 654 321"
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#C88A36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label htmlFor="res-date" className="text-xs font-bold text-slate-700">
                    {L('Fecha *', 'Date *', '日期 *')}
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#C88A36]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="res-time" className="text-xs font-bold text-slate-700">
                    {L('Hora *', 'Time *', '时间 *')}
                  </label>
                  <input
                    id="res-time"
                    type="time"
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#C88A36]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="res-guests" className="text-xs font-bold text-slate-700">
                    {L('Personas *', 'Guests *', '人数 *')}
                  </label>
                  <select
                    id="res-guests"
                    value={resGuests}
                    onChange={(e) => setResGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#C88A36]"
                  >
                    <option value="1">{L('1 persona', '1 guest', '1位')}</option>
                    <option value="2">{L('2 personas', '2 guests', '2位')}</option>
                    <option value="4">{L('4 personas', '4 guests', '4位')}</option>
                    <option value="6">{L('6 personas', '6 guests', '6位')}</option>
                    <option value="8+">{L('8+ personas (Grupo)', '8+ guests (Group)', '8位以上（团体）')}</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#0A1D37] hover:bg-[#C88A36] text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  {L('Confirmar Reserva de Mesa', 'Confirm Table Reservation', '确认餐桌预订')}
                </button>
                <a
                  href={buildWhatsAppUrl(getWaMessage())}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EB958] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <WhatsAppLogo className="w-4 h-4" variant="badge" />
                  <span>{L('WhatsApp Directo', 'Direct WhatsApp', 'WhatsApp 直接联系')}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default RestaurantesPage;
