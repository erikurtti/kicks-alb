import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { assets } from '../../assets/assets';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Function to handle language change
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng); // Save selected language to localStorage
        setDropdownOpen(false); // Close the dropdown after selecting
    };

    // Retrieve and apply the saved language from localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    // Language options
    const languages = {
        en: { label: 'EN', flag: assets.en, alt: 'UK Flag' },
        sq: { label: 'AL', flag: assets.al, alt: 'Albanian Flag' },
        es: { label: 'ES', flag: assets.es, alt: 'Spain Flag' },
        fr: { label: 'FR', flag: assets.fr, alt: 'France Flag' },
        it: { label: 'IT', flag: assets.it, alt: 'Italy Flag' },
        de: { label: 'DE', flag: assets.de, alt: 'Germany Flag' },
        ja: { label: 'JA', flag: assets.ja, alt: 'Japan Flag' }
    };

    const currentLanguage = languages[i18n.language] || languages.en; // Default to English if current language is not found

    return (
        <div className="language-switcher">
            <button
                className="dropdown-toggle"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
                <b>{currentLanguage.label}</b>&nbsp;
                <img src={currentLanguage.flag} alt={currentLanguage.alt} className="flag-icon" />
            </button>
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    {Object.entries(languages).map(([lng, { label, flag, alt }]) => (
                        <div key={lng} className="dropdown-item" onClick={() => changeLanguage(lng)}>
                            <img src={flag} alt={alt} className="flag-icon" /> <b>{label}</b>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
