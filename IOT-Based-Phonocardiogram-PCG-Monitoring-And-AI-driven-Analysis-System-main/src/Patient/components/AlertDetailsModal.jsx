// components/AlertDetailsModal.js
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import StatusBadge from './StatusBadge';


/**
 * AlertDetailsModal Component: Displays detailed information of a selected alert.
 * الرٹ ڈیٹیلز موڈل کمپونینٹ: منتخب کردہ الرٹ کی تفصیلی معلومات دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to close the modal.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {object} props.selectedAlert - The alert object whose details are to be displayed.
 * @param {function} props.onDismissAlert - Callback to dismiss the alert.
 */
const AlertDetailsModal = ({ isOpen, onClose, themeColors, selectedAlert, onDismissAlert }) => {
    const { t } = useTranslation();

    const handleDismiss = () => {
        if (selectedAlert) {
            onDismissAlert(selectedAlert.id);
            onClose();
        }
    };

    const getIconForAlertType = (type) => {
        switch (type) {
            case 'info':
                return <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />;
            case 'warning':
                return <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 dark:text-amber-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />;
            case 'danger':
                return <MegaphoneIcon className="h-6 w-6 text-rose-600 dark:text-rose-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />;
            default:
                return <ExclamationCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />;
        }
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
                            <Dialog.Panel className={`${themeColors.cardBgClass} w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}>
                                <Dialog.Title
                                    as="h3"
                                    className={`text-lg font-medium leading-6 ${themeColors.textColorClass} flex justify-between items-center`}
                                >
                                    {t('alertDetails')} - {selectedAlert?.title || t(selectedAlert?.message)}
                                    <button onClick={onClose} className={`${themeColors.buttonSecondaryClass} p-1 rounded-full`}>
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </Dialog.Title>
                                <div className="mt-4">
                                    <div className="flex items-center mb-3">
                                        {getIconForAlertType(selectedAlert?.type)}
                                        <StatusBadge status={selectedAlert?.type || 'info'} type="alert" className="mr-2" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedAlert?.timestamp} (Source: {selectedAlert?.source})</p>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                        {selectedAlert?.details}
                                    </p>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className={`${themeColors.buttonPrimaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                        onClick={handleDismiss}
                                    >
                                        {t('dismiss')}
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

export default AlertDetailsModal;
