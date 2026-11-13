import React from 'react';
import { Link } from 'react-router-dom';
import { useSolana } from '../context/SolanaContext';

interface CyberCampaignBannerProps {
  className?: string;
}

export const CyberCampaignBanner: React.FC<CyberCampaignBannerProps> = ({
  className = ''
}) => {
  const { lang } = useSolana();
  const T = (es: string, en: string, zh: string) => (lang === 'zh' ? zh : lang === 'en' ? en : es);
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl shadow-xl border border-slate-200/80 bg-[#0A1D37] ${className}`}
    >
      {/* Background Split Photography: Cusco Heritage (left) + Paracas Pool Resort (right) */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 pointer-events-none">
        <div className="md:col-span-6 relative h-full overflow-hidden">
          <img
            src="./images/hotel/cusco-plaza-sunset.jpg"
            alt="Cusco Colonial Casa Solana"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        </div>
        <div className="md:col-span-6 relative h-full overflow-hidden">
          <img
            src="./images/hotel/hero-sanctuary-pool.jpg"
            alt="Resort Piscina Casa Solana"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </div>

      {/* Darkened overlay for pristine legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

      {/* Main Campaign Content Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8">
        {/* LEFT GRAPHIC BADGE (Exact to Image 3 Reference) */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-2">
          {/* Blue Container Box */}
          <div className="bg-[#0A2540]/90 border border-white/20 p-4 sm:p-5 rounded-xl backdrop-blur-xs shadow-2xl relative">
            <span className="block text-white font-serif italic text-base sm:text-xl font-bold tracking-wide -rotate-2">
              {T('¡Aprovecha!','Don’t miss out!','抓住良机！')}
            </span>

            {/* CYBER Bold Sans Typography */}
            <div className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-wider uppercase italic leading-none drop-shadow-md">
              {T('CYBER','CYBER','网络')}
            </div>

            {/* Magenta Angular Tag: CASA SOLANA + Cursor Arrow */}
            <div className="relative inline-flex items-center mt-1 -rotate-2">
              <div className="bg-[#E6007E] text-white font-black text-sm sm:text-lg uppercase tracking-wider px-4 sm:px-5 py-1.5 rounded-sm [clip-path:polygon(0_0,100%_0,95%_100%,0%_100%)] shadow-md">
                {T('CASA SOLANA','CASA SOLANA','索拉纳狂欢')}
              </div>
              {/* White Pointer Arrow (Exact to Image 3) */}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white absolute -right-3 -bottom-1 drop-shadow"
                fill="currentColor"
              >
                <path d="M4 0l16 12-7 1.5 4.5 9-3 1.5-4.5-9L4 20V0z" />
              </svg>
            </div>
          </div>

          {/* White Slanted Ribbon: COMPRA HASTA EL 12 DE NOVIEMBRE */}
          <div className="bg-white text-[#0A2540] px-4 py-1.5 rounded-sm shadow-md -rotate-1 [clip-path:polygon(4%_0,100%_0,96%_100%,0%_100%)] font-extrabold text-[10px] sm:text-xs tracking-widest uppercase">
            {T('COMPRA HASTA EL 12 DE NOVIEMBRE','BOOK UNTIL NOVEMBER 12','11月12日前购买')}
          </div>
        </div>

        {/* RIGHT PROMO BLOCK (Translucent Navy Blue Panel, Exact to Image 3) */}
        <div className="lg:col-span-7 bg-[#0A2540]/85 backdrop-blur-md border border-white/25 rounded-2xl p-5 sm:p-7 text-white shadow-2xl flex flex-col justify-between space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Massive 50% DTO. Lockup */}
            <div className="flex items-center gap-3">
              <div className="space-y-0 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 block">
                  {T('HASTA', 'UP TO', '最高')}
                </span>
                <div className="flex items-baseline gap-1 leading-none">
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white num-tabular">
                    50
                  </span>
                  <div className="text-left font-black leading-tight">
                    <span className="block text-2xl sm:text-3xl text-white">%</span>
                    <span className="block text-xs sm:text-sm text-white/90 tracking-wide uppercase">
                      {T('DTO.', 'OFF', '折扣')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Magenta Club Life Tag */}
              <div className="bg-[#E6007E] text-white px-3 sm:px-4 py-2 rounded-sm [clip-path:polygon(6%_0,100%_0,94%_100%,0%_100%)] shadow-sm max-w-[190px]">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black leading-none">+5%</span>
                  <span className="text-[10px] font-black uppercase leading-tight">
                    {T('ADICIONAL', 'EXTRA', '额外')}
                  </span>
                </div>
                <span className="text-[8px] font-bold uppercase tracking-wider block mt-0.5 text-white/95">
                  {T('PARA SOCIOS CASA SOLANA CLUB', 'FOR CASA SOLANA CLUB MEMBERS', '索拉纳俱乐部会员专享')}
                </span>
              </div>
            </div>

            {/* White Pill: HASTA 12 CUOTAS SIN INTERESES */}
            <div className="bg-white rounded-full px-4 py-2 shadow-sm shrink-0 border border-slate-200">
              <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#0A2540]">
                {T('HASTA', 'UP TO', '最高')}{' '}
                <strong className="text-[#0A2540] font-black">{T('12 CUOTAS', '12 INSTALLMENTS', '12期')}</strong>{' '}
                <span className="text-[#E6007E] font-black">{T('SIN INTERESES', 'INTEREST-FREE', '免息分期')}</span>
              </span>
            </div>
          </div>

          {/* Bottom Row: Official Peru Seals + RESERVA AQUÍ Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/20">
            {/* PromPerú and Y tú qué planes Official Badges */}
            <div className="flex items-center gap-4 shrink-0">
              {/* PromPerú Logo Lockup */}
              <div className="flex items-center gap-1.5 text-white/90">
                <svg
                  viewBox="0 0 120 40"
                  className="h-7 w-auto fill-current text-white"
                  aria-label="PromPerú"
                >
                  <path d="M14 6 C6 6 0 12 0 20 C0 28 6 34 14 34 C19 34 23 31 25 27 L19 27 C18 29 16 30 14 30 C9 30 5 26 5 20 C5 14 9 10 14 10 C17 10 19 12 20 14 L25 14 C23 9 19 6 14 6 Z M18 17 C16 17 15 18 15 20 C15 22 16 23 18 23 C20 23 21 22 21 20 C21 18 20 17 18 17 Z" />
                  <text
                    x="30"
                    y="25"
                    fontFamily="serif"
                    fontSize="17"
                    fontWeight="bold"
                    fill="currentColor"
                  >
                    prom
                  </text>
                  <text
                    x="75"
                    y="25"
                    fontFamily="sans-serif"
                    fontSize="17"
                    fontWeight="extrabold"
                    fill="#E6007E"
                  >
                    perú
                  </text>
                </svg>
              </div>

              <span className="text-white/30 text-sm">|</span>

              {/* Y tú qué planes Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#00A3E0] to-[#E6007E] text-white text-[10px] font-extrabold tracking-tight shadow-sm">
                <span>{T('¿Y tú qué planes?', 'What are your plans?', '你有什么计划？')}</span>
              </div>
            </div>

            {/* Bright Magenta RESERVA AQUÍ CTA Button */}
            <Link
              to="/ofertas"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-lg bg-[#E6007E] hover:bg-[#c9006f] text-white font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg transform hover:scale-[1.02]"
            >
              {T('RESERVA AQUÍ', 'BOOK HERE', '立即预订')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


