import React from 'react';
import { Link } from 'react-router-dom';
import { useSolana } from '../context/SolanaContext';
import { PaymentMethodCards } from './PaymentBadges';
import { BrandLogoSolana } from './BrandLogoSolana';
import {
  FacebookLogo,
  InstagramLogo,
  TikTokLogo,
  WhatsAppLogo,
  YouTubeLogo
} from './SocialIcons';

export const Footer: React.FC = () => {
  const { lang, setLang, buildWhatsAppUrl } = useSolana();

  const socialItems = [
    { name: 'Instagram', Icon: InstagramLogo, href: 'https://instagram.com' },
    { name: 'TikTok', Icon: TikTokLogo, href: 'https://tiktok.com' },
    { name: 'YouTube', Icon: YouTubeLogo, href: 'https://youtube.com' },
    { name: 'Facebook', Icon: FacebookLogo, href: 'https://facebook.com' },
    {
      name: 'WhatsApp',
      Icon: WhatsAppLogo,
      href: buildWhatsAppUrl(
        lang === 'zh'
          ? '您好，Casa Solana礼宾中心，我想咨询客房预订与空房情况。'
          : lang === 'es'
          ? 'Hola Central Casa Solana, deseo consultar disponibilidad.'
          : 'Hello Casa Solana Desk, asking about suite availability.'
      )
    }
  ];

  return (
    <footer className="bg-[#111317] text-white">
      {/* Row 1: Centered Social Channels Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-white/75">
            {lang === 'zh'
              ? '关注我们官方社交平台'
              : lang === 'es'
              ? 'Síguenos en nuestras redes'
              : 'Follow Casa Solana'}
          </span>
          <div className="flex items-center gap-2.5">
            {socialItems.map(({ name, Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="w-9 h-9 rounded-lg border border-[#C88A36]/50 text-[#C88A36] hover:bg-[#C88A36] hover:text-white flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Brand Lockup + Verified Payment Methods Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <Link to="/" className="inline-flex items-center gap-3">
            <BrandLogoSolana light className="w-9 h-9" />
            <div>
              <span className="font-editorial text-2xl font-bold tracking-wider text-white block leading-none">
                CASA SOLANA
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#C88A36] block mt-1">
                {lang === 'zh' ? '秘鲁精品酒店及水疗中心' : 'HOTELES & SPA PERÚ'}
              </span>
            </div>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold text-white/80 whitespace-nowrap">
              {lang === 'zh'
                ? '支持的安全支付方式'
                : lang === 'es'
                ? 'Medios de pago aceptados'
                : 'Accepted payment methods'}
            </span>
            <PaymentMethodCards />
          </div>
        </div>
      </div>

      {/* Row 3: Enterprise 5-Column Directory */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
        <div className="space-y-3">
          <h3 className="font-bold uppercase tracking-wider text-[#C88A36]">CASA SOLANA</h3>
          <ul className="space-y-2 text-white/75">
            <li>
              <Link to="/habitaciones" className="hover:text-white transition-colors">
                {lang === 'zh' ? '客房与套房系列' : lang === 'es' ? 'Habitaciones & Suites' : 'Suites & Villas'}
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="hover:text-white transition-colors">
                Club Solana (-12%)
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="hover:text-white transition-colors">
                {lang === 'zh' ? '宠物友好与庭院' : 'Pet Friendly & Jardines'}
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="hover:text-white transition-colors">
                {lang === 'zh' ? '安第斯生态与可持续' : lang === 'es' ? 'Sostenibilidad Andina' : 'Sustainability'}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold uppercase tracking-wider text-[#C88A36]">
            {lang === 'zh' ? '预订服务' : lang === 'es' ? 'RESERVAS' : 'RESERVATIONS'}
          </h3>
          <div className="space-y-2 text-white/75">
            <p>
              {lang === 'zh' ? '预订总机：' : lang === 'es' ? 'Central de reservas:' : 'Booking desk:'}
              <strong className="block text-white font-bold num-tabular mt-0.5">+51 1 445 8920</strong>
            </p>
            <p>
              {lang === 'zh' ? '24小时微信/WhatsApp：' : 'WhatsApp 24/7:'}
              <strong className="block text-white font-bold num-tabular mt-0.5">+51 984 248 890</strong>
            </p>
            <p>
              {lang === 'zh' ? '电子邮箱：' : 'Correo:'}
              <span className="block text-white font-semibold mt-0.5">reservas@casasolana.pe</span>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold uppercase tracking-wider text-[#C88A36]">
            {lang === 'zh' ? '宾客关怀' : lang === 'es' ? 'ATENCIÓN AL HUÉSPED' : 'GUEST CARE'}
          </h3>
          <ul className="space-y-2 text-white/75">
            <li>
              <Link to="/reservar" className="hover:text-white transition-colors">
                {lang === 'zh' ? '快速入住与极速退房' : 'Check-in & Check-out Express'}
              </Link>
            </li>
            <li>
              <Link to="/reservar" className="hover:text-white transition-colors">
                {lang === 'zh' ? '电子凭单与发票' : lang === 'es' ? 'Comprobantes electrónicos' : 'Electronic invoicing'}
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="hover:text-white transition-colors">
                {lang === 'zh' ? '常见问题 FAQ' : lang === 'es' ? 'Preguntas frecuentes' : 'Guest FAQ'}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold uppercase tracking-wider text-[#C88A36]">
            {lang === 'zh' ? '免费热线' : lang === 'es' ? 'LLÁMANOS GRATIS' : 'TOLL-FREE'}
          </h3>
          <div className="space-y-1.5 text-white/75 num-tabular">
            <p>
              {lang === 'zh' ? '秘鲁各省' : 'Perú Provincias'} <strong className="text-white block">0 800 48200</strong>
            </p>
            <p>
              {lang === 'zh' ? '美国与加拿大' : 'EE.UU. & Canadá'} <strong className="text-white block">+1 866 519 4410</strong>
            </p>
            <p>
              {lang === 'zh' ? '智利' : 'Chile'} <strong className="text-white block">080 091 4123</strong>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold uppercase tracking-wider text-[#C88A36]">
            {lang === 'zh' ? '商务会奖与声明' : lang === 'es' ? 'CORPORATIVO & LEGAL' : 'CORPORATE & LEGAL'}
          </h3>
          <p className="text-white/75 leading-relaxed">
            {lang === 'zh' ? '旅行社与会议团队：' : 'Agencias y Eventos:'}
            <span className="block text-white font-semibold mt-0.5">eventos@casasolana.pe</span>
          </p>
          <Link
            to="/reservar"
            className="inline-block bg-white rounded-md p-1.5 shadow-xs hover:opacity-95 transition-opacity"
          >
            <img
              src="./images/brands/libro-reclamaciones.webp"
              alt="Libro de Reclamaciones"
              className="h-11 w-auto object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Row 4: Legal Strip with right spacing for WhatsApp FAB */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:pr-20 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/60">
          <span>{lang === 'zh' ? 'CASA SOLANA 秘鲁精品酒店及水疗中心 · 版权所有 · 2026' : 'CASA SOLANA Hoteles & Spa Perú · Todos los derechos reservados · 2026'}</span>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="text-white/40 text-[10px] font-normal">
              {lang === 'zh' ? '技术支持 / Desarrollado por' : lang === 'es' ? 'Diseñado & Desarrollado por' : 'Designed & Developed by'}{' '}
              <a
                href="https://www.myfriendinc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 transition-colors hover:underline font-normal"
              >
                My Friend Inc.
              </a>
            </span>

            <span className="text-white/20">|</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                  lang === 'es' ? 'text-[#C88A36]' : 'text-white/80 hover:text-white'
                }`}
              >
                ES
              </button>
              <span className="text-white/20">/</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                  lang === 'en' ? 'text-[#C88A36]' : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="text-white/20">/</span>
              <button
                type="button"
                onClick={() => setLang('zh')}
                className={`font-bold tracking-wider cursor-pointer transition-colors ${
                  lang === 'zh' ? 'text-[#C88A36]' : 'text-white/80 hover:text-white'
                }`}
              >
                中文
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
