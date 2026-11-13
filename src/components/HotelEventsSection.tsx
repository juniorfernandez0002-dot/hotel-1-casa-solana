import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useSolana } from '../context/SolanaContext';
import { WhatsAppLogo } from './SocialIcons';
import { HOTEL_MEDIA } from '../data/hotelMedia';

type Tri = { zh: string; es: string; en: string };

const DURATIONS: { value: string; label: Tri }[] = [
  { value: 'half', label: { zh: '半天（4–5 小时）', es: 'Media jornada (4 a 5 horas)', en: 'Half day (4 to 5 hours)' } },
  { value: 'full', label: { zh: '全天（8–9 小时）', es: 'Jornada completa (8 a 9 horas)', en: 'Full day (8 to 9 hours)' } },
  { value: 'multi', label: { zh: '多日（2–3 天，含住宿）', es: 'Varios días (2 a 3 días con hospedaje)', en: 'Multi-day (2 to 3 days with lodging)' } },
  { value: 'night', label: { zh: '夜间 / 鸡尾酒会（3–5 小时）', es: 'Nocturno / Cóctel (3 a 5 horas)', en: 'Evening / Cocktail (3 to 5 hours)' } }
];

const DESTINATIONS: { value: string; label: Tri }[] = [
  { value: 'lima', label: { zh: '利马（米拉弗洛雷斯）', es: 'Lima (Miraflores)', en: 'Lima (Miraflores)' } },
  { value: 'cusco', label: { zh: '库斯科（圣谷）', es: 'Cusco (Valle Sagrado)', en: 'Cusco (Sacred Valley)' } },
  { value: 'ica', label: { zh: '伊卡（帕拉卡斯湾）', es: 'Ica (Bahía de Paracas)', en: 'Ica (Paracas Bay)' } }
];

const CAPACITIES: { value: string; label: Tri }[] = [
  { value: 'c1', label: { zh: '10–30 人', es: '10 a 30 personas', en: '10 to 30 guests' } },
  { value: 'c2', label: { zh: '30–60 人', es: '30 a 60 personas', en: '30 to 60 guests' } },
  { value: 'c3', label: { zh: '60–120 人', es: '60 a 120 personas', en: '60 to 120 guests' } },
  { value: 'c4', label: { zh: '120–300 人以上', es: '120 a 300+ personas', en: '120 to 300+ guests' } }
];

const FOODS: { value: string; label: Tri }[] = [
  { value: 'buffet', label: { zh: '秘鲁特色与国际自助餐', es: 'Buffet Criollo & Internacional', en: 'Creole & International Buffet' } },
  { value: 'coffee', label: { zh: '全程茶歇与精致小食', es: 'Coffee Break Continuo & Bocaditos', en: 'Continuous Coffee Break & Canapés' } },
  { value: 'plated', label: { zh: '3 或 4 道式正餐午宴 / 晚宴', es: 'Almuerzo / Cena Emplatada de 3 o 4 Pasos', en: 'Plated 3 or 4-Course Lunch / Dinner' } },
  { value: 'gala', label: { zh: '盛典鸡尾酒会与畅饮酒吧', es: 'Cocktail de Gala & Barra Libre', en: 'Gala Cocktail & Open Bar' } },
  { value: 'none', label: { zh: '仅租用场地（不含餐饮）', es: 'Solo alquiler de sala (Sin alimentos)', en: 'Room rental only (no catering)' } }
];

export const HotelEventsSection: React.FC = () => {
  const { lang, buildWhatsAppUrl } = useSolana();
  const L = (zh: string, es: string, en: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);
  const lbl = (tri: Tri) => (lang === 'zh' ? tri.zh : lang === 'es' ? tri.es : tri.en);

  const [eventType, setEventType] = useState<'corporativo' | 'social'>('corporativo');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [ruc, setRuc] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [fecha, setFecha] = useState('');
  const [duracion, setDuracion] = useState('half');
  const [destino, setDestino] = useState('lima');
  const [capacidad, setCapacidad] = useState('c2');
  const [tipoAlimento, setTipoAlimento] = useState('buffet');
  const [aceptoTerminos, setAceptoTerminos] = useState(true);
  const [aceptoPublicidad, setAceptoPublicidad] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !celular.trim() || !aceptoTerminos) return;
    setEnviado(true);
  };

  const destinoLabel = lbl(DESTINATIONS.find((d) => d.value === destino)!.label);
  const capacidadLabel = lbl(CAPACITIES.find((c) => c.value === capacidad)!.label);

  const waMessage = L(
    `您好，Casa Solana活动中心，我想咨询在${destinoLabel}举办${
      eventType === 'corporativo' ? '企业活动' : '社交活动'
    }，规模：${capacidadLabel}。联系人：${nombre} (${celular})。`,
    `Hola Casa Solana Eventos, deseo información para un ${
      eventType === 'corporativo' ? 'Evento Corporativo' : 'Evento Social'
    } en ${destinoLabel} para ${capacidadLabel}. Contacto: ${nombre} (${celular}).`,
    `Hello Casa Solana Events, inquiring about a ${
      eventType === 'corporativo' ? 'Corporate Event' : 'Social Event'
    } in ${destinoLabel} for ${capacidadLabel}. Contact: ${nombre} (${celular}).`
  );

  const inputCls =
    'w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs text-[#141923] focus:outline-none focus:border-[#C88A36] bg-white';
  const selectCls = inputCls + ' cursor-pointer';

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-[#10151C] text-white">
      <img
        src={HOTEL_MEDIA.corpBoardroomGlass}
        alt={L('Casa Solana 活动厅与会议中心', 'Salones de Eventos y Convenciones Casa Solana', 'Casa Solana Event Halls and Convention Rooms')}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                {L('您的盛会，', 'TU EVENTO,', 'YOUR EVENT,')}
              </h2>
              <p className="text-xl sm:text-2xl font-light text-slate-300 tracking-wide uppercase">
                {L('秘鲁任意角落', 'EN CUALQUIER LUGAR DEL PERÚ', 'ANYWHERE IN PERU')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-2 border-y border-white/15 py-6">
              <div>
                <span className="font-editorial text-4xl sm:text-5xl font-extrabold text-white num-tabular block">
                  3
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C88A36] block mt-1">
                  {L('目的地', 'DESTINOS', 'DESTINATIONS')}
                </span>
              </div>
              <div>
                <span className="font-editorial text-4xl sm:text-5xl font-extrabold text-white num-tabular block">
                  +15
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C88A36] block mt-1">
                  {L('宴会厅', 'SALAS', 'ROOMS')}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-slate-300">
              <p className="text-xs sm:text-sm font-medium text-white/90">
                {L('适配各类活动的场地环境：', 'Ambientes adaptados a cada tipo de evento:', 'Spaces tailored to every type of event:')}
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C88A36]" />
                  <span>
                    {L(
                      '企业活动（董事会、会议与大会）',
                      'Corporativos (Directorios, conferencias y congresos)',
                      'Corporate (boardrooms, conferences and congresses)'
                    )}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C88A36]" />
                  <span>
                    {L(
                      '社交活动（周年庆典、鸡尾酒会与晚宴）',
                      'Sociales (Aniversarios, cócteles y galas)',
                      'Social (anniversaries, cocktails and galas)'
                    )}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C88A36]" />
                  <span>
                    {L(
                      '目的地婚礼（安第斯花园与海景露台）',
                      'Bodas de destino (Jardines andinos y terrazas frente al mar)',
                      'Destination weddings (Andean gardens and oceanfront terraces)'
                    )}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppUrl(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <WhatsAppLogo className="w-4 h-4" variant="badge" />
                <span>{L('联系活动顾问', 'Hablar con Ejecutivo de Eventos', 'Talk to an Events Executive')}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white text-[#141923] rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-100">
            {enviado ? (
              <div className="py-12 text-center space-y-4 max-w-md mx-auto">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                  {L('申请已成功提交！', '¡Solicitud Enviada con Éxito!', 'Request Sent Successfully!')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {lang === 'zh' ? (
                    <>
                      感谢您，<strong>{nombre}</strong>。我们的企业与社交活动团队将核实<strong>{destinoLabel}</strong>（{capacidadLabel}）的场地档期，并在最多 4 个工作小时内通过 <strong>{email}</strong> 或 <strong>{celular}</strong> 与您联系。
                    </>
                  ) : lang === 'es' ? (
                    <>
                      Gracias <strong>{nombre}</strong>. Nuestro equipo de eventos corporativos y sociales revisará la disponibilidad de salas para <strong>{destinoLabel}</strong> ({capacidadLabel}) y se comunicará a <strong>{email}</strong> o al <strong>{celular}</strong> en un plazo máximo de 4 horas hábiles.
                    </>
                  ) : (
                    <>
                      Thank you <strong>{nombre}</strong>. Our corporate and social events team will check room availability for <strong>{destinoLabel}</strong> ({capacidadLabel}) and contact you at <strong>{email}</strong> or <strong>{celular}</strong> within 4 business hours.
                    </>
                  )}
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <a
                    href={buildWhatsAppUrl(waMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EB958] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <WhatsAppLogo className="w-4 h-4" variant="badge" />
                    <span>{L('通过 WhatsApp 确认', 'Confirmar por WhatsApp', 'Confirm via WhatsApp')}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setEnviado(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {L('新建申请', 'Nueva Solicitud', 'New Request')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#0A1D37]">
                  {L('请填写表单，我们将与您联系', 'Completa el formulario para ponernos en contacto', 'Fill out the form and we will get in touch')}
                </h3>

                <div className="flex items-center gap-6 pt-1 text-xs font-bold text-[#0A1D37]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="eventType"
                      checked={eventType === 'corporativo'}
                      onChange={() => setEventType('corporativo')}
                      className="accent-[#C88A36] w-4 h-4 cursor-pointer"
                    />
                    <span>{L('企业活动', 'Evento corporativo', 'Corporate event')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="eventType"
                      checked={eventType === 'social'}
                      onChange={() => setEventType('social')}
                      className="accent-[#C88A36] w-4 h-4 cursor-pointer"
                    />
                    <span>{L('社交活动', 'Evento social', 'Social event')}</span>
                  </label>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder={L('姓名*', 'Nombre y Apellido*', 'Full name*')}
                    aria-label={L('姓名', 'Nombre y Apellido', 'Full name')}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="email"
                    required
                    placeholder={L('电子邮箱*', 'Correo electrónico*', 'Email*')}
                    aria-label={L('电子邮箱', 'Correo electrónico', 'Email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                  />
                  <input
                    type="tel"
                    required
                    placeholder={L('手机 / WhatsApp*', 'Celular / WhatsApp*', 'Mobile / WhatsApp*')}
                    aria-label={L('手机 / WhatsApp', 'Celular / WhatsApp', 'Mobile / WhatsApp')}
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    placeholder={L('税号 RUC（选填）', 'Número de RUC (Opcional)', 'Tax ID / RUC (Optional)')}
                    aria-label={L('税号 RUC', 'Número de RUC', 'Tax ID / RUC')}
                    value={ruc}
                    onChange={(e) => setRuc(e.target.value)}
                    className={inputCls}
                  />
                  <input
                    type="text"
                    placeholder={L('公司名称', 'Nombre de la empresa', 'Company name')}
                    aria-label={L('公司名称', 'Nombre de la empresa', 'Company name')}
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    {L('活动信息：', 'Datos del evento:', 'Event details:')}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="relative">
                      <input
                        type="date"
                        value={fecha}
                        aria-label={L('活动日期', 'Fecha del evento', 'Event date')}
                        title={L('活动日期', 'Fecha del evento', 'Event date')}
                        onChange={(e) => setFecha(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <select
                      value={duracion}
                      aria-label={L('活动时长', 'Duración', 'Duration')}
                      onChange={(e) => setDuracion(e.target.value)}
                      className={selectCls}
                    >
                      {DURATIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {lbl(o.label)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <select
                    value={destino}
                    aria-label={L('目的地', 'Destino', 'Destination')}
                    onChange={(e) => setDestino(e.target.value)}
                    className={selectCls}
                  >
                    {DESTINATIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {lbl(o.label)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={capacidad}
                    aria-label={L('出席人数', 'Capacidad de personas', 'Guest capacity')}
                    onChange={(e) => setCapacidad(e.target.value)}
                    className={selectCls}
                  >
                    {CAPACITIES.map((o) => (
                      <option key={o.value} value={o.value}>
                        {lbl(o.label)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={tipoAlimento}
                    aria-label={L('餐饮类型', 'Tipo de alimento', 'Catering type')}
                    onChange={(e) => setTipoAlimento(e.target.value)}
                    className={selectCls}
                  >
                    {FOODS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {lbl(o.label)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2.5 pt-2 text-[11px] text-slate-600">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={aceptoTerminos}
                      onChange={(e) => setAceptoTerminos(e.target.checked)}
                      className="mt-0.5 accent-[#C88A36] rounded w-3.5 h-3.5 cursor-pointer shrink-0"
                    />
                    <span>
                      {lang === 'zh' ? (
                        <>
                          我同意 Casa Solana Hoteles 的<a href="#terminos" className="text-[#C88A36] hover:underline">条款与条件</a>及<a href="#privacidad" className="text-[#C88A36] hover:underline">隐私政策</a> *
                        </>
                      ) : lang === 'es' ? (
                        <>
                          Acepto los <a href="#terminos" className="text-[#C88A36] hover:underline">Términos y Condiciones</a> de Casa Solana Hoteles y la <a href="#privacidad" className="text-[#C88A36] hover:underline">Política de privacidad</a> *
                        </>
                      ) : (
                        <>
                          I accept the <a href="#terminos" className="text-[#C88A36] hover:underline">Terms and Conditions</a> of Casa Solana Hoteles and the <a href="#privacidad" className="text-[#C88A36] hover:underline">Privacy Policy</a> *
                        </>
                      )}
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aceptoPublicidad}
                      onChange={(e) => setAceptoPublicidad(e.target.checked)}
                      className="mt-0.5 accent-[#C88A36] rounded w-3.5 h-3.5 cursor-pointer shrink-0"
                    />
                    <span>
                      {lang === 'zh' ? (
                        <>
                          我已阅读并同意接收宣传信息，并同意按照<a href="#privacidad" className="text-[#C88A36] hover:underline">隐私政策</a>中所述的可选用途处理我的个人数据
                        </>
                      ) : lang === 'es' ? (
                        <>
                          He leído y acepto el envío de publicidad y el tratamiento de mis datos para la finalidad opcional detallada en la <a href="#privacidad" className="text-[#C88A36] hover:underline">Política de privacidad</a>
                        </>
                      ) : (
                        <>
                          I have read and agree to receive promotional messages and to the processing of my data for the optional purpose described in the <a href="#privacidad" className="text-[#C88A36] hover:underline">Privacy Policy</a>
                        </>
                      )}
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#C88A36] hover:bg-[#AE7225] text-white font-extrabold text-xs uppercase tracking-widest transition-colors shadow-md cursor-pointer"
                  >
                    {L('申请咨询', 'Solicitar información', 'Request information')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
