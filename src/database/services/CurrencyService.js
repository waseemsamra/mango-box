import { getDatabase } from '../index';

class CurrencyService {
  constructor() {
    this.db = null;
  }

  async init() {
    this.db = getDatabase();
  }

  // Get all currencies
  async getAllCurrencies() {
    try {
      if (!this.db) {
        await this.init();
      }
      const currencies = await this.db.collections.currencies.find().exec();
      return currencies.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching currencies:', error);
      throw error;
    }
  }

  // Get currency by ID
  async getCurrencyById(id) {
    try {
      const currency = await this.db.collections.currencies.findOne(id).exec();
      return currency ? currency.toJSON() : null;
    } catch (error) {
      console.error('Error fetching currency:', error);
      throw error;
    }
  }

  // Get currency by code
  async getCurrencyByCode(code) {
    try {
      const currency = await this.db.collections.currencies.findOne({
        selector: { code: code.toUpperCase() }
      }).exec();
      return currency ? currency.toJSON() : null;
    } catch (error) {
      console.error('Error fetching currency by code:', error);
      throw error;
    }
  }

  // Get base currency
  async getBaseCurrency() {
    try {
      const currency = await this.db.collections.currencies.findOne({
        selector: { isBase: true }
      }).exec();
      return currency ? currency.toJSON() : null;
    } catch (error) {
      console.error('Error fetching base currency:', error);
      throw error;
    }
  }

  // Get active currencies
  async getActiveCurrencies() {
    try {
      const currencies = await this.db.collections.currencies.find({
        selector: {
          status: 'Active'
        }
      }).exec();
      return currencies.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching active currencies:', error);
      throw error;
    }
  }

  // Create new currency
  async createCurrency(currencyData) {
    try {
      const currency = {
        ...currencyData,
        id: `curr-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: currencyData.status || 'Active',
        isBase: currencyData.isBase || false,
      };

      // If setting as base currency, remove base status from all others
      if (currency.isBase) {
        await this.db.collections.currencies.find().exec().then(currencies => {
          return Promise.all(
            currencies.map(c => c.patch({ isBase: false }))
          );
        });
      }

      const result = await this.db.collections.currencies.insert(currency);
      return result.toJSON();
    } catch (error) {
      console.error('Error creating currency:', error);
      throw error;
    }
  }

  // Update currency
  async updateCurrency(id, updateData) {
    try {
      const currency = await this.db.collections.currencies.findOne(id).exec();
      if (!currency) {
        throw new Error('Currency not found');
      }

      const updatedCurrency = {
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      // If setting as base currency, remove base status from all others
      if (updatedCurrency.isBase) {
        await this.db.collections.currencies.find().exec().then(currencies => {
          return Promise.all(
            currencies.map(c => c.patch({ isBase: false }))
          );
        });
      }

      await currency.patch(updatedCurrency);
      return currency.toJSON();
    } catch (error) {
      console.error('Error updating currency:', error);
      throw error;
    }
  }

  // Delete currency
  async deleteCurrency(id) {
    try {
      const currency = await this.db.collections.currencies.findOne(id).exec();
      if (!currency) {
        throw new Error('Currency not found');
      }

      // Don't allow deletion of base currency
      if (currency.toJSON().isBase) {
        throw new Error('Cannot delete base currency');
      }

      await currency.remove();
      return true;
    } catch (error) {
      console.error('Error deleting currency:', error);
      throw error;
    }
  }

  // Set currency as base
  async setAsBaseCurrency(id) {
    try {
      // Remove base status from all currencies
      await this.db.collections.currencies.find().exec().then(currencies => {
        return Promise.all(
          currencies.map(c => c.patch({ isBase: false }))
        );
      });

      // Set new base currency
      const currency = await this.db.collections.currencies.findOne(id).exec();
      if (!currency) {
        throw new Error('Currency not found');
      }

      await currency.patch({
        isBase: true,
        updatedAt: new Date().toISOString()
      });

      return currency.toJSON();
    } catch (error) {
      console.error('Error setting base currency:', error);
      throw error;
    }
  }

  // Get currency statistics
  async getCurrencyStats() {
    try {
      const allCurrencies = await this.db.collections.currencies.find().exec();
      const totalCurrencies = allCurrencies.length;
      const activeCurrenciesList = await this.db.collections.currencies.find({
        selector: { status: 'Active' }
      }).exec();
      const activeCurrencies = activeCurrenciesList.length;

      const baseCurrency = await this.getBaseCurrency();

      return {
        total: totalCurrencies,
        active: activeCurrencies,
        baseCurrency: baseCurrency
      };
    } catch (error) {
      console.error('Error fetching currency stats:', error);
      throw error;
    }
  }

  // Search currencies
  async searchCurrencies(query) {
    try {
      const currencies = await this.db.collections.currencies.find({
        selector: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { code: { $regex: query, $options: 'i' } },
            { symbol: { $regex: query, $options: 'i' } }
          ],
          status: 'Active'
        }
      }).exec();
      return currencies.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error searching currencies:', error);
      throw error;
    }
  }

  // Convert amount from one currency to another
  async convertAmount(amount, fromCurrencyCode, toCurrencyCode) {
    try {
      const fromCurrency = await this.getCurrencyByCode(fromCurrencyCode);
      const toCurrency = await this.getCurrencyByCode(toCurrencyCode);
      
      if (!fromCurrency || !toCurrency) {
        throw new Error('Currency not found');
      }

      // Convert to base currency first, then to target currency
      const baseAmount = amount * fromCurrency.exchangeRate;
      const targetAmount = baseAmount / toCurrency.exchangeRate;

      return {
        amount: targetAmount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: toCurrency.exchangeRate / fromCurrency.exchangeRate
      };
    } catch (error) {
      console.error('Error converting currency:', error);
      throw error;
    }
  }

  // Update exchange rates
  async updateExchangeRates(rates) {
    try {
      const updatePromises = Object.entries(rates).map(([code, rate]) => {
        return this.db.collections.currencies.find({
          selector: { code: code.toUpperCase() }
        }).exec().then(currencies => {
          if (currencies.length > 0) {
            return currencies[0].patch({
              exchangeRate: rate,
              updatedAt: new Date().toISOString()
            });
          }
        });
      });

      await Promise.all(updatePromises);
      return true;
    } catch (error) {
      console.error('Error updating exchange rates:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const currencyService = new CurrencyService();
