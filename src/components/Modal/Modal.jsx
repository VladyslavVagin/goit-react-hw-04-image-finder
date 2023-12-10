import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
   componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    }
   

   handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };


  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={this.props.picture} alt={this.props.tags}/>
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  picture: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal;
