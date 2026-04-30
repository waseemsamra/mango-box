import { getDatabase } from '../index';

class UnitService {
  constructor() {
    this.db = null;
  }

  async init() {
    this.db = getDatabase();
  }

  // Get all units
  async getAllUnits() {
    try {
      if (!this.db) {
        await this.init();
      }
      const units = await this.db.collections.units.find().exec();
      return units.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching units:', error);
      throw error;
    }
  }

  // Get unit by ID
  async getUnitById(id) {
    try {
      const unit = await this.db.collections.units.findOne(id).exec();
      return unit ? unit.toJSON() : null;
    } catch (error) {
      console.error('Error fetching unit:', error);
      throw error;
    }
  }

  // Get units by type
  async getUnitsByType(type) {
    try {
      const units = await this.db.collections.units.find({
        selector: {
          type: type,
          status: 'Active'
        }
      }).exec();
      return units.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching units by type:', error);
      throw error;
    }
  }

  // Get active units
  async getActiveUnits() {
    try {
      const units = await this.db.collections.units.find({
        selector: {
          status: 'Active'
        }
      }).exec();
      return units.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching active units:', error);
      throw error;
    }
  }

  // Create new unit
  async createUnit(unitData) {
    try {
      const unit = {
        ...unitData,
        id: `unit-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: unitData.status || 'Active',
      };

      const result = await this.db.collections.units.insert(unit);
      return result.toJSON();
    } catch (error) {
      console.error('Error creating unit:', error);
      throw error;
    }
  }

  // Update unit
  async updateUnit(id, updateData) {
    try {
      const unit = await this.db.collections.units.findOne(id).exec();
      if (!unit) {
        throw new Error('Unit not found');
      }

      const updatedUnit = {
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      await unit.patch(updatedUnit);
      return unit.toJSON();
    } catch (error) {
      console.error('Error updating unit:', error);
      throw error;
    }
  }

  // Delete unit
  async deleteUnit(id) {
    try {
      const unit = await this.db.collections.units.findOne(id).exec();
      if (!unit) {
        throw new Error('Unit not found');
      }

      await unit.remove();
      return true;
    } catch (error) {
      console.error('Error deleting unit:', error);
      throw error;
    }
  }

  // Get unit statistics
  async getUnitStats() {
    try {
      const allUnits = await this.db.collections.units.find().exec();
      const totalUnits = allUnits.length;
      const activeUnitsList = await this.db.collections.units.find({
        selector: { status: 'Active' }
      }).exec();
      const activeUnits = activeUnitsList.length;

      const unitsByType = await this.db.collections.units.find().exec();
      const typeStats = unitsByType.reduce((acc, unit) => {
        const type = unit.toJSON().type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      return {
        total: totalUnits,
        active: activeUnits,
        byType: typeStats
      };
    } catch (error) {
      console.error('Error fetching unit stats:', error);
      throw error;
    }
  }

  // Search units
  async searchUnits(query) {
    try {
      const units = await this.db.collections.units.find({
        selector: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { abbreviation: { $regex: query, $options: 'i' } }
          ],
          status: 'Active'
        }
      }).exec();
      return units.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error searching units:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const unitService = new UnitService();
