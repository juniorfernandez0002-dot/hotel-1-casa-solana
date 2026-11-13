import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSolana } from '../context/SolanaContext';

export const FloatingClubWidget: React.FC = () => {
  const { lang } = useSolana();
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div
      role="region"
      aria-label="Beneficio Club Solana"
      className="fixed bottom-20 right-4 sm:right-6 z-[840] w-[310px] sm:w-[330px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans"
    >
      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label="Cerrar notificación"
        className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-[#0A1D37] hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="space-y-3 pr-2">
        <div>
          <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#141923]">
            {lang === 'zh'
              ? '注册立享礼遇'
              : lang === 'es'
              ? 'REGÍSTRATE Y GANA'
              : 'JOIN & SAVE'}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-baseline">
              <span className="text-[10px] font-bold text-slate-500 uppercase mr-1">
                {lang === 'zh' ? '最高' : lang === 'es' ? 'HASTA' : 'UP TO'}
              </span>
              <span className="num-tabular font-editorial text-3xl font-extrabold text-[#141923] leading-none">
                10%
              </span>
            </div>
            <div className="leading-tight">
              <span className="block text-[10px] font-bold text-slate-600">
                {lang === 'zh' ? '折扣' : lang === 'es' ? 'de descuento' : 'discount'}
              </span>
              <span className="inline-block px-1.5 py-0.5 rounded bg-[#C88A36]/15 text-[#C88A36] text-[9px] font-black uppercase tracking-wider">
                {lang === 'zh' ? '额外' : lang === 'es' ? 'ADICIONAL' : 'EXTRA'}
              </span>
            </div>
          </div>
          <span className="block text-[11px] font-semibold text-slate-500 mt-1">
            {lang === 'zh'
              ? '本单及后续入住均享专属优惠'
              : lang === 'es'
              ? 'en esta y en tus próximas reservas'
              : 'on this and future bookings'}
          </span>
        </div>

        <p className="text-[11px] text-slate-600 leading-snug">
          {lang === 'zh'
            ? '加入索拉纳尊享俱乐部，每次预订均解锁独家会员特权与积分礼遇。'
            : lang === 'es'
            ? 'Únete a Casa Solana Club y gana más beneficios exclusivos con cada reserva.'
            : 'Join Casa Solana Club and unlock member perks with every reservation.'}
        </p>

        <div className="pt-1 space-y-2">
          <Link
            to="/club"
            className="block w-full py-2.5 px-4 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-center text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            {lang === 'zh'
              ? '加入索拉纳尊享俱乐部'
              : lang === 'es'
              ? 'Quiero ser socio Casa Solana Club'
              : 'Join Casa Solana Club'}
          </Link>

          <Link
            to="/club"
            className="block text-center text-[11px] font-medium text-slate-500 hover:text-[#C88A36] transition-colors"
          >
            {lang === 'zh'
              ? '已经是会员？立即登录'
              : lang === 'es'
              ? '¿Ya eres socio? Inicia sesión'
              : 'Already a member? Sign in'}
          </Link>
        </div>
      </div>
    </div>
  );
};
