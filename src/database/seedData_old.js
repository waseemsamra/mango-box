import { v4 as uuidv4 } from 'uuid';

// Initial seed data for the database - now using JSON migration

import { migrateFromJSON } from './migration';

// Initial seed data for the database
export const seedData = {
  // Categories
  categories: [
    {
      id: 'cat-1',
      name: 'Mangoes',
      slug: 'mangoes',
      description: 'Premium Pakistani mangoes from the best orchards',
      image: '/images/categories/mangoes/banner.jpg',
      displayPriority: 1,
      status: 'Active',
      productCount: 42,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'cat-2',
      name: 'Seasonal Fruits',
      slug: 'seasonal-fruits',
      description: 'Fresh seasonal fruits available throughout the year',
      image: '/images/categories/seasonal-fruits/banner.jpg',
      displayPriority: 2,
      status: 'Active',
      productCount: 156,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'cat-3',
      name: 'Organic Vegetables',
      slug: 'organic-vegetables',
      description: 'Certified organic vegetables grown without pesticides',
      image: '/images/categories/vegetables/banner.jpg',
      displayPriority: 3,
      status: 'Active',
      productCount: 89,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],

  // Units
  units: [
    { id: 'unit-1', name: 'Kilogram', abbreviation: 'kg', type: 'Weight', baseValue: 1, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-2', name: 'Gram', abbreviation: 'g', type: 'Weight', baseValue: 0.001, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-3', name: 'Pound', abbreviation: 'lb', type: 'Weight', baseValue: 0.453592, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-4', name: 'Dozen', abbreviation: 'dz', type: 'Quantity', baseValue: 12, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-5', name: 'Piece', abbreviation: 'pc', type: 'Quantity', baseValue: 1, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-6', name: 'Box', abbreviation: 'box', type: 'Quantity', baseValue: 1, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-7', name: 'Liter', abbreviation: 'L', type: 'Volume', baseValue: 1, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-8', name: 'Milliliter', abbreviation: 'ml', type: 'Volume', baseValue: 0.001, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-9', name: 'Gallon', abbreviation: 'gal', type: 'Volume', baseValue: 3.78541, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-10', name: 'Meter', abbreviation: 'm', type: 'Length', baseValue: 1, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-11', name: 'Centimeter', abbreviation: 'cm', type: 'Length', baseValue: 0.01, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'unit-12', name: 'Inch', abbreviation: 'in', type: 'Length', baseValue: 0.0254, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],

  // Origins
  origins: [
    { id: 'origin-1', name: 'Lahore', region: 'Punjab', country: 'Pakistan', code: 'LHR', status: 'Active', productCount: 156, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-2', name: 'Karachi', region: 'Sindh', country: 'Pakistan', code: 'KHI', status: 'Active', productCount: 89, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-3', name: 'Islamabad', region: 'Punjab', country: 'Pakistan', code: 'ISB', status: 'Active', productCount: 67, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-4', name: 'Multan', region: 'Punjab', country: 'Pakistan', code: 'MUX', status: 'Active', productCount: 234, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-5', name: 'Peshawar', region: 'Khyber Pakhtunkhwa', country: 'Pakistan', code: 'PEW', status: 'Active', productCount: 45, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-6', name: 'Quetta', region: 'Balochistan', country: 'Pakistan', code: 'UET', status: 'Active', productCount: 23, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-7', name: 'Faisalabad', region: 'Punjab', country: 'Pakistan', code: 'LYP', status: 'Active', productCount: 178, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-8', name: 'Sahiwal', region: 'Punjab', country: 'Pakistan', code: 'SWL', status: 'Active', productCount: 92, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-9', name: 'Sialkot', region: 'Punjab', country: 'Pakistan', code: 'SKT', status: 'Active', productCount: 156, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-10', name: 'Gujranwala', region: 'Punjab', country: 'Pakistan', code: 'GNW', status: 'Active', productCount: 134, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'origin-11', name: 'Hyderabad', region: 'Sindh', country: 'Pakistan', code: 'HDD', status: 'Active', productCount: 67, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],

  // Currencies
  currencies: [
    { id: 'curr-1', name: 'Pakistani Rupee', code: 'PKR', symbol: '₨', exchangeRate: 1, isBase: true, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'curr-2', name: 'US Dollar', code: 'USD', symbol: '$', exchangeRate: 278.50, isBase: false, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'curr-3', name: 'Euro', code: 'EUR', symbol: '€', exchangeRate: 302.75, isBase: false, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'curr-4', name: 'British Pound', code: 'GBP', symbol: '£', exchangeRate: 351.25, isBase: false, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'curr-5', name: 'Saudi Riyal', code: 'SAR', symbol: '﷼', exchangeRate: 74.20, isBase: false, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'curr-6', name: 'UAE Dirham', code: 'AED', symbol: 'د.إ', exchangeRate: 75.85, isBase: false, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'curr-7', name: 'Chinese Yuan', code: 'CNY', symbol: '¥', exchangeRate: 38.90, isBase: false, status: 'Active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],

  // Products
  products: [
    {
      id: 'dussehri-mangoes',
      name: 'Dussehri Mangoes',
      description: 'Sweet and aromatic Dussehri mangoes from Multan region, known for their fiberless flesh and rich flavor.',
      price: 450,
      categoryId: 'cat-1',
      unitId: 'unit-1',
      originId: 'origin-4',
      currencyId: 'curr-1',
      images: [
        '/images/products/mangoes/dussehri-mango-1.jpg',
        '/images/products/mangoes/dussehri-mango-2.jpg',
      ],
      stock: 150,
      sku: 'MNG-DUS-001',
      status: 'Active',
      featured: true,
      rating: 4.8,
      reviewCount: 156,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'chaunsa-mangoes',
      name: 'Chaunsa Mangoes',
      description: 'Premium Chaunsa mangoes from Rahim Yar Khan, famous for their sweet taste and beautiful golden color.',
      price: 520,
      categoryId: 'cat-1',
      unitId: 'unit-1',
      originId: 'origin-4',
      currencyId: 'curr-1',
      images: [
        '/images/products/mangoes/chaunsa-mango-1.jpg',
        '/images/products/mangoes/chaunsa-mango-2.jpg',
      ],
      stock: 200,
      sku: 'MNG-CHA-001',
      status: 'Active',
      featured: true,
      rating: 4.9,
      reviewCount: 234,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'anwar-ratol-mangoes',
      name: 'Anwar Ratol Mangoes',
      description: 'Small but incredibly sweet Anwar Ratol mangoes, perfect for desserts and eating fresh.',
      price: 480,
      categoryId: 'cat-1',
      unitId: 'unit-1',
      originId: 'origin-1',
      currencyId: 'curr-1',
      images: [
        '/images/products/mangoes/anwar-ratol-1.jpg',
        '/images/products/mangoes/anwar-ratol-2.jpg',
      ],
      stock: 120,
      sku: 'MNG-ANW-001',
      status: 'Active',
      featured: false,
      rating: 4.7,
      reviewCount: 89,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'almas-mangoes',
      name: 'Almas Mangoes',
      description: 'Premium Alfas mangoes from Sindh region, known for their unique flavor and aroma.',
      price: 550,
      categoryId: 'cat-1',
      unitId: 'unit-1',
      originId: 'origin-2',
      currencyId: 'curr-1',
      images: [
        '/images/products/mangoes/almas-mango-1.jpg',
        '/images/products/mangoes/almas-mango-2.jpg',
      ],
      stock: 100,
      sku: 'MNG-ALM-001',
      status: 'Active',
      featured: true,
      rating: 4.6,
      reviewCount: 67,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'badami-mangoes',
      name: 'Badami Mangoes',
      description: 'Sweet and juicy Badami mangoes from Punjab region, perfect for making juices and desserts.',
      price: 420,
      categoryId: 'cat-1',
      unitId: 'unit-1',
      originId: 'origin-1',
      currencyId: 'curr-1',
      images: [
        '/images/products/mangoes/badami-mango-1.jpg',
        '/images/products/mangoes/badami-mango-2.jpg',
      ],
      stock: 180,
      sku: 'MNG-BAD-001',
      status: 'Active',
      featured: false,
      rating: 4.5,
      reviewCount: 45,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],

  // Users
  users: [
    {
      id: 'user-1',
      name: 'Admin User',
      email: 'admin@kisanfresh.com',
      role: 'Admin',
      permissions: ['products:read', 'products:write', 'products:delete', 'categories:read', 'categories:write', 'categories:delete', 'units:read', 'units:write', 'units:delete', 'origins:read', 'origins:write', 'origins:delete', 'currencies:read', 'currencies:write', 'currencies:delete'],
      status: 'Active',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

export const seedDatabase = async (db) => {
  try {
    console.log('Seeding database with initial data from JSON...');
    
    // Use the JSON migration to seed the database
    await migrateFromJSON(db);
    
    console.log('Database seeded successfully from JSON');
    return true;
    // Seed units
    const unitsCount = await db.collections.units.count().exec();
    if (unitsCount === 0) {
      await db.collections.units.bulkInsert(seedData.units);
      console.log(`Seeded ${seedData.units.length} units`);
    }

    // Seed origins
    const originsCount = await db.collections.origins.count().exec();
    if (originsCount === 0) {
      await db.collections.origins.bulkInsert(seedData.origins);
      console.log(`Seeded ${seedData.origins.length} origins`);
    }

    // Seed currencies
    const currenciesCount = await db.collections.currencies.count().exec();
    if (currenciesCount === 0) {
      await db.collections.currencies.bulkInsert(seedData.currencies);
      console.log(`Seeded ${seedData.currencies.length} currencies`);
    }

    // Seed products
    const productsCount = await db.collections.products.count().exec();
    if (productsCount === 0) {
      await db.collections.products.bulkInsert(seedData.products);
      console.log(`Seeded ${seedData.products.length} products`);
    }

    // Seed users
    const usersCount = await db.collections.users.count().exec();
    if (usersCount === 0) {
      await db.collections.users.bulkInsert(seedData.users);
      console.log(`Seeded ${seedData.users.length} users`);
    }

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
