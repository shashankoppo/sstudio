import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { signUp, signIn } from '../auth.js';

const router = express.Router();
const sessions = new Map();

router.post('/signup', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = signUp(email, password);
    const sessionToken = uuidv4();
    sessions.set(sessionToken, user.id);

    res.json({ user, sessionToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/signin', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = signIn(email, password);
    const sessionToken = uuidv4();
    sessions.set(sessionToken, user.id);

    res.json({ user, sessionToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/signout', (req, res) => {
  const { sessionToken } = req.body;
  if (sessionToken) {
    sessions.delete(sessionToken);
  }
  res.json({ success: true });
});

router.get('/session', (req, res) => {
  const sessionToken = req.headers.authorization?.replace('Bearer ', '');

  if (!sessionToken || !sessions.has(sessionToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json({ sessionToken });
});

export { router as authRouter, sessions };
