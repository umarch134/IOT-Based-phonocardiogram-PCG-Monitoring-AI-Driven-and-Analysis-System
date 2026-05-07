// components/SettingsSection.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from './Card'; // Assuming Card component is in the same 'components' directory

/**
 * SettingsSection Component: Manages theme and language settings for the dashboard.
 * سیٹنگز سیکشن کمپونینٹ: ڈیش بورڈ کے لیے تھیم اور زبان کی سیٹنگز کا انتظام کرتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {string} props.currentTheme - Current active theme ('light' or 'dark').
 * @param {function} props.toggleTheme - Function to toggle the theme.
 * @param {string} props.language - Current language code.
 * @param {function} props.setLanguage - Function to set the language.
 */
const SettingsSection = ({ t, themeColors, currentTheme, toggleTheme, language, setLanguage }) => {
    // i18n instance from useTranslation hook for changing language
    const { i18n } = useTranslation();

    return (
        <Card title={t('settings')} themeColors={themeColors}>
            <p className={`${themeColors.textColorClass} opacity-80`}>Manage your dashboard settings.</p>
            <div className="mt-4 space-y-4">
                <div>
                    <label htmlFor="theme-select" className="block text-sm font-medium">Theme</label>
                    <select
                        id="theme-select"
                        value={currentTheme}
                        onChange={toggleTheme}
                        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${themeColors.cardBgClass} ${themeColors.textColorClass}`}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="language-select" className="block text-sm font-medium">Language</label>
                    <select
                        id="language-select"
                        value={language} // Use local 'language' state
                        onChange={(e) => {
                            setLanguage(e.target.value); // Update local language state
                            i18n.changeLanguage(e.target.value); // Change i18n language
                        }}
                        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${themeColors.cardBgClass} ${themeColors.textColorClass}`}
                    >
                        <option value="en">English</option>
                        <option value="ur">اردو</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                    </select>
                </div>
            </div>
        </Card>
    );
};

export default SettingsSection;
