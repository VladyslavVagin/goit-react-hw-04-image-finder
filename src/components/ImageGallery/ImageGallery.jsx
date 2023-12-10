import React from 'react';
import css from './ImageGallery.module.css'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({images}) => {
  return <ul className={css.gallery}>
     {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
  </ul>;
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
}

export default ImageGallery;
