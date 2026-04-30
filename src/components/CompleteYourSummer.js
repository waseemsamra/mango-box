import React, { useEffect, useState } from 'react';
import { productService } from '../database/services';

const CompleteYourSummer = () => {
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
        
        // Get products for summer collection (filter by season or availability)
        const summerProducts = productsData
          .filter(product => {
            // Include products with summer-related terms or high ratings
            const isSummerProduct = product.harvestSeason?.toLowerCase().includes('summer') ||
                                  product.harvestSeason?.toLowerCase().includes('june') ||
                                  product.harvestSeason?.toLowerCase().includes('july') ||
                                  product.harvestSeason?.toLowerCase().includes('august');
            const isHighRated = (product.rating && product.rating >= 4.0) || 
                               (product.reviewCount && product.reviewCount > 20);
            return isSummerProduct || isHighRated;
          })
          .slice(0, 3); // Take top 3
        
        setRelatedProducts(summerProducts);
      } catch (err) {
        console.error('CompleteYourSummer - Error fetching data:', err);
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
    tag: product.badges?.[0] || 'Fresh',
    description: product.description || 'Perfect for summer season',
    price: product.price ? `Rs. ${product.price}` : 'Price varies',
    image: product.mainImage || '/placeholder-product.jpg'
  }));

  if (loading) {
    return (
      <section className="mt-16 px-4 md:px-8">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="font-display text-display text-on-surface mb-4">Complete Your Summer</h2>
            <p className="text-body-lg text-on-surface-variant">Add these refreshing items to your summer collection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-surface-container"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-surface-container rounded w-1/2"></div>
                  <div className="h-3 bg-surface-container rounded w-3/4"></div>
                  <div className="h-4 bg-surface-container rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || relatedProducts.length === 0) {
    return (
      <section className="mt-16 px-4 md:px-8">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="font-display text-display text-on-surface mb-4">Complete Your Summer</h2>
            <p className="text-body-lg text-on-surface-variant">Add these refreshing items to your summer collection</p>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-2xl text-on-surface-variant">wb_sunny</span>
            </div>
            <h3 className="font-headline-md text-on-surface mb-2">Summer Collection Coming Soon</h3>
            <p className="text-body-md text-on-surface-variant">
              Check back later for our special summer products.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 px-4 md:px-8">
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="font-display text-display text-on-surface mb-4">Complete Your Summer</h2>
          <p className="text-body-lg text-on-surface-variant">Add these refreshing items to your summer collection</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-green-900/10 transition-all duration-300 cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={product.image}
                />
                <div className="absolute top-4 left-4 bg-primary/90 text-on-primary text-label-sm px-3 py-1 rounded-full">
                  {product.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-body-sm text-on-surface-variant mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-primary">{product.price}</span>
                  <button className="px-4 py-2 bg-primary text-on-primary rounded-full text-label-sm font-medium hover:bg-primary/90 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompleteYourSummer;
