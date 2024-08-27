import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import './Cart.css';

const Cart = () => {
  const { t } = useTranslation();
  const { cartItems, shoe_list, removeFromCart, getTotalCartAmount, url, currency, deliveryCharge } = useContext(StoreContext);
  

  const handleClick = () => {
    window.open('https://www.instagram.com/kicks.alb/', '_blank', 'noopener,noreferrer');
  };
  


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>{t('items', 'Items')}</p>
          <p>{t('title', 'Title')}</p>
          <p>{t('price', 'Price')}</p>
          <p>{t('quantity', 'Quantity')}</p>
          <p>{t('total', 'Total')}</p>
          <p>{t('remove', 'Remove')}</p>
        </div>
        <br />
        <hr />
        {shoe_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{currency}{item.price}</p>
                  <div>{cartItems[item._id]}</div>
                  <p>{currency}{item.price * cartItems[item._id]}</p>
                  <p className='cart-items-remove-icon' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>{t('cart_totals', 'Cart Totals')}</h2>
          <div>
            <div className="cart-total-details">
              <p>{t('subtotal', 'Subtotal')}</p><p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>{t('delivery_fee', 'Delivery Fee')}</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>{t('total', 'Total')}</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b>
            </div>
          </div>
          <a href="https://www.instagram.com/kicks.alb/" target="_blank" rel="noopener noreferrer">
          <button >{t('proceed_to_checkout', 'Proceed to Checkout')}</button>
          </a>
        </div>
        <div className="cart-promocode">
          <div>
            <p>{t('promo_code', 'If you have a promo code, enter it here')}</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder={t('promo_code_placeholder', 'Promo code')} />
              <a href="https://www.instagram.com/kicks.alb/" target="_blank" rel="noopener noreferrer">
                <button onClick={handleClick}>{t('submit', 'Submit')}</button>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
