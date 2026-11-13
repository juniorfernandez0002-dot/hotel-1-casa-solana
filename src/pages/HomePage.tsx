import React from 'react';
import { HotelHeroStage } from '../components/HotelHeroStage';
import { HotelAuthorityGrid } from '../components/HotelAuthorityGrid';
import { RoomShowcaseSection } from '../components/RoomShowcaseSection';
import { BankAndOffersSection } from '../components/BankAndOffersSection';
import { HotelDestinationSpotlight } from '../components/HotelDestinationSpotlight';
import { HotelDiningSection } from '../components/HotelDiningSection';
import { HotelExperiencesSection } from '../components/HotelExperiencesSection';
import { HotelEventsSection } from '../components/HotelEventsSection';
import { WhySolanaSection } from '../components/WhySolanaSection';
import { HotelLocationsMap } from '../components/HotelLocationsMap';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F7]">
      {/* 1. Split Campaign Hero Slider + Floating Elevated Booking Bar */}
      <HotelHeroStage />

      {/* 2. Metric Authority Photo Bento Cards (Conoce todo lo que Casa Solana tiene para ti) */}
      <HotelAuthorityGrid />

      {/* 3. Best Rates Showcase Cards with Slanted Ribbons & Gold Club Rate Boxes */}
      <RoomShowcaseSection />

      {/* 4. Zero-Interest Bank Installments + Offers Banners */}
      <BankAndOffersSection />

      {/* 5. Cinematic Destination Spotlight Banner + Black Loyalty Club Bar (Exact to Image 3) */}
      <HotelDestinationSpotlight />

      {/* 6. Signature Gastronomy, Buffets & Pisco Bars Across Properties */}
      <HotelDiningSection />

      {/* 7. Wellness, Thermal Circuit & Destination Encounters */}
      <HotelExperiencesSection />

      {/* 8. Corporate Conventions, Boardrooms, Weddings & Interactive Quote Builder */}
      <HotelEventsSection />

      {/* 9. Reasons to Choose Casa Solana Value Pillars */}
      <WhySolanaSection />

      {/* 10. Interactive Peru Properties Map & Arrival Explorer */}
      <HotelLocationsMap />
    </div>
  );
};

export default HomePage;
