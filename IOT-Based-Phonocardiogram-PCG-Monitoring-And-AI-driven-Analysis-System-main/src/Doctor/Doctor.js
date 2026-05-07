// --- doctor.js ---
// --- React Imports ---
import React, { useState, useEffect, useCallback, Fragment, useMemo, useRef } from 'react';
// --- Charting Library Imports ---
import { Bar, Line } from 'react-chartjs-2';
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
// --- Animation and UI Components Imports ---
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
// --- Heroicons Imports ---
import {
    ExclamationCircleIcon, CheckCircleIcon, XMarkIcon,
    SunIcon, MoonIcon, CalendarDaysIcon, HeartIcon,
    Bars3Icon, ExclamationTriangleIcon,
    DocumentArrowDownIcon, DocumentTextIcon, UserCircleIcon, PhoneIcon,
    EnvelopeIcon, UserGroupIcon, ClipboardDocumentListIcon,
    MagnifyingGlassIcon, PlusIcon, ArrowUturnLeftIcon, CloudArrowUpIcon
} from '@heroicons/react/24/outline';
// --- Toast Notification Library Imports ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/React-Toastify.css';
// --- Internationalization (i18n) Imports ---
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
// --- React Router Imports ---
// import { useNavigate } from 'react-router-dom'; // This import is not used in the provided code, commenting out.

// NOTE: For Font Awesome icons (e.g., <i className="fas fa-home"></i>) to display,
// you need to include the Font Awesome CDN in your public/index.html file's <head> section:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" xintegrity="sha512-Fo3rlalK+l3Zg3F/A6P4n/p5F5D0V5v1hA1UqM6B/N4bL5a6J4P1F2P7W3f5H8O/w2zQ8y2F6w6bQ7t6X5A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

// --- i18n Configuration ---
// Configures i18n for language translation, providing English and Urdu translations.
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "patientDashboard": "Patient Dashboard",
                    "home": "Home",
                    "reports": "Reports",
                    "appointments": "Appointments",
                    "messages": "Messages",
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
                    "myReports": "My Reports",
                    "myAppointments": "My Appointments",
                    "profile": "Profile",
                    "patient_info": "Patient Information",
                    "settings": "Settings",
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
                    "pcgValue": "Current PCG Value: {{value}} bpm",
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
                    "s1Amplitude": "S1 Amplitude",
                    "s2Frequency": "S2 Frequency",
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
                    "extrasystole": "Extrasystole",
                    "valvedisorder": "Valve Disorder",
                    "extrasounds": "Extra Sounds",
                    "abnormal": "Abnormal",
                    "s3presence": "S3 Presence",
                    "s4presence": "S4 Presence",
                    "classificationresult": "Classification Result",
                    "murmurtype": "Murmur Type",
                    "doctoNotes": "Doctor's Notes",
                    "pcgWaveform": "PCG Waveform",
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
                    "currentPcgClassification": "Current PCG Classification:",
                    "overallStatus": "Overall Status:",
                    "recentPcgClassifications": "Recent PCG Classifications",
                    "last5Minutes": "Last 5 Minutes",
                    "last30Minutes": "Last 30 Minutes",
                    "lastHour": "Last Hour",
                    "averageHeartRate": "Average Heart Rate (bpm)",
                    "averageMurmurScore": "Average Murmur Score",
                    "lastValue": "Last Value: {{value}}",
                    "chartDataAvailable": "Chart data available for {{patientName}}",
                    "noChartData": "No chart data available for {{patientName}}.",
                    "doctorDashboard": "Doctor Dashboard",
                    "myPatients": "My Patients",
                    "pendingReviews": "Pending Reviews",
                    "consultations": "Consultations",
                    "mySchedule": "My Schedule",
                    "welcomeDoctor": "Welcome, Dr. {{doctorName}}!",
                    "doctorOverview": "Here's an overview of your practice.",
                    "totalPatients": "Total Patients",
                    "newPatientsToday": "New Patients Today",
                    "patientsAwaitingReview": "Patients Awaiting Review",
                    "patientName": "Patient Name",
                    "lastVisit": "Last Visit",
                    "nextAppointment": "Next Appointment",
                    "viewProfile": "View Profile",
                    "noPatientsFound": "No patients found.",
                    "searchPatientsPlaceholder": "Search patients...",
                    "reviewType": "Review Type",
                    "patientDetails": "Patient Details",
                    "assignedTo": "Assigned To",
                    "noPendingReviews": "No pending reviews.",
                    "messagePatient": "Message Patient",
                    "consultationRequests": "Consultation Requests",
                    "noConsultationRequests": "No consultation requests.",
                    "viewRequest": "View Request",
                    "dailySchedule": "Daily Schedule",
                    "noAppointmentsToday": "No appointments today.",
                    "addAppointment": "Add Appointment",
                    "appointmentType": "Appointment Type",
                    "meetingLink": "Meeting Link (Optional)",
                    "appointmentSuccess": "Appointment added successfully!",
                    "consultationWith": "Consultation with {{patientName}}",
                    "scheduledFor": "Scheduled for",
                    "duration": "Duration",
                    "patientContact": "Patient Contact",
                    "viewCalendar": "View Full Calendar",
                    "totalAppointmentsToday": "Total Appointments Today",
                    "completedAppointments": "Completed Appointments",
                    "cancelledAppointments": "Cancelled Appointments",
                    "clinicHours": "Clinic Hours",
                    "upcoming": "Upcoming",
                    "completed": "Completed",
                    "missed": "Missed",
                    "newConsultationRequest": "New Consultation Request",
                    "patientIdPlaceholder": "Enter Patient ID",
                    "consultationReason": "Reason for Consultation",
                    "submitRequest": "Submit Request",
                    "requestSentSuccess": "Consultation request sent!",
                    "patientID": "Patient ID",
                    "allRightsReserved": "All rights reserved",
                    "dedicatedToHealthcare": "Dedicated to enhancing healthcare management.",
                    "quickLinks": "Quick Links",
                    "support": "Support",
                    "pcgTrendOverTime": "PCG Trend Over Time",
                    "pcgAlertIrregular": "Irregular PCG detected: {{value}} bpm",
                    "heartHealthData": "Heart Health Data",
                    "patientPcgReports": "Patient PCG Reports",
                    "livePcgMonitoring": "Live PCG Monitoring",
                    "searchReports": "Search Reports",
                    "pcgAudio": "PCG Audio",
                    "pcgImage": "PCG Image",
                    "pcgVideo": "PCG Video",
                    "noReportsFoundForPatient": "No reports found for this patient.",
                    "searchByPatientId": "Search by Patient ID",
                    "enterPatientId": "Enter Patient ID",
                    "patientNotFound": "Patient with ID {{patientId}} not found.",
                    "recentReports": "Recent Reports",
                    "downloadReport": "Download Report",
                    "playAudio": "Play Audio",
                    "viewImage": "View Image",
                    "playVideo": "Play Video",
                    "fileFormat": "File Format",
                    "uploadNewReport": "Upload New Report",
                    "morning": "صبح",
                    "afternoon": "دوپہر",
                    "evening": "شام",
                    "night": "رات",
                    "online": "آن لائن",
                    "inPerson": "شخصی",
                    "followUp": "فالو اپ",
                    "review": "جائزہ",
                    "respond": "جواب دیں",
                    "accept": "قبول کریں",
                    "decline": "رد کریں",
                    "approve": "منظور کریں",
                    "declineReview": "جائزہ مسترد کریں",
                    "reschedule": "دوبارہ شیڈول کریں",
                    "markCompleted": "مکمل کے طور پر نشان زد کریں",
                    "markMissed": "غائب کے طور پر نشان زد کریں",
                    "save": "محفوظ کریں",
                    "Profile updated successfully!": "پروفائل کامیابی سے اپ ڈیٹ ہو گئی!",
                    "specialty": "خصوصی مہارت",
                    "phone": "فون",
                    "address": "پتہ",
                    "bio": "تعارف",
                    "gender": "جنس",
                    "dob": "تاریخ پیدائش",
                    "clinicHours": "کلینک کے اوقات",
                    "male": "مرد",
                    "female": "عورت",
                    "other": "دیگر",
                    "uploadHeartSound": "دل کی آواز کی فائل اپ لوڈ کریں", // New
                    "selectFile": "دل کی آواز کی فائل منتخب کریں (مثلاً .wav, .mp3)", // New
                    "noFileSelected": "کوئی فائل منتخب نہیں کی گئی", // New
                    "analyze": "دل کی آواز کا تجزیہ کریں", // New
                    "analyzing": "تجزیہ ہو رہا ہے...", // New
                    "analysisComplete": "تجزیہ مکمل!", // New
                    "uploadSuccess": "دل کی آواز کامیابی سے اپ لوڈ اور تجزیہ ہو گئی!", // New
                    "uploadFailed": "دل کی آواز کا تجزیہ کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔", // New
                    "modelClassification": "ماڈل کی درجہ بندی", // New
                    "simulatedAnalysis": "نقلی تجزیہ کا نتیجہ", // New
                    "patientIdForAnalysis": "تجزیہ کے لیے مریض کی ID", // New
                    "enterPatientIdForAnalysis": "تجزیہ کے لیے مریض کی ID درج کریں", // New
                    "analysisReport": "تجزیہ رپورٹ", // New
                }
            },
            ur: { // Urdu translations
                translation: {
                    "patientDashboard": "مریض کا ڈیش بورڈ",
                    "home": "ہوم",
                    "reports": "رپورٹس",
                    "appointments": "اپائنٹمنٹس",
                    "messages": "پیغامات",
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
                    "myReports": "میری رپورٹس",
                    "myAppointments": "میری اپائنٹمنٹس",
                    "profile": "پروفائل",
                    "patient_info": "مریض کی معلومات",
                    "settings": "سیٹنگز",
                    "logout": "لاگ آؤٹ",
                    "welcomePatient": "خوش آمدید، {{patientName}}!",
                    "dashboardOverview": "آپ کی صحت کی حالت کا ایک جائزہ یہاں ہے.",
                    "totalReports": "کل رپورٹس",
                    "upcomingAppointments": "آنے والی اپائنٹمنٹس",
                    "activeAlerts": "فعال الرٹس",
                    "healthReports": "صحت کی رپورٹس",
                    "searchReportsPlaceholder": "رپورٹس تلاش کریں...",
                    "reportId": "رپورٹ ID",
                    "date": "تاریخ",
                    "type": "قسم",
                    "reasonForVisit": "دورے کی وجہ",
                    "status": "حالت",
                    "actions": "کارروائیاں",
                    "view": "دیکھیں",
                    "download": "ڈاؤن لوڈ کریں",
                    "noReportsFound": "کوئی رپورٹ نہیں ملی.",
                    "reportDetails": "رپورٹ کی تفصیلات",
                    "fullReportContentPlaceholder": "تفصیلی طبی نتائج اور سفارشات یہاں ہوں گی.",
                    "gotIt": "سمجھ گیا!",
                    "appointmentWith": "{{doctorName}} کے ساتھ اپائنٹمنٹ",
                    "details": "تفصیلات",
                    "cancel": "منسوخ کریں",
                    "noUpcomingAppointments": "کوئی آنے والی اپائنٹمنٹ نہیں.",
                    "scheduleNewAppointment": "نئی اپائنٹمنٹ شیڈول کریں",
                    "doctorName": "ڈاکٹر کا نام",
                    "appointmentDate": "اپائنٹمنٹ کی تاریخ",
                    "appointmentTime": "اپائنٹمنٹ کا وقت",
                    "reasonForAppointment": "اپائنٹمنٹ کی وجہ",
                    "schedule": "شیڈول کریں",
                    "appointmentScheduledSuccess": "اپائنٹمنٹ کامیابی سے شیڈول ہو گئی!",
                    "cancelAppointmentPrompt": "کیا آپ واقعی یہ اپائنٹمنٹ منسوخ کرنا چاہتے ہیں؟",
                    "confirmCancel": "منسوخی کی تصدیق کریں",
                    "cancelSuccess": "اپائنٹمنٹ کامیابی سے منسوخ ہو گئی!",
                    "recentAlerts": "حالیہ الرٹس",
                    "noRecentAlerts": "کوئی حالیہ الرٹ نہیں.",
                    "livePCG": "لائیو PCG مانیٹرنگ",
                    "pcgStatusNormal": "PCG حالت: نارمل",
                    "pcgStatusIrregular": "PCG حالت: بے قاعدہ",
                    "pcgValue": "موجودہ PCG ویلیو: {{value}} bpm",
                    "currentHealthStatus": "موجودہ صحت کی حالت",
                    "noHealthStatus": "کوئی صحت کی حالت دستیاب نہیں.",
                    "heartHealthMetrics": "دل کی صحت کے میٹرکس",
                    "heartRate": "دل کی دھڑکن",
                    "cholesterol": "کولیسٹرول",
                    "heartHealthStatus": "دل کی صحت کی حالت",
                    "riskAssessment": "خطرے کا اندازہ",
                    "viewDetails": "تفصیلات دیکھیں",
                    "heartRateWarning": "آپ کے دل کی دھڑکن تھوڑی اونچی ہے.",
                    "cholesterolWarning": "آپ کے کولیسٹرول کی سطح اونچی ہے.",
                    "overallRiskLow": "مجموعی خطرہ: کم",
                    "overallRiskMedium": "مجموعی خطرہ: درمیانہ",
                    "overallRiskHigh": "مجموعی خطرہ: زیادہ",
                    "patientOverview": "مریض کا جائزہ",
                    "healthTrends": "صحت کے رجحانات",
                    "dailyActivity": "روزانہ کی سرگرمی",
                    "sleepPatterns": "نیند کے پیٹرن",
                    "medicationReminders": "ادویات کی یاد دہانیاں",
                    "noMedicationReminders": "کوئی ادویات کی یاد دہانی نہیں.",
                    "medicationName": "دوا",
                    "dose": "خوراک",
                    "time": "وقت",
                    "taken": "لی گئی",
                    "markAsTaken": "لی گئی کے طور پر نشان زد کریں",
                    "medicationTakenSuccess": "دوا لی گئی کے طور پر نشان زد ہو گئی!",
                    "trendType": "رجحان کی قسم",
                    "chartTitle": "صحت کا رجحان: {{type}}",
                    "bloodSugar": "بلڈ شوگر",
                    "weight": "وزن",
                    "activityLevel": "سرگرمی کی سطح",
                    "caloriesBurned": "جلائی گئی کیلوریز",
                    "steps": "قدم",
                    "distance": "فاصلہ (کلومیٹر)",
                    "activityGoal": "سرگرمی کا ہدف",
                    "averageSleep": "اوسط نیند",
                    "quality": "معیار",
                    "noSleepData": "نیند کا کوئی ڈیٹا دستیاب نہیں.",
                    "sleepQualityGood": "نیند کا معیار: اچھا",
                    "sleepQualityFair": "نیند کا معیار: مناسب",
                    "sleepQualityPoor": "نیند کا معیار: خراب",
                    "lastChecked": "آخری بار چیک کیا گیا: {{time}}",
                    "viewAllAlerts": "تمام الرٹس دیکھیں",
                    "logoutSuccess": "کامیابی سے لاگ آؤٹ ہو گئے!",
                    "fillAllFields": "براہ کرم اپائنٹمنٹ کی تمام تفصیلات پُر کریں.",
                    "reportDownloadSuccess": "رپورٹ {{reportId}} کامیابی سے ڈاؤن لوڈ ہو گئی!",
                    "reportViewSuccess": "رپورٹ {{reportId}} کی تفصیلات دیکھی جا رہی ہیں.",
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
                    "privacyPolicy": "پرائیویسی پالیسی",
                    "termsOfService": "سروس کی شرائط",
                    "contactUs": "ہم سے رابطہ کریں",
                    "allRightsReserved": "تمام حقوق محفوظ ہیں.",
                    "dedicatedToHealthcare": "صحت کی دیکھ بھال کو بہتر بنانے کے لیے وقف.",
                    "quickLinks": "فوری لنکس",
                    "support": "سپورٹ",
                    "pcgTrendOverTime": "PCG رجحان وقت کے ساتھ",
                    "pcgAlertIrregular": "بے قاعدہ PCG کا پتہ چلا: {{value}} bpm",
                    "heartHealthData": "دل کی صحت کا ڈیٹا",
                    "patientPcgReports": "مریض کی PCG رپورٹس",
                    "livePcgMonitoring": "لائیو PCG مانیٹرنگ",
                    "searchReports": "رپورٹس تلاش کریں",
                    "pcgAudio": "PCG آڈیو",
                    "pcgImage": "PCG تصویر",
                    "pcgVideo": "PCG ویڈیو",
                    "noReportsFoundForPatient": "اس مریض کے لیے کوئی رپورٹ نہیں ملی.",
                    "searchByPatientId": "مریض کی ID سے تلاش کریں",
                    "enterPatientId": "مریض کی ID درج کریں",
                    "patientNotFound": "مریض ID {{patientId}} کے ساتھ نہیں ملا.",
                    "recentReports": "حالیہ رپورٹس",
                    "downloadReport": "رپورٹ ڈاؤن لوڈ کریں",
                    "playAudio": "آڈیو چلائیں",
                    "viewImage": "تصویر دیکھیں",
                    "playVideo": "ویڈیو چلائیں",
                    "fileFormat": "فائل فارمیٹ",
                    "uploadNewReport": "نئی رپورٹ اپ لوڈ کریں",
                    "morning": "صبح",
                    "afternoon": "دوپہر",
                    "evening": "شام",
                    "night": "رات",
                    "online": "آن لائن",
                    "inPerson": "شخصی",
                    "followUp": "فالو اپ",
                    "review": "جائزہ",
                    "respond": "جواب دیں",
                    "accept": "قبول کریں",
                    "decline": "رد کریں",
                    "approve": "منظور کریں",
                    "declineReview": "جائزہ مسترد کریں",
                    "reschedule": "دوبارہ شیڈول کریں",
                    "markCompleted": "مکمل کے طور پر نشان زد کریں",
                    "markMissed": "غائب کے طور پر نشان زد کریں",
                    "save": "محفوظ کریں",
                    "Profile updated successfully!": "پروفائل کامیابی سے اپ ڈیٹ ہو گئی!",
                    "specialty": "خصوصی مہارت",
                    "phone": "فون",
                    "address": "پتہ",
                    "bio": "تعارف",
                    "gender": "جنس",
                    "dob": "تاریخ پیدائش",
                    "clinicHours": "کلینک کے اوقات",
                    "male": "مرد",
                    "female": "عورت",
                    "other": "دیگر",
                    "uploadHeartSound": "دل کی آواز کی فائل اپ لوڈ کریں",
                    "selectFile": "دل کی آواز کی فائل منتخب کریں (مثلاً .wav, .mp3)",
                    "noFileSelected": "کوئی فائل منتخب نہیں کی گئی",
                    "analyze": "دل کی آواز کا تجزیہ کریں",
                    "analyzing": "تجزیہ ہو رہا ہے...",
                    "analysisComplete": "تجزیہ مکمل!",
                    "uploadSuccess": "دل کی آواز کامیابی سے اپ لوڈ اور تجزیہ ہو گئی!",
                    "uploadFailed": "دل کی آواز کا تجزیہ کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔",
                    "modelClassification": "ماڈل کی درجہ بندی",
                    "simulatedAnalysis": "نقلی تجزیہ کا نتیجہ",
                    "patientIdForAnalysis": "تجزیہ کے لیے مریض کی ID",
                    "enterPatientIdForAnalysis": "تجزیہ کے لیے مریض کی ID درج کریں",
                    "analysisReport": "تجزیہ رپورٹ",
                    "s3presence": "S3 موجودگی", // New translation
                    "s4presence": "S4 موجودگی", // New translation
                }
            }
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
// Defines light and dark themes with specific Tailwind CSS classes for styling.
const themes = {
    light: {
        name: 'Light',
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
        alertInfoBgClass: 'bg-blue-50',
        alertInfoBorderClass: 'border-blue-100',
        alertWarningBgClass: 'bg-amber-50',
        alertWarningBorderClass: 'border-amber-200',
        alertDangerBgClass: 'bg-rose-50',
        alertDangerBorderClass: 'border-rose-200',
        buttonPrimaryClass: 'bg-blue-600 hover:bg-blue-700 text-white',
        buttonSecondaryClass: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        iconColorClass: 'text-gray-600',
        chartGridColor: 'rgba(209, 213, 219, 0.2)',
        chartTextColor: 'rgb(75, 85, 99)',
        primaryRgb: '59, 130, 246',
        secondaryRgb: '99, 102, 241',
        progressBgClass: 'bg-gray-200',
        progressFillClass: 'bg-blue-500',
        waveformStroke: '#3B82F6',
        waveformFill: 'rgba(59, 130, 246, 0.1)',
        activeNavLink: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
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
        alertInfoBgClass: 'bg-blue-900/30',
        alertInfoBorderClass: 'border-blue-800',
        alertWarningBgClass: 'bg-amber-900/30',
        alertWarningBorderClass: 'border-amber-800',
        alertDangerBgClass: 'bg-rose-900/30',
        alertDangerBorderClass: 'border-rose-800',
        buttonPrimaryClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        buttonSecondaryClass: 'bg-gray-600 hover:bg-gray-500 text-gray-100',
        iconColorClass: 'text-gray-300',
        chartGridColor: 'rgba(75, 85, 99, 0.3)',
        chartTextColor: 'rgb(209, 213, 219)',
        primaryRgb: '156, 163, 175',
        secondaryRgb: '156, 163, 175',
        progressBgClass: 'bg-gray-700',
        progressFillClass: 'bg-gray-400',
        waveformStroke: '#60A5FA',
        waveformFill: 'rgba(96, 165, 250, 0.15)',
        activeNavLink: 'bg-indigo-900/50 text-indigo-300'
    },
};

// --- Utility Components ---

/**
 * StatusBadge Component: Displays a colored badge based on status and type.
 * @param {object} props - Component props.
 * @param {string} props.status - The status text to display.
 * @param {string} props.type - The category of the status (e.g., 'health', 'report', 'alert').
 * @param {string} [props.className=''] - Additional CSS classes.
 */
const StatusBadge = ({ status, type, className = '' }) => {
    const baseClasses = 'px-3 py-1 rounded-full font-semibold text-xs inline-flex items-center justify-center';
    let specificClasses = '';
    const { t } = useTranslation();

    // Defines styling for different status types
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
        alert: {
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
            'Reviewed': 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
            'Declined': 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        appointment: {
            'Scheduled': 'bg-sky-100 text-sky-800 dark:bg-sky-700 dark:text-sky-100',
            'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Cancelled': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'Rescheduled': 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100',
            'Missed': 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        consultation: {
            'New Request': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Responded': 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
            'Closed': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
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
        },
        pcgClassification: {
            'Normal': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Murmur': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Abnormal': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'Extrasystole': 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100',
            'Valve Disorder': 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100',
            'Extra Sounds': 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        }
    };

    specificClasses = STATUS_STYLES[type]?.[status] || STATUS_STYLES[type]?.default || STATUS_STYLES.default.default;

    return (
        <span className={`${baseClasses} ${specificClasses} ${className}`}>
            {t(status.toLowerCase().replace(/\s/g, ''))} {/* Ensure translation key matches lowercase, no-space version */}
        </span>
    );
};

/**
 * Card Component: A reusable card container with a title and optional header content.
 * Provides a consistent look and feel for various sections of the dashboard.
 * @param {object} props - Component props.
 * @param {string} [props.title] - The title of the card.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} [props.className=''] - Additional CSS classes for the card.
 * @param {React.ReactNode} [props.headerContent] - Optional content to display in the card header.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {string} [props.id] - Optional ID for the card (for scrolling).
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
 * PCGWaveform SVG Component: Generates a simple SVG representation of a PCG waveform.
 * Used to visualize heart sound data, now including S3 and S4.
 * @param {object} props - Component props.
 * @param {number} props.width - Width of the SVG.
 * @param {number} props.height - Height of the SVG.
 * @param {string} props.strokeColor - Color for the waveform line.
 * @param {string} props.fillColor - Fill color for the area under the waveform.
 * @param {boolean} [props.s3Presence=false] - Whether to show S3 sound marker.
 * @param {boolean} [props.s4Presence=false] - Whether to show S4 sound marker.
 */
const PCGWaveform = ({ width = 400, height = 150, strokeColor, fillColor, s3Presence = false, s4Presence = false }) => {
    // Generates points to create a waveform-like path
    const points = [];
    const numPoints = 100;
    const peakHeight = height * 0.4;
    const midline = height / 2;

    for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * width;
        let y;
        // Simulates two "heart sound" peaks (S1 and S2)
        if (i < numPoints * 0.15) {
            y = midline - peakHeight * Math.sin((i / (numPoints * 0.15)) * Math.PI);
        } else if (i > numPoints * 0.3 && i < numPoints * 0.45) {
            y = midline - (peakHeight * 0.6) * Math.sin(((i - numPoints * 0.3) / (numPoints * 0.15)) * Math.PI);
        } else {
            y = midline + (Math.random() - 0.5) * 5; // Adds some noise
        }
        points.push(`${x},${y}`);
    }

    const pathData = `M${points.join('L')}`;

    // Define positions for S1, S2, S3, S4 markers
    const s1Pos = points[Math.floor(numPoints * 0.07)];
    const s2Pos = points[Math.floor(numPoints * 0.37)];
    const s3Pos = points[Math.floor(numPoints * 0.55)]; // After S2, before next S1 (simulated)
    const s4Pos = points[Math.floor(numPoints * 0.02)]; // Before S1 (simulated)

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ border: '1px solid currentColor', borderRadius: '8px' }}>
            {/* Defines a gradient for filling the waveform area */}
            <defs>
                <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity="0.6"/>
                    <stop offset="100%" stopColor={fillColor} stopOpacity="0"/>
                </linearGradient>
            </defs>
            {/* Draws the waveform path */}
            <path d={pathData} stroke={strokeColor} strokeWidth="2" fill="url(#waveformGradient)" />
            {/* Draws the midline */}
            <line x1="0" y1={midline} x2={width} y2={midline} stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />

            {/* S1 Marker */}
            {s1Pos && (
                <>
                    <circle cx={s1Pos.split(',')[0]} cy={s1Pos.split(',')[1]} r="3" fill="red" />
                    <text x={s1Pos.split(',')[0]} y={parseFloat(s1Pos.split(',')[1]) - 10} textAnchor="middle" fill={strokeColor} fontSize="10">S1</text>
                </>
            )}

            {/* S2 Marker */}
            {s2Pos && (
                <>
                    <circle cx={s2Pos.split(',')[0]} cy={s2Pos.split(',')[1]} r="3" fill="red" />
                    <text x={s2Pos.split(',')[0]} y={parseFloat(s2Pos.split(',')[1]) - 10} textAnchor="middle" fill={strokeColor} fontSize="10">S2</text>
                </>
            )}

            {/* S3 Marker (if present) */}
            {s3Presence && s3Pos && (
                <>
                    <circle cx={s3Pos.split(',')[0]} cy={s3Pos.split(',')[1]} r="3" fill="orange" />
                    <text x={s3Pos.split(',')[0]} y={parseFloat(s3Pos.split(',')[1]) - 10} textAnchor="middle" fill="orange" fontSize="10">S3</text>
                </>
            )}

            {/* S4 Marker (if present) */}
            {s4Presence && s4Pos && (
                <>
                    <circle cx={s4Pos.split(',')[0]} cy={s4Pos.split(',')[1]} r="3" fill="purple" />
                    <text x={s4Pos.split(',')[0]} y={parseFloat(s4Pos.split(',')[1]) - 10} textAnchor="middle" fill="purple" fontSize="10">S4</text>
                </>
            )}
        </svg>
    );
};

/**
 * DoctorOverview Component: Displays key metrics for the doctor's practice.
 * This is the first section on the dashboard, providing a summary of the practice's status.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {object} props.metrics - Object containing metrics (totalPatients, newPatientsToday, patientsAwaitingReview).
 */
const DoctorOverview = ({ t, themeColors, metrics }) => (
    <Card title={t('doctorOverview')} themeColors={themeColors} className="col-span-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Total Patients Card */}
            <div className={`p-4 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass} flex flex-col items-center justify-center`}>
                <UserGroupIcon className={`h-12 w-12 text-blue-500 mb-2 ${themeColors.iconColorClass}`} />
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300">{metrics.totalPatients}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('totalPatients')}</p>
            </div>
            {/* New Patients Today Card */}
            <div className={`p-4 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass} flex flex-col items-center justify-center`}>
                <PlusIcon className={`h-12 w-12 text-emerald-500 mb-2 ${themeColors.iconColorClass}`} />
                <h3 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{metrics.newPatientsToday}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('newPatientsToday')}</p>
            </div>
            {/* Patients Awaiting Review Card */}
            <div className={`p-4 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass} flex flex-col items-center justify-center`}>
                <ClipboardDocumentListIcon className={`h-12 w-12 text-amber-500 mb-2 ${themeColors.iconColorClass}`} />
                <h3 className="text-3xl font-bold text-amber-700 dark:text-amber-300">{metrics.patientsAwaitingReview}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('patientsAwaitingReview')}</p>
            </div>
        </div>
    </Card>
);

/**
 * MyPatientsTable Component: Displays a searchable table of patients under the doctor's care.
 * Allows viewing individual patient profiles.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.patients - List of patient data.
 * @param {function} props.onViewPatientProfile - Callback when "View Profile" is clicked.
 */
const MyPatientsTable = ({ t, themeColors, patients, onViewPatientProfile }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filters patients based on the search term for name or ID.
    const filteredPatients = useMemo(() => {
        return patients.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [patients, searchTerm]);

    return (
        <Card title={t('myPatients')} themeColors={themeColors} className="col-span-full">
            {/* Search Input for Patients */}
            <div className="mb-4">
                <div className="relative">
                    <MagnifyingGlassIcon className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${themeColors.iconColorClass}`} />
                    <input
                        type="text"
                        placeholder={t('searchPatientsPlaceholder')}
                        className={`pl-10 p-2 rounded-md w-full ${themeColors.cardBgClass} ${themeColors.textColorClass} border ${themeColors.cardBorderClass} focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Patients Table */}
            {filteredPatients.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('patientID')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('patientName')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('lastVisit')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('nextAppointment')}
                                </th>
                                <th scope="col" className={`px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                    {t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className={`${themeColors.cardBgClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150`}>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeColors.textColorClass}`}>
                                        {patient.id}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {patient.name}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {patient.lastVisit || 'N/A'}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                        {patient.nextAppointment || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => onViewPatientProfile(patient.id)}
                                            className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                        >
                                            <UserCircleIcon className="h-4 w-4 mr-1" /> {t('viewProfile')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className={`${themeColors.textColorClass} opacity-80 text-center py-8`}>{t('noPatientsFound')}</p>
            )}
        </Card>
    );
};

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
const LivePcgMonitoring = ({ t, themeColors, livePcgData, pcgHistory, chartGridColor, chartTextColor }) => {
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

/**
 * PatientPcgReports Component: Displays patient PCG reports with search and filter functionality.
 * Allows doctors to view and download specific reports. Can be filtered by patient ID.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.reports - List of PCG reports.
 * @param {string|null} props.viewedPatientId - ID of the patient whose reports are being viewed.
 * @param {function} props.onBackToAllPatients - Callback to go back to all patients view.
 * @param {function} props.onViewReportDetails - Callback to view report details.
 * @param {function} props.onDownloadReport - Callback to download report.
 */
const PatientPcgReports = ({ t, themeColors, reports, viewedPatientId, onBackToAllPatients, onViewReportDetails, onDownloadReport }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All'); // e.g., 'PCG Analysis', 'Heart Sound Report'

    // Memoizes available report types for the filter dropdown
    const reportTypes = useMemo(() => {
        const types = [...new Set(reports.map(r => r.type))];
        return ['All', ...types];
    }, [reports]);

    // Filters reports based on search term and selected report type
    const filteredReports = useMemo(() => {
        return reports.filter(report => {
            const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  t(report.type.replace(/\s/g, '').toLowerCase()).toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  t(report.classification?.toLowerCase().replace(/\s/g, '') || '').toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'All' || report.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [reports, searchTerm, filterType, t]);

    return (
        <Card title={`${t('patientPcgReports')} ${viewedPatientId ? `(Patient ID: ${viewedPatientId})` : ''}`} themeColors={themeColors} className="col-span-full">
            {/* Back button visible when viewing reports for a specific patient */}
            {viewedPatientId && (
                <button
                    onClick={onBackToAllPatients}
                    className={`${themeColors.buttonSecondaryClass} px-4 py-2 rounded-md mb-4 flex items-center transition-transform transform hover:scale-105`}
                >
                    <ArrowUturnLeftIcon className="h-5 w-5 mr-2" /> {t('Back to Dashboard')}
                </button>
            )}

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Search Input */}
                <div className="relative flex-grow">
                    <MagnifyingGlassIcon className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${themeColors.iconColorClass}`} />
                    <input
                        type="text"
                        placeholder={t('searchReportsPlaceholder')}
                        className={`pl-10 p-2 rounded-md w-full ${themeColors.cardBgClass} ${themeColors.textColorClass} border ${themeColors.cardBorderClass} focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Type Filter Dropdown */}
                <select
                    className={`p-2 rounded-md ${themeColors.cardBgClass} ${themeColors.textColorClass} border ${themeColors.cardBorderClass} focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    {reportTypes.map(type => (
                        <option key={type} value={type}>{t(type.replace(/\s/g, '').toLowerCase()) || type}</option>
                    ))}
                </select>

                {/* Upload New Report Button (placeholder functionality) */}
                <button
                    className={`${themeColors.buttonPrimaryClass} px-4 py-2 rounded-md flex items-center`}
                >
                    <PlusIcon className="h-5 w-5 mr-2" /> {t('uploadNewReport')}
                </button>
            </div>

            {/* Reports Table */}
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
                                    {t('classificationresult')}
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
                                        {t(report.type.replace(/\s/g, '').toLowerCase())}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {report.classification && <StatusBadge status={report.classification} type="pcgClassification" />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusBadge status={report.status} type="report" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => onViewReportDetails(report)}
                                            className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                        >
                                            <DocumentTextIcon className="h-4 w-4 mr-1" /> {t('view')}
                                        </button>
                                        <button
                                            onClick={() => onDownloadReport(report)}
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
                <p className={`${themeColors.textColorClass} opacity-80 text-center py-8`}>
                    {viewedPatientId ? t('noReportsFoundForPatient') : t('noReportsFound')}
                </p>
            )}
        </Card>
    );
};

/**
 * PendingReviews Component: Displays reports or requests that require the doctor's review.
 * Allows the doctor to approve, decline, or view details of each review item.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.pendingReviews - List of items pending review.
 * @param {function} props.onApproveReview - Callback to approve a review.
 * @param {function} props.onDeclineReview - Callback to decline a review.
 * @param {function} props.onViewDetails - Callback to view details of a review.
 */
const PendingReviews = ({ t, themeColors, pendingReviews, onApproveReview, onDeclineReview, onViewDetails }) => {
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

/**
 * ConsultationRequests Component: Manages and displays patient consultation requests.
 * Doctors can view, accept, decline, and initiate new consultation requests.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.consultationRequests - List of consultation requests.
 * @param {function} props.onAcceptRequest - Callback to accept a request.
 * @param {function} props.onDeclineRequest - Callback to decline a request.
 * @param {function} props.onViewRequest - Callback to view request details.
 * @param {function} props.onSubmitNewRequest - Callback to submit a new request.
 */
const ConsultationRequests = ({ t, themeColors, consultationRequests, onAcceptRequest, onDeclineRequest, onViewRequest, onSubmitNewRequest }) => {
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

/**
 * DoctorSchedule Component: Displays the doctor's daily and upcoming appointments,
 * as well as completed, cancelled, and missed appointments.
 * Allows adding new appointments and managing existing ones.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<object>} props.appointments - List of doctor's appointments.
 * @param {function} props.onAddAppointment - Callback to add a new appointment.
 * @param {function} props.onRescheduleAppointment - Callback to reschedule an appointment.
 * @param {function} props.onCancelAppointment - Callback to cancel an appointment.
 * @param {function} props.onMarkAppointment - Callback to mark an appointment as completed/missed.
 */
const DoctorSchedule = ({ t, themeColors, appointments, onAddAppointment, onRescheduleAppointment, onCancelAppointment, onMarkAppointment }) => {
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

/**
 * DoctorProfile Component: Allows the doctor to view and edit their profile information.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {object} props.doctorData - Current doctor profile data.
 * @param {function} props.onProfileUpdate - Callback to update doctor profile data.
 */
const DoctorProfile = ({ t, themeColors, doctorData, onProfileUpdate }) => {
    const [name, setName] = useState(doctorData.name);
    const [specialty, setSpecialty] = useState(doctorData.specialty);
    const [email, setEmail] = useState(doctorData.email);
    const [profilePic, setProfilePic] = useState(doctorData.profilePic);
    const [phone, setPhone] = useState(doctorData.phone || ''); // New state
    const [address, setAddress] = useState(doctorData.address || ''); // New state
    const [bio, setBio] = useState(doctorData.bio || ''); // New state
    const [gender, setGender] = useState(doctorData.gender || 'male'); // New state
    const [dob, setDob] = useState(doctorData.dob || ''); // New state
    const [clinicHours, setClinicHours] = useState(doctorData.clinicHours || {}); // New state for clinic hours

    // Update local state when doctorData prop changes (e.g., due to language switch or external update)
    useEffect(() => {
        setName(doctorData.name);
        setSpecialty(doctorData.specialty);
        setEmail(doctorData.email);
        setProfilePic(doctorData.profilePic);
        setPhone(doctorData.phone || '');
        setAddress(doctorData.address || '');
        setBio(doctorData.bio || '');
        setGender(doctorData.gender || 'male');
        setDob(doctorData.dob || '');
        setClinicHours(doctorData.clinicHours || {});
    }, [doctorData]);

    const handleSave = (e) => {
        e.preventDefault();
        onProfileUpdate({ name, specialty, email, profilePic, phone, address, bio, gender, dob, clinicHours });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClinicHoursChange = (day, value) => {
        setClinicHours(prev => ({ ...prev, [day]: value }));
    };

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <Card title={t('profile')} themeColors={themeColors} className="col-span-full">
            <div className="flex flex-col items-center mb-6">
                <img src={profilePic} alt={t('name')} className={`w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4 ${themeColors.shadowClass}`} />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className={`block w-full max-w-xs text-sm ${themeColors.textColorClass}
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100 cursor-pointer`}
                />
            </div>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('name')}
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="specialty" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('specialty')}
                    </label>
                    <input
                        type="text"
                        id="specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('email')}
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        required
                    />
                </div>
                {/* New fields */}
                <div>
                    <label htmlFor="phone" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('phone')}
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                    />
                </div>
                <div>
                    <label htmlFor="address" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('address')}
                    </label>
                    <textarea
                        id="address"
                        rows="3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="bio" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('bio')}
                    </label>
                    <textarea
                        id="bio"
                        rows="4"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        placeholder="A short introduction about yourself..."
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="gender" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                            {t('gender')}
                        </label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        >
                            <option value="male">{t('male')}</option>
                            <option value="female">{t('female')}</option>
                            <option value="other">{t('other')}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dob" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                            {t('dob')}
                        </label>
                        <input
                            type="date"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                    </div>
                </div>

                {/* Clinic Hours Section */}
                <div>
                    <h3 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('clinicHours')}</h3>
                    <div className="space-y-2">
                        {daysOfWeek.map(day => (
                            <div key={day} className="flex items-center space-x-2">
                                <label htmlFor={`clinic-${day}`} className={`w-24 text-sm ${themeColors.textColorClass}`}>
                                    {day}:
                                </label>
                                <input
                                    type="text"
                                    id={`clinic-${day}`}
                                    value={clinicHours[day] || ''}
                                    onChange={(e) => handleClinicHoursChange(day, e.target.value)}
                                    className={`flex-1 rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                    placeholder="e.g., 9:00 AM - 5:00 PM"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className={`${themeColors.buttonPrimaryClass} px-6 py-2 rounded-md transition-transform transform hover:scale-105`}
                >
                    {t('save')}
                </button>
            </form>
        </Card>
    );
};


/**
 * PCGUploadAndAnalysis Component: Allows doctors to upload heart sound files for simulated CNN analysis.
 * Displays analysis results and allows saving them as a new patient report.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.onNewPcgReport - Callback to add a new PCG report.
 * @param {function} props.onUpdateLivePcgData - Callback to update live PCG data.
 * @param {Array<object>} props.patients - List of patients for ID validation.
 */
const PCGUploadAndAnalysis = ({ t, themeColors, onNewPcgReport, onUpdateLivePcgData, patients }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [patientId, setPatientId] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    // Handles file selection from the input
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'audio/wav' || file.type === 'audio/mpeg')) { // Check for .wav or .mp3
            setSelectedFile(file);
            setAnalysisResult(null); // Clear previous results
        } else {
            setSelectedFile(null);
            toast.error("Please select a valid .wav or .mp3 audio file.");
        }
    };

    // Simulates CNN model analysis
    const simulateCNNAnalysis = useCallback(async (file, patientId) => {
        setIsAnalyzing(true);
        setAnalysisResult(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Simulate CNN model output
        const classifications = ['Normal', 'Murmur', 'Extrasystole', 'Valve Disorder', 'Extra Sounds'];
        const randomClassification = classifications[Math.floor(Math.random() * classifications.length)];
        const randomHeartRate = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
        const randomMurmurPresence = parseFloat((Math.random() * 0.8).toFixed(2)); // Higher chance of murmur for simulation
        const randomPcgScore = Math.floor(Math.random() * (99 - 40 + 1)) + 40;
        const randomS1Amplitude = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
        const randomS2Frequency = Math.floor(Math.random() * (130 - 90 + 1)) + 90;
        const randomMurmurType = randomClassification === 'Murmur' ? ['Systolic', 'Diastolic', 'Continuous'][Math.floor(Math.random() * 3)] : 'None';
        const randomS3Presence = Math.random() > 0.7; // 30% chance
        const randomS4Presence = Math.random() > 0.8; // 20% chance

        const simulatedReport = {
            id: `rep${Date.now()}`,
            patientId: patientId,
            patientName: patients.find(p => p.id === patientId)?.name || 'Unknown Patient',
            date: new Date().toISOString().split('T')[0],
            type: 'PCG Analysis', // Default type for uploaded reports
            status: 'Completed', // Automatically completed after analysis
            classification: randomClassification,
            fileUrl: URL.createObjectURL(file), // Use blob URL for uploaded file
            content: `Simulated PCG analysis for patient ${patientId}. Classification: ${randomClassification}. Heart rate: ${randomHeartRate} bpm. Murmur presence: ${randomMurmurPresence * 100}%.`,
            pcgMetrics: {
                s1Amplitude: randomS1Amplitude,
                s2Frequency: randomS2Frequency,
                murmurPresence: randomMurmurPresence,
                pcgScore: randomPcgScore,
                murmurType: randomMurmurType,
                s3Presence: randomS3Presence,
                s4Presence: randomS4Presence,
                heartRate: randomHeartRate,
            },
            doctorNotes: `Automated analysis suggests ${randomClassification.toLowerCase()} heart sounds. Further clinical correlation recommended.`,
            audioFile: URL.createObjectURL(file), // Use blob URL for uploaded file
            imageFile: `https://placehold.co/400x200/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=Simulated+Waveform`, // Placeholder image
        };

        setIsAnalyzing(false);
        setAnalysisResult(simulatedReport);
        toast.success(t('analysisComplete'));

        // Add the new report to the main reports list
        onNewPcgReport(simulatedReport);

        // Update live PCG data with the new analysis result
        onUpdateLivePcgData({
            heartRate: simulatedReport.pcgMetrics.heartRate,
            classification: simulatedReport.classification,
            timestamp: new Date(),
            murmurPresence: simulatedReport.pcgMetrics.murmurPresence,
            s3Presence: simulatedReport.pcgMetrics.s3Presence, // Update S3 presence
            s4Presence: simulatedReport.pcgMetrics.s4Presence, // Update S4 presence
        });

    }, [t, onNewPcgReport, onUpdateLivePcgData, patients]);

    // Handles the "Analyze" button click
    const handleAnalyzeClick = () => {
        if (!selectedFile) {
            toast.error(t('noFileSelected'));
            return;
        }
        if (!patientId) {
            toast.error(t('enterPatientIdForAnalysis'));
            return;
        }
        const patientExists = patients.some(p => p.id === patientId);
        if (!patientExists) {
            toast.error(t('patientNotFound', { patientId }));
            return;
        }
        simulateCNNAnalysis(selectedFile, patientId);
    };

    return (
        <Card title={t('uploadHeartSound')} themeColors={themeColors} className="col-span-full">
            <div className="space-y-4">
                {/* Patient ID Input */}
                <div>
                    <label htmlFor="patientIdForAnalysis" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('patientIdForAnalysis')}
                    </label>
                    <input
                        type="text"
                        id="patientIdForAnalysis"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        placeholder={t('enterPatientIdForAnalysis')}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
                    />
                </div>

                {/* File Input */}
                <div>
                    <label htmlFor="heartSoundFile" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('selectFile')}
                    </label>
                    <div className="mt-1 flex items-center space-x-3">
                        <input
                            type="file"
                            id="heartSoundFile"
                            accept=".wav,.mp3"
                            onChange={handleFileChange}
                            className={`block w-full text-sm ${themeColors.textColorClass}
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100 cursor-pointer`}
                        />
                        {selectedFile && (
                            <span className={`text-sm text-gray-500 dark:text-gray-400`}>
                                {selectedFile.name}
                            </span>
                        )}
                        {!selectedFile && (
                            <span className={`text-sm text-gray-500 dark:text-gray-400`}>
                                {t('noFileSelected')}
                            </span>
                        )}
                    </div>
                </div>

                {/* Analyze Button */}
                <button
                    onClick={handleAnalyzeClick}
                    disabled={!selectedFile || isAnalyzing || !patientId}
                    className={`${themeColors.buttonPrimaryClass} px-6 py-2 rounded-md flex items-center justify-center transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isAnalyzing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('analyzing')}
                        </>
                    ) : (
                        <>
                            <i className="fas fa-wave-square mr-2"></i> {t('analyze')}
                        </>
                    )}
                </button>

                {/* Analysis Result Display */}
                {analysisResult && (
                    <div className={`mt-6 p-6 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass}`}>
                        <h3 className={`text-lg font-semibold ${themeColors.textColorClass} mb-3 flex items-center`}>
                            <CheckCircleIcon className="h-6 w-6 text-emerald-500 mr-2" /> {t('analysisReport')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <p><strong className={themeColors.textColorClass}>{t('patientID')}:</strong> {analysisResult.patientId}</p>
                            <p><strong className={themeColors.textColorClass}>{t('patientName')}:</strong> {analysisResult.patientName}</p>
                            <p><strong className={themeColors.textColorClass}>{t('date')}:</strong> {analysisResult.date}</p>
                            <p><strong className={themeColors.textColorClass}>{t('type')}:</strong> {t(analysisResult.type.replace(/\s/g, '').toLowerCase())}</p>
                            <p><strong className={themeColors.textColorClass}>{t('modelClassification')}:</strong> <StatusBadge status={analysisResult.classification} type="pcgClassification" /></p>
                            <p><strong className={themeColors.textColorClass}>{t('heartRate')}:</strong> {analysisResult.pcgMetrics.heartRate} bpm</p>
                            <p><strong className={themeColors.textColorClass}>{t('murmurPresence')}:</strong> {(analysisResult.pcgMetrics.murmurPresence * 100).toFixed(1)}%</p>
                            <p><strong className={themeColors.textColorClass}>{t('murmurtype')}:</strong> {analysisResult.pcgMetrics.murmurType}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s1Amplitude')}:</strong> {analysisResult.pcgMetrics.s1Amplitude}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s2Frequency')}:</strong> {analysisResult.pcgMetrics.s2Frequency} Hz</p>
                            <p><strong className={themeColors.textColorClass}>{t('pcgScore')}:</strong> {analysisResult.pcgMetrics.pcgScore}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s3presence')}:</strong> {analysisResult.pcgMetrics.s3Presence ? 'Yes' : 'No'}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s4presence')}:</strong> {analysisResult.pcgMetrics.s4Presence ? 'Yes' : 'No'}</p>
                        </div>
                        <h4 className={`text-md font-semibold ${themeColors.textColorClass} mt-4 mb-2`}>{t('doctor_notes')}</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-3">
                            {analysisResult.doctorNotes}
                        </p>
                        {analysisResult.audioFile && (
                            <div className="mt-4">
                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgAudio')}</h4>
                                <audio controls src={analysisResult.audioFile} className="w-full">
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        )}
                        {analysisResult.imageFile && (
                            <div className="mt-4">
                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgImage')}</h4>
                                <img src={analysisResult.imageFile} alt="Simulated PCG Waveform" className="w-full h-auto rounded-lg" onError={(e) => e.target.src = "https://placehold.co/400x200/CCCCCC/000000?text=Image+Not+Available"}/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

/**
 * NavBar Component: Top navigation bar with dashboard title, navigation links,
 * theme toggle, and language selector. It's visible on all screen sizes.
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
 * @param {function} props.setIsMobileMenuOpen - Function to open/close mobile menu.
 */
const NavBar = ({ t, currentThemeName, toggleTheme, language, setLanguage, onLogout, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen }) => {
    // Dynamically sets gradient classes based on the current theme
    const gradientClasses = currentThemeName === 'light'
        ? `from-blue-600 to-indigo-700`
        : `from-gray-700 to-gray-800`;

    // Navigation links for the Navbar
    const navLinks = [
        { id: 'dashboard-section', label: t('home'), icon: <i className="fas fa-home mr-2"></i> },
        { id: 'profile-section', label: t('profile'), icon: <UserCircleIcon className="h-5 w-5 mr-2" /> }, // Moved Profile here
        { id: 'my-patients-section', label: t('myPatients'), icon: <i className="fas fa-user-injured mr-2"></i> },
        { id: 'live-pcg-monitoring-section', label: t('livePCG'), icon: <i className="fas fa-heartbeat mr-2"></i> },
        { id: 'pcg-upload-analysis-section', label: t('uploadHeartSound'), icon: <CloudArrowUpIcon className="h-5 w-5 mr-2" /> }, // New link for upload
        { id: 'patient-pcg-reports-section', label: t('patientPcgReports'), icon: <i className="fas fa-file-medical mr-2"></i> },
        { id: 'my-schedule-section', label: t('mySchedule'), icon: <i className="fas fa-calendar-alt mr-2"></i> },
        { id: 'consultations-section', label: t('consultations'), icon: <i className="fas fa-headset mr-2"></i> },
    ];

    return (
        <nav className={`bg-gradient-to-r ${gradientClasses} ${themeColors.textColorClass} p-4 ${themeColors.shadowClass} relative z-40`}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Dashboard Title */}
                <div className="text-2xl font-bold tracking-wide">
                    {t('doctorDashboard')}
                </div>

                {/* Mobile Menu Button (visible on small screens) */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-white focus:outline-none p-2 rounded-md hover:bg-white/20 transition-colors">
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </div>

                {/* Desktop Navigation Links and Controls (hidden on small screens) */}
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => {
                                e.preventDefault(); // Prevents default anchor link behavior
                                scrollToSection(link.id); // Scrolls to the section
                            }}
                            className={`flex items-center p-2 rounded-md transition-colors duration-200
                                ${activeSection === link.id ? `bg-white/30 text-white` : `hover:bg-white/20 text-white`}`
                            }
                        >
                            {link.icon}{link.label}
                        </a>
                    ))}

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                        title={currentThemeName === 'light' ? t('darkTheme') : t('lightTheme')}
                    >
                        {currentThemeName === 'light' ? (
                            <MoonIcon className="w-6 h-6 text-yellow-300" />
                        ) : (
                            <SunIcon className="w-6 h-6 text-yellow-300" />
                        )}
                    </button>

                    {/* Language Selector */}
                    <select
                        className={`p-2 rounded-md bg-white/20 ${themeColors.textColorClass} focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200`}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">{t('english')}</option>
                        <option value="ur">{t('urdu')}</option>
                    </select>

                    {/* Logout Button */}
                    <button
                        onClick={onLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i> {t('logout')}
                    </button>
                </div>
            </div>
        </nav>
    );
};

/**
 * Sidebar Component: Displays doctor profile information and navigation links.
 * It's a sticky sidebar visible on larger screens, providing quick navigation.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.doctor - Doctor data object.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.scrollToSection - Function to scroll to a specific section.
 * @param {string} props.activeSection - The currently active section ID.
 * @param {function} props.setIsMobileMenuOpen - Function to open/close mobile menu (for mobile sidebar).
 */
const Sidebar = ({ t, doctor, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen }) => {
    // Defines navigation links for the sidebar, including icons.
    const sidebarLinks = [
        { id: 'dashboard-section', label: t('dashboard'), icon: <i className={`fas fa-chart-line mr-3 text-blue-500`}></i> },
        { id: 'profile-section', label: t('profile'), icon: <UserCircleIcon className="h-5 w-5 mr-3 text-gray-500" /> }, // Moved Profile here
        { id: 'my-patients-section', label: t('myPatients'), icon: <i className="fas fa-user-injured mr-3 text-indigo-500"></i> },
        { id: 'live-pcg-monitoring-section', label: t('livePCG'), icon: <HeartIcon className="h-5 w-5 mr-3 text-red-500" /> },
        { id: 'pcg-upload-analysis-section', label: t('uploadHeartSound'), icon: <CloudArrowUpIcon className="h-5 w-5 mr-3 text-purple-500" /> }, // New link
        { id: 'patient-pcg-reports-section', label: t('patientPcgReports'), icon: <DocumentTextIcon className="h-5 w-5 mr-3 text-green-500" /> },
        { id: 'pending-reviews-section', label: t('pendingReviews'), icon: <ClipboardDocumentListIcon className="h-5 w-5 mr-3 text-amber-500" /> },
        { id: 'consultations-section', label: t('consultations'), icon: <i className="fas fa-headset mr-3 text-purple-500"></i> },
        { id: 'my-schedule-section', label: t('mySchedule'), icon: <CalendarDaysIcon className="h-5 w-5 mr-3 text-teal-500" /> },
        { id: 'settings-section', label: t('settings'), icon: <i className="fas fa-cog mr-3 text-gray-500"></i> },
    ];

    return (
        <div className={`w-64 ${themeColors.sidebarBgClass} p-6 flex flex-col items-center ${themeColors.shadowClass} rounded-r-xl transition-colors duration-300 ${themeColors.sidebarBorderClass} sticky top-0 h-screen overflow-y-auto hidden lg:flex`}>
            {/* Doctor Profile Section */}
            <div className="mb-6 text-center">
                <img src={doctor.profilePic} alt={t('name')} className={`w-28 h-28 rounded-full border-4 border-blue-500 object-cover mx-auto mb-4 ${themeColors.shadowClass}`} />
                <h3 className={`text-xl font-bold ${themeColors.textColorClass}`}>Dr. {doctor.name}</h3>
                <p className={`text-sm text-gray-600 dark:text-gray-400`}>{doctor.specialty}</p>
                <p className={`text-sm text-gray-600 dark:text-gray-400`}>{doctor.email || 'doctor@example.com'}</p>
            </div>

            {/* Navigation Links */}
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
                                        ? themeColors.activeNavLink // Apply active link styling from themeColors
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
 * Footer Component: Displays copyright, quick links, and social media icons.
 * Provides general information and navigation to support pages.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const Footer = ({ t, themeColors }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={`${themeColors.cardBgClass} ${themeColors.cardBorderClass} py-8 text-center text-sm text-gray-600 dark:text-gray-400 mt-8`}>
            <div className="container mx-auto px-4">
                <p>&copy; {currentYear} {t('doctorDashboard')}. {t('allRightsReserved')}.</p>
                <p className="mt-1 text-xs opacity-70">{t('dedicatedToHealthcare')}</p>

                {/* Quick Links */}
                <div className="mt-4 flex flex-wrap justify-center space-x-6">
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('privacyPolicy')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('termsOfService')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('support')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-facebook-f text-xl"></i></a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-twitter text-xl"></i></a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-instagram text-xl"></i></a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-linkedin-in text-xl"></i></a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('contactUs')}</a>
                </div>
            </div>
        </footer>
    );
};

/**
 * Main DoctorDashboard Component: Orchestrates all sub-components, manages state,
 * theme, language, and data flow for the doctor's dashboard.
 */
const DoctorDashboard = () => {
    // Hooks for translation and navigation
    const { t, i18n } = useTranslation();
    // const navigate = useNavigate(); // Not used in the provided code, commenting out.

    // State for UI elements and data modals
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isReportDetailsModalOpen, setIsReportDetailsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isConsultationDetailsModalOpen, setIsConsultationDetailsModalOpen] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);

    // State for theme and language, loaded from local storage
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme && themes[savedTheme] ? savedTheme : 'light';
    });
    const [language, setLanguage] = useState(i18n.language);
    const [activeSection, setActiveSection] = useState('dashboard-section'); // State for active navigation section
    const [viewedPatientId, setViewedPatientId] = useState(null); // State to view specific patient's reports

    // --- Doctor Data (Now managed by useState for editability) ---
    const [doctorProfile, setDoctorProfile] = useState({
        id: 'D001',
        name: i18n.language === 'ur' ? "ڈاکٹر فاطمہ" : "Fatima Ahmed",
        profilePic: "https://via.placeholder.com/150/FF6347/FFFFFF?text=FA",
        email: "fatima.ahmed@example.com",
        specialty: i18n.language === 'ur' ? "کارڈیالوجسٹ" : "Cardiologist",
        phone: "+923001234567", // New dummy data
        address: "123 Main Street, Islamabad, Pakistan", // New dummy data
        bio: "Experienced cardiologist dedicated to providing comprehensive cardiac care with a focus on preventive health and patient education.", // New dummy data
        gender: "female", // New dummy data
        dob: "1985-03-10", // New dummy data
        clinicHours: { // New dummy data
            Monday: "9:00 AM - 5:00 PM",
            Tuesday: "9:00 AM - 5:00 PM",
            Wednesday: "9:00 AM - 1:00 PM",
            Thursday: "9:00 AM - 5:00 PM",
            Friday: "9:00 AM - 5:00 PM",
            Saturday: "10:00 AM - 2:00 PM",
            Sunday: "Closed"
        }
    });

    // Update doctorProfile name and specialty when language changes
    useEffect(() => {
        setDoctorProfile(prevProfile => ({
            ...prevProfile,
            name: i18n.language === 'ur' ? "ڈاکٹر فاطمہ" : "Fatima Ahmed",
            specialty: i18n.language === 'ur' ? "کارڈیالوجسٹ" : "Cardiologist",
        }));
    }, [i18n.language]);

    // --- Simulated Patients Data ---
    const [patients, setPatients] = useState([
        { id: 'P001', name: 'Ali Khan', lastVisit: '2025-06-15', nextAppointment: '2025-07-10', email: 'ali.khan@example.com', phone: '+923001234567' },
        { id: 'P002', name: 'Sara Javed', lastVisit: '2025-05-20', nextAppointment: '2025-08-01', email: 'sara.javed@example.com', phone: '+923017654321' },
        { id: 'P003', name: 'Usman Ghani', lastVisit: '2025-06-01', nextAppointment: 'N/A', email: 'usman.ghani@example.com', phone: '+923029876543' },
        { id: 'P004', name: 'Aisha Bibi', lastVisit: '2025-04-01', nextAppointment: '2025-07-25', email: 'aisha.bibi@example.com', phone: '+923032345678' },
    ]);

    // --- Simulated PCG Reports Data ---
    // Contains various types of PCG reports with detailed information.
    const [allPcgReports, setAllPcgReports] = useState([
        {
            id: 'rep1', patientId: 'P001', patientName: 'Ali Khan', date: '2025-06-15', type: 'PCG Analysis', status: 'Completed',
            classification: 'Normal', fileUrl: 'https://www.africau.edu/images/default/sample.pdf', // Example PDF
            content: 'Detailed PCG analysis for Ali Khan. Confirms stable cardiac health. No immediate concerns identified. The S1 heart sound is clear and crisp, indicating proper closure of the mitral and tricuspid valves. The S2 heart sound is also well-defined, showing normal aortic and pulmonic valve closure. No additional heart sounds or adventitious sounds were detected. The heart rhythm is regular sinus rhythm. All parameters are within normal physiological ranges, indicating healthy heart function. The absence of murmurs suggests no turbulent blood flow within the heart.',
            pcgMetrics: { s1Amplitude: 75, s2Frequency: 120, murmurPresence: 0.05, pcgScore: 88, murmurType: 'None', s3Presence: false, s4Presence: false, heartRate: 72 },
            doctorNotes: 'Patient exhibits excellent cardiac health with normal heart sounds. Continue regular monitoring.',
            audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Example audio
            imageFile: 'https://placehold.co/400x200/4F46E5/FFFFFF?text=PCG+Waveform+1', // Example image
        },
        {
            id: 'rep2', patientId: 'P002', patientName: 'Sara Javed', date: '2025-05-20', type: 'Heart Sound Report', status: 'Requires Review',
            classification: 'Murmur', fileUrl: 'https://www.africau.edu/images/default/sample.pdf',
            content: 'Heart sound report for Sara Javed from latest recording. Clear S1 and S2 sounds. Faint mid-systolic murmur detected. Heart rate average: 70 bpm. Needs review for minor variations. The intensity of S1 is normal, and it is appropriately split. S2 is also normal in intensity and splitting. No S3 or S4 gallops. A grade II/VI mid-systolic murmur is audible, radiating to the axilla. This indicates potential turbulent blood flow, warranting further investigation with echocardiogram.',
            pcgMetrics: { s1Amplitude: 70, s2Frequency: 110, murmurPresence: 0.4, pcgScore: 65, murmurType: 'Mid-systolic', s3Presence: false, s4Presence: false, heartRate: 70 },
            doctorNotes: 'Mild systolic murmur detected. Echocardiogram referral for definitive diagnosis.',
            audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            imageFile: 'https://placehold.co/400x200/FFD700/000000?text=PCG+Waveform+2',
        },
        {
            id: 'rep3', patientId: 'P001', patientName: 'Ali Khan', date: '2025-04-10', type: 'Murmur Detection Report', status: 'Completed',
            classification: 'Normal', fileUrl: 'https://www.africau.edu/images/default/sample.pdf',
            content: 'Murmur detection report for Ali Khan indicates no significant murmurs. Patient remains asymptomatic. The previous faint mid-systolic murmur resolved. This report confirms a return to normal heart sound characteristics, with no signs of turbulent blood flow. All heart sounds are clear and distinct, signifying healthy valve function.',
            pcgMetrics: { s1Amplitude: 78, s2Frequency: 125, murmurPresence: 0.02, pcgScore: 92, murmurType: 'None', s3Presence: false, s4Presence: false, heartRate: 75 },
            doctorNotes: 'Follow-up shows no murmurs. Patient in good cardiac health.',
            imageFile: 'https://placehold.co/400x200/28a745/FFFFFF?text=PCG+Waveform+3',
        },
        {
            id: 'rep4', patientId: 'P003', patientName: 'Usman Ghani', date: '2025-03-01', type: 'PCG Baseline Comparison', status: 'Completed',
            classification: 'Abnormal', fileUrl: 'https://www.africau.edu/images/default/sample.pdf',
            content: 'Comparison with previous PCG data for Usman Ghani. Detected slight irregularities in rhythm consistent with benign PVCs. Overall heart sounds remain strong. This indicates consistent cardiac acoustic patterns, but with the occasional presence of premature ventricular contractions (PVCs). These are generally benign but warrant continued observation. The spectral analysis of heart sounds shows no new frequencies or amplitude shifts, reinforcing the stability of cardiac function.',
            pcgMetrics: { s1Amplitude: 72, s2Frequency: 115, murmurPresence: 0.01, pcgScore: 80, murmurType: 'None', s3Presence: false, s4Presence: false, heartRate: 68 },
            doctorNotes: 'Minor arrhythmias noted. Continue monitoring. Patient educated on symptoms.',
            audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        },
        {
            id: 'rep5', patientId: 'P004', patientName: 'Aisha Bibi', date: '2025-06-20', type: 'Extrasystole Report', status: 'Requires Review',
            classification: 'Extrasystole', fileUrl: 'https://www.africau.edu/images/default/sample.pdf',
            content: 'Automated detection of frequent extrasystoles (PVCs) in Aisha Bibi\'s recent PCG recording. Patient reports occasional palpitations. Further evaluation needed. The AI system has flagged repetitive irregular beats which are consistent with ventricular extrasystoles. Although often benign, the frequency warrants further clinical correlation and possibly a 24-hour Holter monitor study to quantify the burden and assess for associated symptoms.',
            pcgMetrics: { s1Amplitude: 65, s2Frequency: 105, murmurPresence: 0.0, pcgScore: 55, murmurType: 'None', s3Presence: false, s4Presence: false, heartRate: 62 },
            doctorNotes: 'Frequent PVCs. Recommend Holter monitor and electrolyte check.',
            audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            imageFile: 'https://placehold.co/400x200/FF6347/FFFFFF?text=Extrasystole+Waveform',
        },
        {
            id: 'rep6', patientId: 'P002', patientName: 'Sara Javed', date: '2025-06-01', type: 'Valve Disorder Analysis', status: 'Pending',
            classification: 'Valve Disorder', fileUrl: 'https://www.africau.edu/images/default/sample.pdf',
            content: 'Preliminary analysis for Sara Javed suggests potential aortic valve stenosis based on reduced S2 intensity and a specific systolic ejection murmur profile. Requires manual validation. The automated system detected characteristics indicative of flow obstruction across the aortic valve. The S2 component sounds diminished and there is a crescendo-decrescendo murmur best heard at the right upper sternal border. This pattern is suspicious for aortic stenosis and demands urgent clinical follow-up and echocardiography.',
            pcgMetrics: { s1Amplitude: 60, s2Frequency: 80, murmurPresence: 0.7, pcgScore: 40, murmurType: 'Systolic Ejection', s3Presence: false, s4Presence: true, heartRate: 70 },
            doctorNotes: 'Strong suspicion of aortic stenosis. Urgent echo required. Patient alerted.',
        },
    ]);

    // --- Simulated Pending Reviews ---
    // Filters reports that require review from the allPcgReports data.
    const [pendingReviews, setPendingReviews] = useState(
        allPcgReports.filter(report => report.status === 'Requires Review')
                     .map(report => ({ id: report.id, patientName: report.patientName, type: report.type, date: report.date, content: report.content, pcgMetrics: report.pcgMetrics, doctorNotes: report.doctorNotes, classification: report.classification }))
    );

    // --- Simulated Consultation Requests ---
    const [consultationRequests, setConsultationRequests] = useState([
        { id: 'cons1', patientId: 'P004', patientName: 'Aisha Bibi', reason: 'Sudden chest discomfort', date: '2025-06-22', status: 'New Request' },
        { id: 'cons2', patientId: 'P003', patientName: 'Usman Ghani', reason: 'Follow-up on cholesterol levels', date: '2025-06-20', status: 'Responded' },
    ]);

    // --- Simulated Doctor's Appointments ---
    const [doctorAppointments, setDoctorAppointments] = useState([
        { id: 'docApp1', patientName: 'Ali Khan', date: '2025-06-22', time: '10:00 AM', type: 'online', reason: 'Annual Check-up', status: 'Scheduled', meetingLink: 'https://meet.google.com/abc-def-ghi' },
        { id: 'docApp2', patientName: 'Sara Javed', date: '2025-06-22', time: '11:00 AM', type: 'inPerson', reason: 'Discussion on recent blood work', status: 'Scheduled' },
        { id: 'docApp3', patientName: 'Usman Ghani', date: '2025-06-22', time: '09:00 AM', type: 'online', reason: 'PCG Review', status: 'Completed', meetingLink: 'https://meet.google.com/jkl-mno-pqr' },
        { id: 'docApp4', patientName: 'Aisha Bibi', date: '2025-06-21', time: '03:00 PM', type: 'inPerson', reason: 'New Patient Consultation', status: 'Cancelled' },
        { id: 'docApp5', patientName: 'Zainab Fatima', date: '2025-06-20', time: '02:00 PM', type: 'online', reason: 'Review of medication', status: 'Missed' },
    ]);

    // --- Live PCG Monitoring State ---
    // State to hold current live PCG data and historical data for charts.
    const [livePcgData, setLivePcgData] = useState({
        heartRate: 70,
        classification: 'Normal',
        timestamp: new Date(),
        murmurPresence: 0.05,
        s3Presence: false, // Initial S3 presence
        s4Presence: false, // Initial S4 presence
    });
    const [pcgHistory, setPcgHistory] = useState([]); // Stores last ~20 points for chart

    // --- Simulate live PCG data ---
    // Updates live PCG data every 3 seconds and adds it to history.
    useEffect(() => {
        const interval = setInterval(() => {
            const newHeartRate = Math.floor(Math.random() * (90 - 60 + 1)) + 60; // 60-90 bpm
            const newMurmurPresence = parseFloat((Math.random() * 0.1).toFixed(2)); // 0.00 - 0.10
            let newClassification = 'Normal';
            if (newHeartRate > 85 || newMurmurPresence > 0.08) {
                const rand = Math.random();
                if (rand < 0.3) newClassification = 'Murmur';
                else if (rand < 0.6) newClassification = 'Extrasystole';
                else newClassification = 'Abnormal';
            }
            const newS3Presence = Math.random() > 0.8; // 20% chance of S3
            const newS4Presence = Math.random() > 0.9; // 10% chance of S4

            const newPcgEntry = {
                heartRate: newHeartRate,
                classification: newClassification,
                timestamp: new Date(),
                murmurPresence: newMurmurPresence,
                s3Presence: newS3Presence,
                s4Presence: newS4Presence,
            };

            setLivePcgData(newPcgEntry);
            setPcgHistory(prevHistory => {
                const updatedHistory = [...prevHistory, newPcgEntry];
                return updatedHistory.slice(Math.max(updatedHistory.length - 20, 0)); // Keep last 20 entries
            });

            // Displays a warning toast if PCG classification is not normal
            if (newClassification !== 'Normal') {
                toast.warn(t('pcgAlertIrregular', { value: newPcgEntry.heartRate }), {
                    icon: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
                });
            }
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [t]);

    // --- Dashboard Metrics ---
    // Memoizes key performance indicators for the doctor's dashboard.
    const dashboardMetrics = useMemo(() => ({
        totalPatients: patients.length,
        newPatientsToday: patients.filter(p => p.lastVisit === new Date().toISOString().split('T')[0]).length, // Simplified for demo
        patientsAwaitingReview: pendingReviews.length,
    }), [patients, pendingReviews]);

    // --- Refs for scrolling to sections ---
    // Used to programmatically scroll to different sections of the dashboard.
    const dashboardRef = useRef(null);
    const profileRef = useRef(null); // Moved Profile ref up
    const myPatientsRef = useRef(null);
    const livePcgMonitoringRef = useRef(null);
    const pcgUploadAnalysisRef = useRef(null); // New ref for PCG Upload
    const patientPcgReportsRef = useRef(null);
    const pendingReviewsRef = useRef(null);
    const consultationsRef = useRef(null);
    const myScheduleRef = useRef(null);
    const settingsRef = useRef(null);

    // Maps section IDs to their corresponding refs.
    const sectionRefs = {
        'dashboard-section': dashboardRef,
        'profile-section': profileRef, // Updated order
        'my-patients-section': myPatientsRef,
        'live-pcg-monitoring-section': livePcgMonitoringRef,
        'pcg-upload-analysis-section': pcgUploadAnalysisRef, // New ref
        'patient-pcg-reports-section': patientPcgReportsRef,
        'pending-reviews-section': pendingReviewsRef,
        'consultations-section': consultationsRef,
        'my-schedule-section': myScheduleRef,
        'settings-section': settingsRef,
    };

    // Callback to scroll to a specific section.
    const scrollToSection = useCallback((id) => {
        const element = sectionRefs[id]?.current;
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    }, [sectionRefs]);

    // --- Theme and Language Management ---
    // Retrieves current theme colors based on selected theme.
    const themeColors = themes[currentTheme];

    // Applies dark/light class to the document root for Tailwind CSS.
    useEffect(() => {
        const root = document.documentElement;
        if (currentTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [currentTheme]);

    // Changes i18n language when the language state changes.
    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    // Sets up an IntersectionObserver to detect which section is currently in view,
    // updating the activeSection state for navigation highlighting.
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // When 50% of the section is visible
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

        // Observe all section elements
        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        // Cleanup observer on component unmount
        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [sectionRefs]);

    // Toggles between light and dark themes and saves preference to local storage.
    const toggleTheme = useCallback(() => {
        setCurrentTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            toast.info(t(`Switched to ${newTheme === 'light' ? 'lightTheme' : 'darkTheme'}`));
            return newTheme;
        });
    }, [t]);

    // Handles user logout, displaying a success toast and simulating logout.
    const handleLogout = useCallback(() => {
        toast.success(t('logoutSuccess'));
        // Simulate navigation or actual logout process
        console.log("Doctor logged out!");
    }, [t]);

    // --- Profile Handlers ---
    const handleProfileUpdate = useCallback((updatedProfile) => {
        setDoctorProfile(updatedProfile);
        toast.success(t('Profile updated successfully!'));
    }, [t]);

    // --- PCG Upload and Analysis Handlers ---
    const handleNewPcgReport = useCallback((newReport) => {
        setAllPcgReports(prevReports => [...prevReports, newReport]);
        // Also add to pending reviews if it's a new analysis that might need review
        if (newReport.status === 'Requires Review' || newReport.status === 'Pending') {
             setPendingReviews(prevReviews => [...prevReviews, {
                id: newReport.id,
                patientName: newReport.patientName,
                type: newReport.type,
                date: newReport.date,
                content: newReport.content,
                pcgMetrics: newReport.pcgMetrics,
                doctorNotes: newReport.doctorNotes,
                classification: newReport.classification
            }]);
        }
        toast.success(t('uploadSuccess'));
    }, [t]);

    const handleUpdateLivePcgData = useCallback((data) => {
        setLivePcgData(data);
        setPcgHistory(prevHistory => {
            const updatedHistory = [...prevHistory, data];
            return updatedHistory.slice(Math.max(updatedHistory.length - 20, 0)); // Keep last 20 entries
        });
    }, []);

    // --- Patient PCG Reports Handlers ---
    // Sets the patient ID to view specific reports and scrolls to the reports section.
    const handleViewPatientProfile = useCallback((patientId) => {
        setViewedPatientId(patientId);
        scrollToSection('patient-pcg-reports-section');
    }, [scrollToSection]);

    // Clears the viewed patient ID to show all reports and scrolls back to patients section.
    const handleBackToAllPatients = useCallback(() => {
        setViewedPatientId(null);
        scrollToSection('my-patients-section');
    }, [scrollToSection]);

    // Memoized list of reports, filtered by patient ID if one is selected.
    const reportsForCurrentView = useMemo(() => {
        if (viewedPatientId) {
            return allPcgReports.filter(report => report.patientId === viewedPatientId);
        }
        return allPcgReports;
    }, [allPcgReports, viewedPatientId]);

    // Opens the report details modal for the selected report.
    const handleViewReportDetails = useCallback((report) => {
        setSelectedReport(report);
        setIsReportDetailsModalOpen(true);
        toast.info(t('reportViewSuccess', { reportId: report.id }));
    }, [t]);

    // Simulates downloading a report file.
    const handleDownloadReport = useCallback((report) => {
        const link = document.createElement('a');
        link.href = report.fileUrl || `data:text/plain;charset=utf-8,${encodeURIComponent(report.content)}`;
        link.download = `${t(report.type.replace(/\s/g, '').toLowerCase())}_Report_${report.id}.pdf`; // Changed to PDF for consistency
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(t('reportDownloadSuccess', { reportId: report.id }));
    }, [t]);

    // --- Pending Reviews Handlers ---
    // Marks a review as approved and updates the report status.
    const handleApproveReview = useCallback((reviewId) => {
        setPendingReviews(prev => prev.filter(review => review.id !== reviewId));
        setAllPcgReports(prev => prev.map(report =>
            report.id === reviewId ? { ...report, status: 'Reviewed' } : report
        ));
        toast.success(`Review ${reviewId} approved.`);
    }, []);

    // Marks a review as declined and updates the report status.
    const handleDeclineReview = useCallback((reviewId) => {
        setPendingReviews(prev => prev.filter(review => review.id !== reviewId));
        setAllPcgReports(prev => prev.map(report =>
            report.id === reviewId ? { ...report, status: 'Declined' } : report
        ));
        toast.error(`Review ${reviewId} declined.`);
    }, []);

    // --- Consultation Requests Handlers ---
    // Submits a new consultation request.
    const handleSubmitNewRequest = useCallback((requestData) => {
        const newReq = {
            id: `cons${consultationRequests.length + 1}`,
            date: new Date().toISOString().split('T')[0],
            status: 'New Request',
            patientName: patients.find(p => p.id === requestData.patientId)?.name || 'Unknown Patient',
            ...requestData,
        };
        setConsultationRequests(prev => [...prev, newReq]);
        toast.success(t('requestSentSuccess'));
    }, [consultationRequests.length, t, patients]);

    // Marks a consultation request as accepted.
    const handleAcceptRequest = useCallback((requestId) => {
        setConsultationRequests(prev => prev.map(req =>
            req.id === requestId ? { ...req, status: 'Responded' } : req
        ));
        toast.info(`Consultation request ${requestId} accepted. Now you can schedule an appointment with this patient.`);
    }, []);

    // Marks a consultation request as declined.
    const handleDeclineRequest = useCallback((requestId) => {
        setConsultationRequests(prev => prev.map(req =>
            req.id === requestId ? { ...req, status: 'Closed' } : req
        ));
        toast.warn(`Consultation request ${requestId} declined.`);
    }, []);

    // Opens the consultation details modal for the selected request.
    const handleViewConsultationRequestDetails = useCallback((req) => {
        setSelectedConsultation(req);
        setIsConsultationDetailsModalOpen(true);
    }, []);

    // --- Doctor Schedule Handlers ---
    // Adds a new appointment to the doctor's schedule.
    const handleAddAppointment = useCallback((appData) => {
        const newApp = {
            id: `docApp${doctorAppointments.length + 1}`,
            status: 'Scheduled',
            ...appData,
        };
        setDoctorAppointments(prev => [...prev, newApp]);
        toast.success(t('appointmentSuccess'));
    }, [doctorAppointments.length, t]);

    // Simulates rescheduling an appointment.
    const handleRescheduleAppointment = useCallback((appId) => {
        setDoctorAppointments(prev => prev.map(app =>
            app.id === appId ? { ...app, status: 'Rescheduled', date: '2025-07-28', time: '09:00 AM' } : app
        ));
        toast.info(`Appointment ${appId} has been rescheduled (simulated).`);
    }, []);

    // Marks an appointment as cancelled.
    const handleCancelAppointment = useCallback((appId) => {
        setDoctorAppointments(prev => prev.map(app =>
            app.id === appId ? { ...app, status: 'Cancelled' } : app
        ));
        toast.warn(`Appointment ${appId} has been cancelled.`);
    }, []);

    // Marks an appointment as completed or missed.
    const handleMarkAppointment = useCallback((appId, newStatus) => {
        setDoctorAppointments(prev => prev.map(app =>
            app.id === appId ? { ...app, status: newStatus } : app
        ));
        toast.success(`Appointment ${appId} marked as ${newStatus}.`);
    }, []);

    return (
        <div className={`min-h-screen flex flex-col lg:flex-row ${themeColors.backgroundClass} ${themeColors.textColorClass} transition-colors duration-300 font-sans`}
             style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
            {/* Toast Notifications Container */}
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
            <Sidebar
                t={t}
                doctor={doctorProfile} // Pass doctorProfile state
                themeColors={themeColors}
                scrollToSection={scrollToSection}
                activeSection={activeSection}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Mobile Menu (Hidden on large screens, toggled by NavBar) */}
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
                                    <h2 className="text-2xl font-bold">{t('doctorDashboard')}</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-5 px-2">
                                    {/* Mobile sidebar uses the same Sidebar component */}
                                    <Sidebar
                                        t={t}
                                        doctor={doctorProfile} // Pass doctorProfile state
                                        themeColors={themeColors}
                                        scrollToSection={scrollToSection}
                                        activeSection={activeSection}
                                        setIsMobileMenuOpen={setIsMobileMenuOpen}
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
                {/* Navbar Component */}
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
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                    {/* Dashboard Overview Section */}
                    <section ref={dashboardRef} id="dashboard-section">
                        <DoctorOverview t={t} themeColors={themeColors} metrics={dashboardMetrics} />
                    </section>

                    {/* My Profile Section */}
                    <section ref={profileRef} id="profile-section">
                        <DoctorProfile
                            t={t}
                            themeColors={themeColors}
                            doctorData={doctorProfile}
                            onProfileUpdate={handleProfileUpdate}
                        />
                    </section>

                    {/* My Patients Section */}
                    <section ref={myPatientsRef} id="my-patients-section">
                        <MyPatientsTable
                            t={t}
                            themeColors={themeColors}
                            patients={patients}
                            onViewPatientProfile={handleViewPatientProfile}
                        />
                    </section>

                    {/* Live PCG Monitoring Section */}
                    <section ref={livePcgMonitoringRef} id="live-pcg-monitoring-section">
                        <LivePcgMonitoring
                            t={t}
                            themeColors={themeColors}
                            livePcgData={livePcgData}
                            pcgHistory={pcgHistory}
                            chartGridColor={themeColors.chartGridColor}
                            chartTextColor={themeColors.chartTextColor}
                        />
                    </section>

                    {/* PCG Upload and Analysis Section */}
                    <section ref={pcgUploadAnalysisRef} id="pcg-upload-analysis-section">
                        <PCGUploadAndAnalysis
                            t={t}
                            themeColors={themeColors}
                            onNewPcgReport={handleNewPcgReport}
                            onUpdateLivePcgData={handleUpdateLivePcgData}
                            patients={patients}
                        />
                    </section>

                    {/* Patient PCG Reports Section (Conditional based on viewedPatientId) */}
                    <section ref={patientPcgReportsRef} id="patient-pcg-reports-section">
                        <PatientPcgReports
                            t={t}
                            themeColors={themeColors}
                            reports={reportsForCurrentView}
                            viewedPatientId={viewedPatientId}
                            onBackToAllPatients={handleBackToAllPatients}
                            onViewReportDetails={handleViewReportDetails}
                            onDownloadReport={handleDownloadReport}
                        />
                    </section>

                    {/* Pending Reviews Section */}
                    <section ref={pendingReviewsRef} id="pending-reviews-section">
                        <PendingReviews
                            t={t}
                            themeColors={themeColors}
                            pendingReviews={pendingReviews}
                            onApproveReview={handleApproveReview}
                            onDeclineReview={handleDeclineReview}
                            onViewDetails={handleViewReportDetails} // Reusing report details modal for review content
                        />
                    </section>

                    {/* Consultation Requests Section */}
                    <section ref={consultationsRef} id="consultations-section">
                        <ConsultationRequests
                            t={t}
                            themeColors={themeColors}
                            consultationRequests={consultationRequests}
                            onAcceptRequest={handleAcceptRequest}
                            onDeclineRequest={handleDeclineRequest}
                            onViewRequest={handleViewConsultationRequestDetails}
                            onSubmitNewRequest={handleSubmitNewRequest}
                        />
                    </section>

                    {/* My Schedule Section */}
                    <section ref={myScheduleRef} id="my-schedule-section">
                        <DoctorSchedule
                            t={t}
                            themeColors={themeColors}
                            appointments={doctorAppointments}
                            onAddAppointment={handleAddAppointment}
                            onRescheduleAppointment={handleRescheduleAppointment}
                            onCancelAppointment={handleCancelAppointment}
                            onMarkAppointment={handleMarkAppointment}
                        />
                    </section>

                    {/* Settings Section (Placeholder) */}
                    <section ref={settingsRef} id="settings-section">
                        <Card title={t('settings')} themeColors={themeColors}>
                            <p className={`${themeColors.textColorClass} opacity-80`}>Manage your dashboard settings.</p>
                            <div className="mt-4 space-y-4">
                                {/* Theme Selection */}
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
                                {/* Language Selection */}
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
                                    </select>
                                </div>
                            </div>
                        </Card>
                    </section>
                </main>

                {/* Footer Component */}
                <Footer t={t} themeColors={themeColors} />
            </div>

            {/* Report Details Modal (Reused for viewing detailed report info) */}
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
                                <Dialog.Panel className={`${themeColors.cardBgClass} ${themeColors.textColorClass} w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}>
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                                        {t('reportDetails')} - {t(selectedReport?.type.replace(/\s/g, '').toLowerCase())} ({selectedReport?.id})
                                    </Dialog.Title>
                                    <div className="mt-4 space-y-4">
                                        {/* Basic Report Information */}
                                        <p className="text-sm font-semibold flex justify-between">
                                            <span>{t('patientName')}: {selectedReport?.patientName} ({selectedReport?.patientId})</span>
                                            <span>{t('date')}: {selectedReport?.date}</span>
                                        </p>
                                        <p className="text-sm font-semibold flex justify-between">
                                            <span>{t('classificationresult')}: <StatusBadge status={selectedReport?.classification} type="pcgClassification" /></span>
                                            <span>{t('status')}: <StatusBadge status={selectedReport?.status} type="report" /></span>
                                        </p>

                                        {/* PCG Metrics Section */}
                                        {selectedReport?.pcgMetrics && (
                                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgMetrics')}</h4>
                                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <p><span className="font-medium">{t('s1Amplitude')}:</span> {selectedReport.pcgMetrics.s1Amplitude}</p>
                                                    <p><span className="font-medium">{t('s2Frequency')}:</span> {selectedReport.pcgMetrics.s2Frequency} Hz</p>
                                                    <p><span className="font-medium">{t('murmurPresence')}:</span> {(selectedReport.pcgMetrics.murmurPresence * 100).toFixed(1)}%</p>
                                                    <p><span className="font-medium">{t('pcgScore')}:</span> {selectedReport.pcgMetrics.pcgScore}</p>
                                                    <p><span className="font-medium">{t('heartRate')}:</span> {selectedReport.pcgMetrics.heartRate} bpm</p>
                                                    <p><span className="font-medium">{t('murmurtype')}:</span> {selectedReport.pcgMetrics.murmurType}</p>
                                                    <p><span className="font-medium">{t('s3presence')}:</span> {selectedReport.pcgMetrics.s3Presence ? 'Yes' : 'No'}</p>
                                                    <p><span className="font-medium">{t('s4presence')}:</span> {selectedReport.pcgMetrics.s4Presence ? 'Yes' : 'No'}</p>
                                                </div>

                                                {/* PCG Waveform Visualization */}
                                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mt-4 mb-2`}>{t('pcgWaveform')}</h4>
                                                <PCGWaveform
                                                    width={400}
                                                    height={150}
                                                    strokeColor={themeColors.waveformStroke}
                                                    fillColor={themeColors.waveformFill}
                                                    s3Presence={selectedReport.pcgMetrics.s3Presence}
                                                    s4Presence={selectedReport.pcgMetrics.s4Presence}
                                                />

                                                {/* PCG Audio Playback (if available) */}
                                                {selectedReport.audioFile && (
                                                    <div className="mt-4">
                                                        <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgAudio')}</h4>
                                                        <audio controls src={selectedReport.audioFile} className="w-full">
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                    </div>
                                                )}

                                                {/* PCG Image Display (if available) */}
                                                {selectedReport.imageFile && (
                                                    <div className="mt-4">
                                                        <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgImage')}</h4>
                                                        <img src={selectedReport.imageFile} alt="PCG Visual" className="w-full h-auto rounded-lg" onError={(e) => e.target.src = "https://placehold.co/400x200/CCCCCC/000000?text=Image+Not+Available"}/>
                                                    </div>
                                                )}

                                                {/* Doctor's Notes */}
                                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mt-4 mb-2`}>{t('doctor_notes')}</h4>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-3">
                                                    {selectedReport.doctorNotes || "No specific notes for this report."}
                                                </p>
                                            </div>
                                        )}

                                        {/* Full Report Content */}
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                            <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('fullReportContentPlaceholder')}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                                {selectedReport?.content || t('fullReportContentPlaceholder')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Close Button for Report Details Modal */}
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

            {/* Consultation Details Modal */}
            <Transition appear show={isConsultationDetailsModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsConsultationDetailsModalOpen(false)}>
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
                                        {t('consultationDetails')}
                                    </Dialog.Title>
                                    <div className="mt-4 space-y-3">
                                        {/* Consultation Request Details */}
                                        <p className="text-sm"><strong>{t('patientName')}:</strong> {selectedConsultation?.patientName} ({selectedConsultation?.patientId})</p>
                                        <p className="text-sm"><strong>{t('date')}:</strong> {selectedConsultation?.date}</p>
                                        <p className="text-sm"><strong>{t('status')}:</strong> <StatusBadge status={selectedConsultation?.status} type="consultation" /></p>
                                        <p className="text-sm"><strong>{t('reason')}:</strong> {selectedConsultation?.reason}</p>

                                        {/* Patient Contact Information */}
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                                            <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('patientContact')}</h4>
                                            {selectedConsultation?.patientId && patients.find(p => p.id === selectedConsultation.patientId) ? (
                                                <>
                                                    <p className="text-sm flex items-center"><PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />{patients.find(p => p.id === selectedConsultation.patientId).phone}</p>
                                                    <p className="text-sm flex items-center"><EnvelopeIcon className="h-4 w-4 mr-2 text-gray-500" />{patients.find(p => p.id === selectedConsultation.patientId).email}</p>
                                                </>
                                            ) : (
                                                <p className="text-sm text-gray-500">{t('contact_info')} {t('patientNotFound', { patientId: selectedConsultation?.patientId })}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons for Consultation Details Modal */}
                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className={`${themeColors.buttonSecondaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                            onClick={() => setIsConsultationDetailsModalOpen(false)}
                                        >
                                            {t('close')}
                                        </button>
                                        {/* Accept/Decline buttons only for 'New Request' status */}
                                        {selectedConsultation?.status === 'New Request' && (
                                            <>
                                                <button
                                                    type="button"
                                                    className={`${themeColors.buttonPrimaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                                    onClick={() => { handleAcceptRequest(selectedConsultation.id); setIsConsultationDetailsModalOpen(false); }}
                                                >
                                                    {t('accept')}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-red-600 hover:bg-red-700 text-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
                                                    onClick={() => { handleDeclineRequest(selectedConsultation.id); setIsConsultationDetailsModalOpen(false); }}
                                                >
                                                    {t('decline')}
                                                </button>
                                            </>
                                        )}
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

export default DoctorDashboard;
