import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database';

console.log('--- SERVER STARTING ---');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Import and use routes
import authRoutes from './routes/auth';
import houseRoutes from './routes/houses';
app.use('/api/auth', authRoutes);
app.use('/api/houses', houseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
