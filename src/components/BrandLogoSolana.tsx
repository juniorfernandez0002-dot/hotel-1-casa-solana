import React from 'react';

export interface BrandLogoSolanaProps {
  className?: string;
  light?: boolean;
}

/**
 * Detailed Architectural & Heraldic Emblem for CASA SOLANA Hoteles & Spa Perú
 * Features:
 * - Hand-carved baroque/colonial stone arch with voussoirs & keystone
 * - Radiant Inti / Solana sunburst with alternating straight & flame rays
 * - Classical fluted pilasters on sculpted pedestal plinths
 * - Stepped Andean chakana diamond motif integrated into arch crest
 * - Gracefully intertwined «CS» signature monogram inside the portal
 * - Double gilded beaded cartouche with foundation stars
 */
export const BrandLogoSolana: React.FC<BrandLogoSolanaProps> = ({
  className = 'w-9 h-9',
  light = false
}) => {
  const gold = light ? '#E0A955' : '#C88A36';
  const goldDeep = light ? '#C88A36' : '#9E6820';
  const navy = light ? '#FFFFFF' : '#0A1D37';

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Casa Solana Hoteles & Spa Emblem"
    >
      <defs>
        <radialGradient id={`solana-sun-grad-${light ? 'l' : 'd'}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={gold} stopOpacity="0.35" />
          <stop offset="100%" stopColor={gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Outer Escutcheon / Architectural Frame */}
      <rect
        x="3"
        y="3"
        width="58"
        height="58"
        rx="8"
        stroke={gold}
        strokeWidth="1.2"
        strokeOpacity={light ? '0.75' : '0.55'}
      />
      <rect
        x="5.5"
        y="5.5"
        width="53"
        height="53"
        rx="6"
        stroke={navy}
        strokeWidth="1"
        strokeOpacity={light ? '0.45' : '0.25'}
      />

      {/* 2. Ornamental Corner Brackets */}
      <path
        d="M8 12V8H12M52 8H56V12M56 52V56H52M12 56H8V52"
        stroke={gold}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* 3. Arch Keystone Stepped Diamond (Chakana Accent at Top Apex) */}
      <path
        d="M32 7L35.5 10.5L32 14L28.5 10.5Z"
        fill={gold}
        stroke={goldDeep}
        strokeWidth="0.8"
      />

      {/* 4. Radiant Inti / Solana Sun in Arch Tympanum */}
      <circle cx="32" cy="23" r="10" fill={`url(#solana-sun-grad-${light ? 'l' : 'd'})`} />
      <circle cx="32" cy="23" r="4.2" fill={gold} />
      <circle cx="32" cy="23" r="2.2" fill={light ? '#0A1D37' : '#FFFFFF'} />

      {/* Detailed Solar Rays (8 Principal Cardinal & Diagonal Tapered Rays) */}
      <path
        d="
          M32 14.5V17
          M32 29V31.5
          M23.5 23H26
          M38 23H40.5
          M26 17L27.8 18.8
          M36.2 27.2L38 29
          M38 17L36.2 18.8
          M27.8 27.2L26 29
        "
        stroke={gold}
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Secondary Undulating Warm Rays */}
      <path
        d="
          M32 12.8L32.8 15
          M32 33.2L31.2 31
          M21.8 23L24 22.2
          M42.2 23L40 23.8
        "
        stroke={goldDeep}
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* 5. Colonial Archway (Twin Pilasters + Arch Voussoirs) */}
      {/* Outer Arch Molding */}
      <path
        d="M17 50V31C17 22.7157 23.7157 16 32 16C40.2843 16 47 22.7157 47 31V50"
        stroke={navy}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Inner Arch Molding with Fine Relief */}
      <path
        d="M20.5 50V31.5C20.5 25.1487 25.6487 20 32 20C38.3513 20 43.5 25.1487 43.5 31.5V50"
        stroke={gold}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Arch Voussoir Radial Joint Lines */}
      <path
        d="
          M23 23L24.8 24.8
          M32 16V19.5
          M41 23L39.2 24.8
        "
        stroke={gold}
        strokeWidth="1.1"
      />

      {/* 6. Classical Intertwined Monogram «CS» (Casa Solana) */}
      {/* Letter 'C' */}
      <path
        d="M34 35C30.5 35 27 37 27 41.5C27 46 30.5 48 34 48C35.5 48 36.8 47.3 37.5 46.5"
        stroke={navy}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Letter 'S' intertwined */}
      <path
        d="M36 37C34.5 35.8 32.5 35.5 31 36.5C29.2 37.8 29.8 39.8 32 40.8C34.6 42 35 44 33.8 45.4C32.4 46.8 30 46.5 28.5 45.2"
        stroke={gold}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* 7. Foundation Pedestal Plinth & Step Lines */}
      {/* Capital Headers on Pilasters */}
      <line x1="15" y1="31" x2="19" y2="31" stroke={gold} strokeWidth="1.6" />
      <line x1="45" y1="31" x2="49" y2="31" stroke={gold} strokeWidth="1.6" />

      {/* Base Plinth */}
      <line x1="13" y1="50" x2="51" y2="50" stroke={gold} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="10" y1="53.5" x2="54" y2="53.5" stroke={navy} strokeWidth="1.5" strokeLinecap="round" />

      {/* Heritage Foundation Dots */}
      <circle cx="16" cy="56.5" r="1.1" fill={gold} />
      <circle cx="32" cy="56.5" r="1.3" fill={gold} />
      <circle cx="48" cy="56.5" r="1.1" fill={gold} />
    </svg>
  );
};

export default BrandLogoSolana;
