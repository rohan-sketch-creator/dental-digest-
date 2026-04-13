import React from 'react';

const StepIndicator = ({ steps, currentStep }) => {
    return (
        <div className="w-full max-w-2xl mx-auto mb-10" id="step-indicator">
            <div className="flex items-center justify-between relative">
                {/* Progress line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 mx-10" />
                <div
                    className="absolute top-5 left-0 h-0.5 bg-gradient-primary mx-10 transition-all duration-700 ease-out"
                    style={{ width: `calc(${((currentStep) / (steps.length - 1)) * 100}% - 5rem)` }}
                />

                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center relative z-10">
                            {/* Circle */}
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                                    isCompleted
                                        ? 'bg-primary-500 text-white shadow-dental scale-100'
                                        : isCurrent
                                        ? 'bg-white border-[3px] border-primary-500 text-primary-600 shadow-dental-lg scale-110'
                                        : 'bg-white border-2 border-gray-200 text-gray-400'
                                }`}
                            >
                                {isCompleted ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </div>

                            {/* Label */}
                            <span className={`mt-2 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                                isCompleted || isCurrent ? 'text-primary-600' : 'text-gray-400'
                            }`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
