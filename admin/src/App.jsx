import { default as React, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Preloader from '../../frontend/src/components/Preloader/Preloader'
import DarkModeToggle from './components/DarkMode/DarkModeToggle'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import DeletedUsers from './pages/DeletedUsers/DeletedUsers'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import User from './pages/Users/Users'


const App = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);

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

      <Navbar />
      <hr />
      <div className="app-content">

        <Sidebar />
        <Routes>
          <Route path="/" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<User />} />
          <Route path="/deleted-users" element={<DeletedUsers />} />

        </Routes>
      </div>
      <DarkModeToggle darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
    </div>
  );
};

export default App;

