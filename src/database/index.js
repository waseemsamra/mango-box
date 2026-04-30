import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

// Database name and version
const DB_NAME = 'kisanfresh_db_v4';
const DB_VERSION = 1;

// Initialize database
let databaseInstance = null;

export const initializeDatabase = async () => {
  if (databaseInstance) {
    return databaseInstance;
  }

  try {
    console.log('Initializing RxDB database...');
    
    // Add required plugins
    addRxPlugin(RxDBMigrationSchemaPlugin);
    addRxPlugin(RxDBUpdatePlugin);
    
    // Add development plugin for debugging
    if (process.env.NODE_ENV === 'development') {
      addRxPlugin(RxDBDevModePlugin);
    }

    // Create database instance with migration strategy
    databaseInstance = await createRxDatabase({
      name: DB_NAME,
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
      // Use aggressive cleanup to handle schema changes
      cleanupPolicy: {
        // Always destroy on schema mismatch
        onFail: 'destroy',
        onSuccess: 'keep'
      }
    });

    console.log('RxDB database initialized successfully');
    return databaseInstance;
  } catch (error) {
    console.error('Database initialization failed:', error);
    
    // Try to recover from schema errors by clearing and reinitializing
    console.log('Database initialization error detected, attempting recovery...');
    try {
      // Clear the entire database
      await clearDatabase();
      console.log('Database cleared, reinitializing...');
      // Retry initialization
      return await initializeDatabase();
    } catch (recoveryError) {
      console.error('Failed to recover from database error:', recoveryError);
      throw error;
    }
  }
};

export const getDatabase = () => {
  if (!databaseInstance) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return databaseInstance;
};

export const closeDatabase = async () => {
  if (databaseInstance) {
    await databaseInstance.destroy();
    databaseInstance = null;
    console.log('Database closed');
  }
};

export const clearDatabase = async () => {
  try {
    if (databaseInstance) {
      await databaseInstance.remove();
      console.log('Database cleared');
    } else {
      // Try to remove database directly from storage using Dexie
      const storage = getRxStorageDexie();
      if (storage && storage.dexie) {
        await storage.dexie.delete();
        console.log('Database removed from storage');
      } else {
        console.log('Storage instance not available for direct removal');
      }
    }
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  }
};
