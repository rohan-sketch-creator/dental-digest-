import React from 'react';

const GlowingCard = ({ value, label, icon }) => {
    return (
        <div className="glow-outer">
            <div className="glow-dot" />
            <div className="glow-card text-center py-8 px-6">
                <div className="glow-ray" />
                {icon && <span className="text-3xl mb-3 block">{icon}</span>}
                <div className="font-display text-4xl font-extrabold text-primary-500 mb-1">{value}</div>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</div>
                <div className="glow-line topl" />
                <div className="glow-line leftl" />
                <div className="glow-line bottoml" />
                <div className="glow-line rightl" />
            </div>
        </div>
    );
};

export default GlowingCard;
