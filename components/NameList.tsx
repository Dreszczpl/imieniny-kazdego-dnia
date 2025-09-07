
import React from 'react';

interface NameListProps {
  names: string[];
  date: Date;
}

const NameList: React.FC<NameListProps> = ({ names, date }) => {
  const formattedDate = date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="mt-8 text-center">
      <h2 className="text-2xl font-semibold text-white">
        Imieniny <span className="font-bold text-yellow-300">{formattedDate}</span> obchodzą:
      </h2>
      <div className="mt-4 min-h-[100px] bg-white/10 rounded-lg p-4">
        {names.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {names.map((name, index) => (
              <li
                key={index}
                className="bg-purple-600/50 text-white font-medium py-2 px-4 rounded-full text-lg shadow-sm transition-transform hover:scale-105"
              >
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/80 text-lg flex items-center justify-center h-full pt-4">
            Brak solenizantów w tym dniu.
          </p>
        )}
      </div>
    </div>
  );
};

export default NameList;
