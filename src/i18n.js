import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

import en from './locales/en';

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    ns: ['main'],
    defaultNS: 'main',
    fallbackLng: 'en',
    fallbackNS: 'main',
    resources: {
      en,
    },
    react: {
      wait: true,
    },
    debug: process.env.NODE_ENV !== 'production',
  });

export default i18n;
