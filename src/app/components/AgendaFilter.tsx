'use client';

import { useState, useEffect } from 'react';

export default function AgendaFilter({ dates, onFilterChange }) {
  const [selectedDate, setSelectedDate] = useState('all');

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    onFilterChange(date);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="date-filter" className="text-sm font-medium">Filtrer par date:</label>
      <select 
        id="date-filter" 
        className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pmu-green"
        value={selectedDate}
        onChange={handleDateChange}
      >
        <option value="all">Toutes les dates</option>
        {dates.map(date => (
          <option key={date} value={date}>
            {new Date(date).toLocaleDateString('fr-FR')}
          </option>
        ))}
      </select>
    </div>
  );
}
