type LANGUAGE_PREFERENCE_PROPS = {
  [key in 'ENGLISH' | 'TURKISH']: {
    content: any
  }
}
type LANGUAGE_CONTENT = {
  SEARCH: LANGUAGE_PREFERENCE_PROPS
  SIDEBAR: LANGUAGE_PREFERENCE_PROPS
  UI_MODE: LANGUAGE_PREFERENCE_PROPS
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
}
