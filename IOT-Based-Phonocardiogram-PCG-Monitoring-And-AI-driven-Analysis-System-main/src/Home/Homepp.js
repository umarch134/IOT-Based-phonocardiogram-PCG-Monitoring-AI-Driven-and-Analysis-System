// --- React Imports ---
import React, { useState, useEffect, useCallback, Fragment, useMemo, useRef } from 'react';
// --- Animation and UI Components Imports ---
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
// --- Icon Imports (from react-icons for a wider range of icons) ---
import {
    FaMoon, FaSun, FaArrowUp, FaLinkedin, FaTwitter, FaFacebook,
    FaBrain, FaMobileAlt, FaWifi, FaComments,
    FaMicrophone, FaCloudUploadAlt, FaChartLine, FaEnvelope, FaPhone, FaMapMarkerAlt, FaExclamationTriangle
} from "react-icons/fa"; // Font Awesome icons
import { BiDevices, BiAnalyse } from "react-icons/bi"; // Boxicons
import { MdSecurity, MdSpeed, MdOutlineMonitorHeart, MdPeopleAlt } from "react-icons/md"; // Material Design icons
// --- Chart.js Imports ---
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// --- Toast Notification Library Imports ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Corrected import path for react-toastify CSS
// --- Internationalization (i18n) Imports ---
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

// Register Chart.js components globally for use in Line charts
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// --- Local Image/Video Imports ---
// Ensure these paths are correct relative to your project structure.
// For example, if Home.jsx is in `src/components/`, and Images is in `src/assets/images/`,
// then paths would be like `import adnanimage from '../assets/images/adnanimage.jpg';`
import adnanimage from './Images/adnanimage.jpg';
import umarimage from './Images/umarimage.jpg';
import liveVideoMP4 from './Images/liveVideo.mp4';


// --- Data Definitions ---
// These arrays hold data for various sections of the homepage,
// making content management easier and separating data from presentation logic.

const features = [
    {
        title: "Real-Time PCG Acquisition",
        desc: "Our portable IoT device captures heart sounds instantly, ensuring continuous, high-fidelity data flow for immediate insights.",
        icon: <FaMicrophone className="text-blue-600 dark:text-blue-400 text-5xl mb-4" />,
    },
    {
        title: "AI-Driven Analysis",
        desc: "Leveraging advanced Convolutional (CNN) and Recurrent Neural Network (LSTM) models, our system accurately analyzes heart sounds for abnormalities.",
        icon: <FaBrain className="text-green-600 dark:text-green-400 text-5xl mb-4" />,
    },
    {
        title: "Intuitive User Interface",
        desc: "Designed for both patients and healthcare professionals, our intuitive mobile and web interface offers easy access to visualized heart data and alerts.",
        icon: <FaMobileAlt className="text-purple-600 dark:text-purple-400 text-5xl mb-4" />,
    },
    {
        title: "Secure Data Transmission",
        desc: "Seamlessly transmit vital heart data to our encrypted cloud platform via Wi-Fi/Bluetooth/LoRa, enabling remote and reliable monitoring.",
        icon: <MdSecurity className="text-red-600 dark:text-red-400 text-5xl mb-4" />,
    },
    {
        title: "Explainable AI (XAI)",
        desc: "Beyond mere detection, our system provides clear, interpretable explanations for AI classifications, fostering trust and complementing human diagnosis.",
        icon: <FaComments className="text-yellow-600 dark:text-yellow-400 text-5xl mb-4" />,
    },
    {
        title: "Rapid Early Detection",
        desc: "Empower proactive healthcare through the swift identification of cardiovascular issues, critical for timely medical intervention and improved patient outcomes.",
        icon: <MdSpeed className="text-teal-600 dark:text-teal-400 text-5xl mb-4" />,
    },
];

const howItWorksSteps = [
    {
        title: "Capture PCG Data",
        description: "The CardioSense AI portable IoT device is placed on the patient's chest to capture high-fidelity heart sounds in real-time.",
        icon: <BiDevices className="text-blue-500 text-6xl" />,
    },
    {
        title: "Secure Transmission",
        description: "Captured data is instantly and securely transmitted to our cloud platform via Wi-Fi, Bluetooth, or LoRa.",
        icon: <FaWifi className="text-green-500 text-6xl" />,
    },
    {
        title: "AI Analysis",
        description: "Advanced AI models (CNNs, LSTMs) in the cloud analyze the PCG data for abnormalities, providing instant diagnostics.",
        icon: <BiAnalyse className="text-purple-500 text-6xl" />,
    },
    {
        title: "Insights & Alerts",
        description: "Results are displayed on the user dashboard, with immediate alerts sent to patients and healthcare providers for critical findings.",
        icon: <FaChartLine className="text-red-500 text-6xl" />,
    },
];

const teamMembers = [
    {
        name: "SADAF ZAFEER",
        role: "AI/ML & Data Analyst",
        bio: "Specializes in developing and optimizing deep learning models for PCG signal analysis and ensuring data integrity and explainability.",
        image: "https://placehold.co/150x150/FF6347/FFFFFF?text=Sadaf", // Placeholder image
        social: {
            linkedin: "http://www.linkedin.com/in/sadaf-zafeer-b91639335",
            twitter: "#"
        }
    },
    {
        name: "ADNAN RIAZ",
        role: "Lead IoT & Full-Stack System Architect",
        bio: "Specializes in designing and integrating end-to-end solutions for CardioSense AI. His expertise spans from developing core IoT hardware and firmware to building robust backend systems, and crafting intuitive user interfaces (UI/UX) for a seamless experience.",
        image: adnanimage,
        social: {
            linkedin: "https://www.linkedin.com/in/adnan-riaz-a4a336279",
            twitter: "#"
        }
    },
    {
        name: "UMAR KHALID CHAUDHARY",
        role: "Technical Documentation Lead & Content Strategist",
        bio: "Umar is crucial for translating complex technical and research insights into clear, accessible documentation. He ensures that CardioSense AI's methodologies, system architecture, and user guides are meticulously articulated, fostering understanding and collaboration across all stakeholders.",
        image: umarimage,
        social: {
            linkedin: "https://linkedin.com/in/umar-khalid-chaudhary",
            twitter: "#"
        }
    },
];

const faqData = [
    {
        q: "What makes CardioSense AI's AI models so accurate?",
        a: "Our AI models are trained on extensive, diverse, and clinically validated datasets of heart sounds. We employ state-of-the-art deep learning architectures (CNNs, LSTMs) and continuous learning methodologies to ensure high precision in identifying various cardiac abnormalities.",
    },
    {
        q: "How does CardioSense AI ensure patient data privacy and security?",
        a: "Data security and privacy are paramount. We utilize end-to-end encryption (AES-256) for all data in transit and at rest, adhere strictly to global data protection regulations (e.g., GDPR, HIPAA readiness), and implement robust access controls and regular security audits.",
    },
    {
        q: "Can CardioSense AI be used for continuous monitoring at home?",
        a: "Absolutely. CardioSense AI is designed for both clinical and home environments. Its portable device and intuitive patient-facing dashboard enable continuous, unsupervised monitoring, sending alerts to healthcare providers for proactive intervention.",
    },
    {
        q: "What are the power requirements and battery life of the CardioSense AI device?",
        a: "The CardioSense AI device is optimized for low power consumption, typically lasting up to 24-48 hours on a single charge depending on usage patterns. It supports fast charging and comes with a compact charging dock for convenience.",
    },
    {
        q: "How does CardioSense AI handle varying ambient noise during recording?",
        a: "Our system incorporates advanced digital signal processing (DSP) techniques, including active noise cancellation algorithms, to filter out ambient noise and isolate heart sounds. This ensures high-quality PCG recordings even in challenging real-world settings.",
    },
    {
        q: "Is CardioSense AI approved by medical regulatory bodies?",
        a: "CardioSense AI is currently in advanced stages of regulatory approval processes in key markets. We are actively working with regulatory bodies to ensure full compliance and bring our innovative solution to patients and providers globally.",
    },
];

const blogPosts = [
    {
        title: "The Transformative Power of IoT in Preventive Cardiology",
        link: "#",
        image: "https://via.placeholder.com/600x400?text=IoT+Cardiology",
        excerpt: "Explore how interconnected devices are revolutionizing early detection and ongoing management of cardiovascular diseases, enabling truly preventive care.",
    },
    {
        title: "Decoding Heart Sounds: The Magic of AI in PCG Analysis",
        link: "#",
        image: "https://via.placeholder.com/600x400?text=AI+PCG+Decoding",
        excerpt: "Dive deep into how advanced AI algorithms, specifically CNNs and LSTMs, interpret the subtle nuances of heart sounds to identify complex anomalies.",
    },
    {
        title: "CardioSense AI's Patient-Centric Design: Empowering Self-Monitoring",
        link: "#",
        image: "https://via.placeholder.com/600x400?text=Patient+Care",
        excerpt: "Understand the philosophy behind CardioSense AI's user-friendly interface and how it empowers patients to take an active role in their cardiac health.",
    },
    {
        title: "The Ethical Implications of Explainable AI in Medicine",
        link: "#",
        image: "https://via.placeholder.com/600x400?text=AI+Ethics",
        excerpt: "A critical discussion on the importance of transparency in AI-driven medical diagnostics and how CardioSense AI embraces XAI for enhanced trust and clinical confidence.",
    },
];

const awards = [
    "IQRA University FYP Excellence Award 2025 (Anticipated)",
    "HealthTech Innovation Challenge Finalist 2024",
    "Top MedTech Startup Pitch - National Innovation Summit 2023",
    "Best IoT Solution in Healthcare - Tech for Good Awards (Project Stage)",
];

const partners = [
    { name: "IQRA University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Iqra_University_seal.svg/1200px-Iqra_University_seal.svg.png" },
    { name: "Global Health Alliance", logo: "https://via.placeholder.com/150x75?text=Global+Health+Alliance" },
    { name: "Innovate AI Solutions", logo: "https://via.placeholder.com/150x75?text=Innovate+AI+Solutions" },
    { name: "Precision Diagnostics", logo: "https://via.placeholder.0/150x75?text=Precision+Diagnostics" },
    { name: "Wearable Tech Corp", logo: "https://via.placeholder.0/150x75?text=Wearable+Tech+Corp" },
    { name: "Medical Device Fund", logo: "https://via.placeholder.0/150x75?text=Medical+Device+Fund" },
];

const testimonials = [
    {
        quote: "CardioSense AI is a phenomenal leap in telemedicine. Its real-time, AI-powered diagnostics could drastically improve patient outcomes, especially in underserved regions. I'm excited about its potential.",
        name: "Dr. Aisha Khan",
        title: "Senior Cardiologist, National Institute of Heart Diseases",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        quote: "As a technology enthusiast and future medical professional, I'm genuinely impressed by CardioSense AI's seamless integration of IoT and AI. The intuitive interface makes complex data accessible to everyone.",
        name: "Ali Raza",
        title: "Medical Informatics Student & Health Innovator",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        quote: "The emphasis on Explainable AI is what truly sets CardioSense AI apart. It builds immense trust by providing clear rationale behind its classifications, a crucial factor for clinical adoption.",
        name: "Sarah Ahmed",
        title: "HealthTech Investment Analyst",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        quote: "For rural clinics like ours, CardioSense AI offers an unprecedented opportunity for early cardiac screening. It's affordable, accurate, and significantly reduces the need for patients to travel long distances for initial diagnosis.",
        name: "Dr. Imran Malik",
        title: "General Practitioner, Rural Healthcare Foundation",
        avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
        quote: "The ability to continuously monitor heart health from home with professional oversight is revolutionary. CardioSense AI empowers patients to take control of their well-being with confidence and peace of mind.",
        name: "Fatima Sohail",
        title: "Early Adopter & Patient Advocate",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
];

// --- i18n Configuration ---
// Configures i18n for language translation, providing English and Urdu translations.
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "home": "Home",
                    "features": "Features",
                    "howItWorks": "How It Works",
                    "technology": "Technology",
                    "ourTeam": "Our Team",
                    "faq": "FAQ",
                    "blog": "Blog",
                    "contact": "Contact",
                    "login": "Login",
                    "logout": "Logout",
                    "theme": "Theme",
                    "darkTheme": "Dark Theme",
                    "lightTheme": "Light Theme",
                    "language": "Language",
                    "english": "English",
                    "urdu": "Urdu",
                    "welcomeTitle": "IoT Based Phonocardiogram (PCG) Monitoring And AI-Driven Analysis System",
                    "welcomeSubtitle": "Empowering healthcare professionals and patients with real-time, AI-driven insights for early detection and continuous cardiac monitoring via CardioSense AI.",
                    "slogan": "Innovation | Precision | Care",
                    "discoverHowItWorks": "Discover How It Works",
                    "requestADemo": "Request a Demo",
                    "ourFeaturesTitle": "Unveiling Our Core Capabilities",
                    "realTimePcgAcquisition": "Real-Time PCG Acquisition",
                    "aiDrivenAnalysis": "AI-Driven Analysis",
                    "intuitiveUserInterface": "Intuitive User Interface",
                    "secureDataTransmission": "Secure Data Transmission",
                    "explainableAI": "Explainable AI (XAI)",
                    "rapidEarlyDetection": "Rapid Early Detection",
                    "howItWorksTitle": "The CardioSense AI Workflow",
                    "capturePcgData": "Capture PCG Data",
                    "secureTransmission": "Secure Transmission",
                    "aiAnalysis": "AI Analysis",
                    "insightsAlerts": "Insights & Alerts",
                    "livePcgMonitoring": "Live PCG Monitoring",
                    "startMonitoring": "Start Monitoring",
                    "stopMonitoring": "Stop Monitoring",
                    "simulateAnomaly": "Simulate Anomaly",
                    "heartRate": "Heart Rate",
                    "aiAnalysisStatus": "AI Analysis Status",
                    "pcgWaveform": "PCG Waveform",
                    "monitoringPaused": "Monitoring Paused",
                    "analyzingHeartSounds": "Analyzing HeartSounds...",
                    "normalSinusRhythm": "Normal Sinus Rhythm",
                    "systolicMurmurDetected": "Systolic Murmur Detected",
                    "mildArrhythmiaIdentified": "Mild Arrhythmia Identified",
                    "significantIrregularityDetected": "Significant Irregularity Detected!",
                    "startMonitoringToSimulateAnomaly": "Start monitoring to simulate anomaly.",
                    "technologyTitle": "The Power Behind CardioSense AI",
                    "ourTeamTitle": "Meet Our Visionary Team",
                    "faqTitle": "Frequently Asked Questions",
                    "blogTitle": "Latest Insights & News",
                    "contactUsTitle": "Connect With Us",
                    "contactUsDesc": "Have questions or need support? Reach out to us!",
                    "phone": "Phone",
                    "email": "Email",
                    "address": "Address",
                    "yourName": "Your Name",
                    "yourEmail": "Your Email",
                    "yourMessage": "Your Message",
                    "sendMessage": "Send Message",
                    "emailAddressCannotBeEmpty": "Email address cannot be empty.",
                    "pleaseEnterAValidEmail": "Please enter a valid email address (e.g., example@domain.com).",
                    "subscribedConfirmation": "Thank you for subscribing! Check your inbox for updates.",
                    "allFieldsAreRequired": "All fields are required.",
                    "failedToSendMsg": "Failed to send message. Please try again later.",
                    "unexpectedErrorOccurred": "An unexpected error occurred. Please try again.",
                    "messageSentSuccessfully": "Your message has been sent successfully! We'll get back to you soon.",
                    "subscribeToNewsletter": "Subscribe to Our Newsletter",
                    "getLatestUpdates": "Get the latest updates, news, and insights directly to your inbox.",
                    "subscribe": "Subscribe",
                    "allRightsReserved": "All Rights Reserved.",
                    "dedicatedToHealthcare": "Dedicated to enhancing healthcare management.",
                    "loginSuccess": "Successfully logged in!",
                    "switchedToLightTheme": "Switched to Light Theme",
                    "switchedToDarkTheme": "Switched to Dark Theme",
                    "contact_info": "Contact Info",
                    "aboutUsTitle": "About CardioSense AI",
                    "aboutUsIntro": "The project falls under the interdisciplinary domain of Artificial Intelligence (AI) in Healthcare, specifically focusing on Biomedical Signal Processing and the Internet of Medical Things (IoMT). This domain is rapidly evolving due1to the increasing global demand for accessible, intelligent, and real-time diagnostic solutions.",
                    "aboutUsProblemIntro": "Cardiovascular diseases (CVDs) are the world’s leading cause of death, responsible for nearly 18 million deaths annually [1]. These conditions often remain undiagnosed until advanced stages. Heart sound abnormalities—especially subtle S3 and S4 sounds—are key early indicators but are often missed by conventional stethoscopes that rely on human expertise [2]. This gap has led to the development of AI-enhanced tools offering greater accuracy and reliability.",
                    "aboutUsProblemCurrentPractices": "Current diagnostic practices rely on either human interpretation via stethoscopes or expensive clinical equipment, which may not be practical or available in resource-constrained environments. Furthermore, many existing systems lack real-time functionality, fall short in terms of diagnostic accuracy, or are too costly for wide-scale deployment. These limitations highlight the need for a low-cost, intelligent solution that is both accurate and accessible.",
                    "aboutUsSolution": "This project introduces an IoT-enabled phonocardiogram (PCG) monitoring system using a custom-built digital stethoscope integrated with an ESP32 microcontroller and sensors. Captured heart sounds are transformed into spectrograms and fed into a Convolutional Neural Network (CNN) for classification into six categories: Normal, Abnormal, Murmur, Extrasystole, Valve Disorder, and Extra Sounds. The CNN model, developed in Python using TensorFlow, was trained on a Kaggle dataset of over 3,000 labeled PCG recordings. It achieved 99% training accuracy and 97% testing accuracy, trained over 50 epochs with a batch size of 32 and learning rate of 0.001 using the Adam optimizer.",
                    "aboutUsFutureImprovements": "Although the system performs effectively on pre-recorded data, future improvements include optimizing live signal acquisition, enhancing noise filtering, and full edge deployment for standalone real-time diagnosis in low-resource settings.",
                    "healthcareVisionAlt": "Healthcare Vision",
                    "imageNotAvailable": "Image Not Available",
                    "yourBrowserDoesNotSupportTheVideoTag": "Your browser does not support the video tag.",
                    "goBackToHome": "Go Back to Home",
                    "invalidCredentials": "Invalid credentials. Please try again.",
                    "logoutSuccess": "Successfully logged out!"
                }
            },
            ur: {
                translation: {
                    "home": "ہوم",
                    "features": "خصوصیات",
                    "howItWorks": "یہ کیسے کام کرتا ہے",
                    "technology": "ٹیکنالوجی",
                    "ourTeam": "ہماری ٹیم",
                    "faq": "اکثر پوچھے جانے والے سوالات",
                    "blog": "بلاگ",
                    "contact": "رابطہ کریں",
                    "login": "لاگ ان",
                    "logout": "لاگ آؤٹ",
                    "theme": "تھیم",
                    "darkTheme": "ڈارک تھیم",
                    "lightTheme": "لائٹ تھیم",
                    "language": "زبان",
                    "english": "انگریزی",
                    "urdu": "اردو",
                    "welcomeTitle": "آئی او ٹی پر مبنی فونوکارڈیوگرام (پی سی جی) مانیٹرنگ اور اے آئی پر مبنی تجزیاتی نظام",
                    "welcomeSubtitle": "صحت کی دیکھ بھال کے ماہرین اور مریضوں کو CardioSense AI کے ذریعے دل کی ابتدائی تشخیص اور مسلسل نگرانی کے لیے حقیقی وقت میں، AI پر مبنی بصیرت کے ساتھ بااختیار بنانا۔",
                    "slogan": "جدت | درستگی | دیکھ بھال",
                    "discoverHowItWorks": "جانیں یہ کیسے کام کرتا ہے",
                    "requestADemo": "ڈیمو کی درخواست کریں",
                    "ourFeaturesTitle": "ہماری بنیادی صلاحیتوں کا انکشاف",
                    "realTimePcgAcquisition": "ریئل ٹائم پی سی جی حصول",
                    "aiDrivenAnalysis": "اے آئی پر مبنی تجزیہ",
                    "intuitiveUserInterface": "بدیہی یوزر انٹرفیس",
                    "secureDataTransmission": "محفوظ ڈیٹا کی منتقلی",
                    "explainableAI": "قابل وضاحت اے آئی (XAI)",
                    "rapidEarlyDetection": "فوری ابتدائی تشخیص",
                    "howItWorksTitle": "CardioSense AI ورک فلو",
                    "capturePcgData": "پی سی جی ڈیٹا حاصل کریں",
                    "secureTransmission": "محفوظ منتقلی",
                    "aiAnalysis": "اے آئی تجزیہ",
                    "insightsAlerts": "بصیرت اور انتباہات",
                    "livePcgMonitoring": "لائیو پی سی جی مانیٹرنگ",
                    "startMonitoring": "مانیٹرنگ شروع کریں",
                    "stopMonitoring": "مانیٹرنگ روکیں",
                    "simulateAnomaly": "بے قاعدگی کی نقل کریں",
                    "heartRate": "دل کی دھڑکن",
                    "aiAnalysisStatus": "اے آئی تجزیہ کی حیثیت",
                    "pcgWaveform": "پی سی جی ویوفارم",
                    "monitoringPaused": "مانیٹرنگ رکی ہوئی ہے",
                    "analyzingHeartSounds": "دل کی آوازوں کا تجزیہ ہو رہا ہے...",
                    "normalSinusRhythm": "نارمل سائنوس ردھم",
                    "systolicMurmurDetected": "سسٹولک مرمر کا پتہ چلا",
                    "mildArrhythmiaIdentified": "ہلکی ایریتھمیا کی شناخت ہوئی",
                    "significantIrregularityDetected": "اہم بے قاعدگی کا پتہ چلا!",
                    "startMonitoringToSimulateAnomaly": "بے قاعدگی کی نقل کرنے کے لیے مانیٹرنگ شروع کریں۔",
                    "technologyTitle": "CardioSense AI کے پیچھے کی طاقت",
                    "ourTeamTitle": "ہماری بصیرت افروز ٹیم سے ملیں",
                    "faqTitle": "اکثر پوچھے جانے والے سوالات",
                    "blogTitle": "تازہ ترین بصیرت اور خبریں",
                    "contactUsTitle": "ہم سے رابطہ کریں",
                    "contactUsDesc": "سوالات ہیں یا مدد کی ضرورت ہے؟ ہم سے رابطہ کریں!",
                    "phone": "فون",
                    "email": "ای میل",
                    "address": "پتہ",
                    "yourName": "آپ کا نام",
                    "yourEmail": "آپ کا ای میل",
                    "yourMessage": "آپ کا پیغام",
                    "sendMessage": "پیغام بھیجیں",
                    "emailAddressCannotBeEmpty": "ای میل ایڈریس خالی نہیں ہو سکتا۔",
                    "pleaseEnterAValidEmail": "براہ کرم ایک درست ای میل ایڈریس درج کریں (مثلاً: example@domain.com)۔",
                    "subscribedConfirmation": "سبسکرائب کرنے کا شکریہ! اپ ڈیٹس کے لیے اپنا ان باکس چیک کریں۔",
                    "allFieldsAreRequired": "تمام فیلڈز درکار ہیں۔",
                    "failedToSendMsg": "پیغام بھیجنے میں ناکام رہا۔ براہ کرم بعد میں دوبارہ کوشش کریں۔",
                    "unexpectedErrorOccurred": "ایک غیر متوقع خرابی پیش آگئی۔ براہ کرم دوبارہ کوشش کریں۔",
                    "messageSentSuccessfully": "آپ کا پیغام کامیابی سے بھیجا گیا ہے! ہم جلد ہی آپ سے رابطہ کریں گے۔",
                    "subscribeToNewsletter": "ہمارے نیوز لیٹر کو سبسکرائب کریں",
                    "getLatestUpdates": "تازہ ترین اپ ڈیٹس، خبریں، اور بصیرت براہ راست اپنے ان باکس میں حاصل کریں۔",
                    "subscribe": "سبسکرائب کریں",
                    "allRightsReserved": "تمام حقوق محفوظ ہیں۔",
                    "dedicatedToHealthcare": "صحت کی دیکھ بھال کو بہتر بنانے کے لیے وقف ہے۔",
                    "loginSuccess": "کامیابی سے لاگ ان ہو گئے!",
                    "switchedToLightTheme": "لائٹ تھیم پر سوئچ کر دیا گیا",
                    "switchedToDarkTheme": "ڈارک تھیم پر سوئچ کر دیا گیا",
                    "contact_info": "رابطہ کی معلومات",
                    "aboutUsTitle": "CardioSense AI کے بارے میں",
                    "aboutUsIntro": "یہ منصوبہ صحت کی دیکھ بھال میں مصنوعی ذہانت (AI) کے بین الضابطہ ڈومین کے تحت آتا ہے، خاص طور پر بائیو میڈیکل سگنل پروسیسنگ اور انٹرنیٹ آف میڈیکل تھنگز (IoMT) پر توجہ مرکوز کرتا ہے۔ قابل رسائی، ذہین، اور حقیقی وقت کے تشخیصی حل کی بڑھتی ہوئی عالمی مانگ کی وجہ سے یہ ڈومین تیزی سے ترقی کر رہا ہے۔",
                    "aboutUsProblemIntro": "قلبی بیماریاں (CVDs) دنیا بھر میں موت کی سب سے بڑی وجہ ہیں، جو سالانہ تقریباً 18 ملین اموات کا باعث بنتی ہیں [1]۔ یہ حالات اکثر جدید مراحل تک غیر تشخیص شدہ رہتے ہیں۔ دل کی آواز کی غیر معمولیات—خاص طور پر لطیف S3 اور S4 آوازیں—اہم ابتدائی اشارے ہیں لیکن روایتی سٹیتھوسکوپس کے ذریعے اکثر نظر انداز کر دی جاتی ہیں جو انسانی مہارت پر انحصار کرتی ہیں [2]۔ اس خلا کی وجہ سے AI سے بہتر ٹولز کی ترقی ہوئی ہے جو زیادہ درستگی اور قابل اعتمادی پیش کرتے ہیں۔",
                    "aboutUsProblemCurrentPractices": "موجودہ تشخیصی طریقوں کا انحصار سٹیتھوسکوپس کے ذریعے انسانی تشریح یا مہنگے طبی آلات پر ہے، جو وسائل کی کمی والے ماحول میں عملی یا دستیاب نہیں ہو سکتے۔ مزید برآں، بہت سے موجودہ نظاموں میں حقیقی وقت کی فعالیت کی کمی ہے، تشخیصی درستگی کے لحاظ سے کم ہیں، یا بڑے پیمانے پر تعیناتی کے لیے بہت مہنگے ہیں۔ یہ حدود کم لاگت، ذہین حل کی ضرورت کو اجاگر کرتی ہیں جو درست اور قابل رسائی دونوں ہوں۔",
                    "aboutUsSolution": "یہ منصوبہ ایک IoT سے چلنے والا فونوکارڈیوگرام (PCG) مانیٹرنگ سسٹم متعارف کراتا ہے جس میں ایک حسب ضرورت ڈیجیٹل سٹیتھوسکوپ کو ESP32 مائیکرو کنٹرولر اور سینسرز کے ساتھ مربوط کیا گیا ہے۔ حاصل شدہ دل کی آوازوں کو سپیکٹوگرامز میں تبدیل کیا جاتا ہے اور چھ زمروں میں درجہ بندی کے لیے کنولیشنل نیورل نیٹ ورک (CNN) میں داخل کیا جاتا ہے: نارمل، غیر معمولی، مرمر، ایکسٹراسسٹول، والو ڈس آرڈر، اور اضافی آوازیں [3][4]۔ CNN ماڈل، جو پائتھون میں TensorFlow کا استعمال کرتے ہوئے تیار کیا گیا ہے، 3,000 سے زیادہ لیبل شدہ PCG ریکارڈنگز کے Kaggle ڈیٹا سیٹ پر تربیت یافتہ تھا۔ اس نے 50 ادوار میں 32 کے بیچ سائز اور Adam آپٹیمائزر کا استعمال کرتے ہوئے 0.001 کی سیکھنے کی شرح کے ساتھ 99% ٹریننگ درستگی اور 97% ٹیسٹنگ درستگی حاصل کی [5]۔",
                    "aboutUsFutureImprovements": "اگرچہ نظام پہلے سے ریکارڈ شدہ ڈیٹا پر مؤثر طریقے سے کام کرتا ہے، مستقبل کی بہتریوں میں لائیو سگنل کے حصول کو بہتر بنانا، شور کو فلٹر کرنا، اور کم وسائل والے ماحول میں اسٹینڈ لون حقیقی وقت کی تشخیص کے لیے مکمل ایج تعیناتی شامل ہے۔",
                    "healthcareVisionAlt": "Healthcare Vision",
                    "imageNotAvailable": "Image Not Available",
                    "yourBrowserDoesNotSupportTheVideoTag": "آپ کا براؤزر ویڈیو ٹیگ کو سپورٹ نہیں کرتا ہے۔",
                    "goBackToHome": "Go Back to Home",
                    "invalidCredentials": "Invalid credentials. Please try again.",
                    "logoutSuccess": "Successfully logged out!"
                }
            },
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

// --- Theme Configuration (Light and Dark Themes are now available) ---
const themes = {
    light: {
        name: 'Light',
        backgroundClass: 'bg-gray-100',
        textColorClass: 'text-gray-900',
        cardBgClass: 'bg-white',
        cardBorderClass: 'border-gray-200',
        navbarBgClass: 'bg-white',
        navbarTextColor: 'text-gray-800',
        shadowClass: 'shadow-lg',
        buttonPrimaryClass: 'bg-blue-600 hover:bg-blue-700 text-white',
        buttonSecondaryClass: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        iconColorClass: 'text-gray-600',
        featureIconColor: 'text-blue-500',
        activeNavLink: 'text-blue-700 font-bold border-b-2 border-blue-700'
    },
    dark: {
        name: 'Dark',
        backgroundClass: 'bg-gray-900',
        textColorClass: 'text-gray-100',
        cardBgClass: 'bg-gray-800',
        cardBorderClass: 'border-gray-700',
        navbarBgClass: 'bg-gray-900',
        navbarTextColor: 'text-gray-100',
        shadowClass: 'shadow-xl',
        buttonPrimaryClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        buttonSecondaryClass: 'bg-gray-600 hover:bg-gray-500 text-gray-100',
        iconColorClass: 'text-gray-300',
        featureIconColor: 'text-indigo-400',
        activeNavLink: 'text-indigo-400 font-bold border-b-2 border-indigo-400'
    },
};

// --- Missing Icon Components (Basic SVG placeholders) ---
const HeartIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const Bars3Icon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const XMarkIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CheckCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 00-1.124-1.09l-4.16 4.25-2.08-2.08a.75.75 0 10-1.06 1.06l2.75 2.75a.75.75 0 001.06 0l4.75-4.75z" clipRule="evenodd" />
    </svg>
);

// Re-added MoonIcon and SunIcon definitions
const MoonIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.104.996 6.25 6.25 0 0010.918 6.471.75.75 0 011.232.748 8.75 8.75 0 11-12.983-12.392.75.75 0 01.989-.104z" clipRule="evenodd" />
    </svg>
);

const SunIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.5 1.5a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0V2.25a.75.75 0 00-.75-.75zm4.872 3a.75.75 0 00-.53.22L14.072 5.6a.75.75 0 001.06 1.06l.707-.707a.75.75 0 00-.53-1.28zM17.25 10.5a.75.75 0 00.75-.75V8.25a.75.75 0 00-1.5 0v1.5a.75.75 0 00.75.75zM14.072 17.072a.75.75 0 001.06 1.06l.707-.707a.75.75 0 00-.53-1.28.75.75 0 00-.53.22zM12 15a3 3 0 100-6 3 3 0 000 6zm-5.25 4.122a.75.75 0 00.53-.22L7.928 18.4a.75.75 0 00-1.06-1.06l-.707.707a.75.75 0 00.53 1.28zM4.5 10.5a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-.75-.75zm2.378-5.25a.75.75 0 00-1.06-1.06l-.707.707a.75.75 0 00.53 1.28.75.75 0 00.53-.22z" clipRule="evenodd" />
    </svg>
);


/**
 * Card Component: A reusable card container with a title and optional header content.
 * Provides a consistent look and feel for various sections of the dashboard.
 * @param {object} props - Component props.
 * @param {string} [props.title] - The title of the card.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} [props.className=''] - Additional CSS classes for the card.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {string} [props.id] - Optional ID for the card (for scrolling).
 */
const Card = ({ title, children, className = '', themeColors, id }) => (
    <motion.div
        id={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${themeColors.cardBgClass} p-6 rounded-xl ${themeColors.shadowClass} ${themeColors.cardBorderClass} ${className} border`}
    >
        {title && <h2 className={`text-3xl font-bold mb-6 text-center ${themeColors.textColorClass}`}>{title}</h2>}
        {children}
    </motion.div>
);

/**
 * NavBarHome Component: Top navigation bar for the home page.
 * Includes branding, navigation links, theme toggle, and language selector.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.currentThemeName - Name of the current active theme.
 * @param {function} props.toggleTheme - Function to toggle the theme.
 * @param {string} props.language - Current language code.
 * @param {function} props.setLanguage - Function to set the language.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.scrollToSection - Function to scroll to a specific section.
 * @param {string} props.activeSection - The currently active section ID.
 * @param {function} props.onLoginClick - Function to handle login button click (navigate to login page).
 * @param {function} props.onLogoutClick - Function to handle logout button click.
 * @param {boolean} props.isLoggedIn - Current login status.
 * @param {function} props.setIsMobileMenuOpen - Function to open/close mobile menu.
 */
const NavBarHome = ({ t, currentThemeName, toggleTheme, language, setLanguage, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen, onLoginClick, onLogoutClick, isLoggedIn }) => {
    // Navigation links for the Navbar
    const navLinks = [
        { id: 'hero-section', label: t('home') },
        { id: 'about-us-section', label: t('aboutUsTitle') },
        { id: 'features-section', label: t('features') },
        { id: 'how-it-works-section', label: t('howItWorks') },
        { id: 'live-pcg-monitoring-demo-section', label: t('livePcgMonitoring') },
        { id: 'technology-section', label: t('technology') },
        { id: 'team-section', label: t('ourTeam') },
        { id: 'faq-section', label: t('faq') },
        { id: 'blog-section', label: t('blog') },
        { id: 'contact-section', label: t('contact') },
    ];

    return (
        <nav className={`${themeColors.navbarBgClass} ${themeColors.navbarTextColor} p-4 ${themeColors.shadowClass} relative z-40`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Brand Logo/Title */}
                <div className="text-2xl font-bold tracking-wide">
                    <a href="#hero-section" onClick={(e) => { e.preventDefault(); scrollToSection('hero-section'); }} className="flex items-center">
                        <HeartIcon className="h-8 w-8 mr-2 text-red-500 dark:text-red-300" /> CardioSense AI
                    </a>
                </div>
                {/* Mobile Menu Button (visible on small screens) */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMobileMenuOpen(true)} className={`${themeColors.textColorClass} focus:outline-none p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}>
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </div>
                {/* Desktop Navigation Links and Controls (hidden on small screens) */}
                <div className="hidden lg:flex items-center space-x-4 text-sm"> {/* Reduced space and text size */}
                    {navLinks.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.id);
                            }}
                            className={`px-3 py-2 rounded-md transition-colors duration-200
                                ${activeSection === link.id ? themeColors.activeNavLink : `hover:text-blue-600 dark:hover:text-indigo-400`}`
                            }
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                        title={currentThemeName === 'light' ? t('darkTheme') : t('lightTheme')}
                    >
                        {currentThemeName === 'light' ? (
                            <MoonIcon className="w-6 h-6 text-gray-600 dark:text-yellow-300" />
                        ) : (
                            <SunIcon className="w-6 h-6 text-yellow-300" />
                        )}
                    </button>

                    {/* Language Selector */}
                    <select
                        className={`p-2 rounded-md ${themeColors.navbarBgClass} ${themeColors.textColorClass} border ${themeColors.cardBorderClass} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">{t('english')}</option>
                        <option value="ur">{t('urdu')}</option>
                    </select>

                    {/* Login/Logout Button */}
                    {isLoggedIn ? (
                        <button
                            onClick={onLogoutClick}
                            className={`${themeColors.buttonSecondaryClass} px-4 py-2 rounded-md transition duration-300`}
                        >
                            {t('logout')}
                        </button>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className={`${themeColors.buttonPrimaryClass} px-4 py-2 rounded-md transition duration-300`}
                        >
                            {t('login')}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

/**
 * HeroSection Component: The main introductory section of the homepage.
 * Features a compelling title, subtitle, and call-to-action buttons, with a dynamic video background.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.handleRequestDemo - Callback for demo request button.
 */
const HeroSection = ({ t, themeColors, handleRequestDemo }) => (
    <section id="hero-section" className={`relative h-screen flex items-center justify-center text-center px-6 py-24 md:py-32 text-white shadow-xl min-h-[70vh] overflow-hidden`}>
        {/* Video Background with dynamic brightness */}
        <video
            autoPlay
            loop
            muted
            playsInline // Important for mobile autoplay
            className="absolute inset-0 w-full h-full object-cover z-0"
            // Dynamic brightness based on theme
            style={{ filter: `brightness(${themeColors.name === 'dark' ? '0.35' : '0.5'})` }}
        >
            <source src={liveVideoMP4} type="video/mp4" />
            {t('yourBrowserDoesNotSupportTheVideoTag')}
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 z-0"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-4xl leading-tight mb-6 drop-shadow-2xl opacity-0 animate-fade-in-up-delay-100">
                <span className="text-yellow-300">{t('welcomeTitle')}</span>
            </h1>

            <p className="text-lg md:text-xl max-w-3xl mb-6 drop-shadow-md opacity-0 animate-fade-in-up-delay-300">
                <strong className="text-white">{t('welcomeSubtitle')}</strong>
            </p>

            <p className="text-sm uppercase tracking-wider mb-10 text-blue-200 opacity-0 animate-fade-in-up-delay-400">
                {t('slogan')}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 opacity-0 animate-fade-in-up-delay-500">
                <a
                    href="#how-it-works-section"
                    onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="bg-white text-blue-800 font-bold px-10 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-base"
                >
                    {t('discoverHowItWorks')}
                </a>
                <button
                    onClick={handleRequestDemo}
                    className="bg-blue-600 text-white font-bold px-10 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-base"
                >
                    {t('requestADemo')}
                </button>
            </div>

            {/* Scroll down indicator */}
            <div className="mt-16 animate-bounce opacity-0 animate-fade-in-up">
                <FaArrowUp className="rotate-180 text-white text-3xl mx-auto" />
            </div>
        </div>
    </section>
);

/**
 * AboutUsSection Component: Provides information about the platform's mission and goals.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const AboutUsSection = ({ t, themeColors }) => (
    <section id="about-us-section" className={`py-16 px-4 ${themeColors.backgroundClass}`}>
        <div className="max-w-7xl mx-auto">
            <Card title={t('aboutUsTitle')} themeColors={themeColors}>
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <p className={`text-lg leading-relaxed ${themeColors.textColorClass} opacity-90`}>
                        {t('aboutUsIntro')}
                    </p>
                    <p className={`text-lg leading-relaxed ${themeColors.textColorClass} opacity-90`}>
                        <strong className="text-blue-600 dark:text-blue-300">{t('aboutUsProblemIntro')}</strong>
                    </p>
                    <p className={`text-lg leading-relaxed ${themeColors.textColorClass} opacity-90`}>
                        <strong className="text-blue-600 dark:text-blue-300">{t('aboutUsProblemCurrentPractices')}</strong>
                    </p>
                    <p className={`text-lg leading-relaxed ${themeColors.textColorClass} opacity-90`}>
                        <strong className="text-green-600 dark:text-green-300">{t('aboutUsSolution')}</strong>
                    </p>
                    <p className={`text-lg leading-relaxed ${themeColors.textColorClass} opacity-90`}>
                        {t('aboutUsFutureImprovements')}
                    </p>
                    <img
                        src="https://placehold.co/800x400/4F46E5/FFFFFF?text=Healthcare+Image"
                        alt={t('healthcareVisionAlt')}
                        className="mt-8 rounded-lg shadow-lg mx-auto w-full md:w-3/4 object-cover"
                        loading="lazy"
                        onError={(e) => e.target.src = `https://placehold.co/800x400/CCCCCC/000000?text=${t('imageNotAvailable')}`}
                    />
                </div>
            </Card>
        </div>
    </section>
);

/**
 * FeaturesSection Component: Highlights the key functionalities of the platform.
 * Displays features in a grid layout with icons, titles, and descriptions.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const FeaturesSection = ({ t, themeColors }) => {
    // Features data is imported from external data definitions
    return (
        <section id="features-section" className={`py-16 px-4 ${themeColors.backgroundClass}`}>
            <div className="max-w-7xl mx-auto">
                <Card title={t('ourFeaturesTitle')} themeColors={themeColors}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`feature-card p-6 rounded-lg text-center ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass} transform transition-all duration-300 hover:z-10`}
                            >
                                <div className="mb-4 flex justify-center">{feature.icon}</div>
                                <h3 className={`text-xl font-semibold mb-2 ${themeColors.textColorClass}`}>{t(feature.title.replace(/\s/g, '').toLowerCase())}</h3>
                                <p className={`text-gray-600 dark:text-gray-400`}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </div>
        </section>
    );
};

/**
 * HowItWorksSection Component: Explains the operational workflow of CardioSense AI.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const HowItWorksSection = ({ t, themeColors }) => (
    <section id="how-it-works-section" className={`py-16 px-4 ${themeColors.backgroundClass}`}>
        <div className="max-w-7xl mx-auto">
            <Card title={t('howItWorksTitle')} themeColors={themeColors}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {howItWorksSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className={`how-it-works-step p-6 rounded-lg text-center ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass} transform transition-all duration-300 hover:z-10`}
                        >
                            <div className="mb-4 flex justify-center">{step.icon}</div>
                            <h3 className={`text-xl font-semibold mb-2 ${themeColors.textColorClass}`}>{t(step.title.replace(/\s/g, '').toLowerCase())}</h3>
                            <p className={`text-gray-600 dark:text-gray-400`}>{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    </section>
);

/**
 * LivePcgMonitoringDemo Component: Simulates real-time PCG data acquisition and AI analysis.
 * Features a live waveform chart and displays simulated heart rate and AI analysis status.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {Array<number>} props.pcgData - Array of PCG data points for the waveform.
 * @param {number} props.heartRate - Current simulated heart rate.
 * @param {string} props.aiAnalysis - Current simulated AI analysis status.
 * @param {boolean} props.isMonitoring - Boolean indicating if monitoring is active.
 * @param {function} props.startMonitoring - Function to start monitoring.
 * @param {function} props.stopMonitoring - Function to stop monitoring.
 * @param {function} props.simulateAnomaly - Function to trigger a simulated anomaly.
 * @param {object} props.chartData - Chart.js data object.
 * @param {object} props.chartOptions - Chart.js options object.
 */
const LivePcgMonitoringDemo = ({
    t, themeColors, pcgData, heartRate, aiAnalysis, isMonitoring,
    startMonitoring, stopMonitoring, simulateAnomaly, chartData, chartOptions
}) => {
    // Helper to determine status color
    const getStatusColorClass = (status) => {
        if (status.includes("Normal") || status.includes("نارمل")) return "text-emerald-500 dark:text-emerald-400";
        if (status.includes("Anomaly") || status.includes("Irregularity") || status.includes("Murmur") || status.includes("Arrhythmia") || status.includes("بے قاعدگی")) return "text-red-500 dark:text-red-400 animate-pulse";
        return themeColors.textColorClass;
    };

    return (
        <section id="live-pcg-monitoring-demo-section" className={`py-16 px-4 ${themeColors.backgroundClass}`}>
            <div className="max-w-7xl mx-auto">
                <Card title={t('livePcgMonitoring')} themeColors={themeColors}>
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        {/* Live PCG Chart */}
                        <div className={`lg:w-2/3 w-full h-80 relative p-4 rounded-lg ${themeColors.cardBgClass} border ${themeColors.cardBorderClass} shadow-inner`}>
                            <h3 className={`text-lg font-semibold mb-2 ${themeColors.textColorClass}`}>{t('pcgWaveform')}</h3>
                            <div className="h-64">
                                <Line data={chartData} options={chartOptions} />
                            </div>
                            <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-sm ${themeColors.textColorClass} opacity-70`}>
                                {isMonitoring ? "Streaming Live Data..." : t('monitoringPaused')}
                            </div>
                        </div>

                        {/* Controls and Status */}
                        <div className="lg:w-1/3 w-full space-y-6">
                            <div className={`p-6 rounded-lg ${themeColors.cardBgClass} border ${themeColors.cardBorderClass} shadow-md`}>
                                <h3 className={`text-xl font-semibold mb-4 ${themeColors.textColorClass}`}>Live Data</h3>
                                <div className="space-y-3">
                                    <p className={`text-lg flex items-center ${themeColors.textColorClass}`}>
                                        <MdOutlineMonitorHeart className="mr-3 text-2xl text-blue-500" />
                                        <strong>{t('heartRate')}:</strong> {heartRate > 0 ? `${heartRate} bpm` : '--'}
                                    </p>
                                    <p className={`text-lg flex items-center ${themeColors.textColorClass}`}>
                                        <BiAnalyse className="mr-3 text-2xl text-purple-500" />
                                        <strong>{t('aiAnalysisStatus')}:</strong> <span className={`ml-2 font-medium ${getStatusColorClass(aiAnalysis)}`}>{aiAnalysis}</span>
                                    </p>
                                </div>
                                <div className="mt-6 flex flex-col space-y-3">
                                    <button
                                        onClick={isMonitoring ? stopMonitoring : startMonitoring}
                                        className={`${isMonitoring ? 'bg-red-500 hover:bg-red-600' : themeColors.buttonPrimaryClass} w-full py-3 rounded-md font-semibold text-white transition-all duration-300`}
                                    >
                                        {isMonitoring ? t('stopMonitoring') : t('startMonitoring')}
                                    </button>
                                    <button
                                        onClick={simulateAnomaly}
                                        disabled={!isMonitoring}
                                        className={`${themeColors.buttonSecondaryClass} w-full py-3 rounded-md font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                                        title={!isMonitoring ? t('startMonitoringToSimulateAnomaly') : ''}
                                    >
                                        <FaExclamationTriangle className="inline mr-2" /> {t('simulateAnomaly')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

/**
 * TechnologySection Component: Highlights the core technologies used in CardioSense AI.
 * Provides a high-level overview of the technical stack.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const TechnologySection = ({ t, themeColors }) => {
    // Example technologies - customize as needed based on actual project tech stack
    const technologies = [
        { name: "IoT Devices", description: "Custom-built, portable hardware for high-fidelity PCG data acquisition.", icon: <BiDevices className="text-blue-500 text-4xl" /> },
        { name: "Deep Learning (CNN/LSTM)", description: "State-of-the-art neural networks for accurate heart sound classification and anomaly detection.", icon: <FaBrain className="text-green-500 text-4xl" /> },
        { name: "Cloud Computing", description: "Scalable and secure cloud infrastructure for data storage, processing, and AI model deployment.", icon: <FaCloudUploadAlt className="text-purple-500 text-4xl" /> },
        { name: "Secure Communication (Wi-Fi/BT/LoRa)", description: "Encrypted protocols for reliable and secure transmission of patient data.", icon: <MdSecurity className="text-red-500 text-4xl" /> },
        { name: "Explainable AI (XAI)", description: "Techniques to provide transparent and interpretable AI predictions for clinical validation.", icon: <FaComments className="text-yellow-500 text-4xl" /> },
        { name: "Cross-Platform Development", description: "Responsive web and mobile interfaces built with modern frameworks (React, React Native).", icon: <FaMobileAlt className="text-teal-500 text-4xl" /> },
    ];
    return (
        <section id="technology-section" className={`py-16 px-4 ${themeColors.backgroundClass}`}>
            <div className="max-w-7xl mx-auto">
                <Card title={t('technologyTitle')} themeColors={themeColors}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`p-6 rounded-lg ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass} flex flex-col items-center text-center`}
                            >
                                {tech.icon}
                                <h3 className={`text-xl font-semibold mt-4 mb-2 ${themeColors.textColorClass}`}>{tech.name}</h3>
                                <p className={`text-gray-600 dark:text-gray-400`}>{tech.description}</p>
                            </motion.div>
                        ))}
                    </div>
                    {/* Add CNN model details here */}
                    <div className={`mt-12 p-6 rounded-lg ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass}`}>
                        <h3 className={`text-2xl font-bold mb-4 ${themeColors.textColorClass}`}>CNN Model Details</h3>
                        <p className={`text-lg leading-relaxed ${themeColors.textColorClass} opacity-90`}>
                            {t('aboutUsSolution')} {/* Reusing the translated solution text from AboutUs for consistency */}
                        </p>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-4 space-y-2">
                            <li><strong>Training Accuracy:</strong> 99%</li>
                            <li><strong>Testing Accuracy:</strong> 97%</li>
                            <li><strong>Epochs:</strong> 50</li>
                            <li><strong>Batch Size:</strong> 32</li>
                            <li><strong>Learning Rate:</strong> 0.001</li>
                            <li><strong>Optimizer:</strong> Adam</li>
                        </ul>
                    </div>
                </Card>
            </div>
        </section>
    );
};

/**
 * TeamSection Component: Displays information about the core team members.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const TeamSection = ({ t, themeColors }) => (
    <section id="team-section" className={`py-16 px-4 ${themeColors.backgroundClass}`}>
        <div className="max-w-7xl mx-auto">
            <Card title={t('ourTeamTitle')} themeColors={themeColors}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className={`team-member-card p-6 rounded-lg ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass} text-center transform transition-all duration-300 hover:z-10`}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500 dark:border-indigo-400 mb-4 shadow-md"
                                onError={(e) => e.target.src = "https://placehold.co/150x150/CCCCCC/000000?text=Avatar"} // Fallback image
                            />
                            <h3 className={`text-xl font-bold ${themeColors.textColorClass}`}>{member.name}</h3>
                            <p className="text-blue-600 dark:text-indigo-400 text-md font-semibold mb-3">{member.role}</p>
                            <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4`}>{member.bio}</p>
                            <div className="flex justify-center space-x-4">
                                {member.social.linkedin && (
                                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className={`text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors`}>
                                        <FaLinkedin className="text-2xl" />
                                    </a>
                                )}
                                {member.social.twitter && (
                                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className={`text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors`}>
                                        <FaTwitter className="text-2xl" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    </section>
);

/**
 * FAQSection Component: Displays a list of frequently asked questions with collapsible answers.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const FAQSection = ({ t, themeColors }) => (
    <section id="faq-section" className={`py-16 px-4 ${themeColors.backgroundClass}`}>
        <div className="max-w-4xl mx-auto">
            <Card title={t('faqTitle')} themeColors={themeColors}>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <motion.details
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={`p-4 rounded-lg cursor-pointer ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass}`}
                        >
                            <summary className={`flex justify-between items-center font-semibold ${themeColors.textColorClass}`}>
                                {faq.q}
                                <FaArrowUp className="details-arrow transition-transform duration-300 rotate-90" /> {/* Rotates on open */}
                            </summary>
                            <p className={`mt-3 text-gray-600 dark:text-gray-400 leading-relaxed`}>{faq.a}</p>
                        </motion.details>
                    ))}
                </div>
            </Card>
        </div>
    </section>
);

/**
 * BlogSection Component: Displays recent blog posts.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const BlogSection = ({ t, themeColors }) => (
    <section id="blog-section" className={`py-16 px-4 ${themeColors.backgroundClass}`}>
        <div className="max-w-7xl mx-auto">
            <Card title={t('blogTitle')} themeColors={themeColors}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`blog-post-card group block rounded-lg overflow-hidden ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass} transform transition-all duration-300 hover:z-10`}
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Blog+Image"} // Fallback
                            />
                            <div className="p-4">
                                <h3 className={`text-xl font-semibold mb-2 ${themeColors.textColorClass} group-hover:text-blue-600 dark:group-hover:text-indigo-400 transition-colors`}>
                                    {post.title}
                                </h3>
                                <p className={`text-gray-600 dark:text-gray-400 text-sm`}>{post.excerpt}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </Card>
        </div>
    </section>
);

/**
 * ContactSection Component: Displays contact information and a functional contact form.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {object} props.contactForm - State for contact form fields.
 * @param {function} props.handleContactFormChange - Handler for form field changes.
 * @param {function} props.handleContactSubmit - Handler for form submission.
 * @param {string} props.contactMessage - Success message from form submission.
 * @param {string} props.contactError - Error message from form submission.
 */
const ContactSection = ({ t, themeColors, contactForm, handleContactFormChange, handleContactSubmit, contactMessage, contactError }) => (
    <section id="contact-section" className={`py-16 px-4 ${themeColors.backgroundClass}`}>
        <div className="max-w-7xl mx-auto">
            <Card title={t('contactUsTitle')} themeColors={themeColors}>
                <p className={`text-lg text-center mb-8 ${themeColors.textColorClass} opacity-90`}>
                    {t('contactUsDesc')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {/* Phone Contact */}
                    <div className={`p-6 rounded-lg ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass}`}>
                        <FaPhone className={`h-10 w-10 mx-auto mb-3 ${themeColors.featureIconColor}`} />
                        <h3 className={`text-xl font-semibold mb-2 ${themeColors.textColorClass}`}>{t('phone')}</h3>
                        <p className={`text-gray-600 dark:text-gray-400`}>+1 (555) 123-4567</p>
                    </div>
                    {/* Email Contact */}
                    <div className={`p-6 rounded-lg ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass}`}>
                        <FaEnvelope className={`h-10 w-10 mx-auto mb-3 ${themeColors.featureIconColor}`} />
                        <h3 className={`text-xl font-semibold mb-2 ${themeColors.textColorClass}`}>{t('email')}</h3>
                        <p className={`text-gray-600 dark:text-gray-400`}>support@cardiosenseai.com</p>
                    </div>
                    {/* Address */}
                    <div className={`p-6 rounded-lg ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass}`}>
                        <FaMapMarkerAlt className={`h-10 w-10 mx-auto mb-3 ${themeColors.featureIconColor}`} />
                        <h3 className={`text-xl font-semibold mb-2 ${themeColors.textColorClass}`}>{t('address')}</h3>
                        <p className={`text-gray-600 dark:text-gray-400`}>123 Health Ave, Wellness City, HW 98765</p>
                    </div>
                </div>
                {/* Contact Form */}
                <div className="mt-12 max-w-2xl mx-auto">
                    <form onSubmit={handleContactSubmit} className={`p-8 rounded-lg ${themeColors.cardBgClass} ${themeColors.shadowClass} border ${themeColors.cardBorderClass}`}>
                        <h3 className={`text-2xl font-bold mb-6 text-center ${themeColors.textColorClass}`}>Send Us a Message</h3>
                        <div className="mb-4">
                            <label htmlFor="name" className={`block text-sm font-medium ${themeColors.textColorClass} mb-2`}>{t('yourName')}</label>
                            <input type="text" id="name" name="name" value={contactForm.name} onChange={handleContactFormChange} className={`w-full p-3 rounded-md border ${themeColors.cardBorderClass} ${themeColors.cardBgClass} ${themeColors.textColorClass} focus:ring-blue-500 focus:border-blue-500`} placeholder="John Doe" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className={`block text-sm font-medium ${themeColors.textColorClass} mb-2`}>{t('yourEmail')}</label>
                            <input type="email" id="email" name="email" value={contactForm.email} onChange={handleContactFormChange} className={`w-full p-3 rounded-md border ${themeColors.cardBorderClass} ${themeColors.cardBgClass} ${themeColors.textColorClass} focus:ring-blue-500 focus:border-blue-500`} placeholder="john.doe@example.com" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className={`block text-sm font-medium ${themeColors.textColorClass} mb-2`}>{t('yourMessage')}</label>
                            <textarea id="message" name="message" rows="4" value={contactForm.message} onChange={handleContactFormChange} className={`w-full p-3 rounded-md border ${themeColors.cardBorderClass} ${themeColors.cardBgClass} ${themeColors.textColorClass} focus:ring-blue-500 focus:border-blue-500`} placeholder="Type your message here..."></textarea>
                        </div>
                        {contactError && <p className="text-red-500 text-sm mb-4">{contactError}</p>}
                        {contactMessage && <p className="text-green-500 text-sm mb-4">{contactMessage}</p>}
                        <button type="submit" className={`${themeColors.buttonPrimaryClass} w-full py-3 rounded-md text-lg font-semibold`}>{t('sendMessage')}</button>
                    </form>
                </div>
            </Card>
        </div>
    </section>
);


/**
 * NewsletterSection Component: A section for users to subscribe to a newsletter.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {string} props.email - State for email input.
 * @param {function} props.setEmail - Setter for email input.
 * @param {boolean} props.subscribed - State for subscription status.
 * @param {function} props.handleSubscribe - Handler for subscription submission.
 * @param {string} props.error - Error message for subscription.
 */
const NewsletterSection = ({ t, themeColors, email, setEmail, subscribed, handleSubscribe, error }) => (
    <section className={`py-16 px-4 ${themeColors.backgroundClass}`}>
        <div className="max-w-4xl mx-auto">
            <Card themeColors={themeColors}>
                <div className="text-center">
                    <h3 className={`text-3xl font-bold mb-4 ${themeColors.textColorClass}`}>{t('subscribeToNewsletter')}</h3>
                    <p className={`text-lg mb-8 ${themeColors.textColorClass} opacity-90`}>{t('getLatestUpdates')}</p>
                    {subscribed ? (
                        <motion.p
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-emerald-600 dark:text-emerald-400 text-xl font-semibold"
                        >
                            <CheckCircleIcon className="inline-block h-6 w-6 mr-2" /> {t('subscribedConfirmation')}
                        </motion.p>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); if (error) useState(""); }}
                                placeholder={t('yourEmail')}
                                className={`flex-grow p-3 rounded-md border ${themeColors.cardBorderClass} ${themeColors.cardBgClass} ${themeColors.textColorClass} focus:ring-blue-500 focus:border-blue-500`}
                                aria-label="Email for newsletter"
                            />
                            <button
                                type="submit"
                                className={`${themeColors.buttonPrimaryClass} px-6 py-3 rounded-md font-semibold transition-colors duration-300`}
                            >
                                {t('subscribe')}
                            </button>
                        </form>
                    )}
                    {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                </div>
            </Card>
        </div>
    </section>
);


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
        <footer className={`${themeColors.cardBgClass} ${themeColors.cardBorderClass} py-8 text-center text-sm text-gray-600 dark:text-gray-400 mt-8 border-t`}>
            <div className="max-w-7xl mx-auto px-4">
                <p>&copy; {currentYear} CardioSense AI. {t('allRightsReserved')}.</p>
                <p className="mt-1 text-xs opacity-70">{t('dedicatedToHealthcare')}</p>
                {/* Quick Links */}
                <div className="mt-4 flex flex-wrap justify-center space-x-6">
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('privacyPolicy')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('termsOfService')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('support')}</a>
                    <a href="#contact-section" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('contact')}</a>
                </div>
                {/* Social Media Icons (using react-icons/fa for example) */}
                <div className="mt-6 flex justify-center space-x-5">
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`} aria-label="Facebook"><FaFacebook className="text-2xl" /></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`} aria-label="Twitter"><FaTwitter className="text-2xl" /></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`} aria-label="LinkedIn"><FaLinkedin className="text-2xl" /></a>
                </div>
            </div>
        </footer>
    );
};

/**
 * HomePage Component: Contains all the main sections of the application's home page.
 * This component is rendered when the user is not on the login page.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {object} props.sectionRefs - Refs for scrolling.
 * @param {function} props.setSectionRef - Function to set refs.
 * @param {function} props.handleRequestDemo - Callback for demo request.
 * @param {Array<number>} props.pcgData - PCG data for demo.
 * @param {number} props.heartRate - Current simulated heart rate.
 * @param {string} props.aiAnalysis - Current simulated AI analysis status.
 * @param {boolean} props.isMonitoring - Monitoring status for demo.
 * @param {function} props.startMonitoring - Start monitoring function.
 * @param {function} props.stopMonitoring - Stop monitoring function.
 * @param {function} props.simulateAnomaly - Simulate anomaly function.
 * @param {object} props.chartData - Chart data for demo.
 * @param {object} props.chartOptions - Chart options for demo.
 * @param {object} props.contactForm - Contact form state.
 * @param {function} props.handleContactFormChange - Contact form change handler.
 * @param {function} props.handleContactSubmit - Contact form submit handler.
 * @param {string} props.contactMessage - Contact form success message.
 * @param {string} props.contactError - Contact form error message.
 * @param {string} props.email - Newsletter email state.
 * @param {function} props.setEmail - Newsletter email setter.
 * @param {boolean} props.subscribed - Newsletter subscribed status.
 * @param {function} props.handleSubscribe - Newsletter subscribe handler.
 * @param {string} props.newsletterError - Newsletter error message.
 */
const HomePage = ({
    t, themeColors, sectionRefs, setSectionRef, handleRequestDemo,
    pcgData, heartRate, aiAnalysis, isMonitoring, startMonitoring, stopMonitoring, simulateAnomaly,
    chartData, chartOptions, contactForm, handleContactFormChange, handleContactSubmit, contactMessage, contactError,
    email, setEmail, subscribed, handleSubscribe, newsletterError
}) => (
    <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section ref={(el) => setSectionRef('hero-section', el)} id="hero-section">
            <HeroSection t={t} themeColors={themeColors} handleRequestDemo={handleRequestDemo} />
        </section>

        {/* About Us Section */}
        <section ref={(el) => setSectionRef('about-us-section', el)} id="about-us-section">
            <AboutUsSection t={t} themeColors={themeColors} />
        </section>

        {/* Features Section */}
        <section ref={(el) => setSectionRef('features-section', el)} id="features-section">
            <FeaturesSection t={t} themeColors={themeColors} />
        </section>

        {/* How It Works Section */}
        <section ref={(el) => setSectionRef('how-it-works-section', el)} id="how-it-works-section">
            <HowItWorksSection t={t} themeColors={themeColors} />
        </section>

        {/* Live PCG Monitoring Demo Section */}
        <section ref={(el) => setSectionRef('live-pcg-monitoring-demo-section', el)} id="live-pcg-monitoring-demo-section">
            <LivePcgMonitoringDemo
                t={t}
                themeColors={themeColors}
                pcgData={pcgData}
                heartRate={heartRate}
                aiAnalysis={aiAnalysis}
                isMonitoring={isMonitoring}
                startMonitoring={startMonitoring}
                stopMonitoring={stopMonitoring}
                simulateAnomaly={simulateAnomaly}
                chartData={chartData}
                chartOptions={chartOptions}
            />
        </section>

        {/* Technology Section */}
        <section ref={(el) => setSectionRef('technology-section', el)} id="technology-section">
            <TechnologySection t={t} themeColors={themeColors} />
        </section>

        {/* Our Team Section */}
        <section ref={(el) => setSectionRef('team-section', el)} id="team-section">
            <TeamSection t={t} themeColors={themeColors} />
        </section>

        {/* FAQ Section */}
        <section ref={(el) => setSectionRef('faq-section', el)} id="faq-section">
            <FAQSection t={t} themeColors={themeColors} />
        </section>

        {/* Blog Section */}
        <section ref={(el) => setSectionRef('blog-section', el)} id="blog-section">
            <BlogSection t={t} themeColors={themeColors} />
        </section>

        {/* Newsletter Subscription Section */}
        <NewsletterSection
            t={t}
            themeColors={themeColors}
            email={email}
            setEmail={setEmail}
            subscribed={subscribed}
            handleSubscribe={handleSubscribe}
            error={newsletterError}
        />

        {/* Contact Section */}
        <section ref={(el) => setSectionRef('contact-section', el)} id="contact-section">
            <ContactSection
                t={t}
                themeColors={themeColors}
                contactForm={contactForm}
                handleContactFormChange={handleContactFormChange}
                handleContactSubmit={handleContactSubmit}
                contactMessage={contactMessage}
                contactError={contactError}
            />
        </section>
    </main>
);

/**
 * LoginPage Component: Handles user login with a simple form.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.onLoginSuccess - Callback for successful login.
 * @param {function} props.onGoBack - Callback to go back to the previous page.
 */
const LoginPage = ({ t, themeColors, onLoginSuccess, onGoBack }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, useState] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        useState('');

        // Simple validation and simulated login
        if (username === 'user' && password === 'password') { // Replace with actual auth logic
            onLoginSuccess();
            toast.success(t('loginSuccess'));
        } else {
            useState(t('invalidCredentials'));
            toast.error(t('invalidCredentials'));
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${themeColors.backgroundClass}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`${themeColors.cardBgClass} p-8 rounded-lg shadow-xl max-w-md w-full border ${themeColors.cardBorderClass}`}
            >
                <h2 className={`text-3xl font-bold text-center mb-6 ${themeColors.textColorClass}`}>{t('login')}</h2>
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className={`block text-sm font-medium ${themeColors.textColorClass} mb-2`}>
                            {t('username')}
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full p-3 rounded-md border ${themeColors.cardBorderClass} ${themeColors.cardBgClass} ${themeColors.textColorClass} focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={`block text-sm font-medium ${themeColors.textColorClass} mb-2`}>
                            {t('password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-3 rounded-md border ${themeColors.cardBorderClass} ${themeColors.cardBgClass} ${themeColors.textColorClass} focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className={`${themeColors.buttonPrimaryClass} w-full py-3 rounded-md text-lg font-semibold transition duration-300`}
                    >
                        {t('login')}
                    </button>
                    <button
                        type="button"
                        onClick={onGoBack}
                        className={`${themeColors.buttonSecondaryClass} w-full py-3 rounded-md text-lg font-semibold mt-4 transition duration-300`}
                    >
                        {t('goBackToHome')}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};


// --- App Component (Main Component) ---
/**
 * App Component: Orchestrates all sub-components, manages state for theme, language,
 * and handles scrolling to sections for the Home Page.
 */
const App = () => {
    // Hooks for translation
    const { t, i18n } = useTranslation();

    // State for UI elements
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [email, setEmail] = useState(""); // For newsletter subscription
    const [subscribed, setSubscribed] = useState(false); // For newsletter subscription status
    const [newsletterError, setNewsletterError] = useState(""); // For newsletter subscription error

    // State for contact form
    const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
    const [contactMessage, setContactMessage] = useState(""); // Success message for contact form
    const [contactError, setContactError] = useState(""); // Error message for contact form

    // State for active section, used for navigation highlighting
    const [activeSection, setActiveSection] = useState('hero-section'); // Initial active section

    // State for simulated PCG data in Live Monitoring Demo
    const [pcgData, setPcgData] = useState(Array(50).fill(0)); // Initialize with 50 zeros for waveform
    const [heartRate, setHeartRate] = useState(0); // Initial heart rate
    const [aiAnalysis, setAiAnalysis] = useState("Monitoring Paused"); // Initial AI analysis status
    const [isMonitoring, setIsMonitoring] = useState(false); // Controls PCG data simulation
    const dataIntervalRef = useRef(null); // Ref to hold the interval ID for PCG data

    // State for page navigation and authentication
    const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'login'
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication status

    // State for theme
    const [isDarkMode, setIsDarkMode] = useState(false);


    // --- Refs for scrolling to sections ---
    const sectionRefs = useRef({});

    // Callback to assign refs to sections dynamically
    const setSectionRef = useCallback((id, element) => {
        if (element) {
            sectionRefs.current[id] = element;
        }
    }, []);

    // Dark Mode Toggle Effect
    useEffect(() => {
        // Check local storage for dark mode preference on mount
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode === 'true') {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    // Apply dark mode class to documentElement and save preference to local storage
    const setDarkMode = useCallback((isDark) => {
        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem('darkMode', 'true');
            toast.info(t('switchedToDarkTheme'));
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem('darkMode', 'false');
            toast.info(t('switchedToLightTheme'));
        }
    }, [t]);


    // Back to Top Button visibility Effect
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 600); // Show after scrolling 600px
        };
        // Always add scroll listener as LoginPage is now external
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Removed currentPage from dependency array

    // Intersection Observer for scroll-in animations and active section tracking
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fade-in-up");
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const timeoutId = setTimeout(() => {
            // Only observe if on the home page
            if (currentPage === 'home') {
                Object.values(sectionRefs.current).forEach((section) => {
                    if (section) {
                        observer.observe(section);
                    }
                });
            }
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            Object.values(sectionRefs.current).forEach((section) => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, [currentPage]); // Added currentPage to dependency array


    // --- PCG Monitoring Simulation Functions ---
    const startPcgMonitoring = useCallback(() => {
        if (isMonitoring) return;
        setIsMonitoring(true);
        let count = 0;
        const initialData = Array(50).fill(0).map(() => Math.random() * 2 - 1);
        setPcgData(initialData);
        setHeartRate(75);
        setAiAnalysis(t("analyzingHeartSounds"));

        dataIntervalRef.current = setInterval(() => {
            setPcgData(prevData => {
                const newDataPoint = Math.sin(count * 0.2) + Math.random() * 0.5 - 0.25;
                const updatedData = [...prevData.slice(1), newDataPoint];
                count++;

                if (count % 200 === 0) {
                    const statuses = [t("systolicMurmurDetected"), t("mildArrhythmiaIdentified"), t("normalSinusRhythm"), t("significantIrregularityDetected")];
                    const randomIndex = Math.floor(Math.random() * statuses.length);
                    setAiAnalysis(statuses[randomIndex]);
                } else if (count % 100 === 0) {
                    setAiAnalysis(t("normalSinusRhythm"));
                }

                setHeartRate(Math.floor(60 + Math.random() * 30));

                return updatedData;
            });
        }, 100);
    }, [isMonitoring, t]);

    const stopPcgMonitoring = useCallback(() => {
        setIsMonitoring(false);
        if (dataIntervalRef.current) {
            clearInterval(dataIntervalRef.current);
        }
        setPcgData(Array(50).fill(0));
        setAiAnalysis(t("monitoringPaused"));
        setHeartRate(0);
    }, [t]);

    const simulateAnomaly = useCallback(() => {
        if (!isMonitoring) {
            setAiAnalysis(t("startMonitoringToSimulateAnomaly"));
            return;
        }
        setAiAnalysis(t("significantIrregularityDetected"));
        setPcgData(prevData => {
            const lastFew = prevData.slice(-10);
            const anomalyPoints = lastFew.map((val, i) => val + Math.sin(i * Math.PI / 5) * 2);
            return [...prevData.slice(0, prevData.length - 10), ...anomalyPoints];
        });
    }, [isMonitoring, t]);

    const chartData = useMemo(() => ({
        labels: Array(pcgData.length).fill(''),
        datasets: [
            {
                label: 'PCG Waveform',
                data: pcgData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                pointRadius: 0,
            },
        ],
    }), [pcgData]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        animation: false,
        scales: {
            x: { display: false },
            y: {
                min: -2,
                max: 2,
                display: false,
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        maintainAspectRatio: false,
    }), []);


    // --- General Utility Functions ---
    const scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    const validateEmail = (email) =>
        /^\S+@\S+\.\S+$/.test(email);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            setNewsletterError(t("emailAddressCannotBeEmpty"));
            return;
        }
        if (!validateEmail(email)) {
            setNewsletterError(t("pleaseEnterAValidEmail"));
            return;
        }
        setSubscribed(true);
        setEmail("");
        setNewsletterError("");
        await new Promise(resolve => setTimeout(resolve, 100)); // Reduced timeout for faster response
        toast.success(t('subscribedConfirmation'));
    };

    const handleRequestDemo = useCallback(() => {
        toast.info("Thank you for your interest! A CardioSense AI specialist will contact you shortly for a personalized demo and to discuss your needs.");
        console.log("Demo requested!");
    }, []);

    const handleContactFormChange = useCallback((e) => {
        const { name, value } = e.target;
        setContactForm(prev => ({ ...prev, [name]: value }));
        setContactError("");
        setContactMessage("");
    }, []);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setContactError("");
        setContactMessage("");

        if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
            setContactError(t("allFieldsAreRequired"));
            return;
        }
        if (!validateEmail(contactForm.email)) {
            setContactError(t("pleaseEnterAValidEmail"));
            return;
        }

        try {
            console.log("Sending contact form:", contactForm);
            // Removed artificial delay
            const success = Math.random() > 0.1; // Still simulating success/failure

            if (success) {
                setContactMessage(t("messageSentSuccessfully"));
                setContactForm({ name: "", email: "", message: "" });
            } else {
                setContactError(t("failedToSendMsg"));
            }
        } catch (err) {
            setContactError(t("unexpectedErrorOccurred"));
        }
    };

    // Handle login click to navigate to login page
    const handleLoginClick = useCallback(() => {
        setCurrentPage('Loginmain');
    }, []);

    // Handle successful login from LoginPage
    const handleLoginSuccess = useCallback(() => {
        setIsLoggedIn(true);
        setCurrentPage('home'); // Go back to home after successful login
    }, []);

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        toast.info(t('logoutSuccess'));
    }, [t]);

    // Retrieves current theme colors based on selected theme.
    const themeColors = isDarkMode ? themes.dark : themes.light;


    return (
        <div className={`min-h-screen flex flex-col ${themeColors.backgroundClass} ${themeColors.textColorClass} transition-colors duration-300 font-sans antialiased`}>
            {/* Tailwind CSS Animation Classes (Defined inline for immediate effect) */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fadeInUp 0.9s ease-out forwards; opacity: 0; }
                /* Added for hero section slogan */
                .animate-fade-in-up-delay-100 { animation: fadeInUp 0.9s ease-out forwards 0.1s; opacity: 0; }
                .animate-fade-in-up-delay-200 { animation: fadeInUp 0.9s ease-out forwards 0.2s; opacity: 0; }
                .animate-fade-in-up-delay-300 { animation: fadeInUp 0.9s ease-out forwards 0.3s; opacity: 0; }
                .animate-fade-in-up-delay-400 { animation: fadeInUp 0.9s ease-out forwards 0.4s; opacity: 0; }
                .animate-fade-in-up-delay-500 { animation: fadeInUp 0.9s ease-out forwards 0.5s; opacity: 0; }

                /* Hero Blob Animations (if any custom blobs are used) */
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite cubic-bezier(0.6, 0.4, 0.4, 0.8); }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }

                /* Subtle Pulse for placeholders */
                @keyframes pulse-light {
                    0% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                    100% { opacity: 0.1; }
                }
                .animate-pulse-light { animation: pulse-light 2s infinite ease-in-out; }

                /* Back to Top Button subtle bounce */
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }

                /* Feature Card hover specific styles */
                .feature-card:hover {
                    transform: translateY(-8px) scale(1.02); /* More pronounced lift */
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15); /* Stronger shadow */
                }
                .how-it-works-step:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
                }
                .testimonial-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
                }
                .team-member-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
                }
                .blog-post-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
                }

                /* Custom patterns for demo placeholders */
                .bg-pattern-dots {
                    background-image: radial-gradient(#d1d5db 1px, transparent 1px);
                    background-size: 8px 8px;
                }
                .dark .bg-pattern-dots {
                    background-image: radial-gradient(#4b5563 1px, transparent 1px);
                }
                .bg-pattern-squares {
                    background-image: linear-gradient(45deg, #d1d5db 25%, transparent 25%, transparent 75%, #d1d5db 75%, #d1d5db),
                                      linear-gradient(45deg, #d1d5db 25%, transparent 25%, transparent 75%, #d1d5db 75%, #d1d5db);
                    background-size: 16px 16px;
                    background-position: 0 0, 8px 8px;
                }
                .dark .bg-pattern-squares {
                    background-image: linear-gradient(45deg, #4b5563 25%, transparent 25%, transparent 75%, #4b5563 75%, #4b5563),
                                      linear-gradient(45deg, #4b5563 25%, transparent 25%, transparent 75%, #4b5563 75%, #4b5563);
                }

                /* Details (FAQ) arrow rotation */
                details[open] .details-arrow {
                    transform: rotate(180deg);
                }

                /* Added for live PCG monitoring */
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
                .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }

                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
            `}</style>

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
                theme={themeColors.name === 'dark' ? 'dark' : 'light'} // Theme dynamic
            />

            {/* Navbar Component (Only show on home page) */}
            {currentPage === 'home' && (
                <NavBarHome
                    t={t}
                    currentThemeName={themeColors.name} // Pass current theme name
                    toggleTheme={() => setDarkMode(!isDarkMode)} // Toggle based on current state
                    language={i18n.language}
                    setLanguage={i18n.changeLanguage}
                    themeColors={themeColors}
                    scrollToSection={useCallback((id) => {
                        const element = sectionRefs.current[id];
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            setIsMobileMenuOpen(false); // Close mobile menu after selecting a section
                        }
                    }, [])}
                    activeSection={activeSection}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    onLoginClick={handleLoginClick} // Use handleLoginClick for login button
                    onLogoutClick={handleLogout}
                    isLoggedIn={isLoggedIn}
                />
            )}


            {/* Conditional Rendering of Pages */}
            {currentPage === 'home' ? (
                <HomePage
                    t={t}
                    themeColors={themeColors}
                    sectionRefs={sectionRefs}
                    setSectionRef={setSectionRef}
                    handleRequestDemo={handleRequestDemo}
                    pcgData={pcgData}
                    heartRate={heartRate}
                    aiAnalysis={aiAnalysis}
                    isMonitoring={isMonitoring}
                    startMonitoring={startPcgMonitoring}
                    stopMonitoring={stopPcgMonitoring}
                    simulateAnomaly={simulateAnomaly}
                    chartData={chartData}
                    chartOptions={chartOptions}
                    contactForm={contactForm}
                    handleContactFormChange={handleContactFormChange}
                    handleContactSubmit={handleContactSubmit}
                    contactMessage={contactMessage}
                    contactError={contactError}
                    email={email}
                    setEmail={setEmail}
                    subscribed={subscribed}
                    handleSubscribe={handleSubscribe}
                    newsletterError={newsletterError}
                />
            ) : (
                <LoginPage
                    t={t}
                    themeColors={themeColors}
                    onLoginSuccess={handleLoginSuccess}
                    onGoBack={() => setCurrentPage('home')} // Function to go back to home page
                />
            )}


            {/* Footer Component (Only show on home page) */}
            {currentPage === 'home' && (
                <Footer t={t} themeColors={themeColors} />
            )}

            {/* Back to Top Button (Only show on home page) */}
            <AnimatePresence>
                {showBackToTop && currentPage === 'home' && (
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.3 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform duration-300 transform hover:scale-110 animate-bounce-subtle"
                        aria-label="Back to top"
                    >
                        <FaArrowUp className="text-xl" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
