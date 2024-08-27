import React from 'react';
import { FiList, FiPlusCircle, FiShoppingCart, FiUserX, FiUsers } from 'react-icons/fi'; // Feather Icons
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ darkMode }) => {
  return (
    <div className={`sidebar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="sidebar-options">
        <NavLink to='/' className="sidebar-option">
          <FiPlusCircle className="sidebar-icon" size={20} />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <FiList className="sidebar-icon" size={20} />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <FiShoppingCart className="sidebar-icon" size={20} />
          <p>Orders</p>
        </NavLink>
        <NavLink to='/users' className="sidebar-option">
          <FiUsers className="sidebar-icon" size={20} />
          <p>Clients</p>
        </NavLink>
        <NavLink to='/deleted-users' className="sidebar-option">
          <FiUserX className="sidebar-icon" size={20} />
          <p>Deleted Accounts</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
