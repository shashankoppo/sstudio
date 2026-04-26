import { db } from './db.js';

export function migrateSettings() {
    console.log('Migrating database for settings...');

    try {
        db.exec(`
        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `);
        console.log('Settings table created successfully.');

        // Seed default values if empty
        const count = db.prepare('SELECT count(*) as count FROM settings').get().count;
        if (count === 0) {
            const insert = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
            insert.run('site_title', 'Suraj Studio');
            insert.run('logo_url', ''); // Empty initially
            insert.run('hero_bg_url', '/assets/wedding/hero.png');
            console.log('Default settings seeded.');
        }

    } catch (error) {
        console.error('Migration failed:', error);
    }
}
