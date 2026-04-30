import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const EditProduct = () => {
  return (
    <AdminLayout 
      title="Edit Product" 
      description="Update product details, pricing, and inventory information."
    >
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Image */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-on-surface mb-4">Product Image</h3>
              <div className="w-full h-64 rounded-xl bg-surface-container border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden">
                <img 
                  alt="Product Preview" 
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwZC28nhFgldtloEBJ-rmYY3c9m_Zr4BadWqoGJsP7V-xmN2MYeV01XTrRB4JxGVJssGBrVOtTiFhmWG-LN5xqfdTQ0n96a2ba-LNf3kYkqoxCdtG2t6dMHnW-QanupB_NzNgOHdL1tfNCn6Jd5B3qDp_4NkD_YwR5Y2IGBkhsrXR1ix8PjfXsWRacr1tJo8QEpHA9MEIKzllpL5pyTPicf0vxvof3DWPfugmFh9Kbvqqwu4qyz2taR1jMN0L-j2KMDuJ8m9FO-BgD"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 px-4 bg-zinc-100 text-zinc-700 rounded-lg font-medium hover:bg-zinc-200 transition-colors">
                  Change Image
                </button>
                <button className="flex-1 py-2 px-4 bg-zinc-100 text-zinc-700 rounded-lg font-medium hover:bg-zinc-200 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Product Name</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    defaultValue="Sindhri Mango"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Category</label>
                  <select className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option>Seasonal Fruits</option>
                    <option>Vegetables</option>
                    <option>Organic Leafy</option>
                    <option>Dairy Products</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Status</label>
                  <select className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Description</label>
                  <textarea 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    rows="3"
                    defaultValue="Premium Export Quality Sindhri Mangoes from our finest orchards."
                  />
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-4">Pricing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Price (PKR)</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    defaultValue="450"
                    type="number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Price Unit</label>
                  <select className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option>per Dozen</option>
                    <option>per kg</option>
                    <option>per Bundle</option>
                    <option>per Piece</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Discount Price (Optional)</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Enter discount price"
                    type="number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Tax (%)</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    defaultValue="0"
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Inventory Information */}
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-4">Inventory Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Stock Quantity</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    defaultValue="820"
                    type="number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Low Stock Threshold</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    defaultValue="100"
                    type="number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">SKU</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    defaultValue="SKU-MN-001"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Barcode</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Enter barcode"
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-100">
              <Link 
                to="/admin/products" 
                className="px-6 py-2.5 border border-zinc-200 text-zinc-700 rounded-lg font-medium hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </Link>
              <button className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
