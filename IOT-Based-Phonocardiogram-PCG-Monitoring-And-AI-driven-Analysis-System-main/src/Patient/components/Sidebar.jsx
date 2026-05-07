// components/Sidebar.js
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Sidebar Component: Displays patient profile information and navigation links.
 * سائیڈبار کمپونینٹ: مریض کی پروفائل کی معلومات اور نیویگیشن لنکس دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.patient - Patient data object.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.scrollToSection - Function to scroll to a specific section.
 * @param {string} props.activeSection - The currently active section ID.
 * @param {function} props.setIsMobileMenuOpen - Function to set the state of the mobile menu.
 */
const Sidebar = ({ t, patient, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen }) => {
    const sidebarLinks = [
        { id: 'dashboard-section', label: t('dashboard'), icon: <i className={`fas fa-chart-line mr-3 text-blue-500`}></i> },
        { id: 'profile-section', label: t('profile'), icon: <i className="fas fa-user-circle mr-3 text-indigo-500"></i> },
        { id: 'health-trends-section', label: t('healthTrends'), icon: <i className="fas fa-chart-bar mr-3 text-green-500"></i> },
        { id: 'appointments-section', label: t('myAppointments'), icon: <i className="fas fa-calendar-alt mr-3 text-yellow-500"></i> },
        { id: 'medication-section', label: t('medicationReminders'), icon: <i className="fas fa-pills mr-3 text-purple-500"></i> },
        { id: 'notifications-section', label: t('recentAlerts'), icon: <i className="fas fa-bell mr-3 text-red-500"></i> },
        { id: 'settings-section', label: t('settings'), icon: <i className="fas fa-cog mr-3 text-gray-500"></i> },
    ];
    return (
        <div className={`w-64 ${themeColors.sidebarBgClass} p-6 flex flex-col items-center ${themeColors.shadowClass} rounded-r-xl transition-colors duration-300 ${themeColors.sidebarBorderClass} sticky top-0 h-screen overflow-y-auto hidden lg:flex`}>
            <div className="mb-6 text-center">
                <img src={patient.profilePic} alt={t('name')} className={`w-28 h-28 rounded-full border-4 border-blue-500 object-cover mx-auto mb-4 ${themeColors.shadowClass}`} />
                <h3 className={`text-xl font-bold ${themeColors.textColorClass}`}>{patient.fullName || patient.name}</h3>
                <p className={`text-sm text-gray-600 dark:text-gray-400`}>{patient.email || (patient.contact && patient.contact.email)}</p>
            </div>
            <nav className="flex-grow w-full">
                <ul className="space-y-3">
                    {sidebarLinks.map(link => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.id);
                                    if (setIsMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu if called from it
                                }}
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 font-medium
                                    ${activeSection === link.id
                                        ? `bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300`
                                        : `text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30`
                                    }`
                                }
                            >
                                {link.icon} {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
