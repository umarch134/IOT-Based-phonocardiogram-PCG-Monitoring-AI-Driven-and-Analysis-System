// components/ScheduleAppointmentModal.js
import React, { Fragment, useState, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios for API calls

/**
 * ScheduleAppointmentModal Component: Handles scheduling new appointments.
 * شیڈول اپوائنٹمنٹ موڈل کمپونینٹ: نئی ملاقاتوں کو شیڈول کرنے کا انتظام کرتا ہے۔
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to close the modal.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.doctorsList - List of available doctors.
 * @param {function} props.onAppointmentScheduled - Callback after successful appointment scheduling.
 */
const ScheduleAppointmentModal = ({ isOpen, onClose, themeColors, doctorsList, onAppointmentScheduled }) => {
    const { t } = useTranslation();
    const [newAppointment, setNewAppointment] = useState({
        doctor: '',
        date: '',
        time: '',
        reason: '',
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setNewAppointment(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const { doctor, date, time, reason } = newAppointment;

        if (!doctor || !date || !time || !reason) {
            toast.error(t('fillAllFields'));
            return;
        }

        const token = localStorage.getItem("token");

        if (!token || token === "null") {
            toast.error("🔒 Session expired. Please login again.");
            // In a real app, you'd navigate to login page here.
            // navigate('/login');
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/appointments",
                newAppointment,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                toast.success(t('appointmentScheduledSuccess'));
                onAppointmentScheduled(response.data.appointment); // Pass new appointment data back
                setNewAppointment({ doctor: '', date: '', time: '', reason: '' }); // Reset form
                onClose(); // Close modal
            } else {
                toast.error(response.data.message || t('failedToScheduleAppointment'));
            }
        } catch (error) {
            console.error("Error scheduling appointment:", error);
            const errorMessage = error.response?.data?.message || t('errorSchedulingAppointment');
            toast.error(errorMessage);
        }
    }, [newAppointment, t, onClose, onAppointmentScheduled]);

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
                            <Dialog.Panel className={`${themeColors.cardBgClass} w-full max-w-2xl transform overflow-hidden rounded-3xl p-8 text-left align-middle shadow-2xl transition-all border border-gray-300 dark:border-gray-700`}>
                                <Dialog.Title
                                    as="h3"
                                    className={`text-3xl font-extrabold tracking-tight ${themeColors.textColorClass} border-b pb-5 border-gray-300 dark:border-gray-700`}
                                >
                                    {t('scheduleNewAppointment')}
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                    {/* Doctor Selection */}
                                    {/* ڈاکٹر کا انتخاب */}
                                    <div>
                                        <label htmlFor="doctor" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                            {t('selectDoctor')}
                                        </label>
                                        <select
                                            id="doctor"
                                            name="doctor"
                                            value={newAppointment.doctor}
                                            onChange={handleInputChange}
                                            className={`mt-2 block w-full rounded-xl border border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-4 py-3`}
                                            required
                                        >
                                            <option value="">{t('selectDoctor')}</option>
                                            {doctorsList.map(doctor => (
                                                <option key={doctor.id} value={doctor.id}> {/* Use doctor.id as value */}
                                                    {t(doctor.nameKey)} ({t(doctor.specialtyKey)})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Date Input */}
                                    {/* تاریخ کا ان پٹ */}
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                            {t('selectDate')}
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={newAppointment.date}
                                            onChange={handleInputChange}
                                            className={`mt-2 block w-full rounded-xl border border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-4 py-3`}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>

                                    {/* Time Input */}
                                    {/* وقت کا ان پٹ */}
                                    <div>
                                        <label htmlFor="time" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                            {t('selectTime')}
                                        </label>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            value={newAppointment.time}
                                            onChange={handleInputChange}
                                            className={`mt-2 block w-full rounded-xl border border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-4 py-3`}
                                            required
                                        />
                                    </div>

                                    {/* Reason */}
                                    {/* وجہ */}
                                    <div>
                                        <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                            {t('reason')}
                                        </label>
                                        <textarea
                                            id="reason"
                                            name="reason"
                                            rows="3"
                                            value={newAppointment.reason}
                                            onChange={handleInputChange}
                                            className={`mt-2 block w-full rounded-xl border border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-4 py-3`}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mt-8 flex justify-end gap-4">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-gray-300 dark:border-gray-600 ${themeColors.buttonSecondaryClass} hover:opacity-90 transition`}
                                            onClick={onClose}
                                        >
                                            {t('close')}
                                        </button>
                                        <button
                                            type="submit"
                                            className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white ${themeColors.buttonPrimaryClass} hover:opacity-90 transition`}
                                        >
                                            {t('schedule')}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ScheduleAppointmentModal;
