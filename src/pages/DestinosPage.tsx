import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Info } from 'lucide-react';
import { useSolana } from '../context/SolanaContext';
import { HOTEL_MEDIA } from '../data/hotelMedia';

type DestinoId = 'todos' | 'lima' | 'cusco' | 'ica';

type T3 = { es: string; en: string; zh: string };

interface Propiedad {
  id: string;
  destino: 'lima' | 'cusco' | 'ica';
  brandBadge: T3;
  nombre: string;
  ubicacion: T3;
  tagline: T3;
  pricePennies: number;
  taxesNote: T3;
  rating: number;
  reviews: number;
  foto: string;
  amenities: T3[];
  linkTo: string;
}

const PROPIEDADES: Propiedad[] = [
  {
    id: 'miraflores-signature',
    destino: 'lima',
    brandBadge: { es: 'CASA SOLANA SIGNATURE · MIRAFLORES LIMA', en: 'CASA SOLANA SIGNATURE · MIRAFLORES LIMA', zh: 'CASA SOLANA 精选 · 利马米拉弗洛雷斯' },
    nombre: 'Casa Solana Signature Miraflores',
    ubicacion: { es: 'Malecón de la Reserva 1035, Miraflores, Lima', en: 'Malecón de la Reserva 1035, Miraflores, Lima', zh: '利马米拉弗洛雷斯，Malecón de la Reserva 1035 号' },
    tagline: {
      es: 'Frente a los acantilados de la Costa Verde con vistas panorámicas al océano Pacífico y alta cocina marina.',
      en: 'Facing the Costa Verde cliffs with panoramic Pacific Ocean views and fine seafood cuisine.',
      zh: '正对绿色海岸悬崖，坐拥太平洋全景海景，并提供高级海鲜美食。'
    },
    pricePennies: 319,
    taxesNote: { es: '+ S/ 89 de IGV y servicios', en: '+ S/ 89 in taxes and service charges', zh: '另加 S/ 89 税费及服务费' },
    rating: 4.96,
    reviews: 1248,
    foto: HOTEL_MEDIA.lobbyLounge,
    amenities: [
      { es: 'Frente al Malecón', en: 'Malecón Front', zh: '临海滨步道' },
      { es: 'Restaurante Q’iswar', en: 'Q’iswar Restaurant', zh: 'Q’iswar 餐厅' },
      { es: 'Piscina Panorámica', en: 'Panoramic Pool', zh: '全景泳池' },
      { es: 'Cava de Vinos', en: 'Wine Cellar', zh: '葡萄酒窖' }
    ],
    linkTo: '/habitaciones'
  },
  {
    id: 'sanctuary-valle-sagrado',
    destino: 'cusco',
    brandBadge: { es: 'CASA SOLANA SANCTUARY · VALLE SAGRADO', en: 'CASA SOLANA SANCTUARY · SACRED VALLEY', zh: 'CASA SOLANA 静修 · 圣谷' },
    nombre: 'Casa Solana Sanctuary Valle Sagrado',
    ubicacion: { es: 'Carretera Urubamba - Ollantaytambo Km 68, Cusco', en: 'Urubamba - Ollantaytambo Road Km 68, Cusco', zh: '库斯科乌鲁班巴—奥扬泰坦博公路68公里处' },
    tagline: {
      es: 'Paz andina a orillas del río Vilcanota entre andenes sagrados, huerto orgánico y spa termal.',
      en: 'Andean peace on the banks of the Vilcanota River among sacred terraces, an organic garden and a thermal spa.',
      zh: '静卧维尔卡诺塔河畔，环绕神圣梯田、有机菜园与温泉水疗，尽享安第斯的宁静。'
    },
    pricePennies: 349,
    taxesNote: { es: '+ S/ 97 de IGV y servicios', en: '+ S/ 97 in taxes and service charges', zh: '另加 S/ 97 税费及服务费' },
    rating: 4.98,
    reviews: 876,
    foto: HOTEL_MEDIA.sacredValley,
    amenities: [
      { es: 'Vista a los Andes', en: 'Andes View', zh: '安第斯山景' },
      { es: 'Restaurante Killa Brasas', en: 'Killa Brasas Restaurant', zh: 'Killa Brasas 炭烤餐厅' },
      { es: 'Circuito Termal', en: 'Thermal Circuit', zh: '温泉疗养池组' },
      { es: 'Huerto Orgánico', en: 'Organic Garden', zh: '有机菜园' }
    ],
    linkTo: '/habitaciones'
  },
  {
    id: 'resort-bahia-paracas',
    destino: 'ica',
    brandBadge: { es: 'CASA SOLANA RESORT · BAHÍA DE PARACAS', en: 'CASA SOLANA RESORT · PARACAS BAY', zh: 'CASA SOLANA 度假村 · 帕拉卡斯海湾' },
    nombre: 'Casa Solana Resort Bahía de Paracas',
    ubicacion: { es: 'Av. Los Libertadores s/n, Bahía de Paracas, Ica', en: 'Av. Los Libertadores s/n, Paracas Bay, Ica', zh: '伊卡帕拉卡斯海湾，Av. Los Libertadores 无门牌号' },
    tagline: {
      es: 'Cambia la rutina por mar, calma, atardeceres dorados y muelle privado hacia las Islas Ballestas.',
      en: 'Trade routine for sea, calm, golden sunsets and a private pier to the Ballestas Islands.',
      zh: '用大海、宁静与金色日落取代日常琐碎，并可从私人码头前往巴耶斯塔斯群岛。'
    },
    pricePennies: 289,
    taxesNote: { es: '+ S/ 81 de IGV y servicios', en: '+ S/ 81 in taxes and service charges', zh: '另加 S/ 81 税费及服务费' },
    rating: 4.92,
    reviews: 643,
    foto: HOTEL_MEDIA.bayResort,
    amenities: [
      { es: 'Muelle Privado', en: 'Private Pier', zh: '私人码头' },
      { es: 'Piscinas Infinity', en: 'Infinity Pools', zh: '无边际泳池' },
      { es: 'Brisa Marina Lounge', en: 'Brisa Marina Lounge', zh: 'Brisa Marina 休闲吧' },
      { es: 'Tours Islas Ballestas', en: 'Ballestas Islands Tours', zh: '巴耶斯塔斯群岛游览' }
    ],
    linkTo: '/habitaciones'
  }
];

export const DestinosPage: React.FC = () => {
  const { lang, currency, formatRate } = useSolana();
  const L = (es: string, en: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);
  const pick = (v: T3) => v[lang] ?? v.en;
  const [activeFilter, setActiveFilter] = useState<DestinoId>('todos');

  const filtered =
    activeFilter === 'todos'
      ? PROPIEDADES
      : PROPIEDADES.filter((p) => p.destino === activeFilter);

  return (
    <div className="bg-[#FAF9F7] text-[#141923] w-full max-w-full overflow-x-hidden">
      {/* 1. Cinematic Wide-Angle Hero (Clean, Sharp Contrast) */}
      <section className="relative w-full h-[360px] sm:h-[420px] overflow-hidden bg-[#0A1D37]">
        <img
          src={HOTEL_MEDIA.sacredValley}
          alt={L('Destinos en Perú', 'Destinations in Peru', '秘鲁目的地')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C88A36]">
              {L('HOTELES EN EL PERÚ', 'HOTELS IN PERU', '秘鲁酒店')}
            </p>
            <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl drop-shadow-md">
              {L('Descubre el Perú con Casa Solana', 'Discover Peru with Casa Solana', '与 Casa Solana 一起探索秘鲁')}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 font-light max-w-xl leading-relaxed drop-shadow-sm">
              {L(
                'Tres santuarios de hospitalidad en Miraflores, el Valle Sagrado de los Incas y la Bahía de Paracas.',
                'Three sanctuaries of hospitality in Miraflores, the Sacred Valley of the Incas and Paracas Bay.',
                '三处尊享好客的静谧之所：米拉弗洛雷斯、印加圣谷与帕拉卡斯海湾。'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Destination Filter Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-[72px] z-20 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-start sm:justify-center gap-2 py-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'todos', label: L('Todos los Destinos', 'All Destinations', '所有目的地') },
              { id: 'lima', label: L('Lima (Miraflores)', 'Lima (Miraflores)', '利马（米拉弗洛雷斯）') },
              { id: 'cusco', label: L('Cusco (Valle Sagrado)', 'Cusco (Sacred Valley)', '库斯科（圣谷）') },
              { id: 'ica', label: L('Ica (Bahía de Paracas)', 'Ica (Paracas Bay)', '伊卡（帕拉卡斯海湾）') }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as DestinoId)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-[#0A1D37] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0A1D37]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Property Cards (Exact Casa Andina Card Architecture) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-6">
            {filtered.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* Hotel Photo (5 cols) */}
                <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[300px] overflow-hidden">
                  <img
                    src={hotel.foto}
                    alt={hotel.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                      {pick(hotel.brandBadge).split('·')[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Hotel Details & Pricing (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    {/* Location Badge & Rating */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-[#C88A36] uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{pick(hotel.ubicacion)}</span>
                      </span>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Star className="w-4 h-4 fill-[#F4B41A] text-[#F4B41A]" />
                        <span className="font-bold text-[#0A1D37]">{hotel.rating}</span>
                        <span className="text-slate-400">({hotel.reviews} {L('reseñas', 'reviews', '条评价')})</span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                      {hotel.nombre}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                      {pick(hotel.tagline)}
                    </p>

                    {/* Amenities pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {hotel.amenities.map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {pick(amenity)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Block & Buttons (Exact Casa Andina Formula) */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        {L('Tarifa por noche desde', 'Nightly rate from', '每晚起价')}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="num-tabular font-editorial text-3xl sm:text-4xl font-extrabold text-[#0A1D37]">
                          {currency === 'PEN'
                            ? `S/ ${hotel.pricePennies}`
                            : formatRate(Math.round(hotel.pricePennies / 3.75))}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <span>{pick(hotel.taxesNote)}</span>
                        <Info className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="inline-block mt-1 px-2 py-0.5 rounded bg-[#F4B41A]/20 text-[#0A1D37] text-[10px] font-black uppercase">
                        {L('+ 10% adicional socios Club', '+ extra 10% for Club members', '俱乐部会员额外再减10%')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
                      <Link
                        to={hotel.linkTo}
                        className="px-5 py-2.5 rounded-xl border border-[#0A1D37] text-[#0A1D37] hover:bg-[#0A1D37] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        {L('Ver Suites', 'View Suites', '查看套房')}
                      </Link>
                      <Link
                        to="/reservar"
                        className="px-6 py-2.5 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all"
                      >
                        {L('Reservar', 'Book', '立即预订')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinosPage;
