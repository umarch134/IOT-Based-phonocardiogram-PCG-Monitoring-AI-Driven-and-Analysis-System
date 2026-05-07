import React, { useState, useEffect, useRef } from "react";
// Importing more icons for a richer visual experience
import {
  FaMoon, FaSun, FaArrowUp, FaLinkedin, FaTwitter, FaFacebook,
  FaHeartbeat, FaBrain, FaMobileAlt, FaWifi, FaComments, FaAward,
  FaBuilding, FaMicrophone, FaCloudUploadAlt, FaChartLine
} from "react-icons/fa";
import { BiDevices, BiAnalyse } from "react-icons/bi"; // Specific icons for 'How It Works'
import { MdSecurity, MdSpeed } from "react-icons/md"; // Added for security and speed aspects

// Chart.js imports
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// --- Data Definitions ---

// Features data with more descriptive icons
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

// FAQ Data - expanded with more questions and refined answers
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
  { name: "Wearable Tech Corp", logo: "https://via.placeholder.com/150x75?text=Wearable+Tech+Corp" },
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

  // State for simulated PCG data
  const [pcgData, setPcgData] = useState(Array(50).fill(0)); // Initialize with 50 zeros
  const [heartRate, setHeartRate] = useState(72);
  const [aiAnalysis, setAiAnalysis] = useState("Monitoring Paused");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const dataIntervalRef = useRef(null);


  // Use a single ref for all sections, and populate it dynamically
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

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      // Cleanup observer on component unmount
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []); // Run once on component mount

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

  const simulateAnomaly = () => {
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
  };

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

      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 bg-white dark:bg-gray-900 shadow-xl z-50 transition-colors duration-300"> {/* Stronger shadow, transition */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <a
            href="#home"
            className="text-3.5x1 font-extrabold text-blue-700 dark:text-blue-400 tracking-wider hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md py-1 px-2"
            aria-label="SmartBeat Home"
          >
            Phonocardiogram (PCG)
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
    backgroundImage: "url('/images/pcg-bg.jpg')" // Replace with your actual image path
  }}
  aria-label="IoT Based Phonocardiogram (PCG) Monitoring and AI-Driven Analysis System"
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

  {/* Main Content */}
  <div className="relative z-10">
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-4xl leading-tight mb-6 drop-shadow-2xl opacity-0 animate-fade-in-up-delay-100">
      <span className="text-yellow-300">IoT Based Phonocardiogram (PCG) Monitoring</span><br />
      <span className="text-yellow-300">And AI-Driven Analysis System</span>
    </h1>

    <p className="text-lg md:text-xl max-w-3xl mb-6 drop-shadow-md opacity-0 animate-fade-in-up-delay-300">
      Empowering healthcare professionals and patients with <strong className="text-white">real-time, AI-driven insights</strong> for early detection and continuous cardiac monitoring via <strong className="text-yellow-300">SmartBeat</strong>.
    </p>

    <p className="text-sm uppercase tracking-wider mb-10 text-blue-200">
      Innovation | Precision | Care
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-6 opacity-0 animate-fade-in-up-delay-500">
      <a
        href="#how-it-works"
        className="bg-white text-blue-800 font-bold px-10 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-base"
      >
        Discover How It Works
      </a>
      
    </div>

    {/* Scroll down indicator */}
    <div className="mt-16 animate-bounce">
      <a href="#how-it-works" className="text-blue-200 hover:text-white text-xl">
        ↓ Scroll Down
      </a>
    </div>
  </div>
</header>


      {/* About Us / Project Overview */}
      <section id="about" ref={(el) => sectionRefs.current[0] = el} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 overflow-hidden px-6">
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
                  poster="/images/smartbeat-video-thumbnail.jpg" // Video load hone se pehle dikhne wali image
                  controls // Controls dikhane ke liye (play/pause, volume)
                  loop // Video ko loop karne ke liye
                  muted // Auto-play ke liye muted hona zaroori hai
                  autoPlay // Page load hone par automatically play karne ke liye
                  preload="auto" // Video ko jaldi load karne ke liye
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label="SmartBeat device in action: real-time PCG monitoring demonstration video."
                >
                  Your browser does not support the video tag. {/* Agar browser video support na kare */}
                </video>
            </div>
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md text-sm text-gray-600 dark:text-gray-200 font-medium transform transition-transform hover:scale-105">
                <FaHeartbeat className="inline-block mr-2 text-red-500" /> Real-time PCG Capture
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Widget Placeholder - Now with interactive PCG */}
      <section ref={(el) => sectionRefs.current[1] = el} className="py-20 bg-gray-100 dark:bg-gray-800 flex justify-center items-center overflow-hidden px-6">
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
                <div className="absolute inset-0 bg-pattern-dots opacity-20 dark:opacity-30"></div>
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
                <span className="relative z-10 text-purple-900 dark:text-purple-100">AI Analysis:</span>
                <span className="relative z-10 text-lg font-bold text-purple-700 dark:text-purple-300">
                    {aiAnalysis}
                </span>
                <span className="absolute bottom-4 right-4 text-sm text-purple-700 dark:text-purple-300 opacity-80">
                    <BiAnalyse className="inline-block mr-2" /> Real-time Interpretation
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 animate-pulse-light group-hover:animate-none"></div>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={isMonitoring ? stopPcgMonitoring : startPcgMonitoring}
              className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105 text-lg ${isMonitoring ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white'}`}
            >
              {isMonitoring ? 'Stop Monitoring' : 'Start Live Monitoring'}
            </button>
            <button
              onClick={simulateAnomaly}
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 text-lg"
              disabled={!isMonitoring}
              title={!isMonitoring ? "Start monitoring to simulate an anomaly" : ""}
            >
              Simulate Anomaly
            </button>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-8 text-md font-medium">
            (This is a simulated live demo for illustrative purposes. For a comprehensive experience with real device interaction, please request a personalized demo!)
          </p>
          <div className="mt-10">
            <button
              onClick={handleRequestDemo}
              className="bg-blue-700 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 text-xl"
            >
              Request a Personalized Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={(el) => sectionRefs.current[2] = el} className="max-w-7xl mx-auto px-6 py-20 md:py-32 overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-blue-700 dark:text-blue-400 tracking-tight animate-fade-in-up">
          Unlocking Advanced Capabilities for Health
        </h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3"> {/* Use lg for 3 columns */}
          {features.map(({ title, desc, icon }, idx) => (
            <article
              key={idx}
              tabIndex="0"
              className="feature-card bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              aria-label={`Feature: ${title}`}
            >
              <div className="flex justify-center items-center mb-6">
                {icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-300 text-center">
                {title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={(el) => sectionRefs.current[3] = el} className="py-20 md:py-32 bg-blue-50 dark:bg-gray-800 overflow-hidden px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-16 animate-fade-in-up">
            The SmartBeat Journey: From Heartbeat to Insight
          </h2>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 items-start justify-center">
            {/* Connecting lines for desktop view - refined */}
            <div className="hidden md:block absolute top-[calc(50%-1px)] left-[16.66%] w-[33.33%] h-0.5 bg-blue-300 dark:bg-blue-600 rounded-full z-0"></div>
            <div className="hidden md:block absolute top-[calc(50%-1px)] left-[50%] w-[33.33%] h-0.5 bg-blue-300 dark:bg-blue-600 rounded-full z-0"></div>

            <div className="how-it-works-step flex flex-col items-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 border border-blue-200 dark:border-blue-700 relative z-10">
              <div className="bg-blue-100 dark:bg-blue-700 rounded-full p-4 mb-6 shadow-md">
                <FaMicrophone className="text-blue-600 dark:text-blue-400 text-6xl" /> {/* Specific icon */}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">1. Data Capture</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
                Our advanced IoT device accurately captures **high-fidelity Phonocardiogram (PCG) signals** directly from the patient's heart.
              </p>
            </div>
            <div className="how-it-works-step flex flex-col items-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 border border-blue-200 dark:border-blue-700 relative z-10">
              <div className="bg-blue-100 dark:bg-blue-700 rounded-full p-4 mb-6 shadow-md">
                <FaCloudUploadAlt className="text-blue-600 dark:text-blue-400 text-6xl" /> {/* Specific icon */}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">2. Secure Transmission</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
                The captured PCG data is **securely and wirelessly transmitted** to our robust, encrypted cloud platform for processing.
              </p>
            </div>
            <div className="how-it-works-step flex flex-col items-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 border border-blue-200 dark:border-blue-700 relative z-10">
              <div className="bg-blue-100 dark:bg-blue-700 rounded-full p-4 mb-6 shadow-md">
                <BiAnalyse className="text-blue-600 dark:text-blue-400 text-6xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">3. AI Analysis & Insights</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
                Our powerful **AI models** instantly analyze the data, providing accurate diagnostics and actionable insights on a user-friendly dashboard.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <button
              onClick={handleRequestDemo}
              className="bg-blue-700 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 text-xl"
            >
              Get Started with SmartBeat
            </button>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" ref={(el) => sectionRefs.current[4] = el} className="py-20 md:py-32 bg-white dark:bg-gray-900 overflow-hidden px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-16 animate-fade-in-up">
            The Robust Foundation of SmartBeat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
              <span className="text-6xl text-blue-500 dark:text-blue-400 mb-6">⚙️</span>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Cutting-Edge Hardware</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
                Utilizing state-of-the-art MEMS microphones for superior sound acquisition, coupled with efficient IoT microcontrollers (like ESP32/Raspberry Pi) and multi-protocol wireless modules for reliable data streaming.
              </p>
            </div>
            <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
              <span className="text-6xl text-green-500 dark:text-green-400 mb-6">💻</span>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Advanced Software Stack</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
                Built primarily with Python, leveraging powerful frameworks such as TensorFlow and PyTorch for AI model training. Our cloud platform is hosted on scalable services like Google Cloud/AWS for robust data management.
              </p>
            </div>
            <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
              <span className="text-6xl text-purple-500 dark:text-purple-400 mb-6">📊</span>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Intelligent Algorithms</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
                At the core are sophisticated Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks, powered by cutting-edge Explainable AI (XAI) models for transparent and precise cardiac sound classification.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Our Team Section */}
      <section id="team" ref={(el) => sectionRefs.current[5] = el} className="py-20 md:py-32 bg-blue-50 dark:bg-gray-800 overflow-hidden px-6">
        <div className="container mx-auto text-center">
          {/* UPDATED TEAM SECTION HEADLINE */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 animate-fade-in-up">
            Our Team: The Minds Behind SmartBeat
          </h2>
          {/* Optional Sub-headline */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-16 max-w-2xl mx-auto animate-fade-in-up-delay-200">
            Pioneers at the intersection of IoT, AI, and healthcare.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {[
              { name: "SADAF ZAFEER", regId: "Ck-SP22-120262", cgpa: "3.86", email: "Ck-sp22-120262@iqrauni.edu.pk", role: "Signal Processing & AI Model Development", avatar: "https://randomuser.me/api/portraits/women/70.jpg" },
              { name: "ADNAN RIAZ", regId: "Ck-SP22-120250", cgpa: "3.37", email: "Ck-sp22-120250@iqrauni.edu.pk", role: "Hardware Setup & Integration", avatar: "https://randomuser.me/api/portraits/men/70.jpg" },
              { name: "UMAR KHALID CHAUDHARY", regId: "Ck-SP22-120283", cgpa: "2.93", email: "Ck-sp22-120283@iqrauni.edu.pk", role: "Software Development for Dashboard", avatar: "https://randomuser.me/api/portraits/men/72.jpg" },
            ].map((member, index) => (
              <div key={index} className="team-member-card bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <img src={member.avatar} alt={`Portrait of ${member.name}`} className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-blue-500 dark:border-blue-400 shadow-md" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-300 text-lg font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Reg. #: {member.regId}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">CGPA: {member.cgpa}</p>
                <a href={`mailto:${member.email}`} className="text-blue-700 dark:text-blue-400 hover:underline text-md font-medium transition-colors duration-200">
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" ref={(el) => sectionRefs.current[6] = el} className="py-20 md:py-32 bg-gray-100 dark:bg-gray-800 overflow-hidden px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-16 animate-fade-in-up">
            Hear From Our Esteemed Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10 justify-items-center">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] border border-blue-100 dark:border-blue-700">
                <blockquote className="text-gray-700 dark:text-gray-300 italic text-xl leading-relaxed mb-8 flex-grow">
                  <p className="before:content-['“'] before:text-blue-500 before:text-5xl before:block before:mb-[-15px] after:content-['”'] after:text-blue-500 after:text-5xl after:block after:mt-[-15px]">
                    {testimonial.quote}
                  </p>
                </blockquote>
                <div className="flex flex-col items-center mt-6">
                  <img src={testimonial.avatar} alt={`Portrait of ${testimonial.name}`} className="w-20 h-20 rounded-full object-cover mb-4 border-3 border-blue-500 dark:border-blue-400 shadow-md" />
                  <p className="font-bold text-blue-700 dark:text-blue-400 text-xl">{testimonial.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-md">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        ref={(el) => sectionRefs.current[7] = el}
        className="bg-gray-50 dark:bg-gray-900 py-20 px-6 overflow-hidden"
        aria-label="Frequently Asked Questions about SmartBeat"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-blue-700 dark:text-blue-400 tracking-tight animate-fade-in-up">
            Your Most Common Questions, Answered.
          </h2>
          <div className="space-y-6">
            {faqData.map(({ q, a }, idx) => (
              <details
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200"
                tabIndex="0"
                role="region"
                aria-expanded="false"
              >
                <summary className="text-xl font-semibold text-blue-800 dark:text-blue-300 cursor-pointer flex justify-between items-center py-2">
                  {q}
                  <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm transform transition-transform duration-200 details-arrow">
                    &#9662; {/* Down arrow */}
                  </span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg border-t border-gray-200 dark:border-gray-700 pt-4">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        ref={(el) => sectionRefs.current[8] = el}
        className="max-w-7xl mx-auto px-6 py-20 md:py-32 overflow-hidden"
        aria-label="SmartBeat Insights: Our Latest Blog Posts"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-blue-700 dark:text-blue-400 tracking-tight animate-fade-in-up">
          SmartBeat Insights: Our Latest Blog Posts
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map(({ title, link, image, excerpt }, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-500 overflow-hidden group"
              aria-label={`Read article: ${title}`}
            >
              <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3 leading-tight">
                  {title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-base mb-4 line-clamp-3">
                  {excerpt}
                </p>
                <span className="text-blue-600 dark:text-blue-300 font-semibold underline hover:no-underline transition-colors duration-200">
                  Read More &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Awards & Partners Section */}
      <section ref={(el) => sectionRefs.current[9] = el} className="bg-gray-100 dark:bg-gray-800 py-20 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-12">
          <div className="mb-12 md:mb-0 md:w-1/2 text-center md:text-left animate-fade-in-up">
            {/* NEW TITLE FOR AWARDS */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-blue-700 dark:text-blue-400 tracking-tight">
              Our Journey to Excellence: Accolades & Milestones
            </h2>
            <ul className="list-none space-y-4 text-gray-700 dark:text-gray-300 text-lg">
              {awards.map((award, idx) => (
                <li key={idx} className="flex items-start">
                    <FaAward className="text-yellow-500 mr-3 text-2xl flex-shrink-0 mt-1" />
                    <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 text-center md:text-left animate-fade-in-up">
            {/* NEW TITLE FOR PARTNERS */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-800 dark:text-gray-100 tracking-tight">
              Driving Forward: Our Valued Partners
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 items-center justify-center">
              {partners.map(({ name, logo }, idx) => (
                <img
                  key={idx}
                  src={logo}
                  alt={`${name} Logo`}
                  className="max-h-20 mx-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                  loading="lazy"
                  width="150" height="75"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription / Contact */}
      <section
        id="contact"
        ref={(el) => sectionRefs.current[10] = el}
        className="max-w-5xl mx-auto px-8 py-20 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl text-center my-20 border border-blue-200 dark:border-blue-700 overflow-hidden"
        aria-label="Contact and Newsletter Subscription"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-blue-700 dark:text-blue-400 tracking-tight animate-fade-in-up">
          Connect With SmartBeat
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates, medical breakthroughs, and exclusive insights from the SmartBeat team, or reach out directly.
        </p>
        {subscribed ? (
          <p className="text-green-600 dark:text-green-400 font-semibold text-2xl animate-pulse">
            Thank you for subscribing to SmartBeat updates! 🎉 You're now part of our journey towards healthier hearts.
          </p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row justify-center items-center gap-5 max-w-xl mx-auto"
            aria-label="Newsletter subscription form"
            noValidate
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              aria-describedby="email-error"
              className="px-6 py-4 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 w-full text-gray-900 dark:bg-gray-700 dark:text-gray-100 text-lg shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-blue-700 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-lg shadow-lg"
            >
              Subscribe Now
            </button>
          </form>
        )}
        {error && (
          <p
            id="email-error"
            className="mt-5 text-red-600 dark:text-red-400 font-medium text-md"
            role="alert"
          >
            {error}
          </p>
        )}
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                General Inquiries & Support
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                We're here to help! Feel free to reach out to our team.
            </p>
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">
                Email: <a href="mailto:info@smartbeat.com" className="hover:underline">info@smartbeat.com</a>
            </p>
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-300">
                Phone: <a href="tel:+923123456789" className="hover:underline">+92 312 3456789</a>
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
                <FaBuilding className="inline-block mr-2 text-blue-500" /> Based in Karachi, Pakistan
            </p>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-blue-800 dark:bg-blue-950 text-white text-center py-10 mt-auto shadow-inner">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-6 text-lg">
            &copy; {new Date().getFullYear()} SmartBeat. All rights reserved. Pioneering Cardiac Innovation.
          </p>
          <p className="text-sm text-blue-200 dark:text-blue-300 mb-4">
            Official Project Name: IoT Based Phonocardiogram (PCG) Monitoring and AI-Driven Analysis System
          </p>
          <div className="flex justify-center space-x-8 mb-6">
            <a href="https://linkedin.com/company/smartbeat-tech" target="_blank" rel="noopener noreferrer" aria-label="SmartBeat on LinkedIn" className="text-white hover:text-blue-200 transition-colors duration-200 transform hover:scale-110">
              <FaLinkedin className="text-4xl" />
            </a>
            <a href="https://twitter.com/smartbeat_tech" target="_blank" rel="noopener noreferrer" aria-label="SmartBeat on Twitter" className="text-white hover:text-blue-200 transition-colors duration-200 transform hover:scale-110">
              <FaTwitter className="text-4xl" />
            </a>
            <a href="https://facebook.com/smartbeattech" target="_blank" rel="noopener noreferrer" aria-label="SmartBeat on Facebook" className="text-white hover:text-blue-200 transition-colors duration-200 transform hover:scale-110">
              <FaFacebook className="text-4xl" />
            </a>
            {/* Add more social media links here */}
          </div>
          <p className="text-sm text-blue-200 dark:text-blue-300">Developed by the dedicated team from IQRA University's BS-CS/SE/AI program.</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-10 right-10 bg-blue-700 dark:bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400 z-50 animate-bounce-subtle"
        >
          <FaArrowUp className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default Home;