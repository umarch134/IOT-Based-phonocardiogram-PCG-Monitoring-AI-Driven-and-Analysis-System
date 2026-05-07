// src/App.jsx
import { AiOutlineHome } from 'react-icons/lib/all'
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Technology from './components/Technology';
import OurTeam from './components/OurTeam';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import AwardsPartners from './components/AwardsPartners';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import LivePcgDemo from './components/LivePcgDemo'; // New component for the interactive demo


// Ensure Tailwind CSS animations are defined (usually in src/index.css or global.css)
// The styles from your original component's <style jsx> block should be moved here.
// For example, in src/styles/index.css:

/*
@tailwind base;
@tailwind components;
@tailwind utilities;

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
  opacity: 0;
}
.animate-fade-in-up-delay-100 { animation: fadeInUp 0.9s ease-out forwards 0.1s; opacity: 0; }
.animate-fade-in-up-delay-200 { animation: fadeInUp 0.9s ease-out forwards 0.2s; opacity: 0; }
.animate-fade-in-up-delay-300 { animation: fadeInUp 0.9s ease-out forwards 0.3s; opacity: 0; }
.animate-fade-in-up-delay-400 { animation: fadeInUp 0.9s ease-out forwards 0.4s; opacity: 0; }
.animate-fade-in-up-delay-500 { animation: fadeInUp 0.9s ease-out forwards 0.5s; opacity: 0; }

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

@keyframes pulse-light {
    0% { opacity: 0.1; }
    50% { opacity: 0.3; }
    100% { opacity: 0.1; }
}
.animate-pulse-light {
    animation: pulse-light 2s infinite ease-in-out;
}

@keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}
.animate-bounce-subtle {
    animation: bounce-subtle 2s infinite ease-in-out;
}

.feature-card:hover, .how-it-works-step:hover, .testimonial-card:hover, .team-member-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

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

details[open] .details-arrow {
    transform: rotate(180deg);
}

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
*/

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Use a single ref for all sections for Intersection Observer
    const sectionRefs = useRef([]);

    // Dark Mode Toggle Effect
    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode === 'true') {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    // Back to Top Button visibility Effect
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 600);
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
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -80px 0px",
            }
        );

        sectionRefs.current.forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    const scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col font-sans antialiased">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            <main>
                <Hero setRef={(el) => sectionRefs.current[0] = el} />
                <About setRef={(el) => sectionRefs.current[1] = el} />
                <LivePcgDemo setRef={(el) => sectionRefs.current[2] = el} />
                <Features setRef={(el) => sectionRefs.current[3] = el} />
                <HowItWorks setRef={(el) => sectionRefs.current[4] = el} />
                <Technology setRef={(el) => sectionRefs.current[5] = el} />
                <OurTeam setRef={(el) => sectionRefs.current[6] = el} />
                <Testimonials setRef={(el) => sectionRefs.current[7] = el} />
                <FAQ setRef={(el) => sectionRefs.current[8] = el} />
                <Blog setRef={(el) => sectionRefs.current[9] = el} />
                <AwardsPartners setRef={(el) => sectionRefs.current[10] = el} />
                <Newsletter setRef={(el) => sectionRefs.current[11] = el} />
                <Contact setRef={(el) => sectionRefs.current[12] = el} />
            </main>

            <Footer />

            {showBackToTop && (
                <BackToTopButton onClick={scrollToTop} />
            )}
        </div>
    );
};

export default App;