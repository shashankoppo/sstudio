export interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  service?: string;
  message?: string;
  status: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  category_id: string;
  sub_category?: string;
  title: string;
  description?: string;
  image_url: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  location?: string;
  created_at: string;
}
