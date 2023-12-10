import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function ImageGalleryItem ({image}) {
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
          />
        </li>
      </>
    );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
}
