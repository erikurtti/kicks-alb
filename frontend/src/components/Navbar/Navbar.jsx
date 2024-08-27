import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { faCartPlus, faCartShopping, faHome, faShieldAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const { t } = useTranslation(); // Initialize the translation hook
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/'); // Navigate to the login page after logout
  };

  // Function to handle scrolling to the top of the page
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div className='navbar'>
        <Link to='/home' onClick={handleScrollToTop}><img className='logo' src={assets.logo} alt="Logo" /></Link>
        <ul className="navbar-menu">
          <Link to="/home" onClick={() => { setMenu("home"); handleScrollToTop(); }} className={`${menu === "home" ? "active" : ""}`}>Home</Link>
          <a href='#explore-menu' onClick={() => { setMenu("menu"); handleScrollToTop(); }} className={`${menu === "menu" ? "active" : ""}`}>Shop</a>
          <a href='/kickalb-help-center' onClick={() => { setMenu("mob-app"); handleScrollToTop(); }} className={`${menu === "mob-app" ? "active" : ""}`}>Help Center</a>
          <a href='/contact-us' onClick={() => { setMenu("contact"); handleScrollToTop(); }} className={`${menu === "contact" ? "active" : ""}`}>Contact Us</a>
        </ul>
        <div className="navbar-right">
          <Link to='#'>
            <FontAwesomeIcon icon={faShieldAlt} />
          </Link>
          <Link to='/cart' className='navbar-search-icon'>
            <FontAwesomeIcon icon={faCartShopping} />
            <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
          </Link>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>sign in</button>
          ) : (
            <div className='navbar-profile'>
              <div className="navbar-profile">
                <Link to="/myorders" className="navbar-brand">
                  <img
                    src={assets.profile}
                    alt="Profile"
                    style={{ width: '45px', height: '45px', borderRadius: '50%' }}
                  />
                </Link>
              </div>
              <ul className='navbar-profile-dropdown'>
                <li onClick={logout}> {/* Call logout and navigate to login page */}
                  <p>{t("logout_logout", "Logout")}</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <nav className="mobile-navbar">
        <Link to="/home" onClick={handleScrollToTop}><FontAwesomeIcon icon={faHome} /></Link>
        <Link
          to="/home#explore-menu"
          onClick={(e) => {
            // Prevent default anchor link behavior
            e.preventDefault();
            // Navigate to /home and scroll to #explore-menu
            navigate("/home");
            setTimeout(() => {
              const element = document.querySelector("#explore-menu");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          }}
        >
          <FontAwesomeIcon icon={faShopify} />
        </Link>
        <Link to="/contact-us" onClick={handleScrollToTop}><img src={assets.concept_2} alt='Concept' className='spin bold-image' /></Link>
        <Link to="/cart" onClick={handleScrollToTop}><FontAwesomeIcon icon={faCartPlus} /></Link>
        <Link to="/myorders" onClick={handleScrollToTop}><FontAwesomeIcon icon={faUser} /></Link>
      </nav>
    </div>
  );
};

export default Navbar;
