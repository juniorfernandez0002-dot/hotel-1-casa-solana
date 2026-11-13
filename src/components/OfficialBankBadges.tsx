import React from 'react';

export type BankId = 'interbank' | 'bcp' | 'bbva' | 'diners' | 'scotiabank';

interface BankBadgeProps {
  bank: BankId;
  className?: string;
}

export const BankBadge: React.FC<BankBadgeProps> = ({ bank, className = '' }) => {
  if (bank === 'interbank') {
    return (
      <span
        title="Interbank - Cuotas sin intereses"
        className={`inline-flex items-center justify-center px-2 py-0.5 rounded bg-[#00843D] h-5.5 shadow-2xs hover:opacity-90 transition-opacity ${className}`}
      >
        <img
          src="./images/brands/interbank-card.webp"
          alt="Interbank"
          className="h-3 w-auto object-contain"
        />
      </span>
    );
  }

  if (bank === 'bcp') {
    return (
      <span
        title="BCP - Cuotas sin intereses"
        className={`inline-flex items-center justify-center px-2 py-0.5 rounded bg-[#002A8E] h-5.5 shadow-2xs hover:opacity-90 transition-opacity ${className}`}
      >
        <img
          src="./images/brands/bcp-card.png"
          alt="BCP"
          className="h-2.5 w-auto object-contain"
        />
      </span>
    );
  }

  if (bank === 'bbva') {
    return (
      <span
        title="BBVA - Cuotas sin intereses"
        className={`inline-flex items-center justify-center px-2 py-0.5 rounded bg-[#004481] h-5.5 shadow-2xs hover:opacity-90 transition-opacity ${className}`}
      >
        <img
          src="./images/brands/bbva-card.webp"
          alt="BBVA"
          className="h-2.5 w-auto object-contain"
        />
      </span>
    );
  }

  if (bank === 'diners') {
    return (
      <span
        title="Diners Club - Cuotas sin intereses"
        className={`inline-flex items-center justify-center px-2 py-0.5 rounded bg-[#002F6C] h-5.5 shadow-2xs hover:opacity-90 transition-opacity ${className}`}
      >
        <img
          src="./images/brands/diners-card.png"
          alt="Diners Club"
          className="h-3 w-auto object-contain"
        />
      </span>
    );
  }

  if (bank === 'scotiabank') {
    return (
      <span
        title="Scotiabank - Cuotas sin intereses"
        className={`inline-flex items-center justify-center px-2 py-0.5 rounded bg-[#EC111A] h-5.5 shadow-2xs hover:opacity-90 transition-opacity ${className}`}
      >
        <img
          src="./images/brands/scotiabank-card.png"
          alt="Scotiabank"
          className="h-2.5 w-auto object-contain"
        />
      </span>
    );
  }

  return null;
};

export const BankBadgesRow: React.FC<{
  banks?: BankId[];
  className?: string;
}> = ({ banks = ['interbank', 'bcp', 'bbva'], className = '' }) => {
  return (
    <div className={`inline-flex flex-wrap items-center gap-1.5 ${className}`}>
      {banks.map((b) => (
        <BankBadge key={b} bank={b} />
      ))}
    </div>
  );
};
