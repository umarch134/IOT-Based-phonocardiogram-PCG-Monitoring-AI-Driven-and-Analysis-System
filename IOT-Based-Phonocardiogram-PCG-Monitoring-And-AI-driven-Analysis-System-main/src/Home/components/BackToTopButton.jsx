// src/components/BackToTopButton.jsx
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 animate-bounce-subtle focus:outline-none focus:ring-4 focus:ring-blue-300 z-40"
            aria-label="Back to top"
            title="Back to Top"
        >
            <FaArrowUp className="text-xl" />
        </button>
    );
};

export default BackToTopButton;