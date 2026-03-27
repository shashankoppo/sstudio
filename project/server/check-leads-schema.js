import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'data.db'));

// Check leads table schema
const schema = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='leads'").get();
console.log('Leads table schema:');
console.log(schema?.sql || 'Table not found');

// Check if there are any leads
const count = db.prepare('SELECT COUNT(*) as count FROM leads').get();
console.log(`\nCurrent leads count: ${count.count}`);

// Show sample leads if any exist
const leads = db.prepare('SELECT * FROM leads LIMIT 5').all();
if (leads.length > 0) {
    console.log('\nSample leads:');
    console.log(leads);
} else {
    console.log('\nNo leads found in database');
}

db.close();
