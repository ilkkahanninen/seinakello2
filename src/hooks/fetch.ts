import { useEffect, useState } from "react";
import XML from "xml2js";

export const useFetchJSON = <T>(url: RequestInfo, refresh?: any) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
      });
  }, [url, refresh]);

  return data;
};

export const useFetchXML = <T>(url: RequestInfo, refresh?: any) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.text())
      .then(XML.parseStringPromise)
      .then(data => {
        setData(data);
      });
  }, [url, refresh]);

  return data;
};
