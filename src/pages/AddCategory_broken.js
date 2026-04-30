import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import ImageDisplay from '../components/ImageDisplay';
import { categoryService } from '../database/services';
import { useImageUpload } from '../utils/imageUtils';

const AddCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: null,
    image: '',
    displayPriority: 1,
    status: 'Active'
  });

  // Parent categories for dropdown
  const [parentCategories, setParentCategories] = useState([]);

  // Image upload
  const { previews, uploading, error: imageError, handleFileSelect, removePreview, clearPreviews, uploadImages } = useImageUpload();

  // Load parent categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await categoryService.getAllCategories();
        setParentCategories(categories);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Failed to load parent categories');
      }
    };

    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.slug) {
        throw new Error('Category name and slug are required');
      }

      // Upload image if any
      let imageUrl = formData.image;
      if (previews.length > 0) {
        const imageObjects = await uploadImages('category', formData.name);
        if (imageObjects.length > 0) {
          imageUrl = imageObjects[0].url;
        }
      }

      // Create category
      const categoryData = {
        ...formData,
        image: imageUrl,
        displayPriority: parseInt(formData.displayPriority),
        productCount: 0
      };

      await categoryService.createCategory(categoryData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/categories');
      }, 2000);
    } catch (err) {
      console.error('Error creating category:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AdminLayout title="Category Created" description="Category has been successfully added.">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Category Created Successfully!</h3>
          <p className="text-green-600 mb-4">Your category has been added to the catalog.</p>
          <Link to="/admin/categories" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            View Categories
          </Link>
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout 
      title="Add New Category" 
      description="Define a new segment for our seasonal Pakistani produce. Ensure the slug and parent hierarchy are accurate for SEO."
    >
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Fields */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Basic Information Card */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">info</span>
              </div>
              <h2 className="text-xl font-semibold text-on-surface">Category Details</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-on-surface-variant px-1">Category Image</label>
                  
                  {/* Image Upload Area */}
                  <div className="relative group h-32 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center gap-2 hover:border-primary/40 hover:bg-green-50/20 transition-all cursor-pointer overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          // Clear existing previews and add new image
                          clearPreviews();
                          handleFileSelect(files);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="material-symbols-outlined text-2xl text-zinc-400">upload_file</span>
                    <p className="text-xs text-zinc-500">Click to upload image</p>
                    <p className="text-xs text-zinc-400">PNG, JPG up to 5MB</p>
                  </div>

                  {/* Image Preview */}
                  {previews.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-zinc-600">Image Preview</span>
                        <button
                          type="button"
                          onClick={clearPreviews}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="relative group">
                        <ImageDisplay
                          src={previews[0].url}
                          alt={previews[0].name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  {/* Or enter URL manually */}
                  <div className="mt-2">
                    <label className="text-xs text-zinc-500">Or enter image URL manually:</label>
                    <input 
                      className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant focus:ring-2 focus:ring-primary/10 transition-all outline-none text-sm" 
                      placeholder="https://example.com/image.jpg" 
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>

                  {imageError && (
                    <div className="mt-1 text-xs text-red-600">
                      {imageError}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-on-surface-variant px-1">Category Name *</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant focus:ring-2 focus:ring-primary/10 transition-all outline-none" 
                    placeholder="e.g. Sindh Mangoes" 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                      placeholder="sindh-mangoes" 
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">/</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-on-surface-variant px-1">Description</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant focus:ring-2 focus:ring-primary/10 transition-all resize-none outline-none" 
                  placeholder="Describe the characteristics, regions, and seasonal availability of this category..." 
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-on-surface-variant px-1">Parent Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer outline-none"
                    name="parentId"
                    value={formData.parentId || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">None (Top Level)</option>
                    {parentCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-on-surface-variant px-1">Display Priority</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant focus:ring-2 focus:ring-primary/10 transition-all outline-none" 
                    placeholder="1" 
                    type="number"
                    min="1"
                    name="displayPriority"
                    value={formData.displayPriority}
                    onChange={handleInputChange}
                  />
                  <span className="text-[10px] text-gray-500 px-1 italic">Higher numbers appear first in the customer app.</span>
                </div>
              </div>
            </div>
          </section>

          {/* SEO & Extra Info */}
          <section className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/30 flex items-center justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-on-surface mb-2">SEO Optimization</h3>
              <p className="text-base text-on-surface-variant max-w-md">Our AI engine will automatically generate meta descriptions and tags based on your category details to boost organic reach.</p>
              <button className="mt-4 flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all">
                <span>Advanced SEO Settings</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="hidden md:block absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[200px]" style={{fontVariationSettings: "'opsz' 48"}}>search</span>
            </div>
          </section>
        </div>

        {/* Right Column: Media & Meta */}
        <div className="flex flex-col gap-6">
          {/* Visibility Card */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h2 className="text-xl font-semibold text-on-surface">Visibility</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border-2 border-transparent cursor-pointer hover:border-primary/20 transition-all has-[:checked]:border-primary has-[:checked]:bg-green-50">
                <input defaultChecked className="hidden peer" name="visibility" type="radio" value="public"/>
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all">
                  <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-on-surface">Public</p>
                  <p className="text-xs text-on-surface-variant">Visible to all customers immediately.</p>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border-2 border-transparent cursor-pointer hover:border-primary/20 transition-all has-[:checked]:border-primary has-[:checked]:bg-green-50">
                <input className="hidden peer" name="visibility" type="radio" value="draft"/>
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all">
                  <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-on-surface">Draft</p>
                  <p className="text-xs text-on-surface-variant">Only admins can see and edit.</p>
                </div>
              </label>
            </div>
          </section>

          {/* Thumbnail Area */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined">image</span>
              </div>
              <h2 className="text-xl font-semibold text-on-surface">Category Icon</h2>
            </div>
            <div className="relative group h-64 border-2 border-dashed border-outline-variant rounded-[1.5rem] bg-surface-container-lowest flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-green-50/20 transition-all cursor-pointer overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">upload_file</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-on-surface">Click to upload</p>
                <p className="text-xs text-on-surface-variant">SVG, PNG or JPG (max. 800x800px)</p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all"></div>
            </div>
            <div className="mt-6 flex items-start gap-3 p-4 bg-surface-container rounded-2xl">
              <span className="material-symbols-outlined text-tertiary text-lg">lightbulb</span>
              <p className="text-xs text-on-tertiary-container italic">Tip: Use transparent backgrounds for category icons to blend seamlessly with the app interface.</p>
            </div>
          </section>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
        <Link 
          to="/admin/categories" 
          className="px-6 py-3 rounded-xl border border-outline-variant text-on-surface-variant font-medium hover:bg-surface-container-high transition-all"
        >
          Cancel
        </Link>
        <button 
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-primary text-on-primary font-medium shadow-lg shadow-primary/20 hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving Category...' : 'Save Category'}
        </button>
      </div>
      </form>
    </AdminLayout>
  );
};

export default AddCategory;
