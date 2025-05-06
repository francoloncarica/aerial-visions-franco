
export interface PhotoItem {
  id: number;
  url: string;
  alt: string;
  thumbnailUrl?: string;
}

export interface PhotoCategory {
  id: string;
  title: string;
  aspectRatio: string;
  mediaType?: "image" | "video";
  images: PhotoItem[];
}

export const photoCategories: PhotoCategory[] = [
  {
    id: "panorámicas",
    title: "Panorámicas",
    aspectRatio: "aspect-[8192/3262]",
    images: [
      { id: 1, url: "/images/panoramicas/panoramica-1.jpg", alt: "Vista panorámica de valle montañoso" },
      { id: 2, url: "/images/panoramicas/panoramica-2.jpg", alt: "Amanecer sobre las montañas" },
      { id: 3, url: "/images/panoramicas/panoramica-3.jpg", alt: "Cascada entre montañas" },
      { id: 4, url: "/images/panoramicas/panoramica-4.jpg", alt: "Lago entre montañas" },
      { id: 5, url: "/images/panoramicas/panoramica-5.jpg", alt: "Valle verde desde arriba" },
      { id: 6, url: "/images/panoramicas/panoramica-6.jpg", alt: "Ciudad desde las alturas" }
    ]
  },
  {
    id: "verticales",
    title: "Verticales",
    aspectRatio: "aspect-[3328/7936]",
    images: [
      { id: 1, url: "/images/verticales/vertical-1.jpg", alt: "Rascacielos en vertical" },
      { id: 2, url: "/images/verticales/vertical-2.jpg", alt: "Patrón urbano vertical" },
      { id: 3, url: "/images/verticales/vertical-3.jpg", alt: "Cañón profundo" },
      { id: 4, url: "/images/verticales/vertical-4.jpg", alt: "Cascada en vertical" },
      { id: 5, url: "/images/verticales/vertical-5.jpg", alt: "Torres en la ciudad" },
      { id: 6, url: "/images/verticales/vertical-6.jpg", alt: "Perspectiva vertical natural" }
    ]
  },
  {
    id: "inmobiliarias",
    title: "Inmobiliarias",
    aspectRatio: "aspect-video",
    images: [
      { id: 1, url: "/images/inmobiliarias/inmobiliaria-1.jpg", alt: "Mansión con piscina" },
      { id: 2, url: "/images/inmobiliarias/inmobiliaria-2.jpg", alt: "Casa moderna con jardín" },
      { id: 3, url: "/images/inmobiliarias/inmobiliaria-3.jpg", alt: "Propiedad de lujo" },
      { id: 4, url: "/images/inmobiliarias/inmobiliaria-4.jpg", alt: "Complejo residencial" },
      { id: 5, url: "/images/inmobiliarias/inmobiliaria-5.jpg", alt: "Casa contemporánea" },
      { id: 6, url: "/images/inmobiliarias/inmobiliaria-6.jpg", alt: "Villa de lujo" }
    ]
  },
  {
    id: "fotos",
    title: "Fotos",
    aspectRatio: "aspect-square",
    images: [
      { id: 1, url: "/images/fotos/foto-1.jpg", alt: "Vista ciudad desde arriba" },
      { id: 2, url: "/images/fotos/foto-2.jpg", alt: "Geometría urbana" },
      { id: 3, url: "/images/fotos/foto-3.jpg", alt: "Drone en vuelo" },
      { id: 4, url: "/images/fotos/foto-4.jpg", alt: "Playa desde arriba" },
      { id: 5, url: "/images/fotos/foto-5.jpg", alt: "Drone sobre ciudad" },
      { id: 6, url: "/images/fotos/foto-6.jpg", alt: "Carretera sinuosa" }
    ]
  },
  {
    id: "hyperlapses",
    title: "Hyperlapses",
    aspectRatio: "aspect-video",
    mediaType: "video",
    images: [
      { id: 1, url: "/images/hyperlapses/hyperlapse-1.mp4", alt: "Hyperlapse urbano", thumbnailUrl: "/images/hyperlapses/hyperlapse-1-thumb.jpg" },
      { id: 2, url: "/images/hyperlapses/hyperlapse-2.mp4", alt: "Hyperlapse al atardecer", thumbnailUrl: "/images/hyperlapses/hyperlapse-2-thumb.jpg" },
      { id: 3, url: "/images/hyperlapses/hyperlapse-3.mp4", alt: "Hyperlapse carretera", thumbnailUrl: "/images/hyperlapses/hyperlapse-3-thumb.jpg" },
      { id: 4, url: "/images/hyperlapses/hyperlapse-4.mp4", alt: "Hyperlapse costa", thumbnailUrl: "/images/hyperlapses/hyperlapse-4-thumb.jpg" },
      { id: 5, url: "/images/hyperlapses/hyperlapse-5.mp4", alt: "Hyperlapse montaña", thumbnailUrl: "/images/hyperlapses/hyperlapse-5-thumb.jpg" },
      { id: 6, url: "/images/hyperlapses/hyperlapse-6.mp4", alt: "Hyperlapse puente", thumbnailUrl: "/images/hyperlapses/hyperlapse-6-thumb.jpg" }
    ]
  },
  {
    id: "videos",
    title: "Videos",
    aspectRatio: "aspect-video",
    mediaType: "video",
    images: [
      { id: 1, url: "/images/videos/video-1.mp4", alt: "Escena para video aéreo", thumbnailUrl: "/images/videos/video-1-thumb.jpg" },
      { id: 2, url: "/images/videos/video-2.mp4", alt: "Plano drone costa", thumbnailUrl: "/images/videos/video-2-thumb.jpg" },
      { id: 3, url: "/images/videos/video-3.mp4", alt: "Video urbano", thumbnailUrl: "/images/videos/video-3-thumb.jpg" },
      { id: 4, url: "/images/videos/video-4.mp4", alt: "Toma aérea atardecer", thumbnailUrl: "/images/videos/video-4-thumb.jpg" },
      { id: 5, url: "/images/videos/video-5.mp4", alt: "Escena filmación drone", thumbnailUrl: "/images/videos/video-5-thumb.jpg" },
      { id: 6, url: "/images/videos/video-6.mp4", alt: "Filmación naturaleza", thumbnailUrl: "/images/videos/video-6-thumb.jpg" }
    ]
  }
];
