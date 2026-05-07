// components/PCGWaveform.js
import React from 'react';

/**
 * PCGWaveform SVG Component: Generates a simple SVG representation of a PCG waveform.
 * پی سی جی ویوفارم ایس وی جی کمپونینٹ: پی سی جی ویوفارم کی ایک سادہ ایس وی جی نمائندگی تیار کرتا ہے۔
 * @param {object} props - Component props.
 * @param {number} props.width - Width of the SVG.
 * @param {number} props.height - Height of the SVG.
 * @param {string} props.strokeColor - Color for the waveform line.
 * @param {string} props.fillColor - Fill color for the area under the waveform.
 * @param {Array<number>} props.data - Array of numerical data points for the waveform.
 */
const PCGWaveform = ({ width = 400, height = 150, strokeColor, fillColor, data }) => {
    if (!data || data.length === 0) {
        return (
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ border: '1px solid currentColor', borderRadius: '8px' }}>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={strokeColor} fontSize="14">
                    No waveform data.
                </text>
            </svg>
        );
    }

    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal;
    const scaleY = (val) => {
        if (range === 0) return height / 2; // Avoid division by zero
        return height - ((val - minVal) / range) * height;
    };

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = scaleY(val);
        return `${x},${y}`;
    }).join('L');

    const pathData = `M${points}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ border: '1px solid currentColor', borderRadius: '8px' }}>
            <defs>
                <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity="0.6"/>
                    <stop offset="100%" stopColor={fillColor} stopOpacity="0"/>
                </linearGradient>
            </defs>
            <path d={pathData} stroke={strokeColor} strokeWidth="2" fill="url(#waveformGradient)" />
            {/* Optional: Add a baseline */}
            {/* اختیاری: ایک بیس لائن شامل کریں */}
            <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
        </svg>
    );
};

export default PCGWaveform;
