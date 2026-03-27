
const API_URL = '/api';

export interface PortfolioItem {
    id: string;
    category_id: string;
    category: string; // Joined from backend
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

export const webApi = {
    portfolio: {
        list: async (): Promise<PortfolioItem[]> => {
            try {
                const res = await fetch(`${API_URL}/portfolio/items`);
                if (!res.ok) throw new Error('Failed to fetch portfolio');
                return await res.json();
            } catch (error) {
                console.error('Error fetching portfolio:', error);
                return [];
            }
        }
    },

    testimonials: {
        list: async (): Promise<Testimonial[]> => {
            try {
                const res = await fetch(`${API_URL}/testimonials`);
                if (!res.ok) throw new Error('Failed to fetch testimonials');
                return await res.json();
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                return [];
            }
        }
    },

    settings: {
        get: async () => {
            try {
                const res = await fetch(`${API_URL}/settings`);
                if (!res.ok) throw new Error('Failed to fetch settings');
                return await res.json();
            } catch (error) {
                console.error('Error fetching settings:', error);
                return {};
            }
        }
    }
};
