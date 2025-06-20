# Configuración de Firebase para Reseñas Reales de Google

## 🚀 Pasos para configurar Firebase

### 1. Crear proyecto en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o usa uno existente
3. Habilita **Cloud Functions** en tu proyecto

### 2. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 3. Inicializar Firebase en tu proyecto
```bash
cd costurero
firebase login
firebase init functions
```

### 4. Configurar las credenciales
1. Copia las credenciales de tu proyecto Firebase
2. Actualiza `src/config/firebaseConfig.js` con tus datos:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_REAL",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 5. Desplegar las Functions
```bash
cd firebase-functions
npm install
firebase deploy --only functions
```

### 6. Verificar Place ID
- Asegúrate de que el `PLACE_ID` en `firebase-functions/index.js` sea correcto
- Puedes encontrarlo en Google Maps: busca tu negocio y copia el ID de la URL

## 🔧 Configuración del Mapa

### Estilos del Mapa
El mapa ahora usa el ID de estilos de Google Wizard: `cde37e1afc807cb6f8745a1e`

Si quieres probar otros estilos:
1. Ve a [Google Maps Style Wizard](https://mapstyle.withgoogle.com/)
2. Crea un nuevo estilo
3. Copia el ID y reemplázalo en `src/config/googleConfig.js`

### Estilos predefinidos disponibles:
- `road` - Mapa de carreteras (por defecto)
- `satellite` - Vista satelital
- `hybrid` - Híbrido (satelital + carreteras)
- `terrain` - Terreno

## 📊 Verificar que funciona

### En la consola del navegador verás:
- ✅ "Intentando obtener reseñas reales de Google..."
- ✅ "Reseñas reales obtenidas: X"
- ✅ "Detalles del lugar obtenidos: {...}"

### Si hay errores:
- ⚠️ "No se pudieron obtener reseñas reales, usando por defecto"
- 🔄 "Usando reseñas por defecto..."

## 🛠️ Solución de problemas

### Error: "Functions not found"
- Asegúrate de haber desplegado las functions: `firebase deploy --only functions`

### Error: "API key invalid"
- Verifica que tu API key tenga habilitadas las APIs:
  - Google Maps JavaScript API
  - Google Places API
  - Google Geocoding API

### Error: "Place ID not found"
- Verifica que el Place ID sea correcto
- Asegúrate de que tu negocio esté verificado en Google My Business

## 📱 Próximos pasos

1. **Configurar Firebase** con tus credenciales reales
2. **Desplegar las Functions** en Firebase
3. **Verificar el Place ID** de tu negocio
4. **Probar diferentes estilos** de mapa
5. **Monitorear los logs** en Firebase Console

## 🔗 Enlaces útiles

- [Firebase Console](https://console.firebase.google.com/)
- [Google Maps Style Wizard](https://mapstyle.withgoogle.com/)
- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [Firebase Functions Documentation](https://firebase.google.com/docs/functions) 