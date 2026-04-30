import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { categoryService } from '../database/services';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ totalProducts: 0, activeCategories: 0, fastestGrowing: '', organicVerified: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await categoryService.deleteCategory(categoryId);
        setCategories(categories.filter(cat => cat.id !== categoryId));
      } catch (err) {
        alert('Error deleting category: ' + err.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories from database
        const categoriesData = await categoryService.getAllCategories();
        const statsData = await categoryService.getCategoryStats();
        
        setCategories(categoriesData);
        setStats({
          totalProducts: categoriesData.reduce((sum, cat) => sum + (cat.productCount || 0), 0),
          activeCategories: statsData.active,
          fastestGrowing: categoriesData.length > 0 ? categoriesData[0].name : 'None',
          organicVerified: categoriesData.filter(cat => cat.name.toLowerCase().includes('organic')).length
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout 
        title="Product Categories" 
        description="Organize your farm-fresh inventory by groups and manage taxonomies."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-on-surface">Loading Categories...</h2>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout 
        title="Product Categories" 
        description="Organize your farm-fresh inventory by groups and manage taxonomies."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-error text-2xl">error</span>
            </div>
            <h2 className="text-xl font-semibold text-on-surface">Failed to Load Categories</h2>
            <p className="text-sm text-on-surface-variant mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Product Categories" 
      description="Organize your farm-fresh inventory by groups and manage taxonomies."
      actionButtons={
        <Link 
          to="/admin/categories/add" 
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          Add Category
        </Link>
      }
    >
      {/* Quick Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-surface-container-lowest rounded-2xl border border-zinc-100 shadow-sm">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">inventory</span>
          </div>
          <p className="text-zinc-500 text-sm font-medium">Total Products</p>
          <h3 className="text-2xl font-extrabold text-zinc-900">{stats.totalProducts}</h3>
        </div>
        
        <div className="p-6 bg-surface-container-lowest rounded-2xl border border-zinc-100 shadow-sm">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">category</span>
          </div>
          <p className="text-zinc-500 text-sm font-medium">Active Categories</p>
          <h3 className="text-2xl font-extrabold text-zinc-900">{stats.activeCategories}</h3>
        </div>
        
        <div className="p-6 bg-surface-container-lowest rounded-2xl border border-zinc-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <p className="text-zinc-500 text-sm font-medium">Fastest Growing</p>
          <h3 className="text-2xl font-extrabold text-zinc-900">{stats.fastestGrowing}</h3>
        </div>
        
        <div className="p-6 bg-surface-container-lowest rounded-2xl border border-zinc-100 shadow-sm">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <p className="text-zinc-500 text-sm font-medium">Organic Verified</p>
          <h3 className="text-2xl font-extrabold text-zinc-900">{stats.organicVerified}</h3>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="group bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img 
                alt={category.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={category.image || '/images/categories/default-banner.jpg'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                  {category.status === 'Active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-zinc-900">{category.name}</h3>
                  <p className="text-sm text-zinc-500 font-medium flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-base">inventory_2</span>
                    {category.productCount || 0} Linked Products
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/admin/categories/view/${category.id}`} className="p-2 text-primary hover:bg-green-50 rounded-lg transition-all" title="View">
                    <span className="material-symbols-outlined">visibility</span>
                  </Link>
                  <Link to={`/admin/categories/edit/${category.id}`} className="p-2 text-zinc-400 hover:text-primary hover:bg-green-50 rounded-lg transition-all" title="Edit Name">
                    <span className="material-symbols-outlined">edit</span>
                  </Link>
                  <button 
                    className="p-2 text-zinc-400 hover:text-error hover:bg-red-50 rounded-lg transition-all" 
                    title="Delete"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs py-2 border-b border-zinc-50">
                  <span className="text-zinc-400">Slug</span>
                  <span className="font-bold text-zinc-700">{category.slug}</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-zinc-50">
                  <span className="text-zinc-400">Priority</span>
                  <span className="font-bold text-zinc-700">{category.displayPriority || 0}</span>
                </div>
              </div>
              <button className="w-full mt-6 py-3 border-2 border-zinc-100 hover:border-green-200 hover:text-green-700 text-zinc-600 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                View Detailed Inventory
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
        
        {/* Add Category Card */}
        <div className="group bg-white rounded-3xl overflow-hidden border-2 border-dashed border-zinc-200 shadow-sm hover:border-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <Link to="/admin/categories/add" className="block h-full">
            <div className="h-48 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl text-green-600">add</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-700">Add New Category</h3>
                <p className="text-sm text-zinc-500 mt-1">Create a new product category</p>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center">
                <span className="text-sm text-zinc-500">Click to get started</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <section className="mt-12">
        <h4 className="text-headline-md font-extrabold text-on-background mb-6">Recent Changes</h4>
        <div className="bg-surface-container-low rounded-3xl p-6 border border-zinc-100">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                <span className="material-symbols-outlined">update</span>
              </div>
              <div>
                <p className="text-sm text-zinc-900"><span className="font-bold">Ahmed Khan</span> updated the price range for <span className="font-bold">Mangoes</span></p>
                <p className="text-xs text-zinc-400">12 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 shrink-0">
                <span className="material-symbols-outlined">add_task</span>
              </div>
              <div>
                <p className="text-sm text-zinc-900"><span className="font-bold">Sara Malik</span> added a new sub-category <span className="font-bold">Berries</span> to Seasonal Fruits</p>
                <p className="text-xs text-zinc-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0">
                <span className="material-symbols-outlined">delete_forever</span>
              </div>
              <div>
                <p className="text-sm text-zinc-900"><span className="font-bold">System</span> archived category <span className="font-bold">Imported Spices</span> due to inactivity</p>
                <p className="text-xs text-zinc-400">Yesterday at 4:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default CategoriesManagement;
