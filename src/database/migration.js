import initialData from '../data/initialData.json';

export const migrateFromJSON = async (db) => {
  try {
    console.log('Starting migration from JSON to RxDB...');
    
    // Migrate categories (only if they don't already exist)
    if (db.collections.categories) {
      const categoriesCollection = db.collections.categories;
      const existingCategories = await categoriesCollection.find().exec();
      
      for (const category of initialData.categories) {
        const existingCategory = existingCategories.find(c => c.id === category.id);
        
        if (!existingCategory) {
          const categoryWithTimestamps = {
            ...category,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          await categoriesCollection.upsert(categoryWithTimestamps);
        }
      }
      console.log(`Migrated ${initialData.categories.length} categories`);
    }

    // Migrate units (only if they don't already exist)
    if (db.collections.units) {
      const unitsCollection = db.collections.units;
      const existingUnits = await unitsCollection.find().exec();
      
      for (const unit of initialData.units) {
        const existingUnit = existingUnits.find(u => u.id === unit.id);
        
        if (!existingUnit) {
          const unitWithTimestamps = {
            ...unit,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          await unitsCollection.upsert(unitWithTimestamps);
        }
      }
      console.log(`Migrated ${initialData.units.length} units`);
    }

    // Migrate origins (only if they don't already exist)
    if (db.collections.origins) {
      const originsCollection = db.collections.origins;
      const existingOrigins = await originsCollection.find().exec();
      
      for (const origin of initialData.origins) {
        const existingOrigin = existingOrigins.find(o => o.id === origin.id);
        
        if (!existingOrigin) {
          const originWithTimestamps = {
            ...origin,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          await originsCollection.upsert(originWithTimestamps);
        }
      }
      console.log(`Migrated ${initialData.origins.length} origins`);
    }

    // Migrate currencies
    if (db.collections.currencies) {
      const currenciesCollection = db.collections.currencies;
      for (const currency of initialData.currencies) {
        const currencyWithTimestamps = {
          ...currency,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await currenciesCollection.upsert(currencyWithTimestamps);
      }
      console.log(`Migrated ${initialData.currencies.length} currencies`);
    }

    // Migrate products (only if they don't already exist)
    if (db.collections.products) {
      const productsCollection = db.collections.products;
      const existingProducts = await productsCollection.find().exec();
      
      for (const product of initialData.products) {
        const existingProduct = existingProducts.find(p => p.id === product.id);
        
        if (!existingProduct) {
          const productWithTimestamps = {
            ...product,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          await productsCollection.upsert(productWithTimestamps);
        }
      }
      console.log(`Migrated ${initialData.products.length} products`);
    }

    // Migrate users
    if (db.collections.users) {
      const usersCollection = db.collections.users;
      console.log('Migrating users:', initialData.users);
      for (const user of initialData.users) {
        const userWithTimestamps = {
          ...user,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLogin: null
        };
        console.log('Creating user:', userWithTimestamps);
        await usersCollection.upsert(userWithTimestamps);
      }
      console.log(`Migrated ${initialData.users.length} users`);
      
      // Verify users were created
      const createdUsers = await usersCollection.find().exec();
      console.log('Users in database after migration:', createdUsers.map(u => u.toJSON()));
    }

    console.log('Migration completed successfully!');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};

export const clearDatabase = async (db) => {
  try {
    console.log('Clearing existing database data...');
    
    if (db.collections.categories) {
      await db.collections.categories.remove();
    }
    if (db.collections.units) {
      await db.collections.units.remove();
    }
    if (db.collections.origins) {
      await db.collections.origins.remove();
    }
    if (db.collections.currencies) {
      await db.collections.currencies.remove();
    }
    if (db.collections.products) {
      await db.collections.products.remove();
    }
    if (db.collections.users) {
      await db.collections.users.remove();
    }
    
    console.log('Database cleared successfully');
    return true;
  } catch (error) {
    console.error('Failed to clear database:', error);
    throw error;
  }
};

export const resetAndMigrate = async (db) => {
  try {
    await clearDatabase(db);
    await migrateFromJSON(db);
    return true;
  } catch (error) {
    console.error('Reset and migration failed:', error);
    throw error;
  }
};
