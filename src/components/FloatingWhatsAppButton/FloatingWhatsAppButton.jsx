import React from 'react';
import './FloatingWhatsAppButton.css';

const whatsappNumber = '5491123456789'; // Cambia este número por el tuyo
const message = '¡Hola! Quiero hacer una consulta.';

const FloatingWhatsAppButton = () => {
  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button className="floating-whatsapp-button" onClick={handleClick} aria-label="WhatsApp">
      <i className="fab fa-whatsapp" style={{ fontSize: 32, color: 'white' }}></i>
    </button>
  );
};

export default FloatingWhatsAppButton; 