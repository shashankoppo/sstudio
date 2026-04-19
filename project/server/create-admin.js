import { signUp } from './auth.js';
import { db } from './db.js';

export const ensureAdminUser = () => {
    const email = 'admin@sstudio.com';
    const password = 'admin';

    try {
        const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (existingUser) {
            console.log('Admin user verified.');
        } else {
            console.log('Creating default admin user...');
            signUp(email, password);
            console.log(`Admin user created successfully.`);
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        }
    } catch (error) {
        console.error('Error ensuring admin user:', error);
    }
};

// If run directly
if (process.argv[1] && process.argv[1].endsWith('create-admin.js')) {
    ensureAdminUser();
}

