import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ onClick, show }) {
  return (
    <>
      {show && (
        <button className={styles.Button} onClick={onClick}>
          Load more
        </button>
      )}
    </>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
