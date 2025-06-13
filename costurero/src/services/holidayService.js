import axios from 'axios';

const API_KEY = 'JCO3fseEUIJvG+sbbKqQvg==Q8Bjr5jzJVoqPk9x'; // Necesitarás obtener una API key de api-ninjas.com

// Crear una instancia de axios con la configuración base
const api = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

export const getHolidays = async (year) => {
  try {
    console.log('Fetching holidays for year:', year);
    
    const response = await api.get('/holidays', {
      params: {
        country: 'ES'
      }
    });
    
    // Filtrar los días festivos para el año actual
    const currentYearHolidays = response.data.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.getFullYear() === year;
    });
    
    console.log('Holidays data received:', currentYearHolidays);
    return currentYearHolidays;
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    throw new Error(
      error.response?.data?.error || 
      error.message || 
      'Error al obtener los días festivos'
    );
  }
}; 