import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HOTEL_MEDIA } from '../data/hotelMedia';
import { useSolana } from '../context/SolanaContext';

export const HotelAuthorityGrid: React.FC = () => {
  const { lang } = useSolana();
  const navigate = useNavigate();

  const metrics = [
    {
      num: '6',
      title: lang === 'zh' ? '套房与独立别墅' : lang === 'es' ? 'Suites & Villas' : 'Suites & Villas',
      subtitle: lang === 'zh' ? '名师定制居所' : lang === 'es' ? 'espacios de autor' : 'bespoke residences',
      image: HOTEL_MEDIA.bayResort,
      onClick: () => navigate('/habitaciones')
    },
    {
      num: '3',
      title: lang === 'zh' ? '地标度假胜地' : lang === 'es' ? 'Destinos' : 'Destinations',
      subtitle: lang === 'zh' ? '秘鲁三大标志性 enclave' : lang === 'es' ? 'icónicos del Perú' : 'across Peru',
      image: HOTEL_MEDIA.cuscoPortal,
      onClick: () => document.getElementById('solana-locations-map')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      num: '3',
      title: lang === 'zh' ? '特色餐厅酒廊' : lang === 'es' ? 'Restaurantes' : 'Restaurants',
      subtitle: lang === 'zh' ? '时令美食与私人酒窖' : lang === 'es' ? 'cocina de estación y cava' : 'seasonal wine cellar',
      image: HOTEL_MEDIA.breakfastTable,
      onClick: () => navigate('/restaurantes')
    },
    {
      num: '4',
      title: lang === 'zh' ? '宴会厅与石疗水疗' : lang === 'es' ? 'Salas & Spa' : 'Spa & Events',
      subtitle: lang === 'zh' ? '矿物温泉与定制会议' : lang === 'es' ? 'aguas termales y eventos' : 'thermal baths & halls',
      image: HOTEL_MEDIA.lobbyLounge,
      onClick: () => navigate('/eventos')
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-andean-pattern border-b border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#141923]">
            {lang === 'zh'
              ? '探索 Casa Solana 呈现的全部非凡体验'
              : lang === 'es'
              ? 'Conoce todo lo que Casa Solana tiene para ti'
              : 'Discover everything Casa Solana offers'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m) => (
            <button
              key={m.title}
              type="button"
              onClick={m.onClick}
              className="group text-left bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              <div className="h-40 sm:h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={m.image}
                  alt={m.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5 flex items-center gap-3.5">
                <span className="num-tabular text-4xl sm:text-[2.6rem] font-extrabold text-[#141923] leading-none">
                  {m.num}
                </span>
                <div className="min-w-0">
                  <span className="block font-bold text-sm sm:text-base text-[#141923] group-hover:text-[#C88A36] transition-colors leading-tight">
                    {m.title}
                  </span>
                  <span className="block text-xs text-slate-500 truncate mt-0.5">
                    {m.subtitle}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
