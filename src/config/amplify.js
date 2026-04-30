// AWS Amplify Configuration for secure deployment
export const amplifyConfig = {
  // This will be automatically configured by Amplify
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
  
  // S3 Storage configuration
  aws_user_files_s3_bucket: 'mango-bucket-536217686312-1777475248',
  aws_user_files_s3_bucket_region: 'us-east-1',
  
  // Custom S3 configuration for image uploads
  customS3Config: {
    bucket: 'mango-bucket-536217686312-1777475248',
    region: 'us-east-1',
    baseUrl: 'https://mango-bucket-536217686312-1777475248.s3.us-east-1.amazonaws.com',
    folderPath: 'mango/',
    accessLevel: 'public'
  }
};

// Check if Amplify is configured
export const isAmplifyConfigured = () => {
  return !!(amplifyConfig.aws_cognito_identity_pool_id && 
           amplifyConfig.aws_user_pools_id && 
           amplifyConfig.aws_user_pools_web_client_id);
};

export default amplifyConfig;
