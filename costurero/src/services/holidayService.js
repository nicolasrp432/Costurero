import axios from 'axios';
import { config } from '../config/appConfig';
import mockHolidays from '../mocks/holidays.json';

// Crear una instancia de axios con la configuración base
const api = axios.create({
  baseURL: config.api.baseURL,
  headers: {
    'X-Api-Key': config.api.apiKey,
    'Content-Type': 'application/json'
  }
});

// Función para simular un delay en las respuestas mock
const mockDelay = (ms = 1) => new Promise(resolve => setTimeout(resolve, ms));

export const getHolidays = async (year) => {
  try {
    console.log('Fetching holidays for year:', year);
    
    if (config.useMockData) {
      console.log('Using mock data');
      // Simular delay de red
      await mockDelay();
      
      // Filtrar los días festivos para el año solicitado
      const currentYearHolidays = mockHolidays.holidays.filter(holiday => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.getFullYear() === year;
      });
      
      console.log('Mock holidays data received:', currentYearHolidays);
      return currentYearHolidays;
    }
    
    // Si no estamos usando mock, hacer la llamada real a la API
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
    
    console.log('API holidays data received:', currentYearHolidays);
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