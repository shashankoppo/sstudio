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

// Generate next invoice number
const getNextInvoiceNumber = () => {
  const lastInvoice = db.prepare('SELECT invoice_number FROM invoices ORDER BY created_at DESC LIMIT 1').get();
  if (!lastInvoice) return 'INV-0001';
  
  const lastNumber = parseInt(lastInvoice.invoice_number.split('-')[1]);
  return `INV-${(lastNumber + 1).toString().padStart(4, '0')}`;
};

// List all invoices
router.get('/', isAuthenticated, (req, res) => {
  try {
    const select = db.prepare(`
      SELECT * FROM invoices ORDER BY created_at DESC
    `);
    const invoices = select.all();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single invoice with items
router.get('/:id', isAuthenticated, (req, res) => {
  try {
    const { id } = req.params;
    const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
    
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const items = db.prepare('SELECT * FROM invoice_items WHERE invoice_id = ?').all(id);
    res.json({ ...invoice, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new invoice
router.post('/', isAuthenticated, (req, res) => {
  const transaction = db.transaction((data) => {
    const {
      client_name,
      client_email,
      client_phone,
      client_address,
      status,
      items,
      tax_amount,
      discount_amount,
      notes
    } = data;

    const id = uuidv4();
    const invoice_number = getNextInvoiceNumber();
    
    // Calculate total amount from items
    const total_amount = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0) + (tax_amount || 0) - (discount_amount || 0);

    const insertInvoice = db.prepare(`
      INSERT INTO invoices (
        id, invoice_number, client_name, client_email, client_phone, 
        client_address, status, total_amount, tax_amount, discount_amount, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertInvoice.run(
      id, invoice_number, client_name, client_email || null, client_phone || null,
      client_address || null, status || 'draft', total_amount, tax_amount || 0, 
      discount_amount || 0, notes || null
    );

    const insertItem = db.prepare(`
      INSERT INTO invoice_items (id, invoice_id, description, quantity, unit_price, amount)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const item of items) {
      const itemId = uuidv4();
      const amount = item.quantity * item.unit_price;
      insertItem.run(itemId, id, item.description, item.quantity, item.unit_price, amount);
    }

    return id;
  });

  try {
    const id = transaction(req.body);
    const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
    const items = db.prepare('SELECT * FROM invoice_items WHERE invoice_id = ?').all(id);
    res.status(201).json({ ...invoice, items });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update invoice
router.patch('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  
  const transaction = db.transaction((updates) => {
    const { items, ...invoiceUpdates } = updates;

    if (Object.keys(invoiceUpdates).length > 0) {
      const fields = Object.keys(invoiceUpdates)
        .filter(key => [
          'client_name', 'client_email', 'client_phone', 'client_address', 
          'status', 'tax_amount', 'discount_amount', 'notes'
        ].includes(key))
        .map(key => `${key} = ?`)
        .join(', ');

      if (fields) {
        const values = Object.keys(invoiceUpdates)
          .filter(key => [
            'client_name', 'client_email', 'client_phone', 'client_address', 
            'status', 'tax_amount', 'discount_amount', 'notes'
          ].includes(key))
          .map(key => invoiceUpdates[key]);

        db.prepare(`UPDATE invoices SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values, id);
      }
    }

    if (items) {
      // Delete existing items and re-insert
      db.prepare('DELETE FROM invoice_items WHERE invoice_id = ?').run(id);
      
      const insertItem = db.prepare(`
        INSERT INTO invoice_items (id, invoice_id, description, quantity, unit_price, amount)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      let newTotal = 0;
      for (const item of items) {
        const itemId = uuidv4();
        const amount = item.quantity * item.unit_price;
        newTotal += amount;
        insertItem.run(itemId, id, item.description, item.quantity, item.unit_price, amount);
      }
      
      // Update totals in invoice table
      const inv = db.prepare('SELECT tax_amount, discount_amount FROM invoices WHERE id = ?').get(id);
      const total_amount = newTotal + (inv.tax_amount || 0) - (inv.discount_amount || 0);
      db.prepare('UPDATE invoices SET total_amount = ? WHERE id = ?').run(total_amount, id);
    }
  });

  try {
    transaction(req.body);
    const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
    const items = db.prepare('SELECT * FROM invoice_items WHERE invoice_id = ?').all(id);
    res.json({ ...invoice, items });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete invoice
router.delete('/:id', isAuthenticated, (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM invoices WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as invoicesRouter };
