import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchRealGoogleReviews, fetchPlaceDetails, formatGoogleReview } from '../../services/googleReviewsService';
import testimonialsMock from '../../mocks/testimonialsMock';
import './Testimonials.css';
import useGoogleReviewsStore from '../../services/googleReviewsStore';

// Cambia a true para usar los datos simulados
const USE_MOCK = process.env.NODE_ENV !== 'production';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [activeTab, setActiveTab] = useState('testimonials');
  const googleReviews = useGoogleReviewsStore(state => state.googleReviews);
  const placeDetails = useGoogleReviewsStore(state => state.placeDetails);
  const setGoogleReviews = useGoogleReviewsStore(state => state.setGoogleReviews);
  const setPlaceDetails = useGoogleReviewsStore(state => state.setPlaceDetails);
  const clearGoogleReviews = useGoogleReviewsStore(state => state.clearGoogleReviews);
  const [loading, setLoading] = useState(false);

  // Elegir fuente de datos
  const testimonials = USE_MOCK ? testimonialsMock : googleReviews;
  const length = testimonials.length;

  // Cargar reseñas reales de Google cuando no se use mock
  useEffect(() => {
    if (!USE_MOCK && googleReviews.length === 0) {
      const loadGoogleReviews = async () => {
        try {
          setLoading(true);
          const [reviews, details] = await Promise.all([
            fetchRealGoogleReviews(),
            fetchPlaceDetails()
          ]);
          
          const formattedReviews = reviews.map(review => 
            review.author_name ? formatGoogleReview(review) : review
          );
          
          setGoogleReviews(formattedReviews);
          setPlaceDetails(details);
        } catch (error) {
          console.warn('Error al cargar reseñas:', error);
          setGoogleReviews([]);
          setPlaceDetails(null);
        } finally {
          setLoading(false);
        }
      };

      loadGoogleReviews();
    }
  }, [googleReviews.length]);

  // Autoplay functionality
  useEffect(() => {
    let slideInterval;
    if (autoplay && length > 1) {
      slideInterval = setInterval(() => {
        setCurrent(current => (current === length - 1 ? 0 : current + 1));
      }, 5000);
    }
    return () => clearInterval(slideInterval);
  }, [autoplay, length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrent(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

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

  // Calcular rating promedio y total de reseñas
  const averageRating = placeDetails?.rating || (testimonials.length > 0 
    ? (testimonials.reduce((sum, review) => sum + (review.rating || 5), 0) / testimonials.length).toFixed(1)
    : '4.9');

  const totalReviews = placeDetails?.totalReviews || testimonials.length || 5;

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 } 
    },
    exit: { 
      opacity: 0, 
      x: 30,
      transition: { duration: 0.3 } 
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  // Unificar renderizado de tarjeta de testimonio
  const TestimonialCard = ({ testimonial }) => (
    <motion.div 
      className="testimonial-card"
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="testimonial-quote">
        <i className="fas fa-quote-left"></i>
      </div>
      <div className="testimonial-rating">
        {renderStars(testimonial.rating)}
      </div>
      <p className="testimonial-text">{testimonial.content}</p>
      <div className="testimonial-author">
        <div className="testimonial-image">
          <picture>
            <source srcSet={(testimonial.image || testimonial.profileImage)?.replace('.png', '.webp')} type="image/webp" />
            <img 
              src={testimonial.image || testimonial.profileImage} 
              alt={testimonial.name || testimonial.author}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/imagen.jpg';
              }}
            />
          </picture>
        </div>
        <div className="testimonial-info">
          <h4>{testimonial.name || testimonial.author}</h4>
          <p>{testimonial.role || (testimonial.verified ? 'Cliente verificado' : '')}</p>
          <div className="testimonial-meta">
            <span className="testimonial-source">{testimonial.source || 'Google Reviews'}</span>
            {testimonial.date && (
              <span className="testimonial-date">{formatDate(testimonial.date)}</span>
            )}
            {testimonial.verified && (
              <span className="verified-badge">
                <i className="fas fa-check-circle"></i>
                Verificado
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Precarga de imágenes de testimonios
  useEffect(() => {
    testimonials.forEach(testimonial => {
      if (testimonial.image) {
        const img = new window.Image();
        img.src = testimonial.image;
      }
      if (testimonial.profileImage) {
        const img = new window.Image();
        img.src = testimonial.profileImage;
      }
    });
  }, [testimonials]);

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <p className="section-subtitle">
            Descubre las experiencias de quienes confiaron en nuestro trabajo
          </p>
        </div>

        {/* Tab Navigation (opcional, solo si quieres mantenerlo) */}
        {/*
        <div className="testimonials-tabs">
          <motion.button
            className={`tab-button ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-comments"></i>
            Testimonios
          </motion.button>
          <motion.button
            className={`tab-button ${activeTab === 'google' ? 'active' : ''}`}
            onClick={() => setActiveTab('google')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-google"></i>
            Google Reviews
            <span className="google-rating-badge">{averageRating} ⭐</span>
          </motion.button>
        </div>
        }

        {/* Un solo slider para mock o reales */}
        {loading ? (
          <div className="loading-reviews">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Cargando reseñas...</p>
          </div>
        ) : (
          <>
            <motion.div
              className="testimonials-content"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="rating-summary-inside">
                <div className="rating-stars-large">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="rating-info">
                  <h3>{averageRating}</h3>
                  <p>Basado en {totalReviews} reseñas verificadas</p>
                </div>
              </div>
              <div className="testimonial-slider">
                <div className="testimonial-arrow testimonial-prev" onClick={prevSlide}>
                  <i className="fas fa-chevron-left"></i>
                </div>

                <div className="testimonial-content">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      className={`testimonial-slide ${index === current ? 'active' : ''}`} 
                      key={testimonial.id || testimonial.time || index}
                    >
                      {index === current && (
                        <TestimonialCard testimonial={testimonial} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="testimonial-arrow testimonial-next" onClick={nextSlide}>
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>

              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <span 
                    key={index} 
                    className={`testimonial-dot ${index === current ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  ></span>
                ))}
              </div>
            </motion.div>

            <div className="google-reviews-footer">
              <a 
                href={`https://www.google.com/maps/place/?q=place_id:${placeDetails?.placeId || 'ChIJN_HNGi9PTg0RnvDP7f4PZyE'}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="google-review-link"
              >
                <i className="fab fa-google"></i>
                Ver todas las reseñas en Google Maps
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
