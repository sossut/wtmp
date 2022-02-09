/**
 * Fetches (GET) JSON data from APIs
 *
 * @param {string} url - api endpoint url
 * @param {string} useProxy - proxy server
 */
const fetchData = async (url, useProxy) => {
  if (useProxy === 'allorigins') {
    url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  } else if (useProxy === 'fazer-php') {
    const subPath = url.split('menu/')[1];
    url = `https://users.metropolia.fi/~mikaeala/proxy/fazer-proxy.php/${subPath}`;
  }
  let jsonData;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    jsonData = await response.json();

    if (useProxy === 'allorigins') {
      jsonData = JSON.parse(jsonData.contents);
    }
  } catch (error) {
    console.error('fetchData() error', error);
    jsonData = {};
  }

  return jsonData;
};




export {fetchData};
