import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../database/services';

const CustomerFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch featured products from database
        const productsData = await productService.getAllProducts();
        
        // Filter for featured products or top-rated products
        const featuredProducts = productsData.filter(product => 
          product.featured || 
          (product.rating && product.rating >= 4.5) ||
          (product.reviewCount && product.reviewCount > 50)
        );
        
        // Sort by rating and review count, take top 4
        const sortedFavorites = featuredProducts
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 4);
        
        setFavorites(sortedFavorites);
      } catch (err) {
        console.error('CustomerFavorites - Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchFavorites, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Transform database products for display
  const displayFavorites = favorites.map(product => ({
    id: product.id,
    title: product.name,
    description: product.description || 'Premium quality product',
    price: product.price ? `Rs. ${product.price}` : 'Price varies',
    image: product.mainImage || '/placeholder-product.jpg',
    badge: product.badges?.[0] || (product.rating >= 4.5 ? 'Top Rated' : 'Popular'),
    slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
    rating: product.rating || 0,
    reviews: product.reviewCount || 0
  }));

  if (loading) {
    return (
      <section className="px-4 md:px-8 py-section-padding">
        <div className="text-center mb-12">
          <h2 className="font-display text-display text-on-surface mb-4">Customer Favorites</h2>
          <p className="text-body-lg text-on-surface-variant">Discover what our customers love most</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-surface-container-low rounded-3xl overflow-hidden animate-pulse">
              <div className="h-48 bg-surface-container"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-surface-container rounded w-3/4"></div>
                <div className="h-3 bg-surface-container rounded w-full"></div>
                <div className="h-4 bg-surface-container rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || favorites.length === 0) {
    return (
      <section className="px-4 md:px-8 py-section-padding">
        <div className="text-center mb-12">
          <h2 className="font-display text-display text-on-surface mb-4">Customer Favorites</h2>
          <p className="text-body-lg text-on-surface-variant">Discover what our customers love most</p>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl text-on-surface-variant">favorite</span>
          </div>
          <h3 className="font-headline-md text-on-surface mb-2">No Favorites Yet</h3>
          <p className="text-body-md text-on-surface-variant">
            Start adding products to build your customer favorites collection.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-8 py-section-padding">
      <div className="text-center mb-12">
        <h2 className="font-display text-display text-on-surface mb-4 font-bold" style={{fontSize: 'calc(1rem * 1.65)'}}>Customer Favorites</h2>
        <p className="text-body-lg text-on-surface-variant">Discover what our customers love most</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {displayFavorites.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.slug || item.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="group bg-surface-container-low rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300 cursor-pointer block"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={item.image}
              />
              {item.badge && (
                <div className="absolute top-4 left-4 bg-primary text-on-primary text-label-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-[14px]" data-icon="auto_awesome" data-weight="fill">auto_awesome</span>
                  {item.badge}
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-body-sm text-on-surface-variant mb-4 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-primary">{item.price}</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">star</span>
                  <span className="text-label-sm text-tertiary">{item.rating}</span>
                  <span className="text-label-sm text-on-surface-variant">({item.reviews})</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CustomerFavorites;
