import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import './ServiceSection.css';

const ServiceSection = ({ 
  id, 
  title, 
  description, 
  image, 
  reverse = false,
  features = [],
  buttonText = "Saber más",
  buttonLink = "/contacto" 
}) => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  return (
    <section id={id} className={`service-section ${reverse ? 'reverse' : ''}`}>
      <div className="container">
        <div className="service-content">
          <motion.div 
            className="service-image-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <img 
              src={image} 
              alt={title} 
              className="service-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/imagen.jpg';
              }}
            />
          </motion.div>

          <motion.div 
            className="service-details"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
          >
            <h2 className="service-title">{title}</h2>
            <p className="service-description">{description}</p>
            
            {features.length > 0 && (
              <ul className="service-features">
                {features.map((feature, index) => (
                  <li key={index} className="service-feature-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <Button to={buttonLink} type="secondary">{buttonText}</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
