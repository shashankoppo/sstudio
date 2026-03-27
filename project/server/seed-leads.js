import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'data.db'));

// Create sample leads
const sampleLeads = [
    {
        id: uuidv4(),
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        phone: '+91 98765 43210',
        city: 'Mumbai',
        service: 'Wedding Photography',
        message: 'Looking for wedding photography package for December 2024',
        status: 'new'
    },
    {
        id: uuidv4(),
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 87654 32109',
        city: 'Delhi',
        service: 'Pre-Wedding Shoot',
        message: 'Interested in pre-wedding shoot in Goa',
        status: 'contacted'
    },
    {
        id: uuidv4(),
        name: 'Amit Patel',
        email: 'amit.patel@example.com',
        phone: '+91 76543 21098',
        city: 'Bangalore',
        service: 'Corporate Event',
        message: 'Need photographer for annual company event',
        status: 'new'
    },
    {
        id: uuidv4(),
        name: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        phone: '+91 65432 10987',
        city: 'Hyderabad',
        service: 'Fashion Photography',
        message: 'Portfolio shoot for modeling agency',
        status: 'converted'
    },
    {
        id: uuidv4(),
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        phone: '+91 54321 09876',
        city: 'Jaipur',
        service: 'Wedding Photography',
        message: 'Destination wedding in Udaipur, need full coverage',
        status: 'new'
    }
];

const insert = db.prepare(`
  INSERT INTO leads (id, name, email, phone, city, service, message, status, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
`);

console.log('Creating sample leads...');
for (const lead of sampleLeads) {
    insert.run(
        lead.id,
        lead.name,
        lead.email,
        lead.phone,
        lead.city,
        lead.service,
        lead.message,
        lead.status
    );
    console.log(`✓ Created lead: ${lead.name}`);
}

// Verify
const count = db.prepare('SELECT COUNT(*) as count FROM leads').get();
console.log(`\nTotal leads in database: ${count.count}`);

db.close();
