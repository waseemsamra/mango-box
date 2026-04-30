#!/bin/bash

# Script to configure CORS for S3 bucket
# Replace BUCKET_NAME with your actual bucket name

BUCKET_NAME="mango-bucket-536217686312-1777475248"
REGION="us-east-1"

echo "Configuring CORS for S3 bucket: $BUCKET_NAME"

# Apply CORS configuration
aws s3api put-bucket-cors \
    --bucket "$BUCKET_NAME" \
    --cors-configuration file://s3-cors-config.json \
    --region "$REGION"

echo "CORS configuration applied successfully!"

# Verify the configuration
echo "Current CORS configuration:"
aws s3api get-bucket-cors \
    --bucket "$BUCKET_NAME" \
    --region "$REGION"
