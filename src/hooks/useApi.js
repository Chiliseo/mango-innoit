import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = url => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const doFetch = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    doFetch();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};

export default useApi;
