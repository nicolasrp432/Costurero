import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonialData = [
  {
    id: 1,
    name: 'María García',
    role: 'Cliente',
    content: 'El Costurero transformó mi vestido de novia heredado en una pieza moderna y adaptada a mi estilo. El trabajo artesanal y la atención al detalle fueron excepcionales. ¡No podría estar más feliz con el resultado!',
    image: '/images/testimonials/testimonial-1.jpg'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Cliente',
    content: 'Confié en El Costurero para elaborar los uniformes de mi restaurante y el resultado superó mis expectativas. La calidad de las prendas, la precisión en las tallas y el cumplimiento de los plazos fue impecable.',
    image: '/images/testimonials/testimonial-2.jpg'
  },
  {
    id: 3,
    name: 'Lucía Fernández',
    role: 'Cliente',
    content: 'He asistido a las clases de patronaje de El Costurero durante seis meses y he aprendido muchísimo. Las profesoras son expertas y pacientes, y la atmósfera del taller es inspiradora. Totalmente recomendable.',
    image: '/images/testimonials/testimonial-3.jpg'
  },
  {
    id: 4,
    name: 'Antonio Medina',
    role: 'Cliente',
    content: 'Llevo años confiando en El Costurero para el arreglo de mis trajes y nunca me han decepcionado. Su profesionalidad y maestría hacen que vuelva una y otra vez. El mejor taller de costura de la ciudad sin duda.',
    image: '/images/testimonials/testimonial-4.jpg'
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const length = testimonialData.length;

  // Autoplay functionality
  useEffect(() => {
    let slideInterval;
    if (autoplay) {
      slideInterval = setInterval(() => {
        setCurrent(current => (current === length - 1 ? 0 : current + 1));
      }, 5000);
    }
    return () => clearInterval(slideInterval);
  }, [autoplay, length]);

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

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <p className="section-subtitle">
            Descubre las experiencias de quienes confiaron en nuestro trabajo
          </p>
        </div>

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
                    <p className="testimonial-text">{testimonial.content}</p>
                    <div className="testimonial-author">
                      <div className="testimonial-image">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/imagen.jpg';
                          }}
                        />
                      </div>
                      <div className="testimonial-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
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
      </div>
    </section>
  );
};

export default Testimonials;
