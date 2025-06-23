# Costurero - Tienda de Costura Online

[Repositorio en GitHub](https://github.com/nicolasrp432/Costurero)

## Descripción
Costurero es una tienda de costura online moderna, diseñada para ofrecer servicios de confección, arreglos, vestidos de novia, uniformes y más. El proyecto incluye una galería dinámica de imágenes, formulario de contacto avanzado, integración con APIs públicas y un sistema de mock para facilitar el desarrollo y las pruebas.

## Características principales
- Galería de imágenes dinámica por categorías (API Unsplash o datos mock)
- Filtro de categorías y modal de detalles para cada imagen
- Formulario de contacto avanzado con validaciones, subida de archivos y doble destino (Firebase y FormSubmit)
- Sistema de variables de entorno para claves y configuración
- Sistema de mock para desarrollo sin depender de APIs externas
- Estilos modernos y responsivos

## Tecnologías utilizadas
- React
- Vite
- Firebase (Cloud Functions, Storage)
- Unsplash API
- Vitest + React Testing Library (tests unitarios)
- CSS personalizado

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/nicolasrp432/Costurero.git
   cd Costurero
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz con tus claves y configuración:
     ```env
     VITE_UNSPLASH_ACCESS_KEY=tu_clave_unsplash
     VITE_USE_MOCK_GALLERY=false
     # Otras variables necesarias para Firebase, etc.
     ```

## Uso
- Inicia el servidor de desarrollo:
  ```bash
  npm run dev
  ```
- Accede a la app en [http://localhost:5173](http://localhost:5173) (o el puerto que indique Vite).

## Testing
- Ejecuta los tests unitarios con:
  ```bash
  npm run test
  ```
- Los tests están ubicados en `src/tests/` y usan Vitest + React Testing Library.

## Despliegue
- Genera la versión de producción con:
  ```bash
  npm run build
  ```
- El contenido listo para producción estará en la carpeta `dist/`.

## Contribuir
1. Haz un fork del repositorio
2. Crea una rama para tu feature o fix: `git checkout -b mi-feature`
3. Realiza tus cambios y haz commit: `git commit -m "Descripción del cambio"`
4. Haz push a tu rama: `git push origin mi-feature`
5. Abre un Pull Request en GitHub


**Desarrollado por [nicolasrp432](https://github.com/nicolasrp432) y colaboradores.**
