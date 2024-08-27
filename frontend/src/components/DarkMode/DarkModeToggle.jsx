import React, { useRef, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './DarkModeToggle.css';

const DarkModeToggle = ({ darkMode, onToggleDarkMode }) => {
    const [isDragging, setIsDragging] = useState(false);
    const buttonRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });

    const handleStartDragging = (e) => {
        setIsDragging(true);
        const rect = buttonRef.current.getBoundingClientRect();
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        offset.current = { x: clientX - rect.left, y: clientY - rect.top };
        e.preventDefault();
    };

    const handleDragging = (e) => {
        if (isDragging) {
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            const left = clientX - offset.current.x;
            const top = clientY - offset.current.y;
            buttonRef.current.style.left = `${left}px`;
            buttonRef.current.style.top = `${top}px`;
            e.preventDefault(); // Prevent scrolling during dragging
        }
    };

    const handleStopDragging = () => {
        setIsDragging(false);
    };

    React.useEffect(() => {
        // Mouse events
        window.addEventListener('mousemove', handleDragging);
        window.addEventListener('mouseup', handleStopDragging);

        // Touch events
        window.addEventListener('touchmove', handleDragging, { passive: false });
        window.addEventListener('touchend', handleStopDragging);

        return () => {
            // Mouse events
            window.removeEventListener('mousemove', handleDragging);
            window.removeEventListener('mouseup', handleStopDragging);

            // Touch events
            window.removeEventListener('touchmove', handleDragging);
            window.removeEventListener('touchend', handleStopDragging);
        };
    }, [handleDragging, isDragging]);

    return (
        <div
            ref={buttonRef}
            className={`dark-mode-toggle ${darkMode ? 'dark-mode' : ''}`}
            onClick={onToggleDarkMode}
            onMouseDown={handleStartDragging}
            onTouchStart={handleStartDragging}
        >
            {darkMode ? <FaMoon /> : <FaSun />}
        </div>
    );
};

export default DarkModeToggle;
