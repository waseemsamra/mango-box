import { getDatabase } from '../index';

class CategoryService {
  constructor() {
    this.db = null;
  }

  async init() {
    this.db = getDatabase();
  }

  // Get all categories
  async getAllCategories() {
    try {
      if (!this.db) {
        await this.init();
      }
      const categories = await this.db.collections.categories.find().exec();
      return categories.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Get category by ID
  async getCategoryById(id) {
    try {
      if (!this.db) {
        await this.init();
      }
      const category = await this.db.collections.categories.findOne(id).exec();
      return category ? category.toJSON() : null;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }

  // Get category by slug
  async getCategoryBySlug(slug) {
    try {
      const category = await this.db.collections.categories.findOne({
        selector: { slug }
      }).exec();
      return category ? category.toJSON() : null;
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      throw error;
    }
  }

  // Get active categories sorted by priority
  async getActiveCategories() {
    try {
      const categories = await this.db.collections.categories.find({
        selector: {
          status: 'Active'
        },
        sort: [{ displayPriority: 'asc' }]
      }).exec();
      return categories.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching active categories:', error);
      throw error;
    }
  }

  // Get parent categories (categories without parent)
  async getParentCategories() {
    try {
      const categories = await this.db.collections.categories.find({
        selector: {
          parentId: { $exists: false },
          status: 'Active'
        },
        sort: [{ displayPriority: 'asc' }]
      }).exec();
      return categories.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching parent categories:', error);
      throw error;
    }
  }

  // Get child categories
  async getChildCategories(parentId) {
    try {
      const categories = await this.db.collections.categories.find({
        selector: {
          parentId: parentId,
          status: 'Active'
        },
        sort: [{ displayPriority: 'asc' }]
      }).exec();
      return categories.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching child categories:', error);
      throw error;
    }
  }

  // Create new category
  async createCategory(categoryData) {
    try {
      // Generate slug if not provided
      const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const category = {
        ...categoryData,
        id: `cat-${Date.now()}`,
        slug: slug,
        displayPriority: categoryData.displayPriority || 0,
        status: categoryData.status || 'Active',
        productCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await this.db.collections.categories.insert(category);
      return result.toJSON();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Update category
  async updateCategory(id, updateData) {
    try {
      console.log('CategoryService - Updating category:', id, updateData);
      const category = await this.db.collections.categories.findOne(id).exec();
      if (!category) {
        throw new Error('Category not found');
      }

      const updatedCategory = {
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      console.log('CategoryService - Final update data:', updatedCategory);

      // Update slug if name changed and slug not provided
      if (updateData.name && !updateData.slug) {
        updatedCategory.slug = updateData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }

      await category.patch(updatedCategory);
      const result = category.toJSON();
      console.log('CategoryService - Update result:', result);
      return result;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  // Delete category
  async deleteCategory(id) {
    try {
      const category = await this.db.collections.categories.findOne(id).exec();
      if (!category) {
        throw new Error('Category not found');
      }

      // Check if category has child categories
      const childCategories = await this.getChildCategories(id);
      if (childCategories.length > 0) {
        throw new Error('Cannot delete category with child categories');
      }

      // Check if category has products
      const products = await this.db.collections.products.find({
        selector: { categoryId: id }
      }).exec();
      if (products.length > 0) {
        throw new Error('Cannot delete category with associated products');
      }

      await category.remove();
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  // Update category product count
  async updateProductCount(categoryId) {
    try {
      const products = await this.db.collections.products.find({
        selector: { categoryId: categoryId }
      }).exec();
      const productCount = products.length;

      const category = await this.db.collections.categories.findOne(categoryId).exec();
      if (category) {
        await category.patch({
          productCount: productCount,
          updatedAt: new Date().toISOString()
        });
      }

      return productCount;
    } catch (error) {
      console.error('Error updating product count:', error);
      throw error;
    }
  }

  // Search categories
  async searchCategories(query) {
    try {
      const categories = await this.db.collections.categories.find({
        selector: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ],
          status: 'Active'
        },
        sort: [{ displayPriority: 'asc' }]
      }).exec();
      return categories.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error searching categories:', error);
      throw error;
    }
  }

  // Get category statistics
  async getCategoryStats() {
    try {
      const allCategories = await this.db.collections.categories.find().exec();
      const totalCategories = allCategories.length;
      
      const activeCategoriesList = await this.db.collections.categories.find({
        selector: { status: 'Active' }
      }).exec();
      const activeCategories = activeCategoriesList.length;
      
      const parentCategoriesList = await this.db.collections.categories.find({
        selector: { parentId: { $exists: false } }
      }).exec();
      const parentCategories = parentCategoriesList.length;

      return {
        total: totalCategories,
        active: activeCategories,
        parent: parentCategories
      };
    } catch (error) {
      console.error('Error fetching category stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const categoryService = new CategoryService();
