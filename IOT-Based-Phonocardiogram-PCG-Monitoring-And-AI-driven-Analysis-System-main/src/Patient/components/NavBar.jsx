// components/NavBar.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline';

/**
 * NavBar Component: Top navigation bar with dashboard title, navigation links,
 * theme toggle, and language selector.
 * نیو بار کمپونینٹ: ڈیش بورڈ کے عنوان، نیویگیشن لنکس، تھیم ٹوگل، اور زبان کے انتخاب کے ساتھ اوپر کا نیویگیشن بار۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.currentThemeName - Name of the current active theme.
 * @param {function} props.toggleTheme - Function to toggle the theme.
 * @param {string} props.language - Current language code.
 * @param {function} props.setLanguage - Function to set the language.
 * @param {function} props.onLogout - Function to handle logout.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.scrollToSection - Function to scroll to a specific section.
 * @param {string} props.activeSection - The currently active section ID.
 * @param {function} props.setIsMobileMenuOpen - Function to set the state of the mobile menu.
 */
const NavBar = ({ t, currentThemeName, toggleTheme, language, setLanguage, onLogout, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // your logic (e.g., clearing localStorage)
        navigate('/login'); // redirect to login
    };

    const gradientClasses = currentThemeName === 'light'
        ? 'from-blue-600 to-indigo-700'
        : 'from-gray-700 to-gray-800';

    const navLinks = [
        { id: 'dashboard-section', label: t('home'), icon: <i className="fas fa-home mr-2"></i> },
        { id: 'health-reports-section', label: t('reports'), icon: <i className="fas fa-file-alt mr-2"></i> },
        { id: 'appointments-section', label: t('appointments'), icon: <i className="fas fa-calendar-check mr-2"></i> },
        { id: 'notifications-section', label: t('messages'), icon: <i className="fas fa-comments mr-2"></i> },
    ];

    return (
        <nav className={`bg-gradient-to-r ${gradientClasses} ${themeColors.textColorClass} p-4 ${themeColors.shadowClass} relative z-40`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold tracking-wide">
                    {t('patientDashboard')}
                </div>

                {/* Mobile Menu Icon */}
                {/* موبائل مینو آئیکن */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-white focus:outline-none p-2 rounded-md hover:bg-white/20 transition-colors"
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </div>

                {/* Desktop Navigation */}
                {/* ڈیسک ٹاپ نیویگیشن */}
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.id);
                            }}
                            className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
                                activeSection === link.id
                                    ? 'bg-white/30 text-white'
                                    : 'hover:bg-white/20 text-white'
                            }`}
                        >
                            {link.icon}{link.label}
                        </a>
                    ))}

                    {/* Theme Toggle */}
                    {/* تھیم ٹوگل */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-300"
                        title={currentThemeName === 'light' ? t('darkTheme') : t('lightTheme')}
                    >
                        {currentThemeName === 'light'
                            ? <MoonIcon className="w-6 h-6 text-yellow-300" />
                            : <SunIcon className="w-6 h-6 text-yellow-300" />}
                    </button>

                    {/* Language Selector */}
                    {/* زبان کا انتخاب کنندہ */}
                    <select
                        className={`p-2 rounded-md bg-white/20 ${themeColors.textColorClass} focus:outline-none`}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">{t('english')}</option>
                        <option value="ur">{t('urdu')}</option>
                        <option value="es">{t('spanish')}</option>
                        <option value="fr">{t('french')}</option>
                        <option value="de">{t('german')}</option>
                    </select>

                    {/* Logout Button (Simple) */}
                    {/* لاگ آؤٹ بٹن (سادہ) */}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        {t('logout')}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
