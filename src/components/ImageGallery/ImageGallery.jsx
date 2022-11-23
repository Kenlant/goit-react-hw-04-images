import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onItemClick }) {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(x => (
        <ImageGalleryItem key={x.id} image={x} onClick={onItemClick} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
