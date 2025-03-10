import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const authAPI = {
  getCurrentUser: () => api.get('/users/current'),
  register: (userData) => api.post('/users/register', { user: userData }),
  login: (credentials) => api.post('/users/sign_in_or_sign_up', { user: credentials }),
  logout: () => api.delete('/users/logout')
};

export const videoAPI = {
  getVideos: () => api.get('/videos'),
  shareVideo: (url) => api.post('/videos', { youtube_video: { url } })
};

export default api;
