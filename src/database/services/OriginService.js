import { getDatabase } from '../index';

class OriginService {
  constructor() {
    this.db = null;
  }

  async init() {
    this.db = getDatabase();
  }

  // Get all origins
  async getAllOrigins() {
    try {
      if (!this.db) {
        await this.init();
      }
      const origins = await this.db.collections.origins.find().exec();
      return origins.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching origins:', error);
      throw error;
    }
  }

  // Get origin by ID
  async getOriginById(id) {
    try {
      const origin = await this.db.collections.origins.findOne(id).exec();
      return origin ? origin.toJSON() : null;
    } catch (error) {
      console.error('Error fetching origin:', error);
      throw error;
    }
  }

  // Get origins by country
  async getOriginsByCountry(country) {
    try {
      const origins = await this.db.collections.origins.find({
        selector: {
          country: country,
          status: 'Active'
        }
      }).exec();
      return origins.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching origins by country:', error);
      throw error;
    }
  }

  // Get origins by region
  async getOriginsByRegion(region) {
    try {
      const origins = await this.db.collections.origins.find({
        selector: {
          region: region,
          status: 'Active'
        }
      }).exec();
      return origins.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching origins by region:', error);
      throw error;
    }
  }

  // Get active origins
  async getActiveOrigins() {
    try {
      const origins = await this.db.collections.origins.find({
        selector: {
          status: 'Active'
        }
      }).exec();
      return origins.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching active origins:', error);
      throw error;
    }
  }

  // Create new origin
  async createOrigin(originData) {
    try {
      const origin = {
        ...originData,
        id: `origin-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: originData.status || 'Active',
        productCount: 0,
      };

      const result = await this.db.collections.origins.insert(origin);
      return result.toJSON();
    } catch (error) {
      console.error('Error creating origin:', error);
      throw error;
    }
  }

  // Update origin
  async updateOrigin(id, updateData) {
    try {
      const origin = await this.db.collections.origins.findOne(id).exec();
      if (!origin) {
        throw new Error('Origin not found');
      }

      const updatedOrigin = {
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      await origin.patch(updatedOrigin);
      return origin.toJSON();
    } catch (error) {
      console.error('Error updating origin:', error);
      throw error;
    }
  }

  // Delete origin
  async deleteOrigin(id) {
    try {
      const origin = await this.db.collections.origins.findOne(id).exec();
      if (!origin) {
        throw new Error('Origin not found');
      }

      await origin.remove();
      return true;
    } catch (error) {
      console.error('Error deleting origin:', error);
      throw error;
    }
  }

  // Update origin product count
  async updateProductCount(originId) {
    try {
      const products = await this.db.collections.products.find({
        selector: { originId: originId }
      }).exec();
      const productCount = products.length;

      const origin = await this.db.collections.origins.findOne(originId).exec();
      if (origin) {
        await origin.patch({
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

  // Get origin statistics
  async getOriginStats() {
    try {
      const allOrigins = await this.db.collections.origins.find().exec();
      const totalOrigins = allOrigins.length;
      const activeOriginsList = await this.db.collections.origins.find({
        selector: { status: 'Active' }
      }).exec();
      const activeOrigins = activeOriginsList.length;

      const originsByCountry = await this.db.collections.origins.find().exec();
      const countryStats = originsByCountry.reduce((acc, origin) => {
        const country = origin.toJSON().country;
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {});

      const totalProducts = originsByCountry.reduce((sum, origin) => sum + (origin.toJSON().productCount || 0), 0);

      return {
        total: totalOrigins,
        active: activeOrigins,
        byCountry: countryStats,
        totalProducts: totalProducts
      };
    } catch (error) {
      console.error('Error fetching origin stats:', error);
      throw error;
    }
  }

  // Search origins
  async searchOrigins(query) {
    try {
      const origins = await this.db.collections.origins.find({
        selector: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { region: { $regex: query, $options: 'i' } },
            { country: { $regex: query, $options: 'i' } },
            { code: { $regex: query, $options: 'i' } }
          ],
          status: 'Active'
        }
      }).exec();
      return origins.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error searching origins:', error);
      throw error;
    }
  }

  // Get unique countries
  async getUniqueCountries() {
    try {
      const origins = await this.db.collections.origins.find({
        selector: { status: 'Active' }
      }).exec();
      const countries = [...new Set(origins.map(origin => origin.toJSON().country))];
      return countries.sort();
    } catch (error) {
      console.error('Error fetching unique countries:', error);
      throw error;
    }
  }

  // Get regions by country
  async getRegionsByCountry(country) {
    try {
      const origins = await this.db.collections.origins.find({
        selector: {
          country: country,
          status: 'Active'
        }
      }).exec();
      const regions = [...new Set(origins.map(origin => origin.toJSON().region))];
      return regions.sort();
    } catch (error) {
      console.error('Error fetching regions by country:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const originService = new OriginService();
