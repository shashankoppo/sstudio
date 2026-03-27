
import express from 'express';
import { db } from '../db.js';
import { sessions } from './auth.js';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    if (!sessionToken || !sessions.has(sessionToken)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Public endpoint to get settings
router.get('/', (req, res) => {
    try {
        const select = db.prepare('SELECT * FROM settings');
        const settings = select.all();

        // Convert array to object for easier consumption { key: value }
        const settingsObj = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        res.json(settingsObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protected endpoint to update settings
router.post('/', isAuthenticated, (req, res) => {
    try {
        const updates = req.body; // Expects { key: value, key2: value2 }

        const insertOrUpdate = db.prepare(`
      INSERT INTO settings (key, value, updated_at) 
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET 
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
    `);

        const transaction = db.transaction((data) => {
            for (const [key, value] of Object.entries(data)) {
                insertOrUpdate.run(key, value);
            }
        });

        transaction(updates);

        res.json({ success: true, message: 'Settings updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export { router as settingsRouter };
