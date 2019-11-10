import { useEffect, useState } from "react";
import XML from "xml2js";

export const useFetchJSON = <T>(url: RequestInfo) => {
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

export const useFetchXML = <T>(url: RequestInfo) => {
  const [isActive, setActive] = useState(true);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (isActive) {
      fetch(url)
        .then(response => response.text())
        .then(XML.parseStringPromise)
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
