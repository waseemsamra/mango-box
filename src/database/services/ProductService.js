import { hybridDataService } from '../../services/HybridDataService';

class ProductService {
  constructor() {
    this.hybridService = hybridDataService;
  }

  async init() {
    await this.hybridService.init();
  }

  // Get all products
  async getAllProducts() {
    try {
      return await this.hybridService.getProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get product by ID (supports multiple lookup methods)
  async getProductById(id) {
    try {
      const products = await this.hybridService.getProducts();
      
      console.log('ProductService - Looking for product with ID:', id);
      
      // First try to find by primary key (id field)
      let product = products.find(p => p.id === id);
      
      if (product) {
        console.log('ProductService - Found product by ID:', product.name);
        return product;
      }
      
      // Try to find by slug field
      product = products.find(p => p.slug === id.toLowerCase());
      
      if (product) {
        console.log('ProductService - Found product by slug:', product.name);
        return product;
      }
      
      // If not found, try to find by slug/name (convert to proper format)
      const slugName = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      console.log('ProductService - Trying to find by name:', slugName);
      
      product = products.find(p => p.name === slugName);
      
      if (product) {
        console.log('ProductService - Found product by name:', product.name);
        return product;
      }
      
      // If still not found, try case-insensitive search
      const matchedProduct = products.find(productData => {
        const productNameSlug = productData.name.toLowerCase().replace(/\s+/g, '-');
        const productSlug = productData.slug || productNameSlug;
        return productSlug === id.toLowerCase();
      });
      
      if (matchedProduct) {
        console.log('ProductService - Found product by slug matching:', matchedProduct.name);
        return matchedProduct;
      }
      
      console.log('ProductService - Product not found with ID:', id);
      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Get products by category
  async getProductsByCategory(categoryId) {
    try {
      const products = await this.hybridService.getProducts();
      return products.filter(p => p.categoryId === categoryId && p.status === 'Active');
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  // Get featured products
  async getFeaturedProducts(limit = 8) {
    try {
      const products = await this.hybridService.getProducts();
      return products
        .filter(p => p.featured && p.status === 'Active')
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }

  // Create new product
  async createProduct(productData) {
    try {
      return await this.hybridService.createProduct(productData);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update product
  async updateProduct(id, updateData) {
    try {
      return await this.hybridService.updateProduct(id, updateData);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product
  async deleteProduct(id) {
    try {
      return await this.hybridService.deleteProduct(id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Search products
  async searchProducts(query, filters = {}) {
    try {
      const products = await this.hybridService.getProducts();
      
      return products.filter(product => {
        // Only active products
        if (product.status !== 'Active') return false;
        
        // Search query
        if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
          return false;
        }
        
        // Filters
        if (filters.categoryId && product.categoryId !== filters.categoryId) {
          return false;
        }
        if (filters.unitId && product.unitId !== filters.unitId) {
          return false;
        }
        if (filters.originId && product.originId !== filters.originId) {
          return false;
        }
        if (filters.minPrice !== undefined && product.price < filters.minPrice) {
          return false;
        }
        if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
          return false;
        }
        if (filters.featured !== undefined && product.featured !== filters.featured) {
          return false;
        }
        
        return true;
      });
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Update product stock
  async updateStock(id, quantity, operation = 'set') {
    try {
      const products = await this.hybridService.getProducts();
      const product = products.find(p => p.id === id);
      
      if (!product) {
        throw new Error('Product not found');
      }

      let newStock;
      if (operation === 'add') {
        newStock = product.stock + quantity;
      } else if (operation === 'subtract') {
        newStock = Math.max(0, product.stock - quantity);
      } else {
        newStock = quantity;
      }

      return await this.hybridService.updateProduct(id, {
        stock: newStock,
        status: newStock === 0 ? 'Out of Stock' : 'Active'
      });
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  }

  // Get product statistics
  async getProductStats() {
    try {
      const products = await this.hybridService.getProducts();
      
      const totalProducts = products.length;
      const activeProducts = products.filter(p => p.status === 'Active').length;
      const featuredProducts = products.filter(p => p.featured).length;
      const outOfStock = products.filter(p => p.status === 'Out of Stock').length;

      return {
        total: totalProducts,
        active: activeProducts,
        featured: featuredProducts,
        outOfStock: outOfStock
      };
    } catch (error) {
      console.error('Error fetching product stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const productService = new ProductService();
