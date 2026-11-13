import React from 'react';

export interface WhatsAppLogoProps {
  className?: string;
  variant?: 'color' | 'white' | 'badge';
}

/**
 * Official WhatsApp Brand Logo with full contour fidelity.
 * - 'color': Official green bubble (#25D366) with crisp white phone receiver.
 * - 'white': High-contrast pure white silhouette for use on dark/colored buttons.
 * - 'badge': Elevated white circular disc with official green emblem inside.
 */
export const WhatsAppLogo: React.FC<WhatsAppLogoProps> = ({
  className = 'w-5 h-5',
  variant = 'color'
}) => {
  if (variant === 'badge') {
    return (
      <span className={`inline-flex items-center justify-center rounded-full bg-white shadow-xs p-0.5 ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full" aria-hidden="true">
          <path
            fill="#25D366"
            d="M16 3C8.82 3 3 8.82 3 16c0 2.31.6 4.56 1.75 6.54L3.08 29l6.65-1.74A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
          />
          <path
            fill="#FFF"
            d="M22.92 19.37c-.38-.19-2.25-1.11-2.6-1.24-.35-.13-.6-.19-.85.19s-.98 1.24-1.2 1.49c-.22.25-.44.28-.82.09a10.4 10.4 0 0 1-3.06-1.89 11.4 11.4 0 0 1-2.12-2.64c-.22-.38-.02-.58.17-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.09-.19-.85-2.06-1.17-2.82-.31-.74-.62-.64-.85-.65h-.73c-.25 0-.66.09-1.01.47-.35.38-1.33 1.3-1.33 3.17s1.36 3.68 1.55 3.93c.19.25 2.67 4.08 6.47 5.72.9.39 1.61.62 2.16.79.91.29 1.73.25 2.38.15.73-.11 2.25-.92 2.57-1.81.32-.89.32-1.65.22-1.81-.09-.16-.35-.25-.73-.44z"
          />
        </svg>
      </span>
    );
  }

  if (variant === 'white') {
    return (
      <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
        <path
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
          d="M16 3C8.82 3 3 8.82 3 16c0 2.31.6 4.56 1.75 6.54L3.08 29l6.65-1.74A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
        />
        <path
          fill="#FFFFFF"
          d="M22.92 19.37c-.38-.19-2.25-1.11-2.6-1.24-.35-.13-.6-.19-.85.19s-.98 1.24-1.2 1.49c-.22.25-.44.28-.82.09a10.4 10.4 0 0 1-3.06-1.89 11.4 11.4 0 0 1-2.12-2.64c-.22-.38-.02-.58.17-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.09-.19-.85-2.06-1.17-2.82-.31-.74-.62-.64-.85-.65h-.73c-.25 0-.66.09-1.01.47-.35.38-1.33 1.3-1.33 3.17s1.36 3.68 1.55 3.93c.19.25 2.67 4.08 6.47 5.72.9.39 1.61.62 2.16.79.91.29 1.73.25 2.38.15.73-.11 2.25-.92 2.57-1.81.32-.89.32-1.65.22-1.81-.09-.16-.35-.25-.73-.44z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        fill="#25D366"
        d="M16 3C8.82 3 3 8.82 3 16c0 2.31.6 4.56 1.75 6.54L3.08 29l6.65-1.74A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
      />
      <path
        fill="#FFF"
        d="M22.92 19.37c-.38-.19-2.25-1.11-2.6-1.24-.35-.13-.6-.19-.85.19s-.98 1.24-1.2 1.49c-.22.25-.44.28-.82.09a10.4 10.4 0 0 1-3.06-1.89 11.4 11.4 0 0 1-2.12-2.64c-.22-.38-.02-.58.17-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.09-.19-.85-2.06-1.17-2.82-.31-.74-.62-.64-.85-.65h-.73c-.25 0-.66.09-1.01.47-.35.38-1.33 1.3-1.33 3.17s1.36 3.68 1.55 3.93c.19.25 2.67 4.08 6.47 5.72.9.39 1.61.62 2.16.79.91.29 1.73.25 2.38.15.73-.11 2.25-.92 2.57-1.81.32-.89.32-1.65.22-1.81-.09-.16-.35-.25-.73-.44z"
      />
    </svg>
  );
};

export const InstagramLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="solana-ig-grad" cx="25%" cy="100%" r="120%">
        <stop offset="0%" stopColor="#FDF497" />
        <stop offset="25%" stopColor="#FD5949" />
        <stop offset="60%" stopColor="#D6249F" />
        <stop offset="100%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#solana-ig-grad)" />
    <rect x="7.5" y="7.5" width="17" height="17" rx="5" stroke="#fff" strokeWidth="2.1" />
    <circle cx="16" cy="16" r="4.2" stroke="#fff" strokeWidth="2.1" />
    <circle cx="21.4" cy="10.6" r="1.3" fill="#fff" />
  </svg>
);

export const TikTokLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <rect x="2" y="2" width="28" height="28" rx="8" fill="#111111" />
    <path
      d="M21.2 12.1a4.7 4.7 0 0 1-3-1.1v6.2a4.6 4.6 0 1 1-4.1-4.6v2.5a2.1 2.1 0 1 0 1.6 2.1V7.6h2.6a4.7 4.7 0 0 0 4.2 3.8v2.5c-.5 0-.9-.1-1.3-.2z"
      fill="#25F4EE"
      transform="translate(-0.7, -0.5)"
    />
    <path
      d="M21.2 12.1a4.7 4.7 0 0 1-3-1.1v6.2a4.6 4.6 0 1 1-4.1-4.6v2.5a2.1 2.1 0 1 0 1.6 2.1V7.6h2.6a4.7 4.7 0 0 0 4.2 3.8v2.5c-.5 0-.9-.1-1.3-.2z"
      fill="#FE2C55"
      transform="translate(0.7, 0.5)"
    />
    <path
      d="M21.2 12.1a4.7 4.7 0 0 1-3-1.1v6.2a4.6 4.6 0 1 1-4.1-4.6v2.5a2.1 2.1 0 1 0 1.6 2.1V7.6h2.6a4.7 4.7 0 0 0 4.2 3.8v2.5c-.5 0-.9-.1-1.3-.2z"
      fill="#fff"
    />
  </svg>
);

export const YouTubeLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <rect x="2" y="6" width="28" height="20" rx="6" fill="#FF0000" />
    <path d="M13 11.5L21 16L13 20.5V11.5Z" fill="#FFF" />
  </svg>
);

export const FacebookLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="14" fill="#1877F2" />
    <path
      d="M17.8 29.8V19.6h3.4l.5-4h-3.9v-2.6c0-1.1.3-1.9 2-1.9h2.1V7.5c-.4 0-1.6-.1-3-.1-3 0-5.1 1.8-5.1 5.2v2.9h-3.4v4h3.4v10.2a14 14 0 0 0 4 .1z"
      fill="#FFF"
    />
  </svg>
);
