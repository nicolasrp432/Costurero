import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { googleConfig, getGoogleMapsUrl } from '../../config/googleConfig';
import './GoogleMap.css';

// Variable global para evitar múltiples cargas
let googleMapsLoaded = false;
let googleMapsLoading = false;
let loadPromise = null;

const GoogleMap = () => {
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    // Función para cargar el mapa de Google
    const loadGoogleMap = () => {
      try {
        if (window.google && window.google.maps && mapRef.current) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { 
              lat: googleConfig.DEFAULT_LOCATION.lat, 
              lng: googleConfig.DEFAULT_LOCATION.lng 
            },
            zoom: googleConfig.MAP_CONFIG.zoom,
            mapId: googleConfig.MAP_CONFIG.mapId,
            mapTypeControl: false,
            fullscreenControl: true,
            streetViewControl: true,
            zoomControl: true
          });

          // SOLUCIÓN: Usar AdvancedMarkerElement en lugar de Marker deprecado
          let marker;
          if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
            // Usar el nuevo AdvancedMarkerElement
            marker = new window.google.maps.marker.AdvancedMarkerElement({
              position: { 
                lat: googleConfig.DEFAULT_LOCATION.lat, 
                lng: googleConfig.DEFAULT_LOCATION.lng 
              },
              map: map,
              title: 'El Costurero'
            });
          } else {
            // Fallback al Marker tradicional (sin warning)
            marker = new window.google.maps.Marker({
              position: { 
                lat: googleConfig.DEFAULT_LOCATION.lat, 
                lng: googleConfig.DEFAULT_LOCATION.lng 
              },
              map: map,
              title: 'El Costurero',
              animation: window.google.maps.Animation.DROP,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#FFD700" stroke="#FFFFFF" stroke-width="2"/>
                    <path d="M20 8 L20 32 M8 20 L32 20" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(40, 40)
              }
            });
          }

          // Info window con más detalles
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 15px; max-width: 250px; font-family: Arial, sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: #333; font-size: 18px;">El Costurero</h3>
                <p style="margin: 0 0 8px 0; color: #666;">
                  <strong>Dirección:</strong><br/>
                  ${googleConfig.DEFAULT_LOCATION.address}
                </p>
                <p style="margin: 0 0 8px 0; color: #666;">
                  <strong>Horario:</strong><br/>
                  Lun-Vie: 9:00-18:00
                </p>
                <p style="margin: 0; color: #666;">
                  <strong>Teléfono:</strong><br/>
                  +34 123 456 789
                </p>
              </div>
            `
          });

          // Abrir InfoWindow al hacer click en el marcador
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          // Añadir botón de "Cómo llegar"
          const directionsButton = document.createElement('div');
          directionsButton.className = 'directions-button';
          directionsButton.innerHTML = `
            <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination_place_id=${googleConfig.PLACE_ID}&destination=${encodeURIComponent(googleConfig.DEFAULT_LOCATION.address)}', '_blank')">
              <i class="fas fa-directions"></i> Cómo llegar
            </button>
          `;
          map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(directionsButton);
          
          setMapInstance(map);
        }
      } catch (error) {
        console.error('Error al cargar el mapa:', error);
        setMapError(true);
      }
    };

    // SOLUCIÓN MEJORADA: Evitar carga múltiple del script
    const initializeGoogleMaps = async () => {
      // Si ya está cargado, usar directamente
      if (googleMapsLoaded && window.google && window.google.maps) {
        loadGoogleMap();
        return;
      }

      // Si ya se está cargando, esperar a que termine
      if (googleMapsLoading && loadPromise) {
        try {
          await loadPromise;
          loadGoogleMap();
        } catch (error) {
          setMapError(true);
        }
        return;
      }

      // Si no existe el script, crearlo
      const scriptSrc = getGoogleMapsUrl();
      let script = document.querySelector(`script[src*="maps.googleapis.com"]`);

      if (!script) {
        googleMapsLoading = true;
        script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;
        script.defer = true;
        
        loadPromise = new Promise((resolve, reject) => {
          script.onload = () => {
            googleMapsLoaded = true;
            googleMapsLoading = false;
            resolve();
          };
          script.onerror = () => {
            googleMapsLoading = false;
            reject(new Error('Failed to load Google Maps'));
          };
        });

        document.head.appendChild(script);
        
        try {
          await loadPromise;
          loadGoogleMap();
        } catch (error) {
          console.warn('Error al cargar Google Maps API:', error);
          setMapError(true);
        }
      } else {
        // El script ya existe, verificar si está cargado
        if (window.google && window.google.maps) {
          googleMapsLoaded = true;
          loadGoogleMap();
        } else {
          // Esperar a que el script existente termine de cargar
          script.addEventListener('load', () => {
            googleMapsLoaded = true;
            loadGoogleMap();
          });
          script.addEventListener('error', () => {
            setMapError(true);
          });
        }
      }
    };

    initializeGoogleMaps();

    // Cleanup
    return () => {
      if (mapInstance) {
        // Limpiar listeners del mapa si es necesario
        window.google?.maps?.event?.clearInstanceListeners?.(mapInstance);
      }
    };
  }, []);

  return (
    <section className="google-map-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Encuéntranos</h2>
          <p className="section-subtitle">
            Visítanos en nuestro taller y descubre todo lo que podemos hacer por ti
          </p>
        </div>

        <motion.div 
          className="map-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="map-header">
            <h3>Nuestra Ubicación</h3>
            <p>📍 {googleConfig.DEFAULT_LOCATION.address}</p>
          </div>
          <div ref={mapRef} className="google-map">
            {mapError && (
              <div className="map-error">
                <i className="fas fa-map-marker-alt"></i>
                <p>Error al cargar el mapa</p>
                <p>Verifica tu conexión a internet</p>
              </div>
            )}
          </div>
          <div className="map-info">
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <span>Lun-Vie: 9:00-18:00</span>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <span>+34 123 456 789</span>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <span>info@elcosturero.com</span>
            </div>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Zona centro, fácil acceso</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleMap;