export const postFetch = async (
  url: string,
  accessToken?: string,
  customHeader?: {}
) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    //'X-XSRF-TOKEN': csrfToken || '',
  };

  const headers = { ...defaultHeaders, ...customHeader };

  return fetch(url, { ...customHeader, headers, method: 'POST' }).then((res) =>
    res.json()
  );
};

/* export const loginFetch = async (url: string, customHeader?: {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    //'X-XSRF-TOKEN': csrfToken || '',
  };

  const headers = { ...defaultHeaders, ...customHeader };

  return await fetch(url, { ...customHeader, headers, method: 'POST' }).then(
    (res) => res.json()
  );
}; */
