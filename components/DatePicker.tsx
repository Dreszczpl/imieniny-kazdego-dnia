import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(selectedDate);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    // When selectedDate changes from outside, update the calendar view
    setViewDate(selectedDate);
  }, [selectedDate]);

  const daysOfWeek = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];

  const generateCalendarDays = (date: Date) => {
    const days = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Day of the week (0=Sun, 1=Mon, ..., 6=Sat). We want Monday to be the start.
    let startDayOfWeek = firstDayOfMonth.getDay();
    if (startDayOfWeek === 0) startDayOfWeek = 7; // Adjust Sunday to be 7

    // Days from previous month
    for (let i = 1; i < startDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, 1 - (startDayOfWeek - i));
      days.push({ day: prevMonthDay, isCurrentMonth: false });
    }

    // Days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentDay = new Date(year, month, i);
      days.push({ day: currentDay, isCurrentMonth: true });
    }
    
    // Days from next month to fill the grid
    const remainingSlots = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingSlots; i++) {
        const nextMonthDay = new Date(year, month + 1, i);
        days.push({day: nextMonthDay, isCurrentMonth: false});
    }

    return days;
  };

  const calendarDays = generateCalendarDays(viewDate);
  
  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };
  
  const handleDateSelect = (date: Date) => {
    onDateChange(date);
    setIsOpen(false);
  };
  
  const navigateMonth = (offset: number) => {
      setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  }

  const formattedSelectedDate = selectedDate.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="relative flex flex-col items-center" ref={datePickerRef}>
      <label className="text-lg font-medium text-white/90 mb-2">
        Wybierz datę
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="bg-white/30 text-white placeholder-white/70 border-2 border-transparent focus:border-white focus:ring-0 rounded-lg px-4 py-2 w-full max-w-xs text-center text-lg transition-all duration-300 ease-in-out shadow-md flex items-center justify-center"
      >
        <CalendarIcon />
        {formattedSelectedDate}
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full max-w-xs bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-4 z-10 border border-white/30">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigateMonth(-1)} className="p-2 rounded-full hover:bg-white/20 transition-colors">&lt;</button>
                <span className="font-bold text-lg capitalize">{viewDate.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric'})}</span>
                <button onClick={() => navigateMonth(1)} className="p-2 rounded-full hover:bg-white/20 transition-colors">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-white/80 mb-2">
                {daysOfWeek.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map(({day, isCurrentMonth}, index) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, new Date());
                    
                    let dayClasses = "w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer ";
                    if (!isCurrentMonth) dayClasses += "text-white/40";
                    else if (isSelected) dayClasses += "bg-purple-600 text-white font-bold";
                    else if (isToday) dayClasses += "ring-2 ring-yellow-300";
                    
                    if(isCurrentMonth && !isSelected) dayClasses += " hover:bg-white/30";


                    return (
                        <button key={index} onClick={() => handleDateSelect(day)} className={dayClasses}>
                            {day.getDate()}
                        </button>
                    )
                })}
            </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
