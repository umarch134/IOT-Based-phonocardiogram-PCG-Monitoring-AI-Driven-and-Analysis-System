// src/components/Blog.jsx
import React from 'react';

const blogPosts = [
    {
        title: "The Transformative Power of IoT in Preventive Cardiology",
        link: "https://example.com/blog/iot-preventive-cardiology",
        image: "https://via.placeholder.com/600x400?text=IoT+Cardiology", // Replace with actual image paths if available
        excerpt: "Explore how interconnected devices are revolutionizing early detection and ongoing management of cardiovascular diseases, enabling truly preventive care.",
    },
    {
        title: "Decoding Heart Sounds: The Magic of AI in PCG Analysis",
        link: "https://example.com/blog/ai-pcg-analysis",
        image: "https://via.placeholder.com/600x400?text=AI+PCG+Decoding",
        excerpt: "Dive deep into how advanced AI algorithms, specifically CNNs and LSTMs, interpret the subtle nuances of heart sounds to identify complex anomalies.",
    },
    {
        title: "SmartBeat's Patient-Centric Design: Empowering Self-Monitoring",
        link: "https://example.com/blog/patient-centric-design",
        image: "https://via.placeholder.com/600x400?text=Patient+Care",
        excerpt: "Understand the philosophy behind SmartBeat's user-friendly interface and how it empowers patients to take an active role in their cardiac health.",
    },
    {
        title: "The Ethical Implications of Explainable AI in Medicine",
        link: "https://example.com/blog/xai-ethics",
        image: "https://via.placeholder.com/600x400?text=AI+Ethics",
        excerpt: "A critical discussion on the importance of transparency in AI-driven medical diagnostics and how SmartBeat embraces XAI for enhanced trust and clinical confidence.",
    },
];

const Blog = ({ setRef }) => {
    return (
        <section id="blog" ref={setRef} className="py-20 md:py-32 bg-white dark:bg-gray-900 px-6">
            <div className="container mx-auto text-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3 block animate-fade-in-up">Latest Insights</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-16 animate-fade-in-up">
                    Our Blog & News
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {blogPosts.map((post, index) => (
                        <a
                            key={index}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-102 border border-gray-200 dark:border-gray-700 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 object-cover rounded-t-xl"
                            />
                            <div className="p-6 text-left">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                    {post.excerpt}
                                </p>
                                <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm hover:underline">
                                    Read More &rarr;
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;