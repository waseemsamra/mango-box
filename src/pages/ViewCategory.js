import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const ViewCategory = () => {
  return (
    <AdminLayout 
      title="View Category" 
      description="Viewing details for 'Premium Fruits' harvest collection."
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (General Info) */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Basic Information Card */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">visibility</span>
              <h3 className="text-xl font-semibold">General Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-on-surface-variant">Category Name</label>
                <div className="w-full rounded-xl border-outline-variant bg-surface-bright p-3 outline-none">
                  <span className="text-base">Premium Fruits</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-on-surface-variant">URL Slug</label>
                <div className="flex items-center bg-surface-container rounded-xl px-3 border border-outline-variant">
                  <span className="text-outline text-sm">sabzi.pk/cat/</span>
                  <span className="w-full border-none bg-transparent p-3 outline-none text-base">premium-fruits</span>
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="block text-sm font-medium text-on-surface-variant">Description</label>
                <div className="w-full rounded-xl border-outline-variant bg-surface-bright p-3 outline-none">
                  <span className="text-base">A curated collection of Pakistan's finest seasonal produce, including export-quality Sindhri Mangoes, Swat Peaches, and Hand-picked Kinnows. Only the top 5% of harvests make it into this category.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Category Assets Card */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">image</span>
              <h3 className="text-xl font-semibold">Visual Identity</h3>
            </div>
            <div className="flex gap-8 items-start">
              <div className="relative h-48 w-64 rounded-2xl overflow-hidden bg-surface-container-low border-2 border-outline-variant flex items-center justify-center">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMUfY1qmGZscFiyijoeFFn4Merqe6l13Gig1kLvJDbdru0GDdeglaLMcL6i8r6XOJakfCl1_VUl1L9aZXD9uTlka_vM_SUy4KZZt6m_lMbf26yQEJPy_4mz6CG_hAQKoCjHUZ9G4yNSRHdE1xrufV9PDAQU8KBJZlYkQEeTfClXY0XS1dGw4aD4QVgCZfMt4XvexnKL4l6F7Gw6raCy4wTO8cHPTtcZdkyo2PN7sJ89VSgoASXWWNvOEWq52tjyJVXVPfCFVnNZRGI"
                  alt="Category banner"
                />
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-on-surface-variant text-base">Category banner image displayed at the top of the category page.</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container text-outline rounded-full text-xs">JPG/PNG</span>
                  <span className="px-3 py-1 bg-surface-container text-outline rounded-full text-xs">1200 x 600px</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Stats & Danger) */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Quick Stats */}
          <section className="bg-primary rounded-3xl p-8 text-on-primary shadow-xl shadow-green-900/10">
            <h3 className="text-xl font-semibold mb-6 opacity-90">Category Insights</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined">inventory_2</span>
                  </div>
                  <span className="text-sm font-medium">Total Products</span>
                </div>
                <span className="text-xl font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  </div>
                  <span className="text-sm font-medium">Avg. Rating</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-semibold">4.8</span>
                  <span className="block text-xs opacity-70">from 1.2k reviews</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <span className="text-sm font-medium">Active Listings</span>
                </div>
                <span className="text-xl font-semibold">18</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <button className="w-full py-3 rounded-xl bg-white text-primary font-medium hover:bg-primary-fixed-dim transition-all">
                View Category Analytics
              </button>
            </div>
          </section>

          {/* Status Card */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100/50">
            <label className="block text-sm font-medium text-on-surface-variant mb-4">Visibility Status</label>
            <div className="flex items-center gap-4">
              <div className="flex-1 p-4 rounded-2xl bg-green-50 border-2 border-primary flex items-center justify-between">
                <span className="text-sm font-medium text-primary">Active</span>
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
            </div>
          </section>

          {/* Action Card */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-2 text-primary mb-4">
              <span className="material-symbols-outlined">edit</span>
              <h3 className="text-sm font-bold uppercase tracking-widest">Actions</h3>
            </div>
            <div className="space-y-3">
              <Link 
                to="/admin/categories/edit/1" 
                className="w-full py-3 rounded-xl bg-primary text-white font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">edit</span>
                Edit Category
              </Link>
              <button className="w-full py-3 rounded-xl bg-surface-container text-on-surface font-medium hover:bg-surface-container-high transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">list_alt</span>
                Manage Products
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Linked Products Section */}
      <div className="mt-6">
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">list_alt</span>
              <h3 className="text-xl font-semibold">Top Products in Category</h3>
            </div>
            <button className="text-primary font-medium flex items-center gap-1 hover:underline">
              View All Products
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {/* Product Item 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-square rounded-2xl overflow-hidden bg-surface mb-3">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9gX1S7dnViJk_ZxcQoTgXipENHadiKfKfZ-uk0EkJVfJKYLmow0-JXVvTHCwPPIksl8vB5SnEIeqlPmp_9Cu3tJFS6KVTV_NrPlnTUKGBfiMYiXqaK2Kn2w-vni5Lo3PkyNBCFeLc5DxzNGoTzsMSX04cG--ftgzeGxH-chKwOMgy0rQ8PAzdDnttZuHTAaZkzZddDRa1gwHWUQyjCQE-O0wl5D0jAmhMK8A8UXapxItbT0GSMvJeImeRgjACoUqvUYd0hPC8KWHZ"
                  alt="Product"
                />
              </div>
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors">Export Quality Sindhri</h4>
              <div className="flex justify-between mt-1">
                <span className="text-tertiary font-bold text-xs">Rs. 450/kg</span>
                <span className="text-outline text-xs">4.9 (540)</span>
              </div>
            </div>

            {/* Product Item 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-square rounded-2xl overflow-hidden bg-surface mb-3">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkYB-_HrZlwvLhnR39wTaNFdLSG-wRBy5Jji0AMIVutEsyEfYgJHMIyPMlK2bsXx5Dfbx3ByjFeAa2njBcISr0fe1GDzjuzUxBmOieX9DC2zVIr4rVwlwYWU5muh2z0QBknE-u7bHuagOzQJ-aRU5FIW9yPb2BOs2veKNeuifsLYl4xnm3lf4qgck7wen5AYTwySrCtXlzdUMIHOKvKVra2sbiYyfrXyNCgLsdwZdPJ46hp5rAuIWW9eM7Qxc69JuHsVJ1LP5d2LWg"
                  alt="Product"
                />
              </div>
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors">Swat Peaches (Large)</h4>
              <div className="flex justify-between mt-1">
                <span className="text-tertiary font-bold text-xs">Rs. 380/kg</span>
                <span className="text-outline text-xs">4.7 (210)</span>
              </div>
            </div>

            {/* Product Item 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-square rounded-2xl overflow-hidden bg-surface mb-3">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD92KNMqc0P37ZRGzHqoiFf5QpzPje_qqU5EHsWKKyUEzLBaV1U6QOJWDZFO3BiLuOUjCqwQ1wJyRZupOQEiqC-eUUm2Ps71_scRYB0GU4q8k_LlRgE-yvYD6M5Ld7si9gYShl5n4hJgl-X2pSEubPhdO2leo9WRmLIWyEVTa91WB7yv7SIIhjZibwoawM7W3ty1fwuaY7lcW5xUuR1HLPHDS5UfYco4gafQliGTnzBRrNay-VXrxMyd85JqoP2pJuFxkBxZ1Pre87Z"
                  alt="Product"
                />
              </div>
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors">Organic Bananas</h4>
              <div className="flex justify-between mt-1">
                <span className="text-tertiary font-bold text-xs">Rs. 120/dz</span>
                <span className="text-outline text-xs">4.5 (890)</span>
              </div>
            </div>

            {/* Product Item 4 */}
            <div className="group cursor-pointer">
              <div className="aspect-square rounded-2xl overflow-hidden bg-surface mb-3 border-2 border-dashed border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-outline text-4xl">add_circle</span>
              </div>
              <h4 className="text-sm font-medium text-outline">Add New Product</h4>
            </div>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
        <Link 
          to="/admin/categories" 
          className="px-6 py-2.5 rounded-xl border-2 border-outline-variant text-on-surface-variant font-medium hover:bg-white transition-all"
        >
          Back to Categories
        </Link>
        <Link 
          to="/admin/categories/edit/1"
          className="px-8 py-2.5 rounded-xl bg-primary text-white font-medium shadow-lg shadow-green-900/20 hover:brightness-110 transition-all"
        >
          Edit Category
        </Link>
      </div>
    </AdminLayout>
  );
};

export default ViewCategory;
