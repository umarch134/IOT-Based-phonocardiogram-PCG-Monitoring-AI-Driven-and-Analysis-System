import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, UserCircleIcon, Cog6ToothIcon, BellAlertIcon, CalendarDaysIcon,
    DocumentTextIcon, HomeModernIcon, HeartIcon, ClockIcon, BookOpenIcon,
    PencilSquareIcon, UsersIcon, ChartBarIcon, RunningIcon, MoonIcon as SleepIcon,
    CubeTransparentIcon, KeyIcon, SunIcon, MoonIcon
} from '@heroicons/react/24/outline'; // Ensure all icons are imported
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/**
 * MobileMenu Component: Displays a full-screen mobile navigation menu.
 * @param {object} props - Component props.
 * @param {boolean} props.isMobileMenuOpen - State to control menu visibility.
 * @param {function} props.setIsMobileMenuOpen - Function to set menu visibility.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {string} props.activeSection - Currently active section ID.
 * @param {function} props.scrollToSection - Function to scroll to a section.
 * @param {string} props.patientName - The patient's name.
 * @param {function} props.onLogout - Function to handle logout.
 * @param {function} props.t - Translation function.
 * @param {string} props.currentThemeName - Name of the current active theme.
 * @param {function} props.toggleTheme - Function to toggle the theme.
 * @param {string} props.language - Current language code.
 * @param {function} props.setLanguage - Function to set the language.
 */
const MobileMenu = ({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    themeColors,
    activeSection,
    scrollToSection,
    patientName,
    onLogout,
    t,
    currentThemeName,
    toggleTheme,
    language,
    setLanguage
}) => {
    const navigate = useNavigate();

    const sidebarNavItems = [
        { id: 'dashboard-section', label: t('dashboard'), icon: <HomeModernIcon className="w-5 h-5 mr-3" /> },
        { id: 'profile-section', label: t('profile'), icon: <UserCircleIcon className="w-5 h-5 mr-3" /> },
        { id: 'health-reports-section', label: t('myReports'), icon: <DocumentTextIcon className="w-5 h-5 mr-3" /> },
        { id: 'appointments-section', label: t('myAppointments'), icon: <CalendarDaysIcon className="w-5 h-5 mr-3" /> },
        { id: 'notifications-section', label: t('notifications'), icon: <BellAlertIcon className="w-5 h-5 mr-3" /> },
        { id: 'medication-reminders-section', label: t('medicationReminders'), icon: <PencilSquareIcon className="w-5 h-5 mr-3" /> },
        { id: 'live-pcg-monitoring-section', label: t('livePCG'), icon: <CubeTransparentIcon className="w-5 h-5 mr-3" /> },
        { id: 'health-status-section', label: t('healthStatus'), icon: <HeartIcon className="w-5 h-5 mr-3" /> },
        { id: 'health-trends-section', label: t('healthTrends'), icon: <ChartBarIcon className="w-5 h-5 mr-3" /> },
        { id: 'daily-activity-section', label: t('dailyActivity'), icon: <RunningIcon className="w-5 h-5 mr-3" /> },
        { id: 'sleep-patterns-section', label: t('sleepPatterns'), icon: <SleepIcon className="w-5 h-5 mr-3" /> },
        { id: 'password-change-section', label: t('changePassword'), icon: <KeyIcon className="w-5 h-5 mr-3" /> },
        { id: 'settings-section', label: t('settings'), icon: <Cog66ToothIcon className="w-5 h-5 mr-3" /> },
    ];

    const handleNavigation = (id) => {
        scrollToSection(id);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    return (
        <Transition show={isMobileMenuOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={() => setIsMobileMenuOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300 sm:duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300 sm:duration-500"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className={`pointer-events-auto w-screen max-w-md ${themeColors.sidebarBgClass} h-full flex flex-col`}>
                                    <div className={`p-4 flex items-center justify-between ${themeColors.sidebarBgClass} border-b ${themeColors.sidebarBorderClass}`}>
                                        <Dialog.Title className={`text-lg font-medium ${themeColors.textColorClass}`}>
                                            {t('patientDashboard')}
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            className={`rounded-md ${themeColors.buttonSecondaryClass} p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="flex items-center p-4">
                                        <UserCircleIcon className={`w-10 h-10 ${themeColors.iconColorClass} mr-3`} />
                                        <div>
                                            <h3 className={`text-lg font-semibold ${themeColors.textColorClass}`}>
                                                {t('welcomePatient', { patientName })}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Patient Dashboard</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto px-4 py-6">
                                        <nav className="flex-1">
                                            <ul className="space-y-2">
                                                {sidebarNavItems.map(item => (
                                                    <li key={item.id}>
                                                        <a
                                                            href={`#${item.id}`}
                                                            onClick={(e) => { e.preventDefault(); handleNavigation(item.id); }}
                                                            className={`flex items-center p-3 rounded-lg transition-colors duration-200
                                                                ${activeSection === item.id
                                                                    ? `bg-blue-600 text-white ${themeColors.shadowClass}`
                                                                    : `hover:bg-gray-100 dark:hover:bg-gray-700 ${themeColors.textColorClass}`
                                                                }`}
                                                        >
                                                            {item.icon}
                                                            <span className="font-medium">{item.label}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>

                                    <div className={`p-4 border-t ${themeColors.sidebarBorderClass}`}>
                                        {/* Theme Toggle */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`${themeColors.textColorClass} font-medium`}>{t('theme')}</span>
                                            <button
                                                onClick={toggleTheme}
                                                className="p-2 rounded-md text-white hover:bg-white/20 transition-colors bg-blue-500 dark:bg-indigo-600"
                                                aria-label={currentThemeName === 'light' ? t('darkTheme') : t('lightTheme')}
                                            >
                                                {currentThemeName === 'light' ? (
                                                    <MoonIcon className="w-6 h-6" />
                                                ) : (
                                                    <SunIcon className="w-6 h-6" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Language Selector */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`${themeColors.textColorClass} font-medium`}>{t('language')}</span>
                                            <select
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                className="bg-white/20 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200"
                                            >
                                                <option value="en">{t('english')}</option>
                                                <option value="ur">{t('urdu')}</option>
                                                <option value="es">{t('spanish')}</option>
                                                <option value="fr">{t('french')}</option>
                                                <option value="de">{t('german')}</option>
                                            </select>
                                        </div>

                                        <button
                                            onClick={handleLogout}
                                            className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200
                                                ${themeColors.buttonSecondaryClass} hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-300`}
                                        >
                                            <i className="fas fa-sign-out-alt mr-3"></i> {t('logout')}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MobileMenu;