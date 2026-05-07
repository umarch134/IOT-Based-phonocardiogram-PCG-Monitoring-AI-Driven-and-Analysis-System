// PendingReviews.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTextIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Card from './Card'; // Card component ko import kiya gaya
import StatusBadge from './StatusBadge'; // StatusBadge component ko import kiya gaya

/**
 * PendingReviews Component: Displays reports or requests that require the doctor's review.
 * Allows the doctor to approve, decline, or view details of each review item.
 * @param {object} props - Component props.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.pendingReviews - List of items pending review.
 * @param {function} props.onApproveReview - Callback to approve a review.
 * @param {function} props.onDeclineReview - Callback to decline a review.
 * @param {function} props.onViewDetails - Callback to view details of a review.
 */
const PendingReviews = ({ themeColors, pendingReviews, onApproveReview, onDeclineReview, onViewDetails }) => {
    const { t } = useTranslation();

    return (
        <Card title={t('pendingReviews')} themeColors={themeColors} className="col-span-full">
            {pendingReviews.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('reportId')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('patientName')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('reviewType')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('date')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {pendingReviews.map((review) => (
                                <tr key={review.id} className={`${themeColors.cardBgClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150`}>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeColors.textColorClass}`}>
                                        {review.id}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {review.patientName}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        <StatusBadge status={review.type} type="report" /> {/* Using report type for status badge */}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {review.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => onViewDetails(review)}
                                            className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                        >
                                            <DocumentTextIcon className="h-4 w-4 mr-1" /> {t('viewDetails')}
                                        </button>
                                        <button
                                            onClick={() => onApproveReview(review.id)}
                                            className={`${themeColors.buttonPrimaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                        >
                                            <CheckCircleIcon className="h-4 w-4 mr-1" /> {t('approve')}
                                        </button>
                                        <button
                                            onClick={() => onDeclineReview(review.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition inline-flex items-center"
                                        >
                                            <XMarkIcon className="h-4 w-4 mr-1" /> {t('decline')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className={`${themeColors.textColorClass} opacity-80 text-center py-8`}>{t('noPendingReviews')}</p>
            )}
        </Card>
    );
};

export default PendingReviews;
