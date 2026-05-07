// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, observeAuthState } from '../firebase'; // Apni firebase.js file se auth aur observeAuthState import karein

// AuthContext ko create karein
const AuthContext = createContext();

// AuthProvider component: Poori application ko wrap karega
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // Current logged-in user object ya null
    const [loading, setLoading] = useState(true);         // Loading state jab tak Firebase auth check na kare

    useEffect(() => {
        // Firebase ke authentication state changes ko listen karein
        const unsubscribe = observeAuthState(auth, user => {
            setCurrentUser(user); // User data set karein (agar logged in hai) ya null (agar logged out hai)
            setLoading(false);    // Loading khatam ho gayi
        });
        // Component unmount hone par listener ko cleanup karein
        return unsubscribe;
    }, []); // Yeh effect sirf ek baar run hoga component mount hone par

    // Context value jo children components ko milegi
    const value = { currentUser, loading };

    return (
        <AuthContext.Provider value={value}>
            {/* Jab tak loading na ho (yani Firebase user status check kar chuka ho), tab tak children render karein */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook banayein AuthContext ko asani se use karne ke liye
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};