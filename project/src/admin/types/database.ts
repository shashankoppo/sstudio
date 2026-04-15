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

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  client_address?: string;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
  total_amount: number;
  tax_amount: number;
  discount_amount: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: InvoiceItem[];
}
