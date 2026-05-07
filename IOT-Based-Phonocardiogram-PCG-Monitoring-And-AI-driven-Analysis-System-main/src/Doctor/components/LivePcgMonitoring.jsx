// LivePcgMonitoring.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { HeartIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import StatusBadge from './StatusBadge'; // StatusBadge component ko import kiya gaya
import Card from './Card'; // Card component ko import kiya gaya
import PCGWaveform from './PCGWaveform'; // PCGWaveform component ko import kiya gaya

/**
 * LivePcgMonitoring Component: Simulates and displays real-time PCG (Phonocardiogram) data.
 * Includes current status and trend charts for heart rate and murmur presence.
 * Now includes S3 and S4 presence.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {object} props.livePcgData - Current live PCG data.
 * @param {Array<object>} props.pcgHistory - Historical PCG data for trends.
 * @param {string} props.chartGridColor - Color for chart grid lines.
 * @param {string} props.chartTextColor - Color for chart text.
 */
const LivePcgMonitoring = ({ themeColors, livePcgData, pcgHistory, chartGridColor, chartTextColor }) => {
    const { t } = useTranslation();

    // Determines overall PCG status based on classification
    const pcgStatus = livePcgData.classification === 'Normal' ? 'Normal' : 'Irregular';

    // Helper function to get text color based on PCG classification
    const getClassificationColor = (classification) => {
        switch (classification) {
            case 'Normal': return 'text-emerald-500';
            case 'Murmur': return 'text-amber-500';
            case 'Abnormal': return 'text-rose-500';
            case 'Extrasystole': return 'text-purple-500';
            case 'Valve Disorder': return 'text-orange-500';
            case 'Extra Sounds': return 'text-red-500';
            default: return themeColors.textColorClass;
        }
    };

    // Prepares data for Heart Rate Trend Line Chart
    const heartRateTrendData = {
        labels: pcgHistory.map((_, index) => `Point ${index + 1}`), // Simple labels for simulation
        datasets: [
            {
                label: t('heartRate'),
                data: pcgHistory.map(d => d.heartRate),
                borderColor: `rgba(${themeColors.primaryRgb}, 1)`,
                backgroundColor: `rgba(${themeColors.primaryRgb}, 0.1)`,
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: `rgba(${themeColors.primaryRgb}, 1)`,
            },
        ],
    };

    // Options for the Heart Rate Trend Chart
    const heartRateTrendOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: chartTextColor,
                },
            },
            title: {
                display: true,
                text: t('pcg_trend_heart_rate'),
                color: chartTextColor,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: chartTextColor,
                },
                grid: {
                    color: chartGridColor,
                },
            },
            y: {
                ticks: {
                    color: chartTextColor,
                },
                grid: {
                    color: chartGridColor,
                },
                title: {
                    display: true,
                    text: t('heartRate'),
                    color: chartTextColor,
                },
            },
        },
    };

    // Prepares data for Murmur Score Trend Line Chart
    const murmurScoreTrendData = {
        labels: pcgHistory.map((_, index) => `Point ${index + 1}`), // Simple labels for simulation
        datasets: [
            {
                label: t('murmurPresence'),
                data: pcgHistory.map(d => d.murmurPresence * 100), // Convert to percentage for display
                borderColor: `rgba(${themeColors.secondaryRgb}, 1)`,
                backgroundColor: `rgba(${themeColors.secondaryRgb}, 0.1)`,
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: `rgba(${themeColors.secondaryRgb}, 1)`,
            },
        ],
    };

    // Options for the Murmur Score Trend Chart
    const murmurScoreTrendOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: chartTextColor,
                },
            },
            title: {
                display: true,
                text: t('pcg_trend_murmur_score'),
                color: chartTextColor,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: chartTextColor,
                },
                grid: {
                    color: chartGridColor,
                },
            },
            y: {
                ticks: {
                    color: chartTextColor,
                },
                grid: {
                    color: chartGridColor,
                },
                title: {
                    display: true,
                    text: t('murmurPresence') + ' (%)',
                    color: chartTextColor,
                },
                min: 0,
                max: 100,
            },
        },
    };

    return (
        <Card title={t('livePCG')} themeColors={themeColors} className="col-span-full lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Live Data Display */}
                <div className={`p-6 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass} flex flex-col items-center justify-center text-center`}>
                    <HeartIcon className={`h-20 w-20 mb-4 ${getClassificationColor(livePcgData.classification)} animate-pulse`} />
                    <h3 className="text-2xl font-bold mb-2">
                        {t('pcgValue', { value: livePcgData.heartRate })}
                    </h3>
                    <p className={`text-lg font-semibold ${getClassificationColor(livePcgData.classification)}`}>
                        {t('currentPcgClassification')} <StatusBadge status={livePcgData.classification} type="pcgClassification" />
                    </p>
                    <p className={`text-md mt-2 ${themeColors.textColorClass}`}>
                        {t('overallStatus')} <StatusBadge status={pcgStatus} type="livePcg" className="ml-2" />
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {t('lastChecked', { time: livePcgData.timestamp.toLocaleTimeString() })}
                    </p>
                    <div className="mt-4 w-full">
                        <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgWaveform')}</h4>
                        <PCGWaveform
                            strokeColor={themeColors.waveformStroke}
                            fillColor={themeColors.waveformFill}
                            s3Presence={livePcgData.s3Presence} // Pass S3 presence
                            s4Presence={livePcgData.s4Presence} // Pass S4 presence
                        />
                        <div className="flex justify-around text-sm mt-2">
                            <p className={`${themeColors.textColorClass}`}>
                                S3: {livePcgData.s3Presence ? <span className="text-emerald-500 font-semibold">{t('present')}</span> : <span className="text-gray-500">{t('absent')}</span>}
                            </p>
                            <p className={`${themeColors.textColorClass}`}>
                                S4: {livePcgData.s4Presence ? <span className="text-emerald-500 font-semibold">{t('present')}</span> : <span className="text-gray-500">{t('absent')}</span>}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Classifications & Trends Section */}
                <div className="space-y-6">
                    {/* Recent PCG Classifications Summary */}
                    <div className={`${themeColors.reportBgClass} ${themeColors.reportBorderClass} p-6 rounded-lg`}>
                        <h4 className={`text-lg font-semibold ${themeColors.textColorClass} mb-3`}>{t('recentPcgClassifications')}</h4>
                        <div className="grid grid-cols-3 gap-3 text-center text-sm">
                            {/* Last 5 Minutes Classification */}
                            <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-700">
                                <p className="font-medium text-gray-700 dark:text-gray-300">{t('last5Minutes')}</p>
                                <p className={`text-xl font-bold ${getClassificationColor(pcgHistory[pcgHistory.length - 1]?.classification || 'Normal')}`}>
                                    {t(pcgHistory[pcgHistory.length - 1]?.classification.toLowerCase().replace(/\s/g, '') || 'normal')}
                                </p>
                            </div>
                            {/* Last 30 Minutes Classification */}
                            <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-700">
                                <p className="font-medium text-gray-700 dark:text-gray-300">{t('last30Minutes')}</p>
                                <p className={`text-xl font-bold ${getClassificationColor(pcgHistory[Math.max(0, pcgHistory.length - 10)]?.classification || 'Normal')}`}>
                                    {t(pcgHistory[Math.max(0, pcgHistory.length - 10)]?.classification.toLowerCase().replace(/\s/g, '') || 'normal')}
                                </p>
                            </div>
                            {/* Last Hour Classification */}
                            <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-700">
                                <p className="font-medium text-gray-700 dark:text-gray-300">{t('lastHour')}</p>
                                <p className={`text-xl font-bold ${getClassificationColor(pcgHistory[Math.max(0, pcgHistory.length - 20)]?.classification || 'Normal')}`}>
                                    {t(pcgHistory[Math.max(0, pcgHistory.length - 20)]?.classification.toLowerCase().replace(/\s/g, '') || 'normal')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Average Heart Rate Trend Chart */}
                    <div className={`${themeColors.reportBgClass} ${themeColors.reportBorderClass} p-6 rounded-lg h-64`}>
                        <h4 className={`text-lg font-semibold ${themeColors.textColorClass} mb-3`}>{t('averageHeartRate')}</h4>
                        {pcgHistory.length > 0 ? (
                            <Line data={heartRateTrendData} options={heartRateTrendOptions} />
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('noChartData', { patientName: '' })}</p>
                        )}
                    </div>

                    {/* Average Murmur Score Trend Chart */}
                    <div className={`${themeColors.reportBgClass} ${themeColors.reportBorderClass} p-6 rounded-lg h-64`}>
                        <h4 className={`text-lg font-semibold ${themeColors.textColorClass} mb-3`}>{t('averageMurmurScore')}</h4>
                        {pcgHistory.length > 0 ? (
                            <Line data={murmurScoreTrendData} options={murmurScoreTrendOptions} />
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('noChartData', { patientName: '' })}</p>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LivePcgMonitoring;
