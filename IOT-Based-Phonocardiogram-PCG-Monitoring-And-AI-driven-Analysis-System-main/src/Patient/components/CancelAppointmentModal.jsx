// components/CancelAppointmentModal.js
import React, { Fragment, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

/**
 * CancelAppointmentModal Component: Handles confirmation for canceling an appointment.
 * کینسل اپوائنٹمنٹ موڈل کمپونینٹ: ملاقات منسوخ کرنے کی تصدیق کا انتظام کرتا ہے۔
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to close the modal.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {object} props.appointmentToCancel - The appointment object to be cancelled.
 * @param {function} props.onConfirmCancel - Callback after confirming cancellation.
 */
const CancelAppointmentModal = ({ isOpen, onClose, themeColors, appointmentToCancel, onConfirmCancel }) => {
    const { t } = useTranslation();

    const handleConfirm = useCallback(() => {
        onConfirmCancel();
    }, [onConfirmCancel]);

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
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6 sm:p-10 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-90"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-90"
                        >
                            <Dialog.Panel className={`${themeColors.cardBgClass} w-full max-w-lg transform overflow-hidden rounded-3xl p-8 text-left align-middle shadow-2xl transition-all border border-gray-300 dark:border-gray-700`}>
                                <Dialog.Title
                                    as="h3"
                                    className={`text-2xl font-extrabold tracking-tight ${themeColors.textColorClass} border-b pb-4 border-gray-300 dark:border-gray-700`}
                                >
                                    {t('cancelAppointmentTitle')}
                                </Dialog.Title>
                                <div className="mt-4">
                                    {appointmentToCancel && (
                                        <p className="text-base text-gray-600 dark:text-gray-400">
                                            {t('cancelAppointmentConfirmation', {
                                                doctorName: t(appointmentToCancel.doctorKey),
                                                date: appointmentToCancel.date,
                                                time: appointmentToCancel.time
                                            })}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-gray-300 dark:border-gray-600 ${themeColors.buttonSecondaryClass} hover:opacity-90 transition`}
                                        onClick={onClose}
                                    >
                                        {t('close')}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                        onClick={handleConfirm}
                                    >
                                        {t('confirmCancel')}
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

export default CancelAppointmentModal;
