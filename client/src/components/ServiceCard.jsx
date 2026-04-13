import React from 'react';

const ServiceCard = ({ icon, title, description, price, selected, onClick, index }) => {
    return (
        <div
            onClick={onClick}
            className={`card-interactive sheen p-6 relative overflow-hidden group ${
                selected
                    ? 'border-primary-400 bg-primary-50/50 dark:bg-primary-900/40 shadow-dental ring-2 ring-primary-200 dark:ring-primary-400/50'
                    : ''
            }`}
            style={{ animationDelay: `${(index || 0) * 0.05}s` }}
            id={`service-${title?.toLowerCase().replace(/\s/g, '-')}`}
        >
            {/* Selected indicator */}
            {selected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center animate-scale-in">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110 ${
                selected
                    ? 'bg-primary-100 dark:bg-primary-900/60'
                    : 'bg-gray-50 dark:bg-slate-700/50 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/40'
            }`}>
                {icon}
            </div>

            {/* Content */}
            <h3 className="font-display font-bold text-lg text-dental-dark dark:text-white mb-1.5">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{description}</p>

            {/* Price */}
            {price && (
                <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-400 font-medium">from</span>
                    <span className={`font-display font-bold text-lg ${selected ? 'text-primary-600 dark:text-primary-400' : 'text-dental-dark dark:text-white'}`}>
                        ${price}
                    </span>
                </div>
            )}

            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-100/0 group-hover:from-primary-50/30 group-hover:to-primary-100/20 transition-all duration-500 rounded-3xl pointer-events-none" />
        </div>
    );
};

export default ServiceCard;
