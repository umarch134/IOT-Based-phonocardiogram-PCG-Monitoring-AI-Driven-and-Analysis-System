// DoctorSchedule.jsx
import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Card from './Card'; // Card component ko import kiya gaya
import StatusBadge from './StatusBadge'; // StatusBadge component ko import kiya gaya

/**
 * DoctorSchedule Component: Displays the doctor's daily and upcoming appointments,
 * as well as completed, cancelled, and missed appointments.
 * Allows adding new appointments and managing existing ones.
 * @param {object} props - Component props.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.appointments - List of doctor's appointments.
 * @param {function} props.onAddAppointment - Callback to add a new appointment.
 * @param {function} props.onRescheduleAppointment - Callback to reschedule an appointment.
 * @param {function} props.onCancelAppointment - Callback to cancel an appointment.
 * @param {function} props.onMarkAppointment - Callback to mark an appointment as completed/missed.
 */
const DoctorSchedule = ({ themeColors, appointments, onAddAppointment, onRescheduleAppointment, onCancelAppointment, onMarkAppointment }) => {
    const { t } = useTranslation();
    const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
    const [newAppointmentData, setNewAppointmentData] = useState({ patientName: '', date: '', time: '', type: 'online', reason: '', meetingLink: '' });

    // Handles submission of a new appointment
    const handleAddAppointmentSubmit = (e) => {
        e.preventDefault();
        onAddAppointment(newAppointmentData);
        setNewAppointmentData({ patientName: '', date: '', time: '', type: 'online', reason: '', meetingLink: '' });
        setIsAddAppointmentModalOpen(false);
    };

    // Filters appointments by status and date
    const today = new Date().toISOString().split('T')[0];
    const todaysAppointments = appointments.filter(app => app.date === today);
    const upcomingAppointments = appointments.filter(app => app.date > today && app.status === 'Scheduled');
    const completedAppointments = appointments.filter(app => app.status === 'Completed');
    const cancelledAppointments = appointments.filter(app => app.status === 'Cancelled');
    const missedAppointments = appointments.filter(app => app.status === 'Missed');

    return (
        <Card
            title={t('mySchedule')}
            themeColors={themeColors}
            headerContent={
                // Button to open the add new appointment modal
                <button
                    onClick={() => setIsAddAppointmentModalOpen(true)}
                    className={`${themeColors.buttonPrimaryClass} px-4 py-2 rounded-md flex items-center`}
                >
                    <PlusIcon className="h-5 w-5 mr-2" /> {t('addAppointment')}
                </button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Appointments Section */}
                <div>
                    <h3 className={`text-xl font-semibold mb-3 ${themeColors.textColorClass}`}>{t('today')}</h3>
                    {todaysAppointments.length > 0 ? (
                        <ul className="space-y-3">
                            {todaysAppointments.map((app) => (
                                <li key={app.id} className={`p-4 rounded-md ${themeColors.appointmentBgClass} ${themeColors.appointmentBorderClass} flex flex-col sm:flex-row justify-between items-start sm:items-center`}>
                                    <div>
                                        <p className="font-semibold text-lg">{t('consultationWith', { patientName: app.patientName })}</p>
                                        <p className="text-sm opacity-90">{t('appointmentTime')}: {app.time}</p>
                                        <p className="text-sm opacity-80">{t(app.type)}</p>
                                        <p className="text-xs opacity-70">{t('reason')}: {app.reason}</p>
                                    </div>
                                    <div className="mt-3 sm:mt-0 flex flex-wrap gap-2">
                                        <StatusBadge status={app.status} type="appointment" />
                                        {/* Action buttons for scheduled appointments */}
                                        {app.status === 'Scheduled' && (
                                            <>
                                                <button onClick={() => onMarkAppointment(app.id, 'Completed')} className={`${themeColors.buttonPrimaryClass} px-3 py-1 rounded-md text-xs`}>{t('markCompleted')}</button>
                                                <button onClick={() => onMarkAppointment(app.id, 'Missed')} className="bg-red-500 text-white px-3 py-1 rounded-md text-xs">{t('markMissed')}</button>
                                                <button onClick={() => onCancelAppointment(app.id)} className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-xs`}>{t('cancel')}</button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={`${themeColors.textColorClass} opacity-80`}>{t('noAppointmentsToday')}</p>
                    )}
                </div>

                {/* Upcoming Appointments Section */}
                <div>
                    <h3 className={`text-xl font-semibold mb-3 ${themeColors.textColorClass}`}>{t('upcoming')}</h3>
                    {upcomingAppointments.length > 0 ? (
                        <ul className="space-y-3">
                            {upcomingAppointments.map((app) => (
                                <li key={app.id} className={`p-4 rounded-md ${themeColors.appointmentBgClass} ${themeColors.appointmentBorderClass} flex flex-col sm:flex-row justify-between items-start sm:items-center`}>
                                    <div>
                                        <p className="font-semibold text-lg">{t('consultationWith', { patientName: app.patientName })}</p>
                                        <p className="text-sm opacity-90">{t('date')}: {app.date}, {t('time')}: {app.time}</p>
                                        <p className="text-sm opacity-80">{t(app.type)}</p>
                                    </div>
                                    <div className="mt-3 sm:mt-0 flex flex-wrap gap-2">
                                        <StatusBadge status={app.status} type="appointment" />
                                        {/* Action buttons for upcoming appointments */}
                                        <button onClick={() => onRescheduleAppointment(app.id)} className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-xs`}>{t('reschedule')}</button>
                                        <button onClick={() => onCancelAppointment(app.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-xs">{t('cancel')}</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={`${themeColors.textColorClass} opacity-80`}>{t('noUpcomingAppointments')}</p>
                    )}
                </div>
            </div>

            {/* Completed, Cancelled, and Missed Appointments Section */}
            <div className="mt-6">
                <h3 className={`text-xl font-semibold mb-3 ${themeColors.textColorClass}`}>{t('completed')} & {t('cancelled')} / {t('missed')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Completed Appointments */}
                    <div>
                        <h4 className={`text-lg font-medium mb-2 ${themeColors.textColorClass}`}>{t('completedAppointments')}</h4>
                        {completedAppointments.length > 0 ? (
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                {completedAppointments.map(app => (
                                    <li key={app.id} className="flex justify-between items-center p-2 rounded bg-emerald-50/50 dark:bg-emerald-900/10">
                                        <span>{app.patientName} - {app.date} {app.time} ({t(app.type)})</span>
                                        <StatusBadge status="Completed" type="appointment" />
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-sm opacity-80">No completed appointments.</p>}
                    </div>

                    {/* Cancelled and Missed Appointments */}
                    <div>
                        <h4 className={`text-lg font-medium mb-2 ${themeColors.textColorClass}`}>{t('cancelledAppointments')} & {t('missed')}</h4>
                        {(cancelledAppointments.length > 0 || missedAppointments.length > 0) ? (
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                {cancelledAppointments.map(app => (
                                    <li key={app.id} className="flex justify-between items-center p-2 rounded bg-rose-50/50 dark:bg-rose-900/10">
                                        <span>{app.patientName} - {app.date} {app.time} ({t(app.type)})</span>
                                        <StatusBadge status="Cancelled" type="appointment" />
                                    </li>
                                ))}
                                {missedAppointments.map(app => (
                                    <li key={app.id} className="flex justify-between items-center p-2 rounded bg-red-50/50 dark:bg-red-900/10">
                                        <span>{app.patientName} - {app.date} {app.time} ({t(app.type)})</span>
                                        <StatusBadge status="Missed" type="appointment" />
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-sm opacity-80">No cancelled or missed appointments.</p>}
                    </div>
                </div>
            </div>

            {/* Add Appointment Modal */}
            <Transition appear show={isAddAppointmentModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAddAppointmentModalOpen(false)}>
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
                                        {t('addAppointment')}
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <form onSubmit={handleAddAppointmentSubmit} className="space-y-4">
                                            {/* Patient Name Input */}
                                            <div>
                                                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('patientName')}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="patientName"
                                                    name="patientName"
                                                    value={newAppointmentData.patientName}
                                                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, patientName: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    required
                                                />
                                            </div>

                                            {/* Appointment Date Input */}
                                            <div>
                                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('appointmentDate')}
                                                </label>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    value={newAppointmentData.date}
                                                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, date: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    required
                                                />
                                            </div>

                                            {/* Appointment Time Input */}
                                            <div>
                                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('appointmentTime')}
                                                </label>
                                                <input
                                                    type="time"
                                                    id="time"
                                                    name="time"
                                                    value={newAppointmentData.time}
                                                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, time: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    required
                                                />
                                            </div>

                                            {/* Appointment Type Select */}
                                            <div>
                                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('appointmentType')}
                                                </label>
                                                <select
                                                    id="type"
                                                    name="type"
                                                    value={newAppointmentData.type}
                                                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, type: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    required
                                                >
                                                    <option value="online">{t('online')}</option>
                                                    <option value="inPerson">{t('inPerson')}</option>
                                                    <option value="followUp">{t('followUp')}</option>
                                                </select>
                                            </div>

                                            {/* Meeting Link Input (conditionally rendered for online appointments) */}
                                            {newAppointmentData.type === 'online' && (
                                                <div>
                                                    <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {t('meetingLink')}
                                                    </label>
                                                    <input
                                                        type="url"
                                                        id="meetingLink"
                                                        name="meetingLink"
                                                        value={newAppointmentData.meetingLink}
                                                        onChange={(e) => setNewAppointmentData({ ...newAppointmentData, meetingLink: e.target.value })}
                                                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                        placeholder="https://meet.google.com/xyz-abc"
                                                    />
                                                </div>
                                            )}

                                            {/* Reason for Appointment Textarea */}
                                            <div>
                                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('reason')}
                                                </label>
                                                <textarea
                                                    id="reason"
                                                    name="reason"
                                                    rows="3"
                                                    value={newAppointmentData.reason}
                                                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, reason: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    required
                                                ></textarea>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-4 flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    className={`${themeColors.buttonSecondaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                                    onClick={() => setIsAddAppointmentModalOpen(false)}
                                                >
                                                    {t('close')}
                                                </button>
                                                <button
                                                    type="submit"
                                                    className={`${themeColors.buttonPrimaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                                >
                                                    {t('schedule')}
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

export default DoctorSchedule;
