// PatientPcgReports.jsx
import React, { useState, useMemo } from 'react';
import { MagnifyingGlassIcon, PlusIcon, ArrowUturnLeftIcon, DocumentTextIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import StatusBadge from './StatusBadge'; // StatusBadge component ko import kiya gaya
import Card from './Card'; // Card component ko import kiya gaya

/**
 * PatientPcgReports Component: Displays patient PCG reports with search and filter functionality.
 * Allows doctors to view and download specific reports. Can be filtered by patient ID.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.reports - List of PCG reports.
 * @param {string|null} props.viewedPatientId - ID of the patient whose reports are being viewed.
 * @param {function} props.onBackToAllPatients - Callback to go back to all patients view.
 * @param {function} props.onViewReportDetails - Callback to view report details.
 * @param {function} props.onDownloadReport - Callback to download report.
 */
const PatientPcgReports = ({ t, themeColors, reports, viewedPatientId, onBackToAllPatients, onViewReportDetails, onDownloadReport }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All'); // e.g., 'PCG Analysis', 'Heart Sound Report'

    // Memoizes available report types for the filter dropdown
    const reportTypes = useMemo(() => {
        const types = [...new Set(reports.map(r => r.type))];
        return ['All', ...types];
    }, [reports]);

    // Filters reports based on search term and selected report type
    const filteredReports = useMemo(() => {
        return reports.filter(report => {
            const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  t(report.type.replace(/\s/g, '').toLowerCase()).toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  t(report.classification?.toLowerCase().replace(/\s/g, '') || '').toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'All' || report.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [reports, searchTerm, filterType, t]);

    return (
        <Card title={`${t('patientPcgReports')} ${viewedPatientId ? `(Patient ID: ${viewedPatientId})` : ''}`} themeColors={themeColors} className="col-span-full">
            {/* Back button visible when viewing reports for a specific patient */}
            {viewedPatientId && (
                <button
                    onClick={onBackToAllPatients}
                    className={`${themeColors.buttonSecondaryClass} px-4 py-2 rounded-md mb-4 flex items-center transition-transform transform hover:scale-105`}
                >
                    <ArrowUturnLeftIcon className="h-5 w-5 mr-2" /> {t('Back to Dashboard')}
                </button>
            )}

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Search Input */}
                <div className="relative flex-grow">
                    <MagnifyingGlassIcon className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${themeColors.iconColorClass}`} />
                    <input
                        type="text"
                        placeholder={t('searchReportsPlaceholder')}
                        className={`pl-10 p-2 rounded-md w-full ${themeColors.cardBgClass} ${themeColors.textColorClass} border ${themeColors.cardBorderClass} focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Type Filter Dropdown */}
                <select
                    className={`p-2 rounded-md ${themeColors.cardBgClass} ${themeColors.textColorClass} border ${themeColors.cardBorderClass} focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    {reportTypes.map(type => (
                        <option key={type} value={type}>{t(type.replace(/\s/g, '').toLowerCase()) || type}</option>
                    ))}
                </select>

                {/* Upload New Report Button (placeholder functionality) */}
                <button
                    className={`${themeColors.buttonPrimaryClass} px-4 py-2 rounded-md flex items-center`}
                >
                    <PlusIcon className="h-5 w-5 mr-2" /> {t('uploadNewReport')}
                </button>
            </div>

            {/* Reports Table */}
            {filteredReports.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('reportId')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('date')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('type')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('classificationresult')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('status')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredReports.map((report) => (
                                <tr key={report.id} className={`${themeColors.cardBgClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150`}>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeColors.textColorClass}`}>
                                        {report.id}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {report.date}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {t(report.type.replace(/\s/g, '').toLowerCase())}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {report.classification && <StatusBadge status={report.classification} type="pcgClassification" />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusBadge status={report.status} type="report" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => onViewReportDetails(report)}
                                            className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                        >
                                            <DocumentTextIcon className="h-4 w-4 mr-1" /> {t('view')}
                                        </button>
                                        <button
                                            onClick={() => onDownloadReport(report)}
                                            className={`${themeColors.buttonPrimaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                        >
                                            <DocumentArrowDownIcon className="h-4 w-4 mr-1" /> {t('download')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className={`${themeColors.textColorClass} opacity-80 text-center py-8`}>
                    {viewedPatientId ? t('noReportsFoundForPatient') : t('noReportsFound')}
                </p>
            )}
        </Card>
    );
};

export default PatientPcgReports;
