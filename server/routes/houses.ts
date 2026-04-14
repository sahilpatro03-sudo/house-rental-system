import { Router, Request, Response } from 'express';
import db from '../database';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

// GET all houses (with filtering)
router.get('/', (req: Request, res: Response) => {
  const { category, location, minRent, maxRent, rooms } = req.query;

  let query = 'SELECT * FROM houses WHERE 1=1';
  const params: any[] = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (location) {
    query += ' AND location LIKE ?';
    params.push(`%${location}%`);
  }
  if (minRent) {
    query += ' AND rent >= ?';
    params.push(Number(minRent));
  }
  if (maxRent) {
    query += ' AND rent <= ?';
    params.push(Number(maxRent));
  }
  if (rooms) {
    query += ' AND rooms = ?';
    params.push(Number(rooms));
  }

  try {
    const houses = db.prepare(query).all(...params);
    res.json(houses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET houses by landlord (Landlord/Admin only)
router.get('/my-listings', authenticateToken, authorizeRoles('landlord', 'admin'), (req: Request, res: Response) => {
  try {
    const houses = db.prepare('SELECT * FROM houses WHERE landlord_id = ?').all(req.user?.id);
    res.json(houses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET single house
router.get('/:id', (req: Request, res: Response) => {
  try {
    const house = db.prepare('SELECT * FROM houses WHERE id = ?').get(req.params.id);
    if (!house) return res.status(404).json({ error: 'House not found' });
    res.json(house);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new house (Landlord only)
router.post('/', authenticateToken, authorizeRoles('landlord', 'admin'), (req: Request, res: Response) => {
  const { title, description, location, rent, rooms, category, contact_info } = req.body;
  const landlord_id = req.user?.id;

  if (!title || !location || !rent || !rooms || !category || !contact_info) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO houses (landlord_id, title, description, location, rent, rooms, category, contact_info)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(landlord_id, title, description, location, rent, rooms, category, contact_info);
    res.status(201).json({ id: result.lastInsertRowid, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE house (Owner or Admin)
router.delete('/:id', authenticateToken, (req: Request, res: Response) => {
  try {
    const house = db.prepare('SELECT * FROM houses WHERE id = ?').get(req.params.id) as any;
    if (!house) return res.status(404).json({ error: 'House not found' });

    if (req.user?.role !== 'admin' && house.landlord_id !== req.user?.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    db.prepare('DELETE FROM houses WHERE id = ?').run(req.params.id);
    res.json({ message: 'House deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
