import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button/Button';
import './Pricing.css';

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for price calculator
  const [calculatorState, setCalculatorState] = useState({
    serviceType: '',
    itemType: '',
    complexity: 'medium',
    quantity: 1,
    express: false,
    estimatedPrice: null
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  // Handle calculator input changes
  const handleCalculatorChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCalculatorState({
      ...calculatorState,
      [name]: type === 'checkbox' ? checked : value,
      estimatedPrice: null // Reset estimated price when inputs change
    });
  };

  // Calculate estimated price
  const calculatePrice = () => {
    const { serviceType, itemType, complexity, quantity, express } = calculatorState;
    
    // Base prices for different service types
    const basePrices = {
      arreglos: {
        pantalon: 12,
        falda: 15,
        vestido: 20,
        abrigo: 25,
        camisa: 15
      },
      confeccion: {
        pantalon: 120,
        falda: 100,
        vestido: 200,
        abrigo: 350,
        camisa: 90
      },
      novia: {
        vestido: 800,
        tocado: 150,
        velo: 200,
        accesorios: 100
      },
      hogar: {
        cortinas: 25,
        cojines: 15,
        manteleria: 35,
        tapiceria: 60
      }
    };

    // Complexity multipliers
    const complexityMultipliers = {
      simple: 0.8,
      medium: 1,
      complex: 1.5
    };

    // Express service fee (percentage increase)
    const expressFee = 1.3; // 30% increase

    // Calculate price if all required fields are filled
    if (serviceType && itemType && basePrices[serviceType] && basePrices[serviceType][itemType]) {
      let price = basePrices[serviceType][itemType];
      
      // Apply complexity multiplier
      price = price * complexityMultipliers[complexity];
      
      // Apply quantity
      price = price * quantity;
      
      // Apply express fee if selected
      if (express) {
        price = price * expressFee;
      }
      
      // Round to 2 decimal places
      price = Math.round(price * 100) / 100;
      
      setCalculatorState({
        ...calculatorState,
        estimatedPrice: price
      });
    }
  };

  // Price data
  const pricingData = {
    arreglos: [
      { service: 'Dobladillo de pantalón simple', price: '10-15€' },
      { service: 'Dobladillo de pantalón con original', price: '15-20€' },
      { service: 'Ajuste de cintura en pantalón', price: '15-25€' },
      { service: 'Ajuste de cintura en falda', price: '15-20€' },
      { service: 'Dobladillo de falda simple', price: '12-18€' },
      { service: 'Dobladillo de falda con pliegues', price: '20-30€' },
      { service: 'Cambio de cremallera en falda/pantalón', price: '15-25€' },
      { service: 'Cambio de cremallera en vestido', price: '25-40€' },
      { service: 'Arreglo de mangas chaqueta/abrigo', price: '25-40€' },
      { service: 'Ajuste de costados en camisa', price: '18-25€' }
    ],
    confeccion: [
      { service: 'Camisa a medida (tela cliente)', price: '80-120€' },
      { service: 'Camisa a medida (tela nuestra)', price: '120-200€' },
      { service: 'Pantalón a medida (tela cliente)', price: '100-150€' },
      { service: 'Pantalón a medida (tela nuestra)', price: '150-250€' },
      { service: 'Falda a medida (tela cliente)', price: '90-130€' },
      { service: 'Falda a medida (tela nuestra)', price: '130-200€' },
      { service: 'Vestido de fiesta (tela cliente)', price: '180-300€' },
      { service: 'Vestido de fiesta (tela nuestra)', price: '250-500€' },
      { service: 'Traje dos piezas (tela cliente)', price: '300-500€' },
      { service: 'Traje dos piezas (tela nuestra)', price: '500-800€' }
    ],
    novia: [
      { service: 'Vestido de novia a medida', price: 'desde 800€' },
      { service: 'Vestido de novia alta costura', price: 'desde 1500€' },
      { service: 'Transformación de vestido heredado', price: '400-800€' },
      { service: 'Velo personalizado', price: '150-300€' },
      { service: 'Tocado artesanal', price: '100-250€' },
      { service: 'Vestido de madrina', price: 'desde 350€' },
      { service: 'Vestido de dama de honor', price: 'desde 200€' },
      { service: 'Arreglos vestido de novia', price: '150-400€' },
      { service: 'Pruebas y ajustes', price: 'incluidas' },
      { service: 'Conservación de vestido', price: '80-150€' }
    ],
    hogar: [
      { service: 'Cortinas a medida (metro lineal)', price: '25-50€' },
      { service: 'Confección de cojines', price: '15-30€/ud' },
      { service: 'Confección de funda para sofá', price: 'desde 250€' },
      { service: 'Confección de colcha', price: 'desde 120€' },
      { service: 'Confección de mantelería', price: 'desde 35€/m²' },
      { service: 'Tapizado de sillas (sin material)', price: '40-80€/ud' },
      { service: 'Estores a medida', price: '60-120€/ud' },
      { service: 'Confección de fundas para sillas', price: '30-50€/ud' },
      { service: 'Cubre radiadores textiles', price: 'desde 80€' },
      { service: 'Cabeceros tapizados', price: 'desde 150€' }
    ]
  };

  // Service categories
  const serviceCategories = [
    { id: 'arreglos', name: 'Arreglos y Transformaciones' },
    { id: 'confeccion', name: 'Confección a Medida' },
    { id: 'novia', name: 'Novia e Invitada' },
    { id: 'hogar', name: 'Textil Hogar' }
  ];

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="pricing-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Precios</h1>
            <p>
              Descubre nuestras tarifas para los diferentes servicios que ofrecemos. 
              Todos nuestros precios son orientativos y pueden variar según las 
              necesidades específicas de cada proyecto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section className="calculator-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Calculadora de Presupuesto</h2>
            <p className="section-subtitle">
              Obtén una estimación rápida del coste de tu proyecto
            </p>
          </motion.div>

          <motion.div 
            className="calculator-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
          >
            <div className="calculator-form">
              <div className="calculator-row">
                <div className="calculator-group">
                  <label htmlFor="serviceType">Tipo de Servicio</label>
                  <select 
                    id="serviceType" 
                    name="serviceType" 
                    value={calculatorState.serviceType}
                    onChange={handleCalculatorChange}
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="arreglos">Arreglos y Transformaciones</option>
                    <option value="confeccion">Confección a Medida</option>
                    <option value="novia">Novia e Invitada</option>
                    <option value="hogar">Textil Hogar</option>
                  </select>
                </div>

                <div className="calculator-group">
                  <label htmlFor="itemType">Tipo de Prenda</label>
                  <select 
                    id="itemType" 
                    name="itemType" 
                    value={calculatorState.itemType}
                    onChange={handleCalculatorChange}
                    required
                    disabled={!calculatorState.serviceType}
                  >
                    <option value="">Selecciona una prenda</option>
                    {calculatorState.serviceType === 'arreglos' && (
                      <>
                        <option value="pantalon">Pantalón</option>
                        <option value="falda">Falda</option>
                        <option value="vestido">Vestido</option>
                        <option value="abrigo">Abrigo/Chaqueta</option>
                        <option value="camisa">Camisa/Blusa</option>
                      </>
                    )}
                    {calculatorState.serviceType === 'confeccion' && (
                      <>
                        <option value="pantalon">Pantalón</option>
                        <option value="falda">Falda</option>
                        <option value="vestido">Vestido</option>
                        <option value="abrigo">Abrigo/Chaqueta</option>
                        <option value="camisa">Camisa/Blusa</option>
                      </>
                    )}
                    {calculatorState.serviceType === 'novia' && (
                      <>
                        <option value="vestido">Vestido de Novia</option>
                        <option value="tocado">Tocado</option>
                        <option value="velo">Velo</option>
                        <option value="accesorios">Accesorios</option>
                      </>
                    )}
                    {calculatorState.serviceType === 'hogar' && (
                      <>
                        <option value="cortinas">Cortinas</option>
                        <option value="cojines">Cojines</option>
                        <option value="manteleria">Mantelería</option>
                        <option value="tapiceria">Tapicería</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="calculator-row">
                <div className="calculator-group">
                  <label htmlFor="complexity">Complejidad</label>
                  <select 
                    id="complexity" 
                    name="complexity" 
                    value={calculatorState.complexity}
                    onChange={handleCalculatorChange}
                  >
                    <option value="simple">Simple</option>
                    <option value="medium">Media</option>
                    <option value="complex">Compleja</option>
                  </select>
                </div>

                <div className="calculator-group">
                  <label htmlFor="quantity">Cantidad</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    min="1" 
                    max="100"
                    value={calculatorState.quantity}
                    onChange={handleCalculatorChange}
                  />
                </div>
              </div>

              <div className="calculator-checkbox">
                <input 
                  type="checkbox" 
                  id="express" 
                  name="express"
                  checked={calculatorState.express}
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="express">Servicio Express (+30%)</label>
              </div>

              <div className="calculator-submit">
                <Button 
                  type="secondary" 
                  onClick={calculatePrice}
                  disabled={!calculatorState.serviceType || !calculatorState.itemType}
                >
                  Calcular Presupuesto
                </Button>
              </div>
            </div>

            <div className="calculator-result">
              <h3>Presupuesto Estimado</h3>
              {calculatorState.estimatedPrice !== null ? (
                <div className="price-result">
                  <span className="price-amount">{calculatorState.estimatedPrice}€</span>
                  <p className="price-note">
                    Este es un precio orientativo. Para un presupuesto exacto, 
                    contacta con nosotros o visita nuestro taller.
                  </p>
                  <Button to="/contacto" type="primary">Solicitar Presupuesto Exacto</Button>
                </div>
              ) : (
                <p className="empty-result">
                  Completa el formulario y haz clic en "Calcular Presupuesto" 
                  para obtener una estimación de precio.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Price Lists Section */}
      <section className="price-lists-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Lista de Precios</h2>
            <p className="section-subtitle">
              Precios orientativos para nuestros servicios más habituales
            </p>
          </motion.div>

          <div className="pricing-tabs">
            <div className="tabs-header">
              {serviceCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  className={`tab-btn ${index === 0 ? 'active' : ''}`}
                  data-target={category.id}
                  onClick={(e) => {
                    // Toggle active class on tabs
                    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // Show corresponding tab content
                    document.querySelectorAll('.price-table').forEach(table => table.classList.remove('active'));
                    document.getElementById(`price-table-${category.id}`).classList.add('active');
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{...fadeInUp, transition: { duration: 0.6, delay: index * 0.1 }}}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            <div className="tabs-content">
              {serviceCategories.map((category, index) => (
                <div 
                  key={category.id}
                  id={`price-table-${category.id}`}
                  className={`price-table ${index === 0 ? 'active' : ''}`}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Servicio</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingData[category.id].map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td>{item.service}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Ofertas Especiales</h2>
            <p className="section-subtitle">
              Descuentos y promociones exclusivas
            </p>
          </motion.div>

          <div className="offers-grid">
            <motion.div 
              className="offer-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="offer-badge">10% Descuento</div>
              <h3>Pack Familiar</h3>
              <p>
                Trae 3 o más prendas de diferentes miembros de la familia para arreglos 
                y recibe un 10% de descuento en el total.
              </p>
              <Button to="/contacto" type="outline">Solicitar</Button>
            </motion.div>

            <motion.div 
              className="offer-card featured"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.1 }}}
            >
              <div className="offer-badge">15% Descuento</div>
              <h3>Novias 2025</h3>
              <p>
                Reserva la confección de tu vestido de novia con 6 meses de antelación 
                y obtén un 15% de descuento en complementos.
              </p>
              <Button to="/contacto" type="secondary">Reservar Ahora</Button>
            </motion.div>

            <motion.div 
              className="offer-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <div className="offer-badge">2x1</div>
              <h3>Clases de Patronaje</h3>
              <p>
                Al inscribirte en nuestras clases de patronaje, trae a un amigo/a 
                y paga sólo una matrícula.
              </p>
              <Button to="/contacto#clases" type="outline">Informarme</Button>
            </motion.div>
          </div>

          <motion.div 
            className="offers-note text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.3 }}}
          >
            <p>
              * Las ofertas no son acumulables entre sí ni con otras promociones. 
              Consulta condiciones específicas en nuestro taller.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="payment-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Métodos de Pago</h2>
            <p className="section-subtitle">
              Ofrecemos diversas formas de pago para tu comodidad
            </p>
          </motion.div>

          <div className="payment-methods">
            <motion.div 
              className="payment-method"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="payment-icon">
                <i className="fas fa-credit-card"></i>
              </div>
              <h3>Tarjeta de Crédito/Débito</h3>
              <p>Aceptamos las principales tarjetas: Visa, Mastercard, American Express</p>
            </motion.div>

            <motion.div 
              className="payment-method"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.1 }}}
            >
              <div className="payment-icon">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <h3>Efectivo</h3>
              <p>Pago en efectivo disponible en nuestro taller</p>
            </motion.div>

            <motion.div 
              className="payment-method"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <div className="payment-icon">
                <i className="fas fa-university"></i>
              </div>
              <h3>Transferencia Bancaria</h3>
              <p>Te facilitamos nuestros datos bancarios para pagos mediante transferencia</p>
            </motion.div>

            <motion.div 
              className="payment-method"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.3 }}}
            >
              <div className="payment-icon">
                <i className="fab fa-paypal"></i>
              </div>
              <h3>PayPal</h3>
              <p>Para pagos online a distancia con total seguridad</p>
            </motion.div>
          </div>

          <motion.div 
            className="payment-policy text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.4 }}}
          >
            <h3>Política de Pagos</h3>
            <ul className="policy-list">
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Para confecciones a medida: 50% de señal al inicio y 50% a la entrega</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Para arreglos: pago completo a la recogida</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Para vestidos de novia: 30% al inicio, 40% en primera prueba, 30% a la entrega</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Posibilidad de fraccionar pagos para proyectos de gran envergadura</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section pricing-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2>¿Necesitas un presupuesto personalizado?</h2>
            <p>
              Contáctanos para recibir un presupuesto detallado adaptado a tus 
              necesidades específicas. Nuestro equipo estará encantado de ayudarte.
            </p>
            <div className="cta-buttons">
              <Button to="/contacto" size="large">Contactar Ahora</Button>
              <Button to="/galeria" type="outline" size="large">Ver Galería de Trabajos</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
