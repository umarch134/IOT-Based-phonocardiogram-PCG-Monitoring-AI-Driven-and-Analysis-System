// src/components/Hero.jsx
import React from 'react';

const Hero = ({ setRef }) => {
    return (
        <header
            id="home"
            ref={setRef}
            className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 text-white shadow-xl min-h-[70vh] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/assets/images/pcg-bg.jpg')" // Use absolute path from public folder
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
    );
};

export default Hero;