import React, { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { SolanaProvider, useSolana } from './context/SolanaContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppLogo } from './components/SocialIcons';
import { FloatingClubWidget } from './components/FloatingClubWidget';
import { SeoHead } from './components/SeoHead';
import { HomePage } from './pages/HomePage';
import { RoomsCatalogPage } from './pages/RoomsCatalogPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { ServicesSpaPage } from './pages/ServicesSpaPage';
import { BookingReservationPage } from './pages/BookingReservationPage';
import { DestinosPage } from './pages/DestinosPage';
import { OfertasPage } from './pages/OfertasPage';
import { RestaurantesPage } from './pages/RestaurantesPage';
import { ClubSolanaPage } from './pages/ClubSolanaPage';
import { CorporativoPage } from './pages/CorporativoPage';
import { EventosPage } from './pages/EventosPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

const FloatingReceptionWhatsApp: React.FC = () => {
  const { lang, buildWhatsAppUrl } = useSolana();
  return (
    <a
      href={buildWhatsAppUrl(
        lang === 'zh'
          ? '您好，Casa Solana 前台，我需要协助挑选酒店或套房。'
          : lang === 'es'
          ? 'Hola Central Casa Solana, necesito asistencia para elegir hotel o suite.'
          : 'Hello Casa Solana Desk, looking for suite or hotel assistance.'
      )}
      target="_blank"
      rel="noreferrer"
      aria-label={lang === 'zh' ? 'WhatsApp 预订中心' : lang === 'es' ? 'WhatsApp Central de Reservas' : 'WhatsApp Reservations Desk'}
      title={lang === 'zh' ? 'WhatsApp 礼宾服务 24/7' : lang === 'es' ? 'WhatsApp Concierge 24/7' : 'WhatsApp Concierge 24/7'}
      className="group fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-[850] flex items-center gap-2.5 p-2 sm:pl-3 sm:pr-4 sm:py-2.5 rounded-full bg-[#25D366] hover:bg-[#1fae54] text-white shadow-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none"
    >
      <span className="relative flex h-8 w-8 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white shadow-xs shrink-0">
        <WhatsAppLogo className="w-5 h-5 sm:w-4.5 sm:h-4.5" variant="color" />
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>
      </span>
      <span className="hidden sm:inline font-bold text-xs tracking-wide text-white drop-shadow-xs">
        {lang === 'zh' ? 'WhatsApp 24小时' : lang === 'es' ? 'WhatsApp 24/7' : 'WhatsApp Desk'}
      </span>
    </a>
  );
};

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SolanaProvider>
        <HashRouter>
          <ScrollToTop />
          <SeoHead />
          <div className="min-h-screen w-full max-w-full flex flex-col bg-[#FAF9F7] text-[#141923] overflow-x-hidden">
            <Navbar />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/habitaciones" element={<RoomsCatalogPage />} />
                <Route path="/habitaciones/:slug" element={<RoomDetailPage />} />
                <Route path="/servicios" element={<ServicesSpaPage />} />
                <Route path="/reservar" element={<BookingReservationPage />} />
                <Route path="/destinos" element={<DestinosPage />} />
                <Route path="/ofertas" element={<OfertasPage />} />
                <Route path="/restaurantes" element={<RestaurantesPage />} />
                <Route path="/club" element={<ClubSolanaPage />} />
                <Route path="/corporativo" element={<CorporativoPage />} />
                <Route path="/eventos" element={<EventosPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingClubWidget />
            <FloatingReceptionWhatsApp />
          </div>
        </HashRouter>
      </SolanaProvider>
    </MotionConfig>
  );
}
export default App;
