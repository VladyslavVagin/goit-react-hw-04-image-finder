import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import getPicturesApi from './api-request/api-request';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import SearchImage from './SearchImage/SearchImage';

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setSearchData] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const onSubmitForm = event => {
    event.preventDefault();
    const searchData = event.target.elements[1].value;
    if (searchData.trim() !== '') {
      setPage(1);
      setSearchData(searchData);
      setImages([]);
      event.target.elements[1].value = '';
    } else {
      toast.error('Incorrect INPUT ! Please, try again!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const addImagesToGallery = async (query, page) => {
    try {
      setIsLoading(true);
      const response = await getPicturesApi(query, page);
      const data = response.data;
      if (data.total === 0) {
        setErrorStatus(true);
      } else if (data.total !== 0 && page === 1) {
        setErrorStatus(false);
        toast.success(`We found ${data.totalHits} images`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (Math.ceil(data.totalHits / 12) === page) {
        toast.info('You reached END of search result', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setImages(prev => [...prev, ...data.hits]);
    } catch {
      toast.error('Server not answer, Sorry!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setErrorStatus(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    addImagesToGallery(query, page);
  }, [page, query]);

  return (
    <div className="wrapper-gallery">
      <SearchBar onSubmit={onSubmitForm} />
      {images.length === 0 && !errorStatus && <SearchImage />}
      {errorStatus ? <ErrorMessage /> :  <ImageGallery images={images} />}
      {isLoading === true && <Loader />}
      {images.length / 12 >= page && isLoading === false && (
        <Button onClick={() => setPage(prev => prev + 1)} />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
