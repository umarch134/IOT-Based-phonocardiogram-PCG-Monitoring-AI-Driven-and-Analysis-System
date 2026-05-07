import React, { useState, useEffect, useCallback, Fragment, useMemo, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import {
    ExclamationCircleIcon, InformationCircleIcon, CheckCircleIcon, XMarkIcon, SunIcon, MoonIcon,
    CalendarDaysIcon, HeartIcon, BellAlertIcon, BookOpenIcon, ClockIcon, Bars3Icon,
    ExclamationTriangleIcon, MegaphoneIcon, DocumentArrowDownIcon, DocumentTextIcon,
    UserCircleIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, GlobeAltIcon, PencilSquareIcon,
    IdentificationIcon, HomeModernIcon, UserGroupIcon, HashtagIcon, CalendarIcon, Cog6ToothIcon,
    PlayIcon, PauseIcon // New icons for monitoring
} from '@heroicons/react/24/outline'; // Added more specific alert icons, and document icons for reports, also profile icons, and PencilSquareIcon for medication, and more for profile
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// NOTE: For Font Awesome icons (e.g., <i className="fas fa-home"></i>) to display,
// you need to include the Font Awesome CDN in your public/index.html file's <head> section:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" xintegrity="sha512-Fo3rlalK+l3Zg3F/A6P4n/p5F5D0V5v1hA1UqM6B/N4bL5a6J4P1F2P7W3f5H8O/w2zQ8y2F6w6bQ7t6X5A==" crossorigin="anonymous" referrerpolicy="no-referrer" />


// --- i18n Configuration ---
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "patientDashboard": "Patient Dashboard",
                    "home": "Home",
                    "reports": "Reports",
                    "myReports": "My Reports", // Updated label
                    "appointments": "Appointments",
                    "myAppointments": "My Appointments", // Updated label
                    "messages": "Messages",
                    "notifications": "Notifications", // Consistent with section ID
                    "theme": "Theme",
                    "darkTheme": "Dark Theme",
                    "lightTheme": "Light Theme",
                    "language": "Language",
                    "english": "English",
                    "urdu": "Urdu",
                    "spanish": "Spanish",
                    "french": "French",
                    "german": "German",
                    "dashboard": "Dashboard",
                    "profile": "Profile",
                    "patient_info": "Patient Information",
                    "settings": "Settings", // Updated label
                    "logout": "Logout",
                    "welcomePatient": "Welcome, {{patientName}}!",
                    "dashboardOverview": "Here's an overview of your health status.",
                    "totalReports": "Total Reports",
                    "upcomingAppointments": "Upcoming Appointments",
                    "activeAlerts": "Active Alerts",
                    "healthReports": "Health Reports",
                    "searchReportsPlaceholder": "Search reports...",
                    "reportId": "Report ID",
                    "date": "Date",
                    "type": "Type",
                    "reasonForVisit": "Reason for Visit",
                    "status": "Status",
                    "actions": "Actions",
                    "view": "View",
                    "download": "Download",
                    "noReportsFound": "No reports found.",
                    "reportDetails": "Report Details",
                    "fullReportContentPlaceholder": "Detailed medical findings and recommendations would go here.",
                    "gotIt": "Got it!",
                    "appointmentWith": "Appointment with {{doctorName}}",
                    "details": "Details",
                    "cancel": "Cancel",
                    "noUpcomingAppointments": "No upcoming appointments.",
                    "scheduleNewAppointment": "Schedule New Appointment",
                    "doctorName": "Doctor's Name",
                    "appointmentDate": "Appointment Date",
                    "appointmentTime": "Appointment Time",
                    "reasonForAppointment": "Reason for Appointment",
                    "schedule": "Schedule",
                    "appointmentScheduledSuccess": "Appointment scheduled successfully!",
                    "cancelAppointmentPrompt": "Are you sure you want to cancel this appointment?",
                    "confirmCancel": "Confirm Cancel",
                    "cancelSuccess": "Appointment cancelled successfully!",
                    "recentAlerts": "Recent Alerts",
                    "noRecentAlerts": "No recent alerts.",
                    "livePCG": "Live PCG Monitoring",
                    "pcgStatusNormal": "PCG Status: Normal",
                    "pcgStatusIrregular": "PCG Status: Irregular",
                    "pcgValue": "Current PCG Value: {{value}}",
                    "currentHealthStatus": "Current Health Status",
                    "noHealthStatus": "No health status available.",
                    "heartHealthMetrics": "Heart Health Metrics",
                    "heartRate": "Heart Rate",
                    "cholesterol": "Cholesterol",
                    "heartHealthStatus": "Heart Health Status",
                    "riskAssessment": "Risk Assessment",
                    "viewDetails": "View Details",
                    "heartRateWarning": "Your heart rate is slightly elevated.",
                    "cholesterolWarning": "Your cholesterol levels are elevated.",
                    "overallRiskLow": "Overall Risk: Low",
                    "overallRiskMedium": "Overall Risk: Medium",
                    "overallRiskHigh": "Overall Risk: High",
                    "patientOverview": "Patient Overview",
                    "healthTrends": "Health Trends",
                    "dailyActivity": "Daily Activity",
                    "sleepPatterns": "Sleep Patterns",
                    "medicationReminders": "Medication Reminders",
                    "noMedicationReminders": "No medication reminders.",
                    "medicationName": "Medication",
                    "dose": "Dose",
                    "time": "Time",
                    "taken": "Taken",
                    "markAsTaken": "Mark as Taken",
                    "medicationTakenSuccess": "Medication marked as taken!",
                    "trendType": "Trend Type",
                    "chartTitle": "Health Trend: {{type}}",
                    "bloodSugar": "Blood Sugar",
                    "weight": "Weight",
                    "activityLevel": "Activity Level",
                    "caloriesBurned": "Calories Burned",
                    "steps": "Steps",
                    "distance": "Distance (km)",
                    "activityGoal": "Activity Goal",
                    "averageSleep": "Average Sleep",
                    "quality": "Quality",
                    "noSleepData": "No sleep data available.",
                    "sleepQualityGood": "Sleep Quality: Good",
                    "sleepQualityFair": "Sleep Quality: Fair",
                    "sleepQualityPoor": "Sleep Quality: Poor",
                    "lastChecked": "Last Checked: {{time}}",
                    "viewAllAlerts": "View All Alerts",
                    "logoutSuccess": "Logged out successfully!",
                    "fillAllFields": "Please fill all appointment details.",
                    "reportDownloadSuccess": "Report {{reportId}} downloaded successfully!",
                    "reportViewSuccess": "Viewing report {{reportId}} details.",
                    "today": "Today",
                    "thisWeek": "This Week",
                    "thisMonth": "This Month",
                    "healthStatus": "Health Status",
                    "bloodPressure": "Blood Pressure",
                    "bodyTemperature": "Body Temperature",
                    "overall": "Overall",
                    "age": "Age",
                    "gender": "Gender",
                    "bloodType": "Blood Type",
                    "emergencyContact": "Emergency Contact",
                    "dob": "Date of Birth",
                    "privacyPolicy": "Privacy Policy",
                    "termsOfService": "Terms of Service",
                    "contactUs": "Contact Us",
                    "allRightsReserved": "All Rights Reserved.",
                    "trendBloodSugar": "Blood Sugar Trend",
                    "trendWeight": "Weight Trend",
                    "trendActivityLevel": "Activity Level Trend",
                    "dailyGoal": "Daily Goal: {{goal}} steps",
                    "stepsTaken": "Steps Taken: {{steps}}",
                    "caloriesBurnedValue": "Calories Burned: {{calories}} kcal",
                    "distanceCovered": "Distance Covered: {{distance}} km",


                    "pcgMetrics": "PCG Metrics",
                    "aiDiagnosis": "AI Diagnosis",
                    "heartSounds": "Heart Sounds",
                    "s1Amplitude": "S1 Amplitude",
                    "s2Amplitude": "S2 Amplitude",
                    "s3Amplitude": "S3 Amplitude",
                    "s4Amplitude": "S4 Amplitude",
                    "murmurPresence": "Murmur Presence",
                    "pcgScore": "PCG Score",
                    "pcgStatus": "PCG Status",
                    "pcg_trend_heart_rate": "PCG Derived Heart Rate Trend",
                    "pcg_trend_murmur_score": "Murmur Score Trend",
                    "pcg_value_over_time": "PCG Trends Over Time",
                    "murmur_detection": "Murmur Detection",
                    "view_full_profile": "View Full Profile",
                    "Loading patient data...": "Loading patient data...",
                    "Patient data not found.": "Patient data not found.",
                    "Back to Dashboard": "Back to Dashboard",
                    "Lab Results": "Lab Results",
                    "No lab results available.": "No lab results available.",
                    "Prescriptions": "Prescriptions",
                    "No prescriptions issued.": "No prescriptions issued.",
                    "Visit History": "Visit History",
                    "No visit history found.": "No visit history found.",
                    "scheduleAppointment": "Schedule Appointment",
                    "selectDoctor": "Select Doctor",
                    "selectDate": "Select Date",
                    "selectTime": "Select Time",
                    "reason": "Reason",
                    "submit": "Submit",
                    "close": "Close",
                    "cancelAppointmentTitle": "Cancel Appointment",
                    "cancelAppointmentConfirmation": "Are you sure you want to cancel the appointment with {{doctorName}} on {{date}} at {{time}}?",
                    "confirm": "Confirm",
                    "appointmentCancelled": "Appointment with {{doctorName}} on {{date}} at {{time}} has been cancelled.",
                    "alertDetails": "Alert Details",
                    "dismiss": "Dismiss",
                    "viewAlertDetails": "View Alert Details",
                    "info": "Info",
                    "warning": "Warning",
                    "danger": "Danger",
                    "newLabResults": "New Lab Results Available!",
                    "appointmentReminder": "Appointment Reminder!",
                    "bloodPressureHigh": "Blood Pressure Alert: Elevated Reading",
                    "noAlertsMessage": "You have no new alerts.",
                    "pcgAnalysis": "PCG Analysis",
                    "heartSoundReport": "Heart Sound Report",
                    "murmurDetectionReport": "Murmur Detection Report",
                    "pcgBaselineComparison": "PCG Baseline Comparison",
                    "normal": "Normal",
                    "mild": "Mild",
                    "moderate": "Moderate",
                    "severe": "Severe",
                    "doctor_ali_khan": "Dr. Ali Khan",
                    "specialty_cardiologist": "Cardiologist",
                    "doctor_sara_javed": "Dr. Sara Javed",
                    "specialty_general_physician": "General Physician",
                    "doctor_asif_mehmood": "Dr. Asif Mehmood",
                    "specialty_dermatologist": "Dermatologist",
                    "doctor_aisha_siddiqui": "Dr. Aisha Siddiqui",
                    "specialty_pediatrician": "Pediatrician",
                    "patient_id": "Patient ID",
                    "name": "Name",
                    "age": "Age",
                    "gender": "Gender",
                    "bloodType": "Blood Type",
                    "medical_history": "Medical History",
                    "allergies": "Allergies",
                    "contact_info": "Contact Information",
                    "address": "Address",
                    "phone": "Phone",
                    "email": "Email",
                    "relationship": "Relationship",
                    "taken": "Taken",
                    "pending": "Pending",
                    "morning": "Morning",
                    "afternoon": "Afternoon",
                    "evening": "Evening",
                    "night": "Night",
                    "medication_list": "Medication List",
                    "mark_as_taken": "Mark as Taken",
                    "pcg_waveform": "PCG Waveform",
                    "doctor_notes": "Doctor's Notes",
                    "murmur_type": "Murmur Type",
                    "s1_amplitude_value": "S1 Amplitude: {{value}}",
                    "s2_frequency_value": "S2 Frequency: {{value}} Hz",
                    "murmur_presence_value": "Murmur Presence: {{value}}%",
                    "pcg_score_value": "PCG Score: {{value}}",
                    "playS1": "Play S1",
                    "playS2": "Play S2",
                    "playS3": "Play S3",
                    "playS4": "Play S4",
                    "heartSounds": "Heart Sounds",
                    "simulatePcg": "Simulate PCG",
                    "keyFactors": "Key Factors",
                    "personalInformation": "Personal Information",
                    "emergencyContactName": "Emergency Contact Name",
                    "emergencyContactPhone": "Emergency Contact Phone",
                    "emergencyContactRelationship": "Emergency Contact Relationship",
                    "height": "Height",
                    "weight": "Weight",
                    "medicalConditions": "Medical Conditions",
                    "editPatientProfile": "Edit Patient Profile",
                    "saveChanges": "Save Changes",
                    "profileUpdatedSuccessfully": "Profile updated successfully!",
                    "startMonitoring": "Start Monitoring",
                    "stopMonitoring": "Stop Monitoring",
                    "listening": "Listening...",
                    "noSignal": "No Signal",
                    "lastPCGReading": "Last PCG Reading",
                    "aiDiagnosis": "AI Diagnosis",
                    "abnormal": "Abnormal",
                    "previousAppointments": "Previous Appointments",
                    "changePassword": "Change Password",
                    "currentPassword": "Current Password",
                    "newPassword": "New Password",
                    "confirmNewPassword": "Confirm New Password",
                    "updatePassword": "Update Password",
                    "passwordChangeSuccess": "Password changed successfully!",
                    "passwordMismatch": "New passwords do not match.",
                    "passwordChangeError": "Error changing password.",
                    "approved": "Approved", // New appointment status
                    "rejected": "Rejected", // New appointment status
                    "completed": "Completed", // Existing appointment status, ensure translation
                    "scheduled": "Scheduled", // Existing appointment status, ensure translation
                    "ai": "AI", // Alert source
                    "doctor": "Doctor", // Alert source
                    "latestHeartStatus": "Latest Heart Status",
                    "lastPCGReadingTime": "Last PCG Reading",
                    "nextAppointment": "Next Appointment",
                    "routineCheckup": "Routine Checkup",
                    "followUp": "Follow-up",
                    "skinConsultation": "Skin Consultation",
                    "pcg_rhythm_normal": "Normal Rhythm",
                    "pcg_rhythm_irregular": "Irregular Rhythm",
                    "pcg_rhythm_detected": "Detected Rhythm: {{rhythm}}",
                    "heart_status_normal": "Normal",
                    "heart_status_abnormal": "Abnormal",
                    "no_pcg_data": "No PCG data available.",
                    "no_upcoming_appointments_short": "No upcoming appointments.",
                    "no_alerts": "No new alerts.",
                    "no_medications": "No medications scheduled.",
                    "editProfile": "Edit Profile",
                    "cancelEdit": "Cancel Edit",
                    "currentPasswordPlaceholder": "Enter current password",
                    "newPasswordPlaceholder": "Enter new password",
                    "confirmNewPasswordPlaceholder": "Confirm new password",
                }
            },
            ur: {
                translation: {
                    "patientDashboard": "مریض کا ڈیش بورڈ",
                    "home": "ہوم",
                    "reports": "رپورٹس",
                    "myReports": "میری رپورٹس",
                    "appointments": "ملاقاتیں",
                    "myAppointments": "میری ملاقاتیں",
                    "messages": "پیغامات",
                    "notifications": "اطلاعات",
                    "theme": "تھیم",
                    "darkTheme": "ڈارک تھیم",
                    "lightTheme": "لائٹ تھیم",
                    "language": "زبان",
                    "english": "انگریزی",
                    "urdu": "اردو",
                    "spanish": "ہسپانوی",
                    "french": "فرانسیسی",
                    "german": "جرمن",
                    "dashboard": "ڈیش بورڈ",
                    "profile": "پروفائل",
                    "patient_info": "مریض کی معلومات",
                    "settings": "سیٹنگز",
                    "logout": "لاگ آؤٹ",
                    "welcomePatient": "خوش آمدید، {{patientName}}!",
                    "dashboardOverview": "آپ کی صحت کی حالت کا جائزہ یہاں ہے۔",
                    "totalReports": "کل رپورٹس",
                    "upcomingAppointments": "آنے والی ملاقاتیں",
                    "activeAlerts": "فعال انتباہات",
                    "healthReports": "صحت کی رپورٹس",
                    "searchReportsPlaceholder": "رپورٹس تلاش کریں...",
                    "reportId": "رپورٹ ID",
                    "date": "تاریخ",
                    "type": "قسم",
                    "reasonForVisit": "ملاقات کا سبب",
                    "status": "حیثیت",
                    "actions": "عمل",
                    "view": "دیکھیں",
                    "download": "ڈاؤن لوڈ کریں",
                    "noReportsFound": "کوئی رپورٹ نہیں ملی۔",
                    "reportDetails": "رپورٹ کی تفصیلات",
                    "fullReportContentPlaceholder": "تفصیلی طبی نتائج اور سفارشات یہاں ہوں گے۔",
                    "gotIt": "سمجھ گیا!",
                    "appointmentWith": "ڈاکٹر {{doctorName}} کے ساتھ ملاقات",
                    "details": "تفصیلات",
                    "cancel": "منسوخ کریں",
                    "noUpcomingAppointments": "کوئی آنے والی ملاقاتیں نہیں ہیں۔",
                    "scheduleNewAppointment": "نئی ملاقات کا شیڈول",
                    "doctorName": "ڈاکٹر کا نام",
                    "appointmentDate": "ملاقات کی تاریخ",
                    "appointmentTime": "ملاقات کا وقت",
                    "reasonForAppointment": "ملاقات کا سبب",
                    "schedule": "شیڈول کریں",
                    "appointmentScheduledSuccess": "ملاقات کامیابی سے شیڈول ہو گئی!",
                    "cancelAppointmentPrompt": "کیا آپ واقعی اس ملاقات کو منسوخ کرنا چاہتے ہیں؟",
                    "confirmCancel": "منسوخی کی تصدیق کریں",
                    "cancelSuccess": "ملاقات کامیابی سے منسوخ ہو گئی!",
                    "recentAlerts": "حالیہ انتباہات",
                    "noRecentAlerts": "کوئی حالیہ انتباہات نہیں ہیں۔",
                    "livePCG": "لائیو پی سی جی مانیٹرنگ",
                    "pcgStatusNormal": "پی سی جی حالت: نارمل",
                    "pcgStatusIrregular": "پی سی جی حالت: بے قاعدہ",
                    "pcgValue": "موجودہ پی سی جی قدر: {{value}}",
                    "currentHealthStatus": "موجودہ صحت کی حالت",
                    "noHealthStatus": "صحت کی کوئی حالت دستیاب نہیں ہے۔",
                    "heartHealthMetrics": "دل کی صحت کے میٹرکس",
                    "heartRate": "دل کی دھڑکن",
                    "cholesterol": "کولیسٹرول",
                    "heartHealthStatus": "دل کی صحت کی حالت",
                    "riskAssessment": "خطرے کی تشخیص",
                    "viewDetails": "تفصیلات دیکھیں",
                    "heartRateWarning": "آپ کے دل کی دھڑکن تھوڑی تیز ہے۔",
                    "cholesterolWarning": "آپ کے کولیسٹرول کی سطح بلند ہے۔",
                    "overallRiskLow": "مجموعی خطرہ: کم",
                    "overallRiskMedium": "مجموعی خطرہ: درمیانہ",
                    "overallRiskHigh": "مجموعی خطرہ: زیادہ",
                    "patientOverview": "مریض کا جائزہ",
                    "healthTrends": "صحت کے رجحانات",
                    "dailyActivity": "روزانہ کی سرگرمی",
                    "sleepPatterns": "نیند کے پیٹرن",
                    "medicationReminders": "ادویات کی یاد دہانیاں",
                    "noMedicationReminders": "کوئی ادویات کی یاد دہانیاں نہیں ہیں۔",
                    "medicationName": "دوا",
                    "dose": "خوراک",
                    "time": "وقت",
                    "taken": "لی گئی",
                    "markAsTaken": "لی گئی کے طور پر نشان زد کریں",
                    "medicationTakenSuccess": "دوا کو لی گئی کے طور پر نشان زد کیا گیا!",
                    "trendType": "رجحان کی قسم",
                    "chartTitle": "صحت کا رجحان: {{type}}",
                    "bloodSugar": "بلڈ شوگر",
                    "weight": "وزن",
                    "activityLevel": "سرگرمی کی سطح",
                    "caloriesBurned": "کیلوریز جلائیں",
                    "steps": "اقدامات",
                    "distance": "فاصلہ (کلومیٹر)",
                    "activityGoal": "سرگرمی کا ہدف",
                    "averageSleep": "اوسط نیند",
                    "quality": "معیار",
                    "noSleepData": "نیند کا کوئی ڈیٹا دستیاب نہیں ہے۔",
                    "sleepQualityGood": "نیند کا معیار: اچھا",
                    "sleepQualityFair": "نیند کا معیار: مناسب",
                    "sleepQualityPoor": "نیند کا معیار: خراب",
                    "lastChecked": "آخری بار چیک کیا گیا: {{time}}",
                    "viewAllAlerts": "تمام انتباہات دیکھیں",
                    "logoutSuccess": "کامیابی سے لاگ آؤٹ ہو گئے!",
                    "fillAllFields": "براہ کرم ملاقات کی تمام تفصیلات پُر کریں۔",
                    "reportDownloadSuccess": "رپورٹ {{reportId}} کامیابی سے ڈاؤن لوڈ ہو گئی!",
                    "reportViewSuccess": "رپورٹ {{reportId}} کی تفصیلات دیکھی جا رہی ہیں۔",
                    "today": "آج",
                    "thisWeek": "اس ہفتے",
                    "thisMonth": "اس مہینے",
                    "healthStatus": "صحت کی حالت",
                    "bloodPressure": "بلڈ پریشر",
                    "bodyTemperature": "جسم کا درجہ حرارت",
                    "overall": "مجموعی",
                    "age": "عمر",
                    "gender": "جنس",
                    "bloodType": "بلڈ گروپ",
                    "emergencyContact": "ایمرجنسی رابطہ",
                    "dob": "تاریخ پیدائش",
                    "privacyPolicy": "رازداری کی پالیسی",
                    "termsOfService": "سروس کی شرائط",
                    "contactUs": "ہم سے رابطہ کریں",
                    "allRightsReserved": "تمام حقوق محفوظ ہیں۔",
                    "trendBloodSugar": "بلڈ شوگر کا رجحان",
                    "trendWeight": "وزن کا رجحان",
                    "trendActivityLevel": "سرگرمی کی سطح کا رجحان",
                    "dailyGoal": "روزانہ کا ہدف: {{goal}} اقدامات",
                    "stepsTaken": "اٹھائے گئے اقدامات: {{steps}}",
                    "caloriesBurnedValue": "جلائی گئی کیلوریز: {{calories}} کلو کیلوری",
                    "distanceCovered": "تہہ شدہ فاصلہ: {{distance}} کلومیٹر",
                    "pcgMetrics": "پی سی جی میٹرکس",
                    "s1Amplitude": "S1 وسعت",
                    "s2Frequency": "S2 فریکوئنسی",
                    "murmurPresence": "مرمر کی موجودگی",
                    "pcgScore": "پی سی جی سکور",
                    "pcgStatus": "پی سی جی کی حیثیت",
                    "pcg_trend_heart_rate": "پی سی جی سے حاصل کردہ دل کی دھڑکن کا رجحان",
                    "pcg_trend_murmur_score": "مرمر سکور کا رجحان",
                    "pcg_value_over_time": "وقت کے ساتھ پی سی جی رجحانات",
                    "murmur_detection": "مرمر کی تشخیص",
                    "view_full_profile": "مکمل پروفائل دیکھیں",
                    "Loading patient data...": "مریض کا ڈیٹا لوڈ ہو رہا ہے...",
                    "Patient data not found.": "مریض کا ڈیٹا نہیں ملا۔",
                    "Back to Dashboard": "ڈیش بورڈ پر واپس جائیں",
                    "Lab Results": "لیب کے نتائج",
                    "No lab results available.": "کوئی لیب کے نتائج دستیاب نہیں ہیں۔",
                    "Prescriptions": "نسخے",
                    "No prescriptions issued.": "کوئی نسخے جاری نہیں کیے گئے۔",
                    "Visit History": "دوروں کی تاریخ",
                    "No visit history found.": "دوروں کی کوئی تاریخ نہیں ملی۔",
                    "scheduleAppointment": "ملاقات کا شیڈول",
                    "selectDoctor": "ڈاکٹر کا انتخاب کریں",
                    "selectDate": "تاریخ کا انتخاب کریں",
                    "selectTime": "وقت کا انتخاب کریں",
                    "reason": "وجہ",
                    "submit": "جمع کرائیں",
                    "close": "بند کریں",
                    "cancelAppointmentTitle": "ملاقات منسوخ کریں",
                    "cancelAppointmentConfirmation": "کیا آپ واقعی ڈاکٹر {{doctorName}} کے ساتھ {{date}} کو {{time}} بجے کی ملاقات منسوخ کرنا چاہتے ہیں؟",
                    "confirm": "تصدیق کریں",
                    "appointmentCancelled": "ڈاکٹر {{doctorName}} کے ساتھ {{date}} کو {{time}} بجے کی ملاقات منسوخ کر دی گئی ہے۔",
                    "alertDetails": "انتباہ کی تفصیلات",
                    "dismiss": "برخاست کریں",
                    "viewAlertDetails": "انتباہ کی تفصیلات دیکھیں",
                    "info": "معلومات",
                    "warning": "انتباہ",
                    "danger": "خطرہ",
                    "newLabResults": "نئے لیب کے نتائج دستیاب!",
                    "appointmentReminder": "ملاقات کی یاد دہانی!",
                    "bloodPressureHigh": "بلڈ پریشر الرٹ: بلند ریڈنگ",
                    "noAlertsMessage": "آپ کے پاس کوئی نئے انتباہات نہیں ہیں۔",
                    "pcgAnalysis": "پی سی جی تجزیہ",
                    "heartSoundReport": "دل کی آواز کی رپورٹ",
                    "murmurDetectionReport": "مرمر کی تشخیص کی رپورٹ",
                    "pcgBaselineComparison": "پی سی جی بیس لائن کا موازنہ",
                    "normal": "نارمل",
                    "mild": "ہلکا",
                    "moderate": "معتدل",
                    "severe": "شدید",
                    "doctor_ali_khan": "ڈاکٹر علی خان",
                    "specialty_cardiologist": "کارڈیالوجسٹ",
                    "doctor_sara_javed": "ڈاکٹر سارہ جاوید",
                    "specialty_general_physician": "جنرل فزیشن",
                    "doctor_asif_mehmood": "ڈاکٹر آصف محمود",
                    "specialty_dermatologist": "ڈرمیٹولوجسٹ",
                    "doctor_aisha_siddiqui": "ڈاکٹر عائشہ صدیقی",
                    "specialty_pediatrician": "پیڈیاٹریشن",
                    "patient_id": "مریض ID",
                    "name": "نام",
                    "age": "عمر",
                    "gender": "جنس",
                    "bloodType": "بلڈ گروپ",
                    "medical_history": "طبی تاریخ",
                    "allergies": "الرجیز",
                    "contact_info": "رابطے کی معلومات",
                    "address": "پتہ",
                    "phone": "فون",
                    "email": "ای میل",
                    "relationship": "رشتہ",
                    "taken": "لی گئی",
                    "pending": "زیر التواء",
                    "morning": "صبح",
                    "afternoon": "دوپہر",
                    "evening": "شام",
                    "night": "رات",
                    "medication_list": "ادویات کی فہرست",
                    "mark_as_taken": "لی گئی کے طور پر نشان زد کریں",
                    "pcg_waveform": "پی سی جی ویوفارم",
                    "doctor_notes": "ڈاکٹر کے نوٹس",
                    "murmur_type": "مرمر کی قسم",
                    "s1_amplitude_value": "S1 وسعت: {{value}}",
                    "s2_frequency_value": "S2 فریکوئنسی: {{value}} Hz",
                    "murmur_presence_value": "مرمر کی موجودگی: {{value}}%",
                    "pcg_score_value": "پی سی جی سکور: {{value}}",
                    "playS1": "S1 چلائیں",
                    "playS2": "S2 چلائیں",
                    "playS3": "S3 چلائیں",
                    "playS4": "S4 چلائیں",
                    "heartSounds": "دل کی آوازیں",
                    "simulatePcg": "پی سی جی کی نقل کریں",
                    "keyFactors": "اہم عوامل",
                    "personalInformation": "ذاتی معلومات",
                    "emergencyContactName": "ایمرجنسی رابطہ کا نام",
                    "emergencyContactPhone": "ایمرجنسی رابطہ کا فون",
                    "emergencyContactRelationship": "ایمرجنسی رابطہ کا رشتہ",
                    "height": "اونچائی",
                    "weight": "وزن",
                    "medicalConditions": "طبی حالتیں",
                    "editPatientProfile": "مریض کے پروفائل میں ترمیم کریں",
                    "saveChanges": "تبدیلیاں محفوظ کریں",
                    "profileUpdatedSuccessfully": "پروفائل کامیابی سے اپ ڈیٹ ہو گیا!",
                    "startMonitoring": "مانیٹرنگ شروع کریں",
                    "stopMonitoring": "مانیٹرنگ بند کریں",
                    "listening": "سن رہا ہے...",
                    "noSignal": "کوئی سگنل نہیں",
                    "lastPCGReading": "آخری پی سی جی ریڈنگ",
                    "aiDiagnosis": "AI تشخیص",
                    "abnormal": "غیر معمولی",
                    "previousAppointments": "پچھلی ملاقاتیں",
                    "changePassword": "پاس ورڈ تبدیل کریں",
                    "currentPassword": "موجودہ پاس ورڈ",
                    "newPassword": "نیا پاس ورڈ",
                    "confirmNewPassword": "نئے پاس ورڈ کی تصدیق کریں",
                    "updatePassword": "پاس ورڈ اپ ڈیٹ کریں",
                    "passwordChangeSuccess": "پاس ورڈ کامیابی سے تبدیل ہو گیا!",
                    "passwordMismatch": "نئے پاس ورڈز مماثل نہیں ہیں۔",
                    "passwordChangeError": "پاس ورڈ تبدیل کرنے میں خرابی۔",
                    "approved": "منظور شدہ",
                    "rejected": "مسترد",
                    "completed": "مکمل",
                    "scheduled": "شیڈول شدہ",
                    "ai": "AI",
                    "doctor": "ڈاکٹر",
                    "latestHeartStatus": "دل کی تازہ ترین حالت",
                    "lastPCGReadingTime": "آخری پی سی جی ریڈنگ",
                    "nextAppointment": "اگلی ملاقات",
                    "routineCheckup": "معمول کا معائنہ",
                    "followUp": "فالو اپ",
                    "skinConsultation": "جلد کا مشورہ",
                    "pcg_rhythm_normal": "نارمل تال",
                    "pcg_rhythm_irregular": "بے قاعدہ تال",
                    "pcg_rhythm_detected": "پتہ چلنے والی تال: {{rhythm}}",
                    "heart_status_normal": "نارمل",
                    "heart_status_abnormal": "غیر معمولی",
                    "no_pcg_data": "کوئی پی سی جی ڈیٹا دستیاب نہیں ہے۔",
                    "no_upcoming_appointments_short": "کوئی آنے والی ملاقاتیں نہیں ہیں۔",
                    "no_alerts": "کوئی نئے انتباہات نہیں ہیں۔",
                    "no_medications": "کوئی ادویات شیڈول نہیں ہیں۔",
                    "editProfile": "پروفائل میں ترمیم کریں",
                    "cancelEdit": "ترمیم منسوخ کریں",
                    "currentPasswordPlaceholder": "موجودہ پاس ورڈ درج کریں",
                    "newPasswordPlaceholder": "نیا پاس ورڈ درج کریں",
                    "confirmNewPasswordPlaceholder": "نئے پاس ورڈ کی تصدیق کریں",
                }
            },
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

// Register Chart.js components for use
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// --- Theme Configuration ---
const themes = {
    light: {
        name: 'Light',
        // Direct Tailwind classes for styling
        backgroundClass: 'bg-gray-100',
        textColorClass: 'text-gray-900',
        cardBgClass: 'bg-white',
        cardBorderClass: 'border-gray-200',
        sidebarBgClass: 'bg-white',
        sidebarBorderClass: 'border-gray-200',
        shadowClass: 'shadow-lg',
        reportBgClass: 'bg-blue-50',
        reportBorderClass: 'border-blue-100',
        appointmentBgClass: 'bg-blue-50',
        appointmentBorderClass: 'border-blue-100',
        alertInfoBgClass: 'bg-blue-50', // New for alerts
        alertInfoBorderClass: 'border-blue-100', // New for alerts
        alertWarningBgClass: 'bg-amber-50',
        alertWarningBorderClass: 'border-amber-200',
        alertDangerBgClass: 'bg-rose-50',
        alertDangerBorderClass: 'border-rose-200',
        buttonPrimaryClass: 'bg-blue-600 hover:bg-blue-700 text-white',
        buttonSecondaryClass: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        iconColorClass: 'text-gray-600',
        // Colors for Chart.js (direct RGB values are fine as Chart.js uses them directly)
        chartGridColor: 'rgba(209, 213, 219, 0.2)', // gray-300 with transparency
        chartTextColor: 'rgb(75, 85, 99)', // gray-700
        primaryRgb: '59, 130, 246', // blue-500
        secondaryRgb: '99, 102, 241', // indigo-500
        progressBgClass: 'bg-gray-200',
        progressFillClass: 'bg-blue-500',
        // PCG Waveform colors
        waveformStroke: '#3B82F6', // blue-500
        waveformFill: 'rgba(59, 130, 246, 0.1)', // blue-500 with transparency
    },
    dark: {
        name: 'Dark',
        backgroundClass: 'bg-gray-900',
        textColorClass: 'text-gray-100',
        cardBgClass: 'bg-gray-800',
        cardBorderClass: 'border-gray-700',
        sidebarBgClass: 'bg-gray-800',
        sidebarBorderClass: 'border-gray-700',
        shadowClass: 'shadow-xl',
        reportBgClass: 'bg-blue-900/30',
        reportBorderClass: 'border-blue-800',
        appointmentBgClass: 'bg-blue-900/30',
        appointmentBorderClass: 'border-blue-800',
        alertInfoBgClass: 'bg-blue-900/30', // New for alerts
        alertInfoBorderClass: 'border-blue-800', // New for alerts
        alertWarningBgClass: 'bg-amber-900/30',
        alertWarningBorderClass: 'border-amber-800',
        alertDangerBgClass: 'bg-rose-900/30',
        alertDangerBorderClass: 'border-rose-800',
        buttonPrimaryClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        buttonSecondaryClass: 'bg-gray-600 hover:bg-gray-500 text-gray-100',
        iconColorClass: 'text-gray-300',
        chartGridColor: 'rgba(75, 85, 99, 0.3)', // gray-700 with transparency
        chartTextColor: 'rgb(209, 213, 219)', // gray-300
        primaryRgb: '156, 163, 175', // gray-400
        secondaryRgb: '156, 163, 175', // gray-400
        progressBgClass: 'bg-gray-700',
        progressFillClass: 'bg-gray-400',
        // PCG Waveform colors
        waveformStroke: '#60A5FA', // blue-400
        waveformFill: 'rgba(96, 165, 250, 0.15)', // blue-400 with transparency
    },
};


// --- Utility Components ---
/**
 * StatusBadge Component: Displays a colored badge based on status and type.
 * اسٹیٹس بیج کمپونینٹ: اسٹیٹس اور قسم کی بنیاد پر رنگین بیج دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {string} props.status - The status text to display.
 * @param {string} props.type - The category of the status (e.g., 'health', 'report', 'alert').
 * @param {string} [props.className=''] - Additional CSS classes.
 */
const StatusBadge = ({ status, type, className = '' }) => {
    const baseClasses = 'px-3 py-1 rounded-full font-semibold text-xs inline-flex items-center justify-center';
    let specificClasses = '';
    const { t } = useTranslation();

    const STATUS_STYLES = {
        health: {
            'Stable': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Needs Attention': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Critical': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        livePcg: {
            'Normal': 'text-emerald-600 dark:text-emerald-400',
            'Irregular': 'text-rose-600 dark:text-rose-400 animate-pulse',
        },
        alert: { // These are now based on actual alert type, not just status
            'info': 'bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200',
            'warning': 'bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-900 dark:border-amber-700 dark:text-amber-200',
            'danger': 'bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-900 dark:border-rose-700 dark:text-rose-200',
            'default': 'bg-gray-50 border border-gray-200 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200',
        },
        risk: {
            'Low': 'bg-emerald-500 text-white',
            'Medium': 'bg-amber-500 text-white',
            'High': 'bg-rose-500 text-white',
            'default': 'bg-gray-500 text-white',
        },
        report: {
            'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Requires Review': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        appointment: {
            'Scheduled': 'bg-sky-100 text-sky-800 dark:bg-sky-700 dark:text-sky-100',
            'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Cancelled': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'Approved': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100', // New status
            'Rejected': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100', // New status
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        sync: {
            'Synced': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Error': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        heartHealth: {
            'Optimal': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Good': 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
            'Needs Monitoring': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Concern': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        medication: {
            'Taken': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Skipped': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        sleep: {
            'Good': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Fair': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Poor': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        }
        
    };

    specificClasses = STATUS_STYLES[type]?.[status] || STATUS_STYLES[type]?.default || STATUS_STYLES.default.default;

    return (
        <span className={`${baseClasses} ${specificClasses} ${className}`}>
            {t(status.toLowerCase())}
        </span>
    );
};

/**
 * Card Component: A reusable card container with a title and optional header content.
 * کارڈ کمپونینٹ: ایک دوبارہ استعمال کے قابل کارڈ کنٹینر جس میں عنوان اور اختیاری ہیڈر مواد شامل ہے۔
 * @param {object} props - Component props.
 * @param {string} [props.title] - The title of the card.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} [props.className=''] - Additional CSS classes for the card.
 * @param {React.ReactNode} [props.headerContent] - Optional content to display in the card header.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const Card = ({ title, children, className = '', headerContent, themeColors, id }) => (
    <motion.div
        id={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${themeColors.cardBgClass} p-6 rounded-xl ${themeColors.shadowClass} ${themeColors.cardBorderClass} ${className}`}
    >
        <div className="flex justify-between items-center mb-4">
            {title && <h2 className={`text-xl font-semibold ${themeColors.textColorClass}`}>{title}</h2>}
            {headerContent}
        </div>
        {children}
    </motion.div>
);

/**
 * NavBar Component: Top navigation bar with dashboard title, navigation links,
 * theme toggle, and language selector.
 * نیو بار کمپونینٹ: ڈیش بورڈ کے عنوان، نیویگیشن لنکس، تھیم ٹوگل، اور زبان کے انتخاب کے ساتھ اوپر کا نیویگیشن بار۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.currentThemeName - Name of the current active theme.
 * @param {function} props.toggleTheme - Function to toggle the theme.
 * @param {string} props.language - Current language code.
 * @param {function} props.setLanguage - Function to set the language.
 * @param {function} props.onLogout - Function to handle logout.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.scrollToSection - Function to scroll to a specific section.
 * @param {string} props.activeSection - The currently active section ID.
 */

const NavBar = ({ t, currentThemeName, toggleTheme, language, setLanguage, onLogout, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // your logic (e.g., clearing localStorage)
        navigate('/login'); // redirect to login
    };

    const gradientClasses = currentThemeName === 'light'
        ? 'from-blue-600 to-indigo-700'
        : 'from-gray-700 to-gray-800';

    const navLinks = [
        { id: 'dashboard-section', label: t('home'), icon: <i className="fas fa-home mr-2"></i> },
        { id: 'health-reports-section', label: t('reports'), icon: <i className="fas fa-file-alt mr-2"></i> },
        { id: 'appointments-section', label: t('appointments'), icon: <i className="fas fa-calendar-check mr-2"></i> },
        { id: 'notifications-section', label: t('messages'), icon: <i className="fas fa-comments mr-2"></i> },
    ];

    return (
        <nav className={`bg-gradient-to-r ${gradientClasses} ${themeColors.textColorClass} p-4 ${themeColors.shadowClass} relative z-40`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold tracking-wide">
                    {t('patientDashboard')}
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-white focus:outline-none p-2 rounded-md hover:bg-white/20 transition-colors"
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.id);
                            }}
                            className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
                                activeSection === link.id
                                    ? 'bg-white/30 text-white'
                                    : 'hover:bg-white/20 text-white'
                            }`}
                        >
                            {link.icon}{link.label}
                        </a>
                    ))}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-300"
                        title={currentThemeName === 'light' ? t('darkTheme') : t('lightTheme')}
                    >
                        {currentThemeName === 'light'
                            ? <MoonIcon className="w-6 h-6 text-yellow-300" />
                            : <SunIcon className="w-6 h-6 text-yellow-300" />}
                    </button>

                    {/* Language Selector */}
                    <select
                        className={`p-2 rounded-md bg-white/20 ${themeColors.textColorClass} focus:outline-none`}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">{t('english')}</option>
                        <option value="ur">{t('urdu')}</option>
                        <option value="es">{t('spanish')}</option>
                        <option value="fr">{t('french')}</option>
                        <option value="de">{t('german')}</option>
                    </select>

                    {/* Logout Button (Simple) */}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        {t('logout')}
                    </button>
                </div>
            </div>
        </nav>
    );
};


/**
 * Sidebar Component: Displays patient profile information and navigation links.
 * سائیڈبار کمپونینٹ: مریض کی پروفائل کی معلومات اور نیویگیشن لنکس دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.patient - Patient data object.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.scrollToSection - Function to scroll to a specific section.
 * @param {string} props.activeSection - The currently active section ID.
 */
const Sidebar = ({ t, patient, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen }) => {
    const sidebarLinks = [
        { id: 'dashboard-section', label: t('dashboard'), icon: <i className={`fas fa-chart-line mr-3 text-blue-500`}></i> },
        { id: 'profile-section', label: t('profile'), icon: <i className="fas fa-user-circle mr-3 text-indigo-500"></i> },
        { id: 'health-trends-section', label: t('healthTrends'), icon: <i className="fas fa-chart-bar mr-3 text-green-500"></i> },
        { id: 'appointments-section', label: t('myAppointments'), icon: <i className="fas fa-calendar-alt mr-3 text-yellow-500"></i> },
        { id: 'medication-section', label: t('medicationReminders'), icon: <i className="fas fa-pills mr-3 text-purple-500"></i> },
        { id: 'notifications-section', label: t('recentAlerts'), icon: <i className="fas fa-bell mr-3 text-red-500"></i> },
        { id: 'settings-section', label: t('settings'), icon: <i className="fas fa-cog mr-3 text-gray-500"></i> },
    ];
    return (
        <div className={`w-64 ${themeColors.sidebarBgClass} p-6 flex flex-col items-center ${themeColors.shadowClass} rounded-r-xl transition-colors duration-300 ${themeColors.sidebarBorderClass} sticky top-0 h-screen overflow-y-auto hidden lg:flex`}>
            <div className="mb-6 text-center">
                <img src={patient.profilePic} alt={t('name')} className={`w-28 h-28 rounded-full border-4 border-blue-500 object-cover mx-auto mb-4 ${themeColors.shadowClass}`} />
                <h3 className={`text-xl font-bold ${themeColors.textColorClass}`}>{patient.fullName || patient.name}</h3>
         <p className={`text-sm text-gray-600 dark:text-gray-400`}>{patient.email || (patient.contact && patient.contact.email)}</p>

            </div>
            <nav className="flex-grow w-full">
                <ul className="space-y-3">
                    {sidebarLinks.map(link => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.id);
                                    if (setIsMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu if called from it
                                }}
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 font-medium
                                    ${activeSection === link.id
                                        ? `bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300`
                                        : `text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30`
                                    }`
                                }
                            >
                                {link.icon} {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

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





/**
 * CurrentHealthStatus Component: Displays a bar chart for PCG metrics.
 * موجودہ صحت کی حالت کمپونینٹ: پی سی جی میٹرکس کے لیے بار چارٹ دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors for chart styling.
 * @param {object} props.pcgMetrics - Object containing S1 Amplitude, S2 Frequency, Murmur Presence, PCG Score.
 * @param {string} props.aiDiagnosis - AI diagnosis (Normal/Abnormal).
 */


const CurrentHealthStatus = ({ t, themeColors, pcgMetrics, aiDiagnosis }) => {
    const pcgData = useMemo(() => ({
        // Labels for the chart bars in the requested order: S1, S2, S3, S4, Murmur, PCG Score
        // چارٹ بارز کے لیے لیبلز مطلوبہ ترتیب میں: S1, S2, S3, S4, مرمر، PCG سکور
        labels: [t('S1'), t('S2'), t('S3'), t('S4'), t('murmurPresence'), t('pcgScore')],
        datasets: [
            {
                label: t('pcgMetrics'),
                // Data points corresponding to the labels order.
                // If s3Presence or s4Presence are not provided, they default to 0.
                // لیبلز کی ترتیب کے مطابق ڈیٹا پوائنٹس۔ اگر s3Presence یا s4Presence فراہم نہیں کیے گئے ہیں، تو وہ 0 پر ڈیفالٹ ہوتے ہیں۔
                data: [
                    pcgMetrics.s1Amplitude,
                    pcgMetrics.s2Frequency,
                    pcgMetrics.s3Presence !== undefined ? pcgMetrics.s3Presence : 0, // S3 Data
                    pcgMetrics.s4Presence !== undefined ? pcgMetrics.s4Presence : 0, // S4 Data
                    pcgMetrics.murmurPresence * 100, // Murmur presence as a percentage
                    pcgMetrics.pcgScore,
                ],
                backgroundColor: [
                    `rgba(${themeColors.primaryRgb}, 0.7)`,    // S1 Color (dynamic from theme)
                    'rgba(75, 192, 192, 0.7)',                 // S2 Color (teal)
                    'rgba(255, 206, 86, 0.7)',                 // S3 Color (Yellow)
                    'rgba(54, 162, 235, 0.7)',                 // S4 Color (Blue)
                    'rgba(255, 99, 132, 0.7)',                 // Murmur Color (red)
                    'rgba(153, 102, 255, 0.7)',                // PCG Score Color (purple)
                ],
                borderColor: [
                    `rgb(${themeColors.primaryRgb})`,          // S1 Border (dynamic from theme)
                    'rgb(75, 192, 192)',                       // S2 Border
                    'rgb(255, 206, 86)',                       // S3 Border
                    'rgb(54, 162, 235)',                       // S4 Border
                    'rgb(255, 99, 132)',                       // Murmur Border
                    'rgb(153, 102, 255)',                      // PCG Score Border
                ],
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    }), [t, themeColors.primaryRgb, pcgMetrics.s1Amplitude, pcgMetrics.s2Frequency, pcgMetrics.murmurPresence, pcgMetrics.pcgScore, pcgMetrics.s3Presence, pcgMetrics.s4Presence]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `${t('currentHealthStatus')} - ${t('aiDiagnosis')}: ${t(aiDiagnosis.toLowerCase())}`,
                color: themeColors.chartTextColor,
                font: {
                    size: 18,
                    weight: 'bold',
                }
            },
            tooltip: {
                backgroundColor: themeColors.cardBgClass ? themeColors.cardBgClass.replace('bg-', '') : 'rgba(0,0,0,0.8)',
                titleColor: themeColors.textColorClass ? themeColors.textColorClass.replace('text-', '') : 'white',
                bodyColor: themeColors.textColorClass ? themeColors.textColorClass.replace('text-', '') : 'white',
                borderColor: themeColors.cardBorderClass ? themeColors.cardBorderClass.replace('border-', '') : 'gray',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            // This section handles the display for S1, S2, S3, S4, Murmur, and PCG Score
                            // یہ سیکشن S1, S2, S3, S4, مرمر، اور PCG سکور کے ڈسپلے کو ہینڈل کرتا ہے۔
                            if (context.label === t('S1') || context.label === t('pcgScore') || context.label === t('S3') || context.label === t('S4')) {
                                label += context.parsed.y; // S1, S3, S4 are unitless scores/amplitudes
                            } else if (context.label === t('S2')) {
                                label += context.parsed.y + ' Hz'; // S2 is frequency
                            } else if (context.label === t('murmurPresence')) {
                                label += (context.parsed.y).toFixed(0) + '%'; // Murmur is a percentage
                            }
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                },
                min: 0,
                max: 100, // Max value for PCG metrics (percentage for murmur, score for others)
            },
        },
    }), [t, themeColors.chartGridColor, themeColors.chartTextColor, themeColors.cardBgClass, themeColors.textColorClass, themeColors.cardBorderClass, aiDiagnosis]);

    return (
        <Card title={t('currentHealthStatus')} className="col-span-full md:col-span-1" themeColors={themeColors}>
            <div className="h-64"> {/* Fixed height for the chart container */}
                {pcgData.datasets[0].data.length > 0 ? (
                    <Bar data={pcgData} options={chartOptions} />
                ) : (
                    <p className={`${themeColors.textColorClass.replace('text-gray-900', 'text-gray-500').replace('text-gray-100', 'text-gray-400')} text-center py-10`}>
                        {t('noHealthStatus')}
                    </p>
                )}
            </div>
        </Card>
    );
};





/**
 * HealthTrends Component: Displays line charts for PCG-related health trends over time.
 * صحت کے رجحانات کمپونینٹ: وقت کے ساتھ پی سی جی سے متعلقہ صحت کے رجحانات کے لیے لائن چارٹ دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors for chart styling.
 */
const HealthTrends = ({ t, themeColors }) => {
    // Generate simulated PCG trend data for the last 12 months
    // پچھلے 12 مہینوں کے لیے نقلی پی سی جی رجحان کا ڈیٹا تیار کریں۔
    const generatePCGTrendData = useCallback(() => {
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // Simulate Heart Rate (e.g., 60-90 bpm, with a slight potential increase over time)
        // دل کی دھڑکن کی نقل کریں (جیسے، 60-90 bpm، وقت کے ساتھ تھوڑا سا ممکنہ اضافہ کے ساتھ)
        const heartRateData = labels.map((_, i) => Math.floor(60 + Math.random() * 20 + (i / 12) * 10));
        // Simulate Murmur Score (e.g., 0: Normal, 1: Mild, 2: Moderate, 3: Severe)
        // Introduce some variation, maybe a slight increase in later months
        // مرمر سکور کی نقل کریں (جیسے، 0: نارمل، 1: ہلکا، 2: معتدل، 3: شدید)
        // کچھ تغیرات متعارف کروائیں، شاید بعد کے مہینوں میں تھوڑا سا اضافہ۔
        const murmurScoreData = labels.map((_, i) => Math.min(3, Math.floor(Math.random() * 2 + (i / 12) * 1)));

        return { labels, heartRateData, murmurScoreData };
    }, []);

    const { labels, heartRateData, murmurScoreData } = useMemo(generatePCGTrendData, [generatePCGTrendData]);

    const heartRateChartData = {
        labels,
        datasets: [
            {
                label: t('pcg_trend_heart_rate'),
                data: heartRateData,
                borderColor: `rgb(${themes.light.primaryRgb})`, // Using theme primary color for consistency
                backgroundColor: `rgba(${themes.light.primaryRgb}, 0.5)`,
                tension: 0.4,
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: `rgb(${themes.light.primaryRgb})`,
                pointBorderColor: themeColors.cardBgClass.replace('bg-', ''), // Use plain color value
                pointHoverRadius: 7,
            },
        ],
    };

    const murmurScoreChartData = {
        labels,
        datasets: [
            {
                label: t('pcg_trend_murmur_score'),
                data: murmurScoreData,
                borderColor: 'rgb(255, 159, 64)', // A distinct color for murmur score
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                tension: 0.4,
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: 'rgb(255, 159, 64)',
                pointBorderColor: themeColors.cardBgClass.replace('bg-', ''), // Use plain color value
                pointHoverRadius: 7,
            },
        ],
    };

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: themeColors.chartTextColor,
                }
            },
            title: {
                display: false, // Title is handled by Card component or H4
            },
            tooltip: {
                backgroundColor: themeColors.cardBgClass.replace('bg-', ''), // Extract color name for background
                titleColor: themeColors.textColorClass.replace('text-', ''), // Extract color name for text
                bodyColor: themeColors.textColorClass.replace('text-', ''),
                borderColor: themeColors.cardBorderClass.replace('border-', ''),
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.dataset.label === t('pcg_trend_murmur_score')) {
                            const score = context.parsed.y;
                            if (score === 0) label += t('normal');
                            else if (score === 1) label += t('mild');
                            else if (score === 2) label += t('moderate');
                            else if (score === 3) label += t('severe');
                        } else {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                }
            },
            y: {
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                },
                min: 0,
                max: 100, // General max for HR/Score scale
            },
        },
    }), [t, themeColors.chartGridColor, themeColors.chartTextColor, themeColors.cardBgClass, themeColors.textColorClass, themeColors.cardBorderClass]);

    const murmurScoreOptions = useMemo(() => ({
        ...chartOptions,
        scales: {
            x: chartOptions.scales.x,
            y: {
                ...chartOptions.scales.y,
                id: 'murmur-score-y-axis', // Unique ID for this scale
                min: -0.5, // Start below 0 for better visual of 'Normal'
                max: 3.5, // Extend slightly beyond max score for better visual
                stepSize: 1, // Ensure integer ticks
                ticks: {
                  ...chartOptions.scales.y.ticks,
                  callback: function (value, index, ticks) {
                    // Only display labels for integer values corresponding to levels
                    // صرف انٹیجر ویلیوز کے لیے لیبلز دکھائیں جو لیولز کے مطابق ہیں۔
                    if (value === 0) return t('normal');
                    if (value === 1) return t('mild');
                    if (value === 2) return t('moderate');
                    if (value === 3) return t('severe');
                    return '';
                  }
                }
            }
        }
    }), [chartOptions, t]);

    return (
        <Card title={t('healthTrends')} className="col-span-full" themeColors={themeColors}>
            <p className={`text-sm mb-4 ${themeColors.textColorClass} opacity-70`}>{t('pcg_value_over_time')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className={`text-lg font-semibold mb-2 ${themeColors.textColorClass}`}>{t('pcg_trend_heart_rate')}</h4>
                    <div className="h-64"> {/* Fixed height for the chart container */}
                        <Line data={heartRateChartData} options={chartOptions} />
                    </div>
                </div>
                <div>
                    <h4 className={`text-lg font-semibold mb-2 ${themeColors.textColorClass}`}>{t('pcg_trend_murmur_score')}</h4>
                    <div className="h-64"> {/* Fixed height for the chart container */}
                        <Line data={murmurScoreChartData} options={murmurScoreOptions} />
                    </div>
                </div>
            </div>
        </Card>
    );
};

/**
 * Footer Component: Displays copyright, quick links, and social media icons.
 * فوٹر کمپونینٹ: کاپی رائٹ، فوری لنکس، اور سوشل میڈیا آئیکنز دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const Footer = ({ t, themeColors }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={`${themeColors.cardBgClass} ${themeColors.cardBorderClass} py-8 text-center text-sm text-gray-600 dark:text-gray-400 mt-8`}>
            <div className="container mx-auto px-4">
                <p>&copy; {currentYear} {t('patientDashboard')}. {t('allRightsReserved')}.</p>
                <div className="mt-4 flex flex-wrap justify-center space-x-6">
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('privacyPolicy')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('termsOfService')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('contactUs')}</a>
                </div>
                <div className="mt-6 flex justify-center space-x-5">
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-facebook-f text-xl"></i></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-twitter text-xl"></i></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-instagram text-xl"></i></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-linkedin-in text-xl"></i></a>
                </div>
            </div>
        </footer>
    );
};

/**
 * PCGWaveform SVG Component: Generates a simple SVG representation of a PCG waveform.
 * پی سی جی ویوفارم ایس وی جی کمپونینٹ: پی سی جی ویوفارم کی ایک سادہ ایس وی جی نمائندگی تیار کرتا ہے۔
 * @param {object} props - Component props.
 * @param {number} props.width - Width of the SVG.
 * @param {number} props.height - Height of the SVG.
 * @param {string} props.strokeColor - Color for the waveform line.
 * @param {string} props.fillColor - Fill color for the area under the waveform.
 * @param {Array<number>} props.data - Array of numerical data points for the waveform.
 */
const PCGWaveform = ({ width = 400, height = 150, strokeColor, fillColor, data }) => {
    if (!data || data.length === 0) {
        return (
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ border: '1px solid currentColor', borderRadius: '8px' }}>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={strokeColor} fontSize="14">
                    No waveform data.
                </text>
            </svg>
        );
    }

    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal;
    const scaleY = (val) => {
        if (range === 0) return height / 2; // Avoid division by zero
        return height - ((val - minVal) / range) * height;
    };

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = scaleY(val);
        return `${x},${y}`;
    }).join('L');

    const pathData = `M${points}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ border: '1px solid currentColor', borderRadius: '8px' }}>
            <defs>
                <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity="0.6"/>
                    <stop offset="100%" stopColor={fillColor} stopOpacity="0"/>
                </linearGradient>
            </defs>
            <path d={pathData} stroke={strokeColor} strokeWidth="2" fill="url(#waveformGradient)" />
            {/* Optional: Add a baseline */}
            {/* اختیاری: ایک بیس لائن شامل کریں */}
            <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
        </svg>
    );
};

/**
 * Main PatientDashboard Component: Orchestrates all sub-components.
 * مرکزی پیشنٹ ڈیش بورڈ کمپونینٹ: تمام ذیلی اجزاء کو منظم کرتا ہے۔
 */
const PatientDashboard = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false); // State for new appointment modal
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // State for cancel confirmation modal
    const [appointmentToCancel, setAppointmentToCancel] = useState(null); // State to hold appointment being cancelled
    const [isReportDetailsModalOpen, setIsReportDetailsModalOpen] = useState(false); // State for report details modal
    const [selectedReport, setSelectedReport] = useState(null); // State to hold selected report for details
    const [isAlertDetailsModalOpen, setIsAlertDetailsModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);

    const [newAppointment, setNewAppointment] = useState({
        doctor: '',
        date: '',
        time: '',
        reason: '',
    });

    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme && themes[savedTheme] ? savedTheme : 'light';
    });
    const [language, setLanguage] = useState(i18n.language);
    const [activeSection, setActiveSection] = useState('dashboard-section'); // State for active section
    const [searchTerm, setSearchTerm] = useState(''); // State for report search term

    // State for live PCG monitoring
    // لائیو پی سی جی مانیٹرنگ کے لیے اسٹیٹ
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [pcgValue, setPcgValue] = useState(72); // Current PCG value
    const [pcgStatus, setPcgStatus] = useState('Normal'); // 'Normal' or 'Irregular'
    const [lastPcgReadingTime, setLastPcgReadingTime] = useState('');
    const [livePcgWaveform, setLivePcgWaveform] = useState([]); // Data points for the live waveform

    // Dummy Data - In a real app, this would come from an API
    // ڈمی ڈیٹا - ایک حقیقی ایپ میں، یہ ایک API سے آئے گا۔
   
    const [patientData, setPatientData] = useState(() => {
        const savedPatient = localStorage.getItem('patientData');
        return savedPatient ? JSON.parse(savedPatient) : {
            id: 'P001',
            name: i18n.language === 'ur' ? "علی خان" : "Ali Khan",
            profilePic: "https://placehold.co/150x150/4F46E5/FFFFFF?text=AK", // Placeholder image
            email: "ali.khan@example.com",
            age: 35,
            gender: i18n.language === 'ur' ? "مرد" : "Male",
            bloodGroup: "A+",
            dob: "1990-05-15",
            allergies: ['Pollen', 'Dust'],
            medicalHistory: [i18n.language === 'ur' ? 'دمہ (2005 سے)' : 'Asthma (since 2005)', i18n.language === 'ur' ? 'موسمی الرجی' : 'Seasonal Allergies'],
            contact: {
                address: '123 Main St, Anytown, State, 12345, Pakistan',
                phone: '+92 3XX XXXXXXX',
                email: 'ali.khan@example.com',
            },
            emergencyContact: {
                name: i18n.language === 'ur' ? 'فاطمہ خان' : 'Fatima Khan',
                relationship: i18n.language === 'ur' ? 'بیوی' : 'Wife',
                phone: '+92 3XX YYYYYYY',
            },
            height: '175 cm',
            weight: '70 kg',
            medicalConditions: ['None'],
        };
    });

    const [editablePatientData, setEditablePatientData] = useState(patientData);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [passwordFields, setPasswordFields] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });


    // State for appointments - now dynamic
    // ملاقاتوں کے لیے اسٹیٹ - اب متحرک
    const [appointments, setAppointments] = useState([
        { id: 'app1', doctorKey: 'doctor_ali_khan', date: '2025-07-10', time: '10:00 AM', reason: 'Annual Check-up', status: 'Scheduled' },
        { id: 'app2', doctorKey: 'doctor_sara_javed', date: '2025-08-01', time: '02:30 PM', reason: 'Follow-up for Cholesterol', status: 'Approved' },
        { id: 'app3', doctorKey: 'doctor_asif_mehmood', date: '2025-07-20', time: '11:00 AM', reason: 'Dermatology Consultation', status: 'Completed' },
        { id: 'app4', doctorKey: 'doctor_aisha_siddiqui', date: '2025-06-05', time: '09:00 AM', reason: 'Pediatric Checkup', status: 'Rejected' },
    ]);

    // State for reports - new dynamic data with PCG details
    // رپورٹس کے لیے اسٹیٹ - پی سی جی تفصیلات کے ساتھ نیا متحرک ڈیٹا
    const [reports, setReports] = useState([
        {
            id: 'rep1', date: '2025-06-15', type: 'PCG Analysis', status: 'Completed', fileUrl: '/path/to/pcg_analysis_rep1.pdf',
            content: 'Detailed PCG analysis. This report confirms stable cardiac health based on the current phonocardiogram data. No immediate concerns identified. This S1 heart sound is clear and crisp, indicating proper closure of the mitral and tricuspid valves. The S2 heart sound is also well-defined, showing normal aortic and pulmonic valve closure. No additional heart sounds or adventitious sounds were detected. The heart rhythm is regular sinus rhythm. All parameters are within normal physiological ranges, indicating healthy heart function. The absence of murmurs suggests no turbulent blood flow within the heart.',
            pcgMetrics: { s1Amplitude: 75, s2Frequency: 120, murmurPresence: 0.05, pcgScore: 88, murmurType: 'None', detectedSounds: ['S1', 'S2'], aiDiagnosis: 'Normal' },
            doctorNotes: 'Patient exhibits excellent cardiac health with normal heart sounds. Continue regular monitoring.',
        },
        {
            id: 'rep2', date: '2025-05-20', type: 'Heart Sound Report', status: 'Completed', fileUrl: '/path/to/heart_sound_rep2.pdf',
            content: 'Heart sound report from latest recording. Clear S1 and S2 sounds. No adventitious sounds. Heart rate average: 70 bpm. The intensity of S1 is normal, and it is appropriately split. S2 is also normal in intensity and splitting. No S3 or S4 gallops. No clicks or snaps. The overall auscultation findings are reassuring. Patient denies any new symptoms of chest pain, shortness of breath, or palpitations. Regular exercise and a balanced diet are recommended for continued cardiovascular well-being.',
            pcgMetrics: { s1Amplitude: 70, s2Frequency: 110, murmurPresence: 0.02, pcgScore: 92, murmurType: 'None', detectedSounds: ['S1', 'S2'], aiDiagnosis: 'Normal' },
            doctorNotes: 'Healthy heart sounds. No murmurs or extra sounds. Maintain current lifestyle.',
        },
        {
            id: 'rep3', date: '2025-04-10', type: 'Murmur Detection Report', status: 'Requires Review', fileUrl: '/path/to/murmur_detection_rep3.pdf',
            content: 'Murmur detection report indicates a faint mid-systolic murmur, Grade II/VI. Further investigation with echocardiogram recommended. Patient should follow up with a cardiologist within 2-4 weeks to assess the nature and significance of the murmur. The murmur is best heard at the apex and radiates towards the axilla. It is likely an innocent murmur, but further imaging will provide definitive clarification and rule out any structural heart disease. Patient remains asymptomatic.',
            pcgMetrics: { s1Amplitude: 60, s2Frequency: 100, murmurPresence: 0.4, pcgScore: 65, murmurType: 'Mid-systolic', detectedSounds: ['S1', 'S2', 'Murmur'], aiDiagnosis: 'Abnormal' },
            doctorNotes: 'Mild systolic murmur detected. Echocardiogram referral for definitive diagnosis.',
        },
        {
            id: 'rep4', date: '2025-03-01', type: 'PCG Baseline Comparison', status: 'Completed', fileUrl: '/path/to/pcg_baseline_rep4.pdf',
            content: 'Comparison with previous PCG data. Stable heart sound characteristics. No significant changes since last examination. This indicates consistent cardiac acoustic patterns, which is a positive sign. The spectral analysis of heart sounds shows no new frequencies or amplitude shifts, reinforcing the stability of cardiac function. This baseline report is crucial for future comparisons to detect any subtle changes early.',
            pcgMetrics: { s1Amplitude: 72, s2Frequency: 115, murmurPresence: 0.01, pcgScore: 90, murmurType: 'None', detectedSounds: ['S1', 'S2'], aiDiagnosis: 'Normal' },
            doctorNotes: 'Baseline PCG remains stable. No significant progression of any findings. Good control.',
        },
        {
            id: 'rep5', date: '2025-02-10', type: 'Heart Sound Report', status: 'Completed', fileUrl: '/path/to/heart_sound_rep5.pdf',
            content: 'Routine heart sound check. All sounds clear, no abnormalities. Resting heart rate 72 bpm. Excellent condition. Patient reports feeling well and has no cardiovascular complaints. Auscultation confirms healthy heart sounds.',
            pcgMetrics: { s1Amplitude: 78, s2Frequency: 125, murmurPresence: 0.0, pcgScore: 95, murmurType: 'None', detectedSounds: ['S1', 'S2'], aiDiagnosis: 'Normal' },
            doctorNotes: 'Excellent heart health. No concerns.',
        },
        {
            id: 'rep6', date: '2025-01-05', type: 'PCG Analysis', status: 'Completed', fileUrl: '/path/to/pcg_analysis_rep6.pdf',
            content: 'Annual PCG scan results. S1/S2 normal, no extra sounds. PCG score 92. Very good cardiovascular health. The advanced algorithms confirm regular heart rhythm and sound morphology. The patient has been compliant with lifestyle recommendations, which is reflected in these healthy findings.',
            pcgMetrics: { s1Amplitude: 80, s2Frequency: 130, murmurPresence: 0.0, pcgScore: 92, murmurType: 'None', detectedSounds: ['S1', 'S2'], aiDiagnosis: 'Normal' },
            doctorNotes: 'Annual check-up confirms normal PCG. Continue healthy lifestyle.',
        },
    ]);

    // State for alerts - now dynamic with types and dismiss status
    // الرٹس کے لیے اسٹیٹ - اب اقسام اور برخاستگی کی حیثیت کے ساتھ متحرک
    const [alerts, setAlerts] = useState([
        { id: 'alert1', type: 'warning', message: 'bloodPressureHigh', timestamp: '2 hours ago', details: 'Your latest blood pressure reading was 145/95 mmHg. Please consult your doctor.', isDismissed: false, source: 'AI' },
        { id: 'alert2', type: 'info', message: 'newLabResults', timestamp: 'yesterday', details: 'New blood test results are available in your reports section. Click to view.', isDismissed: false, source: 'Doctor' },
        { id: 'alert3', type: 'danger', message: 'appointmentReminder', timestamp: '30 mins ago', details: 'Reminder: You have an upcoming appointment with Dr. Ali Khan tomorrow at 10:00 AM.', isDismissed: false, source: 'System' },
        { id: 'alert4', type: 'warning', message: 'pcgStatusIrregular', timestamp: '1 hour ago', details: 'Irregular PCG rhythm detected. Please consult your doctor.', isDismissed: false, source: 'AI' },
    ]);

    // State for medication reminders
    // ادویات کی یاد دہانیوں کے لیے اسٹیٹ
    const [medications, setMedications] = useState([
        { id: 'med1', name: 'Lisinopril', dose: '10mg', time: 'morning', taken: false },
        { id: 'med2', name: 'Aspirin', dose: '81mg', time: 'morning', taken: true },
        { id: 'med3', name: 'Vitamin D', dose: '1000 IU', time: 'afternoon', taken: false },
        { id: 'med4', name: 'Atorvastatin', dose: '20mg', time: 'night', taken: false },
    ]);

    // Simulate new alerts appearing over time
    // وقت کے ساتھ نئے الرٹس ظاہر ہونے کی نقل کریں
    useEffect(() => {
        const alertInterval = setInterval(() => {
            const newAlert = {
                id: `alert${alerts.length + 1}`,
                type: ['info', 'warning', 'danger'][Math.floor(Math.random() * 3)],
                message: `New random alert ${alerts.length + 1}!`,
                timestamp: 'just now',
                details: 'This is a simulated new alert to demonstrate dynamic updates.',
                isDismissed: false,
                source: ['AI', 'Doctor', 'System'][Math.floor(Math.random() * 3)],
            };
            // Only add if not already present to prevent duplicates on re-render
            // صرف اس صورت میں شامل کریں جب پہلے سے موجود نہ ہو تاکہ دوبارہ رینڈر ہونے پر نقل سے بچا جا سکے۔
            setAlerts(prev => {
                if (!prev.some(a => a.id === newAlert.id)) {
                    toast.info(t('newLabResults')); // Using a generic toast message for new alerts
                    return [...prev.filter(a => !a.isDismissed), newAlert];
                }
                return prev;
            });
        }, 60000); // Add a new alert every minute

        return () => clearInterval(alertInterval);
    }, [alerts.length, t]); // Added t to dependency array

    // Refs for scrolling to sections
    // سیکشنز میں سکرول کرنے کے لیے ریفرنسز
    const dashboardRef = useRef(null);
    const profileRef = useRef(null);
    const healthTrendsRef = useRef(null);
    const healthReportsRef = useRef(null); // New ref for health reports
    const appointmentsRef = useRef(null);
    const medicationRef = useRef(null);
    const notificationsRef = useRef(null);
    const settingsRef = useRef(null);

    const sectionRefs = {
        'dashboard-section': dashboardRef,
        'profile-section': profileRef,
        'health-trends-section': healthTrendsRef,
        'health-reports-section': healthReportsRef, // Add new section ref
        'appointments-section': appointmentsRef,
        'medication-section': medicationRef,
        'notifications-section': notificationsRef,
        'settings-section': settingsRef,
    };

    const scrollToSection = useCallback((id) => {
        const element = sectionRefs[id]?.current;
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id); // Update active section state
        }
    }, [sectionRefs]);

    // Get current theme colors dynamically
    // موجودہ تھیم کے رنگ متحرک طور پر حاصل کریں
    const themeColors = themes[currentTheme];

    // Apply dark class to HTML root for Tailwind's dark mode
    // ٹیل ونڈ کے ڈارک موڈ کے لیے HTML روٹ پر ڈارک کلاس لگائیں
    useEffect(() => {
        const root = document.documentElement;
        if (currentTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', currentTheme); // Save theme to local storage
    }, [currentTheme]);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    // Effect to observe scroll position and update active section
    // سکرول پوزیشن کا مشاہدہ کرنے اور فعال سیکشن کو اپ ڈیٹ کرنے کا اثر
    useEffect(() => {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '-50% 0px -50% 0px', // When 50% of the section is in view
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
                // Cleanup observer on component unmount
                // کمپونینٹ ان ماؤنٹ پر آبزرور کو صاف کریں
                observer.disconnect();
            });
        };
    }, [sectionRefs]);


    const toggleTheme = useCallback(() => {
        setCurrentTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            toast.info(t(`Switched to ${newTheme === 'light' ? 'lightTheme' : 'darkTheme'}`)); // Translate toast message
            return newTheme;
        });
    }, [t]);

    const handleLogout = useCallback(() => {
        toast.success(t('logoutSuccess'));
        // Simulate navigation or actual logout process
        // نیویگیشن یا اصل لاگ آؤٹ عمل کی نقل کریں
        // navigate('/login'); // If using React Router, uncomment and set up login route
        console.log("User logged out!");
    }, [t]);

    const handleScheduleAppointment = useCallback((e) => {
        e.preventDefault();
        const { doctor, date, time, reason } = newAppointment;
        if (!doctor || !date || !time || !reason) {
            toast.error(t('fillAllFields'));
            return;
        }

        const newApp = {
            id: `app${appointments.length + 1}`,
            doctorKey: doctor, // Store the doctor's key, not the translated name directly
            date,
            time,
            reason,
            status: 'Scheduled',
        };
        setAppointments(prev => [...prev, newApp]);
        toast.success(t('appointmentScheduledSuccess'));
        setNewAppointment({ doctor: '', date: '', time: '', reason: '' });
        setIsScheduleModalOpen(false); // Close modal on success
    }, [newAppointment, appointments, t]);

    const openCancelModal = useCallback((app) => {
        setAppointmentToCancel(app);
        setIsCancelModalOpen(true);
    }, []);

    const confirmCancelAppointment = useCallback(() => {
        if (appointmentToCancel) {
            const translatedDoctorName = t(appointmentToCancel.doctorKey);
            setAppointments(prev => prev.filter(app => app.id !== appointmentToCancel.id));
            toast.success(t('appointmentCancelled', { doctorName: translatedDoctorName, date: appointmentToCancel.date, time: appointmentToCancel.time }));
            setAppointmentToCancel(null);
            setIsCancelModalOpen(false);
        }
    }, [appointmentToCancel, appointments, t]);

    // Updated doctorsList to use translation keys
    // ڈاکٹرز کی فہرست کو ترجمہ کیز استعمال کرنے کے لیے اپ ڈیٹ کیا گیا
    const doctorsList = useMemo(() => [
        { id: 'd1', nameKey: 'doctor_ali_khan', specialtyKey: 'specialty_cardiologist' },
        { id: 'd2', nameKey: 'doctor_sara_javed', specialtyKey: 'specialty_general_physician' },
        { id: 'd3', nameKey: 'doctor_asif_mehmood', specialtyKey: 'specialty_dermatologist' }, // Corrected name to nameKey
        { id: 'd4', nameKey: 'doctor_aisha_siddiqui', specialtyKey: 'specialty_pediatrician' }, // Corrected name to nameKey
    ], []);

    const dismissAlert = useCallback((id) => {
        setAlerts(prev => prev.map(alert =>
            alert.id === id ? { ...alert, isDismissed: true } : alert
        ));
        toast.info("Alert dismissed!");
    }, []);

    const openAlertDetailsModal = useCallback((alert) => {
        setSelectedAlert(alert);
        setIsAlertDetailsModalOpen(true);
    }, []);

    const filteredAlerts = useMemo(() => alerts.filter(alert => !alert.isDismissed), [alerts]);

    const handleViewReport = useCallback((report) => {
        setSelectedReport(report);
        setIsReportDetailsModalOpen(true);
        toast.info(t('reportViewSuccess', { reportId: report.id }));
    }, [t]);

    const handleDownloadReport = useCallback((report) => {
        // Simulate file download
        // فائل ڈاؤن لوڈ کی نقل کریں
        const link = document.createElement('a');
        link.href = report.fileUrl || `data:text/plain;charset=utf-8,${encodeURIComponent(report.content)}`;
        link.download = `${t(report.type.replace(/\s/g, '').toLowerCase())}_Report_${report.id}.txt`; // Translate and use .txt for simulated content or actual file extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(t('reportDownloadSuccess', { reportId: report.id }));
    }, [t]);

    const filteredReports = useMemo(() => {
        // Filter by search term across id, type (translated), status (translated), and content
        // ID، قسم (ترجمہ شدہ)، اسٹیٹس (ترجمہ شدہ)، اور مواد میں تلاش کی اصطلاح کے ذریعے فلٹر کریں
        return reports.filter(report => {
            const translatedType = t(report.type.replace(/\s/g, '').toLowerCase());
            const translatedStatus = t(report.status.toLowerCase());
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return report.id.toLowerCase().includes(lowerCaseSearchTerm) ||
                   translatedType.toLowerCase().includes(lowerCaseSearchTerm) ||
                   translatedStatus.toLowerCase().includes(lowerCaseSearchTerm) ||
                   report.content.toLowerCase().includes(lowerCaseSearchTerm) ||
                   (report.pcgMetrics?.detectedSounds && report.pcgMetrics.detectedSounds.some(sound => sound.toLowerCase().includes(lowerCaseSearchTerm))) ||
                   (report.pcgMetrics?.aiDiagnosis && t(report.pcgMetrics.aiDiagnosis.toLowerCase()).toLowerCase().includes(lowerCaseSearchTerm));
        });
    }, [reports, searchTerm, t]);

    const markMedicationAsTaken = useCallback((id) => {
        setMedications(prev => prev.map(med =>
            med.id === id ? { ...med, taken: true } : med
        ));
        toast.success(t('medicationTakenSuccess'));
    }, [t]);

    // Simulate live PCG data updates
    // لائیو پی سی جی ڈیٹا اپ ڈیٹس کی نقل کریں
    useEffect(() => {
        let interval;
        if (isMonitoring) {
            interval = setInterval(() => {
                const newValue = Math.floor(60 + Math.random() * 40); // Simulate PCG value between 60-100
                setPcgValue(newValue);
                const currentStatus = newValue > 85 || newValue < 65 ? 'Irregular' : 'Normal';
                setPcgStatus(currentStatus);
                setLastPcgReadingTime(new Date().toLocaleTimeString());

                // Simulate waveform data: a simple sine wave with some noise
                // ویوفارم ڈیٹا کی نقل کریں: کچھ شور کے ساتھ ایک سادہ سائن ویو
                const newWaveformPoint = Math.sin(Date.now() / 100) * 50 + 75 + (Math.random() - 0.5) * 10;
                setLivePcgWaveform(prev => {
                    const updatedWaveform = [...prev, newWaveformPoint];
                    // Keep only the last 100 data points for a smooth, moving waveform
                    // ایک ہموار، متحرک ویوفارم کے لیے صرف آخری 100 ڈیٹا پوائنٹس رکھیں۔
                    return updatedWaveform.slice(-100);
                });
            }, 500); // Update every 0.5 seconds for a more "live" feel
        } else {
            clearInterval(interval);
            setLivePcgWaveform([]); // Clear waveform when not monitoring
        }
        return () => clearInterval(interval);
    }, [isMonitoring]);

    const toggleMonitoring = useCallback(() => {
        setIsMonitoring(prev => !prev);
    }, []);

    // Patient Profile Editing Handlers
    // مریض کی پروفائل میں ترمیم کے ہینڈلرز

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    setPatientData(userData);
    setEditablePatientData(userData);
  }
}, []);

const handleEditProfileChange = useCallback((e) => {
  const { name, value } = e.target;
  setEditablePatientData(prev => ({
    ...prev,
    [name]: value,
    contact: {
      ...prev.contact,
      [name]: value,
    },
    emergencyContact: {
      ...prev.emergencyContact,
      [name]: value,
    },
  }));
}, []);


    const handleCancelEdit = useCallback(() => {
        setEditablePatientData(patientData); // Revert changes
        setIsEditingProfile(false);
    }, [patientData]);

    const handlePasswordChange = useCallback(() => {
        const { currentPassword, newPassword, confirmNewPassword } = passwordFields;
        if (newPassword !== confirmNewPassword) {
            toast.error(t('passwordMismatch'));
            return;
        }
        // In a real app, you'd send currentPassword to backend for verification
        // and then update the password.
        // ایک حقیقی ایپ میں، آپ تصدیق کے لیے موجودہ پاس ورڈ کو بیک اینڈ پر بھیجیں گے
        // اور پھر پاس ورڈ کو اپ ڈیٹ کریں گے۔
        if (currentPassword === 'password123') { // Dummy check
            toast.success(t('passwordChangeSuccess'));
            setPasswordFields({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        } else {
            toast.error(t('passwordChangeError'));
        }
    }, [passwordFields, t]);


    // Filter upcoming appointments (next 30 days)
    // آنے والی ملاقاتوں کو فلٹر کریں (اگلے 30 دن)
    const upcomingAppointments = useMemo(() => {
        const now = new Date();
        return appointments.filter(appt => {
            const apptDate = new Date(appt.date);
            return appt.status === 'Scheduled' && apptDate >= now && (apptDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 30;
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [appointments]);

    // Determine latest heart status based on PCG metrics from most recent PCG Analysis report
    // تازہ ترین پی سی جی تجزیہ رپورٹ سے پی سی جی میٹرکس کی بنیاد پر دل کی تازہ ترین حالت کا تعین کریں
    const latestHeartStatus = useMemo(() => {
        const latestPcgReport = reports.find(report => report.type === 'PCG Analysis' && report.pcgMetrics?.aiDiagnosis);
        return latestPcgReport ? latestPcgReport.pcgMetrics.aiDiagnosis : 'Unknown';
    }, [reports]);

    const lastPcgReportTime = useMemo(() => {
        const latestPcgReport = reports.find(report => report.type === 'PCG Analysis' && report.date);
        return latestPcgReport ? latestPcgReport.date : t('no_pcg_data');
    }, [reports, t]);

    const nextAppointmentSummary = useMemo(() => {
        if (upcomingAppointments.length > 0) {
            const nextAppt = upcomingAppointments[0];
            return `${t(nextAppt.doctorKey)} on ${nextAppt.date} at ${nextAppt.time}`;
        }
        return t('no_upcoming_appointments_short');
    }, [upcomingAppointments, t]);

    return (
        <div className={`min-h-screen flex flex-col lg:flex-row ${themeColors.backgroundClass} ${themeColors.textColorClass} transition-colors duration-300 font-sans`}
             style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}> {/* Apply font smoothing */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={i18n.language === 'ur'}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={currentTheme === 'dark' ? 'dark' : 'light'}
                limit={3}
            />

            {/* Sidebar - only visible on large screens */}
            {/* سائیڈبار - صرف بڑی اسکرینوں پر نظر آتا ہے */}
            <Sidebar
                t={t}
                patient={patientData}
                themeColors={themeColors}
                scrollToSection={scrollToSection}
                activeSection={activeSection}
                setIsMobileMenuOpen={setIsMobileMenuOpen} // Pass for mobile close
            />

            {/* Mobile Menu (Hidden on large screens, toggled by NavBar) */}
            {/* موبائل مینو (بڑی اسکرینوں پر چھپا ہوا، نیو بار کے ذریعے ٹوگل کیا جاتا ہے) */}
            <Transition appear show={isMobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={() => setIsMobileMenuOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className={`relative flex flex-col w-full max-w-xs ${themeColors.sidebarBgClass} ${themeColors.textColorClass} py-4 pb-12 ${themeColors.shadowClass}`}>
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-2xl font-bold">{t('dashboard')}</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                {/* Mobile Sidebar Content - Reuse Sidebar for consistency */}
                                {/* موبائل سائیڈبار مواد - مستقل مزاجی کے لیے سائیڈبار کا دوبارہ استعمال کریں */}
                                <div className="mt-5 px-2">
                                    <Sidebar
                                        t={t}
                                        patient={patientData}
                                        themeColors={themeColors}
                                        scrollToSection={scrollToSection}
                                        activeSection={activeSection}
                                        setIsMobileMenuOpen={setIsMobileMenuOpen} // Pass this to close menu
                                    />
                                    <div className="mt-4 px-4">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
                                        >
                                            <i className="fas fa-sign-out-alt mr-2"></i> {t('logout')}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <div className="flex-1 flex flex-col overflow-hidden">
                <NavBar
                    t={t}
                    currentThemeName={currentTheme}
                    toggleTheme={toggleTheme}
                    language={language}
                    setLanguage={setLanguage}
                    onLogout={handleLogout}
                    themeColors={themeColors}
                    scrollToSection={scrollToSection}
                    activeSection={activeSection}
                    setIsMobileMenuOpen={setIsMobileMenuOpen} // Pass for mobile menu
                />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                    {/* Dashboard Overview Section */}
                    {/* ڈیش بورڈ کا جائزہ سیکشن */}
                    <section ref={dashboardRef} id="dashboard-section" className={`${themeColors.cardBgClass} p-6 rounded-xl ${themeColors.shadowClass} ${themeColors.cardBorderClass}`}>
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="text-center sm:text-left mb-4 sm:mb-0">
                                <h1 className={`text-3xl font-extrabold ${themeColors.textColorClass}`}>
                                    {t('welcomePatient', { patientName: patientData.name })}
                                </h1>
                                <p className={`text-gray-600 dark:text-gray-400 mt-1 text-lg`}>{t('dashboardOverview')}</p>
                            </div>
                        </div>
                    </section>

                    {/* Health Summary Cards */}
                    {/* صحت کا خلاصہ کارڈز */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card title={t('latestHeartStatus')} themeColors={themeColors}>
                            <div className="flex items-center justify-between">
                                <p className={`text-4xl font-extrabold ${latestHeartStatus === 'Normal' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {t(`heart_status_${latestHeartStatus.toLowerCase()}`)}
                                </p>
                                <HeartIcon className={`w-10 h-10 ${latestHeartStatus === 'Normal' ? 'text-emerald-500' : 'text-rose-500'}`} />
                            </div>
                        </Card>

                        <Card title={t('lastPCGReadingTime')} themeColors={themeColors}>
                            <div className="flex items-center justify-between">
                                <p className={`text-2xl font-bold ${themeColors.textColorClass}`}>
                                    {lastPcgReportTime !== t('no_pcg_data') ? lastPcgReportTime : t('no_pcg_data')}
                                </p>
                                <ClockIcon className={`w-10 h-10 ${themeColors.iconColorClass}`} />
                            </div>
                        </Card>

                        <Card title={t('totalReports')} themeColors={themeColors}>
                            <div className="flex items-center justify-between">
                                <p className={`text-4xl font-extrabold ${themeColors.textColorClass}`}>{reports.length}</p>
                                <DocumentTextIcon className={`w-10 h-10 ${themeColors.iconColorClass}`} />
                            </div>
                        </Card>

                        <Card title={t('nextAppointment')} themeColors={themeColors}>
                            <div className="flex flex-col justify-between h-full">
                                <p className={`text-md font-semibold ${themeColors.textColorClass}`}>
                                    {nextAppointmentSummary}
                                </p>
                                <CalendarDaysIcon className={`w-10 h-10 ${themeColors.iconColorClass} self-end`} />
                            </div>
                        </Card>
                    </section>

                    {/* Live PCG Monitoring Section */}
                    {/* لائیو پی سی جی مانیٹرنگ سیکشن */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LivePCGMonitoring
                            t={t}
                            themeColors={themeColors}
                            isMonitoring={isMonitoring}
                            toggleMonitoring={toggleMonitoring}
                            pcgStatus={pcgStatus}
                            pcgValue={pcgValue}
                            lastReadingTime={lastPcgReadingTime}
                        />
                        <Card title={t('pcg_waveform')} className="col-span-full md:col-span-1" themeColors={themeColors}>
                            <div className="h-64 flex items-center justify-center">
                                {isMonitoring ? (
                                    <PCGWaveform
                                        width={400}
                                        height={150}
                                        strokeColor={themeColors.waveformStroke}
                                        fillColor={themeColors.waveformFill}
                                        data={livePcgWaveform}
                                    />
                                ) : (
                                    <p className={`${themeColors.textColorClass} opacity-80`}>{t('noSignal')}</p>
                                )}
                            </div>
                        </Card>
                    </section>

                    {/* Current Health Status (PCG Metrics Chart) */}
                    {/* موجودہ صحت کی حالت (پی سی جی میٹرکس چارٹ) */}
                    <section>
                        <CurrentHealthStatus
                            t={t}
                            themeColors={themeColors}
                            pcgMetrics={reports.find(r => r.type === 'PCG Analysis')?.pcgMetrics || { s1Amplitude: 0, s2Frequency: 0, murmurPresence: 0, pcgScore: 0 }}
                            aiDiagnosis={latestHeartStatus}
                        />
                    </section>

                    {/* Health Trends Section - Now with PCG data */}
                    {/* صحت کے رجحانات سیکشن - اب پی سی جی ڈیٹا کے ساتھ */}
                    <section ref={healthTrendsRef} id="health-trends-section">
                        <HealthTrends t={t} themeColors={themeColors} />
                    </section>

                    {/* My Reports Section - New Section with Search, View, Download */}
                    {/* میری رپورٹس سیکشن - تلاش، دیکھنے، ڈاؤن لوڈ کے ساتھ نیا سیکشن */}
                    <section ref={healthReportsRef} id="health-reports-section">
                        <Card title={t('healthReports')} themeColors={themeColors}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder={t('searchReportsPlaceholder')}
                                    className={`p-2 rounded-md w-full ${themeColors.cardBgClass} ${themeColors.textColorClass} border ${themeColors.cardBorderClass} focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
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
                                                    {t('detectedSounds')}
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('aiDiagnosis')}
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
                                                        {t(report.type.replace(/\s/g, '').toLowerCase())} {/* Translate report type */}
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                                        {report.pcgMetrics?.detectedSounds?.join(', ') || 'N/A'}
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                                        <StatusBadge status={report.pcgMetrics?.aiDiagnosis || 'Normal'} type="health" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <StatusBadge status={report.status} type="report" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handleViewReport(report)}
                                                            className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                                        >
                                                            <DocumentTextIcon className="h-4 w-4 mr-1" /> {t('view')}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDownloadReport(report)}
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
                                <p className={`${themeColors.textColorClass} opacity-80 text-center py-8`}>{t('noReportsFound')}</p>
                            )}
                        </Card>
                    </section>

                    {/* Appointments Section */}
                    {/* ملاقاتوں کا سیکشن */}
                    <section ref={appointmentsRef} id="appointments-section">
                        <Card
                            title={t('appointments')}
                            themeColors={themeColors}
                            headerContent={
                                <button
                                    onClick={() => setIsScheduleModalOpen(true)}
                                    className={`${themeColors.buttonPrimaryClass} px-4 py-2 rounded-md flex items-center`}
                                >
                                    <CalendarDaysIcon className="h-5 w-5 mr-2" /> {t('scheduleNewAppointment')}
                                </button>
                            }
                        >
                            {appointments.length > 0 ? (
                                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('doctorName')}
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('date')}
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('time')}
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('reason')}
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
                                            {appointments.map((app) => (
                                                <tr key={app.id} className={`${themeColors.cardBgClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150`}>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeColors.textColorClass}`}>
                                                        {t(app.doctorKey)}
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                                        {app.date}
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                                        {app.time}
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                                        {app.reason}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <StatusBadge status={app.status} type="appointment" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        {app.status === 'Scheduled' && (
                                                            <button
                                                                onClick={() => openCancelModal(app)}
                                                                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                                                            >
                                                                {t('cancel')}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className={`${themeColors.textColorClass} opacity-80`}>{t('noUpcomingAppointments')}</p>
                            )}
                        </Card>
                    </section>

                    {/* Medication Section */}
                    {/* ادویات کا سیکشن */}
                    <section ref={medicationRef} id="medication-section">
                        <Card title={t('medicationReminders')} themeColors={themeColors}>
                            <p className={`${themeColors.textColorClass} opacity-80 mb-4`}>{t('medication_list')}.</p>
                            {medications.length > 0 ? (
                                <ul className="mt-4 space-y-3">
                                    <AnimatePresence>
                                        {medications.map((med) => (
                                            <motion.li
                                                key={med.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                className={`p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center
                                                    ${med.taken ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700' : `${themeColors.appointmentBgClass} ${themeColors.appointmentBorderClass}`}
                                                `}
                                            >
                                                <div className="flex items-center flex-grow">
                                                    <PencilSquareIcon className={`h-6 w-6 mr-3 ${med.taken ? 'text-emerald-600' : 'text-blue-500'}`} />
                                                    <div>
                                                        <p className="font-semibold text-lg">{t('medicationName')}: {med.name} {med.dose}</p>
                                                        <p className="text-sm opacity-90">
                                                            {t('time')}: {t(med.time.toLowerCase())}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-3 sm:mt-0 flex space-x-2 items-center">
                                                    <StatusBadge status={med.taken ? 'Taken' : 'Pending'} type="medication" />
                                                    {!med.taken && (
                                                        <button
                                                            onClick={() => markMedicationAsTaken(med.id)}
                                                            className={`${themeColors.buttonPrimaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                                        >
                                                            <CheckCircleIcon className="h-4 w-4 mr-1" /> {t('mark_as_taken')}
                                                        </button>
                                                    )}
                                                </div>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>
                            ) : (
                                <p className={`${themeColors.textColorClass} opacity-80`}>{t('noMedicationReminders')}</p>
                            )}
                        </Card>
                    </section>

                    {/* Notifications Section */}
                    {/* اطلاعات کا سیکشن */}
                    <section ref={notificationsRef} id="notifications-section">
                        <Card title={t('recentAlerts')} themeColors={themeColors}>
                            {filteredAlerts.length > 0 ? (
                                <ul className="mt-4 space-y-3">
                                    <AnimatePresence>
                                        {filteredAlerts.map((alert) => (
                                            <motion.li
                                                key={alert.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                className={`p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center
                                                    ${alert.type === 'info' ? themeColors.alertInfoBgClass :
                                                    alert.type === 'warning' ? themeColors.alertWarningBgClass :
                                                    themeColors.alertDangerBgClass}
                                                    ${alert.type === 'info' ? themeColors.alertInfoBorderClass :
                                                    alert.type === 'warning' ? themeColors.alertWarningBorderClass :
                                                    themeColors.alertDangerBorderClass}
                                                `}
                                            >
                                                <div className="flex items-start flex-grow">
                                                    {alert.type === 'info' && <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />}
                                                    {alert.type === 'warning' && <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 dark:text-amber-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />}
                                                    {alert.type === 'danger' && <MegaphoneIcon className="h-6 w-6 text-rose-600 dark:text-rose-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />}
                                                    <div>
                                                        <p className="font-semibold text-lg">{t(alert.message)}</p>
                                                        <p className="text-sm opacity-90">{alert.details}</p>
                                                        <p className="text-xs opacity-70 mt-1">{alert.timestamp} (Source: {alert.source})</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3 sm:mt-0 flex space-x-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => openAlertDetailsModal(alert)}
                                                        className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm`}
                                                    >
                                                        {t('viewAlertDetails')}
                                                    </button>
                                                    <button
                                                        onClick={() => dismissAlert(alert.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                                                    >
                                                        {t('dismiss')}
                                                    </button>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>
                            ) : (
                                <p className={`${themeColors.textColorClass} opacity-80`}>{t('noAlertsMessage')}</p>
                            )}
                            <button className={`${themeColors.buttonSecondaryClass} mt-6 px-4 py-2 rounded-md w-full`}>
                                {t('viewAllAlerts')}
                            </button>
                        </Card>
                    </section>







{/* Profile Section - Pro Max Design */}
{/* پروفائل سیکشن - پرو میکس ڈیزائن */}
<section ref={profileRef} id="profile-section" className="mb-12">
  <Card
    title={t('profile')}
    themeColors={themeColors}
    // Card component ka background aur text color poora dark mode compatible banaya gaya hai.
    // Transition classes smooth dark/light mode switching ke liye hain.
    // Yakeen karein ke aapka 'Card' component 'className' prop ko sahi tareeqay se merge karta hai.
    className="relative overflow-hidden rounded-[2rem] shadow-2xl p-10
                bg-white dark:bg-gray-900
                text-gray-900 dark:text-gray-100
                transition-colors duration-300 ease-in-out"
  >
    {/* Profile Header */}
    {/* پروفائل ہیڈر */}
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="relative group">
        <motion.img
          src={editablePatientData.profilePic || patientData.profilePic}
          alt={editablePatientData.name || patientData.name}
          // Border color dark mode mein bhi visible rehne chahiye
          // بارڈر کا رنگ ڈارک موڈ میں بھی نظر آنا چاہیے۔
          className={`w-36 h-36 rounded-full border-4 border-indigo-500 dark:border-indigo-400 object-cover ${themeColors.shadowClass}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        {isEditingProfile && (
          <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profilePicUpload"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setEditablePatientData((prev) => ({ ...prev, profilePic: reader.result }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label
              htmlFor="profilePicUpload"
              className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg shadow hover:bg-blue-700 cursor-pointer"
            >
              {t('change')}
            </label>
            <button
              className="bg-red-600 text-white text-xs px-3 py-1 rounded-lg shadow hover:bg-red-700"
              onClick={() => setEditablePatientData((prev) => ({ ...prev, profilePic: '' }))}
            >
              {t('remove')}
            </button>
          </div>
        )}
        {/* Online status indicator */}
        {/* آن لائن اسٹیٹس انڈیکیٹر */}
        <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800"></span>
      </div>
      {/* Name and ID text colors adjusted for dark mode */}
      {/* نام اور ID کے متن کے رنگ ڈارک موڈ کے لیے ایڈجسٹ کیے گئے ہیں۔ */}
      <h3 className={`text-3xl font-extrabold mt-4 ${themeColors.textColorClass}`}>{editablePatientData.name || patientData.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">ID: {editablePatientData.id || patientData.id}</p>
    </div>

    {isEditingProfile ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[ 'name', 'age', 'gender', 'bloodGroup', 'dob', 'height', 'weight' ].map((label) => (
          <div key={label} className="col-span-1">
            <label className="block text-sm font-bold mb-2 capitalize text-gray-700 dark:text-gray-200">
              {t(label)}
            </label>
            <input
              type={label === 'dob' ? 'date' : label === 'age' ? 'number' : 'text'}
              name={label}
              value={editablePatientData[label] || ''}
              onChange={handleEditProfileChange}
              placeholder={t(label)}
              // Input field styling for dark mode
              // ڈارک موڈ کے لیے ان پٹ فیلڈ اسٹائلنگ
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-800
                         text-gray-900 dark:text-white
                         rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
          </div>
        ))}

        {['phone', 'email'].map((label) => (
          <div key={label} className="col-span-1">
            <label className="block text-sm font-bold mb-2 capitalize text-gray-700 dark:text-gray-200">
              {t(label)}
            </label>
            <input
              type={label === 'email' ? 'email' : 'text'}
              name={label}
              value={editablePatientData.contact?.[label] || ''}
              onChange={(e) => {
                const value = e.target.value;
                setEditablePatientData((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    [label]: value,
                  },
                }));
              }}
              placeholder={t(label)}
              // Input field styling for dark mode
              // ڈارک موڈ کے لیے ان پٹ فیلڈ اسٹائلنگ
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-800
                         text-gray-900 dark:text-white
                         rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-200">{t('address')}</label>
          <textarea
            name="address"
            value={editablePatientData.contact?.address || ''}
            onChange={(e) => {
              const value = e.target.value;
              setEditablePatientData((prev) => ({
                ...prev,
                contact: {
                  ...prev.contact,
                  address: value,
                },
              }));
            }}
            placeholder={t('address')}
            rows="2"
            // Textarea styling for dark mode
            // ڈارک موڈ کے لیے ٹیکسٹ ایریا اسٹائلنگ
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800
                       text-gray-900 dark:text-white
                       rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
          ></textarea>
        </div>

        {['name', 'phone', 'relationship'].map((field) => (
          <div key={field} className="col-span-1">
            <label className="block text-sm font-bold mb-2 capitalize text-gray-700 dark:text-gray-200">
              {`${t('emergencyContact')} ${t(field)}`}
            </label>
            <input
              type="text"
              name={field}
              value={editablePatientData.emergencyContact?.[field] || ''}
              onChange={(e) => {
                const value = e.target.value;
                setEditablePatientData((prev) => ({
                  ...prev,
                  emergencyContact: {
                    ...prev.emergencyContact,
                    [field]: value,
                  },
                }));
              }}
              placeholder={t(field)}
              // Input field styling for dark mode
              // ڈارک موڈ کے لیے ان پٹ فیلڈ اسٹائلنگ
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-800
                         text-gray-900 dark:text-white
                         rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
          </div>
        ))}

        {['medicalConditions', 'allergies'].map((field) => (
          <div key={field} className="md:col-span-2">
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-200">{t(field)}</label>
            <textarea
              name={field}
              value={Array.isArray(editablePatientData[field]) ? editablePatientData[field].join(', ') : editablePatientData[field] || ''}
              onChange={(e) => {
                const value = e.target.value.split(',').map((item) => item.trim());
                setEditablePatientData((prev) => ({
                  ...prev,
                  [field]: value,
                }));
              }}
              placeholder={t(field)}
              rows="2"
              // Textarea styling for dark mode
              // ڈارک موڈ کے لیے ٹیکسٹ ایریا اسٹائلنگ
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-800
                         text-gray-900 dark:text-white
                         rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            ></textarea>
          </div>
        ))}

        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          <button
            onClick={handleCancelEdit}
            // Button colors adjusted for dark mode
            // بٹن کے رنگ ڈارک موڈ کے لیے ایڈجسٹ کیے گئے ہیں۔
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition"
          >
            {t('cancelEdit')}
          </button>
          <button
            onClick={async () => {
              try {
                const payload = {
                  id: editablePatientData.id || patientData.id,
                  ...editablePatientData,
                  contact: { ...editablePatientData.contact },
                  emergencyContact: { ...editablePatientData.emergencyContact },
                  medicalConditions: Array.isArray(editablePatientData.medicalConditions)
                    ? editablePatientData.medicalConditions
                    : (editablePatientData.medicalConditions || '')
                        .split(',')
                        .map((item) => item.trim()),
                  allergies: Array.isArray(editablePatientData.allergies)
                    ? editablePatientData.allergies
                    : (editablePatientData.allergies || '')
                        .split(',')
                        .map((item) => item.trim()),
                };

                const token = localStorage.getItem("token");

                if (!token || token === "null") {
                  toast.error("🔒 Session expired. Please login again.");
                  localStorage.clear();
                  navigate("/login");
                  return;
                }

                let decoded;
                try {
                  decoded = JSON.parse(atob(token.split('.')[1]));
                  if (decoded.exp * 1000 < Date.now()) {
                    toast.error("⏰ Session expired. Logging out...");
                    localStorage.removeItem("token");
                    setTimeout(() => {
                      window.location.href = "/login";
                    }, 1000);
                    return;
                  }
                } catch (err) {
                  toast.error("⚠️ Invalid token. Please login again.");
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                  return;
                }

                const response = await axios.post(
                  "http://localhost:5000/api/patient/profile",
                  payload,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

// setEditablePatientData(response.data.profile); // ✅ correct object
// setPatientData(response.data.profile); 

//      setEditablePatientData(response.data); 
// setPatientData(response.data);         
// setIsEditingProfile(false);            
// toast.success("Profile updated successfully");
         
               setEditablePatientData(response.data.profile);
setPatientData(response.data.profile);
setIsEditingProfile(false);
toast.success("✅ Profile updated successfully");
 

              } catch (error) {
                console.error("❌ Failed to save:", error);
                const message =
                  error.response?.data?.message ||
                  error.response?.data?.msg ||
                  (error.response?.status === 404
                    ? "❌ API not found (404)"
                    : error.response?.status === 401
                    ? "🔒 Unauthorized or Token expired"
                    : "❌ Failed to save profile");

                toast.error(message);
              }
            }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition"
          >
            {t('saveChanges')}
          </button>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <p><strong>{t('name')}:</strong> <span className="dark:text-gray-200">{patientData.name}</span></p>
          <p><strong>{t('email')}:</strong> <span className="dark:text-gray-200">{patientData.contact?.email}</span></p>
          <p><strong>{t('phone')}:</strong> <span className="dark:text-gray-200">{patientData.contact?.phone}</span></p>
          <p><strong>{t('gender')}:</strong> <span className="dark:text-gray-200">{patientData.gender}</span></p>
          <p><strong>{t('age')}:</strong> <span className="dark:text-gray-200">{patientData.age}</span></p>
          <p><strong>{t('dob')}:</strong> <span className="dark:text-gray-200">{patientData.dob}</span></p>
        </div>
        <div>
          <p><strong>{t('bloodType')}:</strong> <span className="dark:text-gray-200">{patientData.bloodGroup}</span></p>
          <p><strong>{t('height')}:</strong> <span className="dark:text-gray-200">{patientData.height}</span></p>
          <p><strong>{t('weight')}:</strong> <span className="dark:text-gray-200">{patientData.weight}</span></p>
          <p><strong>{t('address')}:</strong> <span className="dark:text-gray-200">{patientData.contact?.address}</span></p>
          <p><strong>{t('medicalConditions')}:</strong> <span className="dark:text-gray-200">{Array.isArray(patientData.medicalConditions) ? patientData.medicalConditions.join(', ') : patientData.medicalConditions || 'N/A'}</span></p>
          <p><strong>{t('allergies')}:</strong> <span className="dark:text-gray-200">{Array.isArray(patientData.allergies) ? patientData.allergies.join(', ') : patientData.allergies || 'N/A'}</span></p>
        </div>
        <div className="md:col-span-2">
          <p><strong>{t('emergencyContact')} {t('name')}:</strong> <span className="dark:text-gray-200">{patientData.emergencyContact?.name}</span></p>
          <p><strong>{t('emergencyContact')} {t('phone')}:</strong> <span className="dark:text-gray-200">{patientData.emergencyContact?.phone}</span></p>
          <p><strong>{t('emergencyContact')} {t('relationship')}:</strong> <span className="dark:text-gray-200">{patientData.emergencyContact?.relationship}</span></p>
        </div>
        <button
          onClick={() => { setIsEditingProfile(true); setEditablePatientData(patientData); }} // Populate editable data
          className="bg-indigo-600 text-white mt-6 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition col-span-full"
        >
          {t('editProfile')}
        </button>
      </div>
    )}
  </Card>
</section>




{/* Settings Section */}
{/* سیٹنگز سیکشن */}
<section ref={settingsRef} id="settings-section">
    <Card title={t('settings')} themeColors={themeColors}>
        <p className={`${themeColors.textColorClass} opacity-80`}>Manage your dashboard settings.</p>
        <div className="mt-4 space-y-4">
            <div>
                <label htmlFor="theme-select" className="block text-sm font-medium">Theme</label>
                <select
                    id="theme-select"
                    value={currentTheme}
                    onChange={toggleTheme}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${themeColors.cardBgClass} ${themeColors.textColorClass}`}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div>
                <label htmlFor="language-select" className="block text-sm font-medium">Language</label>
                <select
                    id="language-select"
                    value={i18n.language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${themeColors.cardBgClass} ${themeColors.textColorClass}`}
                >
                    <option value="en">English</option>
                    <option value="ur">اردو</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>
        </div>
    </Card>
</section>
</main>
<Footer t={t} themeColors={themeColors} />
</div>
                  


{/* Schedule Appointment Modal */}
{/* ملاقات کا شیڈول موڈل */}
<Transition appear show={isScheduleModalOpen} as={Fragment}>
  <Dialog as="div" className="relative z-50" onClose={() => setIsScheduleModalOpen(false)}>
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

            <form
  onSubmit={async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("📦 Token:", token); // <-- 👀 SEE IN CONSOLE

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAppointment),
      });

      const data = await response.json();
      console.log("📥 Response:", data); // 👀 see if error or success

      if (response.ok) {
        toast.success("Appointment created!");
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  }}
>


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
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  className={`mt-2 block w-full rounded-xl border border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-4 py-3`}
                  required
                >
                  <option value="">{t('selectDoctor')}</option>
                {doctorsList.map(doctor => (
             <option key={doctor._id} value={doctor._id}>
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
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
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
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
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
                  onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                  className={`mt-2 block w-full rounded-xl border border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-4 py-3`}
                  required
                ></textarea>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-gray-300 dark:border-gray-600 ${themeColors.buttonSecondaryClass} hover:opacity-90 transition`}
                  onClick={() => setIsScheduleModalOpen(false)}
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

{/* Cancel Appointment Modal — Pro-Max Design */}
{/* ملاقات منسوخ کریں موڈل - پرو میکس ڈیزائن */}
<Transition appear show={isCancelModalOpen} as={Fragment}>
  <Dialog as="div" className="relative z-50" onClose={() => setIsCancelModalOpen(false)}>
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
                onClick={() => setIsCancelModalOpen(false)}
              >
                {t('close')}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                onClick={confirmCancelAppointment}
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




            {/* Report Details Modal */}
            {/* رپورٹ کی تفصیلات کا موڈل */}
            <Transition appear show={isReportDetailsModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsReportDetailsModalOpen(false)}>
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
                                        <button onClick={() => setIsReportDetailsModalOpen(false)} className={`${themeColors.buttonSecondaryClass} p-1 rounded-full`}>
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </Dialog.Title>
                                    <div className="mt-4 space-y-4">
                                        <p className="text-sm font-semibold flex justify-between"><span>{t('date')}: {selectedReport?.date}</span> <span>{t('status')}: <StatusBadge status={selectedReport?.status} type="report" /></span></p>

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
                                                    data={Array.from({length: 100}, (_, i) => Math.sin(i / 10) * (selectedReport.pcgMetrics.s1Amplitude / 2) + (selectedReport.pcgMetrics.s2Frequency / 2))} // Dummy waveform from metrics
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
                                            onClick={() => setIsReportDetailsModalOpen(false)}
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

            {/* Alert Details Modal */}
            {/* الرٹ کی تفصیلات کا موڈل */}
            <Transition appear show={isAlertDetailsModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAlertDetailsModalOpen(false)}>
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
                                        {t('alertDetails')} - {selectedAlert?.title}
                                        <button onClick={() => setIsAlertDetailsModalOpen(false)} className={`${themeColors.buttonSecondaryClass} p-1 rounded-full`}>
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <div className="flex items-center mb-3">
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
                                            onClick={() => { dismissAlert(selectedAlert.id); setIsAlertDetailsModalOpen(false); }}
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
        </div>
    );
};

export default PatientDashboard;

