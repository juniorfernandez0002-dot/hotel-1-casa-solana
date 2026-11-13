import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Building2, MapPin } from 'lucide-react';
import { useSolana } from '../context/SolanaContext';
import { HOTEL_MEDIA } from '../data/hotelMedia';

export const CorporativoPage: React.FC = () => {
  const { lang } = useSolana();
  const L = (es: string, en: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  // Corporate rates form state
  const [empresa, setEmpresa] = useState('');
  const [rubro, setRubro] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [paisCode, setPaisCode] = useState('+51');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [aceptoPublicidad, setAceptoPublicidad] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (empresa && nombre && email && aceptoTerminos) {
      setEnviado(true);
    }
  };

  return (
    <div className="bg-white text-[#141923]">
      {/* 1. 3-Panel Diagonal Architectural Montage Hero (Exact to Casa Andina Reference) */}
      <section className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] overflow-hidden bg-[#0A1D37]">
        {/* The 3 Slanted Architectural Panels */}
        <div className="grid grid-cols-12 h-full w-full">
          {/* Panel 1 (Left Building) */}
          <div className="col-span-4 relative h-full overflow-hidden border-r-2 border-white/20">
            <img
              src={HOTEL_MEDIA.corpBuildingNight}
              alt={L('Casa Solana Edificio Lima', 'Casa Solana Lima Building', 'Casa Solana 利马大楼')}
              className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          {/* Panel 2 (Center Entrance) */}
          <div className="col-span-4 relative h-full overflow-hidden border-r-2 border-white/20">
            <img
              src={HOTEL_MEDIA.corpHotelEntrance}
              alt={L('Casa Solana Entrada Principal', 'Casa Solana Main Entrance', 'Casa Solana 主入口')}
              className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Panel 3 (Right Hotel Facade) */}
          <div className="col-span-4 relative h-full overflow-hidden">
            <img
              src={HOTEL_MEDIA.lobbyLounge}
              alt={L('Casa Solana Fachada', 'Casa Solana Facade', 'Casa Solana 外立面')}
              className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        </div>

        {/* Big Bold Clean White Headline Over Center (Exact to Casa Andina) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-wider uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] leading-tight">
            {L('TARIFAS', 'CORPORATE', '企业')}
            <br />
            {L('CORPORATIVAS', 'RATES', '协议价')}
          </h1>
        </div>
      </section>

      {/* 2. Narrow Centered Clean Corporate Form (Exact to Casa Andina Reference) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-editorial text-lg sm:text-2xl font-bold text-[#141923] leading-snug">
              {L(
                'Déjanos tus datos y nos pondremos en contacto contigo a la brevedad posible:',
                'Leave your details and a corporate executive will contact you shortly:',
                '请留下您的信息，我们将尽快与您联系：'
              )}
            </h2>
          </div>

          {enviado ? (
            <div className="p-8 rounded-2xl bg-[#EAF7EE] border border-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-editorial text-xl font-bold text-emerald-950">
                {L('¡Solicitud enviada con éxito!', 'Corporate Request Received!', '申请已成功提交！')}
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {L(
                  'Una ejecutiva de cuentas corporativas se comunicará contigo al correo o teléfono indicado para coordinar tu convenio tarifario.',
                  'Our corporate account executive will contact you shortly to coordinate your corporate agreement.',
                  '企业客户经理将通过您提供的邮箱或电话与您联系，协商企业协议价事宜。'
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-slate-700">
              {/* Empresa* */}
              <div className="space-y-1">
                <label htmlFor="corp-empresa" className="block text-slate-700">
                  {L('Empresa*', 'Company*', '公司名称*')}
                </label>
                <input
                  id="corp-empresa"
                  type="text"
                  required
                  placeholder={L('Nombre de la empresa o razón social', 'Company name or legal name', '公司名称或注册名称')}
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs bg-white text-[#141923]"
                />
              </div>

              {/* Rubro* (Dropdown) */}
              <div className="space-y-1">
                <label htmlFor="corp-rubro" className="block text-slate-700">
                  {L('Rubro*', 'Industry*', '行业*')}
                </label>
                <select
                  id="corp-rubro"
                  required
                  value={rubro}
                  onChange={(e) => setRubro(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs bg-white text-[#141923] cursor-pointer"
                >
                  <option value="">{L('Selecciona el rubro de tu empresa', 'Select your company’s industry', '请选择贵公司所属行业')}</option>
                  <option value="mineria">{L('Minería, Energía & Petróleo', 'Mining, Energy & Oil', '矿业、能源与石油')}</option>
                  <option value="banca">{L('Banca, Seguros & Finanzas', 'Banking, Insurance & Finance', '银行、保险与金融')}</option>
                  <option value="tecnologia">{L('Tecnología, Software & Telecomunicaciones', 'Technology, Software & Telecommunications', '科技、软件与电信')}</option>
                  <option value="construccion">{L('Construcción & Bienes Raíces', 'Construction & Real Estate', '建筑与房地产')}</option>
                  <option value="retail">{L('Comercio, Retail & Consumo Masivo', 'Commerce, Retail & Consumer Goods', '商贸、零售与快消品')}</option>
                  <option value="agro">{L('Agroindustria & Pesca', 'Agribusiness & Fishing', '农业产业与渔业')}</option>
                  <option value="salud">{L('Salud & Farmacéutica', 'Health & Pharmaceuticals', '医疗与制药')}</option>
                  <option value="educacion">{L('Educación & Consultoría', 'Education & Consulting', '教育与咨询')}</option>
                  <option value="otro">{L('Otro sector empresarial', 'Other business sector', '其他行业')}</option>
                </select>
              </div>

              {/* Nombre* | Apellido* (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="corp-nombre" className="block text-slate-700">
                    {L('Nombre*', 'First name*', '名*')}
                  </label>
                  <input
                    id="corp-nombre"
                    type="text"
                    required
                    placeholder={L('Tu nombre', 'Your first name', '您的名')}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs bg-white text-[#141923]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="corp-apellido" className="block text-slate-700">
                    {L('Apellido*', 'Last name*', '姓*')}
                  </label>
                  <input
                    id="corp-apellido"
                    type="text"
                    required
                    placeholder={L('Tu apellido', 'Your last name', '您的姓')}
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs bg-white text-[#141923]"
                  />
                </div>
              </div>

              {/* Código de País | Teléfono* (2 columns) */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-5 sm:col-span-4 space-y-1">
                  <label htmlFor="corp-pais" className="block text-slate-700">
                    {L('Código de País', 'Country code', '国家区号')}
                  </label>
                  <select
                    id="corp-pais"
                    value={paisCode}
                    onChange={(e) => setPaisCode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs bg-white text-[#141923] cursor-pointer"
                  >
                    <option value="+51">{L('Perú (+51)', 'Peru (+51)', '秘鲁 (+51)')}</option>
                    <option value="+1">{L('EE.UU. (+1)', 'USA (+1)', '美国 (+1)')}</option>
                    <option value="+56">{L('Chile (+56)', 'Chile (+56)', '智利 (+56)')}</option>
                    <option value="+57">{L('Colombia (+57)', 'Colombia (+57)', '哥伦比亚 (+57)')}</option>
                    <option value="+54">{L('Argentina (+54)', 'Argentina (+54)', '阿根廷 (+54)')}</option>
                    <option value="+52">{L('México (+52)', 'Mexico (+52)', '墨西哥 (+52)')}</option>
                    <option value="+34">{L('España (+34)', 'Spain (+34)', '西班牙 (+34)')}</option>
                  </select>
                </div>
                <div className="col-span-7 sm:col-span-8 space-y-1">
                  <label htmlFor="corp-tel" className="block text-slate-700">
                    {L('Teléfono*', 'Phone*', '电话*')}
                  </label>
                  <input
                    id="corp-tel"
                    type="tel"
                    required
                    placeholder={L('Número de contacto', 'Contact number', '联系电话')}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs bg-white text-[#141923]"
                  />
                </div>
              </div>

              {/* Correo electrónico* */}
              <div className="space-y-1">
                <label htmlFor="corp-email" className="block text-slate-700">
                  {L('Correo electrónico*', 'Email*', '电子邮箱*')}
                </label>
                <input
                  id="corp-email"
                  type="email"
                  required
                  placeholder={L('ejemplo@tuempresa.com', 'example@yourcompany.com', 'example@yourcompany.com')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-[#C88A36] text-xs bg-white text-[#141923]"
                />
              </div>

              {/* Checkboxes (Exact wording to Casa Andina) */}
              <div className="space-y-3 pt-2 text-[11px] text-slate-600">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={aceptoTerminos}
                    onChange={(e) => setAceptoTerminos(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#C88A36] focus:ring-[#C88A36] cursor-pointer"
                  />
                  <span>
                    {L('Acepto los', 'I accept the', '我接受 Casa Solana 酒店的')}{' '}
                    <span className="text-[#C88A36] font-semibold underline underline-offset-2">
                      {L('Términos y Condiciones', 'Terms and Conditions', '条款与条件')}
                    </span>{' '}
                    {L('de Casa Solana Hoteles y la', 'of Casa Solana Hotels and the', '以及')}{' '}
                    <span className="text-[#C88A36] font-semibold underline underline-offset-2">
                      {L('Política de privacidad', 'Privacy Policy', '隐私政策')}
                    </span>{' '}
                    *
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aceptoPublicidad}
                    onChange={(e) => setAceptoPublicidad(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#C88A36] focus:ring-[#C88A36] cursor-pointer"
                  />
                  <span>
                    {L(
                      'He leído y acepto el envío de publicidad y el tratamiento de mis datos para la finalidad opcional detallada en la',
                      'I have read and agree to receive advertising and to the processing of my data for the optional purpose described in the',
                      '我已阅读并同意接收广告信息，并同意为隐私政策中所述的可选目的处理我的数据：'
                    )}{' '}
                    <span className="text-[#C88A36] font-semibold underline underline-offset-2">
                      {L('Política de privacidad', 'Privacy Policy', '隐私政策')}
                    </span>
                  </span>
                </label>
              </div>

              {/* Enviar Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-md bg-[#C88A36] hover:bg-[#AE7225] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  {L('Enviar', 'Submit', '提交')}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 3. Beneficios Corporativos Sobrios */}
      <section className="py-16 bg-[#FAF9F7] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow-solana text-[#C88A36] block">
              {L('VENTAJAS PARA TU EMPRESA', 'BENEFITS FOR YOUR COMPANY', '企业专属优势')}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141923] mt-1">
              {L('¿Por qué elegir Casa Solana como tu socio hotelero?', 'Why choose Casa Solana as your hotel partner?', '为什么选择 Casa Solana 作为您的酒店合作伙伴？')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-2xs space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0A1D37] text-[#C88A36] flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-lg font-bold text-[#141923]">
                {L('Tarifas Preferenciales Fijadas', 'Fixed Preferential Rates', '固定优惠协议价')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                {L(
                  'Convenios corporativos anuales con tarifas garantizadas todo el año, exentas de variaciones por alta temporada en Lima, Cusco y Paracas.',
                  'Annual corporate agreements with rates guaranteed all year, free from peak-season variations in Lima, Cusco and Paracas.',
                  '全年企业协议，价格全年保证，利马、库斯科和帕拉卡斯旺季期间也不浮动。'
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-2xs space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0A1D37] text-[#C88A36] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-lg font-bold text-[#141923]">
                {L('Facturación Centralizada & Crédito', 'Centralized Billing & Credit', '集中开票与信用额度')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                {L(
                  'Línea de crédito corporativo a 30 días, órdenes de servicio digitales y consolidación mensual de hospedaje y salones en una sola factura.',
                  '30-day corporate credit line, digital service orders and monthly consolidation of lodging and meeting rooms on a single invoice.',
                  '30天企业信用额度、电子服务单，并将每月住宿与会议厅费用合并开具一张发票。'
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-2xs space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0A1D37] text-[#C88A36] flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-lg font-bold text-[#141923]">
                {L('Ejecutiva de Cuentas Dedicada', 'Dedicated Account Executive', '专属客户经理')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                {L(
                  'Atención preferencial directa por WhatsApp y correo para reservas exprés, check-in anticipado para directores y upgrades de habitación.',
                  'Priority direct support via WhatsApp and email for express bookings, early check-in for executives and room upgrades.',
                  '通过 WhatsApp 和邮件提供优先直连服务，支持快速预订、高管提前入住及客房升级。'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sedes con Infraestructura Corporativa */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="eyebrow-solana text-[#C88A36] block">
              {L('PRESENCIA ESTRATÉGICA', 'STRATEGIC PRESENCE', '战略布局')}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141923] mt-1">
              {L('Hoteles equipados para tu equipo', 'Hotels equipped for your team', '为您的团队配备齐全的酒店')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm group">
              <div className="h-48 overflow-hidden">
                <img
                  src={HOTEL_MEDIA.lobbyLounge}
                  alt={L('Miraflores', 'Miraflores', '米拉弗洛雷斯')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-[#C88A36] uppercase tracking-wider block">
                  {L('LIMA · MIRAFLORES', 'LIMA · MIRAFLORES', '利马 · 米拉弗洛雷斯')}
                </span>
                <h4 className="font-editorial text-base font-bold text-[#141923]">
                  {L('Casa Solana Signature Miraflores', 'Casa Solana Signature Miraflores', 'Casa Solana 米拉弗洛雷斯精选酒店')}
                </h4>
                <p className="text-xs text-slate-600 font-light">
                  {L(
                    'Directorio VIP de 16 personas y salón Qoricancha para 120 asistentes. A pasos del centro financiero.',
                    'VIP boardroom for 16 people and Qoricancha hall for 120 attendees. Steps from the financial district.',
                    '可容纳16人的VIP董事会议室及可容纳120人的 Qoricancha 宴会厅，步行即达金融中心。'
                  )}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm group">
              <div className="h-48 overflow-hidden">
                <img
                  src={HOTEL_MEDIA.sacredValley}
                  alt={L('Valle Sagrado', 'Sacred Valley', '圣谷')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-[#C88A36] uppercase tracking-wider block">
                  {L('CUSCO · VALLE SAGRADO', 'CUSCO · SACRED VALLEY', '库斯科 · 圣谷')}
                </span>
                <h4 className="font-editorial text-base font-bold text-[#141923]">
                  {L('Casa Solana Sanctuary Valle Sagrado', 'Casa Solana Sanctuary Sacred Valley', 'Casa Solana 圣谷静修酒店')}
                </h4>
                <p className="text-xs text-slate-600 font-light">
                  {L(
                    'Ideal para convenciones corporativas, team building al aire libre y retiros estratégicos de directorio.',
                    'Ideal for corporate conventions, outdoor team building and board strategy retreats.',
                    '非常适合企业会议、户外团队建设及董事会战略务虚会。'
                  )}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm group">
              <div className="h-48 overflow-hidden">
                <img
                  src={HOTEL_MEDIA.bayResort}
                  alt={L('Paracas', 'Paracas', '帕拉卡斯')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-[#C88A36] uppercase tracking-wider block">
                  {L('ICA · BAHÍA DE PARACAS', 'ICA · PARACAS BAY', '伊卡 · 帕拉卡斯海湾')}
                </span>
                <h4 className="font-editorial text-base font-bold text-[#141923]">
                  {L('Casa Solana Resort Paracas', 'Casa Solana Resort Paracas', 'Casa Solana 帕拉卡斯度假村')}
                </h4>
                <p className="text-xs text-slate-600 font-light">
                  {L(
                    'Lanzamientos de producto frente al mar, terrazas con vista a la bahía y salas modulares.',
                    'Seafront product launches, bay-view terraces and modular meeting rooms.',
                    '海滨产品发布会、海湾景观露台以及可灵活组合的会议室。'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporativoPage;
