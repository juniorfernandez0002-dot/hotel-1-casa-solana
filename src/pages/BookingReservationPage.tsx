import React, { useMemo, useState } from 'react';
import { BedDouble, Calendar, CheckCircle2, CreditCard, Sparkles, Users } from 'lucide-react';
import { HOTEL_SUITES } from '../data/roomsData';
import { useSolana } from '../context/SolanaContext';
import { WhatsAppLogo } from '../components/SocialIcons';
import { PaymentMethodCards } from '../components/PaymentBadges';

export const BookingReservationPage: React.FC = () => {
  const {
    lang,
    t,
    formatRate,
    staySlugs,
    guestsCount,
    setGuestsCount,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    nightsCount,
    buildWhatsAppUrl
  } = useSolana();

  const savedSuites = useMemo(
    () => HOTEL_SUITES.filter((s) => staySlugs.includes(s.slug)),
    [staySlugs]
  );

  const [selectedSlug, setSelectedSlug] = useState(
    savedSuites[0]?.slug ?? HOTEL_SUITES[0].slug
  );
  const [guestName, setGuestName] = useState('');
  const [spaAddon, setSpaAddon] = useState(true);
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const chosenSuite =
    HOTEL_SUITES.find((s) => s.slug === selectedSlug) ?? HOTEL_SUITES[0];
  const directNightlyUsd = Math.round(chosenSuite.nightlyUsd * 0.88);
  const spaCostUsd = spaAddon ? 75 : 0;
  const staySubtotalUsd = directNightlyUsd * nightsCount + spaCostUsd;

  const L = (es: string, en: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  const waText =
    lang === 'zh'
      ? `您好 Casa Solana 前台：我想预订“${chosenSuite.title.zh ?? chosenSuite.title.en}”（${chosenSuite.locationName.zh ?? chosenSuite.locationName.en}），入住 ${checkInDate}，退房 ${checkOutDate}（共 ${nightsCount} 晚），${guestsCount} 位客人，适用俱乐部直订价（-12%）。${
          spaAddon ? ' 请加订双人温泉水疗仪式。' : ''
        }${guestName ? ` 住客：${guestName}。` : ''}${notes ? ` 备注：${notes}` : ''}`
      : lang === 'es'
      ? `Hola Central Casa Solana: Deseo solicitar reserva de "${chosenSuite.title.es}" (${chosenSuite.locationName.es}) del ${checkInDate} al ${checkOutDate} (${nightsCount} noches) para ${guestsCount} huésped(es) con tarifa directa Club (-12%).${
          spaAddon ? ' Incluir ritual Spa en pareja.' : ''
        }${guestName ? ` Huésped: ${guestName}.` : ''}${notes ? ` Notas: ${notes}` : ''}`
      : `Hello Casa Solana Desk: Requesting "${chosenSuite.title.en}" (${chosenSuite.locationName.en}) from ${checkInDate} to ${checkOutDate} (${nightsCount} nights) for ${guestsCount} guest(s) with Direct Club rate (-12%).${
          spaAddon ? ' Include Thermal Spa ritual.' : ''
        }${guestName ? ` Guest: ${guestName}.` : ''}${notes ? ` Notes: ${notes}` : ''}`;

  return (
    <div className="min-h-screen bg-andean-pattern py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
          <span className="eyebrow-solana text-[#C88A36]">{t.nav.bookCta}</span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0A1D37] leading-tight">
            {L('Solicitud de Estadía Directa', 'Direct Sanctuary Reservation', '酒店直订申请')}
          </h1>
          <p className="text-sm text-slate-600">
            {L(
              'Tarifa Club Solana (-12%), hasta 12 cuotas sin intereses o pago flexible al llegar al hotel.',
              'Club Solana (-12%) rate, zero-interest installments or flexible pay-at-hotel guarantee.',
              'Solana 俱乐部会员价（-12%），最高可享12期免息分期，或到店灵活付款。'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setConfirmed(true);
            }}
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5"
          >
            <div>
              <label
                htmlFor="res-suite"
                className="text-xs font-bold uppercase tracking-wider text-[#C88A36] flex items-center gap-1.5 mb-2"
              >
                <BedDouble className="w-4 h-4" />
                {L('Habitación o Villa Elegida', 'Selected Suite or Villa', '所选客房或别墅')}
              </label>
              <select
                id="res-suite"
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm text-[#0A1D37] cursor-pointer"
              >
                {HOTEL_SUITES.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    [{s.locationName[lang] ?? s.locationName.en}] {s.shortTitle[lang] ?? s.shortTitle.en} ({formatRate(Math.round(s.nightlyUsd * 0.88))} / {L('noche', 'night', '晚')})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#C88A36] flex items-center gap-1 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {t.booking.checkIn}
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0A1D37] num-tabular"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#C88A36] flex items-center gap-1 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {t.booking.checkOut}
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0A1D37] num-tabular"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#C88A36] flex items-center gap-1 mb-1">
                  <Users className="w-3.5 h-3.5" />
                  {t.booking.guestsLabel}
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0A1D37] cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? t.booking.guestSingular : t.booking.guestPlural}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center justify-between gap-2 p-4 rounded-xl bg-[#F2EFE9] border border-slate-200 text-xs sm:text-sm font-bold text-[#0A1D37] cursor-pointer">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C88A36]" />
                {L(
                  'Sumar Ritual Spa Termal privado en pareja (+USD $75)',
                  'Add Private Couples Thermal Spa Ritual (+USD $75)',
                  '加订私人双人温泉水疗仪式（+75美元）'
                )}
              </span>
              <input
                type="checkbox"
                checked={spaAddon}
                onChange={(e) => setSpaAddon(e.target.checked)}
                className="accent-[#0A1D37] w-4 h-4"
              />
            </label>

            <div>
              <label
                htmlFor="guest-name"
                className="text-xs font-bold uppercase tracking-wider text-[#C88A36] block mb-1.5"
              >
                {L('Nombre del Huésped Principal', 'Primary Guest Name', '主要住客姓名')}
              </label>
              <input
                id="guest-name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={L('Ej. Camila Mendoza', 'e.g. Elena Rossi', '例如：王丽华')}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-[#0A1D37]"
              />
            </div>

            <div>
              <label
                htmlFor="guest-notes"
                className="text-xs font-bold uppercase tracking-wider text-[#C88A36] block mb-1.5"
              >
                {L(
                  'Preferencias de descanso, cuotas bancarias o vuelo',
                  'Sleep preferences, installments or flight details',
                  '睡眠偏好、分期付款或航班信息'
                )}
              </label>
              <textarea
                id="guest-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#0A1D37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#C88A36] hover:bg-[#AE7225] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
            >
              {L('Preparar Ficha de Reserva', 'Generate Reservation Brief', '生成预订单')}
            </button>

            {confirmed && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-start gap-3 text-xs text-[#0A1D37]">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-extrabold block text-sm">
                    {L('Pre-reserva lista con código SOLANA12', 'Pre-reservation ready (SOLANA12)', '预订已就绪，优惠码 SOLANA12')}
                  </span>
                  <span className="block mt-0.5 text-slate-600">
                    {L(
                      'Presiona "Confirmar por WhatsApp" en el resumen derecho para bloqueo inmediato sin comisiones.',
                      'Click "Confirm via WhatsApp" on the summary panel to lock your suite directly.',
                      '请点击右侧摘要中的“通过 WhatsApp 确认”，即可立即免佣锁定房间。'
                    )}
                  </span>
                </div>
              </div>
            )}
          </form>

          <aside className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-5 lg:sticky lg:top-24">
            <img
              src={chosenSuite.heroImage}
              alt={chosenSuite.shortTitle[lang] ?? chosenSuite.shortTitle.en}
              className="w-full h-44 rounded-xl object-cover"
            />
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#C88A36]">
                {chosenSuite.locationName[lang] ?? chosenSuite.locationName.en} · {chosenSuite.sqm} m²
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#0A1D37] mt-0.5 leading-tight">
                {chosenSuite.shortTitle[lang] ?? chosenSuite.shortTitle.en}
              </h2>
            </div>

            <div className="p-4 rounded-xl border-2 border-[#F4B41A] bg-[#FFFDF5] space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C88A36] block">
                {L(
                  `Tarifa Socio Club (-12%) · ${nightsCount} noche(s)`,
                  `Direct Club Rate (-12%) · ${nightsCount} night(s)`,
                  `俱乐部会员价（-12%）· ${nightsCount} 晚`
                )}
              </span>
              <div className="num-tabular font-editorial text-3xl font-bold text-[#0A1D37]">
                {formatRate(staySubtotalUsd)}
              </div>
              <span className="text-[11px] text-slate-600 block">
                {L(
                  'Desayuno buffet incluido · Paga al llegar o hasta 12 cuotas sin intereses',
                  'Buffet breakfast included · Pay on arrival or 0% bank installments',
                  '含自助早餐 · 到店付款或最高12期免息分期'
                )}
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#C88A36]" />
                {L('Pagos aceptados en recepción / web', 'Accepted payment methods', '前台/网站支持的支付方式')}
              </span>
              <PaymentMethodCards />
            </div>

            <a
              href={buildWhatsAppUrl(waText)}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1EB958] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors shadow-sm"
            >
              <WhatsAppLogo className="w-5 h-5" variant="badge" />
              <span>{L('Confirmar por WhatsApp', 'Confirm via WhatsApp', '通过 WhatsApp 确认')}</span>
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
};
