// src/components/About.jsx
import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';

const About = ({ setRef }) => {
    return (
        <section id="about" ref={setRef} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 overflow-hidden px-6">
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
                    <div className="relative w-full aspect-video rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105 border border-blue-300 dark:border-blue-600 overflow-hidden">
                        <video
                            src="/assets/videos/smartbeat-device-demo.mp4" // Use absolute path from public folder
                            poster="/assets/images/smartbeat-video-thumbnail.jpg" // Use absolute path from public folder
                            controls
                            loop
                            muted
                            autoPlay
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover"
                            aria-label="SmartBeat device in action: real-time PCG monitoring demonstration video."
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md text-sm text-gray-600 dark:text-gray-200 font-medium transform transition-transform hover:scale-105">
                        <FaHeartbeat className="inline-block mr-2 text-red-500" /> Real-time PCG Capture
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;