// AWS S3 Configuration
export const awsConfig = {
  // Your specific bucket configuration
  region: 'us-east-1',
  bucketName: 'mango-bucket-536217686312-1777475248',
  baseUrl: 'https://mango-bucket-536217686312-1777475248.s3.us-east-1.amazonaws.com',
  folderPath: 'mango/',
  
  // For Amplify deployment (credentials managed by Amplify)
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  
  // S3 folder structure (within mango/ folder)
  folders: {
    products: 'mango/products',
    categories: 'mango/categories', 
    origins: 'mango/origins',
    units: 'mango/units',
    temp: 'mango/temp'
  },
  
  // Image upload settings
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    compression: {
      quality: 0.8,
      maxWidth: 1200,
      maxHeight: 1200
    }
  }
};

// Check if AWS credentials are configured
export const isAwsConfigured = () => {
  return !!(awsConfig.accessKeyId && awsConfig.secretAccessKey && awsConfig.bucketName);
};

export default awsConfig;
