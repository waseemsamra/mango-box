# KisanFresh - Production Deployment Guide

## 🚀 Amplify Deployment Setup

### Prerequisites
- AWS Account with Amplify Console access
- Node.js and npm installed
- Git repository with the project code

### Step 1: Configure AWS Amplify

1. **Create Amplify App**
   ```bash
   # Install Amplify CLI
   npm install -g @aws-amplify/cli
   
   # Initialize Amplify project
   amplify init
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy environment template
   cp .env.production.example .env.production
   
   # Fill in your AWS credentials
   REACT_APP_AWS_REGION=us-east-1
   REACT_APP_AWS_USER_POOLS_ID=your-user-pool-id
   REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID=your-web-client-id
   REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID=your-identity-pool-id
   REACT_APP_S3_BUCKET=your-s3-bucket-name
   ```

3. **Set up Amplify Backend**
   ```bash
   # Add authentication
   amplify add auth
   
   # Add storage (S3)
   amplify add storage
   
   # Deploy backend
   amplify push
   ```

### Step 2: Build Production Version

```bash
# Install dependencies
npm ci

# Build for production
npm run build:prod

# Test build locally
npm start
```

### Step 3: Deploy to Amplify Console

1. **Connect Git Repository**
   - Go to AWS Amplify Console
   - Click "Connect app"
   - Select Git provider
   - Connect your repository

2. **Configure Build Settings**
   - Build settings are automatically configured from `amplify.yml`
   - Environment variables will be set from `.env.production`

3. **Deploy**
   - Click "Deploy" to start the deployment
   - Monitor build progress in Amplify Console

### Step 4: Post-Deployment Configuration

1. **Test Hybrid Features**
   - Navigate to `/admin/hybrid-settings`
   - Test connection status
   - Verify S3 synchronization

2. **Configure Domain**
   - Add custom domain in Amplify Console
   - Set up SSL certificate

3. **Monitor Performance**
   - Check Amplify Console for build logs
   - Monitor S3 storage usage
   - Test offline functionality

## 🔧 Production Optimizations

### Service Worker
- Automatic caching for static assets
- Offline support for core functionality
- Cache invalidation strategy

### Performance Headers
- Static assets cached for 1 year
- HTML files set to no-cache
- Optimized caching for images and fonts

### Build Optimizations
- Minified JavaScript and CSS
- Bundle analysis available with `npm run build:analyze`
- Production environment variables

## 📋 Deployment Checklist

- [ ] AWS Amplify configured
- [ ] Environment variables set
- [ ] Production build successful
- [ ] Service worker registered
- [ ] Hybrid sync functionality tested
- [ ] Admin panel accessible
- [ ] S3 synchronization working
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance monitoring enabled

## 🚨 Troubleshooting

### Common Issues

1. **Storage Import Errors**
   - Ensure `@aws-amplify/storage` is installed
   - Check AWS credentials configuration

2. **Build Failures**
   - Check `amplify.yml` syntax
   - Verify environment variables
   - Check Node.js version compatibility

3. **Sync Issues**
   - Verify S3 bucket permissions
   - Check Amplify configuration
   - Test connection in admin panel

### Debug Commands

```bash
# Check build
npm run build:prod

# Analyze bundle size
npm run build:analyze

# Test locally
npm start

# Check Amplify status
amplify status
```

## 📊 Production Features

### Hybrid Database
- ✅ Local RxDB for performance
- ✅ S3 backup for data persistence
- ✅ Automatic synchronization
- ✅ Offline support

### Admin Features
- ✅ Connection status monitoring
- ✅ Manual data replication
- ✅ Real-time sync feedback
- ✅ Advanced settings

### Performance
- ✅ Service worker caching
- ✅ Optimized build
- ✅ CDN distribution
- ✅ Progressive Web App features

## 🔄 Maintenance

### Regular Tasks
- Monitor S3 storage usage
- Update Amplify dependencies
- Review build logs
- Test sync functionality

### Updates
- Update `package.json` versions
- Test in development first
- Deploy with zero-downtime
- Monitor for issues

## 📞 Support

For deployment issues:
1. Check AWS Amplify Console logs
2. Review build configuration
3. Test hybrid sync functionality
4. Verify environment variables

The application is now ready for production deployment on AWS Amplify with full hybrid database functionality!
