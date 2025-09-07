
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import DatePicker from './components/DatePicker';
import NameList from './components/NameList';
import { nameDays } from './data/nameDays';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const namesForDay = useMemo(() => {
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const key = `${month}-${day}`;
    return nameDays[key] || [];
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="mt-8 bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-8 border border-white/30">
          <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
          <NameList names={namesForDay} date={selectedDate} />
        </main>
      </div>
    </div>
  );
};

export default App;
