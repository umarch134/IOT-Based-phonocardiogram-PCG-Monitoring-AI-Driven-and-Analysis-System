// src/components/LivePcgDemo.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaHeartbeat, FaBrain, FaPlay, FaStop, FaExclamationTriangle } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LivePcgDemo = ({ setRef }) => {
    const [pcgData, setPcgData] = useState(Array(50).fill(0));
    const [heartRate, setHeartRate] = useState(72);
    const [aiAnalysis, setAiAnalysis] = useState("Monitoring Paused");
    const [isMonitoring, setIsMonitoring] = useState(false);
    const dataIntervalRef = useRef(null);

    const startPcgMonitoring = () => {
        if (isMonitoring) return;
        setIsMonitoring(true);
        let count = 0;
        const initialData = Array(50).fill(0).map(() => Math.random() * 2 - 1);
        setPcgData(initialData);
        setAiAnalysis("Analyzing Heart Sounds...");

        dataIntervalRef.current = setInterval(() => {
            setPcgData(prevData => {
                const newDataPoint = Math.sin(count * 0.2) + Math.random() * 0.5 - 0.25;
                const updatedData = [...prevData.slice(1), newDataPoint];
                count++;

                if (count % 200 === 0) {
                    const anomalies = ["Systolic Murmur Detected", "Mild Arrhythmia Identified", "No Abnormalities Detected"];
                    const randomIndex = Math.floor(Math.random() * anomalies.length);
                    setAiAnalysis(anomalies[randomIndex]);
                } else if (count % 100 === 0) {
                    setAiAnalysis("Normal Sinus Rhythm");
                }
                setHeartRate(Math.floor(60 + Math.random() * 30));
                return updatedData;
            });
        }, 100);
    };

    const stopPcgMonitoring = () => {
        setIsMonitoring(false);
        if (dataIntervalRef.current) {
            clearInterval(dataIntervalRef.current);
        }
        setPcgData(Array(50).fill(0));
        setAiAnalysis("Monitoring Paused");
        setHeartRate(0);
    };

    const simulateAnomaly = () => {
        if (!isMonitoring) {
            setAiAnalysis("Start monitoring to simulate anomaly.");
            return;
        }
        setAiAnalysis("Significant Irregularity Detected!");
        setPcgData(prevData => {
            const lastFew = prevData.slice(-10);
            const anomalyPoints = lastFew.map((val, i) => val + Math.sin(i * Math.PI / 5) * 2);
            return [...prevData.slice(0, prevData.length - 10), ...anomalyPoints];
        });
    };

    const chartData = {
        labels: Array(pcgData.length).fill(''),
        datasets: [
            {
                label: 'PCG Waveform',
                data: pcgData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                pointRadius: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        animation: false,
        scales: {
            x: {
                display: false,
            },
            y: {
                min: -2,
                max: 2,
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <section id="live-demo" ref={setRef} className="py-20 bg-gray-100 dark:bg-gray-800 flex justify-center items-center overflow-hidden px-6">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-12 text-center border border-blue-200 dark:border-blue-700 animate-fade-in-up">
                <h2 className="text-4xl font-extrabold mb-8 text-blue-700 dark:text-blue-400">
                    SmartBeat In Action: Live PCG Monitoring & AI Insights
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                    Witness how SmartBeat captures, processes, and visualizes heart sounds, bringing complex diagnostics to an intuitive platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Live PCG Waveform */}
                    <div
                        aria-label="Live PCG waveform demonstration"
                        className="relative h-72 bg-gradient-to-br from-green-100 to-green-300 dark:from-green-700 dark:to-green-900 rounded-xl flex flex-col items-center justify-center text-green-800 dark:text-green-200 font-mono font-bold select-none text-2xl border-4 border-dashed border-green-600 dark:border-green-500 overflow-hidden group p-4"
                    >
                        <div className="absolute inset-0 bg-pattern-dots opacity-20 dark:opacity-30"></div>
                        <div className="relative z-10 w-full h-full">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                        <span className="absolute top-4 left-4 text-sm text-green-700 dark:text-green-300 opacity-90">
                            <FaHeartbeat className="inline-block mr-2" /> Live PCG Stream
                        </span>
                        <span className="absolute bottom-4 left-4 text-lg text-green-700 dark:text-green-300 font-bold">
                            HR: {heartRate} BPM
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse-light group-hover:animate-none"></div>
                    </div>
                    {/* Interactive Dashboard / AI Analysis */}
                    <div
                        aria-label="SmartBeat Dashboard Screenshot"
                        className="relative h-72 bg-gradient-to-br from-purple-100 to-purple-300 dark:from-purple-700 dark:to-purple-900 rounded-xl flex flex-col items-center justify-center text-purple-800 dark:text-purple-200 font-mono font-bold select-none text-2xl border-4 border-dashed border-purple-600 dark:border-purple-500 overflow-hidden group p-4"
                    >
                        <div className="absolute inset-0 bg-pattern-squares opacity-20 dark:opacity-30"></div>
                        <FaBrain className="relative z-10 text-6xl mb-4 animate-bounce-slow" />
                        <span className={`relative z-10 text-purple-900 dark:text-purple-100 text-3xl font-semibold mb-4 ${aiAnalysis.includes("Anomaly") ? 'text-red-600 animate-pulse-slow' : ''}`}>
                            {aiAnalysis}
                        </span>
                        <div className="relative z-10 flex space-x-4 mt-6">
                            <button
                                onClick={startPcgMonitoring}
                                disabled={isMonitoring}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                <FaPlay className="mr-2" /> Start Monitoring
                            </button>
                            <button
                                onClick={stopPcgMonitoring}
                                disabled={!isMonitoring}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-red-300"
                            >
                                <FaStop className="mr-2" /> Stop Monitoring
                            </button>
                        </div>
                        <button
                            onClick={simulateAnomaly}
                            className="relative z-10 mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-5 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-yellow-300"
                            disabled={!isMonitoring}
                        >
                            <FaExclamationTriangle className="mr-2" /> Simulate Anomaly
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LivePcgDemo;