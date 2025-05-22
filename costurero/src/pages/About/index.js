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

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Ana Martínez',
      role: 'Fundadora y Directora',
      bio: 'Con más de 25 años de experiencia en alta costura, Ana fundó El Costurero con la visión de ofrecer servicios de confección a medida que combinaran la tradición artesanal con un toque contemporáneo.',
      image: '/images/about/team-1.jpg'
    },
    {
      id: 2,
      name: 'Carlos Jiménez',
      role: 'Maestro Sastre',
      bio: 'Especializado en sastrería masculina, Carlos aporta su extenso conocimiento adquirido en talleres tradicionales de Madrid y Barcelona, siendo experto en confección de trajes a medida.',
      image: '/images/about/team-2.jpg'
    },
    {
      id: 3,
      name: 'Elena Sánchez',
      role: 'Especialista en Novias',
      bio: 'Con formación en diseño de moda y experiencia internacional, Elena se especializa en la creación de vestidos de novia exclusivos, adaptados a la personalidad y estilo de cada cliente.',
      image: '/images/about/team-3.jpg'
    },
    {
      id: 4,
      name: 'Miguel Torres',
      role: 'Patronista',
      bio: 'Miguel es un experto en patronaje con una precisión excepcional. Su habilidad para transformar ideas en patrones adaptados a cada cuerpo es fundamental para nuestros servicios de confección a medida.',
      image: '/images/about/team-4.jpg'
    }
  ];

  // Values data
  const values = [
    {
      id: 1,
      title: 'Excelencia',
      description: 'Buscamos la perfección en cada detalle, desde la selección de materiales hasta los acabados finales.',
      icon: 'fa-star'
    },
    {
      id: 2,
      title: 'Personalización',
      description: 'Cada cliente es único, por eso adaptamos nuestro servicio y creaciones a sus necesidades específicas.',
      icon: 'fa-user'
    },
    {
      id: 3,
      title: 'Sostenibilidad',
      description: 'Nos comprometemos con prácticas sostenibles, fomentando la reutilización y el consumo responsable.',
      icon: 'fa-leaf'
    },
    {
      id: 4,
      title: 'Innovación',
      description: 'Combinamos técnicas tradicionales con enfoques modernos para ofrecer soluciones actuales y duraderas.',
      icon: 'fa-lightbulb'
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
              Descubre quiénes somos, nuestra pasión por la costura artesanal y el 
              equipo de profesionales que hace posible cada creación.
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
                  e.target.src = 'https://via.placeholder.com/600x800?text=Historia+de+El+Costurero';
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
              <h2 className="section-title">Nuestra Historia</h2>
              <div className="section-text">
                <p>
                  El Costurero nació en 2005 de la mano de Ana Martínez, una apasionada de la costura con formación en las mejores escuelas de diseño de Madrid. Lo que comenzó como un pequeño taller dedicado principalmente a arreglos, fue creciendo hasta convertirse en un referente de la confección a medida y la alta calidad.
                </p>
                <p>
                  A lo largo de estos años, hemos ido incorporando a nuestro equipo a profesionales especializados en diferentes áreas de la costura y el patronaje, permitiéndonos ampliar nuestra oferta de servicios sin perder nunca de vista nuestra filosofía inicial: la excelencia y el trato personalizado.
                </p>
                <p>
                  Hoy, El Costurero es un espacio donde tradición e innovación se dan la mano. Un lugar donde cada prenda recibe la atención y el cuidado que merece, y donde cada cliente encuentra soluciones adaptadas a sus necesidades específicas.
                </p>
              </div>
              <div className="story-stats">
                <div className="stat-item">
                  <div className="stat-number">18</div>
                  <div className="stat-label">Años de experiencia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5000+</div>
                  <div className="stat-label">Clientes satisfechos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">15</div>
                  <div className="stat-label">Profesionales</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="our-team-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Nuestro Equipo</h2>
            <p className="section-subtitle">
              Profesionales apasionados que aportan su talento y experiencia para crear piezas únicas
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
                      e.target.src = 'https://via.placeholder.com/300x400?text=Miembro+del+equipo';
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
                    e.target.src = 'https://via.placeholder.com/400x300?text=Reconocimiento';
                  }}
                />
              </div>
              <div className="recognition-image">
                <img 
                  src="/images/about/recognition-2.jpg" 
                  alt="Reconocimiento" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Reconocimiento';
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
