import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Card from './Card';
import StatusBadge from './StatusBadge';
import axios from 'axios';

const PCGUploadAndAnalysis = ({ themeColors, onNewPcgReport, onUpdateLivePcgData, patients }) => {
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState(null);
    const [patientId, setPatientId] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'audio/wav' || file.type === 'audio/mpeg')) {
            setSelectedFile(file);
            setAnalysisResult(null);
        } else {
            setSelectedFile(null);
            toast.error("Please select a valid .wav or .mp3 audio file.");
        }
    };

    const realCNNAnalysis = useCallback(async (file, patientId) => {
        try {
            setIsAnalyzing(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('patientId', patientId);

            // Step 1: Flask Prediction
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const result = response.data;

            if (!result || !result.pcgMetrics) {
                toast.error("Model did not return valid analysis.");
                return;
            }

            const fullResult = {
                ...result,
                audioFile: URL.createObjectURL(file),
            };

            setAnalysisResult(fullResult);

            // Step 2: Save to MongoDB backend
            const saveRes = await axios.post('/api/pcg/upload-pcg-report', {
                ...result,
                patientId,
            });

            if (saveRes.data.success) {
                toast.success("Analysis saved and completed!");
            } else {
                toast.warning("Analysis done but failed to save to database.");
            }

            // Step 3: Notify parent
            if (onNewPcgReport) onNewPcgReport(fullResult);
            if (onUpdateLivePcgData) onUpdateLivePcgData(fullResult);

        } catch (error) {
            console.error("Error during analysis:", error);
            toast.error("Analysis failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    }, [onNewPcgReport, onUpdateLivePcgData]);

    const handleAnalyzeClick = () => {
        if (!selectedFile) return toast.error(t('noFileSelected'));
        if (!patientId) return toast.error(t('enterPatientIdForAnalysis'));
        const patientExists = patients.some(p => p.id === patientId);
        if (!patientExists) return toast.error(t('patientNotFound', { patientId }));

        realCNNAnalysis(selectedFile, patientId);
    };

    return (
        <Card title={t('uploadHeartSound')} themeColors={themeColors} className="col-span-full">
            <div className="space-y-4">
                <div>
                    <label htmlFor="patientIdForAnalysis" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('patientIdForAnalysis')}
                    </label>
                    <input
                        type="text"
                        id="patientIdForAnalysis"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        placeholder={t('enterPatientIdForAnalysis')}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
                    />
                </div>

                <div>
                    <label htmlFor="heartSoundFile" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('selectFile')}
                    </label>
                    <div className="mt-1 flex items-center space-x-3">
                        <input
                            type="file"
                            id="heartSoundFile"
                            accept=".wav,.mp3"
                            onChange={handleFileChange}
                            className={`block w-full text-sm ${themeColors.textColorClass} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer`}
                        />
                        <span className={`text-sm text-gray-500 dark:text-gray-400`}>
                            {selectedFile ? selectedFile.name : t('noFileSelected')}
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleAnalyzeClick}
                    disabled={!selectedFile || isAnalyzing || !patientId}
                    className={`${themeColors.buttonPrimaryClass} px-6 py-2 rounded-md flex items-center justify-center transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isAnalyzing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM6 17.29A8 8 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"></path>
                            </svg>
                            {t('analyzing')}
                        </>
                    ) : (
                        <>
                            <i className="fas fa-wave-square mr-2"></i> {t('analyze')}
                        </>
                    )}
                </button>

                {analysisResult && (
                    <div className={`mt-6 p-6 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass}`}>
                        <h3 className={`text-lg font-semibold ${themeColors.textColorClass} mb-3 flex items-center`}>
                            <CheckCircleIcon className="h-6 w-6 text-emerald-500 mr-2" /> {t('analysisReport')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <p><strong className={themeColors.textColorClass}>{t('patientID')}:</strong> {analysisResult.patientId}</p>
                            <p><strong className={themeColors.textColorClass}>{t('patientName')}:</strong> {analysisResult.patientName}</p>
                            <p><strong className={themeColors.textColorClass}>{t('date')}:</strong> {analysisResult.date}</p>
                            <p><strong className={themeColors.textColorClass}>{t('type')}:</strong> {t(analysisResult.type.replace(/\s/g, '').toLowerCase())}</p>
                            <p><strong className={themeColors.textColorClass}>{t('modelClassification')}:</strong> <StatusBadge status={analysisResult.classification} type="pcgClassification" /></p>
                            <p><strong className={themeColors.textColorClass}>{t('heartRate')}:</strong> {analysisResult.pcgMetrics.heartRate} bpm</p>
                            <p><strong className={themeColors.textColorClass}>{t('murmurPresence')}:</strong> {(analysisResult.pcgMetrics.murmurPresence * 100).toFixed(1)}%</p>
                            <p><strong className={themeColors.textColorClass}>{t('murmurtype')}:</strong> {analysisResult.pcgMetrics.murmurType}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s1Amplitude')}:</strong> {analysisResult.pcgMetrics.s1Amplitude}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s2Frequency')}:</strong> {analysisResult.pcgMetrics.s2Frequency} Hz</p>
                            <p><strong className={themeColors.textColorClass}>{t('pcgScore')}:</strong> {analysisResult.pcgMetrics.pcgScore}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s3presence')}:</strong> {analysisResult.pcgMetrics.s3Presence ? 'Yes' : 'No'}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s4presence')}:</strong> {analysisResult.pcgMetrics.s4Presence ? 'Yes' : 'No'}</p>
                        </div>
                        <h4 className={`text-md font-semibold ${themeColors.textColorClass} mt-4 mb-2`}>{t('doctor_notes')}</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-3">
                            {analysisResult.doctorNotes || "No specific notes for this report."}
                        </p>

                        {analysisResult.audioFile && (
                            <div className="mt-4">
                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgAudio')}</h4>
                                <audio controls src={analysisResult.audioFile} className="w-full" />
                            </div>
                        )}

                        {analysisResult.imageFile && (
                            <div className="mt-4">
                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgImage')}</h4>
                                <img src={analysisResult.imageFile} alt="PCG Waveform" className="w-full h-auto rounded-lg" onError={(e) => e.target.src = "https://placehold.co/400x200/CCCCCC/000000?text=Image+Not+Available"} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default PCGUploadAndAnalysis;
