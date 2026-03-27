
import { db } from './db.js';

console.log('Migrating database...');

try {
    // Add 'location' column to testimonials if it doesn't exist
    const tableInfo = db.pragma('table_info(testimonials)');
    const hasLocation = tableInfo.some(col => col.name === 'location');

    if (!hasLocation) {
        console.log('Adding location column to testimonials table...');
        db.exec('ALTER TABLE testimonials ADD COLUMN location TEXT');
        console.log('Column added successfully.');
    } else {
        console.log('Column location already exists in testimonials table.');
    }

} catch (error) {
    console.error('Migration failed:', error);
}
