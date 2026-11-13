import type { HotelRoom } from '../types/hotel';
import { HOTEL_MEDIA } from './hotelMedia';

export const HOTEL_SUITES: HotelRoom[] = [
  {
    id: 'cs-01',
    slug: 'master-suite-terraza-oceanica-miraflores',
    code: 'CS-MF-01',
    locationId: 'miraflores',
    locationName: { es: 'Miraflores · Lima', en: 'Miraflores · Lima' },
    countryCode: 'PE',
    category: 'suites',
    title: {
      es: 'Master Suite Terraza Oceánica con Bañera de Mármol',
      en: 'Oceanfront Terrace Master Suite with Soaking Marble Bath'
    },
    shortTitle: { es: 'Master Suite Oceánica', en: 'Oceanfront Master Suite' },
    tagline: {
      es: 'Amplio balcón privado sobre los acantilados de Miraflores, bañera exenta e iluminado vestidor en roble.',
      en: 'Private cliffside balcony overlooking the Pacific, sculpted marble soaking tub and oak dressing salon.'
    },
    sqm: 64,
    maxGuests: 3,
    bedConfig: { es: '1 King Size + Daybed', en: '1 King + Lounge Daybed' },
    viewType: { es: 'Vista Mar & Jardín', en: 'Pacific & Garden View' },
    nightlyUsd: 265,
    originalNightlyUsd: 310,
    promoBadge: { es: 'Preferida Huéspedes', en: 'Guest Favorite' },
    rating: 4.98,
    reviewsCount: 184,
    heroImage: HOTEL_MEDIA.suiteMaster,
    gallery: [HOTEL_MEDIA.suiteMaster, HOTEL_MEDIA.bathMarble, HOTEL_MEDIA.breakfastTable, HOTEL_MEDIA.lobbyLounge],
    perks: {
      es: ['Desayuno artesanal en terraza o suite', 'Acceso 60 min circuito termal spa', 'Traslado in en reserva de 3+ noches'],
      en: ['Artisan breakfast on terrace or in-suite', 'Daily 60m thermal circuit pass', 'Complimentary airport pickup (3+ nights)']
    },
    amenities: {
      es: ['Sábanas Pima 600 hilos', 'Máquina espresso & té orgánico', 'Cortinas blackout motorizadas', 'Amenities botánicos full size', 'Caja fuerte formato laptop', 'Wi-Fi fibra dedicada'],
      en: ['600TC Pima sheets', 'Nespresso bar & loose-leaf tea', 'Motorized blackout drapery', 'Botanical bath apothecary', 'Laptop-sized safe', 'Private fiber Wi-Fi']
    },
    checkInNote: { es: 'Check-in 15:00 · Late Check-out hasta 14:00 (según disp.)', en: 'Check-in 3 PM · Flexible 2 PM departure on request' }
  },
  {
    id: 'cs-02',
    slug: 'villa-jardin-chimenea-valle-sagrado',
    code: 'CS-VS-01',
    locationId: 'valle',
    locationName: { es: 'Valle Sagrado · Cusco', en: 'Sacred Valley · Cusco' },
    countryCode: 'PE',
    category: 'villas',
    title: {
      es: 'Villa Independiente del Valle con Chimenea & Hidromasaje Exterior',
      en: 'Detached Sacred Valley Garden Villa with Hearth & Private Hot Plunge'
    },
    shortTitle: { es: 'Villa Jardín & Chimenea', en: 'Garden Hearth Villa' },
    tagline: {
      es: 'Casita privada entre bosques de molles con chimenea a leña, tina climatizada en terraza y techo alto en madera.',
      en: 'Secluded stand-alone residence with wood-burning fireplace, heated outdoor soaking tub and vaulted timber ceilings.'
    },
    sqm: 88,
    maxGuests: 4,
    bedConfig: { es: '1 Super King + Sofá Cama', en: '1 Super King + Lounge Bed' },
    viewType: { es: 'Vista Cordillera & Río', en: 'Andean Peaks & Garden' },
    nightlyUsd: 345,
    originalNightlyUsd: 395,
    promoBadge: { es: 'Copa Bienvenida & Spa', en: 'Spa Access Included' },
    rating: 4.99,
    reviewsCount: 212,
    heroImage: HOTEL_MEDIA.villaTerrace,
    gallery: [HOTEL_MEDIA.villaTerrace, HOTEL_MEDIA.spaThermal, HOTEL_MEDIA.suiteLinen, HOTEL_MEDIA.bathMarble],
    perks: {
      es: ['Encendido de chimenea cada tarde', 'Acceso ilimitado al spa termal', 'Canasta orgánica nocturna y mates andinos'],
      en: ['Evening butler hearth lighting', 'Unlimited thermal stone spa entry', 'Artisan Andean tea ceremony at twilight']
    },
    amenities: {
      es: ['Hidromasaje exterior 37°C', 'Piso radiante en baño de piedra', 'Bicicletas de paseo sin costo', 'Batón de lino lavado', 'Servicio nocturno de cortesía'],
      en: ['98°F private garden plunge', 'Heated travertine bath floors', 'Complimentary cruiser bikes', 'Washed linen robes', 'Evening turndown service']
    },
    checkInNote: { es: 'Recibimiento cálido con mate de muña en villa privada', en: 'Private villa welcome with herbal highland infusion' }
  },
  {
    id: 'cs-03',
    slug: 'bungalow-bahia-piscina-infinita-paracas',
    code: 'CS-PB-01',
    locationId: 'paracas',
    locationName: { es: 'Bahía Paracas · Ica', en: 'Paracas Bay · South Coast' },
    countryCode: 'PE',
    category: 'villas',
    title: {
      es: 'Bungalow Pie de Playa con Terraza de Lino y Vista al Atardecer',
      en: 'Beachfront Bay Bungalow with Sun Loungers & Sunset Deck'
    },
    shortTitle: { es: 'Bungalow Pie de Playa', en: 'Beachfront Bungalow' },
    tagline: {
      es: 'Despierta con el sonido sereno de la bahía a metros de tu hamaca privada y la piscina climatizada.',
      en: 'Wake to tranquil bay ripples steps from your shaded hammock patio and heated infinity pool.'
    },
    sqm: 72,
    maxGuests: 3,
    bedConfig: { es: '1 King Dosel Lino', en: '1 Draped Canopy King' },
    viewType: { es: 'Primera Línea de Bahía', en: 'Direct Bay Waterfront' },
    nightlyUsd: 290,
    promoBadge: { es: 'Sol Todo el Año', en: 'Sunny Waterfront' },
    rating: 4.96,
    reviewsCount: 158,
    heroImage: HOTEL_MEDIA.sanctuaryPool,
    gallery: [HOTEL_MEDIA.sanctuaryPool, HOTEL_MEDIA.bayResort, HOTEL_MEDIA.suiteLinen, HOTEL_MEDIA.breakfastTable],
    perks: {
      es: ['Camastros privados reservados frente al mar', 'Kayaks y paddle boards incluidos', 'Coctel al atardecer cortesía de la casa'],
      en: ['Reserved bayfront cabana beds', 'Complimentary kayaks & paddleboards', 'Complimentary golden-hour cocktail']
    },
    amenities: {
      es: ['Ducha interior y ducha solar exterior', 'Aire acondicionado silencioso', 'Sombrillas privadas', 'Mini bar gourmet curado', 'Audio inalámbrico Hi-Fi'],
      en: ['Indoor & open-air rain shower', 'Whisper quiet climate control', 'Private canvas loungers', 'Curated mini-pantry', 'Room audio system']
    },
    checkInNote: { es: 'Acceso directo desde terraza a zona de piscina sin escaleras', en: 'Step-free terrace opening straight to coastal deck' }
  },
  {
    id: 'cs-04',
    slug: 'junior-loft-lino-luz-natural-miraflores',
    code: 'CS-MF-02',
    locationId: 'miraflores',
    locationName: { es: 'Miraflores · Lima', en: 'Miraflores · Lima' },
    countryCode: 'PE',
    category: 'lofts',
    title: {
      es: 'Junior Loft Lino & Luz Natural para Viajeros y Estancias Largas',
      en: 'Sunlit Linen Junior Loft with Work & Lounge Nook'
    },
    shortTitle: { es: 'Junior Loft Lino', en: 'Sunlit Linen Loft' },
    tagline: {
      es: 'Espacio de arquitectura limpia en tonos cálidos con ventanales altos, sala de lectura y cafetera de grano.',
      en: 'Warm architectural studio with tall courtyard windows, linen sofa corner and single-origin pour-over setup.'
    },
    sqm: 48,
    maxGuests: 2,
    bedConfig: { es: '1 Queen / King Modular', en: '1 Cloud Queen / King' },
    viewType: { es: 'Patio de Olivos', en: 'Olive Courtyard View' },
    nightlyUsd: 215,
    originalNightlyUsd: 245,
    promoBadge: { es: '-12% Tarifa Anticipada', en: '-12% Advance Stay' },
    rating: 4.95,
    reviewsCount: 140,
    heroImage: HOTEL_MEDIA.suiteLinen,
    gallery: [HOTEL_MEDIA.suiteLinen, HOTEL_MEDIA.loftWood, HOTEL_MEDIA.breakfastTable],
    perks: {
      es: ['Desayuno gourmet incluido diario', 'Planchado de bienvenida de 2 prendas', 'Sala cowork silenciosa 24h'],
      en: ['Daily artisan breakfast included', '2-garment welcome pressing', 'Quiet garden study lounge 24/7']
    },
    amenities: {
      es: ['Escritorio amplio en nogal', 'Carta de almohadas personalizada', 'Ducha lluvia doble', 'Cargadores USB-C en cabecera'],
      en: ['Solid walnut work table', 'Custom pillow loft menu', 'Walk-in rainfall shower', 'Bedside USB-C charging']
    },
    checkInNote: { es: 'Ideal para escapadas urbanas o trabajo remoto con total calma', en: 'Ideal for peaceful city stays or unhurried remote work' }
  },
  {
    id: 'cs-05',
    slug: 'penthouse-terracotta-spa-privado-miraflores',
    code: 'CS-MF-03',
    locationId: 'miraflores',
    locationName: { es: 'Miraflores · Lima', en: 'Miraflores · Lima' },
    countryCode: 'PE',
    category: 'penthouse',
    title: {
      es: 'Penthouse Terracotta en Último Piso con Sala Privada y Terma',
      en: 'Top-Floor Terracotta Penthouse with Dining Salon & Private Jet Tub'
    },
    shortTitle: { es: 'Penthouse Terracotta', en: 'Terracotta Penthouse' },
    tagline: {
      es: 'Nuestra residencia emblemática en altura con comedero para 6 invitados, terraza ajardinada y mayordomo dedicado.',
      en: 'Our crowning penthouse suite with 6-seat dining room, panoramic terrace and dedicated house butler.'
    },
    sqm: 120,
    maxGuests: 4,
    bedConfig: { es: '1 Super King + Sala Suite', en: '1 Super King + Master Salon' },
    viewType: { es: 'Panorámica 180° Ciudad & Mar', en: '180° Ocean & Skyline' },
    nightlyUsd: 460,
    promoBadge: { es: 'Residencial Exclusivo', en: 'Signature Suite' },
    rating: 5.0,
    reviewsCount: 64,
    heroImage: HOTEL_MEDIA.loftWood,
    gallery: [HOTEL_MEDIA.loftWood, HOTEL_MEDIA.bathMarble, HOTEL_MEDIA.lobbyLounge, HOTEL_MEDIA.sanctuaryPool],
    perks: {
      es: ['Traslados privados ida y vuelta al aeropuerto', 'Botella reserva orgánica y cena degustación (2+ noches)', 'Masaje en suite de 60 minutos para dos'],
      en: ['Round-trip airport sedan transfers', 'Reserve wine + tasting dinner (2+ nights)', 'Dual 60m in-suite massages']
    },
    amenities: {
      es: ['Tina de mármol travertino', 'Barra privada con bartender on-demand', 'Vestidor walk-in para 2 huéspedes', 'Elevador con acceso por llave'],
      en: ['Carved travertine bath', 'In-suite private bar setup', 'Dual walk-in wardrobe', 'Keyed elevator privacy']
    },
    checkInNote: { es: 'Mayordomo personal desde antes de aterrizar', en: 'Pre-arrival personal butler coordination' }
  },
  {
    id: 'cs-06',
    slug: 'suite-familiar-dos-dormitorios-valle-sagrado',
    code: 'CS-VS-02',
    locationId: 'valle',
    locationName: { es: 'Valle Sagrado · Cusco', en: 'Sacred Valley · Cusco' },
    countryCode: 'PE',
    category: 'villas',
    title: {
      es: 'Casita Familiar 2 Dormitorios Conectados con Jardín Propio',
      en: 'Two-Bedroom Family Sanctuary Residence with Enclosed Meadow Patio'
    },
    shortTitle: { es: 'Casita Familiar (2 Dorm.)', en: '2-BR Family Casita' },
    tagline: {
      es: 'Dos dormitorios completos unidos por sala con estufa a leña y jardín seguro para viajes en familia.',
      en: 'Two spacious bedrooms joined by a cozy hearth living area and private walled lawn.'
    },
    sqm: 105,
    maxGuests: 5,
    bedConfig: { es: '1 King + 2 Full Twins', en: '1 King + 2 Double Beds' },
    viewType: { es: 'Jardines & Huerta Orgánica', en: 'Orchards & Mountain Wall' },
    nightlyUsd: 410,
    promoBadge: { es: 'Ideal Familias', en: 'Family Sanctuary' },
    rating: 4.97,
    reviewsCount: 92,
    heroImage: HOTEL_MEDIA.lobbyLounge,
    gallery: [HOTEL_MEDIA.lobbyLounge, HOTEL_MEDIA.villaTerrace, HOTEL_MEDIA.breakfastTable],
    perks: {
      es: ['Taller familiar de panadería artesanal incluido', 'Oxigenación enriquecida regulable opcional', 'Cuna o cama auxiliar sin cargo'],
      en: ['Complimentary family baking workshop', 'Optional oxygen-enriched rooms', 'Complimentary crib or rollaway']
    },
    amenities: {
      es: ['2 baños completos independientes', 'Porche amplio con mesas exteriores', 'Juegos de mesa de madera y biblioteca'],
      en: ['2 full en-suite stone bathrooms', 'Covered outdoor dining porch', 'Curated board games & library']
    },
    checkInNote: { es: 'Check-out tardío sin costo sujeto a temporada', en: 'Complimentary unhurried late departure option' }
  }
];
