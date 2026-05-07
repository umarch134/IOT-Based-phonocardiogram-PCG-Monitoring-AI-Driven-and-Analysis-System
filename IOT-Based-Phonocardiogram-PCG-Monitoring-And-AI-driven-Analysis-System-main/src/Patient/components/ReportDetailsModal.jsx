// components/ReportDetailsModal.js
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import StatusBadge from './StatusBadge'; // Assuming StatusBadge component is in the same 'components' directory
import PCGWaveform from './PCGWaveform'; // Assuming PCGWaveform component is in the same 'components' directory

/**
 * ReportDetailsModal Component: Displays detailed information of a selected health report.
 * رپورٹ ڈیٹیلز موڈل کمپونینٹ: منتخب کردہ صحت کی رپورٹ کی تفصیلی معلومات دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to close the modal.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {object} props.selectedReport - The report object whose details are to be displayed.
 */
const ReportDetailsModal = ({ isOpen, onClose, themeColors, selectedReport }) => {
    const { t } = useTranslation();

    // Generate a dummy waveform for display if PCG metrics are available
    // اگر پی سی جی میٹرکس دستیاب ہوں تو ڈسپلے کے لیے ایک ڈمی ویوفارم تیار کریں۔
    const generateDummyWaveform = (metrics) => {
        if (!metrics) return [];
        // A simple sine wave with amplitude and frequency influenced by S1/S2
        // S1/S2 سے متاثرہ طول و عرض اور فریکوئنسی کے ساتھ ایک سادہ سائن ویو
        return Array.from({ length: 100 }, (_, i) =>
            Math.sin(i / 10) * (metrics.s1Amplitude / 2) + (metrics.s2Frequency / 2) + (Math.random() - 0.5) * 5
        );
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`${themeColors.cardBgClass} w-full max-w-2xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}>
                                <Dialog.Title
                                    as="h3"
                                    className={`text-lg font-medium leading-6 ${themeColors.textColorClass} flex justify-between items-center`}
                                >
                                    {t('reportDetails')} - {selectedReport?.id} ({t(selectedReport?.type.replace(/\s/g, '').toLowerCase())})
                                    <button onClick={onClose} className={`${themeColors.buttonSecondaryClass} p-1 rounded-full`}>
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </Dialog.Title>
                                <div className="mt-4 space-y-4">
                                    <p className="text-sm font-semibold flex justify-between">
                                        <span>{t('date')}: {selectedReport?.date}</span>
                                        <span>{t('status')}: <StatusBadge status={selectedReport?.status} type="report" /></span>
                                    </p>

                                    {selectedReport?.pcgMetrics && (
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                            <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgMetrics')}</h4>
                                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <p><span className="font-medium">{t('s1Amplitude')}:</span> {selectedReport.pcgMetrics.s1Amplitude}</p>
                                                <p><span className="font-medium">{t('s2Frequency')}:</span> {selectedReport.pcgMetrics.s2Frequency} Hz</p>
                                                <p><span className="font-medium">{t('murmurPresence')}:</span> {(selectedReport.pcgMetrics.murmurPresence * 100).toFixed(1)}%</p>
                                                <p><span className="font-medium">{t('pcgScore')}:</span> {selectedReport.pcgMetrics.pcgScore}</p>
                                                <p className="col-span-2"><span className="font-medium">{t('murmur_type')}:</span> {selectedReport.pcgMetrics.murmurType}</p>
                                                <p className="col-span-2"><span className="font-medium">{t('detectedSounds')}:</span> {selectedReport.pcgMetrics.detectedSounds?.join(', ') || 'N/A'}</p>
                                                <p className="col-span-2"><span className="font-medium">{t('aiDiagnosis')}:</span> <StatusBadge status={selectedReport.pcgMetrics.aiDiagnosis} type="health" /></p>
                                            </div>
                                            <h4 className={`text-md font-semibold ${themeColors.textColorClass} mt-4 mb-2`}>{t('pcg_waveform')}</h4>
                                            <PCGWaveform
                                                width={400}
                                                height={150}
                                                strokeColor={themeColors.waveformStroke}
                                                fillColor={themeColors.waveformFill}
                                                data={generateDummyWaveform(selectedReport.pcgMetrics)}
                                            />
                                            <h4 className={`text-md font-semibold ${themeColors.textColorClass} mt-4 mb-2`}>{t('doctor_notes')}</h4>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-3">
                                                {selectedReport.doctorNotes || "No specific notes for this report."}
                                            </p>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>Full Report Content</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {selectedReport?.content || t('fullReportContentPlaceholder')}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className={`${themeColors.buttonSecondaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                        onClick={onClose}
                                    >
                                        {t('close')}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ReportDetailsModal;
