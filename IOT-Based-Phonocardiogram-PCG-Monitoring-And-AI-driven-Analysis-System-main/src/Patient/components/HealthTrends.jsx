// components/HealthTrends.js
import React, { useMemo, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import Card from './Card'; // Assuming Card component is in the same 'components' directory

/**
 * HealthTrends Component: Displays line charts for PCG-related health trends over time.
 * صحت کے رجحانات کمپونینٹ: وقت کے ساتھ پی سی جی سے متعلقہ صحت کے رجحانات کے لیے لائن چارٹ دکھاتا ہے۔
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors for chart styling.
 */
const HealthTrends = ({ t, themeColors }) => {
    // Generate simulated PCG trend data for the last 12 months
    // پچھلے 12 مہینوں کے لیے نقلی پی سی جی رجحان کا ڈیٹا تیار کریں۔
    const generatePCGTrendData = useCallback(() => {
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // Simulate Heart Rate (e.g., 60-90 bpm, with a slight potential increase over time)
        // دل کی دھڑکن کی نقل کریں (جیسے، 60-90 bpm، وقت کے ساتھ تھوڑا سا ممکنہ اضافہ کے ساتھ)
        const heartRateData = labels.map((_, i) => Math.floor(60 + Math.random() * 20 + (i / 12) * 10));
        // Simulate Murmur Score (e.g., 0: Normal, 1: Mild, 2: Moderate, 3: Severe)
        // Introduce some variation, maybe a slight increase in later months
        // مرمر سکور کی نقل کریں (جیسے، 0: نارمل، 1: ہلکا، 2: معتدل، 3: شدید)
        // کچھ تغیرات متعارف کروائیں، شاید بعد کے مہینوں میں تھوڑا سا اضافہ۔
        const murmurScoreData = labels.map((_, i) => Math.min(3, Math.floor(Math.random() * 2 + (i / 12) * 1)));

        return { labels, heartRateData, murmurScoreData };
    }, []);

    const { labels, heartRateData, murmurScoreData } = useMemo(generatePCGTrendData, [generatePCGTrendData]);

    // Dummy themes object for chart colors (as it was used directly in the original file)
    // چارٹ کے رنگوں کے لیے ڈمی تھیمز آبجیکٹ (جیسا کہ یہ اصل فائل میں براہ راست استعمال کیا گیا تھا)
    const dummyThemes = {
        light: {
            primaryRgb: '59, 130, 246', // blue-500
        }
    };

    const heartRateChartData = {
        labels,
        datasets: [
            {
                label: t('pcg_trend_heart_rate'),
                data: heartRateData,
                borderColor: `rgb(${dummyThemes.light.primaryRgb})`, // Using theme primary color for consistency
                backgroundColor: `rgba(${dummyThemes.light.primaryRgb}, 0.5)`,
                tension: 0.4,
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: `rgb(${dummyThemes.light.primaryRgb})`,
                pointBorderColor: themeColors.cardBgClass.replace('bg-', ''), // Use plain color value
                pointHoverRadius: 7,
            },
        ],
    };

    const murmurScoreChartData = {
        labels,
        datasets: [
            {
                label: t('pcg_trend_murmur_score'),
                data: murmurScoreData,
                borderColor: 'rgb(255, 159, 64)', // A distinct color for murmur score
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                tension: 0.4,
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: 'rgb(255, 159, 64)',
                pointBorderColor: themeColors.cardBgClass.replace('bg-', ''), // Use plain color value
                pointHoverRadius: 7,
            },
        ],
    };

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: themeColors.chartTextColor,
                }
            },
            title: {
                display: false, // Title is handled by Card component or H4
            },
            tooltip: {
                backgroundColor: themeColors.cardBgClass.replace('bg-', ''), // Extract color name for background
                titleColor: themeColors.textColorClass.replace('text-', ''), // Extract color name for text
                bodyColor: themeColors.textColorClass.replace('text-', ''),
                borderColor: themeColors.cardBorderClass.replace('border-', ''),
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.dataset.label === t('pcg_trend_murmur_score')) {
                            const score = context.parsed.y;
                            if (score === 0) label += t('normal');
                            else if (score === 1) label += t('mild');
                            else if (score === 2) label += t('moderate');
                            else if (score === 3) label += t('severe');
                        } else {
                            label += context.parsed.y;
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
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                },
                min: 0,
                max: 100, // General max for HR/Score scale
            },
        },
    }), [t, themeColors.chartGridColor, themeColors.chartTextColor, themeColors.cardBgClass, themeColors.textColorClass, themeColors.cardBorderClass]);

    const murmurScoreOptions = useMemo(() => ({
        ...chartOptions,
        scales: {
            x: chartOptions.scales.x,
            y: {
                ...chartOptions.scales.y,
                id: 'murmur-score-y-axis', // Unique ID for this scale
                min: -0.5, // Start below 0 for better visual of 'Normal'
                max: 3.5, // Extend slightly beyond max score for better visual
                stepSize: 1, // Ensure integer ticks
                ticks: {
                  ...chartOptions.scales.y.ticks,
                  callback: function (value, index, ticks) {
                    // Only display labels for integer values corresponding to levels
                    // صرف انٹیجر ویلیوز کے لیے لیبلز دکھائیں جو لیولز کے مطابق ہیں۔
                    if (value === 0) return t('normal');
                    if (value === 1) return t('mild');
                    if (value === 2) return t('moderate');
                    if (value === 3) return t('severe');
                    return '';
                  }
                }
            }
        }
    }), [chartOptions, t]);

    return (
        <Card title={t('healthTrends')} className="col-span-full" themeColors={themeColors}>
            <p className={`text-sm mb-4 ${themeColors.textColorClass} opacity-70`}>{t('pcg_value_over_time')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className={`text-lg font-semibold mb-2 ${themeColors.textColorClass}`}>{t('pcg_trend_heart_rate')}</h4>
                    <div className="h-64"> {/* Fixed height for the chart container */}
                        <Line data={heartRateChartData} options={chartOptions} />
                    </div>
                </div>
                <div>
                    <h4 className={`text-lg font-semibold mb-2 ${themeColors.textColorClass}`}>{t('pcg_trend_murmur_score')}</h4>
                    <div className="h-64"> {/* Fixed height for the chart container */}
                        <Line data={murmurScoreChartData} options={murmurScoreOptions} />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default HealthTrends;
