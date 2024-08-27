import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { assets } from '../../assets/assets';
import './ContactUs.css';

const ContactUS = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Email:', email);
        console.log('Message:', message);
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-page">
            <div className="content-wrapper">
                <section className="contact-info">
                    <div className='OOO'>
                        <img src={assets.pfp_contact} alt={t('profile_alt', 'Profile')} className="profile-photo" />
                        <h3 className="instagram-username">@kicks.alb</h3>
                        <p className="region"><i className="fa fa-map-marker"></i> {t('location', 'Tirana | Albania')}</p>
                        <div className="container-1">
                            <a href="https://www.instagram.com/kicks.alb/">
                                <FaInstagram className="social-icon" />
                            </a>
                            <a href="https://wa.me/+355695473589">
                                <FaWhatsapp className="social-icon" />
                            </a>
                            <a href="https://www.tiktok.com/@kicksalb">
                                <FaTiktok className="social-icon" />
                            </a>
                        </div>
                    </div>
                    <br/>
                    <p>{t('company_info', 'KicksAlb has been a leading kicks and online shop for over 10 years, based in Tirana, Albania. We have served more than 50,000 clients and achieved over 100,000 sales. Our store offers over 300 products, all designed with the highest quality.')}</p>
                    <div className="stats">
                        <div className="stat-item">
                            <h2 className="count">
                                <CountUp start={0} end={300} duration={5} separator="," />
                                +
                            </h2>
                            <p>{t('products', 'Products')}</p>
                        </div>
                        <div className="stat-item">
                            <h2 className="count">
                                <CountUp start={0} end={50000} duration={5} separator="," />
                                +
                            </h2>
                            <p>{t('clients', 'Clients')}</p>
                        </div>
                        <div className="stat-item">
                            <h2 className="count">
                                <CountUp start={0} end={100000} duration={5} separator="," />
                                +
                            </h2>
                            <p>{t('sales', 'Sales')}</p>
                        </div>
                    </div>
                    <div className="social-links">
                        <a href="https://www.instagram.com/kicks.alb" target="_blank" rel="noopener noreferrer">
                            <FaInstagram /> {t('instagram', 'Instagram')}
                        </a>
                        <a href="https://www.tiktok.com/@kicksalb" target="_blank" rel="noopener noreferrer">
                            <FaTiktok /> {t('tiktok', 'TikTok')}
                        </a>
                        <a href="https://wa.me/+355695473589" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp /> {t('whatsapp', 'WhatsApp')}
                        </a>
                        <a href="mailto:info@kicksalb.com">
                            <FaEnvelope /> {t('email', 'Email')}
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactUS;
