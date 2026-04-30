import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService, categoryService } from '../database/services';

const MangoVarieties = () => {
  const [mangoVarieties, setMangoVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangoVarieties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products and categories from database
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          categoryService.getActiveCategories()
        ]);
        
        // Filter for mango products
        const mangoCategory = categoriesData.find(cat => 
          cat.name.toLowerCase().includes('mango')
        );
        
        const mangoProducts = mangoCategory 
          ? productsData.filter(product => product.categoryId === mangoCategory.id)
          : productsData.filter(product => 
              product.name.toLowerCase().includes('mango') ||
              product.name.toLowerCase().includes('sindhri') ||
              product.name.toLowerCase().includes('anwar') ||
              product.name.toLowerCase().includes('ratol') ||
              product.name.toLowerCase().includes('langra') ||
              product.name.toLowerCase().includes('chaunsa') ||
              product.name.toLowerCase().includes('badami')
            );
        
        setMangoVarieties(mangoProducts.slice(0, 5)); // Limit to 5 items
      } catch (err) {
        console.error('MangoVarieties - Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMangoVarieties();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchMangoVarieties, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Transform database products for display
  const displayMangoVarieties = mangoVarieties.map(product => ({
    name: product.name,
    quantity: product.unit || '1kg',
    price: product.price ? `Rs. ${product.price}` : 'Price not available',
    badge: product.badges?.[0] || 'Available',
    image: product.mainImage || '/placeholder-mango.jpg',
    id: product.id,
    slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
  }));

  if (loading) {
    return (
      <section className="px-4 md:px-8 py-section-padding bg-surface-container-lowest rounded-[3rem] mx-4 md:mx-8 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-headline-lg text-headline-lg">Premium Mango Varieties</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-gutter">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="bg-surface rounded-2xl p-4 animate-pulse">
              <div className="h-40 bg-surface-container rounded-xl mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-surface-container rounded w-3/4"></div>
                <div className="h-3 bg-surface-container rounded w-1/2"></div>
                <div className="h-4 bg-surface-container rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || mangoVarieties.length === 0) {
    return (
      <section className="px-4 md:px-8 py-section-padding bg-surface-container-lowest rounded-[3rem] mx-4 md:mx-8 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-headline-lg text-headline-lg">Premium Mango Varieties</h2>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl text-on-surface-variant">spa</span>
          </div>
          <h3 className="font-headline-md text-on-surface mb-2">No Mango Varieties Available</h3>
          <p className="text-body-md text-on-surface-variant">
            Check back soon for premium mango varieties from Pakistan's best orchards.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-8 py-section-padding mt-8 md:mt-12 bg-surface-container-lowest rounded-[3rem] mx-4 md:mx-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
        <h2 className="font-headline-lg text-headline-lg">Premium Mango Varieties</h2>
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            to="/varieties" 
            className="px-3 py-1.5 md:px-4 md:py-2 bg-primary text-on-primary rounded-full text-label-xs md:text-label-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1 md:gap-2 whitespace-nowrap"
          >
            <span className="hidden md:inline">View All</span>
            <span className="md:hidden">All</span>
            <span className="material-symbols-outlined text-[14px] md:text-[16px]">arrow_forward</span>
          </Link>
          <div className="flex gap-2">
            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px] md:text-[20px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px] md:text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile: 1 + 1/6 carousel */}
      <div className="md:hidden overflow-x-auto overflow-y-hidden -mx-4 px-4">
        <div className="flex gap-3 transition-transform duration-300 ease-in-out">
          {displayMangoVarieties.map((mango, index) => (
            <div 
              key={mango.id || index} 
              className={`flex-shrink-0 ${index === 0 ? 'w-[75vw]' : 'w-[20vw]'}`}
            >
              {index === 0 ? (
                <Link 
                  to={`/product/${mango.slug}`}
                  className="group bg-surface rounded-2xl p-4 transition-all hover:organic-glow cursor-pointer border border-transparent hover:border-primary-fixed block h-full"
                >
                  <div className="relative h-40 bg-white rounded-xl overflow-hidden mb-4">
                    <img 
                      alt={mango.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      src={mango.image}
                    />
                    {mango.badge && (
                      <span className="absolute top-2 right-2 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">{mango.badge}</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-label-lg text-on-surface">{mango.name}</h5>
                    <p className="text-label-sm text-on-surface-variant">{mango.quantity}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-tertiary">{mango.price}</span>
                      <button 
                        className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center active:scale-90 transition-transform"
                        onClick={(e) => e.preventDefault()} // Prevent navigation when clicking add button
                      >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link 
                  to={`/product/${mango.slug || mango.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group bg-surface rounded-2xl p-4 transition-all hover:organic-glow cursor-pointer border border-transparent hover:border-primary-fixed block h-full opacity-60 hover:opacity-100"
                >
                  <div className="relative h-40 bg-white rounded-xl overflow-hidden mb-4">
                    <img 
                      alt={mango.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      src={mango.image}
                    />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-label-lg text-on-surface truncate">{mango.name}</h5>
                    <p className="text-label-sm text-on-surface-variant">{mango.quantity}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-tertiary">{mango.price}</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Normal grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-gutter">
        {displayMangoVarieties.map((mango, index) => (
          <Link 
            key={mango.id || index} 
            to={`/product/${mango.slug}`}
            className="group bg-surface rounded-2xl p-4 transition-all hover:organic-glow cursor-pointer border border-transparent hover:border-primary-fixed block"
          >
            <div className="relative h-40 bg-white rounded-xl overflow-hidden mb-4">
              <img 
                alt={mango.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                src={mango.image}
              />
              {mango.badge && (
                <span className="absolute top-2 right-2 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">{mango.badge}</span>
              )}
            </div>
            <div className="space-y-1">
              <h5 className="font-label-lg text-on-surface">{mango.name}</h5>
              <p className="text-label-sm text-on-surface-variant">{mango.quantity}</p>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-tertiary">{mango.price}</span>
                <button 
                  className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center active:scale-90 transition-transform"
                  onClick={(e) => e.preventDefault()} // Prevent navigation when clicking add button
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MangoVarieties;
