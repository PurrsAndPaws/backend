const config = require('./config');

// ...existing code...

console.log(`API URL: ${config.apiUrl}`);

// Use config.apiUrl wherever the API URL is needed
// For example, in an API request:
const axios = require('axios');

axios.get(`${config.apiUrl}/endpoint`)
  .then(response => {
    // ...handle response...
  })
  .catch(error => {
    // ...handle error...
  });

// ...existing code...
