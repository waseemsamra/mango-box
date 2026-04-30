import React from 'react';
import { s3Service } from '../services/s3Service';

const ImageDisplay = ({ 
  src, 
  alt, 
  className = '', 
  fallback = '/images/placeholder.jpg',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = React.useState('');
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (src) {
      // Get the proper image URL (handles both S3 URLs and localStorage fallback)
      const imageUrl = s3Service.getImageUrl(src);
      setImageSrc(imageUrl);
      setError(false);
    } else {
      setImageSrc(fallback);
      setError(false);
    }
  }, [src, fallback]);

  const handleError = () => {
    if (!error && imageSrc !== fallback) {
      setError(true);
      setImageSrc(fallback);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageDisplay;
