class MobileStorageManager {
  constructor() {
    this.storageQuota = null;
    this.storageUsed = 0;
    this.isLowStorage = false;
    this.cleanupThreshold = 0.8; // 80% threshold for cleanup
  }

  // Initialize storage manager
  async init() {
    await this.checkStorageQuota();
    this.setupStorageMonitoring();
  }

  // Check storage quota and usage
  async checkStorageQuota() {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        this.storageQuota = estimate.quota;
        this.storageUsed = estimate.usage;
        
        // Check if storage is running low
        this.isLowStorage = (this.storageUsed / this.storageQuota) > this.cleanupThreshold;
        
        console.log(`Storage: ${this.formatBytes(this.storageUsed)} / ${this.formatBytes(this.storageQuota)}`);
        
        if (this.isLowStorage) {
          console.warn('Storage running low, initiating cleanup');
          await this.performCleanup();
        }
      }
    } catch (error) {
      console.error('Error checking storage quota:', error);
    }
  }

  // Setup storage monitoring
  setupStorageMonitoring() {
    // Monitor storage changes
    if ('storage' in navigator) {
      window.addEventListener('storage', () => {
        this.checkStorageQuota();
      });
    }

    // Check storage periodically
    setInterval(() => {
      this.checkStorageQuota();
    }, 60000); // Every minute
  }

  // Perform cleanup when storage is low
  async performCleanup() {
    console.log('Performing storage cleanup...');
    
    try {
      // 1. Clear old cached data
      await this.clearOldCache();
      
      // 2. Compress local database
      await this.compressDatabase();
      
      // 3. Remove old sync logs
      await this.cleanupSyncLogs();
      
      // 4. Re-check storage
      await this.checkStorageQuota();
      
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  // Clear old cache data
  async clearOldCache() {
    try {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => name !== 'kisanfresh-v1');
      
      for (const cacheName of oldCaches) {
        await caches.delete(cacheName);
        console.log(`Deleted old cache: ${cacheName}`);
      }
    } catch (error) {
      console.error('Error clearing old cache:', error);
    }
  }

  // Compress database by removing old data
  async compressDatabase() {
    try {
      // Get database instance
      const { getDatabase } = await import('../database/index');
      const db = getDatabase();
      
      if (!db) return;

      // Remove old orders (keep only last 100)
      const orders = await db.collections.orders.find().exec();
      if (orders.length > 100) {
        const oldOrders = orders.slice(100);
        for (const order of oldOrders) {
          await order.remove();
        }
        console.log(`Removed ${oldOrders.length} old orders`);
      }

      // Remove inactive products
      const inactiveProducts = await db.collections.products.find({
        selector: { status: 'Inactive' }
      }).exec();
      
      for (const product of inactiveProducts) {
        await product.remove();
      }
      console.log(`Removed ${inactiveProducts.length} inactive products`);
      
    } catch (error) {
      console.error('Error compressing database:', error);
    }
  }

  // Cleanup sync logs
  async cleanupSyncLogs() {
    try {
      // Clear localStorage sync logs (keep only last 50)
      const syncLogs = Object.keys(localStorage).filter(key => key.startsWith('sync_log_'));
      if (syncLogs.length > 50) {
        const oldLogs = syncLogs.slice(50);
        for (const logKey of oldLogs) {
          localStorage.removeItem(logKey);
        }
        console.log(`Removed ${oldLogs.length} old sync logs`);
      }
    } catch (error) {
      console.error('Error cleaning sync logs:', error);
    }
  }

  // Get storage status
  getStorageStatus() {
    const usagePercentage = this.storageQuota ? (this.storageUsed / this.storageQuota) * 100 : 0;
    
    return {
      used: this.formatBytes(this.storageUsed),
      quota: this.formatBytes(this.storageQuota),
      percentage: usagePercentage.toFixed(1),
      isLowStorage: this.isLowStorage,
      status: this.isLowStorage ? 'warning' : 'healthy'
    };
  }

  // Format bytes to human readable format
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Request more storage quota
  async requestMoreStorage() {
    try {
      if ('storage' in navigator && 'persist' in navigator.storage) {
        const isPersistent = await navigator.storage.persist();
        if (isPersistent) {
          console.log('Storage persistence granted');
          return true;
        } else {
          console.log('Storage persistence denied');
          return false;
        }
      }
    } catch (error) {
      console.error('Error requesting storage persistence:', error);
      return false;
    }
  }

  // Check if device is mobile
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Get mobile-specific optimizations
  getMobileOptimizations() {
    if (!this.isMobileDevice()) {
      return null;
    }

    return {
      // Reduce sync frequency on mobile to save battery
      syncInterval: 120000, // 2 minutes instead of 30 seconds
      
      // Smaller batch sizes for mobile
      batchSize: 10,
      
      // Enable aggressive cleanup
      aggressiveCleanup: true,
      
      // Lower storage threshold
      cleanupThreshold: 0.7, // 70% instead of 80%
      
      // Enable compression
      enableCompression: true
    };
  }

  // Apply mobile optimizations
  applyMobileOptimizations() {
    const optimizations = this.getMobileOptimizations();
    
    if (!optimizations) {
      return;
    }

    console.log('Applying mobile optimizations:', optimizations);
    
    // Update cleanup threshold
    this.cleanupThreshold = optimizations.cleanupThreshold;
    
    // Request persistent storage
    this.requestMoreStorage();
    
    // Setup mobile-specific sync intervals
    if (optimizations.aggressiveCleanup) {
      setInterval(() => {
        this.checkStorageQuota();
      }, 30000); // Every 30 seconds on mobile
    }
  }

  // Export data for backup
  async exportData() {
    try {
      const { hybridDataService } = await import('./HybridDataService');
      const data = await hybridDataService.getAllLocalData();
      
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kisanfresh-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
      
      console.log('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  // Import data from backup
  async importData(file) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      const { hybridDataService } = await import('./HybridDataService');
      await hybridDataService.updateLocalDatabase(data);
      
      console.log('Data imported successfully');
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const mobileStorageManager = new MobileStorageManager();
export default mobileStorageManager;
