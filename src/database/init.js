import { initializeDatabase } from './index';
import { createCollections } from './collections';
import { seedDatabase } from './seedData';

// Initialize database when app starts
export const initDatabase = async () => {
  try {
    console.log('Initializing database...');
    
    // Initialize database
    const db = await initializeDatabase();
    
    // Create collections
    await createCollections(db);
    
    // Seed database with initial data
    await seedDatabase(db);
    
    console.log('Database initialization completed successfully');
    return db;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};
