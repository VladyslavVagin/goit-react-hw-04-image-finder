import axios from 'axios';

async function getPicturesApi(searchData, page) {
  const response = await axios({
    url: 'https://pixabay.com/api/',
    params: {
      key: '40026109-900194399c80021c84c1deb9d',
      q: `${searchData}`,
      image_type: 'photo',
      orientation: 'horizontal',
      page,
      per_page: 12,
      safesearch: false,
    },
  });
  return response;
}

export default getPicturesApi;
