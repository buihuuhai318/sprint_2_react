import React, { useState } from 'react';
import './SearchBox.css'; // Tạo một file SearchBox.css để điều chỉnh kiểu dáng

const SearchBox = () => {

    return (
        <div className="container">
            <form className="search">
                <input type="text" placeholder="Search" className="searchInput" />
                <button type="button" className="searchButton">
                    asd
                    <i className="ri-search-2-1ine"></i>
                </button>
            </form>
        </div>

    );
};

export default SearchBox;
