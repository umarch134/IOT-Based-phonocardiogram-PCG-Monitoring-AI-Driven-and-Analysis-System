// src/components/Features.jsx
import React from 'react';
import { FaHeartbeat, FaBrain, FaMobileAlt, MdSecurity, FaComments, MdSpeed, FaMicrophone } from 'react-icons/lib/all'; // Combined import for cleaner look

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

const Features = ({ setRef }) => {
    return (
        <section id="features" ref={setRef} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 px-6">
            <div className="container mx-auto text-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up">Key Capabilities</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-16 animate-fade-in-up">
                    Unlocking Advanced Cardiac Care
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg transform transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex justify-center items-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;