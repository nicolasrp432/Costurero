# 🗺️ Configuración de Google Maps y Reseñas de Google

Este documento te guía paso a paso para configurar Google Maps y las reseñas de Google en tu proyecto "El Costurero".

## 📋 Requisitos Previos

- Una cuenta de Google
- Un proyecto en Google Cloud Console
- API keys de Google Maps y Google Places

## 🚀 Configuración Paso a Paso

### 1. Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la facturación (requerido para usar las APIs)

### 2. Habilitar las APIs Necesarias

En Google Cloud Console, habilita las siguientes APIs:

- **Maps JavaScript API** - Para mostrar el mapa
- **Places API** - Para obtener reseñas de Google (opcional)
- **Geocoding API** - Para convertir direcciones en coordenadas

### 3. Crear API Keys

1. Ve a "Credenciales" en el menú lateral
2. Haz clic en "Crear credenciales" → "Clave de API"
3. Crea dos claves separadas:
   - Una para Maps JavaScript API
   - Otra para Places API (si planeas usar reseñas dinámicas)

### 4. Configurar Restricciones de API Keys

**IMPORTANTE**: Configura restricciones para proteger tus API keys:

1. **Restricción de aplicaciones**: Solo tu dominio
2. **Restricción de APIs**: Solo las APIs que necesitas
3. **Cuotas**: Establece límites de uso

### 5. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz de tu proyecto:

```env
# Google Maps API Key
REACT_APP_GOOGLE_MAPS_API_KEY=tu_api_key_de_maps_aqui

# Google Places API Key (opcional)
REACT_APP_GOOGLE_PLACES_API_KEY=tu_api_key_de_places_aqui

# Google Place ID (opcional, para reseñas dinámicas)
REACT_APP_GOOGLE_PLACE_ID=tu_place_id_aqui
```

### 6. Personalizar la Configuración

Edita el archivo `src/config/googleConfig.js`:

```javascript
export const googleConfig = {
  // Reemplaza con tu API key real
  MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'TU_API_KEY_AQUI',
  
  // Reemplaza con tu ubicación real
  DEFAULT_LOCATION: {
    lat: 40.4168, // Tu latitud
    lng: -3.7038, // Tu longitud
    address: 'Tu dirección real aquí'
  },
  
  // Personaliza el estilo del mapa
  MAP_CONFIG: {
    zoom: 15,
    styles: [
      // Estilos personalizados del mapa
    ]
  }
};
```

### 7. Obtener tu Place ID (Opcional)

Si quieres reseñas dinámicas de Google:

1. Ve a [Google My Business](https://business.google.com/)
2. Encuentra tu negocio
3. Copia el Place ID de la URL o usa la [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)

## 🎯 Uso de los Componentes

### Componente GoogleMap

```jsx
import GoogleMap from './components/GoogleMap/GoogleMap';

// En tu página o componente
<GoogleMap />
```

### Componente Testimonials Mejorado

El componente Testimonials ahora incluye:

- **Pestaña de Testimonios**: Testimonios tradicionales
- **Pestaña de Google Reviews**: Reseñas de Google con diseño mejorado

```jsx
import Testimonials from './components/Testimonials/Testimonials';

// En tu página
<Testimonials />
```

## 🎨 Personalización

### Cambiar el Estilo del Mapa

Edita los estilos en `googleConfig.js`:

```javascript
MAP_CONFIG: {
  zoom: 15,
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]
    },
    // Más estilos personalizados...
  ]
}
```

### Personalizar Colores y Estilos

Los componentes usan variables CSS. Edita `src/styles/globals.css`:

```css
:root {
  --color-gold: #FFD700;
  --color-white: #FFFFFF;
  --color-off-white: #F8F9FA;
  /* Más variables... */
}
```

## 🔧 Funcionalidades Incluidas

### Mapa de Google
- ✅ Mapa interactivo con marcador personalizado
- ✅ Info window con información del negocio
- ✅ Botón "Cómo llegar" integrado
- ✅ Estilos personalizados
- ✅ Manejo de errores de carga

### Reseñas de Google
- ✅ Diseño moderno con gradientes
- ✅ Badges de verificación
- ✅ Estados de carga y error
- ✅ Animaciones suaves
- ✅ Diseño responsive
- ✅ Accesibilidad (reduced motion)

### Testimonials Mejorado
- ✅ Sistema de pestañas
- ✅ Reseñas de Google integradas
- ✅ Animaciones de entrada
- ✅ Autoplay inteligente
- ✅ Navegación por puntos

## 🚨 Solución de Problemas

### Error: "Error al cargar el mapa"

1. Verifica que tu API key sea válida
2. Asegúrate de que Maps JavaScript API esté habilitada
3. Revisa las restricciones de dominio en tu API key

### Error: "No se pudieron obtener las reseñas"

1. Verifica que Places API esté habilitada
2. Asegúrate de que tu Place ID sea correcto
3. Revisa las cuotas de tu API key

### El mapa no se muestra

1. Verifica la consola del navegador para errores
2. Asegúrate de que las variables de entorno estén configuradas
3. Verifica que el archivo `.env` esté en la raíz del proyecto

## 💰 Costos

- **Maps JavaScript API**: Gratis hasta 28,500 cargas por mes
- **Places API**: Gratis hasta 1,000 solicitudes por mes
- **Geocoding API**: Gratis hasta 2,500 solicitudes por mes

## 🔒 Seguridad

- ✅ API keys con restricciones de dominio
- ✅ Variables de entorno para claves sensibles
- ✅ Manejo de errores robusto
- ✅ Fallbacks para cuando las APIs fallan

## 📱 Responsive Design

Los componentes están optimizados para:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## 🎯 Próximos Pasos

1. Configura tus API keys
2. Personaliza la ubicación y estilos
3. Añade el componente a tu página de contacto
4. Prueba en diferentes dispositivos
5. Monitorea el uso de las APIs

## 📞 Soporte

Si tienes problemas:
1. Revisa la [documentación oficial de Google Maps](https://developers.google.com/maps)
2. Verifica la consola del navegador para errores
3. Revisa las cuotas en Google Cloud Console

---

¡Con esta configuración tendrás un mapa profesional y reseñas de Google integradas en tu sitio web! 🎉 