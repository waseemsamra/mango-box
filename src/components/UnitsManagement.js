import React, { useState, useEffect } from 'react';
import { unitService } from '../database/services';

const UnitsManagement = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setLoading(true);
        setError(null);
        const unitsData = await unitService.getAllUnits();
        setUnits(unitsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [newUnit, setNewUnit] = useState({
    name: '',
    abbreviation: '',
    type: 'Weight',
    baseValue: 1,
    status: 'Active'
  });

  const unitTypes = ['Weight', 'Quantity', 'Volume', 'Length', 'Area', 'Time'];

  const handleAddUnit = async () => {
    try {
      const unit = await unitService.createUnit(newUnit);
      setUnits([...units, unit]);
      setShowAddModal(false);
      setNewUnit({
        name: '',
        abbreviation: '',
        type: 'Weight',
        baseValue: 1,
        status: 'Active'
      });
    } catch (err) {
      alert('Error adding unit: ' + err.message);
    }
  };

  const handleEditUnit = async () => {
    try {
      const updatedUnit = await unitService.updateUnit(editingUnit.id, editingUnit);
      setUnits(units.map(u => u.id === editingUnit.id ? updatedUnit : u));
      setShowEditModal(false);
      setEditingUnit(null);
    } catch (err) {
      alert('Error updating unit: ' + err.message);
    }
  };

  const handleDeleteUnit = async (id) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      try {
        await unitService.deleteUnit(id);
        setUnits(units.filter(u => u.id !== id));
      } catch (err) {
        alert('Error deleting unit: ' + err.message);
      }
    }
  };

  const openEditModal = (unit) => {
    setEditingUnit({ ...unit });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-on-surface">Loading Units...</h2>
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
          <h2 className="text-xl font-semibold text-on-surface">Failed to Load Units</h2>
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
          <h2 className="text-xl font-bold text-on-surface">Units Management</h2>
          <p className="text-sm text-on-surface-variant">Manage measurement units for products</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Add Unit
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Total Units</p>
          <p className="text-2xl font-bold text-on-surface">{units.length}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Active Units</p>
          <p className="text-2xl font-bold text-on-surface">{units.filter(u => u.status === 'Active').length}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Weight Units</p>
          <p className="text-2xl font-bold text-on-surface">{units.filter(u => u.type === 'Weight').length}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          <p className="text-sm text-on-surface-variant">Volume Units</p>
          <p className="text-2xl font-bold text-on-surface">{units.filter(u => u.type === 'Volume').length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-container">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Abbreviation</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Base Value</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-on-surface">Actions</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id} className="border-t border-outline-variant">
                <td className="px-4 py-3 text-sm text-on-surface">{unit.name}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{unit.abbreviation}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{unit.type}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{unit.baseValue}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    unit.status === 'Active' 
                      ? 'bg-success-container text-on-success-container' 
                      : 'bg-error-container text-on-error-container'
                  }`}>
                    {unit.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(unit)}
                      className="p-1 text-primary hover:bg-primary-container rounded"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteUnit(unit.id)}
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
            <h3 className="text-xl font-bold text-on-surface mb-4">Add New Unit</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Unit Name</label>
                <input 
                  type="text"
                  value={newUnit.name}
                  onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. Kilogram"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Abbreviation</label>
                <input 
                  type="text"
                  value={newUnit.abbreviation}
                  onChange={(e) => setNewUnit({ ...newUnit, abbreviation: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Type</label>
                <select 
                  value={newUnit.type}
                  onChange={(e) => setNewUnit({ ...newUnit, type: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                >
                  {unitTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Base Value</label>
                <input 
                  type="number"
                  step="0.001"
                  value={newUnit.baseValue}
                  onChange={(e) => setNewUnit({ ...newUnit, baseValue: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Status</label>
                <select 
                  value={newUnit.status}
                  onChange={(e) => setNewUnit({ ...newUnit, status: e.target.value })}
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
                onClick={handleAddUnit}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Add Unit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-on-surface mb-4">Edit Unit</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Unit Name</label>
                <input 
                  type="text"
                  value={editingUnit.name}
                  onChange={(e) => setEditingUnit({ ...editingUnit, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. Kilogram"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Abbreviation</label>
                <input 
                  type="text"
                  value={editingUnit.abbreviation}
                  onChange={(e) => setEditingUnit({ ...editingUnit, abbreviation: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Type</label>
                <select 
                  value={editingUnit.type}
                  onChange={(e) => setEditingUnit({ ...editingUnit, type: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                >
                  {unitTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Base Value</label>
                <input 
                  type="number"
                  step="0.001"
                  value={editingUnit.baseValue}
                  onChange={(e) => setEditingUnit({ ...editingUnit, baseValue: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="e.g. 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Status</label>
                <select 
                  value={editingUnit.status}
                  onChange={(e) => setEditingUnit({ ...editingUnit, status: e.target.value })}
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
                onClick={handleEditUnit}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Update Unit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitsManagement;
