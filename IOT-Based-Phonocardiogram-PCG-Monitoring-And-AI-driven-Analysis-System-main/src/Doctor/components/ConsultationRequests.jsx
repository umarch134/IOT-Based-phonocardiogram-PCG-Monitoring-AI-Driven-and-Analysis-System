// ConsultationRequests.jsx
import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import Card from './Card'; // Card component ko import kiya gaya
import StatusBadge from './StatusBadge'; // StatusBadge component ko import kiya gaya

/**
 * ConsultationRequests Component: Manages and displays patient consultation requests.
 * Doctors can view, accept, decline, and initiate new consultation requests.
 * @param {object} props - Component props.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.consultationRequests - List of consultation requests.
 * @param {function} props.onAcceptRequest - Callback to accept a request.
 * @param {function} props.onDeclineRequest - Callback to decline a request.
 * @param {function} props.onViewRequest - Callback to view request details.
 * @param {function} props.onSubmitNewRequest - Callback to submit a new request.
 */
const ConsultationRequests = ({ themeColors, consultationRequests, onAcceptRequest, onDeclineRequest, onViewRequest, onSubmitNewRequest }) => {
    const { t } = useTranslation();
    const [isNewRequestModalOpen, setIsNewRequestModal] = useState(false);
    const [newRequestData, setNewRequestData] = useState({ patientId: '', reason: '' });

    // Handles submission of a new consultation request
    const handleNewRequestSubmit = (e) => {
        e.preventDefault();
        onSubmitNewRequest(newRequestData);
        setNewRequestData({ patientId: '', reason: '' });
        setIsNewRequestModal(false);
    };

    return (
        <Card
            title={t('consultationRequests')}
            themeColors={themeColors}
            headerContent={
                // Button to open the new consultation request modal
                <button
                    onClick={() => setIsNewRequestModal(true)}
                    className={`${themeColors.buttonPrimaryClass} px-4 py-2 rounded-md flex items-center`}
                >
                    <PlusIcon className="h-5 w-5 mr-2" /> {t('newConsultationRequest')}
                </button>
            }
        >
            {consultationRequests.length > 0 ? (
                // List of existing consultation requests
                <ul className="mt-4 space-y-3">
                    {consultationRequests.map((req) => (
                        <li key={req.id} className={`p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center ${themeColors.appointmentBgClass} ${themeColors.appointmentBorderClass}`}>
                            <div>
                                <p className="font-semibold text-lg">{t('consultationWith', { patientName: req.patientName })}</p>
                                <p className="text-sm opacity-90">
                                    {t('reason')}: {req.reason}
                                </p>
                                <p className="text-xs opacity-70 mt-1">{t('date')}: {req.date}</p>
                            </div>
                            <div className="mt-3 sm:mt-0 flex space-x-2">
                                <StatusBadge status={req.status} type="consultation" />
                                <button
                                    onClick={() => onViewRequest(req.id)}
                                    className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm`}
                                >
                                    {t('viewRequest')}
                                </button>
                                {/* Action buttons for 'New Request' status */}
                                {req.status === 'New Request' && (
                                    <>
                                        <button
                                            onClick={() => onAcceptRequest(req.id)}
                                            className={`${themeColors.buttonPrimaryClass} px-3 py-1 rounded-md text-sm`}
                                        >
                                            {t('accept')}
                                        </button>
                                        <button
                                            onClick={() => onDeclineRequest(req.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                                        >
                                            {t('decline')}
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={`${themeColors.textColorClass} opacity-80`}>{t('noConsultationRequests')}</p>
            )}

            {/* New Consultation Request Modal */}
            <Transition appear show={isNewRequestModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsNewRequestModal(false)}>
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
                                <Dialog.Panel className={`${themeColors.cardBgClass} ${themeColors.textColorClass} w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}>
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                                        {t('newConsultationRequest')}
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <form onSubmit={handleNewRequestSubmit} className="space-y-4">
                                            {/* Patient ID Input */}
                                            <div>
                                                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('patientID')}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="patientId"
                                                    name="patientId"
                                                    value={newRequestData.patientId}
                                                    onChange={(e) => setNewRequestData({ ...newRequestData, patientId: e.target.value })}
                                                    placeholder={t('patientIdPlaceholder')}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    required
                                                />
                                            </div>

                                            {/* Reason for Consultation Textarea */}
                                            <div>
                                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('consultationReason')}
                                                </label>
                                                <textarea
                                                    id="reason"
                                                    name="reason"
                                                    rows="3"
                                                    value={newRequestData.reason}
                                                    onChange={(e) => setNewRequestData({ ...newRequestData, reason: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    required
                                                ></textarea>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-4 flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    className={`${themeColors.buttonSecondaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                                    onClick={() => setIsNewRequestModal(false)}
                                                >
                                                    {t('close')}
                                                </button>
                                                <button
                                                    type="submit"
                                                    className={`${themeColors.buttonPrimaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                                >
                                                    {t('submitRequest')}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </Card>
    );
};

export default ConsultationRequests;
