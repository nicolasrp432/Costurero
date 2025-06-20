import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { functions, storage } from '../../config/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Button from '../Button/Button';
import './ContactForm.css';

// Switch para controlar los destinos del formulario
const FORM_DESTINATIONS = {
  firebase: false,      // Enviar a Cloud Function (base de datos y correo)
  formsubmit: true     // Enviar a FormSubmit.co
};

const ContactForm = ({ type = 'general' }) => {
  const fileInputRef = useRef(null);
  
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
    orderNumber: '',
    urgency: 'normal',
    attachments: []
  });
  
  // Form status
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: '',
    uploadProgress: 0
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file upload
  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;

    setFormStatus(prev => ({
      ...prev,
      message: 'Subiendo archivos...'
    }));

    const uploadedUrls = [];

    try {
      for (let file of files) {
        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setFormStatus(prev => ({
            ...prev,
            error: true,
            message: 'Los archivos no deben superar los 5MB'
          }));
          return;
        }

        // Validar tipo de archivo
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
          setFormStatus(prev => ({
            ...prev,
            error: true,
            message: 'Tipo de archivo no permitido. Solo se permiten imágenes (JPG, PNG, GIF) y PDFs'
          }));
          return;
        }

        try {
          const fileRef = ref(storage, `form-attachments/${Date.now()}-${file.name}`);
          await uploadBytes(fileRef, file);
          const url = await getDownloadURL(fileRef);
          uploadedUrls.push(url);
        } catch (uploadError) {
          console.warn('Error uploading file:', uploadError);
          // Continue with other files even if one fails
        }
      }

      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...uploadedUrls]
      }));

      setFormStatus(prev => ({
        ...prev,
        message: ''
      }));

    } catch (error) {
      console.error('Error in file upload:', error);
      setFormStatus(prev => ({
        ...prev,
        error: true,
        message: 'Error al subir archivos. Puedes continuar sin archivos adjuntos.'
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: 'Enviando formulario...'
    });

    try {
      let firebaseResult = { data: { success: false } };
      // 1. Enviar a Firebase (Cloud Function)
      if (FORM_DESTINATIONS.firebase) {
        try {
          console.log('Sending to Firebase...');
          const handleContactForm = httpsCallable(functions, 'handleContactForm');
          firebaseResult = await handleContactForm({
            ...formData,
            type,
            submittedAt: new Date().toISOString()
          });
          console.log('Firebase result:', firebaseResult);
        } catch (firebaseError) {
          console.warn('Error enviando a Firebase:', firebaseError);
        }
      }

      // 2. Enviar a FormSubmit.co (no bloqueante)
      if (FORM_DESTINATIONS.formsubmit) {
        try {
          console.log('Sending to FormSubmit.co...');
          const formSubmitEmail = 'nicolasrp432@gmail.com';
          const formSubmitData = new FormData();
          Object.keys(formData).forEach(key => {
            if (key !== 'attachments') {
              formSubmitData.append(key, formData[key]);
            }
          });
          formSubmitData.append('formType', type);
          fetch(`https://formsubmit.co/${formSubmitEmail}`, {
            method: 'POST',
            body: formSubmitData
          }).then(() => {
            console.log('FormSubmit.co request sent successfully');
          }).catch((formSubmitError) => {
            console.warn('FormSubmit.co failed, but continuing:', formSubmitError);
          });
        } catch (formSubmitError) {
          console.warn('Error enviando a FormSubmit.co:', formSubmitError);
        }
      }

      // Si Firebase fue exitoso (o si solo se usa FormSubmit)
      if ((FORM_DESTINATIONS.firebase && firebaseResult.data.success) || (!FORM_DESTINATIONS.firebase && FORM_DESTINATIONS.formsubmit)) {
        setFormStatus({
          submitting: false,
          success: true,
          error: false,
          message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo a la mayor brevedad.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          serviceType: '',
          preferredDate: '',
          preferredTime: '',
          orderNumber: '',
          urgency: 'normal',
          attachments: []
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setTimeout(() => {
          setFormStatus({
            submitting: false,
            success: false,
            error: false,
            message: '',
            uploadProgress: 0
          });
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.'
      });
    }
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

        {/* Urgency Field */}
        <div className="form-group">
          <label htmlFor="urgency">Nivel de Urgencia</label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            disabled={formStatus.submitting}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgente</option>
            <option value="very-urgent">Muy Urgente</option>
          </select>
        </div>

        {/* File Upload Field */}
        <div className="form-group">
          <label htmlFor="attachments">
            Adjuntar Archivos (máx. 5MB por archivo)
          </label>
          <input
            type="file"
            id="attachments"
            ref={fileInputRef}
            multiple
            accept="image/*,application/pdf"
            onChange={(e) => handleFileUpload(e.target.files)}
            disabled={formStatus.submitting}
          />
          <small className="file-info">
            Formatos permitidos: JPG, PNG, GIF, PDF
          </small>
        </div>

        {/* Display attached files */}
        {formData.attachments.length > 0 && (
          <div className="attached-files">
            <p>Archivos adjuntos:</p>
            <ul>
              {formData.attachments.map((url, index) => (
                <li key={index}>
                  Archivo {index + 1}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        attachments: prev.attachments.filter((_, i) => i !== index)
                      }));
                    }}
                    disabled={formStatus.submitting}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
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
