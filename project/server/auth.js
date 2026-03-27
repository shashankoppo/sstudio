import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { db } from './db.js';

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const signUp = (email, password) => {
  try {
    const id = uuidv4();
    const hashedPassword = hashPassword(password);

    const insert = db.prepare(`
      INSERT INTO users (id, email, password)
      VALUES (?, ?, ?)
    `);

    insert.run(id, email, hashedPassword);
    return { id, email };
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      throw new Error('Email already exists');
    }
    throw error;
  }
};

export const signIn = (email, password) => {
  const hashedPassword = hashPassword(password);

  const select = db.prepare(`
    SELECT id, email FROM users
    WHERE email = ? AND password = ?
  `);

  const user = select.get(email, hashedPassword);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  return user;
};

export const getUserById = (id) => {
  const select = db.prepare(`
    SELECT id, email FROM users WHERE id = ?
  `);

  return select.get(id);
};
