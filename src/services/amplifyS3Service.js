import { Amplify } from '@aws-amplify/core';
import { Storage } from 'aws-amplify';
import { amplifyConfig, isAmplifyConfigured } from '../config/amplify';
import awsConfig from '../config/aws';

// Configure Amplify if credentials are available
if (isAmplifyConfigured()) {
  Amplify.configure({
    Auth: {
      identityPoolId: amplifyConfig.aws_cognito_identity_pool_id,
      region: amplifyConfig.aws_cognito_region,
      userPoolId: amplifyConfig.aws_user_pools_id,
      userPoolWebClientId: amplifyConfig.aws_user_pools_web_client_id,
    },
    Storage: {
      AWSS3: {
        bucket: amplifyConfig.customS3Config.bucket,
        region: amplifyConfig.customS3Config.region,
        level: 'public', // 'public' | 'protected' | 'private'
      },
    },
  });
}

class AmplifyS3Service {
  constructor() {
    this.isConfigured = isAmplifyConfigured();
    if (!this.isConfigured) {
      console.warn('Amplify not configured. Using localStorage fallback.');
    }
  }

  // Upload file to S3 using Amplify Storage
  async uploadFile(file, folder, filename) {
    if (!this.isConfigured) {
      return this.uploadToLocalStorage(file, filename);
    }

    try {
      const key = `${folder}/${filename}`;
      
      // Use Amplify Storage for upload
      const result = await Storage.put(key, file, {
        level: 'public',
        contentType: file.type,
      });

      // Return the public URL
      const imageUrl = `${amplifyConfig.customS3Config.baseUrl}/${key}`;
      return imageUrl;
    } catch (error) {
      console.error('Error uploading to S3 via Amplify:', error);
      throw error;
    }
  }

  // Delete file from S3 using Amplify Storage
  async deleteFile(imageUrl) {
    if (!this.isConfigured) {
      return this.deleteFromLocalStorage(imageUrl);
    }

    try {
      // Extract key from URL
      const url = new URL(imageUrl);
      const key = url.pathname.substring(1); // Remove leading slash

      await Storage.remove(key, { level: 'public' });
      return true;
    } catch (error) {
      console.error('Error deleting from S3 via Amplify:', error);
      throw error;
    }
  }

  // Fallback: Upload to localStorage
  async uploadToLocalStorage(file, filename) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const imageData = e.target.result;
        localStorage.setItem(`image_${filename}`, imageData);
        
        // Return a simulated URL
        const simulatedUrl = `${awsConfig.baseUrl}/mango/${filename}`;
        resolve(simulatedUrl);
      };
      
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Fallback: Delete from localStorage
  async deleteFromLocalStorage(imageUrl) {
    try {
      const filename = imageUrl.split('/').pop();
      localStorage.removeItem(`image_${filename}`);
      return true;
    } catch (error) {
      console.error('Error deleting from localStorage:', error);
      throw error;
    }
  }

  // Get image URL (handles both S3 and localStorage)
  getImageUrl(imagePath) {
    // If it's already a full URL (S3), return as is
    if (imagePath && (imagePath.startsWith('https://') || imagePath.startsWith('http://'))) {
      return imagePath;
    }
    
    // If it's a file path, try to get from localStorage first
    if (imagePath) {
      const filename = imagePath.split('/').pop();
      const storedImage = localStorage.getItem(`image_${filename}`);
      if (storedImage) {
        return storedImage;
      }
    }
    
    // Return the original path as fallback
    return imagePath || '';
  }

  // Validate file
  validateFile(file) {
    if (!file) {
      throw new Error('No file provided');
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }

    // Check file size
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      throw new Error(`File size ${file.size} exceeds maximum allowed size of ${maxFileSize}`);
    }

    return true;
  }

  // Generate unique filename
  generateFilename(originalName, prefix = '') {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop();
    const baseName = originalName.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
    
    const filename = prefix ? `${prefix}_${baseName}_${timestamp}_${randomString}.${extension}` : `${baseName}_${timestamp}_${randomString}.${extension}`;
    
    return filename;
  }
}

export const amplifyS3Service = new AmplifyS3Service();
export default amplifyS3Service;
