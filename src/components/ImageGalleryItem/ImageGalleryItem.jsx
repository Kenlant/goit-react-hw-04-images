import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, onClick }) {
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

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
