
import React from 'react';

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mr-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="text-center flex items-center justify-center">
      <CalendarIcon />
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white shadow-sm">
            Imieniny Dnia
        </h1>
        <p className="text-white/80 mt-1 text-base sm:text-lg">Sprawdź kto świętuje</p>
      </div>
    </header>
  );
};

export default Header;
