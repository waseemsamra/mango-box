import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

// Database name and version
const DB_NAME = 'kisanfresh_db_v3';
const DB_VERSION = 1;

// Initialize database
let databaseInstance = null;

export const initializeDatabase = async () => {
  if (databaseInstance) {
    return databaseInstance;
  }

  try {
    // Add required plugins
    addRxPlugin(RxDBMigrationSchemaPlugin);
    addRxPlugin(RxDBUpdatePlugin);
    
    // Add development plugin for debugging
    if (process.env.NODE_ENV === 'development') {
      addRxPlugin(RxDBDevModePlugin);
    }

    // Force database recreation to handle schema issues
    console.log('Force recreating database to ensure schema consistency...');
    
    try {
      // Clear the entire database first
      await clearDatabase();
      console.log('Database cleared, recreating...');
    } catch (clearError) {
      console.error('Failed to clear database:', clearError);
      // Continue with recreation even if clear fails
    }

    // Create database instance with migration strategy
    databaseInstance = await createRxDatabase({
      name: DB_NAME,
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
      // Add migration cleanup to handle schema changes
      cleanupPolicy: () => ({
        // Allow automatic cleanup for schema migrations
        awaitBeforeCleanup: true,
        minimumDeletedTime: 1000 * 60 * 60 * 24, // 24 hours ago
        runBeforeInit: true
      })
    });

    console.log('Database initialized successfully');
    return databaseInstance;
  } catch (error) {
    console.error('Database initialization failed:', error);
    
    // Always try to recover from schema errors by clearing and reinitializing
    console.log('Database initialization error detected, attempting recovery...');
    try {
      // Clear the entire database
      await clearDatabase();
      console.log('Database cleared, reinitializing...');
      // Retry initialization
      return await initializeDatabase();
    } catch (recoveryError) {
  }

  try {
    // Add required plugins
    addRxPlugin(RxDBMigrationSchemaPlugin);
    addRxPlugin(RxDBUpdatePlugin);
    
    // Add development plugin for debugging
    if (process.env.NODE_ENV === 'development') {
      addRxPlugin(RxDBDevModePlugin);
    }

    // Force database recreation to handle schema issues
    console.log('Force recreating database to ensure schema consistency...');
    
    try {
      // Clear the entire database first
      await clearDatabase();
      console.log('Database cleared, recreating...');
    } catch (clearError) {
      console.error('Failed to clear database:', clearError);
      // Continue with recreation even if clear fails
    }

    // Create database instance with migration strategy
    databaseInstance = await createRxDatabase({
      name: DB_NAME,
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
      // Add migration cleanup to handle schema changes
      cleanupPolicy: () => ({
        // Allow automatic cleanup for schema migrations
        awaitBeforeCleanup: true,
        minimumDeletedTime: 1000 * 60 * 60 * 24, // 24 hours ago
        runBeforeInit: true
      })
    });

    console.log('Database initialized successfully');
    return databaseInstance;
  } catch (error) {
    console.error('Database initialization failed:', error);
    
    // Always try to recover from schema errors by clearing and reinitializing
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
      // Try to remove database directly from storage
      const storage = getRxStorageDexie();
      await storage.removeDatabase(DB_NAME);
      console.log('Database removed from storage');
    }
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  }
};
