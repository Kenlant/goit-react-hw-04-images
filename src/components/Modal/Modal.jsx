import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default function Modal({ image, show, onOutModalClick, onEscPress }) {
  const handleEscPress = useCallback(
    evt => {
      if (evt.key === `Escape`) {
        onEscPress();
      }
    },
    [onEscPress]
  );

  const handleModalClick = evt => {
    if (evt.target.classList.contains(styles.Overlay)) {
      onOutModalClick();
    }
  };

  useEffect(() => {
    window.addEventListener(`keydown`, handleEscPress);

    return () => window.removeEventListener(`keydown`, handleEscPress);
  }, [handleEscPress]);

  return (
    <>
      {show && (
        <div
          className={styles.Overlay}
          onKeyDown={handleEscPress}
          onClick={handleModalClick}
        >
          <div className={styles.Modal}>
            <img src={image.largeImageURL} alt={image.tags} />
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  image: PropTypes.object,
  show: PropTypes.bool.isRequired,
};
