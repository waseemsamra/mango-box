import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { productService } from '../database/services/ProductService';
import { categoryService } from '../database/services/CategoryService';
import { unitService } from '../database/services/UnitService';
import { originService } from '../database/services/OriginService';
import { currencyService } from '../database/services/CurrencyService';
import ImageDisplay from '../components/ImageDisplay';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData, unitsData, originsData, currenciesData] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories(),
        unitService.getAllUnits(),
        originService.getAllOrigins(),
        currencyService.getAllCurrencies()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData);
      setUnits(unitsData);
      setOrigins(originsData);
      setCurrencies(currenciesData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
      } catch (err) {
        console.error('Error deleting product:', err);
        setError(err.message);
      }
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const getUnitName = (unitId) => {
    const unit = units.find(u => u.id === unitId);
    return unit ? unit.name : 'Unknown';
  };

  const getOriginName = (originId) => {
    const origin = origins.find(o => o.id === originId);
    return origin ? origin.name : 'Unknown';
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { status: 'Out of Stock', color: 'text-error', bg: 'bg-error/10' };
    if (stock < 10) return { status: 'Low Stock', color: 'text-warning', bg: 'bg-warning/10' };
    return { status: 'In Stock', color: 'text-success', bg: 'bg-success/10' };
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.categoryId === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'in-stock' && product.stock > 0) ||
      (filterStatus === 'low-stock' && product.stock > 0 && product.stock < 10) ||
      (filterStatus === 'out-of-stock' && product.stock === 0);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const stats = {
    total: products.length,
    lowStock: products.filter(p => p.stock > 0 && p.stock < 10).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    inStock: products.filter(p => p.stock > 0).length
  };

  if (loading) {
    return (
      <AdminLayout title="Product Inventory" description="Loading products...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Product Inventory" description="Error loading products">
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <p className="text-error">{error}</p>
          <button 
            onClick={loadData}
            className="mt-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout 
      title="Product Inventory" 
      description="Manage your catalog, stock levels, and daily harvest updates."
    >
      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 border border-zinc-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">inventory</span>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Total Products</p>
            <h3 className="text-2xl font-black text-on-surface">{stats.total}</h3>
            <p className="text-xs text-green-600 font-bold">{stats.inStock} in stock</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 border-l-4 border-error border border-zinc-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-error-container/20 text-error flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">warning</span>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Low Stock Alerts</p>
            <h3 className="text-2xl font-black text-on-surface">{stats.lowStock}</h3>
            <p className="text-xs text-error font-bold">Requires attention</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 border border-zinc-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-secondary-container/10 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">stars</span>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Out of Stock</p>
            <h3 className="text-2xl font-black text-on-surface">{stats.outOfStock}</h3>
            <p className="text-xs text-zinc-500 font-medium">Need restocking</p>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-zinc-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex bg-zinc-100 p-1 rounded-lg">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-bold text-primary">All Items</button>
            <button className="px-4 py-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-800">Published</button>
            <button className="px-4 py-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-800">Drafts</button>
          </div>
          <div className="h-6 w-[1px] bg-zinc-200"></div>
        <div className="flex items-center gap-2">
          <select 
            className="bg-transparent border-none text-sm font-medium text-zinc-600 focus:ring-0"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Category: All</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <select 
            className="bg-transparent border-none text-sm font-medium text-zinc-600 focus:ring-0"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-1.5 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="text-xs font-bold text-zinc-400 mr-2 uppercase tracking-widest">Bulk Actions:</span>
          <button className="p-2 text-zinc-500 hover:bg-zinc-50 border border-zinc-200 rounded-lg flex items-center gap-2 px-3 transition-colors">
            <span className="material-symbols-outlined text-sm">edit</span>
            <span className="text-xs font-bold">Update Price</span>
          </button>
          <button 
            onClick={() => {
              if (selectedProducts.length > 0 && window.confirm(`Delete ${selectedProducts.length} selected products?`)) {
                Promise.all(selectedProducts.map(id => productService.deleteProduct(id)))
                  .then(() => {
                    setProducts(products.filter(p => !selectedProducts.includes(p.id)));
                    setSelectedProducts([]);
                  })
                  .catch(err => setError(err.message));
              }
            }}
            className="p-2 text-error hover:bg-error/5 border border-error/20 rounded-lg flex items-center gap-2 px-3 transition-colors"
            disabled={selectedProducts.length === 0}
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            <span className="text-xs font-bold">Delete Selected ({selectedProducts.length})</span>
          </button>
          <Link 
            to="/admin/products/add" 
            className="p-2 text-primary hover:bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 px-3 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span className="text-xs font-bold">Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Product Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100">
                <th className="p-4 w-12 text-center">
                  <input 
                    className="rounded border-zinc-300 text-primary focus:ring-primary" 
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-4 font-bold text-zinc-700 text-left">Product</th>
                <th className="p-4 font-bold text-zinc-700 text-left">Category</th>
                <th className="p-4 font-bold text-zinc-700 text-left">Price</th>
                <th className="p-4 font-bold text-zinc-700 text-left">Stock</th>
                <th className="p-4 font-bold text-zinc-700 text-left">Status</th>
                <th className="p-4 font-bold text-zinc-700 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-zinc-500">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-4xl text-zinc-300">inventory_2</span>
                      <p className="font-medium">No products found</p>
                      <p className="text-sm text-zinc-400">Try adjusting your filters or add a new product</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4 text-center">
                        <input 
                          className="rounded border-zinc-300 text-primary focus:ring-primary" 
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-100">
                            <ImageDisplay 
                              src={product.images?.[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-zinc-900">{product.name}</h4>
                            <p className="text-sm text-zinc-500 line-clamp-1">{product.description}</p>
                            <p className="text-xs text-zinc-400">{getOriginName(product.originId)} • {getUnitName(product.unitId)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-zinc-700">{getCategoryName(product.categoryId)}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-900">{product.currency} {product.price}</span>
                          <span className="text-xs text-zinc-500">per {getUnitName(product.unitId)}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-900">{product.stock}</span>
                          <span className="text-xs text-zinc-500">units available</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${stockStatus.bg} ${stockStatus.color}`}>
                          {stockStatus.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/admin/products/edit/${product.id}`}
                            className="p-1.5 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </Link>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1.5 text-error hover:bg-error/5 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;
