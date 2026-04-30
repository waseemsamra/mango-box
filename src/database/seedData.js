// Initial seed data for the database - now using JSON migration

import { migrateFromJSON } from './migration';
import { ensureAdminUser } from '../utils/createAdminUser';

export const seedDatabase = async (db) => {
  try {
    console.log('Seeding database with initial data from JSON...');
    
    // Use the JSON migration to seed the database
    await migrateFromJSON(db);
    
    // Ensure admin user exists
    await ensureAdminUser();
    
    console.log('Database seeded successfully from JSON');
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
