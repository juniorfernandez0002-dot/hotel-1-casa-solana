import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Coffee, ConciergeBell, Sparkles } from 'lucide-react';
import { HOTEL_MEDIA } from '../data/hotelMedia';
import { useSolana } from '../context/SolanaContext';
import { WhatsAppLogo } from '../components/SocialIcons';

export const ServicesSpaPage: React.FC = () => {
  const { lang, buildWhatsAppUrl } = useSolana();

  const offerings = [
    {
      icon: Sparkles,
      tag:
        lang === 'zh'
          ? '石疗水疗与矿物温泉'
          : lang === 'es'
          ? 'Bienestar & Aguas Termales'
          : 'Stone Hydrotherapy',
      badge:
        lang === 'zh'
          ? '双人体验 39美元起'
          : lang === 'es'
          ? 'Desde S/ 145 en pareja'
          : 'From $39 couples slot',
      title:
        lang === 'zh'
          ? '天然石砌温泉水疗与桉树草本蒸汽'
          : lang === 'es'
          ? 'Spa Termal en Piedra & Ritual de Eucalipto'
          : 'Thermal Stone Spa & Eucalyptus Steam',
      desc:
        lang === 'zh'
          ? '34°C 恒温天然矿物池、芳香桉树蒸汽室、双人私密理疗套房以及采用当地天然植物精油的深层调理按摩。'
          : lang === 'es'
          ? 'Piscinas climatizadas a 34°C, circuito de vapor aromático, cabinas en pareja y masajes curativos con aceites botánicos locales.'
          : 'Heated 93°F mineral plunge pools, aromatherapy eucalyptus steam rooms, couples massage rooms and botanical oil rituals.',
      bullets: [
        lang === 'zh' ? '每位住客每日专享60分钟私密时段' : lang === 'es' ? 'Acceso privado de 60 minutos por huésped' : 'Daily 60-minute reserved private guest slots',
        lang === 'zh' ? '长途飞行舒缓与高山火山热石理疗' : lang === 'es' ? 'Terapia post-vuelo y masajes geotermales' : 'Post-flight fatigue & hot volcanic stone therapy',
        lang === 'zh' ? '理疗后尊享特调温热安神草本茶' : lang === 'es' ? 'Té herbal tibio cortesía post sesión' : 'Complimentary post-ritual herbal infusions'
      ],
      image: HOTEL_MEDIA.spaThermal
    },
    {
      icon: Coffee,
      tag:
        lang === 'zh'
          ? '名厨料理与欢乐时光'
          : lang === 'es'
          ? 'Gastronomía & Happy Hour'
          : 'Artisan Culinary Table',
      badge:
        lang === 'zh'
          ? '午市套餐 20美元起 · 酒廊 12美元起'
          : lang === 'es'
          ? 'Almuerzo Desde S/ 75 · Happy Hour S/ 45'
          : 'Lunch from $20 · Bar from $12',
      title:
        lang === 'zh'
          ? '现做手工自助早餐、庭院午宴与日落鸡尾酒'
          : lang === 'es'
          ? 'Desayuno Buffet, Mesa Matinal & Happy Hour'
          : 'Courtyard Breakfast & 24/7 Dining',
      desc:
        lang === 'zh'
          ? '黎明前现烤天然酵母欧包、秘鲁单一产区精品咖啡、丰盛经典午餐与向公众开放的招牌鸡尾酒廊。'
          : lang === 'es'
          ? 'Masa madre horneada al amanecer, estación de café tostado de altura, almuerzos buffet criollos y coctelería de autor abierta también a visitantes.'
          : 'Sourdough baked before dawn, single-estate Peruvian coffees and intimate seasonal cellar dinners nightly.',
      bullets: [
        lang === 'zh' ? '手工自助早餐悠然供应至上午11:00' : lang === 'es' ? 'Desayuno buffet servido hasta las 11:00 h' : 'Morning table served leisurely until 11 AM',
        lang === 'zh' ? '每日提供纯素植物基与无麸质定制菜式' : lang === 'es' ? 'Opciones plant-based y libres de gluten' : 'Plant-based & gluten-sensitive menus daily',
        lang === 'zh' ? '每晚18:00至20:00日落欢乐时光买一赠一' : lang === 'es' ? 'Happy Hour 2x1 de 18:00 a 20:00 h' : 'Sunset Happy Hour nightly 6 PM – 8 PM'
      ],
      image: HOTEL_MEDIA.breakfastTable
    },
    {
      icon: ConciergeBell,
      tag:
        lang === 'zh'
          ? '商务会奖、浪漫婚礼与专属专车'
          : lang === 'es'
          ? 'Corporativo, Bodas & Traslados'
          : 'Personal Butler & Events',
      badge:
        lang === 'zh'
          ? '宴会厅最高容纳120位宾客'
          : lang === 'es'
          ? 'Salones hasta 120 invitados'
          : 'Halls up to 120 guests',
      title:
        lang === 'zh'
          ? '多功能宴会厅、豪华SUV专车与宠物友好庭院'
          : lang === 'es'
          ? 'Salones de Eventos, Choferes SUV & Pet Friendly'
          : 'Tarmac Chauffeurs & Boutique Celebrations',
      desc:
        lang === 'zh'
          ? '配备专业视听设备的模块化厅堂、客房内专属欢迎入住、庭院宠物友好政策及机场至酒店点对点豪华SUV专车接送。'
          : lang === 'es'
          ? 'Salones modulares equipados con audio Pro, check-in digital sin filas, política pet-friendly en jardines y choferes privados aeropuerto-hotel.'
          : 'Counter-free welcome right in your suite, vetted chauffeur sedans and courtyard buyouts for weddings or intimate executive offsites.',
      bullets: [
        lang === 'zh' ? '全车配备Wi-Fi的专属豪华SUV接送车队' : lang === 'es' ? 'Flota SUV privada con Wi-Fi a bordo' : 'Wi-Fi equipped SUV airport transfers',
        lang === 'zh' ? '企业专属茶歇方案与高规格商务晚宴' : lang === 'es' ? 'Menús corporativos y pausas de café' : 'Bespoke corporate catering breaks',
        lang === 'zh' ? '24小时专属微信/WhatsApp双语管家服务' : lang === 'es' ? 'Anfitrión personal ES / EN vía WhatsApp' : '24/7 dedicated EN / ES butler WhatsApp line'
      ],
      image: HOTEL_MEDIA.lobbyLounge
    }
  ];

  return (
    <div className="min-h-screen bg-andean-pattern py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="max-w-3xl space-y-2.5">
          <span className="eyebrow-solana text-[#C88A36]">
            {lang === 'zh'
              ? 'Casa Solana 核心体验、餐饮与水疗'
              : lang === 'es'
              ? 'Experiencias, Gastronomía & Spa Casa Solana'
              : 'Casa Solana Hospitality Pillars'}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0A1D37] leading-tight">
            {lang === 'zh'
              ? '温泉疗愈、名厨风味与无微不至的管家关怀'
              : lang === 'es'
              ? 'Bienestar termal, gastronomía abierta al público y atención sin esperas'
              : 'Thermal calm, artisanal mornings and seamless butler care'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'zh'
              ? '在利马、神圣谷与帕拉卡斯，Casa Solana 将奢华融入每一次温润的水疗循环、每一口刚出炉的欧包与每一次无缝的专车抵离。'
              : lang === 'es'
              ? 'En Miraflores, Valle Sagrado y Paracas, Casa Solana combina hospitalidad independiente con servicios pensados para que nunca sientas apuro.'
              : 'Across Miraflores, Sacred Valley and Paracas, Casa Solana blends boutique calm with thoughtful touches so your time in Peru feels timeless.'}
          </p>
        </div>

        <div className="space-y-8">
          {offerings.map((off, idx) => {
            const Icon = off.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={off.title}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12"
              >
                <div
                  className={`lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[260px] overflow-hidden ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={off.image}
                    alt={off.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#0A1D37]/90 text-[#F6D37A] text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs">
                      {off.badge}
                    </span>
                  </div>
                </div>

                <div
                  className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${
                    isReversed ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C88A36]">
                      <Icon className="w-4 h-4" />
                      <span>{off.tag}</span>
                    </div>

                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                      {off.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {off.desc}
                    </p>

                    <ul className="space-y-2 pt-2 text-xs text-[#141923]">
                      {off.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#009A3E] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      to="/habitaciones"
                      className="px-5 py-2.5 rounded-xl bg-[#0A1D37] hover:bg-[#C88A36] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
                    >
                      <span>
                        {lang === 'zh'
                          ? '将服务纳入我的预订'
                          : lang === 'es'
                          ? 'Incluir en mi reserva'
                          : 'Include in reservation'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={buildWhatsAppUrl(
                        lang === 'zh'
                          ? `您好，Casa Solana礼宾中心，我想咨询及预约：“${off.title}”。`
                          : lang === 'es'
                          ? `Hola Central Casa Solana, deseo reservar el servicio: ${off.title}.`
                          : `Hello Casa Solana, I want to book: ${off.title}.`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-[#0A1D37] hover:border-[#25D366] hover:text-[#25D366] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
                    >
                      <WhatsAppLogo className="w-4 h-4" />
                      <span>
                        {lang === 'zh'
                          ? '微信/WhatsApp 快速预约'
                          : lang === 'es'
                          ? 'Coordinar por WhatsApp'
                          : 'Arrange on WhatsApp'}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
