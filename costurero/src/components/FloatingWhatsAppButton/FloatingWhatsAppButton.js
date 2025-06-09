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
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#25D366"/>
        <path d="M23.5 20.5C22.8333 20.5 21.5 20.5 20.5 19.5C19.5 18.5 19.5 17.8333 19.5 17.5C19.5 17.1667 20.5 16.5 20.5 15.5C20.5 14.5 19.5 13.5 18.5 13.5C17.5 13.5 16.5 14.5 16.5 15.5C16.5 16.5 17.5 17.5 18.5 17.5C19.5 17.5 20.5 16.5 20.5 15.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

export default FloatingWhatsAppButton; 