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
    SELECT * FROM testimonials ORDER BY created_at DESC
  `);

  const testimonials = select.all();
  res.json(testimonials);
});

router.post('/', isAuthenticated, (req, res) => {
  try {
    const { name, role, content, rating, location } = req.body;

    if (!name || !content) {
      return res.status(400).json({ error: 'name and content required' });
    }

    const id = uuidv4();

    const insert = db.prepare(`
      INSERT INTO testimonials (id, name, role, content, rating, location)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(id, name, role || null, content, rating || 5, location || null);

    const select = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const testimonial = select.get(id);

    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id', isAuthenticated, (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const fields = Object.keys(updates)
      .filter(key => ['name', 'role', 'content', 'rating', 'location'].includes(key))
      .map(key => `${key} = ?`)
      .join(', ');

    if (!fields) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const values = Object.entries(updates)
      .filter(([key]) => ['name', 'role', 'content', 'rating', 'location'].includes(key))
      .map(([, value]) => value);

    const update = db.prepare(`
      UPDATE testimonials SET ${fields} WHERE id = ?
    `);

    update.run(...values, id);

    const select = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const testimonial = select.get(id);

    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', isAuthenticated, (req, res) => {
  try {
    const { id } = req.params;

    const del = db.prepare('DELETE FROM testimonials WHERE id = ?');
    del.run(id);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as testimonialsRouter };
