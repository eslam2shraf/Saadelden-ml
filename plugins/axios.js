export default function A (context) {
  context.$axios.interceptors.request.use(function (config) {
  
      config.headers.Authorization = `Bearer ${context.$cookies.get('token')}`
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
  
  context.$axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
}