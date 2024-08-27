import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StoreContext } from '../../Context/StoreContext';
import SearchSection from '../SearchSection/SearchSection';
import ShoeItem from '../ShoeItem/ShoeItem';
import './ShoeDisplay.css';

const ITEMS_PER_PAGE = 8;

const ShoeDisplay = ({ category }) => {
    const { shoe_list } = useContext(StoreContext);
    const [filteredShoes, setFilteredShoes] = useState(shoe_list);
    const [currentPage, setCurrentPage] = useState(1);
    const displayRef = useRef(null);
    const { t } = useTranslation();
    // Function to filter shoes based on category and search query
    const filterShoes = () => {
        let filtered = shoe_list;

        if (category !== "All") {
            filtered = filtered.filter(item => item.category === category);
        }

        setFilteredShoes(filtered);
        setCurrentPage(1); // Reset to first page on new filter
    };

    // Update filtered shoes when category changes
    useEffect(() => {
        filterShoes();
    }, [category, shoe_list]);

    // Calculate total number of pages based on filtered list
    const totalPages = Math.ceil(filteredShoes.length / ITEMS_PER_PAGE);

    // Slice the filtered shoes to show only items for the current page
    const paginatedShoes = filteredShoes.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Handle search query by name
    const handleNameSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = shoe_list.filter(item =>
            item.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredShoes(filtered);
        setCurrentPage(1); // Reset to first page on new search
    };

    // Handle search query by description
    const handleDescriptionSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = shoe_list.filter(item =>
            item.description.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredShoes(filtered);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            if (displayRef.current) {
                // Scroll to the top of the page, with extra offset for padding
                window.scrollTo({
                    top: displayRef.current.offsetTop - 90, // Adjust the value as needed
                    behavior: 'smooth'
                });
            }
        }
    };

    // Determine the range of pages to display
    const getPaginationPages = () => {
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // Adjust the range if the total number of pages is less than 5
        if (endPage - startPage < 4) {
            if (currentPage <= 3) {
                endPage = Math.min(totalPages, 5);
            } else {
                startPage = Math.max(1, totalPages - 4);
            }
        }

        return [...Array(endPage - startPage + 1).keys()].map(i => startPage + i);
    };

    const paginationPages = getPaginationPages();

    return (
        <div className='shoe-display' id='shoe-display' ref={displayRef}>
            <h2>{t('explore_shoes_by_brands')}</h2>

            <div className='search-section-2'>
                <SearchSection onSearch={handleNameSearch} placeholder="Search by name..." />
                <SearchSection onSearch={handleDescriptionSearch} placeholder="Search by size..." />
            </div>
            <div className='shoe-display-list'>
                {paginatedShoes.map((item) => (
                    <ShoeItem
                        key={item._id}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        id={item._id}
                    />
                ))}
            </div>

            <div className='pagination'>
                <ul>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                            className={currentPage === 1 ? 'disabled' : ''}
                        >
                            {t("prev_prev")}
                        </a>
                    </li>
                    {paginationPages.map(page => (
                        <li
                            key={page}
                            className={currentPage === page ? 'active' : ''}
                        >
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                            >
                                {page}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                            className={currentPage === totalPages ? 'disabled' : ''}
                        >
                            {t("next_next")}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ShoeDisplay;
