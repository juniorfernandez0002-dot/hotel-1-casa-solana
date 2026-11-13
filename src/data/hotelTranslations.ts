import type { LanguageCode } from '../types/hotel';

export const HOTEL_COPY: Record<
  LanguageCode,
  {
    brandSub: string;
    nav: {
      suites: string;
      villas: string;
      spaDining: string;
      locations: string;
      about: string;
      stayBag: string;
      bookCta: string;
    };
    hero: {
      eyebrow: string;
      titlePart1: string;
      titleHighlight: string;
      titlePart2: string;
      subtitle: string;
      ctaSuites: string;
      ctaSpa: string;
      trustRating: string;
      trustConcierge: string;
      trustBreakfast: string;
    };
    booking: {
      locationLabel: string;
      allProperties: string;
      checkIn: string;
      checkOut: string;
      guestsLabel: string;
      guestSingular: string;
      guestPlural: string;
      searchBtn: string;
    };
    collection: {
      eyebrow: string;
      title: string;
      allTab: string;
      mirafloresTab: string;
      valleTab: string;
      paracasTab: string;
      perNight: string;
      viewSuite: string;
      quickPreview: string;
      addToStay: string;
      inStay: string;
      viewAllBtn: string;
    };
    comfort: {
      eyebrow: string;
      title: string;
      subtitle: string;
      ctaServices: string;
    };
    map: {
      eyebrow: string;
      title: string;
      subtitle: string;
      transferLabel: string;
      climateLabel: string;
      signatureLabel: string;
      bookHere: string;
    };
    social: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    stayDrawer: {
      tag: string;
      title: string;
      emptyTitle: string;
      emptyDesc: string;
      nightsLabel: string;
      quoteBtn: string;
      clearBtn: string;
      remove: string;
    };
    footer: {
      desc: string;
      colProperties: string;
      colServices: string;
      colDesk: string;
      waBtn: string;
      rights: string;
    };
  }
> = {
  es: {
    brandSub: 'HOTEL BOUTIQUE & SPA',
    nav: {
      suites: 'Habitaciones',
      villas: 'Suites & Villas',
      spaDining: 'Spa & Mesa',
      locations: 'Sedes',
      about: 'La Casa',
      stayBag: 'Mi Estadía',
      bookCta: 'Reservar'
    },
    hero: {
      eyebrow: 'Miraflores · Valle Sagrado · Paracas',
      titlePart1: 'Hospitalidad de autor diseñada para el ',
      titleHighlight: 'descanso profundo',
      titlePart2: ' y el confort sin prisa.',
      subtitle:
        'Suites bañadas en luz cálida, lino egipcio de 600 hilos, circuito termal privado y desayuno artesanal en tres enclaves peruanos curados al detalle.',
      ctaSuites: 'Explorar Habitaciones',
      ctaSpa: 'Servicios & Spa',
      trustRating: '4.98 · Excelencia Huéspedes',
      trustConcierge: 'Concierge Privado 24/7',
      trustBreakfast: 'Desayuno Orgánico Incluido'
    },
    booking: {
      locationLabel: 'Sede del Hotel',
      allProperties: 'Todas las Sedes',
      checkIn: 'Llegada',
      checkOut: 'Salida',
      guestsLabel: 'Huéspedes',
      guestSingular: 'Huésped',
      guestPlural: 'Huéspedes',
      searchBtn: 'Disponibilidad'
    },
    collection: {
      eyebrow: 'Colección de Alojamiento',
      title: 'Espacios serenos en piedra, madera y lino natural',
      allTab: 'Todas las Sedes',
      mirafloresTab: 'Miraflores · Lima',
      valleTab: 'Valle Sagrado',
      paracasTab: 'Bahía Paracas',
      perNight: '/ noche',
      viewSuite: 'Ver suite',
      quickPreview: 'Vista rápida',
      addToStay: 'Guardar estadía',
      inStay: 'En tu estadía',
      viewAllBtn: 'Explorar todas las habitaciones'
    },
    comfort: {
      eyebrow: 'Estándar de Confort Casa Solana',
      title: 'Cada textura, aroma y servicio calibrado para tu descanso',
      subtitle:
        'Alterna entre nuestros cuatro pilares de hospitalidad para conocer cómo preparamos tu estadía antes de tu llegada.',
      ctaServices: 'Ver carta completa de servicios'
    },
    map: {
      eyebrow: 'Ubicación & Entorno',
      title: 'Tres refugios conectados con privacidad y accesos directos',
      subtitle:
        'Explora nuestras sedes en mapa real para revisar tiempos de traslado, clima y amenities insignia.',
      transferLabel: 'Traslado Privado',
      climateLabel: 'Clima Anual',
      signatureLabel: 'Amenity Insignia',
      bookHere: 'Ver suites en esta sede'
    },
    social: {
      eyebrow: 'Comunidad & Bitácora Visual',
      title: 'Mañanas de terraza, termas al caer la tarde y mesa estacional',
      subtitle: 'Asómate a la vida diaria de huéspedes y cocinas en nuestras redes oficiales.'
    },
    stayDrawer: {
      tag: 'SELECCIÓN DE ESTADÍA',
      title: 'Tu Estadía',
      emptyTitle: 'Aún no seleccionas suite',
      emptyDesc:
        'Guarda las suites o villas de tu preferencia para cotizar noches, traslados y tratamientos de spa en conjunto.',
      nightsLabel: 'Total estimado por',
      quoteBtn: 'Confirmar Solicitud',
      clearBtn: 'Vaciar selección',
      remove: 'Quitar'
    },
    footer: {
      desc: 'Hotelería boutique de autor enfocada en descanso sereno, arquitectura cálida, bienestar termal y atención humana en Lima, Valle Sagrado y Paracas.',
      colProperties: 'Nuestras Sedes',
      colServices: 'Servicios Hoteleros',
      colDesk: 'Recepción & Concierge',
      waBtn: 'WhatsApp Recepción',
      rights: 'CASA SOLANA Hotel Boutique & Spa · Perú'
    }
  },
  en: {
    brandSub: 'BOUTIQUE HOTEL & SPA',
    nav: {
      suites: 'Rooms',
      villas: 'Suites & Villas',
      spaDining: 'Spa & Dining',
      locations: 'Locations',
      about: 'Heritage',
      stayBag: 'My Stay',
      bookCta: 'Reserve'
    },
    hero: {
      eyebrow: 'Miraflores · Sacred Valley · Paracas',
      titlePart1: 'Boutique hospitality crafted for ',
      titleHighlight: 'effortless rest',
      titlePart2: ' and unhurried mornings.',
      subtitle:
        'Sunlit architectural suites dressed in 600-thread Egyptian linen, private thermal circuits and artisanal morning dining across three serene sanctuaries.',
      ctaSuites: 'Browse Suites',
      ctaSpa: 'Spa & Dining',
      trustRating: '4.98 · Guest Sanctuary',
      trustConcierge: '24/7 Private Butler',
      trustBreakfast: 'Morning Table Included'
    },
    booking: {
      locationLabel: 'Sanctuary Property',
      allProperties: 'All Properties',
      checkIn: 'Check-In',
      checkOut: 'Check-Out',
      guestsLabel: 'Guests',
      guestSingular: 'Guest',
      guestPlural: 'Guests',
      searchBtn: 'Availability'
    },
    collection: {
      eyebrow: 'Accommodation Collection',
      title: 'Quiet architecture in travertine, timber and woven linen',
      allTab: 'All Sanctuaries',
      mirafloresTab: 'Miraflores · Lima',
      valleTab: 'Sacred Valley',
      paracasTab: 'Paracas Bay',
      perNight: '/ night',
      viewSuite: 'View suite',
      quickPreview: 'Quick peek',
      addToStay: 'Save to stay',
      inStay: 'Saved in stay',
      viewAllBtn: 'Explore full suite collection'
    },
    comfort: {
      eyebrow: 'Casa Solana Comfort Signature',
      title: 'Every textile, lighting scene and ritual tuned to deep sleep',
      subtitle:
        'Switch across our four core hospitality pillars to inspect how your suite and stay are prepared.',
      ctaServices: 'View all hotel services'
    },
    map: {
      eyebrow: 'Properties & Surroundings',
      title: 'Three intimate coastal and mountain retreats with private access',
      subtitle:
        'Explore each location on our interactive map to check private transfer times, weather and highlights.',
      transferLabel: 'Chauffeur Transfer',
      climateLabel: 'Typical Climate',
      signatureLabel: 'Signature Ritual',
      bookHere: 'Browse suites here'
    },
    social: {
      eyebrow: 'Community & House Journal',
      title: 'Terrace breakfasts, twilight pools and seasonal tables',
      subtitle: 'Glimpses from daily life across our suites, gardens and kitchen.'
    },
    stayDrawer: {
      tag: 'STAY SELECTION',
      title: 'Your Stay',
      emptyTitle: 'No suites saved yet',
      emptyDesc:
        'Save your preferred rooms or villas here to estimate nights, private transfers and spa sessions together.',
      nightsLabel: 'Estimated total for',
      quoteBtn: 'Request Reservation',
      clearBtn: 'Clear selection',
      remove: 'Remove'
    },
    footer: {
      desc: 'Independent hospitality studio devoted to tranquil sleep, warm stonework architecture, thermal wellness and attentive human care across Peru.',
      colProperties: 'Properties',
      colServices: 'Hotel Services',
      colDesk: 'Guest Relations',
      waBtn: 'Front Desk WhatsApp',
      rights: 'CASA SOLANA Boutique Hotel & Spa · Peru'
    }
  },
  zh: {
    brandSub: '秘鲁精品酒店及水疗中心',
    nav: {
      suites: '套房与客房',
      villas: '私人别墅',
      spaDining: '水疗与美食',
      locations: '目的地',
      about: '品牌故事',
      stayBag: '已选房型',
      bookCta: '立即预订'
    },
    hero: {
      eyebrow: '秘鲁新季 · 安第斯与太平洋奢华度假',
      titlePart1: '秘鲁之境，',
      titleHighlight: '静谧避世',
      titlePart2: '之所。',
      subtitle: '利马米拉弗洛雷斯海滨、圣谷安第斯山麓与帕拉卡斯海湾三处私密奢华酒店。',
      ctaSuites: '探索精选套房',
      ctaSpa: '水疗与餐饮',
      trustRating: '4.98 卓越宾客评分',
      trustConcierge: '24小时专属礼宾管家',
      trustBreakfast: '手工制作安第斯特色早餐'
    },
    booking: {
      locationLabel: '选择目的地酒店',
      allProperties: '所有分店（利马 · 圣谷 · 帕拉卡斯）',
      checkIn: '入住日期',
      checkOut: '退房日期',
      guestsLabel: '入住人数',
      guestSingular: '位宾客',
      guestPlural: '位宾客',
      searchBtn: '查询实时空房'
    },
    collection: {
      eyebrow: '精选住宿系列',
      title: '索拉纳当下最优惠房价与豪华套房',
      allTab: '全部房型',
      mirafloresTab: '利马 · 尊荣分店',
      valleTab: '库斯科 · 圣谷圣境',
      paracasTab: '伊卡 · 帕拉卡斯度假村',
      perNight: '每晚',
      viewSuite: '查看套房详情',
      quickPreview: '快速预览',
      addToStay: '加入行程',
      inStay: '已在行程中',
      viewAllBtn: '浏览全部客房与别墅'
    },
    comfort: {
      eyebrow: '索拉纳品质承诺',
      title: '每一寸纺织品、光影与仪式皆为深度睡眠而定制',
      subtitle: '探索我们的四大待客支柱，了解我们如何为您准备宁静居所。',
      ctaServices: '查看所有酒店服务'
    },
    map: {
      eyebrow: '分店与周边导览',
      title: '秘鲁三处私密海岸与高山隐世胜地',
      subtitle: '在交互式地图上探索各分店，了解专车接驳、当地气候与特色活动。',
      transferLabel: '专属礼宾专车',
      climateLabel: '适宜气候',
      signatureLabel: '招牌体验',
      bookHere: '浏览此处房型'
    },
    social: {
      eyebrow: '宾客社区与日常掠影',
      title: '露台早餐、黄昏泳池与时令飨宴',
      subtitle: '记录套房、花园与后厨的真实优雅日常。'
    },
    stayDrawer: {
      tag: '行程预订清单',
      title: '您的住宿行程',
      emptyTitle: '尚未收藏房型',
      emptyDesc: '在此保存您心仪的客房或别墅，可一并计算房费、专车接送和水疗项目。',
      nightsLabel: '预估总价（晚数）：',
      quoteBtn: '提交预订申请',
      clearBtn: '清空行程',
      remove: '移除'
    },
    footer: {
      desc: '致力于宁静睡眠、温暖石砌建筑、温泉疗愈与细致入微关怀的秘鲁独立精品酒店集团。',
      colProperties: '酒店分店',
      colServices: '服务设施',
      colDesk: '宾客关系中心',
      waBtn: '前台官方微信/WhatsApp',
      rights: 'CASA SOLANA 精品酒店及水疗中心 · 秘鲁版权所有'
    }
  }
};
