import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { HOTEL_SUITES } from '../data/roomsData';
import { useSolana } from '../context/SolanaContext';
import { RoomSuiteCard } from '../components/RoomSuiteCard';
import { QuickRoomModal } from '../components/QuickRoomModal';
import type { HotelLocationId, HotelRoom, SuiteCategory } from '../types/hotel';

export const RoomsCatalogPage: React.FC = () => {
  const { lang, t } = useSolana();
  const [searchParams, setSearchParams] = useSearchParams();
  const [previewSuite, setPreviewSuite] = useState<HotelRoom | null>(null);

  const activeLoc = (searchParams.get('location') as HotelLocationId) || 'all';
  const activeCat = (searchParams.get('category') as SuiteCategory) || 'all';
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'sqm-desc'>('popular');

  const setParam = (key: string, val: string) => {
    const next = new URLSearchParams(searchParams);
    if (!val || val === 'all') next.delete(key);
    else next.set(key, val);
    setSearchParams(next, { replace: true });
  };

  const categories: { id: SuiteCategory; es: string; en: string; zh: string }[] = [
    { id: 'all', es: 'Todas las categorías', en: 'All Categories', zh: '全部房型' },
    { id: 'suites', es: 'Master Suites', en: 'Master Suites', zh: '尊享主套房' },
    { id: 'villas', es: 'Villas & Bungalows', en: 'Villas & Bungalows', zh: '独栋别墅与平房' },
    { id: 'lofts', es: 'Junior Lofts', en: 'Junior Lofts', zh: '精选阁楼' },
    { id: 'penthouse', es: 'Penthouse', en: 'Penthouse', zh: '顶层豪邸' }
  ];

  const filtered = useMemo(() => {
    const list = HOTEL_SUITES.filter((s) => {
      if (activeLoc !== 'all' && s.locationId !== activeLoc) return false;
      if (activeCat !== 'all' && s.category !== activeCat) return false;
      return true;
    });
    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.nightlyUsd - b.nightlyUsd);
    if (sortBy === 'sqm-desc') return [...list].sort((a, b) => b.sqm - a.sqm);
    return [...list].sort((a, b) => b.rating - a.rating);
  }, [activeLoc, activeCat, sortBy]);

  return (
    <div className="min-h-screen bg-andean-pattern py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="eyebrow-solana text-[#C88A36]">{t.collection.eyebrow}</span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1D37] mt-1">
                {lang === 'zh'
                  ? '客房、独栋别墅与尊享套房'
                  : lang === 'es'
                  ? 'Habitaciones, Villas & Suites'
                  : 'Suites, Lofts & Villas'}
              </h1>
              <p className="text-sm text-slate-600 mt-1.5">
                {lang === 'zh'
                  ? `共 ${filtered.length} 处精品居所可选 · 官网会员享额外88折、手工自助早餐与免息分期礼遇。`
                  : lang === 'es'
                  ? `${filtered.length} residencias disponibles · Tarifa Directa Club (-12%), desayuno buffet y hasta 12 cuotas sin intereses.`
                  : `${filtered.length} residences available · Direct Club Rate (-12%), artisan breakfast and flexible installments.`}
              </p>
            </div>

            <div className="inline-flex flex-wrap sm:flex-nowrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start shrink-0">
              {(
                [
                  { id: 'all', label: t.collection.allTab },
                  { id: 'miraflores', label: lang === 'zh' ? '利马 · 尊荣分店' : lang === 'es' ? 'Signature · Lima' : 'Signature · Lima' },
                  { id: 'valle', label: lang === 'zh' ? '库斯科 · 圣谷圣所' : 'Sanctuary · Cusco' },
                  { id: 'paracas', label: lang === 'zh' ? '伊卡 · 帕拉卡斯度假村' : 'Resort · Paracas' }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setParam('location', tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeLoc === tab.id ? 'bg-[#0A1D37] text-white' : 'text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setParam('category', cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    activeCat === cat.id
                      ? 'bg-[#C88A36] border-[#C88A36] text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  {cat[lang]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 self-start sm:self-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C88A36]" />
              <select
                aria-label={lang === 'zh' ? '客房排序' : lang === 'es' ? 'Ordenar habitaciones' : 'Sort rooms'}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'price-asc' | 'sqm-desc')}
                className="text-xs font-bold text-[#0A1D37] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="popular">
                  {lang === 'zh' ? '宾客好评优先' : lang === 'es' ? 'Preferidas huéspedes' : 'Highest rated'}
                </option>
                <option value="price-asc">
                  {lang === 'zh' ? '每晚价格由低到高' : lang === 'es' ? 'Menor tarifa por noche' : 'Lowest nightly rate'}
                </option>
                <option value="sqm-desc">
                  {lang === 'zh' ? '客房面积由大到小' : lang === 'es' ? 'Mayor superficie m²' : 'Largest size m²'}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((suite) => (
            <RoomSuiteCard key={suite.slug} suite={suite} onQuickPreview={setPreviewSuite} />
          ))}
        </div>
      </div>

      <QuickRoomModal suite={previewSuite} onClose={() => setPreviewSuite(null)} />
    </div>
  );
};
