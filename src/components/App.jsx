import SearchBar from './SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import getPicturesApi from './api-request/api-request';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import SearchImage from './SearchImage/SearchImage';

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [errorStatus, setError] = useState(false);

  const onSubmitForm = event => {
    event.preventDefault();
    const querySearch = event.target.elements[1].value;
    if (querySearch.trim() !== '') {
      setError(false);
      setQuery(querySearch);
      setPage(1);
      setImages([]);
      event.target.elements[1].value = '';
    } else {
      toast.error('Incorrect INPUT ! Please, try again!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const onClick = () => setPage(prevPage => prevPage + 1);

  const addImagesToGallery = async (query, page) => {
    try {
      setIsLoading(true);
      const response = await getPicturesApi(query, page);
      const data = response.data;
      if (data.total === 0) {
        setError(true);
        toast.error('Images not founded, we so sorry', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (data.total !== 0 && page === 1) {
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    addImagesToGallery(query, page);
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={onSubmitForm} />
      {images.length > 0 && !errorStatus && <ImageGallery images={images} />}
      {images.length === 0 && !errorStatus && !isLoading && <SearchImage />}
      {errorStatus && images.length === 0 && <ErrorMessage />}
      {isLoading === true && <Loader />}
      {images.length / 12 >= page && !isLoading && <Button onClick={onClick} />}
      <ToastContainer autoClose={3000} />
    </>
  );
}
