import React, { useEffect, useState } from 'react';
import { productService } from '../database/services';

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products from database
        const productsData = await productService.getAllProducts();
        
        // Get related products (excluding current product, using different criteria)
        const related = productsData
          .filter(product => !product.featured) // Exclude already featured products
          .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating
          .slice(0, 4); // Take top 4
        
        setRelatedProducts(related);
      } catch (err) {
        console.error('RelatedProducts - Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, []);

  // Transform database products for display
  const displayProducts = relatedProducts.map(product => ({
    id: product.id,
    name: product.name,
    origin: product.location || 'Pakistan',
    price: product.price ? `Rs. ${product.price}` : 'Price varies',
    image: product.mainImage || '/placeholder-product.jpg',
    badge: product.badges?.[0] || 'Fresh',
    rating: product.rating || 4,
    reviews: product.reviewCount || 0
  }));

  if (loading) {
    return (
      <section className="mt-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-display text-on-surface mb-4">You May Also Like</h2>
          <p className="text-body-lg text-on-surface-variant">Discover more premium products</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-surface-container-low rounded-2xl overflow-hidden animate-pulse">
              <div className="h-40 bg-surface-container"></div>
              <div className="p-4 space-y-2">
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

  if (error || relatedProducts.length === 0) {
    return (
      <section className="mt-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-display text-on-surface mb-4">You May Also Like</h2>
          <p className="text-body-lg text-on-surface-variant">Discover more premium products</p>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl text-on-surface-variant">explore</span>
          </div>
          <h3 className="font-headline-md text-on-surface mb-2">More Products Coming Soon</h3>
          <p className="text-body-md text-on-surface-variant">
            Check back later for more related products.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <div className="text-center mb-8">
        <h2 className="font-display text-display text-on-surface mb-4">You May Also Like</h2>
        <p className="text-body-lg text-on-surface-variant">Discover more premium products</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {displayProducts.map((product) => (
          <div key={product.id} className="group bg-surface-container-low rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-green-900/5 transition-all duration-300 cursor-pointer">
            <div className="relative h-40 overflow-hidden">
              <img 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={product.image}
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-primary/90 text-on-primary text-[10px] font-bold px-2 py-1 rounded-full">
                  {product.badge}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-label-lg text-on-surface mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-label-sm text-on-surface-variant mb-2">{product.origin}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">{product.price}</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">star</span>
                  <span className="text-label-sm text-tertiary">{product.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
