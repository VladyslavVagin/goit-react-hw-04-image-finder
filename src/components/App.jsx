import SearchBar from './SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import getPicturesApi from './api-request/api-request';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import SearchImage from './SearchImage/SearchImage';

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [errorStatus, setError] = useState(false);
  const [maxPage, setMaxPage] = useState(1);

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
     Notify.failure('Incorrect INPUT ! Please, try again!');
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
        Notify.failure('Images not founded, we so sorry');
      } else if (data.total !== 0 && page === 1) {
        Notify.success(`We found ${data.totalHits} images`);
      } 
      setMaxPage(Math.ceil(data.totalHits / 12));
      setImages(prev => [...prev, ...data.hits]);
    } catch {
      Notify.failure('Server not answer, Sorry!');
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
      {isLoading && <Loader />}
      {maxPage > page && !isLoading && <Button onClick={onClick} />}
      {maxPage <= page && images.length > 0 && <p className='end'>You reached END of search result</p>}
    </>
  );
}
