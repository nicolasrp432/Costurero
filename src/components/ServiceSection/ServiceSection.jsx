import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for image
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
  
  // Parallax effect for details
  const detailsY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const detailsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

  // Animation variants with improved timing
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      } 
    }
  };

  const slideInFromSide = {
    hidden: { 
      opacity: 0, 
      x: reverse ? 100 : -100,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    if (isInView) {
      sectionRef.current?.classList.add('in-view');
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`service-section ${reverse ? 'reverse' : ''}`}
    >
      <div className="container">
        <div className="service-content">
          <motion.div 
            ref={imageRef}
            className="service-image-container"
            style={{ y: imageY, scale: imageScale }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInFromSide}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.img 
              src={image} 
              alt={title} 
              className="service-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/imagen.jpg';
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.4 }
              }}
            />
          </motion.div>

          <motion.div 
            ref={detailsRef}
            className="service-details"
            style={{ y: detailsY, opacity: detailsOpacity }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <motion.h2 
              className="service-title"
              variants={staggerItem}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="service-description"
              variants={staggerItem}
            >
              {description}
            </motion.p>
            
            {features.length > 0 && (
              <motion.ul 
                className="service-features"
                variants={fadeInUp}
              >
                {features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="service-feature-item"
                    variants={staggerItem}
                    whileHover={{ 
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <i className="fas fa-check-circle"></i>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
            
            <motion.div
              variants={staggerItem}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Button to={buttonLink} type="secondary">{buttonText}</Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
