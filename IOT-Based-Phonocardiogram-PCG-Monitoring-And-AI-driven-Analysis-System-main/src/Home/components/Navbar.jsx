// src/components/Navbar.jsx
import React, { useState } from 'react';
 import { AiOutlineHome } from 'react-icons/ai'; // Ab 'ai' library se import ho raha hai // Importing icons for dark mode toggle and mobile menu

const Navbar = ({ darkMode, setDarkMode }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleSmoothScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsNavOpen(false); // Close mobile nav after clicking
        }
    };

    const navLinks = [
        { id: "features", label: "Features" },
        { id: "how-it-works", label: "How It Works" },
        { id: "technology", label: "Technology" },
        { id: "team", label: "Our Team" },
        { id: "testimonials", label: "Testimonials" },
        { id: "faq", label: "FAQ" },
        { id: "blog", label: "Blog" },
        { id: "contact", label: "Contact" },
    ];

    return (
        <nav className="sticky top-0 bg-white dark:bg-gray-900 shadow-xl z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <a
                    href="#home"
                    onClick={(e) => handleSmoothScroll(e, 'home')}
                    className="text-3.5x1 font-extrabold text-blue-700 dark:text-blue-400 tracking-wider hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md py-1 px-2"
                    aria-label="SmartBeat Home"
                >
                    Phonocardiogram (PCG)
                </a>

                {/* Hamburger Menu Icon for Mobile */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle Dark Mode"
                        className="p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-800 mr-2"
                        title="Toggle Dark Mode"
                    >
                        {darkMode ? (
                            <FaSun className="text-yellow-400 text-xl" />
                        ) : (
                            <FaMoon className="text-gray-600 text-xl" />
                        )}
                    </button>
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="text-gray-800 dark:text-gray-100 text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                        aria-label="Open navigation menu"
                    >
                        {isNavOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <div className={`hidden md:flex items-center space-x-7 text-lg`}>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle Dark Mode"
                        className="p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-800"
                        title="Toggle Dark Mode"
                    >
                        {darkMode ? (
                            <FaSun className="text-yellow-400 text-xl" />
                        ) : (
                            <FaMoon className="text-gray-600 text-xl" />
                        )}
                    </button>
                    {navLinks.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            onClick={(e) => handleSmoothScroll(e, section.id)}
                            className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md py-1 px-2"
                        >
                            {section.label}
                        </a>
                    ))}
                    <a
                        href="/login"
                        className="bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105 ml-5"
                    >
                        Login
                    </a>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden ${isNavOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 py-4 shadow-inner`}>
                <div className="flex flex-col items-center space-y-4 text-lg">
                    {navLinks.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            onClick={(e) => handleSmoothScroll(e, section.id)}
                            className="w-full text-center py-2 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 font-semibold rounded-md"
                        >
                            {section.label}
                        </a>
                    ))}
                    <a
                        href="/login"
                        className="w-4/5 text-center bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
                    >
                        Login
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;