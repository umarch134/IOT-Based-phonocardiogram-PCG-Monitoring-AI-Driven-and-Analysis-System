// components/CurrentHealthStatus.js
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import Card from './Card'; // Assuming Card component is in the same 'components' directory

/**
 * CurrentHealthStatus Component: Displays a bar chart for PCG metrics.
 * موجودہ صحت کی حالت کمپونینٹ: پی سی جی میٹرکس کے لیے بار چارٹ دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors for chart styling.
 * @param {object} props.pcgMetrics - Object containing S1 Amplitude, S2 Frequency, Murmur Presence, PCG Score.
 * @param {string} props.aiDiagnosis - AI diagnosis (Normal/Abnormal).
 */
const CurrentHealthStatus = ({ t, themeColors, pcgMetrics, aiDiagnosis }) => {
    const pcgData = useMemo(() => ({
        // Labels for the chart bars in the requested order: S1, S2, S3, S4, Murmur, PCG Score
        // چارٹ بارز کے لیے لیبلز مطلوبہ ترتیب میں: S1, S2, S3, S4, مرمر، PCG سکور
        labels: [t('s1Amplitude'), t('s2Frequency'), t('s3Amplitude'), t('s4Amplitude'), t('murmurPresence'), t('pcgScore')],
        datasets: [
            {
                label: t('pcgMetrics'),
                // Data points corresponding to the labels order.
                // If s3Presence or s4Presence are not provided, they default to 0.
                // لیبلز کی ترتیب کے مطابق ڈیٹا پوائنٹس۔ اگر s3Presence یا s4Presence فراہم نہیں کیے گئے ہیں، تو وہ 0 پر ڈیفالٹ ہوتے ہیں۔
                data: [
                    pcgMetrics.s1Amplitude,
                    pcgMetrics.s2Frequency,
                    pcgMetrics.s3Presence !== undefined ? pcgMetrics.s3Presence : 0, // S3 Data
                    pcgMetrics.s4Presence !== undefined ? pcgMetrics.s4Presence : 0, // S4 Data
                    pcgMetrics.murmurPresence * 100, // Murmur presence as a percentage
                    pcgMetrics.pcgScore,
                ],
                backgroundColor: [
                    `rgba(${themeColors.primaryRgb}, 0.7)`,    // S1 Color (dynamic from theme)
                    'rgba(75, 192, 192, 0.7)',                 // S2 Color (teal)
                    'rgba(255, 206, 86, 0.7)',                 // S3 Color (Yellow)
                    'rgba(54, 162, 235, 0.7)',                 // S4 Color (Blue)
                    'rgba(255, 99, 132, 0.7)',                 // Murmur Color (red)
                    'rgba(153, 102, 255, 0.7)',                // PCG Score Color (purple)
                ],
                borderColor: [
                    `rgb(${themeColors.primaryRgb})`,          // S1 Border (dynamic from theme)
                    'rgb(75, 192, 192)',                       // S2 Border
                    'rgb(255, 206, 86)',                       // S3 Border
                    'rgb(54, 162, 235)',                       // S4 Border
                    'rgb(255, 99, 132)',                       // Murmur Border
                    'rgb(153, 102, 255)',                      // PCG Score Border
                ],
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    }), [t, themeColors.primaryRgb, pcgMetrics.s1Amplitude, pcgMetrics.s2Frequency, pcgMetrics.murmurPresence, pcgMetrics.pcgScore, pcgMetrics.s3Presence, pcgMetrics.s4Presence]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `${t('currentHealthStatus')} - ${t('aiDiagnosis')}: ${t(aiDiagnosis.toLowerCase())}`,
                color: themeColors.chartTextColor,
                font: {
                    size: 18,
                    weight: 'bold',
                }
            },
            tooltip: {
                backgroundColor: themeColors.cardBgClass ? themeColors.cardBgClass.replace('bg-', '') : 'rgba(0,0,0,0.8)',
                titleColor: themeColors.textColorClass ? themeColors.textColorClass.replace('text-', '') : 'white',
                bodyColor: themeColors.textColorClass ? themeColors.textColorClass.replace('text-', '') : 'white',
                borderColor: themeColors.cardBorderClass ? themeColors.cardBorderClass.replace('border-', '') : 'gray',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            // This section handles the display for S1, S2, S3, S4, Murmur, and PCG Score
                            // یہ سیکشن S1, S2, S3, S4, مرمر، اور PCG سکور کے ڈسپلے کو ہینڈل کرتا ہے۔
                            if (context.label === t('s1Amplitude') || context.label === t('pcgScore') || context.label === t('s3Amplitude') || context.label === t('s4Amplitude')) {
                                label += context.parsed.y; // S1, S3, S4 are unitless scores/amplitudes
                            } else if (context.label === t('s2Frequency')) {
                                label += context.parsed.y + ' Hz'; // S2 is frequency
                            } else if (context.label === t('murmurPresence')) {
                                label += (context.parsed.y).toFixed(0) + '%'; // Murmur is a percentage
                            }
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                },
                min: 0,
                max: 100, // Max value for PCG metrics (percentage for murmur, score for others)
            },
        },
    }), [t, themeColors.chartGridColor, themeColors.chartTextColor, themeColors.cardBgClass, themeColors.textColorClass, themeColors.cardBorderClass, aiDiagnosis]);

    return (
        <Card title={t('currentHealthStatus')} className="col-span-full md:col-span-1" themeColors={themeColors}>
            <div className="h-64"> {/* Fixed height for the chart container */}
                {pcgData.datasets[0].data.length > 0 ? (
                    <Bar data={pcgData} options={chartOptions} />
                ) : (
                    <p className={`${themeColors.textColorClass.replace('text-gray-900', 'text-gray-500').replace('text-gray-100', 'text-gray-400')} text-center py-10`}>
                        {t('noHealthStatus')}
                    </p>
                )}
            </div>
        </Card>
    );
};

export default CurrentHealthStatus;
