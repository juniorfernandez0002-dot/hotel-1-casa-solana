import React from 'react';
import { Award, BedDouble, HeartHandshake } from 'lucide-react';
import { useSolana } from '../context/SolanaContext';

export const WhySolanaSection: React.FC = () => {
  const { lang } = useSolana();
  const L = (zh: string, es: string, en: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  const pillars = [
    {
      icon: Award,
      title: L('官网直订最优价格保证', 'Mejor tarifa garantizada', 'Best direct rate guaranteed'),
      desc: L(
        '通过官方网站使用优惠码 SOLANA12 直接预订，无隐藏费用，无第三方平台佣金。',
        'Reserva directamente en nuestra web oficial con código SOLANA12 sin cargos ocultos ni comisiones de terceros.',
        'Reserve directly on our official site with SOLANA12 with zero OTA markups or hidden booking fees.'
      )
    },
    {
      icon: HeartHandshake,
      title: L('地道的秘鲁待客之道', 'Hospitalidad peruana auténtica', 'Authentic Peruvian hospitality'),
      desc: L(
        '双语管家通过 WhatsApp 全天候 24 小时服务，免排队入住，每家分店均有精选地方特色美食。',
        'Anfitriones bilingües 24/7 por WhatsApp, check-in sin esperas y gastronomía regional curada por sede.',
        'Bilingual 24/7 personal WhatsApp concierge, counter-free check-in and regional artisanal dining.'
      )
    },
    {
      icon: BedDouble,
      title: L('卓越舒适睡眠与温泉水疗', 'Confort superior & aguas termales', 'Superior sleep & thermal spa'),
      desc: L(
        '600 支秘鲁比马棉床品，隔音静谧建筑，欢迎携带宠物入住，并设有 34°C 恒温水疗池。',
        'Algodón Pima de 600 hilos, acústica insonorizada, políticas pet-friendly y circuitos de hidroterapia a 34°C.',
        '600-thread Peruvian Pima cotton, soundproofed architecture, pet-friendly stays and heated thermal spas.'
      )
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-andean-pattern border-b border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="eyebrow-solana text-[#C88A36] block">
            {L('我们的待客承诺', 'Compromiso de Hospitalidad', 'Our Promise')}
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#141923]">
            {L(
              '畅游秘鲁，选择 Casa Solana 的理由',
              'Razones para elegir a Casa Solana cuando viajes por el Perú',
              'Reasons to choose Casa Solana when traveling across Peru'
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F2EFE9] text-[#C88A36] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#0A1D37]">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
