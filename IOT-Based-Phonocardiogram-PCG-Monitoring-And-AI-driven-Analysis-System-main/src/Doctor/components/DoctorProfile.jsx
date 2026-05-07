// DoctorProfile.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion'; // Animations ke liye framer-motion import kiya gaya hai
import Card from './Card'; // Assuming Card component exists
import axios from 'axios'; // Backend requests ke liye axios library
import { toast, Toaster } from 'react-hot-toast'; // Notifications ke liye // FIX: Changed require() to import

/**
 * DoctorProfile Component: Allows the doctor to view and edit their profile information.
 * ڈاکٹر پروفائل کمپونینٹ: ڈاکٹر کو اپنی پروفائل کی معلومات دیکھنے اور ترمیم کرنے کی اجازت دیتا ہے۔
 * @param {object} props - Component props.
 * @param {object} props.themeColors - Theme-specific colors (e.g., { primary: '...', secondary: '...', textColorClass: 'text-gray-900', cardBgClass: 'bg-white', buttonPrimaryClass: 'bg-blue-600 text-white', shadowClass: 'shadow-lg' }).
 * @param {object} props.doctorData - Current doctor profile data.
 * @param {function} props.onProfileUpdate - Callback to update doctor profile data.
 */
const DoctorProfile = ({ themeColors, doctorData, onProfileUpdate }) => {
    const { t } = useTranslation();

    // State variables
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('male');
    const [dob, setDob] = useState('');
    const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
    const [experience, setExperience] = useState([{ title: '', hospital: '', years: '' }]);

    const [isSaving, setIsSaving] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false); // Edit mode ko control karne ke liye state

    useEffect(() => {
        // Jab doctorData prop change ho ya component mount ho, states ko update karein
        // Ye DoctorProfile component ke internal states ko parent ke doctorData prop se sync karega.
        if (doctorData && doctorData.fullName) { // Check if doctorData is not null/undefined and has basic data
            setName(doctorData.fullName || '');
            setSpecialization(doctorData.specialization || '');
            setEmail(doctorData.email || '');
            setProfilePic(doctorData.profilePic || 'https://via.placeholder.com/150');
            setPhone(doctorData.phoneNumber || '');
            setGender(doctorData.gender || 'male'); // FIX: Used doctorData.gender instead of doctor.gender
            setDob(doctorData.dob ? doctorData.dob.split('T')[0] : '');
            setEducation(
                Array.isArray(doctorData.education) && doctorData.education.length > 0
                    ? doctorData.education
                    : [{ degree: '', institution: '', year: '' }]
            );
            setExperience(
                Array.isArray(doctorData.experience) && doctorData.experience.length > 0
                    ? doctorData.experience
                    : [{ title: '', hospital: '', years: '' }]
            );
            // toast.success(t("Doctor profile updated from prop!")); // Debugging toast, can be removed
        }
        // Agar doctorData prop shuru mein nahi hai ya empty hai, to localStorage se load karein
        // Yeh sirf initial mount par ya jab doctorData undefined ho tab chalega.
        else {
            const savedDoctor = localStorage.getItem("doctorData");
            if (savedDoctor) {
                const doctor = JSON.parse(savedDoctor);
                setName(doctor.fullName || '');
                setSpecialization(doctor.specialization || '');
                setEmail(doctor.email || '');
                setProfilePic(doctor.profilePic || 'https://via.placeholder.com/150');
                setPhone(doctor.phoneNumber || '');
                setGender(doctor.gender || 'male');
                setDob(doctor.dob ? doctor.dob.split('T')[0] : '');
                setEducation(
                    Array.isArray(doctor.education) && doctor.education.length > 0
                        ? doctor.education
                        : [{ degree: '', institution: '', year: '' }]
                );
                setExperience(
                    Array.isArray(doctor.experience) && doctor.experience.length > 0
                        ? doctor.experience
                        : [{ title: '', hospital: '', years: '' }]
                );
                // toast.success(t("Doctor profile loaded from localStorage!")); // Debugging toast, can be removed
            } else {
                toast.error(t("No doctor data found in localStorage or via prop."));
            }
        }

        // Backend se profile fetch karne ka logic
        // Yeh hissa tab chalega jab component mount ho ya doctorData change ho.
        // Agar parent component hi data fetch kar raha hai aur prop ke through de raha hai,
        // to is fetch ko sirf initial load ke liye conditionize kar sakte hain.
        const token = localStorage.getItem("token");
        const fetchDoctorProfile = async () => {
            if (!token) return;
            try {
                const res = await axios.get("/api/doctors/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const fetchedDoctor = res.data.doctor;
                if (fetchedDoctor) {
                    // Agar fetched data current prop data se mukhtalif hai, to update karein.
                    // Ye check important hai infinite loop se bachne ke liye agar doctorData prop
                    // bhi isi useEffect se update ho raha ho.
                    if (JSON.stringify(fetchedDoctor) !== JSON.stringify(doctorData)) {
                        localStorage.setItem("doctorData", JSON.stringify(fetchedDoctor));
                        // Ye states update karega aur useEffect ko dobara trigger karega agar doctorData prop change ho.
                        // Agar parent component doctorData ko manage kar raha hai, to onProfileUpdate call karein.
                        if (onProfileUpdate) {
                            onProfileUpdate(fetchedDoctor);
                        } else {
                            // Fallback: Agar onProfileUpdate nahi hai, to direct states update karein.
                            setName(fetchedDoctor.fullName || '');
                            setSpecialization(fetchedDoctor.specialization || '');
                            setEmail(fetchedDoctor.email || '');
                            setProfilePic(fetchedDoctor.profilePic || 'https://via.placeholder.com/150');
                            setPhone(fetchedDoctor.phoneNumber || '');
                            setGender(fetchedDoctor.gender || 'male');
                            setDob(fetchedDoctor.dob ? fetchedDoctor.dob.split('T')[0] : '');
                            setEducation(
                                Array.isArray(fetchedDoctor.education) && fetchedDoctor.education.length > 0
                                    ? fetchedDoctor.education
                                    : [{ degree: '', institution: '', year: '' }]
                            );
                            setExperience(
                                Array.isArray(fetchedDoctor.experience) && fetchedDoctor.experience.length > 0
                                    ? fetchedDoctor.experience
                                    : [{ title: '', hospital: '', years: '' }]
                            );
                        }
                        // toast.success(t("Doctor profile loaded from backend!")); // Debugging toast, can be removed
                    }
                }
            } catch (err) {
                console.error("❌ Doctor profile fetch failed:", err);
            }
        };

        // Fetch API data only if doctorData prop is not yet populated or if it's explicitly needed to re-fetch.
        // Agar doctorData prop shuru mein null/undefined hai, ya agar hum chahte hain ke har baar latest data fetch ho.
        // Ek simple check: agar name empty hai to fetch karein (initial load ya data clear hone par).
        // Avoid fetching if doctorData is already fully populated to prevent unnecessary API calls
        if (!doctorData || !doctorData.fullName || (doctorData.fullName === '' && doctorData.email === '')) {
             fetchDoctorProfile();
        }


    }, [doctorData, t, onProfileUpdate]); // doctorData aur onProfileUpdate ko dependency array mein add kiya hai


    // Profile save karne ke liye function
    const handleSave = async (e) => {
        e.preventDefault(); // Default form submission ko roken
        setIsSaving(true); // Saving state set karna

        const token = localStorage.getItem('token');
        const doctorId = doctorData?._id || localStorage.getItem('doctorId'); // Doctor ID retrieve karna

        if (!doctorId || !token) {
            toast.error(t('Authentication details missing. Please log in again.'));
            setIsSaving(false);
            return;
        }

        try {
            // Payload object banana backend ko bhejne ke liye
            const payload = {
                name,
                specialization,
                profilePic,
                phone,
                gender,
                dob,
                education: education.filter(e => e.degree || e.institution || e.year), // Empty entries filter karna
                experience: experience.filter(e => e.title || e.hospital || e.years), // Empty entries filter karna
            };

            // Agar email change hua hai to payload mein shamil karna
            if (email !== doctorData?.email) {
                payload.email = email;
            }

            // Backend API call profile update karne ke liye (PUT request)
            const res = await axios.put(
                `/api/doctors/profile`, // API endpoint
                payload, // Data jo bhejna hai
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Authentication token
                        'Content-Type': 'application/json' // Content type
                    }
                }
            );

            // Successful save ke baad LocalStorage update karna
            localStorage.setItem("doctorData", JSON.stringify(res.data.doctor));

            // Parent component ko update karna (agar onProfileUpdate prop diya gaya ho)
            if (onProfileUpdate) onProfileUpdate(res.data.doctor);
            toast.success(t('Profile saved successfully!')); // Success notification
            setIsEditingProfile(false); // Edit mode se bahar nikalna
        } catch (error) {
            console.error("Profile update failed:", error);
            // Error handling aur notification
            const errorMessage = error.response?.data?.message || t('Failed to save profile. Please try again.');
            toast.error(errorMessage);
        } finally {
            setIsSaving(false); // Saving state reset karna
        }
    };

    const handleCancelEdit = useCallback(() => {
        // Changes ko revert karna aur edit mode se bahar nikalna
        const savedDoctor = localStorage.getItem("doctorData");
        if (savedDoctor) {
            const doctor = JSON.parse(savedDoctor);
            setName(doctor.fullName || '');
            setSpecialization(doctor.specialization || '');
            setEmail(doctor.email || '');
            setProfilePic(doctor.profilePic || 'https://via.placeholder.com/150');
            setPhone(doctor.phoneNumber || '');
            setGender(doctor.gender || 'male');
            setDob(doctor.dob ? doctor.dob.split('T')[0] : '');
            setEducation(
                Array.isArray(doctor.education) && doctor.education.length > 0
                    ? doctor.education
                    : [{ degree: '', institution: '', year: '' }]
            );
            setExperience(
                Array.isArray(doctor.experience) && doctor.experience.length > 0
                    ? doctor.experience
                    : [{ title: '', hospital: '', years: '' }]
            );
        }
        setIsEditingProfile(false);
    }, []);


    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleListChange = (setter, index, field, value) => {
        setter(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const addListItem = (setter) => {
        setter(prev => [...prev, {}]);
    };

    const removeListItem = (setter, index) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    // PatientProfileEditor ke mutabiq Tailwind CSS Classes
    const inputClasses = `w-full px-4 py-3 border border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-800
                          text-gray-900 dark:text-white
                          rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200`;
    const labelClasses = `block text-sm font-bold mb-2 capitalize text-gray-700 dark:text-gray-200`;
    const subSectionTitleClasses = `text-xl font-bold ${themeColors.textColorClass} mb-4 border-b-2 pb-2 border-${themeColors.primary || 'blue'}-300/50`;

    const eduExpEntryClasses = `grid grid-cols-1 md:grid-cols-3 gap-4 items-end p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg`;

    const buttonPrimaryClasses = `bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition`;
    const buttonSecondaryClasses = `bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition`;
    const removeButtonClasses = `p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors transform hover:scale-110`;

    // Main section box classes (PatientProfileEditor ke Card styling se milte julte)
    const mainSectionBoxClasses = `space-y-6 p-8 rounded-2xl ${themeColors.shadowClass} border border-gray-200 dark:border-gray-700 animate-fadeIn ${themeColors.cardBgClass}`;


    return (
        <Card
            title={t('Doctor Profile Management')}
            themeColors={themeColors}
            className={`relative overflow-hidden rounded-[2rem] shadow-2xl p-10
                        bg-white dark:bg-gray-900
                        text-gray-900 dark:text-gray-100
                        transition-colors duration-300 ease-in-out`}
        >
            <Toaster position="top-center" reverseOrder={false} />
            {/* Profile Header */}
            <div className="flex flex-col items-center justify-center mb-10">
                <div className="relative group">
                    <motion.img
                        src={profilePic}
                        alt={name || t('Doctor Name')}
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
                                onChange={handleProfilePicChange}
                            />
                            <label
                                htmlFor="profilePicUpload"
                                className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg shadow hover:bg-blue-700 cursor-pointer"
                            >
                                {t('change')}
                            </label>
                            <button
                                className="bg-red-600 text-white text-xs px-3 py-1 rounded-lg shadow hover:bg-red-700"
                                onClick={() => setProfilePic('')}
                            >
                                {t('remove')}
                            </button>
                        </div>
                    )}
                    <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800"></span>
                </div>
                <h3 className={`text-3xl font-extrabold mt-4 ${themeColors.textColorClass}`}>{name || t('Your Name')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{specialization || t('Your Specialty')}</p>
            </div>

            {isEditingProfile ? (
                <form onSubmit={handleSave} className="space-y-8">
                    {/* Personal Information Section */}
                    <div className={mainSectionBoxClasses}>
                        <h3 className={subSectionTitleClasses}>{t('Personal Information')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                            <div>
                                <label htmlFor="name" className={labelClasses}>
                                    {t('Full Name')}
                                </label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} placeholder={t('e.g., MBBS, MD')} required />
                            </div>
                            <div>
                                <label htmlFor="specialization" className={labelClasses}>
                                    {t('Specialization')}
                                </label>
                                <input type="text" id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className={inputClasses} placeholder={t('e.g., Cardiology, Pediatrics')} required />
                            </div>
                            <div>
                                <label htmlFor="email" className={labelClasses}>
                                    {t('Email Address')}
                                </label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} placeholder={t('your.email@example.com')} required />
                            </div>
                            <div>
                                <label htmlFor="phone" className={labelClasses}>
                                    {t('Phone Number')}
                                </label>
                                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} placeholder={t('e.g., +123 456 7890')} />
                            </div>
                            <div>
                                <label htmlFor="gender" className={labelClasses}>
                                    {t('Gender')}
                                </label>
                                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={inputClasses}>
                                    <option value="male">{t('Male')}</option>
                                    <option value="female">{t('Female')}</option>
                                    <option value="other">{t('Other')}</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="dob" className={labelClasses}>
                                    {t('Date of Birth')}
                                </label>
                                <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className={inputClasses} />
                            </div>
                        </div>
                    </div>

                    {/* Education and Experience Section */}
                    <div className={mainSectionBoxClasses}>
                        {/* Education Sub-section */}
                        <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className={subSectionTitleClasses}>{t('Education')}</h3>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className={`${eduExpEntryClasses} ${themeColors.cardBgClass === 'bg-white' ? 'bg-blue-50/70' : 'bg-blue-900/40'}`}>
                                        <div>
                                            <label htmlFor={`edu-degree-${index}`} className={labelClasses}>{t('Degree')}</label>
                                            <input
                                                type="text"
                                                id={`edu-degree-${index}`}
                                                value={edu.degree || ''}
                                                onChange={(e) => handleListChange(setEducation, index, 'degree', e.target.value)}
                                                className={inputClasses}
                                                placeholder={t('e.g., MBBS, MD')}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`edu-institution-${index}`} className={labelClasses}>{t('Institution')}</label>
                                            <input
                                                type="text"
                                                id={`edu-institution-${index}`}
                                                value={edu.institution || ''}
                                                onChange={(e) => handleListChange(setEducation, index, 'institution', e.target.value)}
                                                className={inputClasses}
                                                placeholder={t('e.g., University of Health Sciences')}
                                            />
                                        </div>
                                        <div className="flex items-end space-x-3">
                                            <div className="flex-grow">
                                                <label htmlFor={`edu-year-${index}`} className={labelClasses}>{t('Year')}</label>
                                                <input
                                                    type="text"
                                                    id={`edu-year-${index}`}
                                                    value={edu.year || ''}
                                                    onChange={(e) => handleListChange(setEducation, index, 'year', e.target.value)}
                                                    className={inputClasses}
                                                    placeholder={t('e.g., 2010')}
                                                />
                                            </div>
                                            {education.length > 1 && (
                                                <button type="button" onClick={() => removeListItem(setEducation, index)} className={removeButtonClasses}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addListItem(setEducation)} className={buttonPrimaryClasses}>
                                    {t('Add Education')}
                                </button>
                            </div>
                        </div>

                        {/* Experience Sub-section */}
                        <div>
                            <h3 className={subSectionTitleClasses}>{t('Experience')}</h3>
                            <div className="space-y-4">
                                {experience.map((exp, index) => (
                                    <div key={index} className={`${eduExpEntryClasses} ${themeColors.cardBgClass === 'bg-white' ? 'bg-green-50/70' : 'bg-green-900/40'}`}>
                                        <div>
                                            <label htmlFor={`exp-title-${index}`} className={labelClasses}>{t('Title')}</label>
                                            <input
                                                type="text"
                                                id={`exp-title-${index}`}
                                                value={exp.title || ''}
                                                onChange={(e) => handleListChange(setExperience, index, 'title', e.target.value)}
                                                className={inputClasses}
                                                placeholder={t('e.g., Senior Resident, Consultant')}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`exp-hospital-${index}`} className={labelClasses}>{t('Hospital/Clinic')}</label>
                                            <input
                                                type="text"
                                                id={`exp-hospital-${index}`}
                                                value={exp.hospital || ''}
                                                onChange={(e) => handleListChange(setExperience, index, 'hospital', e.target.value)}
                                                className={inputClasses}
                                                placeholder={t('e.g., City General Hospital')}
                                            />
                                        </div>
                                        <div className="flex items-end space-x-3">
                                            <div className="flex-grow">
                                                <label htmlFor={`exp-years-${index}`} className={labelClasses}>{t('Years')}</label>
                                                <input
                                                    type="text"
                                                    id={`exp-years-${index}`}
                                                    value={exp.years || ''}
                                                    onChange={(e) => handleListChange(setExperience, index, 'years', e.target.value)}
                                                    className={inputClasses}
                                                    placeholder={t('e.g., 5 years')}
                                                />
                                            </div>
                                            {experience.length > 1 && (
                                                <button type="button" onClick={() => removeListItem(setExperience, index)} className={removeButtonClasses}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addListItem(setExperience)} className={buttonPrimaryClasses}>
                                    {t('Add Experience')}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center space-x-6 pt-4">
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className={buttonSecondaryClasses}
                        >
                            {t('cancelEdit')}
                        </button>
                        <button
                            type="submit" // Corrected type to submit
                            className={`${buttonPrimaryClasses} ${isSaving ? 'opacity-70 cursor-not-allowed animate-pulse' : ''}`}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('Saving...')}
                                </span>
                            ) : (
                                t('Save Profile')
                            )}
                        </button>
                    </div>
                </form>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    {/* Personal Information Display */}
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
                        <h4 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 border-b pb-2 border-indigo-300/50">{t('Personal Information')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10">
                            <p><strong>{t('Full Name')}:</strong> <span className="text-lg dark:text-gray-200">{name || <span className="text-gray-500 italic">{t('N/A')}</span>}</span></p>
                            <p><strong>{t('Specialization')}:</strong> <span className="text-lg dark:text-gray-200">{specialization || <span className="text-gray-500 italic">{t('N/A')}</span>}</span></p>
                            <p><strong>{t('Email Address')}:</strong> <span className="text-lg dark:text-gray-200">{email || <span className="text-gray-500 italic">{t('N/A')}</span>}</span></p>
                            <p><strong>{t('Phone Number')}:</strong> <span className="text-lg dark:text-gray-200">{phone || <span className="text-gray-500 italic">{t('N/A')}</span>}</span></p>
                            <p><strong>{t('Gender')}:</strong> <span className="text-lg dark:text-gray-200">{gender || <span className="text-gray-500 italic">{t('N/A')}</span>}</span></p>
                            <p><strong>{t('Date of Birth')}:</strong> <span className="text-lg dark:text-gray-200">{dob || <span className="text-gray-500 italic">{t('N/A')}</span>}</span></p>
                        </div>
                    </div>
                    {/* Education Display */}
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
                        <h4 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 border-b pb-2 border-indigo-300/50">{t('Education')}</h4>
                        <div className="space-y-3">
                            {education.length > 0 && education[0].degree ? (
                                education.map((edu, index) => (
                                    <div key={index} className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-900/40 shadow-sm">
                                        <p><strong className="text-gray-800 dark:text-gray-200">{t('Degree')}:</strong> <span className="text-lg dark:text-gray-200">{edu.degree}</span></p>
                                        <p><strong className="text-gray-800 dark:text-gray-200">{t('Institution')}:</strong> <span className="text-lg dark:text-gray-200">{edu.institution}</span></p>
                                        <p><strong className="text-gray-800 dark:text-gray-200">{t('Year')}:</strong> <span className="text-lg dark:text-gray-200">{edu.year}</span></p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-lg text-gray-500 italic">{t('N/A')}</p>
                            )}
                        </div>
                    </div>

                    {/* Experience Display */}
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
                        <h4 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 border-b pb-2 border-indigo-300/50">{t('Experience')}</h4>
                        <div className="space-y-3">
                            {experience.length > 0 && experience[0].title ? (
                                experience.map((exp, index) => (
                                    <div key={index} className="p-3 rounded-lg bg-green-50/70 dark:bg-green-900/40 shadow-sm">
                                        <p><strong className="text-gray-800 dark:text-gray-200">{t('Title')}:</strong> <span className="text-lg dark:text-gray-200">{exp.title}</span></p>
                                        <p><strong className="text-gray-800 dark:text-gray-200">{t('Hospital/Clinic')}:</strong> <span className="text-lg dark:text-gray-200">{exp.hospital}</span></p>
                                        <p><strong className="text-gray-800 dark:text-gray-200">{t('Years')}:</strong> <span className="text-lg dark:text-gray-200">{exp.years}</span></p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-lg text-gray-500 italic">{t('N/A')}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditingProfile(true)}
                        className={`${buttonPrimaryClasses} w-full mt-6 flex items-center justify-center`} // Added flex, items-center, justify-center
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil mr-2">
                            <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                        </svg>
                        {t('editProfile')}
                    </button>
                </motion.div>
            )}
        </Card>
    );
};

export default DoctorProfile;
