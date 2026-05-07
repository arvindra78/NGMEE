import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getMediaInfo = async (url) => {
  try {
    const response = await api.post('/info', { url });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const downloadMedia = async (url, formatId, title) => {
  try {
    const response = await api.get('/download', {
      params: { url, formatId },
      responseType: 'blob',
    });

    // Create a temporary link to trigger the download
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', `${title || 'video'}.mp4`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
