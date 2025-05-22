import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';

// Este array de datos será reemplazado por datos reales de una API o base de datos
const galleryItems = [
  {
    id: 1,
    category: 'arreglos',
    title: 'Transformación de Vestido',
    description: 'Transformación completa de un vestido vintage adaptándolo a un estilo más moderno.',
    image: '/images/gallery/arreglos-1.jpg'
  },
  {
    id: 2,
    category: 'confeccion',
    title: 'Traje a Medida',
    description: 'Traje de chaqueta confeccionado a medida en lana 100% virgen.',
    image: '/images/gallery/confeccion-1.jpg'
  },
  {
    id: 3,
    category: 'novia',
    title: 'Vestido de Novia',
    description: 'Diseño exclusivo de vestido de novia con bordados artesanales y pedrería.',
    image: '/images/gallery/novia-1.jpg'
  },
  {
    id: 4,
    category: 'abrigos',
    title: 'Restauración de Abrigo',
    description: 'Restauración y modernización de un abrigo de piel vintage.',
    image: '/images/gallery/abrigos-1.jpg'
  },
  {
    id: 5,
    category: 'uniformes',
    title: 'Uniformes Corporativos',
    description: 'Conjunto de uniformes corporativos para restaurante de alta cocina.',
    image: '/images/gallery/uniformes-1.jpg'
  },
  {
    id: 6,
    category: 'fiesta',
    title: 'Vestido de Gala',
    description: 'Diseño y confección de vestido de gala en seda natural con apliques de pedrería.',
    image: '/images/gallery/fiesta-1.jpg'
  },
  {
    id: 7,
    category: 'hogar',
    title: 'Cortinas a Medida',
    description: 'Cortinas de lino natural confeccionadas a medida para salón.',
    image: '/images/gallery/hogar-1.jpg'
  },
  {
    id: 8,
    category: 'arreglos',
    title: 'Ajuste de Traje',
    description: 'Ajuste completo de un traje de hombre heredado.',
    image: '/images/gallery/arreglos-2.jpg'
  },
  {
    id: 9,
    category: 'confeccion',
    title: 'Camisa a Medida',
    description: 'Camisa de algodón egipcio confeccionada a medida con puños especiales.',
    image: '/images/gallery/confeccion-2.jpg'
  },
  {
    id: 10,
    category: 'novia',
    title: 'Tocado de Novia',
    description: 'Tocado artesanal para novia con flores de seda y cristales.',
    image: '/images/gallery/novia-2.jpg'
  },
  {
    id: 11,
    category: 'fiesta',
    title: 'Vestido de Madrina',
    description: 'Conjunto de madrina en seda salvaje con chaqueta a juego.',
    image: '/images/gallery/fiesta-2.jpg'
  },
  {
    id: 12,
    category: 'hogar',
    title: 'Cojines Decorativos',
    description: 'Colección de cojines decorativos en diferentes texturas y acabados.',
    image: '/images/gallery/hogar-2.jpg'
  }
];

const Gallery = ({ initialCategory = 'all' }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Categories for the filter
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'arreglos', name: 'Arreglos' },
    { id: 'confeccion', name: 'Confección' },
    { id: 'novia', name: 'Novia' },
    { id: 'abrigos', name: 'Abrigos' },
    { id: 'uniformes', name: 'Uniformes' },
    { id: 'fiesta', name: 'Fiesta' },
    { id: 'hogar', name: 'Hogar' }
  ];

  // Filter items when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Open item modal
  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close item modal
  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto'; // Allow scrolling again
  };

  return (
    <div className="gallery-component">
      {/* Category Filter */}
      <div className="gallery-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div 
        className="gallery-grid"
        layout
      >
        <AnimatePresence>
          {filteredItems.map(item => (
            <motion.div
              layout
              key={item.id}
              className="gallery-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => openModal(item)}
            >
              <div className="gallery-item-image">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x400?text=Imagen+no+disponible';
                  }}
                />
                <div className="gallery-item-overlay">
                  <span>Ver detalles</span>
                </div>
              </div>
              <div className="gallery-item-info">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-overlay" onClick={closeModal}></div>
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-image">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
                  }}
                />
              </div>
              <div className="modal-details">
                <h2>{selectedItem.title}</h2>
                <span className="modal-category">{categories.find(cat => cat.id === selectedItem.category)?.name}</span>
                <p>{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
