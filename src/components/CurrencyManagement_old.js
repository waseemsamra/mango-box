import React, { useState } from 'react';

const CurrencyManagement = () => {
  const [currencies, setCurrencies] = useState([
    { id: 1, name: 'Pakistani Rupee', code: 'PKR', symbol: '₨', exchangeRate: 1, isBase: true, status: 'Active' },
    { id: 2, name: 'US Dollar', code: 'USD', symbol: '$', exchangeRate: 278.50, isBase: false, status: 'Active' },
    { id: 3, name: 'Euro', code: 'EUR', symbol: '€', exchangeRate: 302.75, isBase: false, status: 'Active' },
    { id: 4, name: 'British Pound', code: 'GBP', symbol: '£', exchangeRate: 351.25, isBase: false, status: 'Active' },
    { id: 5, name: 'Saudi Riyal', code: 'SAR', symbol: '﷼', exchangeRate: 74.20, isBase: false, status: 'Active' },
    { id: 6, name: 'UAE Dirham', code: 'AED', symbol: 'د.إ', exchangeRate: 75.85, isBase: false, status: 'Active' },
    { id: 7, name: 'Chinese Yuan', code: 'CNY', symbol: '¥', exchangeRate: 38.90, isBase: false, status: 'Active' },
    { id: 8, name: 'Indian Rupee', code: 'INR', symbol: '₹', exchangeRate: 3.35, isBase: false, status: 'Inactive' },
  ]);

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

  const handleAddCurrency = () => {
    const currency = {
      id: currencies.length + 1,
      ...newCurrency
    };
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
  };

  const handleEditCurrency = () => {
    // If setting as base currency, remove base status from all others
    const updatedCurrencies = editingCurrency.isBase 
      ? currencies.map(c => ({ ...c, isBase: false }))
      : currencies;
    
    setCurrencies(updatedCurrencies.map(c => c.id === editingCurrency.id ? editingCurrency : c));
    setShowEditModal(false);
    setEditingCurrency(null);
  };

  const handleDeleteCurrency = (id) => {
    // Don't allow deletion of base currency
    const currency = currencies.find(c => c.id === id);
    if (currency?.isBase) {
      alert('Cannot delete base currency');
      return;
    }
    setCurrencies(currencies.filter(c => c.id !== id));
  };

  const openEditModal = (currency) => {
    setEditingCurrency({ ...currency });
    setShowEditModal(true);
  };

  const setAsBaseCurrency = (id) => {
    setCurrencies(currencies.map(c => ({ 
      ...c, 
      isBase: c.id === id 
    })));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-on-surface">Currency Management</h3>
          <p className="text-sm text-on-surface-variant mt-1">Manage currencies and exchange rates for your store</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Add Currency
        </button>
      </div>

      {/* Base Currency Alert */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">info</span>
          <div>
            <p className="text-sm font-medium text-primary">Base Currency: {currencies.find(c => c.isBase)?.name} ({currencies.find(c => c.isBase)?.code})</p>
            <p className="text-xs text-on-surface-variant mt-1">All exchange rates are calculated relative to the base currency. Only one currency can be set as base.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">currency_exchange</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Currencies</p>
              <p className="text-lg font-bold text-gray-900">{currencies.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Currencies</p>
              <p className="text-lg font-bold text-gray-900">{currencies.filter(c => c.status === 'Active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">attach_money</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Base Rate</p>
              <p className="text-lg font-bold text-gray-900">1 PKR</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">update</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Updated</p>
              <p className="text-lg font-bold text-gray-900">Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Currencies Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Currency</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Exchange Rate</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currencies.map((currency) => (
                <tr key={currency.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{currency.symbol}</span>
                      </div>
                      <div>
                        <span className="font-medium text-on-surface">{currency.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary-container/20 text-on-primary-container rounded-full text-xs font-bold border border-primary-container/30">
                      {currency.code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-on-surface">{currency.symbol}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-on-surface">{currency.exchangeRate.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {currency.isBase ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-green-700">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Base Currency
                      </span>
                    ) : (
                      <button 
                        onClick={() => setAsBaseCurrency(currency.id)}
                        className="text-xs text-primary hover:text-primary/80 font-medium"
                      >
                        Set as Base
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${
                      currency.status === 'Active' ? 'text-green-700' : 'text-zinc-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        currency.status === 'Active' ? 'bg-green-500' : 'bg-zinc-300'
                      }`}></span>
                      {currency.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openEditModal(currency)}
                        className="p-2 text-zinc-600 hover:bg-zinc-200 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteCurrency(currency.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          currency.isBase 
                            ? 'text-zinc-300 cursor-not-allowed' 
                            : 'text-error hover:bg-error/5'
                        }`}
                        title={currency.isBase ? 'Cannot delete base currency' : 'Delete'}
                        disabled={currency.isBase}
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Currency Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
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
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Exchange Rate (to PKR)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={newCurrency.exchangeRate}
                  onChange={(e) => setNewCurrency({ ...newCurrency, exchangeRate: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. 278.50"
                />
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
                className="flex-1 px-4 py-2 border border-gray-200 text-zinc-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddCurrency}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-colors"
              >
                Add Currency
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Currency Modal */}
      {showEditModal && editingCurrency && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-on-surface mb-4">Edit Currency</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Currency Name</label>
                <input 
                  type="text"
                  value={editingCurrency.name}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Currency Code</label>
                <input 
                  type="text"
                  value={editingCurrency.code}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
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
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Exchange Rate (to PKR)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={editingCurrency.exchangeRate}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, exchangeRate: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  id="isBase"
                  checked={editingCurrency.isBase}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, isBase: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="isBase" className="text-sm font-medium text-on-surface">
                  Set as Base Currency
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
                className="flex-1 px-4 py-2 border border-gray-200 text-zinc-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleEditCurrency}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyManagement;
