import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import FloatingActionButton from '../components/FloatingActionButton';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import PromoCard from '../components/PromoCard';
import { productService, categoryService } from '../database/services';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products and categories from database
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          categoryService.getActiveCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Shop - Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categoryId === selectedCategory);

  // Transform database products for ProductCard component
  const displayProducts = filteredProducts.map(product => ({
    id: product.id,
    name: product.name,
    category: product.categoryId,
    price: product.price ? `Rs. ${product.price}` : 'Price varies',
    image: product.mainImage || '/placeholder-product.jpg',
    rating: product.rating || 0,
    reviews: product.reviewCount || 0,
    badge: product.badges?.[0] || (product.createdAt ? 'New' : 'Available'),
    slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
  }));

  if (loading) {
    return (
      <div className="bg-background font-body-md text-on-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-on-surface">Loading Shop...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background font-body-md text-on-background min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-error text-2xl">error</span>
          </div>
          <h2 className="text-xl font-semibold text-on-surface">Shop Loading Failed</h2>
          <p className="text-sm text-on-surface-variant mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-background font-body-md text-on-background min-h-screen">
        <Navigation currentPage="shop" />
        <main className="px-4 md:px-8 py-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">shopping_basket</span>
            </div>
            <h1 className="font-display text-display text-on-surface mb-4">No Products Available</h1>
            <p className="text-body-lg text-on-surface-variant mb-8">
              We're currently updating our inventory. Please check back soon or contact us for availability.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => window.location.reload()}
                className="block w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
              >
                Refresh
              </button>
              <a href="/admin" className="block w-full px-6 py-3 border-2 border-outline rounded-xl font-medium text-on-surface hover:bg-surface-container transition-all text-center">
                Admin Panel
              </a>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNav />
        <FloatingActionButton />
      </div>
    );
  }

  return (
    <div className="bg-background font-body-md text-on-background">
      <Navigation currentPage="shop" />
      <main className="px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          <Sidebar 
            categories={categories} 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <div className="flex-1">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="font-display text-on-surface mb-2">
                  {selectedCategory === 'all' ? 'All Products' : 
                   categories.find(c => c.id === selectedCategory)?.name || 'Products'}
                </h1>
                <p className="text-body-lg text-on-surface-variant">
                  {filteredProducts.length} products available
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full">
                <span className="text-label-lg text-on-surface-variant">Sort by:</span>
                <select className="bg-transparent border-none focus:ring-0 text-label-lg font-bold text-on-surface">
                  <option>Featured First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-2xl text-on-surface-variant">search_off</span>
                </div>
                <h3 className="font-headline-md text-on-surface mb-2">No products in this category</h3>
                <p className="text-body-md text-on-surface-variant mb-6">
                  Try selecting a different category or check back later.
                </p>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {displayProducts.map((product, index) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
            
            <div className="mt-8">
              <PromoCard 
                badge="Limited Time"
                title="Fresh Season Special"
                description="Get 20% off on all premium mango varieties this week only!"
                ctaText="Shop Now"
                ctaLink="#"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <BottomNav />
      <FloatingActionButton />
    </div>
  );
};

export default Shop;
