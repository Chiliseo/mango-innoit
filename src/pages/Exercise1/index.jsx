import React from 'react'
import Range from '../../components/Range'
import useApi from '../../hooks/useApi'

const Exercise1 = () => {
  const { loading, data, error } = useApi(
    'https://demo3647792.mockable.io/exercise1'
  )
  return (
    <div className='exercises'>
      <h1>Exercise1</h1>
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
        />
      )}
    </div>
  )
}

export default Exercise1
