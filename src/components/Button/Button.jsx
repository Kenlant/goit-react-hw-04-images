import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default class Button extends Component {
  render() {
    const { onClick, show } = this.props;

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
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
