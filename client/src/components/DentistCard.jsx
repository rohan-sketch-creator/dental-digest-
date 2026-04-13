import React from 'react';

const DentistCard = ({ dentist, selected, onClick, compact }) => {
    if (!dentist) return null;

    return (
        <div
            onClick={onClick}
            className={`${compact ? 'p-4' : 'p-6'} rounded-3xl border transition-all duration-300 cursor-pointer group ${
                selected
                    ? 'border-primary-400 bg-primary-50/50 dark:bg-slate-800 shadow-dental ring-2 ring-primary-200'
                    : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 shadow-card hover:shadow-glass-lg hover:-translate-y-1 hover:border-primary-200 dark:hover:border-slate-600'
            }`}
            id={`dentist-${dentist._id}`}
        >
            <div className={`flex ${compact ? 'flex-row items-center gap-4' : 'flex-col items-center text-center'}`}>
                {/* Photo */}
                <div className={`relative ${compact ? '' : 'mb-4'}`}>
                    <img
                        src={dentist.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(dentist.name) + '&background=17b38d&color=fff&size=200'}
                        alt={`Dr. ${dentist.name}`}
                        className={`${compact ? 'w-14 h-14' : 'w-24 h-24'} rounded-2xl object-cover shadow-soft transition-transform duration-300 group-hover:scale-105`}
                    />
                    {selected && (
                        <div className={`absolute ${compact ? '-top-1 -right-1' : '-top-2 -right-2'} w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-md animate-scale-in`}>
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className={compact ? 'flex-1 min-w-0' : ''}>
                    <h3 className={`font-display font-bold text-dental-dark dark:text-white ${compact ? 'text-base' : 'text-lg'}`}>
                        Dr. {dentist.name}
                    </h3>
                    <p className={`text-primary-600 dark:text-primary-400 font-medium ${compact ? 'text-xs' : 'text-sm'} mt-0.5`}>
                        {dentist.specialization}
                    </p>

                    {!compact && (
                        <>
                            {/* Rating */}
                            <div className="flex items-center justify-center gap-1.5 mt-3">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(dentist.rating) ? 'text-amber-400' : 'text-gray-200'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{dentist.rating}</span>
                            </div>

                            {/* Experience */}
                            <p className="text-xs text-gray-400 mt-2">
                                {dentist.experience} years experience
                            </p>

                            {/* Bio preview */}
                            {dentist.bio && (
                                <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-2">
                                    {dentist.bio}
                                </p>
                            )}
                        </>
                    )}

                    {compact && (
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-400">{dentist.experience}yr exp</span>
                            <span className="flex items-center gap-0.5 text-xs">
                                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-semibold text-gray-600 dark:text-gray-300">{dentist.rating}</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DentistCard;
