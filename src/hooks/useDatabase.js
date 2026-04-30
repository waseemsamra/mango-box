import { useState, useEffect, useCallback } from 'react';
import { initializeDatabase, getDatabase } from '../database';
import { createCollections } from '../database/collections';
import { seedDatabase } from '../database/seedData';
import { productService, categoryService } from '../database/services';
import { hybridDataService } from '../services/HybridDataService';

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize database
      const db = await initializeDatabase();
      
      // Create collections
      await createCollections(db);
      
      // Seed database with initial data
      await seedDatabase(db);
      
      // Initialize hybrid data service
      await hybridDataService.init();
      
      // Initialize services
      await productService.init();
      await categoryService.init();

      setIsInitialized(true);
      console.log('Hybrid database initialized and seeded successfully');
    } catch (err) {
      console.error('Database initialization failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    isInitialized,
    isLoading,
    error,
    database: isInitialized ? getDatabase() : null,
    retry: initialize,
  };
};

// Custom hooks for specific entities
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = useCallback(async (productData) => {
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateProduct = useCallback(async (id, updateData) => {
    try {
      const updatedProduct = await productService.updateProduct(id, updateData);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(async (categoryData) => {
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateCategory = useCallback(async (id, updateData) => {
    try {
      const updatedCategory = await categoryService.updateCategory(id, updateData);
      setCategories(prev => prev.map(c => c.id === id ? updatedCategory : c));
      return updatedCategory;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteCategory = useCallback(async (id) => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
