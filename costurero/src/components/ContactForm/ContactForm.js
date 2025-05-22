import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import './ContactForm.css';

const ContactForm = ({ type = 'general' }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    orderNumber: ''
  });
  
  // Form status
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set form to submitting state
    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: ''
    });

    // Simulate form submission with a delay
    // In a real application, this would be replaced with an actual API call
    setTimeout(() => {
      // Simulate successful submission
      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo a la mayor brevedad.'
      });

      // Clear form data on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: '',
        preferredDate: '',
        preferredTime: '',
        orderNumber: ''
      });

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitting: false,
          success: false,
          error: false,
          message: ''
        });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-form-container">
      {/* Display success message */}
      {formStatus.success && (
        <motion.div 
          className="form-success-message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fas fa-check-circle"></i>
          <p>{formStatus.message}</p>
        </motion.div>
      )}

      {/* Display error message */}
      {formStatus.error && (
        <motion.div 
          className="form-error-message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fas fa-exclamation-circle"></i>
          <p>{formStatus.message}</p>
        </motion.div>
      )}

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Basic Information Fields */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nombre Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"
              disabled={formStatus.submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Tu dirección de email"
              disabled={formStatus.submitting}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Tu número de teléfono"
              disabled={formStatus.submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Asunto *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Asunto de tu mensaje"
              disabled={formStatus.submitting}
            />
          </div>
        </div>

        {/* Appointment Fields (only shown for appointment forms) */}
        {type === 'appointment' && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="serviceType">Tipo de Servicio *</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  disabled={formStatus.submitting}
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="arreglos">Arreglos y Transformaciones</option>
                  <option value="confeccion">Confección a Medida</option>
                  <option value="novia">Novia e Invitada</option>
                  <option value="abrigos">Abrigos de Piel</option>
                  <option value="uniformes">Uniformes y Batas</option>
                  <option value="fiesta">Trajes de Fiesta</option>
                  <option value="hogar">Textil Hogar</option>
                  <option value="clases">Clases de Patronaje</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="preferredDate">Fecha Preferida *</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  disabled={formStatus.submitting}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredTime">Hora Preferida *</label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                  disabled={formStatus.submitting}
                >
                  <option value="">Selecciona una hora</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="specialRequirements">Requisitos Especiales</label>
                <input
                  type="text"
                  id="specialRequirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  placeholder="¿Alguna necesidad especial?"
                  disabled={formStatus.submitting}
                />
              </div>
            </div>
          </>
        )}

        {/* Order Tracking Fields (only shown for tracking forms) */}
        {type === 'tracking' && (
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="orderNumber">Número de Pedido *</label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                required
                placeholder="Introduce tu número de pedido o referencia"
                disabled={formStatus.submitting}
              />
            </div>
          </div>
        )}

        {/* Message Field */}
        <div className="form-group full-width">
          <label htmlFor="message">Mensaje *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tu mensaje..."
            rows="5"
            disabled={formStatus.submitting}
          ></textarea>
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="form-group form-checkbox">
          <input 
            type="checkbox" 
            id="privacyPolicy" 
            required
            disabled={formStatus.submitting}
          />
          <label htmlFor="privacyPolicy">
            He leído y acepto la <a href="/privacidad" target="_blank" rel="noopener noreferrer">Política de Privacidad</a> *
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-submit">
          <Button 
            type={formStatus.submitting ? "disabled" : "secondary"}
            disabled={formStatus.submitting}
          >
            {formStatus.submitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Enviando...
              </>
            ) : type === 'appointment' ? (
              'Solicitar Cita'
            ) : type === 'tracking' ? (
              'Consultar Estado'
            ) : (
              'Enviar Mensaje'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
