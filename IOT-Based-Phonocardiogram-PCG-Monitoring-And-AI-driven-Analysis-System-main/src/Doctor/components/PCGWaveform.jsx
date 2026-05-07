// PCGWaveform.jsx
import React from 'react';

/**
 * PCGWaveform SVG Component: Generates a simple SVG representation of a PCG waveform.
 * Used to visualize heart sound data, now including S3 and S4.
 * @param {object} props - Component props.
 * @param {number} props.width - Width of the SVG.
 * @param {number} props.height - Height of the SVG.
 * @param {string} props.strokeColor - Color for the waveform line.
 * @param {string} props.fillColor - Fill color for the area under the waveform.
 * @param {boolean} [props.s3Presence=true] - Whether to show S3 sound marker (now always true for demo).
 * @param {boolean} [props.s4Presence=true] - Whether to show S4 sound marker (now always true for demo).
 */
const PCGWaveform = ({ width = 400, height = 150, strokeColor, fillColor }) => {
    // Generates points to create a waveform-like path
    const points = [];
    const numPoints = 100;
    const peakHeight = height * 0.4;
    const midline = height / 2;

    for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * width;
        let y;
        // Simulates two "heart sound" peaks (S1 and S2)
        if (i < numPoints * 0.15) { // S1 peak region
            y = midline - peakHeight * Math.sin((i / (numPoints * 0.15)) * Math.PI);
        } else if (i > numPoints * 0.3 && i < numPoints * 0.45) { // S2 peak region
            y = midline - (peakHeight * 0.6) * Math.sin(((i - numPoints * 0.3) / (numPoints * 0.15)) * Math.PI);
        } else {
            y = midline + (Math.random() - 0.5) * 5; // Adds some noise in between peaks
        }
        points.push(`${x},${y}`);
    }

    const pathData = `M${points.join('L')}`;

    // Define positions for S1, S2, S3, S4 markers
    // S1: Start of systole, typically the first prominent sound.
    // S2: End of systole, typically the second prominent sound.
    // S3: Early diastole (after S2), often indicates volume overload.
    // S4: Late diastole (before S1), often indicates ventricular stiffness.
    const s1Pos = points[Math.floor(numPoints * 0.07)]; // Position within the first peak
    const s2Pos = points[Math.floor(numPoints * 0.37)]; // Position within the second peak
    const s3Pos = points[Math.floor(numPoints * 0.55)]; // Simulated position after S2
    const s4Pos = points[Math.floor(numPoints * 0.02)]; // Simulated position before S1

    // For demonstration, force s3Presence and s4Presence to true
    const s3Presence = true;
    const s4Presence = true;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ border: '1px solid currentColor', borderRadius: '8px' }}>
            {/* Defines a gradient for filling the waveform area */}
            <defs>
                <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity="0.6"/>
                    <stop offset="100%" stopColor={fillColor} stopOpacity="0"/>
                </linearGradient>
            </defs>
            {/* Draws the waveform path */}
            <path d={pathData} stroke={strokeColor} strokeWidth="2" fill="url(#waveformGradient)" />
            {/* Draws the midline */}
            <line x1="0" y1={midline} x2={width} y2={midline} stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />

            {/* S1 Marker */}
            {s1Pos && (
                <>
                    <circle cx={s1Pos.split(',')[0]} cy={s1Pos.split(',')[1]} r="3" fill="red" />
                    <text x={s1Pos.split(',')[0]} y={parseFloat(s1Pos.split(',')[1]) - 10} textAnchor="middle" fill={strokeColor} fontSize="10">S1</text>
                </>
            )}

            {/* S2 Marker */}
            {s2Pos && (
                <>
                    <circle cx={s2Pos.split(',')[0]} cy={s2Pos.split(',')[1]} r="3" fill="red" />
                    <text x={s2Pos.split(',')[0]} y={parseFloat(s2Pos.split(',')[1]) - 10} textAnchor="middle" fill={strokeColor} fontSize="10">S2</text>
                </>
            )}

            {/* S3 Marker (now always present for demonstration) */}
            {s3Presence && s3Pos && (
                <>
                    <circle cx={s3Pos.split(',')[0]} cy={s3Pos.split(',')[1]} r="3" fill="orange" />
                    <text x={s3Pos.split(',')[0]} y={parseFloat(s3Pos.split(',')[1]) - 10} textAnchor="middle" fill="orange" fontSize="10">S3</text>
                </>
            )}

            {/* S4 Marker (now always present for demonstration) */}
            {s4Presence && s4Pos && (
                <>
                    <circle cx={s4Pos.split(',')[0]} cy={s4Pos.split(',')[1]} r="3" fill="purple" />
                    <text x={s4Pos.split(',')[0]} y={parseFloat(s4Pos.split(',')[1]) - 10} textAnchor="middle" fill="purple" fontSize="10">S4</text>
                </>
            )}
        </svg>
    );
};

export default PCGWaveform;
