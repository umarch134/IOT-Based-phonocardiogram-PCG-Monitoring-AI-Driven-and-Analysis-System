// DoctorOverview.jsx
import React from 'react';
import Card from './Card'; // Card component ko import kiya gaya
import { UserGroupIcon, PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

/**
 * DoctorOverview Component: Displays key metrics for the doctor's practice.
 * This is the first section on the dashboard, providing a summary of the practice's status.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {object} props.metrics - Object containing metrics (totalPatients, newPatientsToday, patientsAwaitingReview).
 */
const DoctorOverview = ({ t, themeColors, metrics }) => (
    <Card title={t('doctorOverview')} themeColors={themeColors} className="col-span-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Total Patients Card */}
            <div className={`p-4 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass} flex flex-col items-center justify-center`}>
                <UserGroupIcon className={`h-12 w-12 text-blue-500 mb-2 ${themeColors.iconColorClass}`} />
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300">{metrics.totalPatients}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('totalPatients')}</p>
            </div>
            {/* New Patients Today Card */}
            <div className={`p-4 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass} flex flex-col items-center justify-center`}>
                <PlusIcon className={`h-12 w-12 text-emerald-500 mb-2 ${themeColors.iconColorClass}`} />
                <h3 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{metrics.newPatientsToday}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('newPatientsToday')}</p>
            </div>
            {/* Patients Awaiting Review Card */}
            <div className={`p-4 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass} flex flex-col items-center justify-center`}>
                <ClipboardDocumentListIcon className={`h-12 w-12 text-amber-500 mb-2 ${themeColors.iconColorClass}`} />
                <h3 className="text-3xl font-bold text-amber-700 dark:text-amber-300">{metrics.patientsAwaitingReview}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('patientsAwaitingReview')}</p>
            </div>
        </div>
    </Card>
);

export default DoctorOverview;
