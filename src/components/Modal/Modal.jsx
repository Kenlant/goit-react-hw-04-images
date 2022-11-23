import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default class Modal extends Component {
  constructor() {
    super();

    this.handleEscPress = this.handleEscPress.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  handleEscPress(evt) {
    const { onEscPress } = this.props;

    if (evt.key === `Escape`) {
      onEscPress();
    }
  }

  handleModalClick(evt) {
    const { onOutModalClick } = this.props;
    if (evt.target.classList.contains(styles.Overlay)) {
      onOutModalClick();
    }
  }

  componentDidMount() {
    window.addEventListener(`keydown`, this.handleEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener(`keydown`, this.handleEscPress);
  }

  render() {
    const { image, show } = this.props;

    return (
      <>
        {show && (
          <div
            className={styles.Overlay}
            onKeyDown={this.handleEscPress}
            onClick={this.handleModalClick}
          >
            <div className={styles.Modal}>
              <img src={image.largeImageURL} alt={image.tags} />
            </div>
          </div>
        )}
      </>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.object,
  show: PropTypes.bool.isRequired,
};
