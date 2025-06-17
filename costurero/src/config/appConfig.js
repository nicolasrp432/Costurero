// Configuración de la aplicación
export const config = {
  // Cambiar a false para usar la API real
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  
  // Configuración de la API
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.api-ninjas.com/v1',
    apiKey: import.meta.env.VITE_API_KEY
  }
}; 