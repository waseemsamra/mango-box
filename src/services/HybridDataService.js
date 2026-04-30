import { getDatabase } from '../database/index';
import { Amplify } from 'aws-amplify';
import { amplifyConfig, isAmplifyConfigured } from '../config/amplify';
import { mobileStorageManager } from './MobileStorageManager';

class HybridDataService {
  constructor() {
    this.localDb = null;
    this.s3Key = 'database.json';
    this.syncInProgress = false;
    this.lastSyncTime = null;
    this.syncStatus = 'idle';
    this.listeners = [];
  }

  async init() {
    try {
      console.log('Initializing HybridDataService...');
      
      // Initialize mobile storage manager
      await mobileStorageManager.init();
      
      // Apply mobile optimizations
      mobileStorageManager.applyMobileOptimizations();
      
      // Initialize local database
      this.localDb = getDatabase();
      
      // Check if Amplify is configured
      if (!isAmplifyConfigured()) {
        console.warn('Amplify not configured, using local-only mode');
        this.syncStatus = 'local-only';
        return;
      }
      
      // Initial sync from S3
      await this.syncFromS3();
      
      // Setup automatic sync with mobile optimizations
      this.setupAutoSync();
      
      console.log('HybridDataService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize HybridDataService:', error);
      this.syncStatus = 'error';
    }
  }

  // Read from local RxDB (fast)
  async getProducts() {
    try {
      if (!this.localDb) {
        throw new Error('Database not initialized');
      }
      
      const products = await this.localDb.collections.products.find().exec();
      return products.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }

  async getOrders() {
    try {
      if (!this.localDb) {
        throw new Error('Database not initialized');
      }
      
      const orders = await this.localDb.collections.orders.find().exec();
      return orders.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  async getCategories() {
    try {
      if (!this.localDb) {
        throw new Error('Database not initialized');
      }
      
      const categories = await this.localDb.collections.categories.find().exec();
      return categories.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  // Write to both local and S3
  async createProduct(productData) {
    try {
      if (!this.localDb) {
        throw new Error('Database not initialized');
      }
      
      // Generate slug from product name
      const slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      
      const product = {
        ...productData,
        id: `product-${Date.now()}`,
        slug: slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: productData.status || 'Active',
        rating: productData.rating || 0,
        reviewCount: productData.reviewCount || 0,
      };

      // 1. Save to local RxDB
      const localProduct = await this.localDb.collections.products.insert(product);
      
      // 2. Sync to S3
      if (isAmplifyConfigured()) {
        await this.syncToS3();
      }
      
      this.notifyListeners('productCreated', localProduct.toJSON());
      return localProduct.toJSON();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async createOrder(orderData) {
    try {
      if (!this.localDb) {
        throw new Error('Database not initialized');
      }
      
      const order = {
        ...orderData,
        id: `order-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'pending'
      };

      // 1. Save to local RxDB
      const localOrder = await this.localDb.collections.orders.insert(order);
      
      // 2. Sync to S3
      if (isAmplifyConfigured()) {
        await this.syncToS3();
      }
      
      this.notifyListeners('orderCreated', localOrder.toJSON());
      return localOrder.toJSON();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    try {
      if (!this.localDb) {
        throw new Error('Database not initialized');
      }
      
      // Generate slug if name is being updated
      if (updateData.name) {
        const slug = updateData.name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim('-');
        updateData.slug = slug;
      }
      
      // Update local
      const product = await this.localDb.collections.products.findOne(id).exec();
      if (!product) {
        throw new Error('Product not found');
      }
      
      const updatedProduct = {
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      
      await product.patch(updatedProduct);
      
      // Sync to S3
      if (isAmplifyConfigured()) {
        await this.syncToS3();
      }
      
      this.notifyListeners('productUpdated', product.toJSON());
      return product.toJSON();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      if (!this.localDb) {
        throw new Error('Database not initialized');
      }
      
      // Delete from local
      const product = await this.localDb.collections.products.findOne(id).exec();
      if (!product) {
        throw new Error('Product not found');
      }
      
      await product.remove();
      
      // Sync to S3
      if (isAmplifyConfigured()) {
        await this.syncToS3();
      }
      
      this.notifyListeners('productDeleted', { id });
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Sync from S3 to local
  async syncFromS3() {
    if (!isAmplifyConfigured()) {
      console.log('Amplify not configured, skipping sync from S3');
      return;
    }
    
    try {
      this.syncStatus = 'syncing';
      console.log('Syncing from S3...');
      
      // Get data from S3
      const s3Data = await this.getS3Data();
      
      // Update local database
      await this.updateLocalDatabase(s3Data);
      
      this.lastSyncTime = new Date();
      this.syncStatus = 'success';
      console.log('Sync from S3 completed');
      
      this.notifyListeners('syncFromS3Completed', { timestamp: this.lastSyncTime });
    } catch (error) {
      console.error('Sync from S3 failed:', error);
      this.syncStatus = 'error';
      this.notifyListeners('syncError', { error: error.message, direction: 'fromS3' });
    }
  }

  // Sync local changes to S3
  async syncToS3() {
    if (!isAmplifyConfigured()) {
      console.log('Amplify not configured, skipping sync to S3');
      return;
    }
    
    if (this.syncInProgress) {
      console.log('Sync already in progress, skipping...');
      return;
    }
    
    try {
      this.syncInProgress = true;
      this.syncStatus = 'syncing';
      console.log('Syncing to S3...');
      
      // Get all local data
      const localData = await this.getAllLocalData();
      
      // Upload to S3
      await this.saveS3Data(localData);
      
      this.lastSyncTime = new Date();
      this.syncStatus = 'success';
      console.log('Sync to S3 completed');
      
      this.notifyListeners('syncToS3Completed', { timestamp: this.lastSyncTime });
    } catch (error) {
      console.error('Sync to S3 failed:', error);
      this.syncStatus = 'error';
      this.notifyListeners('syncError', { error: error.message, direction: 'toS3' });
    } finally {
      this.syncInProgress = false;
    }
  }

  // Get data from S3
  async getS3Data() {
    try {
      const { Storage } = await import('@aws-amplify/storage');
      const result = await Storage.get(this.s3Key, { download: true });
      const data = await result.Body.text();
      return JSON.parse(data);
    } catch (error) {
      console.log('No S3 data found, using empty database');
      return {
        products: [],
        orders: [],
        categories: [],
        users: []
      };
    }
  }

  // Save data to S3
  async saveS3Data(data) {
    try {
      const { Storage } = await import('@aws-amplify/storage');
      const jsonData = JSON.stringify(data, null, 2);
      await Storage.put(this.s3Key, jsonData, {
        contentType: 'application/json',
        level: 'public'
      });
    } catch (error) {
      console.error('Error saving to S3:', error);
      throw error;
    }
  }

  // Get all local data
  async getAllLocalData() {
    try {
      const collections = ['products', 'orders', 'categories', 'users'];
      const data = {};
      
      for (const collectionName of collections) {
        if (this.localDb.collections[collectionName]) {
          const docs = await this.localDb.collections[collectionName].find().exec();
          data[collectionName] = docs.map(doc => doc.toJSON());
        } else {
          data[collectionName] = [];
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error getting all local data:', error);
      return {
        products: [],
        orders: [],
        categories: [],
        users: []
      };
    }
  }

  // Update local database with S3 data
  async updateLocalDatabase(s3Data) {
    try {
      const collections = ['products', 'orders', 'categories', 'users'];
      
      for (const collectionName of collections) {
        if (this.localDb.collections[collectionName]) {
          const collection = this.localDb.collections[collectionName];
          const s3Items = s3Data[collectionName] || [];
          
          // Clear existing data
          await collection.remove();
          
          // Insert S3 data
          for (const item of s3Items) {
            await collection.upsert(item);
          }
        }
      }
    } catch (error) {
      console.error('Error updating local database:', error);
      throw error;
    }
  }

  // Setup automatic sync
  setupAutoSync() {
    // Get mobile optimizations
    const mobileOptimizations = mobileStorageManager.getMobileOptimizations();
    
    // Use mobile-optimized sync intervals
    const syncToS3Interval = mobileOptimizations?.syncInterval || 30000;
    const syncFromS3Interval = mobileOptimizations?.syncInterval ? mobileOptimizations.syncInterval * 2 : 60000;
    
    // Sync to S3 (mobile optimized)
    setInterval(() => {
      if (isAmplifyConfigured()) {
        this.syncToS3();
      }
    }, syncToS3Interval);

    // Sync from S3 (mobile optimized)
    setInterval(() => {
      if (isAmplifyConfigured()) {
        this.syncFromS3();
      }
    }, syncFromS3Interval);

    // Sync on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && isAmplifyConfigured()) {
        this.syncFromS3();
      }
    });

    // Sync on window focus
    window.addEventListener('focus', () => {
      if (isAmplifyConfigured()) {
        this.syncFromS3();
      }
    });

    // Mobile-specific: Sync on online/offline events
    window.addEventListener('online', () => {
      if (isAmplifyConfigured()) {
        console.log('Device online, syncing data');
        this.syncToS3();
      }
    });

    window.addEventListener('offline', () => {
      console.log('Device offline, using local data only');
    });
  }

  // Force sync
  async forceSync() {
    if (!isAmplifyConfigured()) {
      console.log('Amplify not configured, cannot force sync');
      return;
    }
    
    try {
      await Promise.all([
        this.syncFromS3(),
        this.syncToS3()
      ]);
    } catch (error) {
      console.error('Force sync failed:', error);
      throw error;
    }
  }

  // Event listeners
  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners(event, data) {
    this.listeners.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('Error in sync listener:', error);
      }
    });
  }

  // Get sync status
  getSyncStatus() {
    return {
      status: this.syncStatus,
      lastSyncTime: this.lastSyncTime,
      isInProgress: this.syncInProgress,
      isAmplifyConfigured: isAmplifyConfigured()
    };
  }

  // Clear all data (both local and S3)
  async clearAllData() {
    try {
      // Clear local database
      if (this.localDb) {
        const collections = ['products', 'orders', 'categories', 'users'];
        for (const collectionName of collections) {
          if (this.localDb.collections[collectionName]) {
            await this.localDb.collections[collectionName].remove();
          }
        }
      }
      
      // Clear S3 data
      if (isAmplifyConfigured()) {
        try {
          const { Storage } = await import('@aws-amplify/storage');
          await Storage.remove(this.s3Key);
        } catch (error) {
          console.error('Error removing S3 data:', error);
        }
      }
      
      this.notifyListeners('dataCleared', {});
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const hybridDataService = new HybridDataService();
export default hybridDataService;
