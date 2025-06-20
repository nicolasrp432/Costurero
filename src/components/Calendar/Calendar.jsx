import React from 'react';
import { motion } from 'framer-motion';
import './Calendar.css';

const Calendar = ({ holidays, currentYear, onYearChange }) => {
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
        <motion.div 
          key={month} 
          className="calendar-month"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: monthIndex * 0.1 }}
        >
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
                <motion.div 
                  key={day} 
                  className={`calendar-day ${isHoliday ? 'holiday' : ''}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {day}
                  {isHoliday && (
                    <div className="holiday-name">{holiday.name}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      );
    });
  };

  return (
    <div className="calendar-component">
      <div className="calendar-header">
        <h2>Calendario de Días Festivos {currentYear}</h2>
        <div className="year-navigation">
          <button onClick={() => onYearChange(currentYear - 1)}>
            Año Anterior
          </button>
          <button onClick={() => onYearChange(currentYear + 1)}>
            Siguiente Año
          </button>
        </div>
      </div>
      <div className="calendar-grid-container">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar; 