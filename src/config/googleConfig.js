// Google Maps and Places API Configuration
export const googleConfig = {
  // API key de Google Maps
  MAPS_API_KEY: 'AIzaSyBSvHI9wWQHxJyWPuKirPSG8SWcF4cRy_M',
  
  // API key de Google Places (opcional, para reseñas dinámicas)
  PLACES_API_KEY: 'AIzaSyBSvHI9wWQHxJyWPuKirPSG8SWcF4cRy_M',
  
  // ID de tu negocio en Google My Business
  PLACE_ID: 'ChIJN_HNGi9PTg0RnvDP7f4PZyE',
  
  // Ubicación exacta de El Costurero en Basauri
  DEFAULT_LOCATION: {
    lat: 43.23526,
    lng: -2.89089,
    address: "Iparragirre Kalea, 1, 2º izquierda, 48970 Basauri, Bizkaia"
  },
  
  // Configuración del mapa
  MAP_CONFIG: {
    zoom: 16,
    mapId: 'cde37e1afc807cb6f8745a1e',
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#c9c9c9' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#dadada' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#e9e9e9' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#f2f2f2' }]
      }
    ]
  }
};

// Función para obtener la URL de la API de Google Maps
export const getGoogleMapsUrl = () => {
  return `https://maps.googleapis.com/maps/api/js?key=${googleConfig.MAPS_API_KEY}&libraries=places`;
};

// Función para obtener reseñas de Google (requiere API key válida)
export const fetchGoogleReviews = async () => {
  try {
    // Por ahora, siempre retornamos las reseñas por defecto
    // En el futuro, puedes implementar la llamada real a la API
    console.log('Cargando reseñas por defecto...');
    return getDefaultReviews();
  } catch (error) {
    console.warn('No se pudieron obtener las reseñas de Google:', error);
    return getDefaultReviews();
  }
};

// Reseñas por defecto (se usan si no hay API key o hay error)
export const getDefaultReviews = () => {
  return [
    {
      id: 1,
      author: 'María González',
      rating: 5,
      date: '2024-01-15',
      content: 'Excelente servicio de costura. Muy profesional y puntual. Recomendado 100%.',
      profileImage: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=M',
      verified: true
    },
    {
      id: 2,
      author: 'Carlos López',
      rating: 5,
      date: '2024-01-10',
      content: 'Arreglaron mi traje perfectamente. Muy buena calidad y precio justo.',
      profileImage: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=C',
      verified: true
    },
    {
      id: 3,
      author: 'Ana Rodríguez',
      rating: 5,
      date: '2024-01-08',
      content: 'Las clases de costura son fantásticas. Aprendí muchísimo en poco tiempo.',
      profileImage: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=A',
      verified: true
    },
    {
      id: 4,
      author: 'Luis Fernández',
      rating: 5,
      date: '2024-01-05',
      content: 'Servicio excepcional. Muy detallistas y profesionales en su trabajo.',
      profileImage: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=L',
      verified: true
    },
    {
      id: 5,
      author: 'Carmen Ruiz',
      rating: 5,
      date: '2024-01-03',
      content: 'Perfecto trabajo en mi vestido de novia. Superó todas mis expectativas.',
      profileImage: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=C',
      verified: true
    }
  ];
}; 