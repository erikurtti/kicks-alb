import React from 'react';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
    const { t } = useTranslation(); // Initialize the translation hook

    return (
        <div className='header'>
            <div className='header-video'>
                <video autoPlay muted loop className='header-video-bg'>
                    <source src='/videos/nike.mp4' type='video/mp4' />
                </video>
            </div>
            <div className='header-content'>
                <h2>{t('header.title', 'Order your favourite shoes here')}</h2> {/* Provide default English text */}
                <p>{t('header.description', 'Explore our diverse collection of stylish and comfortable shoes, meticulously curated for every occasion, ensuring all your footwear needs are met. From casual sneakers to elegant heels, our curated collection offers footwear that blends style with comfort, making every step a statement.')}</p> {/* Provide default English text */}
                <a href='#explore-menu'>
                    <button>{t('header.button', 'View Shop')}</button> {/* Provide default English text */}
                </a>
            </div>
        </div>
    );
}

export default Header;
