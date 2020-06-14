import axios from 'axios';

// set the headers to the token
function setToken(token) {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }
  if (!token) {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setToken;
