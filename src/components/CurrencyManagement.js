import React, { useState, useEffect } from 'react';
import { currencyService } from '../database/services';

const CurrencyManagement = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        setError(null);
        const currenciesData = await currencyService.getAllCurrencies();
        setCurrencies(currenciesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [newCurrency, setNewCurrency] = useState({
    name: '',
    code: '',
    symbol: '',
    exchangeRate: 1,
    isBase: false,
    status: 'Active'
  });

  const handleAddCurrency = async () => {
    try {
      const currency = await currencyService.createCurrency(newCurrency);
      setCurrencies([...currencies, currency]);
      setShowAddModal(false);
      setNewCurrency({
        name: '',
        code: '',
        symbol: '',
        exchangeRate: 1,
        isBase: false,
        status: 'Active'
      });
    } catch (err) {
      alert('Error adding currency: ' + err.message);
    }
  };

  const handleEditCurrency = async () => {
    try {
      const updatedCurrency = await currencyService.updateCurrency(editingCurrency.id, editingCurrency);
      setCurrencies(currencies.map(c => c.id === editingCurrency.id ? updatedCurrency : c));
      setShowEditModal(false);
      setEditingCurrency(null);
    } catch (err) {
      alert('Error updating currency: ' + err.message);
    }
  };

  const handleDeleteCurrency = async (id) => {
    if (window.confirm('Are you sure you want to delete this currency?')) {
      try {
        await currencyService.deleteCurrency(id);
        setCurrencies(currencies.filter(c => c.id !== id));
      } catch (err) {
        alert('Error deleting currency: ' + err.message);
      }
    }
  };

  const handleSetAsBase = async (id) => {
    try {
      const updatedCurrency = await currencyService.setAsBaseCurrency(id);
      setCurrencies(currencies.map(c => c.id === id ? updatedCurrency : { ...c, isBase: false }));
    } catch (err) {
      alert('Error setting base currency: ' + err.message);
    }
  };

  const openEditModal = (currency) => {
    setEditingCurrency({ ...currency });
    setShowEditModal(true);
  };

  const baseCurrency = currencies.find(c => c.isBase);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-on-surface">Loading Currencies...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-error text-2xl">error</span>
          </div>
          <h2 className="text-xl font-semibold text-on-surface">Failed to Load Currencies</h2>
          <p className="text-sm text-on-surface-variant mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Currency Management</h2>
          <p className="text-sm text-on-surface-variant">Manage currencies and exchange rates</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Add Currency
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Total Currencies</p>
          <p className="text-2xl font-bold text-on-surface">{currencies.length}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Active Currencies</p>
          <p className="text-2xl font-bold text-on-surface">{currencies.filter(c => c.status === 'Active').length}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Base Currency</p>
          <p className="text-2xl font-bold text-on-surface">{baseCurrency?.code || 'None'}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Base Rate</p>
          <p className="text-2xl font-bold text-on-surface">{baseCurrency?.exchangeRate || 0}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-container">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Currency</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Code</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Symbol</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Exchange Rate</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.id} className="border-t border-outline-variant">
                <td className="px-4 py-3 text-sm text-on-surface">{currency.name}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{currency.code}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{currency.symbol}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{currency.exchangeRate.toFixed(2)}</td>
                <td className="px-4 py-3">
                  {currency.isBase ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-primary-container text-on-primary-container font-medium">
                      Base
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-surface-container text-on-surface">
                      Standard
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    currency.status === 'Active' 
                      ? 'bg-success-container text-on-success-container' 
                      : 'bg-error-container text-on-error-container'
                  }`}>
                    {currency.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(currency)}
                      className="p-1 text-primary hover:bg-primary-container rounded"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    {!currency.isBase && (
                      <button
                        onClick={() => handleSetAsBase(currency.id)}
                        className="p-1 text-secondary hover:bg-secondary-container rounded"
                        title="Set as base currency"
                      >
                        <span className="material-symbols-outlined text-sm">star</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteCurrency(currency.id)}
                      className="p-1 text-error hover:bg-error-container rounded"
                      disabled={currency.isBase}
                      title={currency.isBase ? 'Cannot delete base currency' : 'Delete currency'}
                    >
                      <span className="material-symbols-outlined text-sm" style={{ opacity: currency.isBase ? 0.5 : 1 }}>delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-on-surface mb-4">Add New Currency</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Currency Name</label>
                <input 
                  type="text"
                  value={newCurrency.name}
                  onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. US Dollar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Currency Code</label>
                <input 
                  type="text"
                  value={newCurrency.code}
                  onChange={(e) => setNewCurrency({ ...newCurrency, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. USD"
                  maxLength={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Currency Symbol</label>
                <input 
                  type="text"
                  value={newCurrency.symbol}
                  onChange={(e) => setNewCurrency({ ...newCurrency, symbol: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. $"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Exchange Rate (to PKR)</label>
                <input 
                  type="number"
                  step="0.01"
                  min="0"
                  value={newCurrency.exchangeRate}
                  onChange={(e) => setNewCurrency({ ...newCurrency, exchangeRate: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. 278.50"
                />
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  id="isBase"
                  checked={newCurrency.isBase}
                  onChange={(e) => setNewCurrency({ ...newCurrency, isBase: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="isBase" className="text-sm font-medium text-on-surface">
                  Set as base currency
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Status</label>
                <select 
                  value={newCurrency.status}
                  onChange={(e) => setNewCurrency({ ...newCurrency, status: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCurrency}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Add Currency
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingCurrency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-on-surface mb-4">Edit Currency</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Currency Name</label>
                <input 
                  type="text"
                  value={editingCurrency.name}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. US Dollar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Currency Code</label>
                <input 
                  type="text"
                  value={editingCurrency.code}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. USD"
                  maxLength={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Currency Symbol</label>
                <input 
                  type="text"
                  value={editingCurrency.symbol}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, symbol: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. $"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Exchange Rate (to PKR)</label>
                <input 
                  type="number"
                  step="0.01"
                  min="0"
                  value={editingCurrency.exchangeRate}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, exchangeRate: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. 278.50"
                />
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  id="editIsBase"
                  checked={editingCurrency.isBase}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, isBase: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="editIsBase" className="text-sm font-medium text-on-surface">
                  Set as base currency
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Status</label>
                <select 
                  value={editingCurrency.status}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, status: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditCurrency}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Update Currency
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyManagement;
