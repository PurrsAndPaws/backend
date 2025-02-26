const config = {
  apiUrl: process.env.NODE_ENV === 'production' ? process.env.VITE_API_URL_PROD : process.env.VITE_API_URL_DEV,
  // ...other configurations...
};

module.exports = config;
