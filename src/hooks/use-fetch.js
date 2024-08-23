import axiosInstance from "@/lib/axios";
import { useState, useEffect, useCallback } from "react";

export const useFetch = (url, options) => {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagiantion] = useState([]);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await axiosInstance.get(url, options);
      setData(response.data.payload);
      setPagiantion(response.data.metadata);
    } catch (err) {
      setError(err);
    } finally {
      setIsFetching(false);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    isFetching,
    data,
    pagination,
    error,
    refetch: getData,
  };
};
