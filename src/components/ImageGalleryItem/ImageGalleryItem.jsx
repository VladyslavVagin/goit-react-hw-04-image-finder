import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => this.setState(({showModal}) => ({showModal: !showModal}));

  render() {
    const { showModal } = this.state;
    const { image } = this.props;
    const { webformatURL, tags, largeImageURL } = image;
    return (
      <>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            picture={largeImageURL}
            tags={tags}
          />
        )}
        <li onClick={this.toggleModal}>
          <img
            src={webformatURL}
            alt={tags}
            className={css.image}
          />
        </li>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
}