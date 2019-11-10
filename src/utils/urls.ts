type Query = {
  [key: string]: string;
};

export const buildURL = (url: string, query: Query) =>
  `${url}?${buildQueryString(query)}`;

const buildQueryString = (query: Query) =>
  Object.entries(query)
    .map(entry => entry.map(encodeURIComponent).join("="))
    .join("&");
