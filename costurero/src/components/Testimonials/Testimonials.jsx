import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonialData = [
  {
    id: 1,
    name: 'María García',
    role: 'Cliente',
    content: 'El Costurero transformó mi vestido de novia heredado en una pieza moderna y adaptada a mi estilo. El trabajo artesanal y la atención al detalle fueron excepcionales. ¡No podría estar más feliz con el resultado!',
    image: '/images/testimonials/testimonial-1.jpg',
    rating: 5,
    source: 'Google Reviews'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Cliente',
    content: 'Confié en El Costurero para elaborar los uniformes de mi restaurante y el resultado superó mis expectativas. La calidad de las prendas, la precisión en las tallas y el cumplimiento de los plazos fue impecable.',
    image: '/images/testimonials/testimonial-2.jpg',
    rating: 5,
    source: 'Google Reviews'
  },
  {
    id: 3,
    name: 'Lucía Fernández',
    role: 'Cliente',
    content: 'He asistido a las clases de patronaje de El Costurero durante seis meses y he aprendido muchísimo. Las profesoras son expertas y pacientes, y la atmósfera del taller es inspiradora. Totalmente recomendable.',
    image: '/images/testimonials/testimonial-3.jpg',
    rating: 5,
    source: 'Google Reviews'
  },
  {
    id: 4,
    name: 'Antonio Medina',
    role: 'Cliente',
    content: 'Llevo años confiando en El Costurero para el arreglo de mis trajes y nunca me han decepcionado. Su profesionalidad y maestría hacen que vuelva una y otra vez. El mejor taller de costura de la ciudad sin duda.',
    image: '/images/testimonials/testimonial-4.jpg',
    rating: 5,
    source: 'Google Reviews'
  },
];

// Datos de reseñas de Google (simulados)
const googleReviews = [
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

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [activeTab, setActiveTab] = useState('testimonials'); // 'testimonials' o 'google'
  const length = testimonialData.length;

  // Autoplay functionality
  useEffect(() => {
    let slideInterval;
    if (autoplay && activeTab === 'testimonials') {
      slideInterval = setInterval(() => {
        setCurrent(current => (current === length - 1 ? 0 : current + 1));
      }, 5000);
    }
    return () => clearInterval(slideInterval);
  }, [autoplay, length, activeTab]);

  // Next slide handler
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setAutoplay(false);
    // Resume autoplay after manual navigation
    setTimeout(() => setAutoplay(true), 10000);
  };

  // Previous slide handler
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setAutoplay(false);
    // Resume autoplay after manual navigation
    setTimeout(() => setAutoplay(true), 10000);
  };

  // Dot navigation handler
  const goToSlide = (index) => {
    setCurrent(index);
    setAutoplay(false);
    // Resume autoplay after manual navigation
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

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.5 } 
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

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <p className="section-subtitle">
            Descubre las experiencias de quienes confiaron en nuestro trabajo
          </p>
        </div>

        {/* Tab Navigation */}
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
            <span className="google-rating-badge">4.9 ⭐</span>
          </motion.button>
        </div>

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <motion.div
            className="testimonials-content"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="testimonial-slider">
              <div className="testimonial-arrow testimonial-prev" onClick={prevSlide}>
                <i className="fas fa-chevron-left"></i>
              </div>

              <div className="testimonial-content">
                {testimonialData.map((testimonial, index) => (
                  <div 
                    className={`testimonial-slide ${index === current ? 'active' : ''}`} 
                    key={testimonial.id}
                  >
                    {index === current && (
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
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'src/assets/imagen.jpg';
                              }}
                            />
                          </div>
                          <div className="testimonial-info">
                            <h4>{testimonial.name}</h4>
                            <p>{testimonial.role}</p>
                            <span className="testimonial-source">{testimonial.source}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="testimonial-arrow testimonial-next" onClick={nextSlide}>
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>

            <div className="testimonial-dots">
              {testimonialData.map((_, index) => (
                <span 
                  key={index} 
                  className={`testimonial-dot ${index === current ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Google Reviews Tab */}
        {activeTab === 'google' && (
          <motion.div
            className="google-reviews-content"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="google-reviews-header">
              <div className="google-rating-summary">
                <div className="rating-stars-large">
                  {renderStars(5)}
                </div>
                <div className="rating-info-large">
                  <h3>4.9</h3>
                  <p>Basado en {googleReviews.length} reseñas verificadas</p>
                  <span className="google-verified">
                    <i className="fas fa-check-circle"></i>
                    Verificado por Google
                  </span>
                </div>
              </div>
            </div>

            <div className="google-reviews-list">
              {googleReviews.map((review, index) => (
                <motion.div 
                  key={review.id}
                  className="google-review-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="google-review-header">
                    <img 
                      src={review.profileImage} 
                      alt={review.author}
                      className="google-reviewer-avatar"
                    />
                    <div className="google-reviewer-info">
                      <h4>{review.author}</h4>
                      <div className="google-review-stars">
                        {renderStars(review.rating)}
                      </div>
                      <span className="google-review-date">{formatDate(review.date)}</span>
                      {review.verified && (
                        <span className="google-verified-badge">
                          <i className="fas fa-check-circle"></i>
                          Verificado
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="google-review-content">{review.content}</p>
                </motion.div>
              ))}
            </div>

            <div className="google-reviews-footer">
              <a 
                href="https://www.google.com/maps/place/TU_NEGOCIO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="google-review-link"
              >
                <i className="fab fa-google"></i>
                Ver todas las reseñas en Google Maps
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
