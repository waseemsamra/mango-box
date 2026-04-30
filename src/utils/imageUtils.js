// Image upload and management utilities
import React, { useState } from 'react';
import { s3Service } from '../services/s3Service';

// Image utility functions for handling image uploads, compression, and storage
const imageUtils = {
  // Generate unique filename for uploaded images
  generateFileName: (originalName, productId) => {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop();
    return `product-${productId}-${timestamp}.${extension}`;
  },

  // Validate image file
  validateImage: (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
    }

    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }

    return true;
  },

  // Create image preview URL
  createPreviewUrl: (file) => {
    return URL.createObjectURL(file);
  },

  // Revoke preview URL to free memory
  revokePreviewUrl: (url) => {
    URL.revokeObjectURL(url);
  },

  // Compress image (client-side)
  compressImage: (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          }));
        }, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  },

  // Save image to S3 or localStorage fallback
  saveImageToPublic: async (file, filename, folder = 'products') => {
    try {
      // Validate file
      s3Service.validateFile(file);
      
      // Compress image
      const compressedFile = await imageUtils.compressImage(file);
      
      // Upload to S3 (or localStorage fallback)
      const imageUrl = await s3Service.uploadFile(compressedFile, `images/${folder}`, filename);
      
      return imageUrl;
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  },

  // Get image from localStorage (simulated server retrieval)
  getImageFromStorage: (filename) => {
    return localStorage.getItem(`image_${filename}`);
  },

  // Get image URL (delegates to S3 service)
  getImageUrl: (imagePath) => {
    return s3Service.getImageUrl(imagePath);
  },

  // Upload multiple images
  uploadMultipleImages: async (files, productId) => {
    const uploadPromises = [];
    const imageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        imageUtils.validateImage(file);
        const filename = imageUtils.generateFileName(file.name, productId);
        const imageUrl = await imageUtils.saveImageToPublic(file, filename);
        imageUrls.push(imageUrl);
        uploadPromises.push(Promise.resolve(imageUrl));
      } catch (error) {
        console.error(`Error uploading image ${file.name}:`, error);
        uploadPromises.push(Promise.reject(error));
      }
    }

    try {
      await Promise.all(uploadPromises);
      return imageUrls;
    } catch (error) {
      throw new Error('Some images failed to upload. Please check the console for details.');
    }
  },

  // Create image object for database storage
  createImageObject: (url, alt, isMain = false) => {
    return {
      url,
      alt,
      isMain,
      uploadedAt: new Date().toISOString()
    };
  },

  // Process images for product
  processProductImages: async (files, productId, productName) => {
    if (!files || files.length === 0) {
      return [];
    }

    const imageUrls = await imageUtils.uploadMultipleImages(files, productId);
    
    return imageUrls.map((url, index) => 
      imageUtils.createImageObject(
        url,
        `${productName} - Image ${index + 1}`,
        index === 0
      )
    );
  },

  // Simple image upload for categories
  uploadCategoryImage: async (file, categoryName) => {
    if (!file) {
      return null;
    }

    try {
      // Validate file
      s3Service.validateFile(file);
      
      // Generate filename
      const filename = s3Service.generateFilename(file.name, `category-${categoryName}`);
      
      // Upload to S3 (or localStorage fallback)
      const imageUrl = await imageUtils.saveImageToPublic(file, filename, 'categories');
      
      return imageUrl;
    } catch (error) {
      console.error('Error uploading category image:', error);
      throw error;
    }
  }
};

// Export the imageUtils object
export { imageUtils };

// Custom hook for image management
const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [previews, setPreviews] = useState([]);

  const handleFileSelect = (files) => {
    const newPreviews = [];
    const errors = [];

    Array.from(files).forEach(file => {
      try {
        imageUtils.validateImage(file);
        const previewUrl = imageUtils.createPreviewUrl(file);
        newPreviews.push({
          file,
          url: previewUrl,
          name: file.name
        });
      } catch (err) {
        errors.push(err.message);
      }
    });

    if (errors.length > 0) {
      setError(errors.join(', '));
    }

    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removePreview = (index) => {
    const preview = previews[index];
    if (preview) {
      imageUtils.revokePreviewUrl(preview.url);
    }
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const clearPreviews = () => {
    previews.forEach(preview => {
      imageUtils.revokePreviewUrl(preview.url);
    });
    setPreviews([]);
    setError(null);
  };

  const uploadImages = async (productId, productName) => {
    if (previews.length === 0) {
      return [];
    }

    setUploading(true);
    setError(null);

    try {
      const files = previews.map(p => p.file);
      const imageObjects = await imageUtils.processProductImages(files, productId, productName);
      return imageObjects;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    previews,
    uploading,
    error,
    handleFileSelect,
    removePreview,
    clearPreviews,
    uploadImages
  };
};

// Export the useImageUpload hook
export { useImageUpload };
