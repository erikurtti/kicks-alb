import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StoreContext } from '../../Context/StoreContext';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
    const { menu_list } = useContext(StoreContext);
    const { t } = useTranslation(); // Initialize the translation hook

    return (
        <div className='explore-menu' id='explore-menu'>
            <h2>{t('exploreMenu.title', 'Our brands')}</h2> {/* Translation with fallback */}
            <p className='explore-menu-text'>
                {t('exploreMenu.description', 'Browse our diverse selection of stylish and comfortable shoes for every occasion. Click on the desired brand to filter the products.')}
            </p> {/* Translation with fallback */}
            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    <div
                        onClick={() => setCategory(prev => prev === item.brand_name ? "All" : item.brand_name)}
                        key={index}
                        className='explore-menu-list-item'
                    >
                        <img
                            src={item.brand_image}
                            className={category === item.brand_name ? "active" : ""}
                            alt={item.brand_name}
                        />
                        <p>{item.brand_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
