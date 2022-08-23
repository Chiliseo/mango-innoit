import React from 'react';
import Range from '../../components/Range';
import useApi from '../../hooks/useApi';

const Exercise2 = () => {
  const { loading, data, error } = useApi(
    'https://demo3647792.mockable.io/exercise2'
  );
  return (
    <div className='exercises'>
      <h1>Exercise2</h1>
      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {!loading && (
        <Range
          min={data?.price?.min}
          max={data?.price?.max}
          currentMin={data?.price?.currentMin}
          currentMax={data?.price?.currentMax}
          rangeValues={data?.price?.rangeValues}
        />
      )}
    </div>
  );
};

export default Exercise2;
