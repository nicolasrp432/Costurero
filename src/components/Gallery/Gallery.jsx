import React, { useEffect, useState } from 'react';
import { fetchGalleryImages } from '../../services/galleryService';
import useGalleryStore from '../../services/galleryStore';
import './Gallery.css';

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

function Gallery({ initialCategory = 'all' }) {
  const items = useGalleryStore(state => state.items);
  const setItems = useGalleryStore(state => state.setItems);
  const activeCategory = useGalleryStore(state => state.activeCategory);
  const setActiveCategory = useGalleryStore(state => state.setActiveCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (items.length > 0 && activeCategory === initialCategory) {
      setLoading(false);
      return;
    }
    fetchGalleryImages(activeCategory)
      .then(setItems)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCategory, items.length, initialCategory, setItems]);

  // Modal handlers
  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="gallery-component">
      {/* Filtro de categorías */}
      <div className="gallery-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Galería */}
      {loading && <div>Cargando imágenes...</div>}
      {error && <div>Error: {error}</div>}
      <div className="gallery-grid">
        {items.map(item => (
          <div key={item.id} className="gallery-item" onClick={() => openModal(item)}>
            <div className="gallery-item-image">
              <picture>
                <source srcSet={item.image.replace('.png', '.webp')} type="image/webp" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  onError={e => { e.target.onerror = null; e.target.src = '/images/novivas.webp'; }}
                />
              </picture>
              <div className="gallery-item-overlay">
                <span>Ver detalles</span>
              </div>
            </div>
            <div className="gallery-item-info">
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      {selectedItem && (
        <div className="gallery-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-image">
              <picture>
                <source srcSet={selectedItem.image.replace('.png', '.webp')} type="image/webp" />
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  loading="lazy"
                  onError={e => { e.target.onerror = null; e.target.src = '/images/novivas.webp'; }}
                />
              </picture>
            </div>
            <div className="modal-details">
              <h2>{selectedItem.title}</h2>
              <span className="modal-category">{selectedItem.category}</span>
              <p>{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
