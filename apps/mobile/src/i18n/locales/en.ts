export const en = {
  welcome: {
    brand: 'Tadawie',
    tagline: 'Health & Beauty, delivered.',
    body: 'Authentic skincare, wellness and beauty from the brands you trust — now in your pocket.',
    cta: 'Start shopping',
    switchLanguage: 'العربية',
    devBadge: 'Live preview · Fast Refresh',
  },
} as const;

type DeepString<T> = { [K in keyof T]: T[K] extends string ? string : DeepString<T[K]> };
export type Translation = DeepString<typeof en>;
