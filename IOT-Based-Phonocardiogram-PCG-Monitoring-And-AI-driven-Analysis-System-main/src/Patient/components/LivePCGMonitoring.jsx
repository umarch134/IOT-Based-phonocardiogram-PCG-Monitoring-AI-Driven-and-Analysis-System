// components/LivePCGMonitoring.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import Card from './Card'; // Assuming Card component is in the same 'components' directory

/**
 * LivePCGMonitoring Component: Simulates live PCG monitoring with a status display.
 * لائیو پی سی جی مانیٹرنگ کمپونینٹ: اسٹیٹس ڈسپلے کے ساتھ لائیو پی سی جی مانیٹرنگ کی نقل کرتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {boolean} props.isMonitoring - Whether monitoring is active.
 * @param {function} props.toggleMonitoring - Function to toggle monitoring.
 * @param {string} props.pcgStatus - Current PCG status (Normal/Irregular).
 * @param {number} props.pcgValue - Current PCG value.
 * @param {string} props.lastReadingTime - Timestamp of the last PCG reading.
 */
const LivePCGMonitoring = ({ t, themeColors, isMonitoring, toggleMonitoring, pcgStatus, pcgValue, lastReadingTime }) => {
    return (
        <Card title={t('livePCG')} className="col-span-full md:col-span-1" themeColors={themeColors}>
            <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-32 h-32 mb-4">
                    <div className={`absolute inset-0 rounded-full flex items-center justify-center ${pcgStatus === 'Normal' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-rose-100 dark:bg-rose-900/30'} transition-all duration-500 ease-in-out`}>
                        <i className={`fas fa-heartbeat text-5xl ${pcgStatus === 'Normal' ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}`}></i>
                    </div>
                </div>

                <p className={`text-xl font-bold ${pcgStatus === 'Normal' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} mt-2`}>
                    {isMonitoring ? t('listening') : t('noSignal')}
                </p>
                {isMonitoring && (
                    <p className={`text-lg text-gray-700 dark:text-gray-300 mt-1`}>
                        {t('pcgValue', { value: pcgValue })}
                    </p>
                )}
            </div>
            <div className="mt-4 text-center">
                <button
                    onClick={toggleMonitoring}
                    className={`${isMonitoring ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-md transition-colors duration-300 flex items-center justify-center mx-auto`}
                >
                    {isMonitoring ? <PauseIcon className="w-5 h-5 mr-2" /> : <PlayIcon className="w-5 h-5 mr-2" />}
                    {isMonitoring ? t('stopMonitoring') : t('startMonitoring')}
                </button>
                {lastReadingTime && isMonitoring && (
                    <p className={`text-sm text-gray-500 dark:text-gray-400 italic mt-2`}>
                        {t('lastPCGReading')}: {lastReadingTime}
                    </p>
                )}
            </div>
        </Card>
    );
};

export default LivePCGMonitoring;
