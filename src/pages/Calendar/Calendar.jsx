import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getHolidays } from '../../services/holidayService';
import Calendar from '../../components/Calendar/Calendar';
import './Calendar.css';

const CalendarPage = () => {
  const [holidays, setHolidays] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to fetch holidays...');
        const data = await getHolidays(currentYear);
        console.log('Holidays fetched successfully:', data);
        setHolidays(data);
      } catch (err) {
        console.error('Error in Calendar page:', err);
        setError(err.message || 'Error al cargar los días festivos');
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [currentYear]);

  const handleYearChange = (newYear) => {
    setCurrentYear(newYear);
  };

  return (
    <motion.div 
      className="calendar-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando días festivos...</p>
        </div>
      ) : error ? (
        <div className="error">
          <h3>Error al cargar el calendario</h3>
          <p>{error}</p>
          <button 
            onClick={() => setCurrentYear(currentYear)} 
            className="retry-button"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <Calendar 
          holidays={holidays}
          currentYear={currentYear}
          onYearChange={handleYearChange}
        />
      )}
    </motion.div>
  );
};

export default CalendarPage; 