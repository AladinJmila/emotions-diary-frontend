import { useRef } from 'react';
import { useState, useEffect } from 'react';

export const useFetch = (url, _options = { method: 'get', body: null }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const options = useRef(_options).current;

  if (options.body) options.body = JSON.stringify(options.body);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        if (!res.ok) throw Error(res.statusText);

        const json = await res.json();

        setLoading(false);
        setData(json);
        setError(null);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('The fetch was aborted');
        } else {
          setLoading(false);
          setError('Could no fetch the data');
          console.log(error);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, options]);

  return { data, loading, error };
};
