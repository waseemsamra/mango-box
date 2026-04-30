# Fix S3 CORS Error for Image Uploads

## Problem
The application is experiencing CORS (Cross-Origin Resource Sharing) errors when trying to upload images to S3 from localhost:3001.

## Error Message
```
Access to fetch at 'https://mango-bucket-536217686312-1777475248.s3.us-east-1.amazonaws.com/...' 
from origin 'http://localhost:3001' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solution

### Option 1: Run the Automated Script (Recommended)

1. **Make sure AWS CLI is installed and configured:**
   ```bash
   # Install AWS CLI if not already installed
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   unzip awscliv2.zip
   sudo ./aws/install
   
   # Configure AWS CLI with your credentials
   aws configure
   ```

2. **Run the CORS configuration script:**
   ```bash
   cd /Users/apple/Downloads/mango-box
   ./configure-s3-cors.sh
   ```

### Option 2: Manual AWS Console Setup

1. **Go to AWS S3 Console:**
   - Navigate to: https://console.aws.amazon.com/s3/
   - Find your bucket: `mango-bucket-536217686312-1777475248`

2. **Configure CORS:**
   - Click on the bucket name
   - Go to "Permissions" tab
   - Scroll down to "Cross-origin resource sharing (CORS)"
   - Click "Edit"
   - Paste the following JSON configuration:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "http://localhost:3001",
            "http://localhost:3000",
            "https://localhost:3001",
            "https://localhost:3000"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```

3. **Save the configuration**

### Option 3: AWS CLI Command

```bash
aws s3api put-bucket-cors \
    --bucket mango-bucket-536217686312-1777475248 \
    --cors-configuration file://s3-cors-config.json \
    --region us-east-1
```

## Verification

After applying the CORS configuration, you can verify it worked:

```bash
aws s3api get-bucket-cors \
    --bucket mango-bucket-536217686312-1777475248 \
    --region us-east-1
```

## Testing

1. Restart your React application
2. Try uploading an image again
3. The upload should now work without CORS errors

## Fallback

The application has been updated to automatically fall back to localStorage if S3 upload fails, so you can continue working while fixing the CORS issue.

## Files Created

- `s3-cors-config.json` - CORS configuration file
- `configure-s3-cors.sh` - Automated script to apply CORS settings
- `CORS-FIX-INSTRUCTIONS.md` - This instruction file

## Troubleshooting

If you still experience issues after applying CORS:

1. **Check AWS credentials:** Ensure your AWS CLI is properly configured
2. **Bucket permissions:** Verify the bucket allows the required operations
3. **Region:** Ensure you're using the correct region (us-east-1)
4. **Browser cache:** Clear browser cache and restart the application
