import React, { useState } from 'react';
import { ChefHat, Coffee, Utensils, Wine, ArrowUpRight, Clock } from 'lucide-react';
import { useSolana } from '../context/SolanaContext';
import { WhatsAppLogo } from './SocialIcons';
import type { BilingualText } from '../types/hotel';

interface DiningVenue {
  id: string;
  name: BilingualText;
  location: BilingualText;
  concept: BilingualText;
  hours: string;
  specialty: BilingualText;
  image: string;
  tag: BilingualText;
  priceGuide: BilingualText;
}

const DINING_VENUES: DiningVenue[] = [
  {
    id: 'qiswar',
    name: {
      es: "Q'iswar Cocina Contemporánea",
      en: "Q'iswar Contemporary Kitchen",
      zh: "Q'iswar 当代名厨餐厅"
    },
    location: {
      es: 'Miraflores, Lima · Terraza & Salón Principal',
      en: 'Miraflores, Lima · Clifftop Courtyard & Dining Room',
      zh: '利马米拉弗洛雷斯 · 海景露台与主宴会厅'
    },
    concept: {
      es: 'Propuesta de autor basada en la pesca artesanal del día, tubérculos nativos de altura y una cava con más de 80 etiquetas sudamericanas curadas.',
      en: 'Signature coastal dining celebrating day-boat Pacific catch, high-altitude native tubers and an eighty-label South American private wine cellar.',
      zh: '甄选当日太平洋手工捕捞海鲜、安第斯原生高山薯类，配以珍藏80余款南美名庄葡萄酒的私密酒窖。'
    },
    hours: '06:30 – 23:00',
    specialty: {
      es: 'Ceviche Caliente a la Brasa & Corvina en Costra de Quinua',
      en: 'Warm Ember Ceviche & Quinoa-Crusted Wild Seabass',
      zh: '炭火温热生腌鱼配藜麦脆皮野生鲈鱼'
    },
    image: './images/hotel/food-flatlay-gourmet.jpg',
    tag: {
      es: 'Cocina Peruana de Autor',
      en: 'Signature Coastal Dining',
      zh: '名厨当代秘鲁料理'
    },
    priceGuide: {
      es: 'Almuerzos desde S/ 65 · Cenas a la carta',
      en: 'Lunch from $18 · A la carte dinners',
      zh: '午市套餐 18美元起 · 晚市零点'
    }
  },
  {
    id: 'killa',
    name: {
      es: 'Killa Brasas & Horno Andino',
      en: 'Killa Hearth & Andean Grill',
      zh: 'Killa 安第斯炭火炙烤餐厅'
    },
    location: {
      es: 'Valle Sagrado, Cusco · Jardín de Molles',
      en: 'Sacred Valley, Cusco · Willow Hearth Gardens',
      zh: '库斯科神圣谷 · 柳林庭院'
    },
    concept: {
      es: 'Cocina a fuego lento en horno de barro y leña de eucalipto. Vegetales orgánicos cosechados en nuestro propio huerto minutos antes del servicio.',
      en: 'Slow-fire hearth cuisine roasted in traditional clay ovens with eucalyptus wood, alongside organic vegetables harvested from our garden.',
      zh: '传统陶土烤炉与桉木慢火烘炙，食材采摘自餐厅专属有机农园，纯天然质朴原味。'
    },
    hours: '07:00 – 22:00',
    specialty: {
      es: 'Cordero Lechal al Horno de Barro & Trucha de Altura Ahumada',
      en: 'Clay-Oven Roasted Suckling Lamb & High-Altitude Smoked Trout',
      zh: '陶炉慢烤安第斯乳羊排与高山冷水烟熏鳟鱼'
    },
    image: './images/hotel/food-lomo-saltado.jpg',
    tag: {
      es: 'Fuego, Horno & Huerta',
      en: 'Hearth, Clay & Garden',
      zh: '炭火·陶炉·有机农园'
    },
    priceGuide: {
      es: 'Platos desde S/ 58 · Menú degustación 5 tiempos',
      en: 'Mains from $16 · 5-Course Tasting Menu',
      zh: '主菜 16美元起 · 五道式品鉴菜单'
    }
  },
  {
    id: 'marina',
    name: {
      es: 'La Marea Ceviche & Pisco Bar',
      en: 'La Marea Ocean Bar & Cevichería',
      zh: 'La Marea 海滨生腌与皮斯科酒吧'
    },
    location: {
      es: 'Bahía Paracas · Muelle & Deck al Atardecer',
      en: 'Paracas Bay · Sunset Jetty & Ocean Deck',
      zh: '帕拉卡斯海湾 · 日落码头观景甲板'
    },
    concept: {
      es: 'Ceviches al momento, conchas de abanico frescas de la bahía, tiraditos y coctelería botánica con pisco quebranta artesanal frente a la caída del sol.',
      en: 'Minute-made ceviches, bay scallops, razor-sharp tiraditos, and craft botanical pisco cocktails enjoyed steps from calm Pacific waves.',
      zh: '现点现切海鲜生腌、帕拉卡斯海湾鲜带子，以及夕阳下的特调手工皮斯科鸡尾酒。'
    },
    hours: '11:00 – 23:30',
    specialty: {
      es: 'Tiradito Bicolor, Conchas a la Parmesana & Pisco Sour Catedral',
      en: 'Bicolor Tiradito, Scallops au Gratin & Cathedral Pisco Sour',
      zh: '双色生腌鱼片、焗烤海扇贝与大杯经典皮斯科酸酒'
    },
    image: './images/hotel/bay-sunset-resort.jpg',
    tag: {
      es: 'Frente al Mar & Pisco Bar',
      en: 'Oceanfront & Pisco Lounge',
      zh: '一线海景·皮斯科酒廊'
    },
    priceGuide: {
      es: 'Desde S/ 45 · Sunset Cocktails & Bites',
      en: 'From $12 · Sunset Cocktails',
      zh: '鸡尾酒及小食 12美元起'
    }
  }
];

export const HotelDiningSection: React.FC = () => {
  const { lang, buildWhatsAppUrl } = useSolana();
  const [activeVenue, setActiveVenue] = useState(DINING_VENUES[0]);

  const tr = (item: BilingualText | undefined, fallback = ''): string => {
    if (!item) return fallback;
    if (lang === 'zh' && item.zh) return item.zh;
    if (lang === 'en' && item.en) return item.en;
    return item.es || item.en || fallback;
  };

  return (
    <section id="gastronomia-solana" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header with Authority Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-[#C88A36]" />
              <span className="eyebrow-solana text-[#C88A36]">
                {lang === 'zh'
                  ? '特色餐饮与名厨餐厅'
                  : lang === 'es'
                  ? 'Gastronomía & Restaurantes Signature'
                  : 'Signature Dining & Restaurants'}
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1D37] tracking-tight leading-tight">
              {lang === 'zh'
                ? '地道秘鲁风味，向住客与公众开放'
                : lang === 'es'
                ? 'Sabores peruanos de origen abiertos a huéspedes y público local'
                : 'Authentic Peruvian gastronomy open to guests and local diners'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'zh'
                ? '从清晨现烤手工自助早餐，到帕拉卡斯海滨奢享晚宴与圣谷炭火烤炙，在三大胜地品味非凡秘鲁美食艺术。'
                : lang === 'es'
                ? 'Desde el desayuno buffet artesanal hasta cenas de alta cocina frente al mar y brasas en el Valle Sagrado. Disfruta de la mejor hospitalidad culinaria en nuestras 3 sedes.'
                : 'From artisan morning buffets to oceanfront fine dining and Andean hearths in the Sacred Valley. Enjoy premier culinary hospitality across all three properties.'}
            </p>
          </div>

          {/* Quick Value Pillars */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 bg-[#FAF9F7] p-3 rounded-xl border border-slate-200/80 shrink-0">
            <div className="flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-[#C88A36]" />
              <span>{lang === 'zh' ? '自助早餐' : lang === 'es' ? 'Desayuno Buffet' : 'Artisan Breakfast'}</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-[#C88A36]" />
              <span>{lang === 'zh' ? '午餐与晚宴' : lang === 'es' ? 'Almuerzos & Cenas' : 'Lunch & Dinners'}</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-1.5">
              <Wine className="w-4 h-4 text-[#C88A36]" />
              <span>{lang === 'zh' ? '皮斯科酒廊' : lang === 'es' ? 'Pisco Bar 24/7' : 'Pisco Lounge'}</span>
            </div>
          </div>
        </div>

        {/* Venue Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          {DINING_VENUES.map((venue) => {
            const isSelected = activeVenue.id === venue.id;
            return (
              <button
                key={venue.id}
                type="button"
                onClick={() => setActiveVenue(venue)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A1D37] text-white shadow-xs'
                    : 'bg-[#FAF9F7] text-slate-600 hover:text-[#0A1D37] hover:bg-slate-100'
                }`}
              >
                {tr(venue.name)}
              </button>
            );
          })}
        </div>

        {/* Featured Venue Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF9F7] rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Photo Column */}
          <div className="lg:col-span-6 relative aspect-4/3 lg:aspect-auto lg:h-[440px] overflow-hidden">
            <img
              src={activeVenue.image}
              alt={tr(activeVenue.name)}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[#0A1D37]/90 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
                {tr(activeVenue.tag)}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/60 shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C88A36]" />
                <span className="font-semibold text-slate-700">
                  {lang === 'zh' ? '营业时间：' : lang === 'es' ? 'Horario de atención:' : 'Hours:'}{' '}
                  <strong className="text-[#0A1D37]">{activeVenue.hours}</strong>
                </span>
              </div>
              <span className="font-bold text-[#C88A36] num-tabular">{tr(activeVenue.priceGuide)}</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C88A36] block">
                {tr(activeVenue.location)}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                {tr(activeVenue.name)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {tr(activeVenue.concept)}
              </p>
            </div>

            {/* Specialty Box */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#C88A36]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A1D37]">
                  {lang === 'zh'
                    ? '招牌菜品与主厨推荐'
                    : lang === 'es'
                    ? 'Plato Insignia & Recomendación del Chef'
                    : 'Signature Dish & Chef Pick'}
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                {tr(activeVenue.specialty)}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={buildWhatsAppUrl(
                  lang === 'zh'
                    ? `您好，Casa Solana餐厅前台，我想预订 ${activeVenue.name.zh || activeVenue.name.es} 的餐位。`
                    : lang === 'es'
                    ? `Hola Restaurante Casa Solana, deseo reservar una mesa en ${activeVenue.name.es}.`
                    : `Hello Casa Solana Dining Desk, I would like to reserve a table at ${activeVenue.name.en}.`
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EB958] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <WhatsAppLogo className="w-5 h-5" variant="badge" />
                <span>{lang === 'zh' ? '微信/WhatsApp 预订餐位' : lang === 'es' ? 'Reservar mesa por WhatsApp' : 'Reserve table via WhatsApp'}</span>
              </a>

              <a
                href={`mailto:reservas@casasolana.pe?subject=Reserva%20Mesa%20${encodeURIComponent(activeVenue.name.es)}`}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0A1D37] font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors"
              >
                <span>{lang === 'zh' ? '查看精选菜单' : lang === 'es' ? 'Consultar Carta & Menú' : 'View Menu'}</span>
                <ArrowUpRight className="w-4 h-4 text-[#C88A36]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelDiningSection;
