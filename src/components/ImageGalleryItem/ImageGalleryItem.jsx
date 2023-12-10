import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState, memo } from 'react';

const ImageGalleryItem = ({image}) => {
  const [showModal, setShowModal] = useState(false);

 const toggleModal = () => setShowModal(!showModal);

    const { webformatURL, tags, largeImageURL} = image;
    return (
      <>
        {showModal && (
          <Modal
            onClose={toggleModal}
            picture={largeImageURL}
            tags={tags}
          />
        )}
        <li onClick={toggleModal}> 
          <img
            src={webformatURL}
            alt={tags}
            className={css.image}
            loading='lazy'
          />
        </li>
      </>
    );
}

export default memo(ImageGalleryItem);

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
}
