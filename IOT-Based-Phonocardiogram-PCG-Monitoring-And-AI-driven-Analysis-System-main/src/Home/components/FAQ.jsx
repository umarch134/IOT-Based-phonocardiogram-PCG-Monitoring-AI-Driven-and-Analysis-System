// src/components/FAQ.jsx
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

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

const FAQ = ({ setRef }) => {
    return (
        <section id="faq" ref={setRef} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 px-6">
            <div className="container mx-auto text-center max-w-4xl">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up">Got Questions?</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-16 animate-fade-in-up">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                    {faqData.map((item, index) => (
                        <details
                            key={index}
                            className="bg-white dark:bg-gray-900 rounded-xl shadow-md cursor-pointer group animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <summary className="flex justify-between items-center px-6 py-5 text-lg font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                {item.q}
                                <FaChevronDown className="details-arrow text-gray-500 dark:text-gray-400 transform transition-transform duration-300" />
                            </summary>
                            <div className="px-6 pb-5 pt-2 text-gray-700 dark:text-gray-300 leading-relaxed text-left border-t border-gray-200 dark:border-gray-700">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;