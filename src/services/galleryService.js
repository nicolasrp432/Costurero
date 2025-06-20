import galleryMock from '../mocks/galleryMock.json';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const USE_MOCK_GALLERY = import.meta.env.VITE_USE_MOCK_GALLERY === 'false';

export async function fetchGalleryImages(category) {
  if (USE_MOCK_GALLERY) {
    if (category === 'all' || !category) return galleryMock;
    return galleryMock.filter(item => item.category === category);
  }

  const query = category === 'all' ? 'vestidos costura moda' : category;
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=${ACCESS_KEY}`
  );
  if (!response.ok) throw new Error('Error al obtener imágenes');
  const data = await response.json();
  return data.results.map(img => ({
    id: img.id,
    category,
    title: img.alt_description || 'Imagen',
    description: img.description || '',
    image: img.urls.small
  }));
} 