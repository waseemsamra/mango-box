import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { awsConfig, isAwsConfigured } from '../config/aws';

// S3 Configuration Constants
const S3_CONFIG = {
  BUCKET_NAME: 'mango-bucket-536217686312-1777475248',
  REGION: 'us-east-1',
  BASE_URL: `https://mango-bucket-536217686312-1777475248.s3.us-east-1.amazonaws.com`
};

class S3Service {
  constructor() {
    // Secure configuration - no hardcoded credentials
    this.bucketName = process.env.REACT_APP_S3_BUCKET || S3_CONFIG.BUCKET_NAME;
    this.region = process.env.REACT_APP_AWS_REGION || S3_CONFIG.REGION;
    this.baseUrl = process.env.REACT_APP_S3_BASE_URL || S3_CONFIG.BASE_URL;
    
    // Check if AWS credentials are available via environment
    this.isConfigured = !!(process.env.REACT_APP_AWS_REGION && 
                          process.env.REACT_APP_S3_BUCKET);
    
    if (this.isConfigured) {
      console.log('S3Service - Using Amplify credentials');
      // AWS SDK v3 will automatically use Amplify credentials
      this.client = new S3Client({
        region: this.region,
      });
    } else {
      console.log('S3Service - No AWS credentials configured, using localStorage fallback');
      this.client = null;
    }
    
    console.log('S3Service - Configuration:', {
      bucketName: this.bucketName,
      region: this.region,
      isConfigured: this.isConfigured,
      hasCredentials: !!this.client
    });
  }

  // Upload file to S3
  async uploadFile(file, folder, filename) {
    console.log('S3Service - uploadFile called:', { file: file.name, folder, filename });
    console.log('S3Service - isConfigured:', this.isConfigured);
    
    if (!this.isConfigured) {
      console.log('S3Service - Using localStorage fallback');
      return this.uploadToLocalStorage(file, filename);
    }

    try {
      const key = `mango/${folder}/${filename}`;
      console.log('S3Service - Uploading to S3:', { bucket: this.bucketName, key });
      
      // Convert file to buffer for AWS SDK v3
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      
      const params = {
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: file.type
        // ✅ No ACL parameter - bucket permissions handle access
      };

      console.log('S3Service - S3 params:', params);
      const command = new PutObjectCommand(params);
      const result = await this.client.send(command);
      console.log('S3Service - S3 upload result:', result);

      // Return the public URL using your bucket's base URL
      const imageUrl = `${this.baseUrl}/${key}`;
      console.log('S3Service - Returning S3 URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      
      // Check if it's a CORS error and provide helpful message
      if (error.message && error.message.includes('CORS')) {
        console.error('CORS Error detected. Please configure S3 bucket CORS settings.');
        console.error('Run: ./configure-s3-cors.sh');
        throw new Error('CORS configuration required. Please run the CORS configuration script.');
      }
      
      // For other errors, fallback to localStorage
      console.log('S3Service - Falling back to localStorage due to error:', error.message);
      return this.uploadToLocalStorage(file, filename);
    }
  }

  // Delete file from S3
  async deleteFile(imageUrl) {
    if (!this.isConfigured) {
      return this.deleteFromLocalStorage(imageUrl);
    }

    try {
      // Extract key from URL
      const url = new URL(imageUrl);
      const key = url.pathname.substring(1); // Remove leading slash

      const params = {
        Bucket: awsConfig.bucketName,
        Key: key,
      };

      const command = new DeleteObjectCommand(params);
      await this.client.send(command);
      return true;
    } catch (error) {
      console.error('Error deleting from S3:', error);
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
        const simulatedUrl = `/images/${filename}`;
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
    if (!awsConfig.upload.allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed. Allowed types: ${awsConfig.upload.allowedTypes.join(', ')}`);
    }

    // Check file size
    if (file.size > awsConfig.upload.maxFileSize) {
      throw new Error(`File size ${file.size} exceeds maximum allowed size of ${awsConfig.upload.maxFileSize}`);
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

export const s3Service = new S3Service();
export default s3Service;
