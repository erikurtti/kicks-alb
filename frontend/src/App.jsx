import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Navbar from './components/Navbar/Navbar';
import Preloader from './components/Preloader/Preloader';
import './i18n';
import AISupport from './pages/AISupport/AISupport';
import Cart from './pages/Cart/Cart';
import ContactUS from './pages/ContactUs/ContactUs';
import HelpPage from './pages/HelpCenter/HelpPage';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import MyOrders from './pages/MyOrders/MyOrders';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Register from './pages/Register/Register';
import Verify from './pages/Verify/Verify';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Determine if the Navbar should be hidden
  const shouldHideNavbar = ['/kickalb-help-center', '/', '/register'].includes(location.pathname);
  // Determine if the LanguageSwitcher should be hidden
  const shouldHideLanguageSwitcher = ['/', '/register'].includes(location.pathname);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app-content'>
        {!shouldHideNavbar && <Navbar setShowLogin={setShowLogin} />}
        {!shouldHideLanguageSwitcher && <LanguageSwitcher />} {/* Conditionally render LanguageSwitcher */}

        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/ai-suggestion' element={<AISupport />} />
          <Route path='/contact-us' element={<ContactUS />} />
          <Route path='/kickalb-help-center' element={<HelpPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      {/* <DarkModeToggle darkMode={darkMode} onToggleDarkMode={() => setDarkMode(prev => !prev)} /> */}
    </div>
  );
};

export default App;
