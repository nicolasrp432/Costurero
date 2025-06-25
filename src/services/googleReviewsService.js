import { getGoogleReviews, getPlaceDetails } from '../config/firebaseConfig';
import { getDefaultReviews } from '../config/googleConfig';

// Función para obtener reseñas reales de Google Places
export const fetchRealGoogleReviews = async () => {
  const cacheKey = 'googleReviewsCache';
  const cacheExpiry = 1000 * 60 * 60; // 1 hora
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheExpiry) {
      console.log('✅ Reseñas reales obtenidas de caché');
      return data;
    }
  }
  try {
    console.log('Intentando obtener reseñas reales de Google...');
    const result = await getGoogleReviews();
    const data = result.data;
    if (data.success && data.reviews) {
      localStorage.setItem(cacheKey, JSON.stringify({ data: data.reviews, timestamp: Date.now() }));
      console.log('✅ Reseñas reales obtenidas:', data.reviews.length);
      return data.reviews;
    } else {
      console.warn('⚠️ No se pudieron obtener reseñas reales, usando por defecto');
      return getDefaultReviews();
    }
  } catch (error) {
    console.error('❌ Error al obtener reseñas reales:', error);
    console.log('🔄 Usando reseñas por defecto...');
    return getDefaultReviews();
  }
};

// Función para obtener detalles del lugar (rating, número de reseñas, etc.)
export const fetchPlaceDetails = async () => {
  const cacheKey = 'googlePlaceDetailsCache';
  const cacheExpiry = 1000 * 60 * 60; // 1 hora
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheExpiry) {
      console.log('✅ Detalles del lugar obtenidos de caché');
      return data;
    }
  }
  try {
    console.log('Obteniendo detalles del lugar...');
    const result = await getPlaceDetails();
    const data = result.data;
    if (data.success && data.placeDetails) {
      localStorage.setItem(cacheKey, JSON.stringify({ data: data.placeDetails, timestamp: Date.now() }));
      console.log('✅ Detalles del lugar obtenidos:', data.placeDetails);
      return data.placeDetails;
    } else {
      console.warn('⚠️ No se pudieron obtener detalles del lugar');
      return {
        rating: 4.9,
        totalReviews: 7,
        placeName: 'El Costurero',
        address: 'Iparragirre Kalea, 1, 2ª a la izquierda, 48970 Basauri, Bizkaia'
      };
    }
  } catch (error) {
    console.error('❌ Error al obtener detalles del lugar:', error);
    return {
      rating: 4.9,
      totalReviews: 7,
      placeName: 'El Costurero',
      address: 'Iparragirre Kalea, 1, 2ª a la izquierda, 48970 Basauri, Bizkaia'
    };
  }
};

// Función para formatear reseñas de Google Places
export const formatGoogleReview = (googleReview) => {
  return {
    id: googleReview.time || Date.now(),
    author: googleReview.author_name || 'Cliente',
    rating: googleReview.rating || 5,
    date: googleReview.time ? new Date(googleReview.time * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    content: googleReview.text || 'Excelente servicio',
    profileImage: googleReview.profile_photo_url || `https://via.placeholder.com/40x40/FFD700/FFFFFF?text=${(googleReview.author_name || 'C')[0]}`,
    verified: true,
    language: googleReview.language || 'es'
  };
}; 