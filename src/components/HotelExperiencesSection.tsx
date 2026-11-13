import React from 'react';
import { Compass, ArrowUpRight } from 'lucide-react';
import { useSolana } from '../context/SolanaContext';
import { WhatsAppLogo } from './SocialIcons';
import type { BilingualText } from '../types/hotel';

interface HotelExperience {
  title: BilingualText;
  destination: BilingualText;
  badge: BilingualText;
  description: BilingualText;
  highlights: BilingualText[];
  image: string;
}

const EXPERIENCES: HotelExperience[] = [
  {
    title: {
      es: 'Circuito Termal de Altura & Masajes de Piedras Volcánicas',
      en: 'High-Altitude Thermal Circuit & Volcanic Stone Ritual',
      zh: '高山矿物温泉水疗与火山热石深度疗愈'
    },
    destination: {
      es: 'Sanctuary · Valle Sagrado',
      en: 'Sanctuary · Sacred Valley',
      zh: '圣境 · 库斯科圣谷'
    },
    badge: {
      es: 'Bienestar & Spa Andino',
      en: 'Wellness & Andean Spa',
      zh: '安第斯温泉水疗'
    },
    description: {
      es: 'Sumérgete en pozas calientes con esencias de eucalipto silvestre y muña, seguido de terapias de relajación muscular con piedras volcánicas calientes recogidas del lecho del río Vilcanota.',
      en: 'Immerse in warm hydrotherapy pools infused with wild eucalyptus and muña, followed by deep muscle rituals using heated volcanic river stones from the Vilcanota riverbed.',
      zh: '沉浸在融入野生桉树与印加薄荷的温热矿物水疗池中，体验采自乌鲁班巴河床的火山热石深层舒缓理疗。'
    },
    highlights: [
      { es: 'Hidroterapia 38°C', en: '38°C Hydrotherapy', zh: '38°C 矿物水疗' },
      { es: 'Sauna de Eucalipto', en: 'Eucalyptus Sauna', zh: '桉树蒸汽桑拿' },
      { es: 'Piedras Calientes 60 min', en: '60m Hot Stones', zh: '60分钟热石按摩' }
    ],
    image: './images/hotel/spa-thermal-stone.jpg'
  },
  {
    title: {
      es: 'Travesía Privada en Yate hacia Islas Ballestas & Reserva de Paracas',
      en: 'Private Yacht Cruise to Ballestas Islands & Paracas Reserve',
      zh: '私家游艇巡游：巴列斯塔斯群岛与帕拉卡斯保护区'
    },
    destination: {
      es: 'Resort · Bahía de Paracas',
      en: 'Resort · Paracas Bay',
      zh: '度假村 · 帕拉卡斯海湾'
    },
    badge: {
      es: 'Aventura Marina',
      en: 'Ocean Expedition',
      zh: '尊享海洋远征'
    },
    description: {
      es: 'Zarpa directamente desde el muelle privado de nuestro resort. Avistamiento exclusivo de lobos marinos, pingüinos de Humboldt y el enigmático geoglifo de El Candelabro con brindis a bordo.',
      en: 'Set sail right from our resort private marina. Exclusive wildlife encounters with sea lions, Humboldt penguins, and the iconic Candelabra geoglyph with a champagne toast.',
      zh: '从酒店专属私家码头直接启航，近距离观赏海狮、洪堡企鹅与神秘的烛台地画，船上尊享香槟与精美茶点。'
    },
    highlights: [
      { es: 'Zarpe desde Muelle Privado', en: 'Private Marina Departure', zh: '专属私家码头启航' },
      { es: 'Cava & Bocadillos a Bordo', en: 'Champagne & Canapés', zh: '船上香槟与佐酒轻食' },
      { es: 'Guía Naturalista', en: 'Naturalist Guide', zh: '专业双语自然学者陪同' }
    ],
    image: './images/hotel/paracas-bay-clean.jpg'
  },
  {
    title: {
      es: 'Paseo Cultural al Atardecer por el Malecón & Barranco Colonial',
      en: 'Sunset Cultural Walk along Miraflores Clifftop & Bohemian Barranco',
      zh: '日落文化漫步：米拉弗洛雷斯海滨与波希米亚巴兰科'
    },
    destination: {
      es: 'Signature · Miraflores, Lima',
      en: 'Signature · Miraflores, Lima',
      zh: '尊荣 · 利马米拉弗洛雷斯'
    },
    badge: {
      es: 'Cultura & Arte Urbano',
      en: 'Culture & Urban Art',
      zh: '艺术与人文探索'
    },
    description: {
      es: 'Paseo guiado a pie o en bicicletas de diseño por los acantilados de la Costa Verde, Puente de los Suspiros y las galerías de arte contemporáneo de Barranco culminando en una cata de piscos.',
      en: 'Curated stroll or vintage bike ride along the dramatic Pacific clifftops, Bridge of Sighs, and private contemporary art studios in bohemian Barranco, ending with a guided pisco flight.',
      zh: '漫步或骑乘设计感复古单车，穿越太平洋悬崖绿岸、叹息桥与巴兰科当代画廊，最后在海景露台品鉴皮斯科烈酒。'
    },
    highlights: [
      { es: 'Bicicletas de Cortesía', en: 'Complimentary Bikes', zh: '免费复古单车' },
      { es: 'Cata de Pisco Quebranta', en: 'Pisco Flight Tasting', zh: '传统皮斯科品鉴' },
      { es: 'Vistas Panorámicas al Océano', en: 'Panoramic Pacific Views', zh: '太平洋全景视野' }
    ],
    image: './images/hotel/bay-sunset-resort.jpg'
  }
];

export const HotelExperiencesSection: React.FC = () => {
  const { lang, buildWhatsAppUrl } = useSolana();

  const tr = (item: BilingualText | undefined, fallback = ''): string => {
    if (!item) return fallback;
    if (lang === 'zh' && item.zh) return item.zh;
    if (lang === 'en' && item.en) return item.en;
    return item.es || item.en || fallback;
  };

  return (
    <section id="experiencias-solana" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F7] border border-slate-200 text-[#C88A36] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>
              {lang === 'zh'
                ? '目的地与非凡在地体验'
                : lang === 'es'
                ? 'Destinos & Experiencias Casa Solana'
                : 'Destinations & Signature Experiences'}
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1D37] tracking-tight">
            {lang === 'zh'
              ? '融入每一处目的地的自然灵性与文化精髓'
              : lang === 'es'
              ? 'Conéctate con la esencia natural y patrimonial de cada destino'
              : 'Connect with the natural and cultural spirit of each destination'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {lang === 'zh'
              ? '我们为宾客精心策划酒店内外专属私密旅程，让您的秘鲁之行兼具深度灵感、安心呵护与纯粹真实。'
              : lang === 'es'
              ? 'Diseñamos vivencias privadas dentro y fuera del hotel para que tu viaje al Perú sea transformador, seguro y auténtico.'
              : 'We curate bespoke private experiences inside and beyond each property for an authentic, safe, and enriching Peruvian journey.'}
          </p>
        </div>

        {/* 3 Experience Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="bg-[#FAF9F7] rounded-3xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between group hover:border-[#C88A36] transition-all duration-300"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={tr(exp.title)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-[#0A1D37]/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                      {tr(exp.destination)}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#C88A36] text-white text-[10px] font-bold uppercase tracking-wider">
                      {tr(exp.badge)}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-editorial text-xl font-bold text-[#0A1D37] leading-snug">
                    {tr(exp.title)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tr(exp.description)}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
                      >
                        {tr(h)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-200/80 mt-2">
                <a
                  href={buildWhatsAppUrl(
                    lang === 'zh'
                      ? `您好，Casa Solana专属礼宾，我想预约体验：“${exp.title.zh || exp.title.es}”。`
                      : lang === 'es'
                      ? `Hola Concierge Casa Solana, deseo reservar la experiencia: "${exp.title.es}".`
                      : `Hello Casa Solana Concierge, I would like to arrange the experience: "${exp.title.en}".`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-[#0A1D37] text-[#0A1D37] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200 transition-colors shadow-2xs"
                >
                  <WhatsAppLogo className="w-4 h-4" />
                  <span>
                    {lang === 'zh'
                      ? '联系礼宾预约'
                      : lang === 'es'
                      ? 'Coordinar con Concierge'
                      : 'Arrange with Concierge'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C88A36]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelExperiencesSection;
