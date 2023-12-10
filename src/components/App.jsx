import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import getPicturesApi from './api-request/api-request';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const onSubmitForm = event => {
    event.preventDefault();
    const searchData = event.target.elements[1].value;
    if (searchData.trim() !== '') {
      setQuery(searchData);
      setPage(1);
      setImages([]);
      addImagesToGallery(query, 1);
      event.target.elements[1].value = '';
    } else {
      toast.error('Incorrect INPUT ! Please, try again!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const onClick = () => setPage(prev => prev + 1);

  const addImagesToGallery = async (query, page) => {
    try {
      setIsLoading(true);
      const response = await getPicturesApi(query, page);
      const data = response.data;
      setImages(prev => [...prev, ...data.hits]);
    } catch {
      console.log('error')
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
    <div className="wrapper-gallery">
      <SearchBar onSubmit={onSubmitForm} />
      <ImageGallery images={images} />
      {isLoading === true && <Loader />}
      {images.length / 12 >= page && !isLoading && <Button onClick={onClick} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
