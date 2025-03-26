import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const addAuthor = async (author: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/authors`, author, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Ensuring the correct header is set for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding author:', error);
  }
};

export const updateAuthor = async (id: number, author: FormData) => {
  try {
    const response = await axios.put(`${API_URL}/authors/${id}`, author, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Ensuring the correct header is set for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating author:', error);
  }
};

export const deleteAuthor = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/authors/${id}`);
  } catch (error) {
    console.error('Error deleting author:', error);
  }
};

export const getAuthors = async () => {
  try {
    const response = await axios.get(`${API_URL}/authors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching authors', error);
    return [];
  }
};
