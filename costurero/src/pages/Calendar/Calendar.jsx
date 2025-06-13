import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getHolidays } from '../../services/holidayService';
import './Calendar.css';

const Calendar = () => {
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
        console.error('Error in Calendar component:', err);
        setError(err.message || 'Error al cargar los días festivos');
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [currentYear]);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    return months.map((month, monthIndex) => {
      const daysInMonth = getDaysInMonth(currentYear, monthIndex);
      const firstDay = getFirstDayOfMonth(currentYear, monthIndex);
      const monthHolidays = holidays.filter(holiday => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.getMonth() === monthIndex;
      });

      return (
        <div key={month} className="calendar-month">
          <h3>{month}</h3>
          <div className="calendar-grid">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`} className="calendar-day empty"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isHoliday = monthHolidays.some(holiday => 
                new Date(holiday.date).getDate() === day
              );
              const holiday = monthHolidays.find(holiday => 
                new Date(holiday.date).getDate() === day
              );

              return (
                <div 
                  key={day} 
                  className={`calendar-day ${isHoliday ? 'holiday' : ''}`}
                >
                  {day}
                  {isHoliday && (
                    <div className="holiday-name">{holiday.name}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <motion.div 
      className="calendar-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="calendar-container">
        <div className="calendar-header">
          <h2>Calendario de Días Festivos {currentYear}</h2>
          <div className="year-navigation">
            <button onClick={() => setCurrentYear(prev => prev - 1)}>
              Año Anterior
            </button>
            <button onClick={() => setCurrentYear(prev => prev + 1)}>
              Siguiente Año
            </button>
          </div>
        </div>

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
          <div className="calendar-grid-container">
            {renderCalendar()}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Calendar; 