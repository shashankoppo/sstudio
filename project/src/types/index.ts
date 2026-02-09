export interface City {
  name: string;
  state: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  useCases: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Weddings' | 'Commercial' | 'Fashion' | 'Events' | 'Cinematic';
  description: string;
  imageUrl: string;
  altText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
}
