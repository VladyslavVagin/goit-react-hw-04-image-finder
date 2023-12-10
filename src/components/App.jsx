import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import getPicturesApi from './api-request/api-request';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    searchData: '',
  };

  onSubmitForm = event => {
    event.preventDefault();
    const searchData = event.target.elements[1].value;
    if(searchData.trim() !== '') {
      this.setState({ searchData, page: 1, images: [], isLoading: true });
      this.addImagesToGallery(searchData, 1, []);
      event.target.elements[1].value = '';
    } else {
      toast.error('Incorrect INPUT ! Please, try again!', {
        position: toast.POSITION.TOP_RIGHT
      });
    } 
  };

  onClick = () => this.setState(({ page }) => ({ page: page + 1 }));

  addImagesToGallery = async (searchData, page,  arrayInitial) => {
     try {
    const response =  await getPicturesApi(searchData, page);
    const data = response.data;
    if (data.total === 0) {
      toast.error('Images not founded, we so sorry', {
        position: toast.POSITION.TOP_RIGHT
      });
    } else if (data.total !== 0 && page === 1) {
      toast.success(`We found ${data.totalHits} images`, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else if (Math.ceil(data.totalHits / 12) === page) {
      toast.info('You reached END of search result', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
      this.setState({ images: [...arrayInitial, ...data.hits] });
    } catch {
      toast.error('Server not answer, Sorry!', {
        position: toast.POSITION.TOP_RIGHT
      });
    } finally {
      this.setState({isLoading: false});
    }
  }

  componentDidUpdate(_, prevState) {
      const {searchData, page} = this.state;
    if (
      prevState.page !== page &&
      prevState.searchData === searchData ) {
      this.setState({isLoading: true})
      this.addImagesToGallery(searchData, page, prevState.images);
    }
  }

  render() {
    const { images, page, isLoading } = this.state;
    return (
      <div className='wrapper-gallery'>
        <SearchBar onSubmit={this.onSubmitForm} />
        <ImageGallery images={images}/>
        {isLoading === true &&  <Loader />}
        {images.length / 12 >= page && <Button onClick={this.onClick}/>}
        <ToastContainer autoClose={3000}/>
      </div>
    );
  }
}

 