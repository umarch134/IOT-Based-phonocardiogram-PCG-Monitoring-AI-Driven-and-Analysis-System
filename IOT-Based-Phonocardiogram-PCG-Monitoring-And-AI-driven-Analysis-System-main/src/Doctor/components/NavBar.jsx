import React from 'react';
import { useTranslation } from 'react-i18next';
import { MoonIcon, SunIcon, Bars3Icon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

/**
 * NavBar Component: Top navigation bar with dashboard title, navigation links,
 * theme toggle, and language selector. It's visible on all screen sizes.
 */
const NavBar = ({
  currentThemeName,
  toggleTheme,
  language,
  setLanguage,
  onLogout,
  themeColors,
  scrollToSection,
  activeSection,
  setIsMobileMenuOpen
}) => {
  const { t } = useTranslation();

  const gradientClasses =
    currentThemeName === 'light'
      ? `from-blue-600 to-indigo-700`
      : `from-gray-700 to-gray-800`;

  // Updated navLinks (Home, Profile, My Patients removed)
  const navLinks = [
    { id: 'live-pcg-monitoring-section', label: t('livePCG'), icon: <i className="fas fa-heartbeat mr-2"></i> },
    { id: 'pcg-upload-analysis-section', label: t('uploadHeartSound'), icon: <CloudArrowUpIcon className="h-5 w-5 mr-2" /> },
    { id: 'patient-pcg-reports-section', label: t('patientPcgReports'), icon: <i className="fas fa-file-medical mr-2"></i> },
    { id: 'my-schedule-section', label: t('mySchedule'), icon: <i className="fas fa-calendar-alt mr-2"></i> },
    { id: 'consultations-section', label: t('consultations'), icon: <i className="fas fa-headset mr-2"></i> },
  ];

  return (
    <nav className={`bg-gradient-to-r ${gradientClasses} ${themeColors.textColorClass} p-4 ${themeColors.shadowClass} relative z-40`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Dashboard Title */}
        <div className="text-2xl font-bold tracking-wide">
          {t('doctorDashboard')}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-white focus:outline-none p-2 rounded-md hover:bg-white/20 transition-colors">
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              className={`flex items-center p-2 rounded-md transition-colors duration-200
                ${activeSection === link.id ? `bg-white/30 text-white` : `hover:bg-white/20 text-white`}`}
            >
              {link.icon}{link.label}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            title={currentThemeName === 'light' ? t('darkTheme') : t('lightTheme')}
          >
            {currentThemeName === 'light' ? (
              <MoonIcon className="w-6 h-6 text-yellow-300" />
            ) : (
              <SunIcon className="w-6 h-6 text-yellow-300" />
            )}
          </button>

          {/* Language Selector */}
          <select
            className={`p-2 rounded-md bg-white/20 ${themeColors.textColorClass} focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200`}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">{t('english')}</option>
            <option value="ur">{t('urdu')}</option>
          </select>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> {t('logout')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
