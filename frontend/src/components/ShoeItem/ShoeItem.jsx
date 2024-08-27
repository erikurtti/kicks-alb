import React, { useContext, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './ShoeItem.css';
import { FaInstagram } from 'react-icons/fa';


const ShoeItem = ({ image, name, price, description, id }) => {

    const [itemCount, setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);

    return (
        <div className='shoe-item'>
            <div className='shoe-item-img-container'>
                <img className='shoe-item-image' src={url+"/images/"+image} alt="" />
                {!cartItems[id]
                ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className="shoe-item-counter">
                        <img className='add-icon' src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img className='remove-icon' src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="shoe-item-info">
                <div className="shoe-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="shoe-item-desc">{description}</p>
                <p className="shoe-item-price">{currency}{price}</p>
                <a href="https://www.instagram.com/kicks.alb/">
                    <button className='instagram-button'>Order on Instagram<FaInstagram style={{ marginLeft: '3px'}} size={20} /></button>
                </a>
            </div>
        </div>
    )
}

export default ShoeItem
