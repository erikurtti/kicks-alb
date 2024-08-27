import React from 'react';
import { useTranslation } from 'react-i18next';
import './Preloader.css';

const Preloader = () => {
    const { t } = useTranslation();

    return (
        <div className='preloader'>
            <div className='logo-container-preloader'>
                <div className="loader">{t('loading', 'Loading...')}</div>
            </div>
        </div>
    );
}

export default Preloader;
