import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import deTranslations from './locales/de/translation.json'; // German translations
import enTranslations from './locales/en/translation.json';
import esTranslations from './locales/es/translation.json'; // Spanish translations
import frTranslations from './locales/fr/translation.json'; // French translations
import itTranslations from './locales/it/translation.json'; // Italian translations
import jaTranslations from './locales/ja/translation.json'; // Japanese translations
import sqTranslations from './locales/sq/translation.json';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: { translation: enTranslations },
            sq: { translation: sqTranslations },
            es: { translation: esTranslations }, // Add Spanish translations
            fr: { translation: frTranslations }, // Add French translations
            it: { translation: itTranslations }, // Add Italian translations
            de: { translation: deTranslations }, // Add German translations
            ja: { translation: jaTranslations }, // Add Japanese translations
        },
        lng: localStorage.getItem('language') || 'en', // Set default language from localStorage or fallback to 'en'
        fallbackLng: 'en', // use English if a translation is missing
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
