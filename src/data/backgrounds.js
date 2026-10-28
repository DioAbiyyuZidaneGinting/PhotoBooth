/**
 * Daftar Gambar Background Foto dari folder:
 * template/background foto/
 */

export const PHOTO_BACKGROUNDS = [
  {
    id: 'design1',
    name: 'Ocean Studio Blue',
    image: '/backgrounds/design1.png',
    thumbnail: '/backgrounds/design1.png',
    description: 'Latar biru studio elegan (design1.png)'
  },
  {
    id: 'design2',
    name: 'Crimson Velvet',
    image: '/backgrounds/design2.png',
    thumbnail: '/backgrounds/design2.png',
    description: 'Latar merah atmosferik (design2.png)'
  },
  {
    id: 'none',
    name: 'Kamera Asli',
    image: null,
    thumbnail: null,
    description: 'Tanpa penggantian latar'
  }
];

export const DEFAULT_BACKGROUND_ID = 'design1';

export function getBackgroundById(id) {
  return PHOTO_BACKGROUNDS.find(bg => bg.id === id) || PHOTO_BACKGROUNDS[0];
}
