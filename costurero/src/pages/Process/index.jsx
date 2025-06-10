import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button/Button';
import './Process.css';

const Process = () => {
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

  // Process steps data
  const processSteps = [
    {
      id: 1,
      title: 'Consulta Inicial',
      description: 'Todo comienza con una conversación donde entendemos exactamente lo que necesitas. Puedes venir a nuestro taller o realizar una consulta online inicial.',
      icon: 'fa-comments',
      timeframe: 'Día 1'
    },
    {
      id: 2,
      title: 'Análisis y Asesoramiento',
      description: 'Evaluamos tu proyecto, te asesoramos sobre tejidos, diseños y posibilidades técnicas. Te presentamos opciones y alternativas basadas en nuestra experiencia.',
      icon: 'fa-search',
      timeframe: 'Día 1-2'
    },
    {
      id: 3,
      title: 'Presupuesto Detallado',
      description: 'Te proporcionamos un presupuesto claro y detallado, sin sorpresas ni costes ocultos. Incluimos plazos estimados de entrega basados en la complejidad del trabajo.',
      icon: 'fa-file-invoice-dollar',
      timeframe: 'Día 2-3'
    },
    {
      id: 4,
      title: 'Toma de Medidas',
      description: 'Realizamos una toma de medidas minuciosa y precisa. Este paso es fundamental para garantizar un ajuste perfecto en cada prenda o proyecto.',
      icon: 'fa-ruler',
      timeframe: 'Día 3-4'
    },
    {
      id: 5,
      title: 'Selección de Materiales',
      description: 'Elegimos juntos los mejores materiales para tu proyecto. Trabajamos con proveedores de primera calidad para garantizar resultados excepcionales.',
      icon: 'fa-palette',
      timeframe: 'Día 4-5'
    },
    {
      id: 6,
      title: 'Patronaje y Corte',
      description: 'Creamos patrones personalizados o adaptamos los existentes según tus medidas. Cortamos con precisión los materiales seleccionados para tu proyecto.',
      icon: 'fa-cut',
      timeframe: 'Día 5-7'
    },
    {
      id: 7,
      title: 'Primera Prueba',
      description: 'En proyectos de confección, realizamos una primera prueba para asegurar el ajuste correcto y hacer los ajustes necesarios antes de la costura final.',
      icon: 'fa-sync',
      timeframe: 'Día 8-10'
    },
    {
      id: 8,
      title: 'Confección y Detalles',
      description: 'Nuestro equipo trabaja minuciosamente en la confección, prestando especial atención a los acabados y detalles que marcan la diferencia en cada pieza.',
      icon: 'fa-tshirt',
      timeframe: 'Día 10-14'
    },
    {
      id: 9,
      title: 'Control de Calidad',
      description: 'Cada proyecto pasa por un riguroso control de calidad para garantizar que cumple con nuestros estándares de excelencia y tus expectativas.',
      icon: 'fa-check-double',
      timeframe: 'Día 14-15'
    },
    {
      id: 10,
      title: 'Entrega Final',
      description: 'Te entregamos tu proyecto finalizado, listo para disfrutar. Siempre incluimos consejos de cuidado y mantenimiento para prolongar la vida de tus prendas.',
      icon: 'fa-gift',
      timeframe: 'Día 15-16'
    }
  ];

  return (
    <div className="process-page">
      {/* Hero Section */}
      <section className="process-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="process-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Nuestro Proceso de Trabajo</h1>
            <p>
              Descubre cómo trabajamos en El Costurero para garantizar resultados excepcionales 
              en cada proyecto, desde la consulta inicial hasta la entrega final.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Proceso Paso a Paso</h2>
            <p className="section-subtitle">
              Cada proyecto sigue un meticuloso proceso para garantizar el mejor resultado
            </p>
          </motion.div>

          <div className="timeline">
            {processSteps.map((step, index) => (
              <motion.div 
                key={step.id}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{...fadeInUp, transition: { duration: 0.6, delay: index * 0.1 }}}
              >
                <div className="timeline-content">
                  <div className="timeline-icon">
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <span className="timeline-date">{step.timeframe}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="service-types-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Tiempos de Entrega</h2>
            <p className="section-subtitle">
              Ofrecemos diferentes opciones según tus necesidades de tiempo
            </p>
          </motion.div>

          <div className="service-types-grid">
            <motion.div 
              className="service-type-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="service-type-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Servicio Estándar</h3>
              <p>
                Nuestro servicio habitual con tiempos de entrega entre 1-3 semanas, dependiendo de 
                la complejidad del proyecto. Ideal para la mayoría de trabajos donde no hay urgencia.
              </p>
              <ul className="service-type-features">
                <li>
                  <i className="fas fa-check"></i>
                  <span>Arreglos simples: 2-5 días</span>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <span>Transformaciones: 1-2 semanas</span>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <span>Confección a medida: 2-3 semanas</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="service-type-card featured"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.1 }}}
            >
              <div className="featured-tag">Más solicitado</div>
              <div className="service-type-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Servicio Express</h3>
              <p>
                Para cuando necesitas tu proyecto en tiempo récord. Priorizamos tu trabajo para 
                entregarlo en el menor tiempo posible, manteniendo nuestra calidad.
              </p>
              <ul className="service-type-features">
                <li>
                  <i className="fas fa-check"></i>
                  <span>Arreglos simples: 24 horas</span>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <span>Transformaciones básicas: 2-3 días</span>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <span>Confección rápida: 1 semana</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="service-type-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <div className="service-type-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h3>Servicio Premium</h3>
              <p>
                Para proyectos especiales que requieren atención excepcional. Incluye consultas 
                adicionales, pruebas extra y selección de materiales exclusivos.
              </p>
              <ul className="service-type-features">
                <li>
                  <i className="fas fa-check"></i>
                  <span>Atención personalizada exclusiva</span>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <span>Múltiples pruebas y ajustes</span>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <span>Materiales y acabados premium</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <p className="section-subtitle">
              Resolvemos tus dudas sobre nuestro proceso de trabajo
            </p>
          </motion.div>

          <div className="faq-grid">
            <motion.div 
              className="faq-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h3>¿Es necesario pedir cita previa?</h3>
              <p>
                Aunque atendemos sin cita previa para consultas rápidas y entregas, recomendamos 
                concertar una cita para tomas de medidas, pruebas y asesoramiento personalizado, 
                asegurando así que podamos dedicarte el tiempo necesario.
              </p>
            </motion.div>

            <motion.div 
              className="faq-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.1 }}}
            >
              <h3>¿Cómo puedo hacer seguimiento de mi pedido?</h3>
              <p>
                Todos nuestros clientes reciben actualizaciones periódicas sobre el estado de su 
                proyecto. Además, pueden consultar el estado a través de nuestro sistema online 
                de seguimiento o contactarnos directamente por teléfono o email.
              </p>
            </motion.div>

            <motion.div 
              className="faq-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <h3>¿Qué ocurre si necesito modificaciones tras la entrega?</h3>
              <p>
                Ofrecemos un periodo de ajustes gratuitos durante los 15 días posteriores a la 
                entrega para asegurar tu completa satisfacción. Pasado este periodo, aplicarán 
                tarifas estándar según la modificación requerida.
              </p>
            </motion.div>

            <motion.div 
              className="faq-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.3 }}}
            >
              <h3>¿Puedo aportar mis propios materiales?</h3>
              <p>
                Sí, trabajamos tanto con nuestros materiales como con materiales aportados por 
                el cliente. Asesoramos sobre la idoneidad del material para el proyecto y, en caso 
                necesario, sugerimos alternativas para garantizar el mejor resultado.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section process-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2>¿Listo para comenzar tu proyecto?</h2>
            <p>
              Contacta con nosotros hoy mismo para una consulta inicial gratuita y descubre 
              cómo podemos ayudarte a hacer realidad tu visión.
            </p>
            <div className="cta-buttons">
              <Button to="/contacto" size="large">Contactar Ahora</Button>
              <Button to="/galeria" type="outline" size="large">Ver Trabajos Anteriores</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Process;
