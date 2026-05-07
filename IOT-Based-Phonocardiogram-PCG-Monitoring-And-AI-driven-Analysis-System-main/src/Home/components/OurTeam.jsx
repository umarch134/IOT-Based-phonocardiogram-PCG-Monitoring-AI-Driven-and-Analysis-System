// src/components/OurTeam.jsx
import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const teamMembers = [
    {
        name: "Dr. Hamza Ali",
        role: "Project Lead & AI Specialist",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        linkedin: "https://linkedin.com/in/hamza-ali",
    },
    {
        name: "Ayesha Siddiqa",
        role: "IoT Hardware Engineer",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        linkedin: "https://linkedin.com/in/ayesha-siddiqa",
    },
    {
        name: "Muhammad Usman",
        role: "Software & UI/UX Developer",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        linkedin: "https://linkedin.com/in/muhammad-usman",
    },
    {
        name: "Fatima Zahra",
        role: "Data Scientist & Researcher",
        image: "https://randomuser.me/api/portraits/women/10.jpg",
        linkedin: "https://linkedin.com/in/fatima-zahra",
    },
];

const OurTeam = ({ setRef }) => {
    return (
        <section id="team" ref={setRef} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 px-6">
            <div className="container mx-auto text-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up">Meet the Innovators</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-16 animate-fade-in-up">
                    The Minds Behind SmartBeat
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="team-member-card bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:scale-102 border border-gray-200 dark:border-gray-700 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <img
                                src={member.image}
                                alt={`${member.name} - ${member.role}`}
                                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-400 dark:border-blue-600 shadow-md"
                            />
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                                {member.name}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-300 font-medium mb-4">
                                {member.role}
                            </p>
                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200"
                                    aria-label={`LinkedIn profile of ${member.name}`}
                                >
                                    <FaLinkedin className="mr-2 text-xl" /> LinkedIn
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTeam;