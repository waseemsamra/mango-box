import { productSchema, categorySchema, unitSchema, originSchema, currencySchema, userSchema } from './schemas';

export const createCollections = async (db) => {
  try {
    const collectionsToCreate = {};
    
    // Check which collections don't exist and add them to create object
    if (!db.collections.products) {
      collectionsToCreate.products = {
        schema: productSchema,
        migrationStrategies: {
          1: (oldDoc) => oldDoc, // No migration needed for version 1
        },
      };
    }
    
    if (!db.collections.categories) {
      collectionsToCreate.categories = {
        schema: categorySchema,
        migrationStrategies: {
          1: (oldDoc) => oldDoc, // No migration needed for version 1
        },
      };
    }
    
    if (!db.collections.units) {
      collectionsToCreate.units = {
        schema: unitSchema,
        migrationStrategies: {
          1: (oldDoc) => oldDoc, // No migration needed for version 1
        },
      };
    }
    
    if (!db.collections.origins) {
      collectionsToCreate.origins = {
        schema: originSchema,
        migrationStrategies: {
          1: (oldDoc) => oldDoc, // No migration needed for version 1
        },
      };
    }
    
    if (!db.collections.currencies) {
      collectionsToCreate.currencies = {
        schema: currencySchema,
        migrationStrategies: {
          1: (oldDoc) => oldDoc, // No migration needed for version 1
        },
      };
    }
    
    if (!db.collections.users) {
      collectionsToCreate.users = {
        schema: userSchema,
        migrationStrategies: {
          1: (oldDoc) => oldDoc, // No migration needed for version 1
        },
      };
    }

    // Only create collections if there are any that don't exist
    if (Object.keys(collectionsToCreate).length > 0) {
      await db.addCollections(collectionsToCreate);
      console.log(`Created ${Object.keys(collectionsToCreate).length} new collections`);
    } else {
      console.log('All collections already exist');
    }

    return db;
  } catch (error) {
    console.error('Error creating collections:', error);
    throw error;
  }
};
