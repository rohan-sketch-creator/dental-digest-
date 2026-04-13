import React, { useState, useEffect } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FULL_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TimeSlotPicker = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime, availableSlots, bookedSlots, dentistAvailableDays, loading }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth, year, month };
    };

    const { firstDay, daysInMonth, year, month } = getDaysInMonth(currentMonth);

    const isAvailableDay = (date) => {
        if (!dentistAvailableDays || dentistAvailableDays.length === 0) return true;
        const dayName = FULL_DAYS[date.getDay()];
        return dentistAvailableDays.includes(dayName);
    };

    const formatDate = (d) => {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const handleDateClick = (day) => {
        const clickedDate = new Date(year, month, day);
        if (clickedDate < today) return;
        if (!isAvailableDay(clickedDate)) return;
        setSelectedDate(formatDate(clickedDate));
        setSelectedTime('');
    };

    const isSelectedDate = (day) => {
        return selectedDate === formatDate(new Date(year, month, day));
    };

    const isToday = (day) => {
        const d = new Date(year, month, day);
        return d.toDateString() === today.toDateString();
    };

    const isPast = (day) => {
        const d = new Date(year, month, day);
        return d < today;
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
    };

    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="space-y-6" id="time-slot-picker">
            {/* Calendar */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={prevMonth}
                        className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                        id="calendar-prev"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h3 className="font-display font-bold text-lg text-dental-dark dark:text-white">{monthName}</h3>
                    <button
                        onClick={nextMonth}
                        className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                        id="calendar-next"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map((d) => (
                        <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase py-2">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for offset */}
                    {[...Array(firstDay)].map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}

                    {/* Day cells */}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const dateObj = new Date(year, month, day);
                        const past = isPast(day);
                        const available = isAvailableDay(dateObj);
                        const sel = isSelectedDate(day);
                        const td = isToday(day);

                        return (
                            <button
                                key={day}
                                onClick={() => handleDateClick(day)}
                                disabled={past || !available}
                                className={`relative w-full aspect-square rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    sel
                                        ? 'bg-primary-500 text-white shadow-dental scale-105'
                                        : past || !available
                                        ? 'text-gray-300 dark:text-slate-600 cursor-not-allowed'
                                        : td
                                        ? 'bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-slate-600'
                                        : 'text-dental-dark dark:text-white hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400'
                                }`}
                            >
                                {day}
                                {td && !sel && (
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
                <div className="animate-slide-up">
                    <h4 className="font-display font-bold text-dental-dark dark:text-white text-lg mb-4">
                        Available Times
                        <span className="text-sm font-normal text-gray-400 ml-2">
                            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                    </h4>

                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                        </div>
                    ) : availableSlots && availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                            {availableSlots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedTime(slot)}
                                    className={`py-3 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                        selectedTime === slot
                                            ? 'bg-primary-500 text-white shadow-dental'
                                            : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-dental-dark dark:text-white hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
                            <span className="text-3xl mb-2 block">😔</span>
                            <p className="text-gray-500 font-medium">No available slots for this date</p>
                            <p className="text-gray-400 text-sm mt-1">Please try another date</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TimeSlotPicker;
