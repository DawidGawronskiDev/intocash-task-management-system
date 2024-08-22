import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(url)
        .then((data) => setData(data.data))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useAxios;
