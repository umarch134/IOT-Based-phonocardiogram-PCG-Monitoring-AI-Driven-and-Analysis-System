// StatusBadge.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * StatusBadge Component: Displays a colored badge based on status and type.
 * @param {object} props - Component props.
 * @param {string} props.status - The status text to display.
 * @param {string} props.type - The category of the status (e.g., 'health', 'report', 'alert').
 * @param {string} [props.className=''] - Additional CSS classes.
 */
const StatusBadge = ({ status, type, className = '' }) => {
    const baseClasses = 'px-3 py-1 rounded-full font-semibold text-xs inline-flex items-center justify-center';
    let specificClasses = '';
    const { t } = useTranslation();

    // Defines styling for different status types
    const STATUS_STYLES = {
        health: {
            'Stable': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Needs Attention': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Critical': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        livePcg: {
            'Normal': 'text-emerald-600 dark:text-emerald-400',
            'Irregular': 'text-rose-600 dark:text-rose-400 animate-pulse',
        },
        alert: {
            'info': 'bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200',
            'warning': 'bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-900 dark:border-amber-700 dark:text-amber-200',
            'danger': 'bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-900 dark:border-rose-700 dark:text-rose-200',
            'default': 'bg-gray-50 border border-gray-200 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200',
        },
        risk: {
            'Low': 'bg-emerald-500 text-white',
            'Medium': 'bg-amber-500 text-white',
            'High': 'bg-rose-500 text-white',
            'default': 'bg-gray-500 text-white',
        },
        report: {
            'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Requires Review': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'Reviewed': 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
            'Declined': 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        appointment: {
            'Scheduled': 'bg-sky-100 text-sky-800 dark:bg-sky-700 dark:text-sky-100',
            'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Cancelled': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'Rescheduled': 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100',
            'Missed': 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        consultation: {
            'New Request': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Responded': 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
            'Closed': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        medication: {
            'Taken': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Skipped': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        sleep: {
            'Good': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Fair': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Poor': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        pcgClassification: {
            'Normal': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Murmur': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Abnormal': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'Extrasystole': 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100',
            'Valve Disorder': 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100',
            'Extra Sounds': 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        }
    };

    specificClasses = STATUS_STYLES[type]?.[status] || STATUS_STYLES[type]?.default || STATUS_STYLES.default.default;

    return (
        <span className={`${baseClasses} ${specificClasses} ${className}`}>
            {t(status.toLowerCase().replace(/\s/g, ''))} {/* Ensure translation key matches lowercase, no-space version */}
        </span>
    );
};

export default StatusBadge;
