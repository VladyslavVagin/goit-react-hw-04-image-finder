import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <ThreeDots
      height="40"
      width="100%"
      radius="9"
      color="#04034b"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        justifyContant: 'center',
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0'
    }}
      visible={true}
    />
  );
};

export default Loader;
