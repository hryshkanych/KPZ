// apiService.js
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:5120/api', 
});

// Додавання перехоплювача до екземпляру Axios
apiService.interceptors.request.use(
  (config) => {
    // обробка перед відправкою запиту
    console.log('Request interceptor:', config);
    return config;
  },
  (error) => {
    // Обробка помилок запиту
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    //  код обробки відповіді
    console.log('Response interceptor:', response);
    return response;
  },
  (error) => {
    // Обробка помилок відповіді
    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

export default apiService;
