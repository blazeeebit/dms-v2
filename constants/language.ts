type LANGUAGE_PREFERENCE_PROPS = {
  [key in 'ENGLISH' | 'TURKISH']: {
    content: any
  }
}
type LANGUAGE_CONTENT = {
  SEARCH: LANGUAGE_PREFERENCE_PROPS
  SIDEBAR: LANGUAGE_PREFERENCE_PROPS
  UI_MODE: LANGUAGE_PREFERENCE_PROPS
  INTEGRATIONS: LANGUAGE_PREFERENCE_PROPS
  IMAGE_GALLERY: LANGUAGE_PREFERENCE_PROPS
  PAYMENT_PLANS: LANGUAGE_PREFERENCE_PROPS
  MAKE_BOOKING: LANGUAGE_PREFERENCE_PROPS
  ROOM_PAYMENT: LANGUAGE_PREFERENCE_PROPS
  RATING: LANGUAGE_PREFERENCE_PROPS
}
export const DMS_CONTENT: LANGUAGE_CONTENT = {
  SEARCH: {
    ENGLISH: {
      content: 'Search',
    },
    TURKISH: {
      content: 'Arama',
    },
  },
  SIDEBAR: {
    ENGLISH: {
      content: {
        overview: 'overview',
        dormitories: 'dormitories',
        integrations: 'integrations',
        settings: 'settings',
        community: 'community',
        compare: 'compare',
        calender: 'calender',
      },
    },
    TURKISH: {
      content: {
        overview: 'genel bakış',
        dormitories: 'yatakhaneler',
        integrations: 'entegrasyonlar',
        settings: 'ayarlar',
        community: 'toplum',
        compare: 'karşılaştırmak',
        calender: 'takvim',
      },
    },
  },
  UI_MODE: {
    ENGLISH: {
      content: {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      },
    },
    TURKISH: {
      content: {
        light: 'Işık',
        dark: 'Karanlık',
        system: 'Sistem',
      },
    },
  },
  INTEGRATIONS: {
    ENGLISH: {
      content: {
        connect: 'connect',
        connected: 'connected',
        title: 'Connect Stripe Account',
        modelDescription:
          'The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.',
        description:
          'Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.',
      },
    },
    TURKISH: {
      content: {
        connect: 'bağlamak',
        connected: 'bağlı',
        title: 'Stripe Hesabını Bağla',
        modelDescription:
          'Shopify ve DoorDash dahil dünyanın en başarılı platformları ve pazaryerleri Stripe Connecti kullanıyor.',
        description:
          'Stripe, ödemeleri ve finansal hizmetleri yazılım platformunuza veya pazarınıza entegre etmenin en hızlı ve en kolay yoludur.',
      },
    },
  },
  IMAGE_GALLERY: {
    ENGLISH: {
      content: {
        modal: {
          title: 'Dorm image gallery',
          description: 'Create an image gallery for your dorms!',
        },
      },
    },
    TURKISH: {
      content: {
        modal: {
          title: 'Yurt resim galerisi',
          description: 'Yurtlarınız için bir resim galerisi oluşturun!',
        },
      },
    },
  },
  PAYMENT_PLANS: {
    ENGLISH: {
      content: {
        modal: {
          title: 'Create a payment plan',
          description:
            'Create a payment plan for your rooms for students to book/rent',
        },
      },
    },
    TURKISH: {
      content: {
        modal: {
          title: 'Ödeme planı oluşturun',
          description:
            'Öğrencilerin rezervasyon yapması/kiralaması için odalarınız için bir ödeme planı oluşturun',
        },
      },
    },
  },
  MAKE_BOOKING: {
    ENGLISH: {
      content: {
        modal: {
          title: 'Book a room',
          description: 'Book your favourite room in advance. Pay on arrival',
        },
      },
    },
    TURKISH: {
      content: {
        modal: {
          title: 'Kitap Odası',
          description: 'Favori odanızı önceden ayırtın. Varışta ödeme yapın',
        },
      },
    },
  },
  ROOM_PAYMENT: {
    ENGLISH: {
      content: {
        modal: {
          title: 'Pay for room',
          description:
            'Confirm your room right away. Make the complete payment here!',
        },
      },
    },
    TURKISH: {
      content: {
        modal: {
          title: 'Oda için ödeme yapın',
          description:
            'Hemen odanızı onaylayın. Ödemenin tamamını buradan yapın!',
        },
      },
    },
  },
  RATING: {
    ENGLISH: {
      content: {
        title: 'Rate Our Services',
        description: 'Hey! if you have a minute give us a quick rating',
      },
    },
    TURKISH: {
      content: {
        title: 'Hizmetlerimizi Değerlendirin',
        description: 'Hey! Bir dakikanız varsa bize hızlı bir puan verin',
      },
    },
  },
}
