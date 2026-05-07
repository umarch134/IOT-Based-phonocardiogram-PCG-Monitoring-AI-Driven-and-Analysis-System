// components/Footer.js
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Footer Component: Displays copyright, quick links, and social media icons.
 * فوٹر کمپونینٹ: کاپی رائٹ، فوری لنکس، اور سوشل میڈیا آئیکنز دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const Footer = ({ t, themeColors }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={`${themeColors.cardBgClass} ${themeColors.cardBorderClass} py-8 text-center text-sm text-gray-600 dark:text-gray-400 mt-8`}>
            <div className="container mx-auto px-4">
                <p>&copy; {currentYear} {t('patientDashboard')}. {t('allRightsReserved')}.</p>
                <div className="mt-4 flex flex-wrap justify-center space-x-6">
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('privacyPolicy')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('termsOfService')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('contactUs')}</a>
                </div>
                <div className="mt-6 flex justify-center space-x-5">
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-facebook-f text-xl"></i></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-twitter text-xl"></i></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-instagram text-xl"></i></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-linkedin-in text-xl"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
