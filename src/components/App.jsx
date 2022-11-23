import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { getImages } from '../services/api';

const LOADER_TIME_TO_SHOW = 1000;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
      displayedImage: {},
      page: 1,
      showLoader: false,
      showLoadMoreBtn: false,
      searchTerm: ``,
    };

    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleGalleryItemClick = this.handleGalleryItemClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getImages = this.updateImageList.bind(this);
    this.handleLoadMoreBtnClick = this.handleLoadMoreBtnClick.bind(this);
  }

  componentDidMount() {
    const { images, page } = this.state;
    if (!images.length) {
      this.updateImageList(``, page);
    }
  }

  handleSearchFormSubmit(values) {
    const { page, searchTerm } = this.state;
    const newSearchTerm = values.searchTerm || ``;

    if (searchTerm === newSearchTerm) {
      this.updateImageList(newSearchTerm, page + 1, true);
    } else {
      this.updateImageList(newSearchTerm, 1);
    }
  }

  handleGalleryItemClick(image) {
    this.setState({ displayedImage: image });
  }

  handleLoadMoreBtnClick() {
    const { searchTerm, page } = this.state;

    this.updateImageList(searchTerm, page + 1, true);
  }

  closeModal() {
    if (this.state.displayedImage.id) {
      this.setState({ displayedImage: {} });
    }
  }

  showLoader() {
    this.setState({ showLoader: true });
  }

  hideLoader() {
    this.setState({ showLoader: false });
  }

  updateImageList(searchTerm, page, append) {
    this.showLoader();

    setTimeout(() => {
      getImages(searchTerm, page).then(x => {
        this.hideLoader();
        this.setState(prev => ({
          searchTerm: searchTerm,
          images: append ? [...prev.images, ...x.data.hits] : x.data.hits,
          showLoadMoreBtn: x.data.total >= this.state.images.length,
          page: page,
        }));
      });
    }, LOADER_TIME_TO_SHOW);
  }

  render() {
    const { images, displayedImage, showLoader, showLoadMoreBtn } = this.state;
    const showModal = !!displayedImage.id;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery
          images={images}
          onItemClick={this.handleGalleryItemClick}
        />
        <Button show={showLoadMoreBtn} onClick={this.handleLoadMoreBtnClick} />
        <Modal
          image={displayedImage}
          show={showModal}
          onEscPress={this.closeModal}
          onOutModalClick={this.closeModal}
        />
        <Loader show={showLoader} />
      </>
    );
  }
}
