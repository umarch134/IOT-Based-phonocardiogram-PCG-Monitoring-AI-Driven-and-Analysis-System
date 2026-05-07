// src/components/HowItWorks.jsx
import React from 'react';
import { BiDevices, BiAnalyse } from "react-icons/bi";
import { FaCloudUploadAlt, FaChartLine, FaComments } from "react-icons/fa";

const howItWorksSteps = [
    { title: "Portable PCG Acquisition", desc: "Our compact IoT device is placed on the chest to capture real-time heart sounds with high fidelity.", icon: <BiDevices className="text-6xl text-blue-500 mb-4" /> },
    { title: "Secure Cloud Transmission", desc: "Captured PCG data is securely transmitted to our encrypted cloud platform via integrated wireless modules (Wi-Fi/Bluetooth).", icon: <FaCloudUploadAlt className="text-6xl text-green-500 mb-4" /> },
    { title: "AI-Driven Analysis", desc: "Advanced deep learning models (CNNs, LSTMs) in the cloud process the data, identifying subtle cardiac abnormalities.", icon: <BiAnalyse className="text-6xl text-purple-500 mb-4" /> },
    { title: "Intuitive Insights & Alerts", desc: "Processed data, diagnostic insights, and critical alerts are presented on user-friendly mobile and web dashboards.", icon: <FaChartLine className="text-6xl text-red-500 mb-4" /> },
    { title: "Explainable AI (XAI)", desc: "Receive not just diagnoses, but also clear, interpretable explanations for AI classifications, enhancing trust and clinical decision-making.", icon: <FaComments className="text-6xl text-yellow-500 mb-4" /> },
];

const HowItWorks = ({ setRef }) => {
    return (
        <section id="how-it-works" ref={setRef} className="py-20 md:py-32 bg-white dark:bg-gray-900 px-6">
            <div className="container mx-auto text-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up">The SmartBeat Journey</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-16 animate-fade-in-up">
                    How Our System Works: From Heartbeat to Insight
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {howItWorksSteps.map((step, index) => (
                        <div
                            key={index}
                            className="how-it-works-step bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="mb-4 flex justify-center items-center">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;