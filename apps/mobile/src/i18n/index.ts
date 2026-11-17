import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import { ar } from './locales/ar';
import { en } from './locales/en';

export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

const RTL_LANGUAGES: readonly Language[] = ['ar'];

export const isRTL = (lang: string): boolean => RTL_LANGUAGES.includes(lang as Language);

function detectLanguage(): Language {
  const code = getLocales()[0]?.languageCode;
  return code === 'ar' ? 'ar' : 'en';
}

const i18n = createInstance();

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, ar: { translation: ar } },
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

/** Convenience hook: translation fn + current language + direction. */
export function useI18n() {
  const { t, i18n: instance } = useTranslation();
  const language = (instance.language as Language) ?? 'en';
  return {
    t,
    language,
    rtl: isRTL(language),
    setLanguage: (lang: Language) => instance.changeLanguage(lang),
  };
}

export default i18n;
