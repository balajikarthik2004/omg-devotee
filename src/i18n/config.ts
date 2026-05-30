import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '../locales/en/translation.json';
import taTranslations from '../locales/ta/translation.json';
import hiTranslations from '../locales/hi/translation.json';
import knTranslations from '../locales/kn/translation.json';
import guTranslations from '../locales/gu/translation.json';
import mrTranslations from '../locales/mr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ta: { translation: taTranslations },
      hi: { translation: hiTranslations },
      kn: { translation: knTranslations },
      gu: { translation: guTranslations },
      mr: { translation: mrTranslations },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
