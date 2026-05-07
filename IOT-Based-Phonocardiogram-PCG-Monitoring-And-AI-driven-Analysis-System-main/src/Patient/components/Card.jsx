// components/Card.js
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Card Component: A reusable card container with a title and optional header content.
 * کارڈ کمپونینٹ: ایک دوبارہ استعمال کے قابل کارڈ کنٹینر جس میں عنوان اور اختیاری ہیڈر مواد شامل ہے۔
 * @param {object} props - Component props.
 * @param {string} [props.title] - The title of the card.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} [props.className=''] - Additional CSS classes for the card.
 * @param {React.ReactNode} [props.headerContent] - Optional content to display in the card header.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {string} [props.id] - Optional ID for the card, useful for scrolling.
 */
const Card = ({ title, children, className = '', headerContent, themeColors, id }) => (
    <motion.div
        id={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${themeColors.cardBgClass} p-6 rounded-xl ${themeColors.shadowClass} ${themeColors.cardBorderClass} ${className}`}
    >
        <div className="flex justify-between items-center mb-4">
            {title && <h2 className={`text-xl font-semibold ${themeColors.textColorClass}`}>{title}</h2>}
            {headerContent}
        </div>
        {children}
    </motion.div>
);

export default Card;
