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

router.get('/categories', (req, res) => {
  const select = db.prepare(`
    SELECT * FROM portfolio_categories ORDER BY name
  `);

  const categories = select.all();
  res.json(categories);
});

router.post('/categories', isAuthenticated, (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name required' });
    }

    const id = uuidv4();

    const insert = db.prepare(`
      INSERT INTO portfolio_categories (id, name)
      VALUES (?, ?)
    `);

    insert.run(id, name);

    const select = db.prepare('SELECT * FROM portfolio_categories WHERE id = ?');
    const category = select.get(id);

    res.status(201).json(category);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(400).json({ error: error.message });
  }
});

router.delete('/categories/:id', isAuthenticated, (req, res) => {
  try {
    const { id } = req.params;

    const del = db.prepare('DELETE FROM portfolio_categories WHERE id = ?');
    del.run(id);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/items', (req, res) => {
  const select = db.prepare(`
    SELECT 
      items.*,
      categories.name as category
    FROM portfolio_items items
    LEFT JOIN portfolio_categories categories ON items.category_id = categories.id
    ORDER BY items.created_at DESC
  `);

  const items = select.all();
  res.json(items);
});

router.post('/items', isAuthenticated, (req, res) => {
  try {
    const { category_id, sub_category, title, description, image_url } = req.body;

    if (!category_id || !title || !image_url) {
      return res.status(400).json({ error: 'category_id, title, and image_url required' });
    }

    const id = uuidv4();

    const insert = db.prepare(`
      INSERT INTO portfolio_items (id, category_id, sub_category, title, description, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(id, category_id, sub_category || null, title, description || null, image_url);

    const select = db.prepare('SELECT * FROM portfolio_items WHERE id = ?');
    const item = select.get(id);

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/items/:id', isAuthenticated, (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const fields = Object.keys(updates)
      .filter(key => ['category_id', 'sub_category', 'title', 'description', 'image_url'].includes(key))
      .map(key => `${key} = ?`)
      .join(', ');

    if (!fields) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const values = Object.entries(updates)
      .filter(([key]) => ['category_id', 'sub_category', 'title', 'description', 'image_url'].includes(key))
      .map(([, value]) => value);

    const update = db.prepare(`
      UPDATE portfolio_items SET ${fields} WHERE id = ?
    `);

    update.run(...values, id);

    const select = db.prepare('SELECT * FROM portfolio_items WHERE id = ?');
    const item = select.get(id);

    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/items/:id', isAuthenticated, (req, res) => {
  try {
    const { id } = req.params;

    const del = db.prepare('DELETE FROM portfolio_items WHERE id = ?');
    del.run(id);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as portfolioRouter };
