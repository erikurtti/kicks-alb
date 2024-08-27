import React from 'react';
import { useTranslation } from 'react-i18next';
import { assets } from '../../assets/assets';
import './AppDownload.css';

const AppDownload = () => {
    const { t } = useTranslation();
    return (
        <div className='app-download' id='app-download'>
            <p>{t("app_download_message","For Better Experience Download")} <br />{t("app_name", "KicksAlb App")}</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default AppDownload
