
import { signUp } from './auth.js';
import { db } from './db.js';

const email = 'admin@sstudio.com';
const password = 'admin';

try {
    console.log('Creating admin user...');
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (existingUser) {
        console.log('Admin user already exists.');
    } else {
        signUp(email, password);
        console.log(`Admin user created successfully.`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
    }
} catch (error) {
    console.error('Error creating admin user:', error);
}
