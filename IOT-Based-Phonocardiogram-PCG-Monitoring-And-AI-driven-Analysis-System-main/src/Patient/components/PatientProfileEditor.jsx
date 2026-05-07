// components/PatientProfileEditor.js

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from './Card'; // Assuming Card component is in the same 'components' directory
import React, { useEffect, useCallback, useState } from 'react';

/**
 * PatientProfileEditor Component: Handles editing patient profile information and password changes.
 * پیشنٹ پروفائل ایڈیٹر کمپونینٹ: مریض کی پروفائل کی معلومات میں ترمیم اور پاس ورڈ کی تبدیلی کا انتظام کرتا ہے۔
 * @param {object} props - Component props.
 * @param {object} props.patientData - The original patient data.
 * @param {object} props.editablePatientData - The patient data being edited.
 * @param {function} props.setEditablePatientData - Function to update editable patient data.
 * @param {boolean} props.isEditingProfile - State indicating if the profile is in edit mode.
 * @param {function} props.setIsEditingProfile - Function to toggle edit mode.
 * @param {object} props.passwordFields - State for password change fields.
 * @param {function} props.setPasswordFields - Function to update password change fields.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.t - Translation function.
 * @param {function} props.setPatientData - Function to update the main patient data in parent.
 */
const PatientProfileEditor = ({
    patientData,
    editablePatientData,
    setEditablePatientData,
    isEditingProfile,
    setIsEditingProfile,
    passwordFields,
    setPasswordFields,
    themeColors,
    t,
    setPatientData,
}) => {
    const navigate = useNavigate();

    const handleEditProfileChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditablePatientData(prev => ({
            ...prev,
            [name]: value,
            contact: {
                ...prev.contact,
                [name]: value,
            },
            emergencyContact: {
                ...prev.emergencyContact,
                [name]: value,
            },
        }));
    }, [setEditablePatientData]);

    // ✅ Add this useEffect to load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("patientData");
        if (saved) {
            const parsed = JSON.parse(saved);
            setPatientData(parsed);
            setEditablePatientData(parsed);
        }
    }, []);


    const handleCancelEdit = useCallback(() => {
        setEditablePatientData(patientData); // Revert changes
        setIsEditingProfile(false);
    }, [patientData, setEditablePatientData, setIsEditingProfile]);

    const handlePasswordChange = useCallback(() => {
        const { currentPassword, newPassword, confirmNewPassword } = passwordFields;
        if (newPassword !== confirmNewPassword) {
            toast.error(t('passwordMismatch'));
            return;
        }
        // In a real app, you'd send currentPassword to backend for verification
        // and then update the password.
        if (currentPassword === 'password123') { // Dummy check
            toast.success(t('passwordChangeSuccess'));
            setPasswordFields({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        } else {
            toast.error(t('passwordChangeError'));
        }
    }, [passwordFields, t, setPasswordFields]);

   const handleSaveProfile = useCallback(async () => {
    try {
        const payload = {
            id: editablePatientData.id || patientData.id,
            ...editablePatientData,
            contact: { ...editablePatientData.contact },
            emergencyContact: { ...editablePatientData.emergencyContact },
            medicalConditions: Array.isArray(editablePatientData.medicalConditions)
                ? editablePatientData.medicalConditions
                : (editablePatientData.medicalConditions || '')
                    .split(',')
                    .map((item) => item.trim()),
            allergies: Array.isArray(editablePatientData.allergies)
                ? editablePatientData.allergies
                : (editablePatientData.allergies || '')
                    .split(',')
                    .map((item) => item.trim()),
        };

        const token = localStorage.getItem("token");

        if (!token || token === "null") {
            toast.error("🔒 Session expired. Please login again.");
            localStorage.clear();
            navigate("/login");
            return;
        }

        let decoded;
        try {
            decoded = JSON.parse(atob(token.split('.')[1]));
            if (decoded.exp * 1000 < Date.now()) {
                toast.error("⏰ Session expired. Logging out...");
                localStorage.removeItem("token");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000);
                return;
            }
        } catch (err) {
            toast.error("⚠️ Invalid token. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }

        const response = await axios.post(
            "http://localhost:5000/api/patient/profile",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const updatedProfile = response.data.profile;

        // ✅ Save to localStorage so it's persisted on reload
        localStorage.setItem("patientData", JSON.stringify(updatedProfile));

        setEditablePatientData(updatedProfile);
        setPatientData(updatedProfile);
        setIsEditingProfile(false);
        toast.success("✅ Profile updated successfully");
    } catch (error) {
        console.error("❌ Failed to save:", error);
        const message =
            error.response?.data?.message ||
            error.response?.data?.msg ||
            (error.response?.status === 404
                ? "❌ API not found (404)"
                : error.response?.status === 401
                    ? "🔒 Unauthorized or Token expired"
                    : "❌ Failed to save profile");

        toast.error(message);
    }
}, [editablePatientData, patientData.id, navigate, setEditablePatientData, setPatientData, setIsEditingProfile, t]);



    return (
        <Card
            title={t('profile')}
            themeColors={themeColors}
            className="relative overflow-hidden rounded-[2rem] shadow-2xl p-10
                       bg-white dark:bg-gray-900
                       text-gray-900 dark:text-gray-100
                       transition-colors duration-300 ease-in-out"
        >
            {/* Profile Header */}
            {/* پروفائل ہیڈر */}
            <div className="flex flex-col items-center justify-center mb-10">
                <div className="relative group">
                    <motion.img
                        src={editablePatientData.profilePic || patientData.profilePic}
                        alt={editablePatientData.name || patientData.name}
                        className={`w-36 h-36 rounded-full border-4 border-indigo-500 dark:border-indigo-400 object-cover ${themeColors.shadowClass}`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                    {isEditingProfile && (
                        <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="profilePicUpload"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setEditablePatientData((prev) => ({ ...prev, profilePic: reader.result }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <label
                                htmlFor="profilePicUpload"
                                className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg shadow hover:bg-blue-700 cursor-pointer"
                            >
                                {t('change')}
                            </label>
                            <button
                                className="bg-red-600 text-white text-xs px-3 py-1 rounded-lg shadow hover:bg-red-700"
                                onClick={() => setEditablePatientData((prev) => ({ ...prev, profilePic: '' }))}
                            >
                                {t('remove')}
                            </button>
                        </div>
                    )}
                    {/* Online status indicator */}
                    {/* آن لائن اسٹیٹس انڈیکیٹر */}
                    <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800"></span>
                </div>
                {/* Name and ID text colors adjusted for dark mode */}
                {/* نام اور ID کے متن کے رنگ ڈارک موڈ کے لیے ایڈجسٹ کیے گئے ہیں۔ */}
                <h3 className={`text-3xl font-extrabold mt-4 ${themeColors.textColorClass}`}>{editablePatientData.name || patientData.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">ID: {editablePatientData.id || patientData.id}</p>
            </div>

            {isEditingProfile ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {['name', 'age', 'gender', 'bloodGroup', 'dob', 'height', 'weight'].map((label) => (
                        <div key={label} className="col-span-1">
                            <label className="block text-sm font-bold mb-2 capitalize text-gray-700 dark:text-gray-200">
                                {t(label)}
                            </label>
                            <input
                                type={label === 'dob' ? 'date' : label === 'age' ? 'number' : 'text'}
                                name={label}
                                value={editablePatientData[label] || ''}
                                onChange={handleEditProfileChange}
                                placeholder={t(label)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                                           bg-white dark:bg-gray-800
                                           text-gray-900 dark:text-white
                                           rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                            />
                        </div>
                    ))}

                    {['phone', 'email'].map((label) => (
                        <div key={label} className="col-span-1">
                            <label className="block text-sm font-bold mb-2 capitalize text-gray-700 dark:text-gray-200">
                                {t(label)}
                            </label>
                            <input
                                type={label === 'email' ? 'email' : 'text'}
                                name={label}
                                value={editablePatientData.contact?.[label] || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setEditablePatientData((prev) => ({
                                        ...prev,
                                        contact: {
                                            ...prev.contact,
                                            [label]: value,
                                        },
                                    }));
                                }}
                                placeholder={t(label)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                                           bg-white dark:bg-gray-800
                                           text-gray-900 dark:text-white
                                           rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                            />
                        </div>
                    ))}

                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-200">{t('address')}</label>
                        <textarea
                            name="address"
                            value={editablePatientData.contact?.address || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                setEditablePatientData((prev) => ({
                                    ...prev,
                                    contact: {
                                        ...prev.contact,
                                        address: value,
                                    },
                                }));
                            }}
                            placeholder={t('address')}
                            rows="2"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                                       bg-white dark:bg-gray-800
                                       text-gray-900 dark:text-white
                                       rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                        ></textarea>
                    </div>

                    {['name', 'phone', 'relationship'].map((field) => (
                        <div key={field} className="col-span-1">
                            <label className="block text-sm font-bold mb-2 capitalize text-gray-700 dark:text-gray-200">
                                {`${t('emergencyContact')} ${t(field)}`}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={editablePatientData.emergencyContact?.[field] || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setEditablePatientData((prev) => ({
                                        ...prev,
                                        emergencyContact: {
                                            ...prev.emergencyContact,
                                            [field]: value,
                                        },
                                    }));
                                }}
                                placeholder={t(field)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                                           bg-white dark:bg-gray-800
                                           text-gray-900 dark:text-white
                                           rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                            />
                        </div>
                    ))}

                    {['medicalConditions', 'allergies'].map((field) => (
                        <div key={field} className="md:col-span-2">
                            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-200">{t(field)}</label>
                            <textarea
                                name={field}
                                value={Array.isArray(editablePatientData[field]) ? editablePatientData[field].join(', ') : editablePatientData[field] || ''}
                                onChange={(e) => {
                                    const value = e.target.value.split(',').map((item) => item.trim());
                                    setEditablePatientData((prev) => ({
                                        ...prev,
                                        [field]: value,
                                    }));
                                }}
                                placeholder={t(field)}
                                rows="2"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                                           bg-white dark:bg-gray-800
                                           text-gray-900 dark:text-white
                                           rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                            ></textarea>
                        </div>
                    ))}

                    <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition"
                        >
                            {t('cancelEdit')}
                        </button>
                        <button
                            onClick={handleSaveProfile}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition"
                        >
                            {t('saveChanges')}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-gray-700 dark:text-gray-300">
                    <div>
                        <p><strong>{t('name')}:</strong> <span className="dark:text-gray-200">{patientData.name}</span></p>
                        <p><strong>{t('email')}:</strong> <span className="dark:text-gray-200">{patientData.contact?.email}</span></p>
                        <p><strong>{t('phone')}:</strong> <span className="dark:text-gray-200">{patientData.contact?.phone}</span></p>
                        <p><strong>{t('gender')}:</strong> <span className="dark:text-gray-200">{patientData.gender}</span></p>
                        <p><strong>{t('age')}:</strong> <span className="dark:text-gray-200">{patientData.age}</span></p>
                        <p><strong>{t('dob')}:</strong> <span className="dark:text-gray-200">{patientData.dob}</span></p>
                    </div>
                    <div>
                        <p><strong>{t('bloodType')}:</strong> <span className="dark:text-gray-200">{patientData.bloodGroup}</span></p>
                        <p><strong>{t('height')}:</strong> <span className="dark:text-gray-200">{patientData.height}</span></p>
                        <p><strong>{t('weight')}:</strong> <span className="dark:text-gray-200">{patientData.weight}</span></p>
                        <p><strong>{t('address')}:</strong> <span className="dark:text-gray-200">{patientData.contact?.address}</span></p>
                        <p><strong>{t('medicalConditions')}:</strong> <span className="dark:text-gray-200">{Array.isArray(patientData.medicalConditions) ? patientData.medicalConditions.join(', ') : patientData.medicalConditions || 'N/A'}</span></p>
                        <p><strong>{t('allergies')}:</strong> <span className="dark:text-gray-200">{Array.isArray(patientData.allergies) ? patientData.allergies.join(', ') : patientData.allergies || 'N/A'}</span></p>
                    </div>
                    <div className="md:col-span-2">
                        <p><strong>{t('emergencyContact')} {t('name')}:</strong> <span className="dark:text-gray-200">{patientData.emergencyContact?.name}</span></p>
                        <p><strong>{t('emergencyContact')} {t('phone')}:</strong> <span className="dark:text-gray-200">{patientData.emergencyContact?.phone}</span></p>
                        <p><strong>{t('emergencyContact')} {t('relationship')}:</strong> <span className="dark:text-gray-200">{patientData.emergencyContact?.relationship}</span></p>
                    </div>
                    <button
                        onClick={() => { setIsEditingProfile(true); setEditablePatientData(patientData); }} // Populate editable data
                        className="bg-indigo-600 text-white mt-6 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition col-span-full"
                    >
                        {t('editProfile')}
                    </button>
                </div>
            )}
          
                     
            
            
        </Card>
    );
};

export default PatientProfileEditor;
