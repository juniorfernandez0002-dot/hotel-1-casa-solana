import React from 'react';

export const PaymentMethodCards: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-wrap items-center gap-2 ${className}`}>
    <img
      src="./images/brands/visa.png"
      alt="Visa"
      className="h-[30px] w-[46px] object-contain rounded-sm shadow-2xs bg-white border border-slate-200/70 p-0.5"
    />
    <img
      src="./images/brands/mastercard.png"
      alt="Mastercard"
      className="h-[30px] w-[46px] object-contain rounded-sm shadow-2xs bg-white border border-slate-200/70 p-0.5"
    />
    <img
      src="./images/brands/amex.png"
      alt="American Express"
      className="h-[30px] w-[46px] object-contain rounded-sm shadow-2xs bg-white border border-slate-200/70 p-0.5"
    />
    <img
      src="./images/brands/diners-seal.png"
      alt="Diners Club"
      className="h-[30px] w-[46px] object-contain rounded-sm shadow-2xs bg-white border border-slate-200/70 p-0.5"
    />
  </div>
);

export const BankPartnerMarks: React.FC = () => (
  <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-9">
    <img
      src="./images/brands/interbank-card.webp"
      alt="Interbank"
      className="h-6 sm:h-7 w-auto object-contain"
    />
    <img
      src="./images/brands/bcp-card.png"
      alt="BCP"
      className="h-6 sm:h-7 w-auto object-contain"
    />
    <img
      src="./images/brands/bbva-card.webp"
      alt="BBVA"
      className="h-5 sm:h-6 w-auto object-contain"
    />
    <img
      src="./images/brands/diners-card.png"
      alt="Diners Club International"
      className="h-6 sm:h-7 w-auto object-contain"
    />
    <img
      src="./images/brands/scotiabank-card.png"
      alt="Scotiabank"
      className="h-5 sm:h-6 w-auto object-contain"
    />
  </div>
);
