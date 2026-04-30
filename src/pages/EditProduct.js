import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import ImageDisplay from '../components/ImageDisplay';
import { productService } from '../database/services';
import { categoryService } from '../database/services';
import { unitService } from '../database/services';
import { originService } from '../database/services';
import { currencyService } from '../database/services';
import { useImageUpload, imageUtils } from '../utils/imageUtils';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    unitId: '',
    originId: '',
    currencyId: '',
    stock: '',
    sku: '',
    status: 'Active',
    featured: false,
    rating: 0,
    reviewCount: 0,
    images: []
  });

  // Dropdown data
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  // Image upload
  const { previews, uploading, error: imageError, handleFileSelect, removePreview, clearPreviews, uploadImages } = useImageUpload();

  // Load product data and dropdown data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load product data
        const product = await productService.getProductById(id);
        if (!product) {
          throw new Error('Product not found');
        }
        
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          categoryId: product.categoryId || '',
          unitId: product.unitId || '',
          originId: product.originId || '',
          currencyId: product.currencyId || '',
          stock: product.stock || '',
          sku: product.sku || '',
          status: product.status || 'Active',
          featured: product.featured || false,
          rating: product.rating || 0,
          reviewCount: product.reviewCount || 0,
          images: product.images || []
        });

        // Load dropdown data
        console.log('EditProduct - Loading dropdown data...');
        const [categoriesData, unitsData, originsData, currenciesData] = await Promise.all([
          categoryService.getAllCategories(),
          unitService.getAllUnits(),
          originService.getAllOrigins(),
          currencyService.getAllCurrencies()
        ]);

        console.log('EditProduct - Loaded data:', {
          categories: categoriesData.length,
          units: unitsData.length,
          origins: originsData.length,
          currencies: currenciesData.length
        });

        setCategories(categoriesData);
        setUnits(unitsData);
        setOrigins(originsData);
        setCurrencies(currenciesData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    loadData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      handleFileSelect(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.categoryId || !formData.unitId || !formData.originId || !formData.currencyId) {
        throw new Error('Please fill in all required fields');
      }

      console.log('EditProduct form submission started');
      console.log('Previews:', previews);
      console.log('Form data:', formData);

      // Upload new images if any
      let updatedImages = [...formData.images];
      if (previews.length > 0) {
        console.log('Uploading new images:', previews.length);
        const imageObjects = await uploadImages(id, formData.name);
        updatedImages = [...updatedImages, ...imageObjects.map(img => img.url)];
      }

      // Update product
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: updatedImages,
        updatedAt: new Date().toISOString()
      };

      await productService.updateProduct(id, productData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeExistingImage = (imageIndex) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== imageIndex)
    }));
  };

  if (fetching) {
    return (
      <AdminLayout title="Edit Product" description="Loading product details...">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (success) {
    return (
      <AdminLayout title="Product Updated" description="Product has been successfully updated.">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Product Updated Successfully!</h3>
          <p className="text-green-600 mb-4">Your product has been updated in the inventory.</p>
          <Link to="/admin/products" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            View Products
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Edit Product" 
      description="Update product details, pricing, and inventory information."
    >
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-on-surface mb-4">Product Images</h3>
              
              {/* Existing Images */}
              {formData.images.length > 0 && (
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-600">Current Images ({formData.images.length})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <ImageDisplay
                          src={image}
                          alt={`${formData.name} - Image ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Upload Area */}
              <div className="w-full h-64 rounded-xl bg-surface-container border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="material-symbols-outlined text-4xl text-zinc-400 mb-2">add_photo_alternate</span>
                <p className="text-sm text-zinc-500 font-medium">Click to upload images</p>
                <p className="text-xs text-zinc-400 mt-1">PNG, JPG, GIF up to 5MB each</p>
              </div>

              {/* New Image Previews */}
              {previews.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-600">New Images ({previews.length})</span>
                    <button
                      type="button"
                      onClick={clearPreviews}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <ImageDisplay
                          src={preview.url}
                          alt={preview.name}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePreview(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {imageError && (
                <div className="mt-2 text-xs text-red-600">
                  {imageError}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Product Details Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Product Name *</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Enter product name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Description</label>
                  <textarea 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Enter product description"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Price *</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Stock</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="0"
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">SKU</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Product SKU"
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Status</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-zinc-600">Featured Product</span>
                </label>
              </div>
            </div>

            {/* Classification */}
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-4">Classification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Category *</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Unit *</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    name="unitId"
                    value={formData.unitId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select unit</option>
                    {units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name} ({unit.abbreviation})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Origin *</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    name="originId"
                    value={formData.originId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select origin</option>
                    {origins.map(origin => (
                      <option key={origin.id} value={origin.id}>
                        {origin.name}, {origin.region}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Currency *</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    name="currencyId"
                    value={formData.currencyId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select currency</option>
                    {currencies.map(currency => (
                      <option key={currency.id} value={currency.id}>
                        {currency.name} ({currency.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Link
                to="/admin/products"
                className="px-6 py-2.5 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || uploading}
                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading || uploading ? 'Updating Product...' : 'Update Product'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditProduct;
