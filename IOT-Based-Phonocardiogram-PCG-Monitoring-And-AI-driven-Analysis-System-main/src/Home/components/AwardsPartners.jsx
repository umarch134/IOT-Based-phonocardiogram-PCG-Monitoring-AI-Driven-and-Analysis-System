// src/components/AwardsPartners.jsx
import React from 'react';

const awards = [
    "IQRA University FYP Excellence Award 2025 (Anticipated)",
    "HealthTech Innovation Challenge Finalist 2024",
    "Top MedTech Startup Pitch - National Innovation Summit 2023",
    "Best IoT Solution in Healthcare - Tech for Good Awards (Project Stage)",
];

const partners = [
    { name: "IQRA University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Iqra_University_seal.svg/1200px-Iqra_University_seal.svg.png" },
    { name: "Global Health Alliance", logo: "https://via.placeholder.com/150x75?text=Global+Health+Alliance" },
    { name: "Innovate AI Solutions", logo: "https://via.placeholder.com/150x75?text=Innovate+AI+Solutions" },
    { name: "Precision Diagnostics", logo: "https://via.placeholder.com/150x75?text=Precision+Diagnostics" },
    { name: "Wearable Tech Corp", logo: "https://via.placeholder.com/150x75?text=Wearable+Tech+Corp" },
    { name: "Medical Device Fund", logo: "https://via.placeholder.com/150x75?text=Medical+Device+Fund" },
];

const AwardsPartners = ({ setRef }) => {
    return (
        <section id="awards-partners" ref={setRef} className="py-20 md:py-32 bg-gray-100 dark:bg-gray-800 px-6">
            <div className="container mx-auto text-center">
                {/* Awards Section */}
                <div className="mb-20">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up">Recognitions</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-10 animate-fade-in-up">
                        Our Achievements & Milestones
                    </h2>
                    <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
                        {awards.map((award, index) => (
                            <li key={index} className="flex items-center justify-center">
                                <span className="mr-2 text-blue-500 dark:text-blue-300 animate-pulse-light">●</span> {award}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Partners Section */}
                <div>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up">Our Collaborators</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-10 animate-fade-in-up">
                        Trusted Partners & Supporters
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16 mt-8 animate-fade-in-up">
                        {partners.map((partner, index) => (
                            <div key={index} className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110 flex items-center justify-center" style={{ animationDelay: `${index * 0.05}s` }}>
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-16 max-w-[120px] object-contain dark:invert" // dark:invert to make light logos visible on dark backgrounds
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AwardsPartners;