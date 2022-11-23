import { useState, useEffect, useCallback } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { getImages } from '../services/api';

const LOADER_TIME_TO_SHOW = 1000;

export default function App() {
  const [images, setImages] = useState([]);
  const [displayedImage, setDisplayedImage] = useState({});
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [searchTerm, setSearchTerm] = useState(``);
  const showModal = !!displayedImage.id;

  const updateImageList = useCallback((searchTerm, page, append) => {
    setShowLoader(true);
    setTimeout(() => {
      getImages(searchTerm, page).then(x => {
        setShowLoader(false);
        setSearchTerm(searchTerm);
        setImages(prev => {
          const images = append ? [...prev, ...x.data.hits] : x.data.hits;
          setShowLoadMoreBtn(x.data.total >= images.length);
          return images;
        });
        setPage(page);
      });
    }, LOADER_TIME_TO_SHOW);
  }, []);

  useEffect(() => {
    if (!images.length) {
      updateImageList(``, page);
    }
  }, [images, page, updateImageList]);

  const handleSearchFormSubmit = useCallback(
    values => {
      const newSearchTerm = values.searchTerm || ``;

      if (searchTerm === newSearchTerm) {
        updateImageList(newSearchTerm, page + 1, true);
      } else {
        updateImageList(newSearchTerm, 1);
      }
    },
    [searchTerm, page, updateImageList]
  );
  const handleImageGalleryItemClick = useCallback(
    image => setDisplayedImage(image),
    []
  );
  const handleLoadMoreButtonClick = useCallback(
    () => updateImageList(searchTerm, page + 1, true),
    [searchTerm, page, updateImageList]
  );
  const closeModal = useCallback(() => setDisplayedImage({}), []);

  return (
    <>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      <ImageGallery images={images} onItemClick={handleImageGalleryItemClick} />
      <Button show={showLoadMoreBtn} onClick={handleLoadMoreButtonClick} />
      <Modal
        image={displayedImage}
        show={showModal}
        onEscPress={closeModal}
        onOutModalClick={closeModal}
      />
      <Loader show={showLoader} />
    </>
  );
}
