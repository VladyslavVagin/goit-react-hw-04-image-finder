import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

function Modal ({picture, tags, onClose}) {

useEffect(() => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
     onClose();
    }
  };
  window.addEventListener('keydown',handleKeyDown);

  return (() => window.removeEventListener('keydown', handleKeyDown));
}, [onClose])


  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
    onClose();
    }
  };

    return createPortal(
      <div className={css.overlay} onClick={handleBackdropClick}>
        <div className={css.modal}>
          <img src={picture} alt={tags}/>
        </div>
      </div>,
      modalRoot
    );
}

Modal.propTypes = {
  picture: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal;
