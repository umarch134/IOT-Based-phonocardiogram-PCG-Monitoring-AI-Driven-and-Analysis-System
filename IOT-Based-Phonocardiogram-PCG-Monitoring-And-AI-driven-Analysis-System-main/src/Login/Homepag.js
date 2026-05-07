import React, { useState, useEffect, useRef, useCallback } from "react";
// Importing more icons for a richer visual experience
// Corrected imports: Each icon set is imported from its specific sub-path
import {
  FaMoon, FaSun, FaArrowUp, FaLinkedin, FaTwitter, FaFacebook,
  FaHeartbeat, FaBrain, FaMobileAlt, FaWifi, FaComments, FaAward,
  FaMicrophone, FaCloudUploadAlt, FaChartLine, FaEnvelope, FaPhone, FaMapMarkerAlt, FaExclamationTriangle
} from "react-icons/fa"; // Font Awesome icons
import { BiDevices, BiAnalyse } from "react-icons/bi"; // Boxicons
import { MdSecurity, MdSpeed, MdHealthAndSafety, MdOutlineMonitorHeart, MdEventAvailable, MdPeopleAlt } from "react-icons/md"; // Material Design icons

// Chart.js imports
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// --- Data Definitions (Moved outside component for better reusability and clarity) ---

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
        description: "The SmartBeat portable IoT device is placed on the patient's chest to capture high-fidelity heart sounds in real-time.",
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

// Note: The `technologies` array is no longer used in the render, but kept here for data definition integrity.
const technologies = [
    { name: "React", description: "Frontend framework for interactive UIs.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" },
    { name: "Node.js", description: "Backend runtime for scalable services.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/596px-Node.js_logo.svg.png" },
    { name: "TensorFlow/Keras", description: "AI/ML framework for deep learning models.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/TensorFlow_logo.svg/1200px-TensorFlow_logo.svg.png" },
    { name: "AWS/Azure", description: "Cloud infrastructure for data storage & processing.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png" }, // Placeholder for AWS, adjust if using Azure etc.
    { name: "MongoDB", description: "NoSQL database for flexible data handling.", logo: "https://www.mongodb.com/assets/images/global/leaf.png" },
    { name: "IoT Protocols (MQTT)", description: "Communication protocols for IoT devices.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/MQTT_logo.svg/1200px-MQTT_logo.svg.png" },
];


const teamMembers = [
    {
        name: "Muhammad Saad",
        role: "Project Lead & AI/ML Engineer",
        bio: "Specializes in deep learning for medical diagnostics and system architecture. Drives the AI model development.",
        image: "https://randomuser.me/api/portraits/men/75.jpg", // Replace with actual images
        social: { linkedin: "#", twitter: "#" }
    },
    {
        name: "Muhammad Ahmed",
        role: "IoT Hardware & Firmware Engineer",
        bio: "Expert in designing and implementing the portable PCG device and its communication protocols.",
        image: "https://randomuser.me/api/portraits/men/76.jpg", // Replace with actual images
        social: { linkedin: "#", twitter: "#" }
    },
    {
        name: "Fatima Zahra",
        role: "Frontend & UI/UX Developer",
        bio: "Passionate about creating intuitive and accessible user interfaces for healthcare solutions.",
        image: "https://randomuser.me/api/portraits/women/77.jpg", // Replace with actual images
        social: { linkedin: "#", twitter: "#" }
    },
    // The fourth member (Usman Ghani) has been removed from this array in the previous version,
    // and the rendering logic ensures only the first 3 are displayed.
];

const faqData = [
  {
    q: "What makes SmartBeat's AI models so accurate?",
    a: "Our AI models are trained on extensive, diverse, and clinically validated datasets of heart sounds. We employ state-of-the-art deep learning architectures (CNNs, LSTMs) and continuous learning methodologies to ensure high precision in identifying various cardiac abnormalities.",
  },
  {
    q: "How does SmartBeat ensure patient data privacy and security?",
    a: "Data security and privacy are paramount. We utilize end-to-end encryption (AES-256) for all data in transit and at rest, adhere strictly to global data protection regulations (e.g., GDPR, HIPAA readiness), and implement robust access controls and regular security audits.",
  },
  {
    q: "Can SmartBeat be used for continuous monitoring at home?",
    a: "Absolutely. SmartBeat is designed for both clinical and home environments. Its portable device and intuitive patient-facing dashboard enable continuous, unsupervised monitoring, sending alerts to healthcare providers for proactive intervention.",
  },
  {
    q: "What are the power requirements and battery life of the SmartBeat device?",
    a: "The SmartBeat device is optimized for low power consumption, typically lasting up to 24-48 hours on a single charge depending on usage patterns. It supports fast charging and comes with a compact charging dock for convenience.",
  },
  {
    q: "How does SmartBeat handle varying ambient noise during recording?",
    a: "Our system incorporates advanced digital signal processing (DSP) techniques, including active noise cancellation algorithms, to filter out ambient noise and isolate heart sounds. This ensures high-quality PCG recordings even in challenging real-world settings.",
  },
  {
    q: "Is SmartBeat approved by medical regulatory bodies?",
    a: "SmartBeat is currently in advanced stages of regulatory approval processes in key markets. We are actively working with regulatory bodies to ensure full compliance and bring our innovative solution to patients and providers globally.",
  },
];

// Blog Posts - more detail with excerpts and image placeholders
const blogPosts = [
  {
    title: "The Transformative Power of IoT in Preventive Cardiology",
    link: "https://example.com/blog/iot-preventive-cardiology",
    image: "https://via.placeholder.com/600x400?text=IoT+Cardiology",
    excerpt: "Explore how interconnected devices are revolutionizing early detection and ongoing management of cardiovascular diseases, enabling truly preventive care.",
  },
  {
    title: "Decoding Heart Sounds: The Magic of AI in PCG Analysis",
    link: "https://example.com/blog/ai-pcg-analysis",
    image: "https://via.placeholder.com/600x400?text=AI+PCG+Decoding",
    excerpt: "Dive deep into how advanced AI algorithms, specifically CNNs and LSTMs, interpret the subtle nuances of heart sounds to identify complex anomalies.",
  },
  {
    title: "SmartBeat's Patient-Centric Design: Empowering Self-Monitoring",
    link: "https://example.com/blog/patient-centric-design",
    image: "https://via.placeholder.com/600x400?text=Patient+Care",
    excerpt: "Understand the philosophy behind SmartBeat's user-friendly interface and how it empowers patients to take an active role in their cardiac health.",
  },
  {
    title: "The Ethical Implications of Explainable AI in Medicine",
    link: "https://example.com/blog/xai-ethics",
    image: "https://via.placeholder.com/600x400?text=AI+Ethics",
    excerpt: "A critical discussion on the importance of transparency in AI-driven medical diagnostics and how SmartBeat embraces XAI for enhanced trust and clinical confidence.",
  },
];

// Awards - more realistic and specific examples
const awards = [
  "IQRA University FYP Excellence Award 2025 (Anticipated)",
  "HealthTech Innovation Challenge Finalist 2024",
  "Top MedTech Startup Pitch - National Innovation Summit 2023",
  "Best IoT Solution in Healthcare - Tech for Good Awards (Project Stage)",
];

// Partners - diverse placeholders
const partners = [
  { name: "IQRA University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Iqra_University_seal.svg/1200px-Iqra_University_seal.svg.png" },
  { name: "Global Health Alliance", logo: "https://via.placeholder.com/150x75?text=Global+Health+Alliance" },
  { name: "Innovate AI Solutions", logo: "https://via.placeholder.com/150x75?text=Innovate+AI+Solutions" },
  { name: "Precision Diagnostics", logo: "https://via.placeholder.com/150x75?text=Precision+Diagnostics" },
  { name: "Wearable Tech Corp", logo: "https://via.placeholder.0/150x75?text=Wearable+Tech+Corp" },
  { name: "Medical Device Fund", logo: "https://via.placeholder.com/150x75?text=Medical+Device+Fund" },
];

// Testimonials Data - expanded and more varied
const testimonials = [
  {
    quote: "SmartBeat is a phenomenal leap in telemedicine. Its real-time, AI-powered diagnostics could drastically improve patient outcomes, especially in underserved regions. I'm excited about its potential.",
    name: "Dr. Aisha Khan",
    title: "Senior Cardiologist, National Institute of Heart Diseases",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "As a technology enthusiast and future medical professional, I'm genuinely impressed by SmartBeat's seamless integration of IoT and AI. The intuitive interface makes complex data accessible to everyone.",
    name: "Ali Raza",
    title: "Medical Informatics Student & Health Innovator",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "The emphasis on Explainable AI is what truly sets SmartBeat apart. It builds immense trust by providing clear rationale behind its classifications, a crucial factor for clinical adoption.",
    name: "Sarah Ahmed",
    title: "HealthTech Investment Analyst",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote: "For rural clinics like ours, SmartBeat offers an unprecedented opportunity for early cardiac screening. It's affordable, accurate, and significantly reduces the need for patients to travel long distances for initial diagnosis.",
    name: "Dr. Imran Malik",
    title: "General Practitioner, Rural Healthcare Foundation",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    quote: "The ability to continuously monitor heart health from home with professional oversight is revolutionary. SmartBeat empowers patients to take control of their well-being with confidence and peace of mind.",
    name: "Fatima Sohail",
    title: "Early Adopter & Patient Advocate",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];


// --- Home Component (Main Component) ---
const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState("");


  // State for simulated PCG data
  const [pcgData, setPcgData] = useState(Array(50).fill(0)); // Initialize with 50 zeros
  const [heartRate, setHeartRate] = useState(72);
  const [aiAnalysis, setAiAnalysis] = useState("Monitoring Paused");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const dataIntervalRef = useRef(null);


  // Use a single ref for all sections, and populate it dynamically
  // Initialize sectionRefs as an empty array
  const sectionRefs = useRef([]);

  // Dark Mode Toggle Effect
  useEffect(() => {
    // Check local storage for dark mode preference
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []); // Run once on mount to set initial theme

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]); // Update theme and local storage when darkMode changes

  // Back to Top Button visibility Effect
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600); // Show after more scroll, less intrusive
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target); // Unobserve once animated to prevent re-triggering
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -80px 0px", // Adjust to make it trigger slightly earlier for a smoother feel
      }
    );

    // Ensure sectionRefs.current is fully populated before observing
    // This runs after render, ensuring all refs are attached
    const currentRefs = sectionRefs.current;
    currentRefs.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      // Cleanup observer on component unmount
      currentRefs.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []); // Empty dependency array means this runs once after the initial render


  // Function to simulate PCG data stream
  const startPcgMonitoring = () => {
    if (isMonitoring) return;
    setIsMonitoring(true);
    let count = 0;
    const initialData = Array(50).fill(0).map(() => Math.random() * 2 - 1); // Start with some initial data
    setPcgData(initialData);
    setAiAnalysis("Analyzing Heart Sounds...");

    dataIntervalRef.current = setInterval(() => {
      setPcgData(prevData => {
        const newDataPoint = Math.sin(count * 0.2) + Math.random() * 0.5 - 0.25; // Simulates a wavy signal with noise
        const updatedData = [...prevData.slice(1), newDataPoint]; // Shift data left, add new point
        count++;

        // Simulate occasional anomalies
        if (count % 200 === 0) { // Every 200 points, introduce an anomaly
            const anomalies = ["Systolic Murmur Detected", "Mild Arrhythmia Identified", "No Abnormalities Detected"];
            const randomIndex = Math.floor(Math.random() * anomalies.length);
            setAiAnalysis(anomalies[randomIndex]);
        } else if (count % 100 === 0) { // Reset to normal more often
            setAiAnalysis("Normal Sinus Rhythm");
        }

        // Simulate slight heart rate fluctuation
        setHeartRate(Math.floor(60 + Math.random() * 30));

        return updatedData;
      });
    }, 100); // Update every 100ms for a "live" feel
  };

  const stopPcgMonitoring = () => {
    setIsMonitoring(false);
    if (dataIntervalRef.current) {
      clearInterval(dataIntervalRef.current);
    }
    setPcgData(Array(50).fill(0)); // Reset data
    setAiAnalysis("Monitoring Paused");
    setHeartRate(0); // Reset heart rate
  };

  const simulateAnomaly = useCallback(() => {
    if (!isMonitoring) {
        setAiAnalysis("Start monitoring to simulate anomaly.");
        return;
    }
    setAiAnalysis("Significant Irregularity Detected!"); // Force an anomaly
    setPcgData(prevData => {
        // Create a temporary spike/dip in the data
        const lastFew = prevData.slice(-10);
        const anomalyPoints = lastFew.map((val, i) => val + Math.sin(i * Math.PI / 5) * 2);
        return [...prevData.slice(0, prevData.length - 10), ...anomalyPoints];
    });
  }, [isMonitoring]); // Added useCallback to memoize and prevent unnecessary re-renders

  // Chart.js data configuration
  const chartData = {
    labels: Array(pcgData.length).fill(''), // No x-axis labels needed for real-time
    datasets: [
      {
        label: 'PCG Waveform',
        data: pcgData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointRadius: 0, // No points for a continuous line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: false, // Disable Chart.js animation for smoother real-time updates
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        min: -2,
        max: 2,
        display: false, // Hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
  };


  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const validateEmail = (email) =>
    /^\S+@\S+\.\S+$/.test(email);

  const handleSubscribe = async (e) => { // Made async for potential API call
    e.preventDefault();
    if (email.trim() === "") {
      setError("Email address cannot be empty.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address (e.g., example@domain.com).");
      return;
    }
    setSubscribed(true);
    setEmail("");
    setError("");
    // In a real project, you would send this to your backend API
    console.log("Subscribed with:", email);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Optionally revert subscribed state after a few seconds or redirect
    // setTimeout(() => setSubscribed(false), 5000);
  };

  const handleRequestDemo = () => {
    alert("Thank you for your interest! A SmartBeat specialist will contact you shortly for a personalized demo and to discuss your needs.");
    // In a real application, this would trigger a modal form or navigation to a dedicated demo request page
    console.log("Demo requested!");
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    setContactError(""); // Clear errors on change
    setContactMessage(""); // Clear success message on change
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactError("");
    setContactMessage("");

    // Basic validation
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactError("All fields are required.");
      return;
    }
    if (!validateEmail(contactForm.email)) {
      setContactError("Please enter a valid email address.");
      return;
    }

    try {
        // Simulate API call to send email
        console.log("Sending contact form:", contactForm);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        // Simulate success or failure
        const success = Math.random() > 0.1; // 90% chance of success

        if (success) {
            setContactMessage("Your message has been sent successfully! We'll get back to you soon.");
            setContactForm({ name: "", email: "", message: "" }); // Clear form
        } else {
            setContactError("Failed to send message. Please try again later.");
        }
    } catch (err) {
        setContactError("An unexpected error occurred. Please try again.");
    }
  };


  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col font-sans antialiased">
      {/* Tailwind CSS Animation Classes (Ensure these are defined in your global CSS or a dedicated style file) */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.9s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
        /* Added for hero section slogan */
        .animate-fade-in-up-delay-100 { animation: fadeInUp 0.9s ease-out forwards 0.1s; opacity: 0; }
        .animate-fade-in-up-delay-200 { animation: fadeInUp 0.9s ease-out forwards 0.2s; opacity: 0; }
        .animate-fade-in-up-delay-300 { animation: fadeInUp 0.9s ease-out forwards 0.3s; opacity: 0; }
        .animate-fade-in-up-delay-400 { animation: fadeInUp 0.9s ease-out forwards 0.4s; opacity: 0; }
        .animate-fade-in-up-delay-500 { animation: fadeInUp 0.9s ease-out forwards 0.5s; opacity: 0; }


        /* Hero Blob Animations */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.4, 0.4, 0.8);
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* Subtle Pulse for placeholders */
        @keyframes pulse-light {
            0% { opacity: 0.1; }
            50% { opacity: 0.3; }
            100% { opacity: 0.1; }
        }
        .animate-pulse-light {
            animation: pulse-light 2s infinite ease-in-out;
        }

        /* Back to Top Button subtle bounce */
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }

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
        .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
        }

        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 3s infinite ease-in-out;
        }

        /* Testimonial slider custom dots */
        .swiper-pagination-bullet {
            background: #cbd5e1; /* Default grey dot */
        }
        .swiper-pagination-bullet-active {
            background: #2563eb; /* Active blue dot */
        }

      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 bg-white dark:bg-gray-900 shadow-xl z-50 transition-colors duration-300"> {/* Stronger shadow, transition */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <a
            href="#home"
            className="text-3.5x1 font-extrabold text-blue-700 dark:text-blue-400 tracking-wider hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md py-1 px-2"
            aria-label="SmartBeat Home"
          >
            SmartBeat
          </a>
          <div className="flex items-center space-x-7 text-lg">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-800"
              title="Toggle Dark Mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-gray-600 text-xl" />
              )}
            </button>
            {/* Navigation Links */}
            {[
              { id: "features", label: "Features" },
              { id: "how-it-works", label: "How It Works" },
              { id: "technology", label: "Technology" },
              { id: "team", label: "Our Team" },
              { id: "testimonials", label: "Testimonials" },
              { id: "faq", label: "FAQ" },
              { id: "blog", label: "Blog" },
              { id: "contact", label: "Contact" },
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md py-1 px-2"
              >
                {section.label}
              </a>
            ))}
            {/* Login Button */}
            <a
              href="/login" // Placeholder URL
              className="bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105 ml-5"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 text-white shadow-xl min-h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/pcg-bg.jpg')", // Replace with your actual image path
          // Fallback background for dark mode if image doesn't exist
          backgroundColor: darkMode ? '#1a202c' : '#f0f4f8'
        }}
        aria-label="IoT Based Phonocardiogram (PCG) Monitoring and AI-Driven Analysis System"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 z-0"></div>

        {/* Main Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-4xl leading-tight mb-6 drop-shadow-2xl opacity-0 animate-fade-in-up-delay-100">
            <span className="text-yellow-300">IoT Based Phonocardiogram (PCG) Monitoring</span><br />
            <span className="text-yellow-300">And AI-Driven Analysis System</span>
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mb-6 drop-shadow-md opacity-0 animate-fade-in-up-delay-300">
            Empowering healthcare professionals and patients with <strong className="text-white">real-time, AI-driven insights</strong> for early detection and continuous cardiac monitoring via <strong className="text-yellow-300">SmartBeat</strong>.
          </p>

          <p className="text-sm uppercase tracking-wider mb-10 text-blue-200 opacity-0 animate-fade-in-up-delay-400">
            Innovation | Precision | Care
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 opacity-0 animate-fade-in-up-delay-500">
            <a
              href="#how-it-works"
              className="bg-white text-blue-800 font-bold px-10 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-base"
            >
              Discover How It Works
            </a>
            <button
              onClick={handleRequestDemo}
              className="bg-blue-600 text-white font-bold px-10 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-base"
            >
              Request a Demo
            </button>
          </div>

          {/* Scroll down indicator */}
          <div className="mt-16 animate-bounce opacity-0 animate-fade-in-up-delay-500">
            <a href="#how-it-works" className="text-blue-200 hover:text-white text-xl">
              ↓ Scroll Down
            </a>
          </div>
        </div>
      </header>

      {/* About Us / Project Overview */}
      <section id="about" ref={(el) => (sectionRefs.current[0] = el)} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 overflow-hidden px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 md:pr-8 text-center md:text-left">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up-delay-100">Our Mission</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 leading-tight animate-fade-in-up-delay-200">
              Bridging the Gap in Proactive Cardiac Health
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 animate-fade-in-up-delay-300">
              Cardiovascular diseases (CVDs) remain a leading cause of mortality worldwide, often due to delayed diagnosis and insufficient continuous monitoring. Our project, the **IoT Based Phonocardiogram (PCG) Monitoring and AI-Driven Analysis System**, is engineered to confront this global health crisis head-on.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed animate-fade-in-up-delay-400">
              This groundbreaking solution, known as **SmartBeat**, provides real-time heart sound insights and advanced AI diagnostics. This significantly accelerates early diagnosis and enables consistent oversight, particularly in underserved and remote communities.
            </p>
          </div>
          <div className="md:w-1/2 relative mt-10 md:mt-0 animate-fade-in-up-delay-500">
            {/* UPDATED: Video showing SmartBeat device in use or demonstrating its features */}
            <div className="relative w-full aspect-video rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105 border border-blue-300 dark:border-blue-600 overflow-hidden">
                <video
                  src="/videos/smartbeat-device-demo.mp4" // Apni asal video ka path yahan daalen!
                  poster="/images/smartbeat-video-thumbnail.jpg" // Video load ہونے سے پہلے دکھنے والی image
                  controls // Controls دکھانے کے لیے (play/pause, volume)
                  loop // Video ko loop karne ke liye
                  muted // Auto-play کے لیے muted ہونا ضروری ہے
                  autoPlay // Page load ہونے پر automatically play کرنے کے لیے
                  preload="auto" // Video ko jaldi load karne ke liye
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label="SmartBeat device in action: real-time PCG monitoring demonstration video."
                >
                  Your browser does not support the video tag. {/* Agar browser video support نہ کرے */}
                </video>
            </div>
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md text-sm text-gray-600 dark:text-gray-200 font-medium transform transition-transform hover:scale-105">
                <FaHeartbeat className="inline-block mr-2 text-red-500" /> Real-time PCG Capture
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Widget Placeholder - Now with interactive PCG */}
      <section id="live-demo" ref={(el) => (sectionRefs.current[1] = el)} className="py-20 bg-gray-100 dark:bg-gray-800 flex justify-center items-center overflow-hidden px-6">
        <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-12 text-center border border-blue-200 dark:border-blue-700 animate-fade-in-up">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-700 dark:text-blue-400">
            SmartBeat In Action: Live PCG Monitoring & AI Insights
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Witness how SmartBeat captures, processes, and visualizes heart sounds, bringing complex diagnostics to an intuitive platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Live PCG Waveform */}
            <div
              aria-label="Live PCG waveform demonstration"
              className="relative h-72 bg-gradient-to-br from-green-100 to-green-300 dark:from-green-700 dark:to-green-900 rounded-xl flex flex-col items-center justify-center text-green-800 dark:text-green-200 font-mono font-bold select-none text-2xl border-4 border-dashed border-green-600 dark:border-green-500 overflow-hidden group p-4"
            >
                <div className="absolute inset-0 bg-pattern-dots opacity-20 dark:opacity=30"></div>
                <div className="relative z-10 w-full h-full">
                    {/* Chart.js component */}
                    <Line data={chartData} options={chartOptions} />
                </div>
                <span className="absolute top-4 left-4 text-sm text-green-700 dark:text-green-300 opacity-90">
                    <FaHeartbeat className="inline-block mr-2" /> Live PCG Stream
                </span>
                <span className="absolute bottom-4 left-4 text-lg text-green-700 dark:text-green-300 font-bold">
                    HR: {heartRate} BPM
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse-light group-hover:animate-none"></div>
            </div>
            {/* Interactive Dashboard / AI Analysis */}
            <div
              aria-label="SmartBeat Dashboard Screenshot"
              className="relative h-72 bg-gradient-to-br from-purple-100 to-purple-300 dark:from-purple-700 dark:to-purple-900 rounded-xl flex flex-col items-center justify-center text-purple-800 dark:text-purple-200 font-mono font-bold select-none text-2xl border-4 border-dashed border-purple-600 dark:border-purple-500 overflow-hidden group p-4"
            >
                <div className="absolute inset-0 bg-pattern-squares opacity-20 dark:opacity-30"></div>
                <FaBrain className="relative z-10 text-6xl mb-4 animate-bounce-slow" />
                <span className="relative z-10 text-xl md:text-2xl font-bold text-purple-900 dark:text-purple-100 px-4">
                    AI Analysis: {aiAnalysis}
                    {aiAnalysis.includes("Detected") && aiAnalysis !== "No Abnormalities Detected" && (
                        <FaExclamationTriangle className="inline-block ml-3 text-red-600 dark:text-red-400 animate-pulse-slow" title="Potential Anomaly" />
                    )}
                </span>
                <div className="flex flex-col sm:flex-row gap-4 mt-6 relative z-10">
                    <button
                        onClick={isMonitoring ? stopPcgMonitoring : startPcgMonitoring}
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${isMonitoring ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
                    </button>
                    <button
                        onClick={simulateAnomaly}
                        disabled={!isMonitoring}
                        className="px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Simulate a cardiac anomaly for demonstration"
                    >
                        Simulate Anomaly
                    </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={(el) => (sectionRefs.current[2] = el)} className="py-20 md:py-32 bg-white dark:bg-gray-900 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up-delay-100">
            Unlock the Power of SmartBeat
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-200">
            SmartBeat integrates cutting-edge IoT and AI to deliver unparalleled insights into cardiac health, revolutionizing patient care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg flex flex-col items-center text-center transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-blue-400 border border-transparent animate-fade-in-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }} // Staggered animation
              >
                {feature.icon}
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={(el) => (sectionRefs.current[3] = el)} className="py-20 md:py-32 bg-gray-100 dark:bg-gray-800 px-6">
          <div className="container mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up-delay-100">
                  Seamless Cardiac Monitoring, Step-by-Step
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-200">
                  SmartBeat simplifies advanced cardiac diagnostics into an easy, efficient, and intelligent process.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {howItWorksSteps.map((step, index) => (
                      <div
                          key={index}
                          className="how-it-works-step bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg flex flex-col items-center text-center transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-blue-400 border border-transparent animate-fade-in-up"
                          style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                      >
                          <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800 mb-6 shadow-inner animate-pulse-slow">
                              {step.icon}
                              <span className="absolute text-3xl font-extrabold text-blue-800 dark:text-blue-200 -bottom-2 -right-2 bg-white dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center border-4 border-blue-200 dark:border-blue-600">
                                  {index + 1}
                              </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                              {step.title}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Technology Stack Section */}
      <section id="technology" ref={(el) => (sectionRefs.current[4] = el)} className="py-20 md:py-32 bg-white dark:bg-gray-900 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up-delay-100">
            Powered by Cutting-Edge Technology
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-200">
            SmartBeat leverages a robust and modern technology stack to deliver reliable, scalable, and secure cardiac monitoring.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-center justify-center">
            {partners.map((partner, index) => ( // Reusing partners for tech logos for demo purposes
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center h-24 transform transition-transform duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 w-auto object-contain dark:filter dark:invert"
                  title={partner.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" ref={(el) => (sectionRefs.current[5] = el)} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 px-6">
          <div className="container mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up-delay-100">
                  Meet the Innovators Behind SmartBeat
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-200">
                  Our dedicated team of engineers, developers, and medical informatics enthusiasts is committed to transforming cardiac care.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center"> {/* Changed to lg:grid-cols-3 and added justify-center */}
                  {teamMembers.slice(0, 3).map((member, index) => ( {/* Slicing to ensure only 3 members are displayed */}
                      <div
                          key={index} // Corrected placement: key is now an attribute of the div
                          className="team-member-card bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg flex flex-col items-center text-center transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-blue-400 border border-transparent animate-fade-in-up"
                          style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                      >
                          <img
                              src={member.image}
                              alt={member.name}
                              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-blue-400 dark:border-blue-600 shadow-md"
                          />
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                              {member.name}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-300 font-semibold mb-4">{member.role}</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-6">{member.bio}</p>
                          <div className="flex space-x-4">
                              {member.social.linkedin && (
                                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn profile of ${member.name}`} className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200">
                                      <FaLinkedin className="text-2xl" />
                                  </a>
                              )}
                              {member.social.twitter && (
                                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label={`Twitter profile of ${member.name}`} className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200">
                                      <FaTwitter className="text-2xl" />
                                  </a>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Testimonials Section (Swiper/Carousel can be added here) */}
      <section id="testimonials" ref={(el) => (sectionRefs.current[6] = el)} className="py-20 md:py-32 bg-gray-100 dark:bg-gray-800 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up-delay-100">
            Hear From Our Advocates
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-200">
            Real stories from healthcare professionals, patients, and innovators who believe in SmartBeat's potential.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg text-left transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-blue-400 border border-transparent animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-400 dark:border-blue-600"
                  />
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={(el) => (sectionRefs.current[7] = el)} className="py-20 md:py-32 bg-white dark:bg-gray-900 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up-delay-100">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-16 animate-fade-in-up-delay-200">
            Find quick answers to the most common questions about SmartBeat, its technology, and its applications.
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <details
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:border-blue-400 border border-transparent group animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.07}s` }}
              >
                <summary className="flex justify-between items-center font-bold text-lg text-gray-800 dark:text-gray-100 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 rounded-md py-2">
                  {faq.q}
                  <span className="details-arrow transform transition-transform duration-300 text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-200">
                    <FaArrowUp />
                  </span>
                </summary>
                <div className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" ref={(el) => (sectionRefs.current[8] = el)} className="py-20 md:py-32 bg-gray-100 dark:bg-gray-800 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up-delay-100">
            Latest Insights & Innovations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-200">
            Stay informed with our articles on health tech, AI in medicine, and the future of cardiac care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {blogPosts.map((post, index) => (
              <a
                key={index}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-post-card bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-blue-400 border border-transparent animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6 text-left">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    Read More &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action: Join Newsletter */}
      <section ref={(el) => (sectionRefs.current[9] = el)} className="py-20 bg-blue-700 dark:bg-blue-900 text-white text-center px-6 animate-fade-in-up">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Stay Ahead with SmartBeat Updates
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10">
            Subscribe to our newsletter for the latest news, insights, and exclusive updates on cardiac health technology.
          </p>
          <form onSubmit={handleSubscribe} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow p-4 rounded-full border border-white text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); setSubscribed(false); }}
              required
              aria-label="Email for newsletter subscription"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              disabled={subscribed}
            >
              {subscribed ? "Subscribed!" : "Subscribe Now"}
            </button>
          </form>
          {error && <p className="text-red-200 mt-4 text-sm">{error}</p>}
          {subscribed && <p className="text-green-200 mt-4 text-sm">Thank you for subscribing!</p>}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={(el) => (sectionRefs.current[10] = el)} className="py-20 md:py-32 bg-white dark:bg-gray-900 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up-delay-100">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-200">
            Have questions or need assistance? Contact us directly and we'll be happy to help.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg text-left animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">Contact Information</h3>
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="text-blue-500 text-2xl mr-4" />
                        <span>123 SmartBeat Avenue, Health City, Karachi, Pakistan</span>
                    </div>
                    <div className="flex items-center">
                        <FaPhone className="text-blue-500 text-2xl mr-4" />
                        <a href="tel:+923001234567" className="hover:underline">+92 300 1234567</a>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="text-blue-500 text-2xl mr-4" />
                        <a href="mailto:info@smartbeat.com" className="hover:underline">info@smartbeat.com</a>
                    </div>
                    <div className="flex items-center">
                        <MdEventAvailable className="text-blue-500 text-2xl mr-4" />
                        <span>Mon - Fri: 9:00 AM - 5:00 PM (PKT)</span>
                    </div>
                </div>
                <div className="mt-10">
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Follow Us</h4>
                    <div className="flex space-x-6 justify-center lg:justify-start">
                        <a href="https://linkedin.com/smartbeat" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200">
                            <FaLinkedin className="text-3xl" />
                        </a>
                        <a href="https://twitter.com/smartbeat" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200">
                            <FaTwitter className="text-3xl" />
                        </a>
                        <a href="https://facebook.com/smartbeat" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500 transition-colors duration-200">
                            <FaFacebook className="text-3xl" />
                           </a>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 text-center">Send Us a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactFormChange}
                            className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactFormChange}
                            className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                            placeholder="your@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={contactForm.message}
                            onChange={handleContactFormChange}
                            className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                            placeholder="Tell us how we can help..."
                            required
                        ></textarea>
                    </div>
                    {contactError && <p className="text-red-500 text-sm">{contactError}</p>}
                    {contactMessage && <p className="text-green-600 dark:text-green-400 text-sm">{contactMessage}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
          </div>
        </div>
      </section>

      {/* Awards and Recognition Section */}
      <section id="awards" ref={(el) => (sectionRefs.current[11] = el)} className="py-20 bg-gray-100 dark:bg-gray-800 px-6">
          <div className="container mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up-delay-100">
                  Recognized for Innovation
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-200">
                  Our dedication to advancing healthcare technology has been acknowledged by leading institutions and innovation platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                  {awards.map((award, index) => (
                      <div
                          key={index}
                          className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up"
                          style={{ animationDelay: `${0.2 + index * 0.08}s` }}
                      >
                          <FaAward className="text-yellow-500 text-5xl mb-4" />
                          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{award}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-3xl font-extrabold text-white mb-4">SmartBeat</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pioneering the future of proactive cardiac care through IoT and AI. Early detection, smarter health.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-xl mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { id: "features", label: "Features" },
                { id: "how-it-works", label: "How It Works" },
                { id: "technology", label: "Technology" },
                { id: "team", label: "Our Team" },
                { id: "faq", label: "FAQ" },
                { id: "blog", label: "Blog" },
              ].map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white text-xl mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-blue-400" />
                <span>123 SmartBeat Avenue, Health City, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-blue-400" />
                <a href="tel:+923001234567" className="hover:underline">+92 300 1234567</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-400" />
                <a href="mailto:info@smartbeat.com" className="hover:underline">info@smartbeat.com</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-white text-xl mb-4">Connect with Us</h4>
            <div className="flex space-x-5">
              <a href="https://linkedin.com/smartbeat" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="https://twitter.com/smartbeat" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-blue-300 transition-colors duration-200">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="https://facebook.com/smartbeat" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-200">
                <FaFacebook className="text-2xl" />
              </a>
            </div>
            {/* Mission Statement in Footer */}
            <div className="mt-8">
                <h4 className="font-bold text-white text-xl mb-3">Our Vision</h4>
                <p className="text-gray-400 text-sm">
                    To make advanced cardiac diagnostics accessible and proactive for everyone, everywhere.
                </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-700 pt-8 mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SmartBeat. All rights reserved.
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 animate-bounce-subtle z-50"
          aria-label="Back to top"
          title="Back to Top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default Home;