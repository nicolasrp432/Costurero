import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import Testimonials from '../../components/Testimonials/Testimonials';
import Button from '../../components/Button/Button';
import './Services.css';

const Services = () => {
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

  // Services data
  const services = [
    {
      id: 'arreglos',
      title: 'Arreglos y Transformaciones',
      description: 'Adaptamos tus prendas favoritas para que luzcan como nuevas y se ajusten perfectamente a ti. Desde simples dobladillos hasta complejas transformaciones, nuestro equipo de profesionales garantiza un acabado impecable en cada trabajo.',
      image: '/images/services/arreglos.jpg',
      features: [
        'Ajustes de talla en todo tipo de prendas',
        'Arreglos de largos y dobladillos',
        'Cambios de cremalleras y botones',
        'Transformaciones completas de prendas',
        'Restauración de prendas vintage y antiguas'
      ],
      buttonText: 'Solicitar Presupuesto',
      buttonLink: '/contacto'
    },
    {
      id: 'confeccion',
      title: 'Confección a Medida',
      description: 'Diseñamos y confeccionamos piezas únicas adaptadas a tus gustos, necesidades y medidas exactas. Utilizamos tejidos de alta calidad y técnicas de costura tradicionales para crear prendas que te encajarán a la perfección.',
      image: '/images/services/confeccion.jpg',
      features: [
        'Trajes y conjuntos de chaqueta personalizados',
        'Camisas y blusas a medida',
        'Pantalones y faldas perfectamente ajustados',
        'Vestidos para ocasiones especiales',
        'Asesoramiento en selección de tejidos y diseños'
      ],
      buttonText: 'Concertar Cita',
      buttonLink: '/contacto#cita',
      reverse: true
    },
    {
      id: 'novia',
      title: 'Novia e Invitada',
      description: 'Creamos vestidos de ensueño para el día más especial. Desde diseños elegantes y clásicos hasta propuestas más modernas y originales, trabajamos mano a mano contigo para materializar el vestido perfecto que siempre has imaginado.',
      image: '/images/services/novia.jpg',
      features: [
        'Vestidos de novia a medida',
        'Arreglos y modificaciones de vestidos existentes',
        'Complementos: velos, tocados, cubrehombros',
        'Vestidos para madrinas e invitadas',
        'Trajes para novios y padrinos'
      ],
      buttonText: 'Reservar Consulta',
      buttonLink: '/contacto#cita'
    },
    {
      id: 'abrigos',
      title: 'Abrigos de Piel',
      description: 'Especialistas en la restauración, transformación y cuidado de prendas de piel. Damos nueva vida a abrigos antiguos adaptándolos a las tendencias actuales, manteniendo la calidad y el valor de la prenda original.',
      image: '/images/services/abrigos.jpg',
      features: [
        'Restauración de abrigos de piel antiguos',
        'Transformación y modernización de diseños',
        'Arreglos y ajustes para un ajuste perfecto',
        'Limpieza y mantenimiento especializado',
        'Asesoramiento experto en conservación'
      ],
      buttonText: 'Solicitar Información',
      buttonLink: '/contacto',
      reverse: true
    },
    {
      id: 'uniformes',
      title: 'Uniformes y Batas',
      description: 'Confeccionamos uniformes corporativos y escolares a medida, adaptados a las necesidades específicas de cada cliente. Ofrecemos servicios para empresas, colegios y profesionales que buscan transmitir una imagen coherente y profesional.',
      image: '/images/services/uniformes.jpg',
      features: [
        'Uniformes corporativos personalizados',
        'Batas para colegios, laboratorios y sanitarios',
        'Posibilidad de añadir logotipos y detalles corporativos',
        'Diferentes opciones de tejidos técnicos y resistentes',
        'Servicio de mantenimiento y reposición'
      ],
      buttonText: 'Solicitar Presupuesto',
      buttonLink: '/contacto'
    },
    {
      id: 'fiesta',
      title: 'Trajes de Fiesta',
      description: 'Creamos trajes de fiesta exclusivos para eventos especiales, diseñados según tus preferencias y confeccionados con acabados de alta costura. Nuestro objetivo es que luzcas espectacular y única en cada ocasión.',
      image: '/images/services/fiesta.jpg',
      features: [
        'Vestidos de fiesta a medida',
        'Trajes de ceremonia para hombre',
        'Vestidos para eventos formales',
        'Opciones para todas las tallas y siluetas',
        'Asesoramiento en elección de tejidos y diseños'
      ],
      buttonText: 'Ver Galería',
      buttonLink: '/galeria',
      reverse: true
    },
    {
      id: 'hogar',
      title: 'Textil Hogar',
      description: 'Transformamos tu hogar con textiles personalizados de la más alta calidad. Desde cortinas elegantes hasta cojines decorativos, creamos piezas que se adaptan perfectamente a tu espacio y estilo de decoración.',
      image: '/images/services/hogar.jpg',
      features: [
        'Cortinas a medida para cualquier ventana',
        'Cojines decorativos personalizados',
        'Fundas para sofás y sillones',
        'Mantelerías y complementos de mesa',
        'Ropa de cama exclusiva'
      ],
      buttonText: 'Solicitar Presupuesto',
      buttonLink: '/contacto'
    },
    {
      id: 'clases',
      title: 'Clases de Patronaje',
      description: 'Compartimos nuestra experiencia y conocimientos a través de clases de patronaje y costura para todos los niveles. Aprende técnicas profesionales en un ambiente acogedor donde podrás desarrollar tu creatividad y habilidades.',
      image: '/images/services/clases.jpg',
      features: [
        'Clases para principiantes y niveles avanzados',
        'Grupos reducidos con atención personalizada',
        'Aprendizaje de técnicas de costura tradicionales',
        'Desarrollo de patrones a medida',
        'Proyectos prácticos adaptados a cada alumno'
      ],
      buttonText: 'Ver Horarios',
      buttonLink: '/contacto#clases',
      reverse: true
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="services-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Nuestros Servicios</h1>
            <p>
              Descubre toda la gama de servicios que ofrecemos en El Costurero, 
              donde la calidad y la atención al detalle son nuestra prioridad.
            </p>
            <div className="services-quick-links">
              {services.map((service) => (
                <a key={service.id} href={`#${service.id}`} className="service-quick-link">
                  {service.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service) => (
        <ServiceSection
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          image={service.image}
          features={service.features}
          buttonText={service.buttonText}
          buttonLink={service.buttonLink}
          reverse={service.reverse}
        />
      ))}

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action Section */}
      <section className="section services-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2>¿Tienes un proyecto específico en mente?</h2>
            <p>
              Contáctanos para discutir tus necesidades y encontrar juntos la solución perfecta. 
              En El Costurero nos adaptamos a cada cliente para ofrecer el mejor servicio posible.
            </p>
            <div className="cta-buttons">
              <Button to="/contacto" size="large">Solicitar Información</Button>
              <Button to="/galeria" type="outline" size="large">Ver Galería de Trabajos</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
