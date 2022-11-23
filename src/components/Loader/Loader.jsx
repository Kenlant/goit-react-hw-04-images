import { Component } from 'react';
import PropTypes from 'prop-types';
import { ThreeCircles } from 'react-loader-spinner';
import styles from './Loader.module.css';

export default class Loader extends Component {
  render() {
    const { show } = this.props;
    return (
      <>
        {show && (
          <ThreeCircles
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            wrapperClass={styles.Loader}
          />
        )}
      </>
    );
  }
}

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
};
