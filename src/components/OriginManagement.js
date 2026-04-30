import React, { useState, useEffect } from 'react';
import { originService } from '../database/services';

const OriginManagement = () => {
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrigins = async () => {
      try {
        setLoading(true);
        setError(null);
        const originsData = await originService.getAllOrigins();
        setOrigins(originsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrigins();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrigin, setEditingOrigin] = useState(null);
  const [newOrigin, setNewOrigin] = useState({
    name: '',
    region: '',
    country: 'Pakistan',
    code: '',
    status: 'Active'
  });

  const countries = ['Pakistan', 'India', 'Bangladesh', 'Sri Lanka', 'China', 'Afghanistan', 'Iran'];
  const regions = {
    'Pakistan': ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir'],
    'India': ['Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Uttar Pradesh', 'West Bengal'],
    'Bangladesh': ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal'],
    'Sri Lanka': ['Western Province', 'Central Province', 'Southern Province', 'Northern Province', 'Eastern Province', 'North Western Province'],
    'China': ['Guangdong', 'Jiangsu', 'Zhejiang', 'Shandong', 'Henan', 'Sichuan'],
    'Afghanistan': ['Kabul', 'Herat', 'Kandahar', 'Mazar-i-Sharif', 'Kunduz', 'Jalalabad'],
    'Iran': ['Tehran', 'Isfahan', 'Fars', 'Khorasan', 'Khuzestan', 'Azerbaijan']
  };

  const handleAddOrigin = async () => {
    try {
      const origin = await originService.createOrigin(newOrigin);
      setOrigins([...origins, origin]);
      setShowAddModal(false);
      setNewOrigin({
        name: '',
        region: '',
        country: 'Pakistan',
        code: '',
        status: 'Active'
      });
    } catch (err) {
      alert('Error adding origin: ' + err.message);
    }
  };

  const handleEditOrigin = async () => {
    try {
      const updatedOrigin = await originService.updateOrigin(editingOrigin.id, editingOrigin);
      setOrigins(origins.map(o => o.id === editingOrigin.id ? updatedOrigin : o));
      setShowEditModal(false);
      setEditingOrigin(null);
    } catch (err) {
      alert('Error updating origin: ' + err.message);
    }
  };

  const handleDeleteOrigin = async (id) => {
    if (window.confirm('Are you sure you want to delete this origin?')) {
      try {
        await originService.deleteOrigin(id);
        setOrigins(origins.filter(o => o.id !== id));
      } catch (err) {
        alert('Error deleting origin: ' + err.message);
      }
    }
  };

  const openEditModal = (origin) => {
    setEditingOrigin({ ...origin });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-on-surface">Loading Origins...</h2>
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
          <h2 className="text-xl font-semibold text-on-surface">Failed to Load Origins</h2>
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
          <h2 className="text-xl font-bold text-on-surface">Origin Management</h2>
          <p className="text-sm text-on-surface-variant">Manage product origins and sourcing locations</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Add Origin
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Total Origins</p>
          <p className="text-2xl font-bold text-on-surface">{origins.length}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Active Origins</p>
          <p className="text-2xl font-bold text-on-surface">{origins.filter(o => o.status === 'Active').length}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Countries</p>
          <p className="text-2xl font-bold text-on-surface">{new Set(origins.map(o => o.country)).size}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Total Products</p>
          <p className="text-2xl font-bold text-on-surface">{origins.reduce((sum, o) => sum + (o.productCount || 0), 0)}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-container">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Region</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Country</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Code</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Products</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Actions</th>
            </tr>
          </thead>
          <tbody>
            {origins.map((origin) => (
              <tr key={origin.id} className="border-t border-outline-variant">
                <td className="px-4 py-3 text-sm text-on-surface">{origin.name}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{origin.region}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{origin.country}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{origin.code}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{origin.productCount || 0}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    origin.status === 'Active' 
                      ? 'bg-success-container text-on-success-container' 
                      : 'bg-error-container text-on-error-container'
                  }`}>
                    {origin.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(origin)}
                      className="p-1 text-primary hover:bg-primary-container rounded"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteOrigin(origin.id)}
                      className="p-1 text-error hover:bg-error-container rounded"
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-on-surface mb-4">Add New Origin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Origin Name</label>
                <input 
                  type="text"
                  value={newOrigin.name}
                  onChange={(e) => setNewOrigin({ ...newOrigin, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. Lahore"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Country</label>
                <select 
                  value={newOrigin.country}
                  onChange={(e) => setNewOrigin({ ...newOrigin, country: e.target.value, region: '' })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Region</label>
                <select 
                  value={newOrigin.region}
                  onChange={(e) => setNewOrigin({ ...newOrigin, region: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  disabled={!newOrigin.country}
                >
                  <option value="">Select a region</option>
                  {regions[newOrigin.country]?.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Code</label>
                <input 
                  type="text"
                  value={newOrigin.code}
                  onChange={(e) => setNewOrigin({ ...newOrigin, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. LHR"
                  maxLength={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Status</label>
                <select 
                  value={newOrigin.status}
                  onChange={(e) => setNewOrigin({ ...newOrigin, status: e.target.value })}
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
                onClick={handleAddOrigin}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Add Origin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingOrigin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-on-surface mb-4">Edit Origin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Origin Name</label>
                <input 
                  type="text"
                  value={editingOrigin.name}
                  onChange={(e) => setEditingOrigin({ ...editingOrigin, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. Lahore"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Country</label>
                <select 
                  value={editingOrigin.country}
                  onChange={(e) => setEditingOrigin({ ...editingOrigin, country: e.target.value, region: '' })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Region</label>
                <select 
                  value={editingOrigin.region}
                  onChange={(e) => setEditingOrigin({ ...editingOrigin, region: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  disabled={!editingOrigin.country}
                >
                  <option value="">Select a region</option>
                  {regions[editingOrigin.country]?.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Code</label>
                <input 
                  type="text"
                  value={editingOrigin.code}
                  onChange={(e) => setEditingOrigin({ ...editingOrigin, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. LHR"
                  maxLength={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Status</label>
                <select 
                  value={editingOrigin.status}
                  onChange={(e) => setEditingOrigin({ ...editingOrigin, status: e.target.value })}
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
                onClick={handleEditOrigin}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Update Origin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OriginManagement;
