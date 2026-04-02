
import { db } from './db.js';
import { v4 as uuidv4 } from 'uuid';

console.log('Seeding database with original content...');

const portfolioItems = [
    { title: 'The Eternal Vow', category: 'Weddings', description: 'Outdoor luxury wedding ceremony', imageUrl: '/assets/wedding/wedding-1.png' },
    { title: 'Silent Affection', category: 'Weddings', description: 'Intimate wedding portraits', imageUrl: '/assets/wedding/wedding-2.png' },
    { title: 'Golden Hour Grace', category: 'Weddings', description: 'Editorial bridal photography', imageUrl: '/assets/wedding/wedding-3.png' },
    { title: 'Grandeur In Motion', category: 'Cinematic', description: 'Cinematic wedding film stills', imageUrl: '/assets/wedding/wedding-4.png' },
    { title: 'Royal Wedding Extravaganza', category: 'Weddings', description: 'Cinematic wedding with grand celebrations', imageUrl: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg' },
    { title: 'Pre-Wedding in Swiss Alps', category: 'Weddings', description: 'Romantic pre-wedding in alpine landscapes', imageUrl: 'https://images.pexels.com/photos/1690353/pexels-photo-1690353.jpeg' },
    { title: 'Fashion Brand Lookbook', category: 'Fashion', description: 'Professional fashion photography', imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg' },
    { title: 'Corporate Gala Evening', category: 'Events', description: 'Corporate event photography', imageUrl: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg' },
    { title: 'Product Photography Portfolio', category: 'Commercial', description: 'E-commerce product photography', imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg' },
    { title: 'Cinematic Wedding Film', category: 'Cinematic', description: 'Award-winning cinematic video', imageUrl: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg' },
    { title: 'Destination Wedding - Bali', category: 'Weddings', description: 'Exotic destination wedding', imageUrl: 'https://images.pexels.com/photos/2078063/pexels-photo-2078063.jpeg' },
    { title: 'Model Portfolio Session', category: 'Fashion', description: 'Professional model portfolio', imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
    { title: 'Maternity Beauty Shoot', category: 'Events', description: 'Elegant maternity photography', imageUrl: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg' },
    { title: 'Drone Wedding Cinematography', category: 'Cinematic', description: 'Aerial wedding cinematography', imageUrl: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg' }
];

const testimonials = [
    { name: 'Priya & Arjun', role: 'Wedding Couple', location: 'Mumbai', content: 'Suraj Studio made our wedding day absolutely magical. Simply outstanding!', rating: 5 },
    { name: 'Rajesh Kapoor', role: 'Corporate Brand Director', location: 'Delhi', content: 'Their commercial photography elevated our brand image significantly. Highly recommended!', rating: 5 },
    { name: 'Anjali Singh', role: 'Fashion Model', location: 'Bangalore', content: 'The team\'s professionalism helped me build an amazing portfolio. Truly exceptional!', rating: 5 },
    { name: 'Vikram Joshi', role: 'Event Organizer', location: 'Jabalpur', content: 'Over 50 events covered and they never disappoint. Best in the business!', rating: 5 },
    { name: 'Meera Patel', role: 'Influencer', location: 'Pune', content: 'My engagement rates skyrocketed after using their photography. Worth every penny!', rating: 5 },
    { name: 'Sanjay & Divya', role: 'Destination Wedding Couple', location: 'International', content: 'Their destination wedding expertise and planning were flawless. Absolutely perfect!', rating: 5 }
];

try {
    // 1. Seed Categories
    const categories = [...new Set(portfolioItems.map(item => item.category))];
    const categoryMap = {};

    const insertCategory = db.prepare('INSERT OR IGNORE INTO portfolio_categories (id, name) VALUES (?, ?)');
    const getCategory = db.prepare('SELECT id FROM portfolio_categories WHERE name = ?');

    for (const catName of categories) {
        let cat = getCategory.get(catName);
        if (!cat) {
            const id = uuidv4();
            insertCategory.run(id, catName);
            cat = { id };
            console.log(`Created category: ${catName}`);
        } else {
            console.log(`Category exists: ${catName}`);
        }
        categoryMap[catName] = cat.id;
    }

    // 2. Seed Portfolio Items
    const insertItem = db.prepare(`
    INSERT INTO portfolio_items (id, category_id, title, description, image_url)
    VALUES (?, ?, ?, ?, ?)
  `);

    // Check if items already exist to avoid duplication (simple check by title)
    const checkItem = db.prepare('SELECT id FROM portfolio_items WHERE title = ?');

    for (const item of portfolioItems) {
        if (!checkItem.get(item.title)) {
            insertItem.run(uuidv4(), categoryMap[item.category], item.title, item.description, item.imageUrl);
            console.log(`Added portfolio item: ${item.title}`);
        } else {
            console.log(`Item exists: ${item.title}`);
        }
    }

    // 3. Seed Testimonials
    const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (id, name, role, content, rating, location)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

    const checkTestimonial = db.prepare('SELECT id FROM testimonials WHERE name = ?');

    for (const t of testimonials) {
        if (!checkTestimonial.get(t.name)) {
            insertTestimonial.run(uuidv4(), t.name, t.role, t.content, t.rating, t.location);
            console.log(`Added testimonial: ${t.name}`);
        } else {
            console.log(`Testimonial exists: ${t.name}`);
        }
    }

    console.log('Seeding completed successfully.');

} catch (error) {
    console.error('Seeding failed:', error);
}
