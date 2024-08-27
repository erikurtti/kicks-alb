import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './DarkModeToggle.css';

const DarkModeToggle = ({ darkMode, onToggleDarkMode }) => {
    return (
        <div
            className={`dark-mode-toggle ${darkMode ? 'dark-mode' : ''}`}
            onClick={onToggleDarkMode}
        >
            {darkMode ? <FaMoon /> : <FaSun />}
        </div>
    );
};

export default DarkModeToggle;
