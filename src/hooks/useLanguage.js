import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const getCurrentLanguage = () => {
    return i18n.language;
  };

  const isRTL = () => {
    // Add RTL languages here if needed
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(i18n.language);
  };

  const getLanguageFlag = (languageCode) => {
    const flags = {
      en: '🇺🇸',
      hi: '🇮🇳',
      // Add more language flags as needed
    };
    return flags[languageCode] || '🌐';
  };

  const getLanguageName = (languageCode) => {
    const names = {
      en: 'English',
      in: 'हिंदी',
      // Add more language names as needed
    };
    return names[languageCode] || languageCode;
  };

  return {
    changeLanguage,
    getCurrentLanguage,
    isRTL,
    getLanguageFlag,
    getLanguageName,
    currentLanguage: i18n.language,
  };
};
