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
      ballColors={['#0e79d1', '#fffb00', '#26aa2d']}
      backgroundColor="#000000"
    />
  );
};

export default Loader;
