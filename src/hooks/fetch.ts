import { useEffect, useState } from "react";

export const useFetch = <T>(url: RequestInfo) => {
  const [isActive, setActive] = useState(true);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (isActive) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (isActive) {
            setData(data);
          }
        });
    }

    return () => setActive(false);
  }, [isActive, url]);

  return data;
};
