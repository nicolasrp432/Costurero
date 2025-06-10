import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Testimonials from '../../components/Testimonials/Testimonials';
import Button from '../../components/Button/Button';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: 'Lida Rodríguez',
      role: 'Propietaria y Maestra Costurera',
      bio: 'Con una extensa trayectoria en el arte de la costura y confección, Lida Rodríguez es la propietaria y alma de El Costurero. Su dedicación, experiencia y amor por el oficio se reflejan en cada proyecto que realiza, brindando atención personalizada y resultados excepcionales a cada uno de sus clientes.',
      image: '/images/about/owner.jpg'
    }
  ];

  // Values data
  const values = [
    {
      id: 1,
      title: 'Excelencia Artesanal',
      description: 'Busco la perfección en cada detalle, desde la selección de materiales hasta los acabados finales, garantizando resultados excepcionales en cada proyecto.',
      icon: 'fa-award'
    },
    {
      id: 2,
      title: 'Atención Personalizada',
      description: 'Cada cliente es único, por eso dedico el tiempo necesario para entender tus necesidades y crear soluciones que reflejen tu estilo personal.',
      icon: 'fa-heart'
    },
    {
      id: 3,
      title: 'Compromiso Sostenible',
      description: 'Me comprometo con prácticas sostenibles, fomentando la reutilización y transformación de prendas para contribuir a un futuro más consciente.',
      icon: 'fa-leaf'
    },
    {
      id: 4,
      title: 'Tradición e Innovación',
      description: 'Combino la sabiduría de las técnicas tradicionales con enfoques modernos para crear piezas únicas que perduran en el tiempo.',
      icon: 'fa-gem'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Sobre Nosotros</h1>
            <p>
              Descubre la historia detrás de El Costurero, donde la pasión por la costura 
              artesanal se combina con años de experiencia para crear piezas únicas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="container">
          <div className="story-content">
            <motion.div 
              className="story-image"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <img 
                src="/images/about/our-story.jpg" 
                alt="Historia de El Costurero" 
                className="story-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/imagen.jpg';
                }}
              />
            </motion.div>
            
            <motion.div 
              className="story-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <div className="text-content">
                <h2>Nuestra Historia</h2>
                <p>
                  El Costurero nació de la pasión por la costura y el deseo de brindar servicios de alta calidad en confección y arreglos. Como propietaria, Lida Rodríguez ha dedicado su vida a perfeccionar el arte de la costura, convirtiendo cada proyecto en una obra única que refleja la personalidad y necesidades de cada cliente.
                </p>
                <p>
                  Con años de experiencia en el sector, El Costurero se ha convertido en un referente en servicios de costura personalizados, donde cada cliente recibe atención individual y soluciones adaptadas a sus necesidades específicas.
                </p>
                <p>
                  Hoy, El Costurero es un espacio donde la tradición y la calidad son prioridad. Un lugar donde cada prenda recibe la atención y el cuidado que merece, directamente de las manos expertas de su propietaria.
                </p>
              </div>
              <div className="story-stats">
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Años de experiencia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3000+</div>
                  <div className="stat-label">Clientes satisfechos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Atención personalizada</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Owner Section */}
      <section className="our-team-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Conozca a la Propietaria</h2>
            <p className="section-subtitle">
              La experiencia y dedicación detrás de cada creación
            </p>
          </motion.div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                className="team-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{...fadeInUp, transition: { duration: 0.6, delay: index * 0.1 }}}
              >
                <div className="team-image">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/imagen.jpg';
                    }}
                  />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Nuestros Valores</h2>
            <p className="section-subtitle">
              Principios que guían nuestro trabajo día a día
            </p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div 
                key={value.id}
                className="value-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{...fadeInUp, transition: { duration: 0.6, delay: index * 0.1 }}}
              >
                <div className="value-icon">
                  <i className={`fas ${value.icon}`}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="recognition-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Reconocimientos</h2>
            <p className="section-subtitle">
              El reconocimiento a nuestro trabajo y dedicación
            </p>
          </motion.div>

          <div className="recognition-content">
            <motion.div 
              className="recognition-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="recognition-item">
                <div className="recognition-year">2022</div>
                <h3>Premio a la Excelencia Artesanal</h3>
                <p>Otorgado por la Asociación de Artesanos de Madrid, reconociendo nuestro compromiso con la preservación de técnicas tradicionales.</p>
              </div>
              <div className="recognition-item">
                <div className="recognition-year">2019</div>
                <h3>Certificación de Sostenibilidad Textil</h3>
                <p>Reconocimiento a nuestras prácticas sostenibles y compromiso con el medio ambiente en nuestros procesos de producción.</p>
              </div>
              <div className="recognition-item">
                <div className="recognition-year">2015</div>
                <h3>Premio a la Innovación en Diseño</h3>
                <p>Por nuestra capacidad de combinar técnicas tradicionales con enfoques modernos en la creación de piezas únicas.</p>
              </div>
            </motion.div>
            <motion.div 
              className="recognition-images"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <div className="recognition-image">
                <img 
                  src="/images/about/recognition-1.jpg" 
                  alt="Reconocimiento" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/imagen.jpg';
                  }}
                />
              </div>
              <div className="recognition-image">
                <img 
                  src="/images/about/recognition-2.jpg" 
                  alt="Reconocimiento" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/imagen.jpg';
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action Section */}
      <section className="section about-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2>¿Quieres conocernos mejor?</h2>
            <p>
              Visítanos en nuestro taller y descubre de primera mano cómo trabajamos. 
              Estaremos encantados de mostrarte nuestras instalaciones y conversar sobre tu proyecto.
            </p>
            <div className="cta-buttons">
              <Button to="/contacto" size="large">Contactar Ahora</Button>
              <Button to="/galeria" type="outline" size="large">Ver Nuestros Trabajos</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
