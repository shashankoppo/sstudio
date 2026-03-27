
import { db } from './db.js';

const items = db.prepare('SELECT count(*) as count FROM portfolio_items').get();
const testimonials = db.prepare('SELECT count(*) as count FROM testimonials').get();
const categories = db.prepare('SELECT count(*) as count FROM portfolio_categories').get();

console.log(`Portfolio Items: ${items.count}`);
console.log(`Testimonials: ${testimonials.count}`);
console.log(`Categories: ${categories.count}`);
