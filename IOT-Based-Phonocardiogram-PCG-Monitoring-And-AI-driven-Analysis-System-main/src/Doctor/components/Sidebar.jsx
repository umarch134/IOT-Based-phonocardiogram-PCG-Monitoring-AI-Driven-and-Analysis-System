// Sidebar.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserCircleIcon, HeartIcon, CloudArrowUpIcon, DocumentTextIcon, ClipboardDocumentListIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

/**
 * Sidebar Component: Displays doctor profile information and navigation links.
 * It's a sticky sidebar visible on larger screens, providing quick navigation.
 * @param {object} props - Component props.
 * @param {object} props.doctor - Doctor data object.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.scrollToSection - Function to scroll to a specific section.
 * @param {string} props.activeSection - The currently active section ID.
 * @param {function} props.setIsMobileMenuOpen - Function to open/close mobile menu (for mobile sidebar).
 */
const Sidebar = ({ doctor, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen }) => {
    const { t } = useTranslation();

    // Defines navigation links for the sidebar, including icons.
    const sidebarLinks = [
        
        { id: 'dashboard-section', label: t('dashboard'), icon: <i className={`fas fa-chart-line mr-3 text-blue-500`}></i> },
        { id: 'profile-section', label: t('profile'), icon: <UserCircleIcon className="h-5 w-5 mr-3 text-gray-500" /> },
        { id: 'my-patients-section', label: t('myPatients'), icon: <i className="fas fa-user-injured mr-3 text-indigo-500"></i> },
        { id: 'live-pcg-monitoring-section', label: t('livePCG'), icon: <HeartIcon className="h-5 w-5 mr-3 text-red-500" /> },
        { id: 'pcg-upload-analysis-section', label: t('uploadHeartSound'), icon: <CloudArrowUpIcon className="h-5 w-5 mr-3 text-purple-500" /> },
        { id: 'patient-pcg-reports-section', label: t('patientPcgReports'), icon: <DocumentTextIcon className="h-5 w-5 mr-3 text-green-500" /> },
        { id: 'pending-reviews-section', label: t('pendingReviews'), icon: <ClipboardDocumentListIcon className="h-5 w-5 mr-3 text-amber-500" /> },
        { id: 'consultations-section', label: t('consultations'), icon: <i className="fas fa-headset mr-3 text-purple-500"></i> },
        { id: 'my-schedule-section', label: t('mySchedule'), icon: <CalendarDaysIcon className="h-5 w-5 mr-3 text-teal-500" /> },
        { id: 'settings-section', label: t('settings'), icon: <i className="fas fa-cog mr-3 text-gray-500"></i> },
    ];

    return (
        <div className={`w-64 ${themeColors.sidebarBgClass} p-6 flex flex-col items-center ${themeColors.shadowClass} rounded-r-xl transition-colors duration-300 ${themeColors.sidebarBorderClass} sticky top-0 h-screen overflow-y-auto hidden lg:flex`}>
            {/* Doctor Profile Section */}
           

<div className="mb-6 text-center">
  <img 
  src={doctor?.profilePic?.trim() ? doctor.profilePic : "/default-avatar.png"} 
  alt={doctor?.name || "Doctor Avatar"} 
  className={`w-28 h-28 rounded-full border-4 border-blue-500 object-cover mx-auto mb-4 ${themeColors.shadowClass}`} 
/>

<h3 className={`text-xl font-bold ${themeColors.textColorClass}`}>
  {doctor?.fullName?.trim() || "Doctor Name"}
</h3>

<p className="text-sm text-gray-600 dark:text-gray-400">
  {doctor?.specialization?.trim() || "Specialization not set"}
</p>

<p className="text-sm text-gray-600 dark:text-gray-400">
  {doctor?.email?.trim() || "doctor@example.com"}
</p>

</div>



            {/* Navigation Links */}
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
                                        ? themeColors.activeNavLink // Apply active link styling from themeColors
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
