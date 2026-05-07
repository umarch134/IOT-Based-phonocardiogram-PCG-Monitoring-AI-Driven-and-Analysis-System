// MyPatientsTable.jsx
import React, { useState, useMemo } from 'react';
import Card from './Card'; // Card component ko import kiya gaya
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next'; // useTranslation hook ko import kiya gaya

/**
 * MyPatientsTable Component: Displays a searchable table of patients under the doctor's care.
 * Allows viewing individual patient profiles.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.patients - List of patient data.
 * @param {function} props.onViewPatientProfile - Callback when "View Profile" is clicked.
 */
const MyPatientsTable = ({ themeColors, patients, onViewPatientProfile }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation(); // useTranslation hook ko initialize kiya gaya

    // Filters patients based on the search term for name or ID.
    const filteredPatients = useMemo(() => {
        return patients.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [patients, searchTerm]);

    return (
        <Card title={t('myPatients')} themeColors={themeColors} className="col-span-full">
            {/* Search Input for Patients */}
            <div className="mb-4">
                <div className="relative">
                    <MagnifyingGlassIcon className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${themeColors.iconColorClass}`} />
                    <input
                        type="text"
                        placeholder={t('searchPatientsPlaceholder')}
                        className={`pl-10 p-2 rounded-md w-full ${themeColors.cardBgClass} ${themeColors.textColorClass} border ${themeColors.cardBorderClass} focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Patients Table */}
            {filteredPatients.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('patientID')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('patientName')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('lastVisit')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('nextAppointment')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className={`${themeColors.cardBgClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150`}>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeColors.textColorClass}`}>
                                        {patient.id}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {patient.name}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {patient.lastVisit || 'N/A'}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {patient.nextAppointment || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => onViewPatientProfile(patient.id)}
                                            className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                        >
                                            <UserCircleIcon className="h-4 w-4 mr-1" /> {t('viewProfile')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className={`${themeColors.textColorClass} opacity-80 text-center py-8`}>{t('noPatientsFound')}</p>
            )}
        </Card>
    );
};

export default MyPatientsTable;
