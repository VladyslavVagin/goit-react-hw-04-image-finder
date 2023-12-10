import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import getPicturesApi from './api-request/api-request';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setSearchData] = useState('');

  const onSubmitForm = event => {
    event.preventDefault();
    let searchData = event.target.elements[1].value;
    if (searchData.trim() !== '') {
      setPage(1);
      setSearchData(searchData);
      setImages([]);
      searchData = '';
    } else {
      toast.error('Incorrect INPUT ! Please, try again!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const loadPictures = async () => {
      try {
        setIsLoading(true);
        const response = await getPicturesApi(query, page);
        const data = response.data;
        if (data.total === 0) {
          toast.error('Images not founded, we so sorry', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (data.total !== 0) {
          setImages(prev => [...prev, ...data.hits]);
        } else if (data.totalHits > 0 && page === 1) {
          toast.success(`We found ${data.totalHits} images`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (Math.ceil(data.totalHits / 12) === page) {
          toast.info('You reached END of search result', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch {
        toast.error('Server not answer', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPictures();
  }, [page, query]);

    return (
      <div className='wrapper-gallery'>
        <SearchBar onSubmit={onSubmitForm} />
        <ImageGallery images={images}/>
        {isLoading === true &&  <Loader />}
        {images.length / 12 >= page && <Button onClick={() => setPage(prev => prev + 1)}/>}
        <ToastContainer autoClose={3000}/>
      </div>
    );
}

 