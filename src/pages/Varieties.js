import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import FilterSidebar from '../components/FilterSidebar';
import MangoVarietyCard from '../components/MangoVarietyCard';
import EducationalSection from '../components/EducationalSection';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import FloatingActionButton from '../components/FloatingActionButton';
import { productService, categoryService } from '../database/services';

const Varieties = () => {
  const [mangoVarieties, setMangoVarieties] = useState([]);
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
        
        // Filter for mango products (assuming mango category exists)
        const mangoCategory = categoriesData.find(cat => 
          cat.name.toLowerCase().includes('mango')
        );
        
        const mangoProducts = mangoCategory 
          ? productsData.filter(product => product.categoryId === mangoCategory.id)
          : productsData; // Show all products if no mango category found
        
        setMangoVarieties(mangoProducts);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Varieties - Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter varieties by category
  const filteredVarieties = selectedCategory === 'all' 
    ? mangoVarieties 
    : mangoVarieties.filter(variety => variety.categoryId === selectedCategory);

  // Transform database products for MangoVarietyCard component
  const displayVarieties = filteredVarieties.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price ? `Rs. ${product.price}` : 'Price varies',
    description: product.description || 'Premium quality mango from Pakistan',
    harvestSeason: product.harvestSeason || 'June - August',
    image: product.mainImage || '/placeholder-mango.jpg',
    badges: product.badges || ['Fresh'],
    productId: product.id
  }));

  if (loading) {
    return (
      <div className="bg-background font-body-md text-on-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-on-surface">Loading Varieties...</h2>
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
          <h2 className="text-xl font-semibold text-on-surface">Loading Failed</h2>
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

  if (mangoVarieties.length === 0) {
    return (
      <div className="bg-background font-body-md text-on-background min-h-screen">
        <Navigation currentPage="varieties" />
        <main className="px-4 md:px-8 py-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">spa</span>
            </div>
            <h1 className="font-display text-display text-on-surface mb-4">No Varieties Available</h1>
            <p className="text-body-lg text-on-surface-variant mb-8">
              We're currently updating our mango varieties. Please check back soon or add products through the admin panel.
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
      <Navigation currentPage="varieties" />
      
      <main className="px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          <FilterSidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-display text-display text-on-surface mb-4">
                Mango Varieties
              </h1>
              <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Discover Pakistan's finest mango varieties, each with its unique flavor, texture, and heritage.
              </p>
            </div>

            {filteredVarieties.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-2xl text-on-surface-variant">filter_alt</span>
                </div>
                <h3 className="font-headline-md text-on-surface mb-2">No varieties in this category</h3>
                <p className="text-body-md text-on-surface-variant mb-6">
                  Try selecting a different category to see available mango varieties.
                </p>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
                >
                  View All Varieties
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {displayVarieties.map((variety) => (
                  <MangoVarietyCard key={variety.id} {...variety} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <EducationalSection />
      <Footer />
      <BottomNav />
      <FloatingActionButton />
    </div>
  );
};

export default Varieties;
