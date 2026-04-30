import React, { useState } from 'react';

const OriginManagement = () => {
  const [origins, setOrigins] = useState([
    { id: 1, name: 'Lahore', region: 'Punjab', country: 'Pakistan', code: 'LHR', status: 'Active', products: 156 },
    { id: 2, name: 'Karachi', region: 'Sindh', country: 'Pakistan', code: 'KHI', status: 'Active', products: 89 },
    { id: 3, name: 'Islamabad', region: 'Punjab', country: 'Pakistan', code: 'ISB', status: 'Active', products: 67 },
    { id: 4, name: 'Multan', region: 'Punjab', country: 'Pakistan', code: 'MUX', status: 'Active', products: 234 },
    { id: 5, name: 'Peshawar', region: 'Khyber Pakhtunkhwa', country: 'Pakistan', code: 'PEW', status: 'Active', products: 45 },
    { id: 6, name: 'Quetta', region: 'Balochistan', country: 'Pakistan', code: 'UET', status: 'Active', products: 23 },
    { id: 7, name: 'Faisalabad', region: 'Punjab', country: 'Pakistan', code: 'LYP', status: 'Active', products: 178 },
    { id: 8, name: 'Sahiwal', region: 'Punjab', country: 'Pakistan', code: 'SWL', status: 'Active', products: 92 },
    { id: 9, name: 'Sialkot', region: 'Punjab', country: 'Pakistan', code: 'SKT', status: 'Active', products: 156 },
    { id: 10, name: 'Gujranwala', region: 'Punjab', country: 'Pakistan', code: 'GNW', status: 'Active', products: 134 },
    { id: 11, name: 'Hyderabad', region: 'Sindh', country: 'Pakistan', code: 'HDD', status: 'Active', products: 67 },
    { id: 12, name: 'Mumbai', region: 'Maharashtra', country: 'India', code: 'BOM', status: 'Inactive', products: 0 },
  ]);

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

  const handleAddOrigin = () => {
    const origin = {
      id: origins.length + 1,
      ...newOrigin,
      products: 0
    };
    setOrigins([...origins, origin]);
    setShowAddModal(false);
    setNewOrigin({
      name: '',
      region: '',
      country: 'Pakistan',
      code: '',
      status: 'Active'
    });
  };

  const handleEditOrigin = () => {
    setOrigins(origins.map(o => o.id === editingOrigin.id ? editingOrigin : o));
    setShowEditModal(false);
    setEditingOrigin(null);
  };

  const handleDeleteOrigin = (id) => {
    setOrigins(origins.filter(o => o.id !== id));
  };

  const openEditModal = (origin) => {
    setEditingOrigin({ ...origin });
    setShowEditModal(true);
  };

  const generateCode = (name) => {
    return name.toUpperCase().slice(0, 3);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-on-surface">Origin Management</h3>
          <p className="text-sm text-on-surface-variant mt-1">Manage product origins, regions, and sourcing locations</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Add Origin
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Origins</p>
              <p className="text-lg font-bold text-gray-900">{origins.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">public</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Countries</p>
              <p className="text-lg font-bold text-gray-900">{new Set(origins.map(o => o.country)).size}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Products</p>
              <p className="text-lg font-bold text-gray-900">{origins.reduce((sum, o) => sum + o.products, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active</p>
              <p className="text-lg font-bold text-gray-900">{origins.filter(o => o.status === 'Active').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Origins Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {origins.map((origin) => (
                <tr key={origin.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                      </div>
                      <div>
                        <span className="font-medium text-on-surface">{origin.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-on-surface-variant">{origin.region}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-on-surface">{origin.country}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary-container/20 text-on-primary-container rounded-full text-xs font-bold border border-primary-container/30">
                      {origin.code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-on-surface">{origin.products}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${
                      origin.status === 'Active' ? 'text-green-700' : 'text-zinc-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        origin.status === 'Active' ? 'bg-green-500' : 'bg-zinc-300'
                      }`}></span>
                      {origin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openEditModal(origin)}
                        className="p-2 text-zinc-600 hover:bg-zinc-200 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteOrigin(origin.id)}
                        className="p-2 text-error hover:bg-error/5 rounded-lg transition-colors"
                        title="Delete"
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

      {/* Add Origin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-on-surface mb-4">Add New Origin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">City/Location Name</label>
                <input 
                  type="text"
                  value={newOrigin.name}
                  onChange={(e) => setNewOrigin({ ...newOrigin, name: e.target.value, code: generateCode(e.target.value) })}
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
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Region/State</label>
                <select 
                  value={newOrigin.region}
                  onChange={(e) => setNewOrigin({ ...newOrigin, region: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  disabled={!newOrigin.country}
                >
                  <option value="">Select Region</option>
                  {regions[newOrigin.country]?.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Airport/Location Code</label>
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
                className="flex-1 px-4 py-2 border border-gray-200 text-zinc-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddOrigin}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-colors"
              >
                Add Origin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Origin Modal */}
      {showEditModal && editingOrigin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-on-surface mb-4">Edit Origin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">City/Location Name</label>
                <input 
                  type="text"
                  value={editingOrigin.name}
                  onChange={(e) => setEditingOrigin({ ...editingOrigin, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
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
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Region/State</label>
                <select 
                  value={editingOrigin.region}
                  onChange={(e) => setEditingOrigin({ ...editingOrigin, region: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  disabled={!editingOrigin.country}
                >
                  <option value="">Select Region</option>
                  {regions[editingOrigin.country]?.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Airport/Location Code</label>
                <input 
                  type="text"
                  value={editingOrigin.code}
                  onChange={(e) => setEditingOrigin({ ...editingOrigin, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
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
                className="flex-1 px-4 py-2 border border-gray-200 text-zinc-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleEditOrigin}
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

export default OriginManagement;
