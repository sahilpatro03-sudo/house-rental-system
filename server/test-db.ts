import db from './database';

try {
  const users = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };
  console.log('Users table exists, count:', users.count);

  const houses = db.prepare('SELECT count(*) as count FROM houses').get() as { count: number };
  console.log('Houses table exists, count:', houses.count);

  console.log('Database initialization successful');
} catch (error) {
  console.error('Database initialization failed:', error);
}
