import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { image, onClick } = this.props;
    const {
      ImageGalleryItem: imageGalleryItemClassName,
      [`ImageGalleryItem-image`]: imageGalleryItemImgClassName,
    } = styles;

    return (
      <li className={imageGalleryItemClassName} onClick={() => onClick(image)}>
        <img
          className={imageGalleryItemImgClassName}
          src={image.webformatURL}
          alt={image.tags}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
