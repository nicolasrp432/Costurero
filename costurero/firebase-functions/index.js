const functions = require('firebase-functions');
const axios = require('axios');

// Función para obtener reseñas de Google Places
exports.getGoogleReviews = functions.https.onCall(async (data, context) => {
  try {
    const placeId = 'ChIJN_HNGi9PTg0RnvDP7f4PZyE'; // Tu Place ID
    const apiKey = 'AIzaSyBSvHI9wWQHxJyWPuKirPSG8SWcF4cRy_M'; // Tu API Key
    
    // URL de la API de Google Places con parámetros para español
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=es&key=${apiKey}`;
    
    const response = await axios.get(url);
    
    if (response.data.status === 'OK' && response.data.result.reviews) {
      console.log(`✅ Reseñas obtenidas: ${response.data.result.reviews.length}`);
      return {
        success: true,
        reviews: response.data.result.reviews
      };
    } else {
      console.warn('No se encontraron reseñas:', response.data.status);
      return {
        success: false,
        error: 'No se encontraron reseñas',
        status: response.data.status
      };
    }
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

// Función para obtener detalles del lugar
exports.getPlaceDetails = functions.https.onCall(async (data, context) => {
  try {
    const placeId = 'ChIJN_HNGi9PTg0RnvDP7f4PZyE'; // Tu Place ID
    const apiKey = 'AIzaSyBSvHI9wWQHxJyWPuKirPSG8SWcF4cRy_M'; // Tu API Key
    
    // URL de la API de Google Places con parámetros para español
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_address&language=es&key=${apiKey}`;
    
    const response = await axios.get(url);
    
    if (response.data.status === 'OK' && response.data.result) {
      console.log('✅ Detalles del lugar obtenidos');
      return {
        success: true,
        placeDetails: {
          name: response.data.result.name || 'El Costurero',
          rating: response.data.result.rating || 4.9,
          totalReviews: response.data.result.user_ratings_total || 0,
          address: response.data.result.formatted_address || 'Iparragirre Kalea, 1, 2ª a la izquierda, 48970 Basauri, Bizkaia'
        }
      };
    } else {
      console.warn('No se encontraron detalles del lugar:', response.data.status);
      return {
        success: false,
        error: 'No se encontraron detalles del lugar',
        status: response.data.status
      };
    }
  } catch (error) {
    console.error('Error al obtener detalles del lugar:', error);
    return {
      success: false,
      error: error.message
    };
  }
}); 