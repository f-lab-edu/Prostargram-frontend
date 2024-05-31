const http = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Network response wa not ok');
  }

  const data: T = await response.json();
  return data;
};

const makeInstance =
  (baseUrl: string, baseOptions?: RequestInit) =>
  <T>(url: string, options?: RequestInit) =>
    http<T>(baseUrl + url, { ...baseOptions, ...options });

const instance = makeInstance('http://localhost:3000');

export default instance;
