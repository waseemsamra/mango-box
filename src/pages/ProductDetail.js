import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import FloatingActionButton from '../components/FloatingActionButton';
import { productService } from '../database/services';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('ProductDetail - Fetching product:', productId);
        const productData = await productService.getProductById(productId);
        console.log('ProductDetail - Product data:', productData);
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('ProductDetail - Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchProduct, 30000);
    
    return () => clearInterval(interval);
  }, [productId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className="material-symbols-outlined text-lg" 
        style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}
      >
        star
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="bg-surface font-body-md text-on-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-on-surface">Loading Product...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-surface font-body-md text-on-surface min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-error text-2xl">error</span>
          </div>
          <h2 className="text-xl font-semibold text-on-surface">Product Not Found</h2>
          <p className="text-sm text-on-surface-variant mt-2">{error || 'This product does not exist'}</p>
          <a href="/shop" className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all">
            Back to Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navigation currentPage="shop" />
      
      <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 font-label-sm text-on-surface-variant">
          <a className="hover:text-primary transition-colors" href="/">Home</a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <a className="hover:text-primary transition-colors" href="/shop">Mangoes</a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">{product?.name || 'Product'}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Product Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5 group">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={product?.name || 'Product'}
                src={product?.mainImage || '/placeholder-image.jpg'}
              />
            </div>

            {/* Thumbnails Grid */}
            {product?.thumbnailImages && product.thumbnailImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {(product.thumbnailImages || []).map((image, index) => (
                  <div 
                    key={index}
                    className={`aspect-square rounded-2xl overflow-hidden bg-white ${
                      index === 0 ? 'ring-2 ring-primary' : 'ring-1 ring-zinc-200 opacity-70 hover:opacity-100 transition-opacity cursor-pointer'
                    }`}
                  >
                    <img 
                      className="w-full h-full object-cover" 
                      alt={`${product?.name || 'Product'} thumbnail ${index + 1}`}
                      src={image}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              {/* Badges */}
              {product?.badges && product.badges.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  {product.badges.map((badge, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 text-label-sm rounded-full font-bold uppercase tracking-wider ${
                        badge === 'In Season' ? 'bg-primary-fixed text-on-primary-fixed' :
                        badge === 'Organic' ? 'bg-secondary-container text-on-secondary-container' :
                        'bg-primary text-on-primary'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              
              <h1 className="font-display text-display text-on-surface mb-2 tracking-tight">{product?.name || 'Product'}</h1>
              <p className="font-headline-md text-tertiary mb-4">Premium Quality Mangoes</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-secondary">
                  {renderStars(product?.rating || 0)}
                </div>
                <span className="text-on-surface-variant font-label-lg">{(product?.reviews || 0).toLocaleString()} Reviews</span>
              </div>
              
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                {product?.description || 'Premium quality mangoes sourced directly from the best orchards.'}
              </p>
            </div>

            {/* Price and Selection */}
            <div className="space-y-4">
              <h3 className="font-label-lg text-on-surface uppercase tracking-widest">Select Size</h3>
              <div className="grid grid-cols-2 gap-4">
                {(product?.boxSizes || ['1kg', '2kg']).map((size, index) => (
                  <button 
                    key={size}
                    className={`flex flex-col p-4 rounded-2xl border-2 ${
                      index === 0 ? 'border-primary bg-primary-container/10 text-primary' : 'border-outline-variant hover:border-primary text-on-surface-variant group-hover:text-primary transition-colors'
                    } transition-all active:scale-95`}
                  >
                    <span className="text-on-surface font-bold text-lg">{size}</span>
                    <span className="text-on-surface-variant text-sm mb-2">{product?.boxLabels?.[index] || 'Standard'}</span>
                    <span className={`${index === 0 ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary transition-colors'} font-display text-2xl`}>
                      {product?.priceRange?.split(' - ')[index] || 'Rs. 450'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 rounded-3xl bg-surface-container-low space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <div>
                    <p className="text-label-sm uppercase text-on-surface-variant tracking-tighter">Origin</p>
                    <p className="font-label-lg">{product?.location || 'Pakistan'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <div>
                    <p className="text-label-sm uppercase text-on-surface-variant tracking-tighter">Harvested</p>
                    <p className="font-label-lg">{product?.harvestSeason || 'June - August'}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-200">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">bolt</span>
                  <div>
                    <p className="text-label-sm uppercase text-on-surface-variant tracking-tighter">Flavor Profile</p>
                    <p className="font-label-lg italic">{product?.flavorProfile || 'Sweet and juicy'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center bg-white border border-zinc-200 rounded-2xl px-4 py-2">
                <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-primary">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="px-6 font-bold text-lg">1</span>
                <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-primary">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <button className="flex-1 bg-primary hover:bg-on-primary-fixed-variant text-on-primary py-4 rounded-full font-label-lg shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">shopping_basket</span>
                  Add to Basket
                </button>
                <button className="flex-1 py-4 rounded-full font-label-lg border-2 border-primary text-primary hover:bg-primary/5 transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="font-display text-display text-on-surface mb-4">Product Information</h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Learn more about our premium mangoes and their journey from farm to your table.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-low p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-2xl">agriculture</span>
                <h3 className="font-headline-md text-on-surface">Origin Story</h3>
              </div>
              <p className="text-body-md text-on-surface-variant">
                {product?.originStory || 'Sourced from the finest orchards in Pakistan, our mangoes are carefully selected for their exceptional quality and flavor.'}
              </p>
            </div>
            
            <div className="bg-surface-container-low p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-2xl">inventory_2</span>
                <h3 className="font-headline-md text-on-surface">Storage Tips</h3>
              </div>
              <p className="text-body-md text-on-surface-variant">
                {product?.storageTips || 'Store at room temperature until ripe, then refrigerate for up to 5 days to maintain freshness.'}
              </p>
            </div>
            
            <div className="bg-surface-container-low p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                <h3 className="font-headline-md text-on-surface">Quality Guarantee</h3>
              </div>
              <p className="text-body-md text-on-surface-variant">
                All our mangoes are hand-picked at peak ripeness and delivered within 48 hours to ensure maximum freshness and flavor.
              </p>
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

export default ProductDetail;
