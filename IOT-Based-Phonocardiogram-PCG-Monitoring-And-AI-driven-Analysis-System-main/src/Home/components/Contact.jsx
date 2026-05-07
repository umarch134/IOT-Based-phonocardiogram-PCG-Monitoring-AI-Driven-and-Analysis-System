// src/components/Contact.jsx
import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = ({ setRef }) => {
    const handleRequestDemo = () => {
        alert("Thank you for your interest! A SmartBeat specialist will contact you shortly for a personalized demo and to discuss your needs.");
        // In a real application, this would trigger a modal form or navigation to a dedicated demo request page
        console.log("Demo requested!");
    };

    return (
        <section id="contact" ref={setRef} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 px-6">
            <div className="container mx-auto text-center max-w-4xl">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up">Get in Touch</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-10 leading-tight animate-fade-in-up">
                    Ready to Transform Cardiac Care?
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up-delay-100">
                    Whether you're a healthcare provider, researcher, or investor, we'd love to discuss how SmartBeat can meet your needs.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12 animate-fade-in-up-delay-200">
                    <button
                        onClick={handleRequestDemo}
                        className="bg-blue-700 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 text-lg"
                    >
                        Request a Demo
                    </button>
                    <a
                        href="mailto:info@smartbeat.com" // Replace with your actual email
                        className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 text-lg flex items-center justify-center"
                    >
                        <FaEnvelope className="mr-3" /> Email Us
                    </a>
                </div>

                <div className="mt-16 text-gray-700 dark:text-gray-300 animate-fade-in-up-delay-300">
                    <p className="text-xl font-semibold mb-4">You can also reach us directly:</p>
                    <p className="text-lg flex items-center justify-center mb-2">
                        <FaPhone className="mr-3 text-blue-500" /> +92 3XX-XXXXXXX (Pakistan)
                    </p>
                    <p className="text-lg flex items-center justify-center">
                        <FaEnvelope className="mr-3 text-blue-500" /> support@smartbeat.com
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;