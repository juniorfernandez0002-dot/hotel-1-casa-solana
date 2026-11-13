import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, ThermometerSun } from 'lucide-react';
import { HOTEL_PROPERTIES } from '../data/hotelProperties';
import { useSolana } from '../context/SolanaContext';
import type { BilingualText, LanguageCode } from '../types/hotel';

function tr(item: BilingualText | undefined, lang: LanguageCode, fallback = ''): string {
  if (!item) return fallback;
  if (lang === 'zh' && item.zh) return item.zh;
  if (lang === 'en' && item.en) return item.en;
  return item.es || item.en || fallback;
}

export const HotelLocationsMap: React.FC = () => {
  const { lang, formatRate } = useSolana();
  const [selectedId, setSelectedId] = useState<string>('miraflores');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());

  const activeHub =
    HOTEL_PROPERTIES.find((h) => h.id === selectedId) ?? HOTEL_PROPERTIES[0];

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [-13.0, -74.6],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 18 }
    ).addTo(map);

    HOTEL_PROPERTIES.forEach((hub) => {
      const hubLabel = tr(hub.name, lang).replace('Casa Solana ', '');
      const icon = L.divIcon({
        className: 'solana-map-pin',
        html: `<div data-hub="${hub.id}" style="
          display:inline-block;
          width:max-content;
          transform:translate(-50%,-50%);
          padding:5px 11px;
          border-radius:6px;
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:10px;
          font-weight:800;
          letter-spacing:0.1em;
          text-transform:uppercase;
          white-space:nowrap;
          box-shadow:0 6px 18px rgba(10,29,55,0.22);
          transition:all 180ms ease;
          background:${hub.id === 'miraflores' ? '#0A1D37' : '#FFFFFF'};
          color:${hub.id === 'miraflores' ? '#F6D37A' : '#0A1D37'};
          border:1.5px solid ${hub.id === 'miraflores' ? '#C88A36' : 'rgba(10,29,55,0.22)'};
        ">${hubLabel}</div>`,
        iconSize: undefined
      });

      const marker = L.marker([hub.lat, hub.lng], { icon })
        .addTo(map)
        .on('click', () => {
          setSelectedId(hub.id);
        });

      markerMapRef.current.set(hub.id, marker);
    });

    const routeCoords: [number, number][] = HOTEL_PROPERTIES.map((h) => [h.lat, h.lng]);
    L.polyline(routeCoords, {
      color: '#C88A36',
      weight: 2,
      dashArray: '5 6',
      opacity: 0.75
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerMapRef.current.clear();
    };
  }, [lang]);

  useEffect(() => {
    HOTEL_PROPERTIES.forEach((hub) => {
      const el = containerRef.current?.querySelector(`[data-hub="${hub.id}"]`) as HTMLElement | null;
      if (!el) return;
      const isSelected = hub.id === selectedId;
      el.style.background = isSelected ? '#0A1D37' : '#FFFFFF';
      el.style.color = isSelected ? '#F6D37A' : '#0A1D37';
      el.style.borderColor = isSelected ? '#C88A36' : 'rgba(10,29,55,0.2)';
      el.style.transform = isSelected
        ? 'translate(-50%,-50%) scale(1.06)'
        : 'translate(-50%,-50%) scale(1)';
    });
  }, [selectedId]);

  const handleSelectHub = (id: string) => {
    setSelectedId(id);
    const found = HOTEL_PROPERTIES.find((h) => h.id === id);
    if (found && mapRef.current) {
      mapRef.current.flyTo([found.lat, found.lng], 7, { duration: 0.7 });
    }
  };

  return (
    <section
      id="solana-locations-map"
      className="py-12 sm:py-16 bg-white border-b border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-solana text-[#C88A36] block">
              {lang === 'zh'
                ? '秘鲁三处地标目的地'
                : lang === 'es'
                ? 'Nuestras Sedes en el Perú'
                : 'Three Peruvian Sanctuaries'}
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#0A1D37] mt-1 leading-tight">
              {lang === 'zh'
                ? '从利马米拉弗洛雷斯海滨到安第斯神圣谷与帕拉卡斯海湾'
                : lang === 'es'
                ? 'Del malecón de Miraflores al Valle Sagrado y Bahía Paracas'
                : 'Miraflores cliffs to Sacred Valley and Paracas Bay'}
            </h2>
          </div>

          <div className="inline-flex flex-wrap sm:flex-nowrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start shrink-0">
            {HOTEL_PROPERTIES.map((hub) => (
              <button
                key={hub.id}
                type="button"
                onClick={() => handleSelectHub(hub.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  hub.id === selectedId
                    ? 'bg-[#0A1D37] text-white'
                    : 'text-slate-600 hover:text-[#0A1D37]'
                }`}
              >
                {tr(hub.name, lang).replace('Casa Solana ', '')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 relative z-10 isolate rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[340px] sm:min-h-[400px] bg-[#E8EAE6]">
            <div ref={containerRef} className="w-full h-full min-h-[340px] sm:min-h-[400px]" />
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#FAF9F7] border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden bg-[#0A1D37]">
                <img
                  src={activeHub.heroImage}
                  alt={tr(activeHub.name, lang)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37]/85 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6D37A] block">
                    {tr(activeHub.cityTag, lang)}
                  </span>
                  <h3 className="font-editorial text-2xl font-bold mt-0.5">
                    {tr(activeHub.name, lang)}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tr(activeHub.summary, lang)}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
                  <div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C88A36]">
                      <Car className="w-3.5 h-3.5" />
                      {lang === 'zh' ? '专车接送' : lang === 'es' ? 'Traslado' : 'Arrival'}
                    </span>
                    <span className="block font-bold text-[#0A1D37] mt-1">
                      {tr(activeHub.transferNote, lang)}
                    </span>
                  </div>
                  <div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C88A36]">
                      <ThermometerSun className="w-3.5 h-3.5" />
                      {lang === 'zh' ? '气候与特色' : lang === 'es' ? 'Clima & Sello' : 'Climate & Amenity'}
                    </span>
                    <span className="block font-bold text-[#0A1D37] mt-1">
                      {tr(activeHub.signatureAmenity, lang)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <div>
                <span className="num-tabular font-editorial text-2xl font-bold text-[#0A1D37]">
                  {formatRate(activeHub.startingRateUsd)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  {lang === 'zh'
                    ? '会员特惠 / 每晚'
                    : lang === 'es'
                    ? 'Tarifa socio / noche'
                    : 'Club rate / night'}
                </span>
              </div>

              <Link
                to={`/habitaciones?location=${activeHub.id}`}
                className="px-5 py-2.5 rounded-xl bg-[#0A1D37] hover:bg-[#C88A36] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <span>{lang === 'zh' ? '查看套房' : lang === 'es' ? 'Ver suites' : 'View suites'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
