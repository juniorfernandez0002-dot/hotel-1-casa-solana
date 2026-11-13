import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BedDouble,
  ChevronDown,
  Menu,
  Tag,
  Trash2,
  X,
  ChefHat,
  Building2,
  Compass,
  MapPin,
  Phone,
  User,
  Check,
  CheckCircle2
} from 'lucide-react';
import { BrandLogoSolana } from './BrandLogoSolana';
import { useSolana } from '../context/SolanaContext';
import { HOTEL_SUITES } from '../data/roomsData';

type MegaMenuTab = 'ofertas' | 'destinos' | 'restaurantes' | 'eventos' | null;

export const Navbar: React.FC = () => {
  const {
    lang,
    setLang,
    t,
    currency,
    setCurrency,
    staySlugs,
    toggleStaySlug,
    clearStayBag,
    formatRate
  } = useSolana();

  const [menuOpen, setMenuOpen] = useState(false);
  const [stayOpen, setStayOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuTab>(null);
  const [promoVisible, setPromoVisible] = useState(true);
  const [clubModalOpen, setClubModalOpen] = useState(false);
  const [clubRegistered, setClubRegistered] = useState(false);
  const [clubEmail, setClubEmail] = useState('');
  const [clubName, setClubName] = useState('');

  const savedSuites = HOTEL_SUITES.filter((s) => staySlugs.includes(s.slug));
  const T = (es: string, en: string, zh: string) =>
    lang === 'zh' ? zh : lang === 'en' ? en : es;
  const trSuite = (b: { es: string; en: string; zh?: string }) =>
    lang === 'zh' ? b.zh || b.en : lang === 'en' ? b.en : b.es;

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clubEmail && clubName) {
      setClubRegistered(true);
    }
  };

  return (
    <>
      {/* 1. Flagship Top Season Campaign Ribbon */}
      {promoVisible && (
        <div className="bg-[#0A1D37] text-white border-b border-white/10 relative z-[920]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 flex items-center justify-between gap-3 text-[11px] sm:text-xs">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
              <span className="px-2.5 py-0.5 rounded bg-[#D91E5B] text-white font-extrabold uppercase tracking-wider text-[10px] shrink-0">
                {T('TEMPORADA SOLANA', 'SOLANA SEASON', '索拉纳精选季')}
              </span>
              <span className="font-medium truncate">
                {lang === 'zh' ? (
                  <>
                    畅享住宿最高 <strong className="text-white font-extrabold">65折特惠</strong>
                  </>
                ) : lang === 'es' ? (
                  <>
                    Aprovecha hasta <strong className="text-white font-extrabold">35% dscto.</strong>
                  </>
                ) : (
                  <>
                    Enjoy up to <strong className="text-white font-extrabold">35% off stays</strong>
                  </>
                )}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#D91E5B]/90 text-white font-semibold text-[10px]">
                {T(
                  '+ 12% adicional Socios Club · Código SOLANA12',
                  '+ Extra 12% Club Solana · Code SOLANA12',
                  '俱乐部会员再享额外12%折扣 · 优惠码 SOLANA12'
                )}
              </span>
              <span className="hidden lg:inline text-white/75 text-[11px]">
                {T(
                  'Paga hasta en 12 cuotas sin intereses',
                  'Up to 12 interest-free installments',
                  '最高可享12期免息分期付款'
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/ofertas"
                onClick={() => setActiveMega(null)}
                className="px-3 py-1 rounded bg-[#D91E5B] hover:bg-[#b8164b] text-white font-bold text-[10px] uppercase tracking-wider transition-colors"
              >
                {T('Ir a ofertas', 'View offers', '查看优惠')}
              </Link>
              <button
                type="button"
                onClick={() => setPromoVisible(false)}
                aria-label={T('Cerrar promoción', 'Close promotion', '关闭促销栏')}
                className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Top Executive Utility Strip (Exact to Casa Andina's Top Bar) */}
      <div className="hidden lg:block bg-[#10151C] text-slate-300 text-[11px] border-b border-white/10 relative z-[910]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-9 flex items-center justify-between">
          {/* Left Contact & Service Telephones */}
          <div className="flex items-center gap-5 text-slate-400">
            <a
              href="tel:+5113916565"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C88A36]" />
              <span>{T('Central:', 'Desk:', '预订中心：')} +51 (01) 391-6565</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">
              {T('Atención al Huésped 24/7', 'Guest Service 24/7', '24小时全天候礼宾服务')}
            </span>
          </div>

          {/* Right Selectors: Currency, Language, B2B & Club Member Lockup */}
          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <div className="flex items-center gap-1">
              <label htmlFor="currency-select" className="sr-only">
                {T('Moneda', 'Currency', '货币')}
              </label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'USD' | 'PEN' | 'EUR')}
                className="bg-transparent text-white font-bold text-[11px] cursor-pointer focus:outline-none hover:text-[#C88A36] border-none"
              >
                <option value="PEN" className="bg-[#10151C] text-white">PEN (S/)</option>
                <option value="USD" className="bg-[#10151C] text-white">USD ($)</option>
                <option value="EUR" className="bg-[#10151C] text-white">EUR (€)</option>
              </select>
            </div>

            <span className="text-white/20">|</span>

            {/* Language Switcher: ES / EN / 中文 */}
            <div className="flex items-center gap-1.5 font-bold">
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`transition-colors cursor-pointer ${
                  lang === 'es' ? 'text-white underline underline-offset-2' : 'text-slate-400 hover:text-white'
                }`}
              >
                ES
              </button>
              <span className="text-white/20">/</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`transition-colors cursor-pointer ${
                  lang === 'en' ? 'text-white underline underline-offset-2' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="text-white/20">/</span>
              <button
                type="button"
                onClick={() => setLang('zh')}
                className={`transition-colors cursor-pointer ${
                  lang === 'zh' ? 'text-white underline underline-offset-2' : 'text-slate-400 hover:text-white'
                }`}
              >
                中文
              </button>
            </div>

            <span className="text-white/20">|</span>

            {/* Agencias / Corporativo Link */}
            <Link
              to="/corporativo"
              className="text-slate-300 hover:text-white transition-colors"
            >
              {T('Agencias & Corporativo', 'Travel Agencies & B2B', '旅行社与企业合作')}
            </Link>

            <span className="text-white/20">|</span>

            {/* Socio Club Solana Lockup (Exact to Socio Life) */}
            <div className="flex items-center gap-1.5 text-white">
              <User className="w-3.5 h-3.5 text-[#C88A36]" />
              <span className="font-editorial italic text-xs text-[#C88A36]">
                {T('Socio Club', 'Club Member', '俱乐部会员')}
              </span>
              <button
                type="button"
                onClick={() => setClubModalOpen(true)}
                className="hover:text-[#C88A36] transition-colors cursor-pointer ml-1"
              >
                {T('Inicia sesión', 'Sign in', '登录')}
              </button>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={() => setClubModalOpen(true)}
                className="text-[#C88A36] font-bold hover:underline transition-colors cursor-pointer"
              >
                {T('Regístrate gratis', 'Join free', '免费注册')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Luxury Navigation Header (Logo on Left, NO Desktop Hamburger, Open Bar) */}
      <header
        className="sticky top-0 z-[900] bg-white/97 backdrop-blur-md border-b border-slate-200/90 shadow-2xs"
        onMouseLeave={() => setActiveMega(null)}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 min-w-0">
          {/* LEFT: Detailed Architectural Logo on the Left */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group focus:outline-none"
            aria-label="Casa Solana Hoteles & Spa Perú"
          >
            <BrandLogoSolana className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105 shrink-0" />
            <div className="leading-tight text-left">
              <span className="font-editorial text-lg sm:text-2xl font-bold tracking-wider text-[#0A1D37] block">
                CASA SOLANA
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.24em] text-[#C88A36] block mt-0.5">
                {T('HOTELES & SPA PERÚ', 'HOTELS & SPA PERU', '秘鲁精品水疗酒店')}
              </span>
            </div>
          </Link>

          {/* CENTER: Desktop Open Horizontal Navigation Links (NO HAMBURGER MENU) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 text-[11px] xl:text-[13px] font-bold text-[#141923] shrink min-w-0">
            {/* 1. CYBER CASA SOLANA Pill */}
            <Link
              to="/ofertas"
              onClick={() => setActiveMega(null)}
              className="mr-1 px-2.5 xl:px-3 py-1.5 rounded-lg bg-[#eb3a7d] hover:bg-[#d82a6d] text-white text-[10px] xl:text-[11px] font-extrabold uppercase tracking-wider transition-colors shadow-2xs whitespace-nowrap shrink-0"
            >
              {T('CYBER SOLANA', 'CYBER SOLANA', '索拉纳狂欢特惠')}
            </Link>

            {/* 2. DESTINOS Y HOTELES */}
            <Link
              to="/destinos"
              onMouseEnter={() => setActiveMega('destinos')}
              onClick={() => setActiveMega(null)}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-2 rounded-lg hover:text-[#C88A36] transition-colors whitespace-nowrap shrink-0 ${
                activeMega === 'destinos' ? 'text-[#C88A36] bg-[#FAF9F7]' : ''
              }`}
            >
              <span>{lang === 'zh' ? '目的地' : lang === 'es' ? 'DESTINOS' : 'DESTINATIONS'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#C88A36] transition-transform ${activeMega === 'destinos' ? 'rotate-180' : ''}`} />
            </Link>

            {/* 3. OFERTAS (Mega Menu Trigger - Exact to Image 1) */}
            <Link
              to="/ofertas"
              onMouseEnter={() => setActiveMega('ofertas')}
              onClick={() => setActiveMega(null)}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-2 rounded-lg hover:text-[#C88A36] transition-colors whitespace-nowrap shrink-0 ${
                activeMega === 'ofertas' ? 'text-[#C88A36] bg-[#FAF9F7]' : ''
              }`}
            >
              <span>{lang === 'zh' ? '特惠' : lang === 'es' ? 'OFERTAS' : 'OFFERS'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#C88A36] transition-transform ${activeMega === 'ofertas' ? 'rotate-180' : ''}`} />
            </Link>

            {/* 4. RESTAURANTES */}
            <Link
              to="/restaurantes"
              onMouseEnter={() => setActiveMega('restaurantes')}
              onClick={() => setActiveMega(null)}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-2 rounded-lg hover:text-[#C88A36] transition-colors whitespace-nowrap shrink-0 ${
                activeMega === 'restaurantes' ? 'text-[#C88A36] bg-[#FAF9F7]' : ''
              }`}
            >
              <span>{lang === 'zh' ? '特色餐厅' : lang === 'es' ? 'RESTAURANTES' : 'DINING'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#C88A36] transition-transform ${activeMega === 'restaurantes' ? 'rotate-180' : ''}`} />
            </Link>

            {/* 5. CLUB SOLANA */}
            <Link
              to="/club"
              onMouseEnter={() => setActiveMega(null)}
              className="flex items-center gap-1 px-2 xl:px-2.5 py-2 rounded-lg hover:text-[#C88A36] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{lang === 'zh' ? '俱乐部' : 'CLUB SOLANA'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C88A36]" />
            </Link>

            {/* 6. CORPORATIVO */}
            <Link
              to="/corporativo"
              onMouseEnter={() => setActiveMega(null)}
              className="hidden xl:inline-block px-2 xl:px-2.5 py-2 rounded-lg hover:text-[#C88A36] transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'zh' ? '商务会议' : lang === 'es' ? 'CORPORATIVO' : 'CORPORATE'}
            </Link>

            {/* 7. EVENTOS & BODAS */}
            <Link
              to="/eventos"
              onMouseEnter={() => setActiveMega('eventos')}
              onClick={() => setActiveMega(null)}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-2 rounded-lg hover:text-[#C88A36] transition-colors whitespace-nowrap shrink-0 ${
                activeMega === 'eventos' ? 'text-[#C88A36] bg-[#FAF9F7]' : ''
              }`}
            >
              <span>{lang === 'zh' ? '宴会婚礼' : lang === 'es' ? 'EVENTOS' : 'EVENTS'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#C88A36] transition-transform ${activeMega === 'eventos' ? 'rotate-180' : ''}`} />
            </Link>
          </nav>

          {/* RIGHT: Stay Bag Counter + Flagship Gold "RESERVAR" CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Saved Stay Bag Pill */}
            <button
              type="button"
              onClick={() => setStayOpen(true)}
              aria-label={t.nav.stayBag}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0A1D37] bg-slate-100 hover:bg-slate-200/90 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <BedDouble className="w-4 h-4 text-[#C88A36]" />
              <span className="num-tabular hidden xl:inline">{t.nav.stayBag}</span>
              <span className="num-tabular px-1.5 py-0.5 rounded-full bg-[#0A1D37] text-white text-[10px] leading-none">
                {savedSuites.length}
              </span>
            </button>

            {/* Primary Golden Ochre Booking CTA */}
            <Link
              to="/reservar"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all transform hover:scale-[1.02]"
            >
              {lang === 'zh' ? '立即预订' : t.nav.bookCta}
            </Link>

            {/* Mobile-Only Hamburger Toggle (< lg) */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={T('Abrir menú móvil', 'Open mobile menu', '打开菜单')}
              className="lg:hidden p-1.5 rounded-xl text-[#0A1D37] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 4. Luxury Full-Width Mega-Menu Panel (Exact Layout to Image 1) */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-[#141618] text-white border-t border-white/10 shadow-2xl z-[890]"
            >
              <div className="max-w-[1440px] mx-auto px-8 py-8">
                {/* --- MEGA-MENU: OFERTAS (Exact to Image 1) --- */}
                {activeMega === 'ofertas' && (
                  <div className="grid grid-cols-12 gap-8 items-start">
                    {/* Column 1: BANCOS */}
                    <div className="col-span-3 space-y-4 border-r border-white/10 pr-6">
                      <div className="border-b border-white/20 pb-2">
                        <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                          {T('BANCOS', 'BANK DEALS', '银行专属优惠')}
                        </span>
                      </div>
                      <ul className="space-y-3 text-xs text-white/75 font-semibold">
                        <li>
                          <Link
                            to="/ofertas"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('CUOTAS SIN INTERESES', '0% INTEREST INSTALLMENTS', '免息分期付款')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/ofertas"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('CUENTA SUELDO INTERBANK (-25%)', 'INTERBANK SALARY DEAL (-25%)', 'Interbank 银行卡专享 75 折')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/ofertas"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('CUENTA SUELDO BCP (-25%)', 'BCP SALARY ACCOUNT DEAL (-25%)', 'BCP 秘鲁信贷银行 75 折')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/ofertas"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('BENEFICIOS BBVA (-25%)', 'BBVA TRAVEL BENEFITS (-25%)', 'BBVA 银行旅行礼遇 75 折')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/ofertas"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('PRIVILEGIOS DINERS CLUB', 'DINERS CLUB PRIVILEGES', '大来卡（Diners Club）尊享礼遇')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/ofertas"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('BENEFICIOS SCOTIABANK (-22%)', 'SCOTIABANK OFFERS (-22%)', '丰业银行（Scotiabank）78 折优惠')}
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2: RESTAURANTES */}
                    <div className="col-span-3 space-y-4 border-r border-white/10 pr-6">
                      <div className="border-b border-white/20 pb-2">
                        <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                          {T('RESTAURANTES', 'DINING OFFERS', '餐饮美食优惠')}
                        </span>
                      </div>
                      <ul className="space-y-3 text-xs text-white/75 font-semibold">
                        <li>
                          <Link
                            to="/restaurantes"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('DESCUENTOS CON BANCOS EN CARTA', 'BANK DINING SPECIALS', '单点菜单银行卡专属折扣')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/restaurantes"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('TEA TIME CRIOLLO & DULCES LIMEÑOS', 'AFTERNOON TEA TIME', '秘鲁传统风味下午茶与甜点')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/restaurantes"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('PROMO PISCO SOUR 2X1 CATEDRAL', 'PISCO SOUR 2X1 HAPPY HOUR', '大教堂皮斯科酸酒买一送一')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/restaurantes"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('BUFFETS DESAYUNO ARTESANAL', 'ARTISAN BREAKFAST BUFFET', '每日手工现做自助早餐')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/restaurantes"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('ALMUERZOS BUFFET EN MIRAFLORES', 'LUNCH BUFFET MIRAFLORES', '米拉弗洛雷斯自助午餐')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/restaurantes"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('CENAS MARIDAJE VALLE SAGRADO', 'SACRED VALLEY PAIRING DINNERS', '神圣谷主厨美酒配餐晚宴')}
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3: PAQUETES */}
                    <div className="col-span-3 space-y-4 border-r border-white/10 pr-6">
                      <div className="border-b border-white/20 pb-2">
                        <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                          {T('PAQUETES', 'PACKAGES', '精选度假套餐')}
                        </span>
                      </div>
                      <ul className="space-y-3 text-xs text-white/75 font-semibold">
                        <li>
                          <Link
                            to="/ofertas"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('PAQUETE ESTADÍA Y COMIDA INCLUIDAS', 'STAY & MEALS INCLUDED', '一价全包住宿含餐套餐')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/servicios"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('RELÁJATE EN CASA SOLANA (SPA & TERMAS)', 'RELAX AT CASA SOLANA (SPA)', '索拉纳温泉水疗放松套餐')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/habitaciones"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('ENAMÓRATE EN CASA SOLANA (ROMÁNTICO)', 'ROMANTIC GETAWAY', '浪漫情侣蜜月套餐')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/corporativo"
                            onClick={() => setActiveMega(null)}
                            className="hover:text-[#C88A36] uppercase tracking-wide transition-colors block"
                          >
                            {T('PLANEAMIENTO ESTRATÉGICO B2B', 'EXECUTIVE RETREAT & STRATEGY', '企业战略会议与静修套餐')}
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 4: LA MEJOR OFERTA (Exact to Image 1 Card) */}
                    <div className="col-span-3 space-y-3">
                      <span className="text-xs font-bold tracking-widest uppercase text-white/90 block border-b border-white/20 pb-2">
                        {T('LA MEJOR OFERTA', 'TOP OFFER', '今日最热特惠')}
                      </span>
                      <div className="bg-[#E6007E] rounded-2xl p-5 text-white text-center space-y-3 shadow-xl relative overflow-hidden">
                        <div className="space-y-0.5">
                          <span className="block text-white font-serif italic text-sm font-bold -rotate-2">
                            {T('¡Aprovecha!', 'Don’t miss out!', '抓住良机！')}
                          </span>
                          <div className="text-white font-black text-2xl tracking-wider uppercase italic leading-none">
                            {T('CYBER', 'CYBER', '网络')}
                          </div>
                          <div className="inline-block bg-[#0A2540] text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-sm mt-0.5">
                            {T('CASA SOLANA', 'CASA SOLANA', '索拉纳狂欢')}
                          </div>
                        </div>

                        <div className="py-1">
                          <span className="text-[10px] font-bold text-white/90 block uppercase">
                            {T('Hasta', 'Up to', '最高立减')}
                          </span>
                          <div className="flex items-baseline justify-center gap-1 leading-none mt-0.5">
                            <span className="font-editorial text-5xl font-black text-white num-tabular">
                              50
                            </span>
                            <div className="text-left font-black">
                              <span className="block text-xl leading-none">%</span>
                              <span className="block text-[9px] uppercase tracking-wide">
                                {T('DCTO.', 'OFF', '折扣')}
                              </span>
                            </div>
                          </div>
                          <span className="block text-[10px] font-bold text-white/90 mt-1 uppercase">
                            {T('Compra hasta el 12 de Noviembre', 'Book until November 12', '11月12日前购买有效')}
                          </span>
                        </div>

                        <Link
                          to="/ofertas"
                          onClick={() => setActiveMega(null)}
                          className="block w-full py-2 rounded-lg bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          {T('Ver promoción', 'View promo', '查看活动详情')}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- MEGA-MENU: DESTINOS Y HOTELES --- */}
                {activeMega === 'destinos' && (
                  <div className="grid grid-cols-3 gap-6">
                    <Link
                      to="/destinos"
                      onClick={() => setActiveMega(null)}
                      className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all block"
                    >
                      <img
                        src="./images/hotel/breakfast-gourmet-table.jpg"
                        alt={T('Miraflores', 'Miraflores', '米拉弗洛雷斯')}
                        className="w-full h-36 object-cover rounded-xl mb-3"
                      />
                      <span className="text-[10px] font-bold uppercase text-[#C88A36] block">
                        {T('Lima', 'Lima', '利马')}
                      </span>
                      <h4 className="font-editorial text-lg font-bold text-white group-hover:text-[#C88A36] transition-colors">
                        {T('Miraflores Signature', 'Miraflores Signature', '米拉弗洛雷斯精选酒店')}
                      </h4>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1">
                        {T(
                          'Frente al malecón de la Costa Verde, alta gastronomía marina y suites con vista al Pacífico.',
                          'Facing the Costa Verde cliffs, signature seafood dining and Pacific Ocean suites.',
                          '正对绿色海岸悬崖，融合顶级海鲜美食与太平洋海景套房。'
                        )}
                      </p>
                    </Link>

                    <Link
                      to="/destinos"
                      onClick={() => setActiveMega(null)}
                      className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all block"
                    >
                      <img
                        src="./images/hotel/sacred-valley-andes.jpg"
                        alt={T('Valle Sagrado', 'Sacred Valley', '圣谷')}
                        className="w-full h-36 object-cover rounded-xl mb-3"
                      />
                      <span className="text-[10px] font-bold uppercase text-[#C88A36] block">
                        {T('Cusco', 'Cusco', '库斯科')}
                      </span>
                      <h4 className="font-editorial text-lg font-bold text-white group-hover:text-[#C88A36] transition-colors">
                        {T('Sanctuary Valle Sagrado', 'Sanctuary Sacred Valley', '神圣谷静修圣域酒店')}
                      </h4>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1">
                        {T(
                          'Paz andina a orillas del río Vilcanota con spa termal, huerto orgánico y fogatas nocturnas.',
                          'Andean serenity along the Vilcanota River with thermal spa, organic garden and firepits.',
                          '静卧维尔卡诺塔河畔，坐拥安第斯温泉水疗、有机菜园与夜间篝火。'
                        )}
                      </p>
                    </Link>

                    <Link
                      to="/destinos"
                      onClick={() => setActiveMega(null)}
                      className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all block"
                    >
                      <img
                        src="./images/hotel/bay-sunset-resort.jpg"
                        alt={T('Paracas', 'Paracas', '帕拉卡斯')}
                        className="w-full h-36 object-cover rounded-xl mb-3"
                      />
                      <span className="text-[10px] font-bold uppercase text-[#C88A36] block">
                        {T('Ica', 'Ica', '伊卡')}
                      </span>
                      <h4 className="font-editorial text-lg font-bold text-white group-hover:text-[#C88A36] transition-colors">
                        {T('Resort Bahía de Paracas', 'Paracas Bay Resort', '帕拉卡斯海湾度假村')}
                      </h4>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1">
                        {T(
                          'Villas y suites con muelle privado hacia Islas Ballestas, piscinas infinity y sunset bar.',
                          'Villas and suites with a private pier to the Ballestas Islands, infinity pools and sunset bar.',
                          '独栋别墅与套房，配备直通巴耶斯塔斯群岛的私人码头、无边际泳池与日落酒吧。'
                        )}
                      </p>
                    </Link>
                  </div>
                )}

                {/* --- MEGA-MENU: RESTAURANTES --- */}
                {activeMega === 'restaurantes' && (
                  <div className="grid grid-cols-4 gap-6 text-left">
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-white">Q’iswar &amp; Cava</h4>
                      <span className="text-[10px] text-[#C88A36] uppercase font-bold block">
                        {T('Miraflores', 'Miraflores', '米拉弗洛雷斯')}
                      </span>
                      <p className="text-xs text-white/70">
                        {T(
                          'Ceviche de pesca del día, lomo al wok y cava con más de 120 etiquetas internacionales.',
                          'Fresh catch ceviche, wok-seared lomo saltado and a 120-label international cellar.',
                          '每日鲜鱼酸橘汁腌鱼、爆炒牛柳以及珍藏逾120款佳酿的酒窖。'
                        )}
                      </p>
                      <Link
                        to="/restaurantes"
                        onClick={() => setActiveMega(null)}
                        className="text-xs text-[#C88A36] hover:underline font-bold pt-1 inline-block"
                      >
                        {T('Ver restaurante →', 'Explore restaurant →', '探索餐厅 →')}
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-white">
                        {T('Killa Fuego & Brasas', 'Killa Fire & Grill', 'Killa 炭火料理')}
                      </h4>
                      <span className="text-[10px] text-[#C88A36] uppercase font-bold block">
                        {T('Valle Sagrado', 'Sacred Valley', '神圣谷')}
                      </span>
                      <p className="text-xs text-white/70">
                        {T(
                          'Cocina a la leña, trucha fresca del Vilcanota y cordero lechal con huerto orgánico.',
                          'Wood-fired cooking, fresh Vilcanota trout and suckling lamb with organic produce.',
                          '柴火炭烤料理，鲜美维尔卡诺塔河鳟鱼及有机农场时蔬配烤乳羊。'
                        )}
                      </p>
                      <Link
                        to="/restaurantes"
                        onClick={() => setActiveMega(null)}
                        className="text-xs text-[#C88A36] hover:underline font-bold pt-1 inline-block"
                      >
                        {T('Ver restaurante →', 'Explore restaurant →', '探索餐厅 →')}
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-white">Brisa Marina Lounge</h4>
                      <span className="text-[10px] text-[#C88A36] uppercase font-bold block">
                        {T('Paracas', 'Paracas', '帕拉卡斯')}
                      </span>
                      <p className="text-xs text-white/70">
                        {T(
                          'Tiraditos de corvina, conchas de abanico a la parrilla y coctelería de autor frente a la bahía.',
                          'Corvina tiraditos, grilled bay scallops and craft cocktails facing Paracas Bay.',
                          '海湾现切海鲈鱼刺身、碳烤扇贝以及面对大海的手工特调鸡尾酒。'
                        )}
                      </p>
                      <Link
                        to="/restaurantes"
                        onClick={() => setActiveMega(null)}
                        className="text-xs text-[#C88A36] hover:underline font-bold pt-1 inline-block"
                      >
                        {T('Ver restaurante →', 'Explore restaurant →', '探索餐厅 →')}
                      </Link>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-2 text-[#C88A36]">
                        <ChefHat className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {T('Desayuno Buffet', 'Breakfast Buffet', '手工自助早餐')}
                        </span>
                      </div>
                      <h5 className="font-editorial text-sm font-bold text-white">
                        {T(
                          'Panadería artesanal y frutos de estación',
                          'Artisan bakery and seasonal highland fruit',
                          '现烤酸面包与安第斯时令鲜果'
                        )}
                      </h5>
                      <p className="text-[11px] text-white/75 leading-relaxed">
                        {T(
                          'Incluido en todas las reservas directas de socios Club Solana.',
                          'Complimentary on all direct bookings for Club Solana members.',
                          '索拉纳俱乐部会员所有官网直订均可免费尊享。'
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* --- MEGA-MENU: EVENTOS --- */}
                {activeMega === 'eventos' && (
                  <div className="grid grid-cols-3 gap-6 text-left">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A36] block">
                        {T('Corporativo & Congresos', 'Corporate & Summits', '企业峰会与会议')}
                      </span>
                      <h4 className="font-editorial text-lg font-bold text-white">
                        {T('Salas 4K & Auditorios', '4K Suites & Auditoriums', '4K 智能会议室与大礼堂')}
                      </h4>
                      <p className="text-xs text-white/70">
                        {T(
                          'Capacidad de 30 a 450 personas con conectividad simétrica para streaming y cabinas de traducción.',
                          '30 to 450 guests with symmetrical streaming fiber and simultaneous translation booths.',
                          '可容纳 30 至 450 人，配备高速直播光纤网络与同声传译室。'
                        )}
                      </p>
                      <Link
                        to="/corporativo"
                        onClick={() => setActiveMega(null)}
                        className="text-xs text-[#C88A36] hover:underline font-bold inline-block"
                      >
                        {T('Cotizar en línea →', 'Request B2B quote →', '在线获取企业报价 →')}
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A36] block">
                        {T('Bodas de Ensueño', 'Dream Weddings', '梦幻目的地婚礼')}
                      </span>
                      <h4 className="font-editorial text-lg font-bold text-white">
                        {T('Jardines en Valle Sagrado', 'Sacred Valley Gardens', '神圣谷婚礼花园')}
                      </h4>
                      <p className="text-xs text-white/70">
                        {T(
                          'Ceremonias al pie de los nevados andinos con toldos arquitectónicos y banquete de autor.',
                          'Ceremonies beneath Andean snow peaks with architectural marquees and gourmet banquets.',
                          '在安第斯雪山脚下举办露天婚礼仪式，尊享定制帐篷与主厨婚宴。'
                        )}
                      </p>
                      <Link
                        to="/eventos"
                        onClick={() => setActiveMega(null)}
                        className="text-xs text-[#C88A36] hover:underline font-bold inline-block"
                      >
                        {T('Ver paquetes de bodas →', 'View wedding packages →', '查看婚礼套餐 →')}
                      </Link>
                    </div>

                    <div className="bg-[#0A1D37] border border-white/20 rounded-2xl p-5 space-y-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C88A36]/20 text-[#C88A36] text-[10px] font-bold uppercase">
                        {T('Cotización en 2 Horas', 'Quote in 2 Hours', '2小时极速报价')}
                      </div>
                      <h5 className="font-editorial text-base font-bold text-white">
                        {T('¿Coordinas un evento masivo?', 'Planning a large gathering?', '正在筹办大型活动或会议？')}
                      </h5>
                      <p className="text-xs text-white/75">
                        {T(
                          'Envía tus requerimientos a nuestra ejecutiva B2B dedicada y recibe cotización formal.',
                          'Share your specs with our dedicated B2B planner and receive a formal proposal.',
                          '向我们的专属企业客户经理发送需求，即可快速获取正式报价方案。'
                        )}
                      </p>
                      <Link
                        to="/corporativo"
                        onClick={() => setActiveMega(null)}
                        className="block text-center w-full py-2.5 rounded-lg bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        {T('Abrir Cotizador B2B', 'Open B2B Quoter', '打开企业报价表单')}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 5. Club Solana Registration / Login Modal (Triggered directly from navbar) */}
      {clubModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1050] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setClubModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setClubModalOpen(false)}
              aria-label={T('Cerrar modal', 'Close modal', '关闭弹窗')}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-[#0A1D37] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-widest text-[#0A1D37]">
                  CASA SOLANA
                </span>
                <span className="font-serif italic text-2xl text-[#C88A36]">club</span>
              </div>
              <p className="text-xs text-slate-600">
                {T(
                  'Únete gratis y disfruta de beneficios exclusivos en todas nuestras sedes',
                  'Join for free and unlock member rates across all properties',
                  '免费加入并在所有酒店享受专属会员礼遇'
                )}
              </p>
            </div>

            {clubRegistered ? (
              <div className="p-5 rounded-2xl bg-[#EAF7EE] border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-900">
                  {T('¡Bienvenido a Club Solana!', 'Welcome to Club Solana!', '欢迎加入 Club Solana！')}
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {T(
                    'Te enviamos tu código de bienvenida (-12% de descuento directo: SOLANA12) a tu correo.',
                    'We sent your welcome coupon code (-12% instant off: SOLANA12) to your inbox.',
                    '我们已将您的迎新优惠码（直减 12%：SOLANA12）发送至您的邮箱。'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setClubModalOpen(false)}
                  className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {T('Comenzar a reservar', 'Start booking', '开始预订')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleClubSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="club-name" className="text-xs font-bold text-slate-700">
                    {T('Nombre completo', 'Full Name', '全名')}
                  </label>
                  <input
                    id="club-name"
                    type="text"
                    required
                    placeholder={T('Ej. Mateo Vargas', 'e.g. John Doe', '例如：李明')}
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#C88A36]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="club-email" className="text-xs font-bold text-slate-700">
                    {T('Correo electrónico', 'Email address', '电子邮箱')}
                  </label>
                  <input
                    id="club-email"
                    type="email"
                    required
                    placeholder={T('mateo@ejemplo.com', 'john@example.com', 'liming@example.com')}
                    value={clubEmail}
                    onChange={(e) => setClubEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#C88A36]"
                  />
                </div>

                {/* Member Perks Checklist */}
                <div className="p-3.5 rounded-xl bg-[#FAF9F7] border border-slate-200/80 space-y-1.5 text-[11px] text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {T('12% de descuento adicional garantizado', 'Guaranteed 12% extra discount', '专享额外 12% 折扣保证')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {T('Desayuno buffet artesanal de cortesía', 'Complimentary daily artisan breakfast', '免费每日手工自助早餐')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {T('Check-out tardío (sujeto a disponibilidad)', 'Late check-out upon availability', '延迟退房（视房态而定）')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0A1D37] hover:bg-[#C88A36] text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  {T('Activar Membresía Gratis', 'Activate Free Membership', '免费激活会员资格')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. Slide-out Mobile Navigation Drawer (For Mobile Screens Only < lg) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="lg:hidden fixed inset-0 z-[1000] bg-[#0A1D37]/60 backdrop-blur-xs flex"
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <BrandLogoSolana className="w-9 h-9" />
                    <div>
                      <span className="font-editorial text-lg font-bold text-[#0A1D37] block leading-none">
                        CASA SOLANA
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#C88A36]">
                        {T('Club & Hoteles Perú', 'Club & Hotels Peru', '秘鲁俱乐部酒店')}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label={T('Cerrar menú', 'Close menu', '关闭菜单')}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-[#0A1D37] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5 text-sm font-bold text-[#0A1D37]">
                  {/* Cyber Solana */}
                  <Link
                    to="/ofertas"
                    onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#eb3a7d]/10 text-[#eb3a7d] hover:bg-[#eb3a7d]/20"
                  >
                    <div className="flex items-center gap-2.5">
                      <Tag className="w-4 h-4 text-[#eb3a7d]" />
                      <span>{T('CYBER CASA SOLANA', 'CYBER CASA SOLANA', 'Casa Solana 狂欢节')}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#eb3a7d]" />
                  </Link>

                  <Link
                    to="/destinos"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#FAF9F7] hover:text-[#C88A36]"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#C88A36]" />
                      <span>{T('DESTINOS', 'DESTINATIONS', '目的地')}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    to="/habitaciones"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#FAF9F7] hover:text-[#C88A36]"
                  >
                    <div className="flex items-center gap-2.5">
                      <BedDouble className="w-4 h-4 text-[#C88A36]" />
                      <span>{t.nav.suites}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    to="/ofertas"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#FAF9F7] hover:text-[#D91E5B]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Tag className="w-4 h-4 text-[#D91E5B]" />
                      <span>{T('OFERTAS', 'OFFERS', '优惠活动')}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    to="/restaurantes"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#FAF9F7] hover:text-[#C88A36]"
                  >
                    <div className="flex items-center gap-2.5">
                      <ChefHat className="w-4 h-4 text-[#C88A36]" />
                      <span>{T('RESTAURANTES', 'DINING', '餐厅美食')}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    to="/servicios"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#FAF9F7] hover:text-[#C88A36]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Compass className="w-4 h-4 text-[#C88A36]" />
                      <span>{T('Experiencias & Spa', 'Experiences & Spa', '体验与水疗')}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    to="/corporativo"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#FAF9F7] hover:text-[#C88A36]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-[#C88A36]" />
                      <span>{T('CORPORATIVO', 'CORPORATE', '企业商旅')}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    to="/eventos"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#FAF9F7] hover:text-[#C88A36]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-[#C88A36]" />
                      <span>{T('EVENTOS', 'EVENTS', '会议活动')}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    to="/club"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#FAF9F7] hover:text-[#C88A36]"
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-[#C88A36]" />
                      <span>{T('CLUB SOLANA', 'CLUB SOLANA', 'SOLANA 俱乐部')}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </nav>

                <div className="p-4 rounded-2xl bg-[#F2EFE9] space-y-2 border border-slate-200/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A36] block">
                    {T('Club Solana Beneficio Directo', 'Club Solana Direct Benefit', 'Club Solana 会员直享礼遇')}
                  </span>
                  <p className="text-xs text-[#141923] leading-relaxed">
                    {T(
                      'Usa el código SOLANA12 en todas las sedes y accede a -12% adicional + desayuno buffet incluido.',
                      'Use code SOLANA12 across all properties for extra 12% off + daily artisan breakfast.',
                      '在所有酒店使用优惠码 SOLANA12，享额外 12% 折扣并含每日手工自助早餐。'
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>{T('Idioma:', 'Language:', '语言：')}</span>
                  <div className="flex items-center gap-1.5">
                    {(['es', 'en', 'zh'] as const).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setLang(code)}
                        className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                          lang === code
                            ? 'bg-[#0A1D37] text-white'
                            : 'border border-slate-200 text-slate-600 hover:border-[#0A1D37]'
                        }`}
                      >
                        {code === 'zh' ? '中文' : code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>{T('Moneda activa:', 'Currency:', '当前货币：')}</span>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as 'USD' | 'PEN' | 'EUR')}
                    className="border border-slate-200 rounded px-2 py-1 text-[#0A1D37] font-bold"
                  >
                    <option value="PEN">PEN (S/)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <Link
                  to="/reservar"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full py-3 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-center text-xs font-extrabold uppercase tracking-wider shadow-sm"
                >
                  {t.nav.bookCta}
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Slide-out Saved Stay Bag Drawer */}
      <AnimatePresence>
        {stayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStayOpen(false)}
            className="fixed inset-0 z-[1000] bg-[#0A1D37]/60 backdrop-blur-xs flex justify-end"
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-[#C88A36]" />
                    <h3 className="font-editorial text-xl font-bold text-[#0A1D37]">
                      {t.nav.stayBag}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStayOpen(false)}
                    aria-label={T('Cerrar bolsa', 'Close bag', '关闭收藏袋')}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-[#0A1D37] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {savedSuites.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <p className="text-sm text-slate-500">
                      {T('Tu lista de suites está vacía', 'Your saved suites list is empty', '您的收藏套房列表为空')}
                    </p>
                    <Link
                      to="/habitaciones"
                      onClick={() => setStayOpen(false)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#C88A36] hover:underline"
                    >
                      <span>{T('Explorar catálogo de suites', 'Explore all suites', '浏览全部套房目录')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>
                        {savedSuites.length}{' '}
                        {T('suites guardadas', 'saved suites', '间已收藏套房')}
                      </span>
                      <button
                        type="button"
                        onClick={clearStayBag}
                        className="text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{T('Vaciar', 'Clear', '清空')}</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {savedSuites.map((suite) => (
                        <div
                          key={suite.slug}
                          className="flex gap-3 p-3 rounded-xl border border-slate-200 bg-[#FAF9F7]"
                        >
                          <img
                            src={suite.heroImage}
                            alt={trSuite(suite.shortTitle)}
                            className="w-20 h-20 object-cover rounded-lg shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-editorial text-sm font-bold text-[#0A1D37] truncate">
                              {trSuite(suite.shortTitle)}
                            </h4>
                            <span className="text-[10px] font-bold uppercase text-[#C88A36]">
                              {trSuite(suite.locationName)}
                            </span>
                            <div className="flex items-baseline justify-between mt-2">
                              <span className="num-tabular text-sm font-extrabold text-[#0A1D37]">
                                {formatRate(suite.nightlyUsd)}
                                <span className="text-[10px] font-normal text-slate-500">
                                  {' '}
                                  {T('/noche', '/night', '/晚')}
                                </span>
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleStaySlug(suite.slug)}
                                className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                                aria-label={T('Quitar de la bolsa', 'Remove from bag', '从收藏袋移除')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {savedSuites.length > 0 && (
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <Link
                    to="/reservar"
                    onClick={() => setStayOpen(false)}
                    className="block w-full py-3.5 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white text-center text-xs font-extrabold uppercase tracking-wider shadow-sm transition-colors"
                  >
                    {T('Proceder con la reserva', 'Proceed to checkout', '立即前往预订')}
                  </Link>
                </div>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
