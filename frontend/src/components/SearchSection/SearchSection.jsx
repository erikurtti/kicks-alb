import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchSection.css';

const SearchSection = ({ onSearch, placeholder }) => {  // Add `placeholder` prop here
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <div className="search-container">
            <input
                type='text'
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={placeholder}
                className='search-bar'
            />
            <FaSearch className='search-icon' />
        </div>
    );
};

export default SearchSection;
