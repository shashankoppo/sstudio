import express from 'express';
import { v4 as uuidv4 } from 'uuid';
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

router.get('/', (req, res) => {
  const select = db.prepare(`
    SELECT * FROM leads ORDER BY created_at DESC
  `);

  const leads = select.all();
  res.json(leads);
});

// Public endpoint for website contact form submissions
router.post('/', (req, res) => {
  try {
    const { name, email, phone, city, service, message, status } = req.body;
    const id = uuidv4();

    const insert = db.prepare(`
      INSERT INTO leads (id, name, email, phone, city, service, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(id, name, email, phone || null, city || null, service || null, message || null, status || 'new');

    const select = db.prepare('SELECT * FROM leads WHERE id = ?');
    const lead = select.get(id);

    res.status(201).json(lead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

// Protected endpoint for admin panel lead management
router.post('/admin', isAuthenticated, (req, res) => {
  try {
    const { name, email, phone, city, service, message, status } = req.body;
    const id = uuidv4();

    const insert = db.prepare(`
      INSERT INTO leads (id, name, email, phone, city, service, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(id, name, email, phone || null, city || null, service || null, message || null, status || 'new');

    const select = db.prepare('SELECT * FROM leads WHERE id = ?');
    const lead = select.get(id);

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id', isAuthenticated, (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const fields = Object.keys(updates)
      .filter(key => ['name', 'email', 'phone', 'city', 'service', 'message', 'status'].includes(key))
      .map(key => `${key} = ?`)
      .join(', ');

    if (!fields) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const values = Object.entries(updates)
      .filter(([key]) => ['name', 'email', 'phone', 'city', 'service', 'message', 'status'].includes(key))
      .map(([, value]) => value);

    const update = db.prepare(`
      UPDATE leads SET ${fields} WHERE id = ?
    `);

    update.run(...values, id);

    const select = db.prepare('SELECT * FROM leads WHERE id = ?');
    const lead = select.get(id);

    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', isAuthenticated, (req, res) => {
  try {
    const { id } = req.params;

    const del = db.prepare('DELETE FROM leads WHERE id = ?');
    del.run(id);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as leadsRouter };
