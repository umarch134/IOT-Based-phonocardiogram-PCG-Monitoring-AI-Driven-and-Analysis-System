// src/components/Technology.jsx
import React from 'react';
import { FaMicrochip, FaCloud, FaDatabase, FaReact, FaPython } from 'react-icons/fa';

const Technology = ({ setRef }) => {
    return (
        <section id="technology" ref={setRef} className="py-20 md:py-32 bg-white dark:bg-gray-900 px-6">
            <div className="container mx-auto text-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up">The Engine Behind SmartBeat</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-16 animate-fade-in-up">
                    Our Cutting-Edge Technology Stack
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Placeholder for technology categories */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-102 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style={{ animationDelay: '0s' }}>
                        <FaMicrochip className="text-5xl text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Hardware & IoT</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Custom-designed portable PCG device, low-power microcontrollers, and integrated wireless communication modules for reliable data acquisition.
                        </p>
                        <ul className="text-gray-600 dark:text-gray-400 mt-4 text-left list-disc list-inside">
                            <li>High-fidelity Acoustic Sensors</li>
                            <li>ESP32 / Raspberry Pi (Edge Processing)</li>
                            <li>Wi-Fi, Bluetooth, LoRa Connectivity</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-102 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <FaBrain className="text-5xl text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">AI & Machine Learning</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            State-of-the-art deep learning architectures for accurate real-time heart sound analysis and anomaly detection.
                        </p>
                        <ul className="text-gray-600 dark:text-gray-400 mt-4 text-left list-disc list-inside">
                            <li>Convolutional Neural Networks (CNN)</li>
                            <li>Recurrent Neural Networks (LSTM)</li>
                            <li>TensorFlow / PyTorch</li>
                            <li>Explainable AI (XAI) Methods</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-102 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <FaCloud className="text-5xl text-green-600 dark:text-green-400 mb-4 mx-auto" />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Cloud & Backend</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Robust and scalable cloud infrastructure for data storage, processing, and API services.
                        </p>
                        <ul className="text-gray-600 dark:text-gray-400 mt-4 text-left list-disc list-inside">
                            <li>AWS / Azure / Google Cloud Platform</li>
                            <li>Node.js / Python (Backend APIs)</li>
                            <li>MongoDB / PostgreSQL (Database)</li>
                            <li>Microservices Architecture</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-102 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <FaReact className="text-5xl text-cyan-600 dark:text-cyan-400 mb-4 mx-auto" />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Frontend & UI/UX</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Intuitive and responsive interfaces for seamless user experience across devices.
                        </p>
                        <ul className="text-gray-600 dark:text-gray-400 mt-4 text-left list-disc list-inside">
                            <li>React.js (Web Dashboard)</li>
                            <li>React Native (Mobile App)</li>
                            <li>Tailwind CSS (Styling)</li>
                            <li>Chart.js (Data Visualization)</li>
                        </ul>
                    </div>

                    {/* Add more technology points as needed */}
                </div>
            </div>
        </section>
    );
};

export default Technology;