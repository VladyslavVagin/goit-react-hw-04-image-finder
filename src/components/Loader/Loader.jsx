import React from 'react';
import { FidgetSpinner } from 'react-loader-spinner';

const Loader = () => {
  return (
    <FidgetSpinner
      visible={true}
      height="120"
      width="120"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
      ballColors={['#2d0a66', '#747474', '#6c6cf8']}
      backgroundColor="#000000"
    />
  );
};

export default Loader;
