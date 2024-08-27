import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './PlaceOrder.css';

const PlaceOrder = () => {
    const { t } = useTranslation();
    const [payment, setPayment] = useState("cod");
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const { getTotalCartAmount, token, shoe_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(StoreContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const generateInstagramDMUrl = () => {
        const message = `Hello! I would like to place an order with the following details:\n\n` +
                        `Name: ${data.firstName} ${data.lastName}\n` +
                        `Email: ${data.email}\n` +
                        `Address: ${data.street}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.country}\n` +
                        `Phone: ${data.phone}\n` +
                        `Total Amount: ${currency}${getTotalCartAmount() + deliveryCharge}\n\n` +
                        `Please confirm my order. Thank you!`;
    
        // Replace '17849201373232318' with the actual user ID if needed
        const userId = '17849201373232318';
        const encodedMessage = encodeURIComponent(message);
        return `https://www.instagram.com/direct/t/${userId}?text=${encodedMessage}`;
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        shoe_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        };

        localStorage.setItem('userInfo', JSON.stringify(data));

        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                toast.error("Something went wrong");
            }
        } else if (payment === "instagram") {
            window.open(generateInstagramDMUrl(), "_blank");
        } else {
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders");
                toast.success(response.data.message);
                setCartItems({});
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    useEffect(() => {
        if (!token) {
            toast.error("Login first to add to cart");
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, getTotalCartAmount, navigate, token]);

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>{t('deliveryInfo')}</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder={t('firstNamePlaceholder')} required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder={t('lastNamePlaceholder')} required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder={t('emailPlaceholder')} required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder={t('streetPlaceholder')} required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder={t('cityPlaceholder')} required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder={t('statePlaceholder')} required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder={t('zipcodePlaceholder')} required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder={t('countryPlaceholder')} required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder={t('phonePlaceholder')} required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>{t('cartTotals')}</h2>
                    <div>
                        <div className="cart-total-details"><p>{t('subtotal')}</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>{t('deliveryFee')}</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>{t('total')}</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>{t('paymentMethod')}</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>{t('cod')}</p>
                    </div>
                    <div onClick={() => setPayment("instagram")} className="payment-option">
                        <img src={payment === "instagram" ? assets.checked : assets.un_checked} alt="" />
                        <p>{t('instagram_order')}</p>
                    </div>
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>{t('stripe')}</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>
                    {payment === "cod" ? t('placeOrder') : payment === "instagram" ? t('orderOnInstagram') : t('proceedToPayment')}
                </button>
            </div>
        </form>
    );
};

export default PlaceOrder;
