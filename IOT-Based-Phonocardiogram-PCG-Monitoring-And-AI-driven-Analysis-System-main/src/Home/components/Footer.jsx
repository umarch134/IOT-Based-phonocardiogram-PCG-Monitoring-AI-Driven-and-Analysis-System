// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-12 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
                {/* Brand Info */}
                <div className="col-span-full md:col-span-1">
                    <a href="#home" className="text-3xl font-extrabold text-blue-400 tracking-wider mb-4 block hover:text-blue-300 transition-colors duration-200">
                        SmartBeat
                    </a>
                    <p className="text-sm leading-relaxed">
                        Pioneering the future of cardiac diagnostics with IoT and AI.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-6 mt-6">
                        <a href="https://linkedin.com/smartbeat" target="_blank" rel="noopener noreferrer" aria-label="SmartBeat on LinkedIn" className="text-gray-400 hover:text-blue-400 text-2xl transition-colors duration-200">
                            <FaLinkedin />
                        </a>
                        <a href="https://twitter.com/smartbeat" target="_blank" rel="noopener noreferrer" aria-label="SmartBeat on Twitter" className="text-gray-400 hover:text-blue-400 text-2xl transition-colors duration-200">
                            <FaTwitter />
                        </a>
                        <a href="https://facebook.com/smartbeat" target="_blank" rel="noopener noreferrer" aria-label="SmartBeat on Facebook" className="text-gray-400 hover:text-blue-400 text-2xl transition-colors duration-200">
                            <FaFacebook />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-bold text-white dark:text-gray-100 mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#about" className="hover:text-white transition-colors duration-200">About Us</a></li>
                        <li><a href="#features" className="hover:text-white transition-colors duration-200">Features</a></li>
                        <li><a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a></li>
                        <li><a href="#technology" className="hover:text-white transition-colors duration-200">Technology</a></li>
                        <li><a href="#faq" className="hover:text-white transition-colors duration-200">FAQ</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-lg font-bold text-white dark:text-gray-100 mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#blog" className="hover:text-white transition-colors duration-200">Blog</a></li>
                        <li><a href="#testimonials" className="hover:text-white transition-colors duration-200">Testimonials</a></li>
                        <li><a href="#awards-partners" className="hover:text-white transition-colors duration-200">Partnerships</a></li>
                        <li><a href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                        <li><a href="/terms-of-service" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-bold text-white dark:text-gray-100 mb-4">Contact Info</h4>
                    <address className="not-italic text-sm space-y-2">
                        <p>123 SmartBeat Avenue,<br />Innovation City, Pakistan</p>
                        <p>Email: <a href="mailto:info@smartbeat.com" className="hover:text-white">info@smartbeat.com</a></p>
                        <p>Phone: <a href="tel:+923001234567" className="hover:text-white">+92 3XX-XXXXXXX</a></p>
                    </address>
                </div>
            </div>

            <div className="border-t border-gray-700 dark:border-gray-700 mt-10 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} SmartBeat. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;