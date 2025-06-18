import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { googleConfig, getGoogleMapsUrl, fetchGoogleReviews } from '../../config/googleConfig';
import './GoogleMap.css';

const GoogleMap = () => {
  const mapRef = useRef(null);
  const reviewsRef = useRef(null);
  const [googleReviews, setGoogleReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Cargar reseñas de Google
    const loadReviews = async () => {
      try {
        const reviews = await fetchGoogleReviews();
        setGoogleReviews(reviews);
      } catch (error) {
        console.warn('Error al cargar reseñas:', error);
        setGoogleReviews([]);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  useEffect(() => {
    // Función para cargar el mapa de Google
    const loadGoogleMap = () => {
      try {
        if (window.google && window.google.maps) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { 
              lat: googleConfig.DEFAULT_LOCATION.lat, 
              lng: googleConfig.DEFAULT_LOCATION.lng 
            },
            zoom: googleConfig.MAP_CONFIG.zoom,
            styles: googleConfig.MAP_CONFIG.styles,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: true
          });

          // Marcador de la ubicación
          const marker = new window.google.maps.Marker({
            position: { 
              lat: googleConfig.DEFAULT_LOCATION.lat, 
              lng: googleConfig.DEFAULT_LOCATION.lng 
            },
            map: map,
            title: 'El Costurero',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#FFD700" stroke="#FFFFFF" stroke-width="2"/>
                  <path d="M20 8 L20 32 M8 20 L32 20" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(40, 40)
            }
          });

          // Info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin: 0 0 5px 0; color: #333;">El Costurero</h3>
                <p style="margin: 0 0 5px 0; color: #666;">Taller de costura profesional</p>
                <p style="margin: 0; color: #666;">📍 ${googleConfig.DEFAULT_LOCATION.address}</p>
                <p style="margin: 0; color: #666;">📞 +34 123 456 789</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          // Añadir botón de "Cómo llegar"
          const directionsButton = document.createElement('div');
          directionsButton.className = 'directions-button';
          directionsButton.innerHTML = `
            <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${googleConfig.DEFAULT_LOCATION.lat},${googleConfig.DEFAULT_LOCATION.lng}', '_blank')">
              <i class="fas fa-directions"></i> Cómo llegar
            </button>
          `;
          map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(directionsButton);
        }
      } catch (error) {
        console.error('Error al cargar el mapa:', error);
        setMapError(true);
      }
    };

    // Cargar la API de Google Maps si no está cargada
    if (!window.google) {
      const script = document.createElement('script');
      script.src = getGoogleMapsUrl();
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMap;
      script.onerror = () => {
        console.warn('Error al cargar Google Maps API');
        setMapError(true);
      };
      document.head.appendChild(script);
    } else {
      loadGoogleMap();
    }
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i 
        key={index} 
        className={`fas fa-star ${index < rating ? 'filled' : ''}`}
      ></i>
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const averageRating = googleReviews.length > 0 
    ? (googleReviews.reduce((sum, review) => sum + review.rating, 0) / googleReviews.length).toFixed(1)
    : '4.9';

  return (
    <section className="google-map-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Encuéntranos</h2>
          <p className="section-subtitle">
            Visítanos en nuestro taller y descubre nuestras reseñas de Google
          </p>
        </div>

        <div className="map-reviews-container">
          {/* Mapa de Google */}
          <motion.div 
            className="map-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="map-header">
              <h3>Nuestra Ubicación</h3>
              <p>📍 {googleConfig.DEFAULT_LOCATION.address}</p>
            </div>
            <div ref={mapRef} className="google-map">
              {mapError && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'var(--color-off-white)', color: 'var(--color-gray)', fontStyle: 'italic' }}>
                  <div style={{ textAlign: 'center' }}>
                    <i className="fas fa-map-marker-alt" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                    <p>Error al cargar el mapa</p>
                    <p style={{ fontSize: '0.9rem' }}>Verifica tu API key de Google Maps</p>
                  </div>
                </div>
              )}
            </div>
            <div className="map-info">
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <span>Lun-Vie: 9:00-18:00</span>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <span>+34 123 456 789</span>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <span>info@elcosturero.com</span>
              </div>
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Zona centro, fácil acceso</span>
              </div>
            </div>
          </motion.div>

          {/* Reseñas de Google */}
          <motion.div 
            className="reviews-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="reviews-header">
              <div className="google-rating">
                <div className="rating-stars">
                  {renderStars(5)}
                </div>
                <div className="rating-info">
                  <h3>{averageRating}</h3>
                  <p>Basado en {googleReviews.length || 5} reseñas</p>
                </div>
              </div>
              <div className="google-logo">
                <i className="fab fa-google"></i>
                <span>Google Reviews</span>
              </div>
            </div>

            <div className="reviews-list" ref={reviewsRef}>
              {loading ? (
                <div className="loading-reviews">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Cargando reseñas...</p>
                </div>
              ) : googleReviews.length > 0 ? (
                googleReviews.map((review, index) => (
                  <motion.div 
                    key={review.id}
                    className="review-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="review-header">
                      <img 
                        src={review.profileImage} 
                        alt={review.author}
                        className="reviewer-avatar"
                      />
                      <div className="reviewer-info">
                        <h4>{review.author}</h4>
                        <div className="review-stars">
                          {renderStars(review.rating)}
                        </div>
                        <span className="review-date">{formatDate(review.date)}</span>
                        {review.verified && (
                          <span className="verified-badge">
                            <i className="fas fa-check-circle"></i>
                            Verificado
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="review-content">{review.content}</p>
                  </motion.div>
                ))
              ) : (
                <div className="no-reviews">
                  <i className="fas fa-comment-slash"></i>
                  <p>No hay reseñas disponibles</p>
                </div>
              )}
            </div>

            <div className="reviews-footer">
              <a 
                href={`https://www.google.com/maps/place/${encodeURIComponent(googleConfig.DEFAULT_LOCATION.address)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="google-review-link"
              >
                <i className="fab fa-google"></i>
                Ver todas las reseñas en Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap; 