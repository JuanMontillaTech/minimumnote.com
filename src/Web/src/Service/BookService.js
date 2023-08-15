import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Update with your API server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getAllBooks() {
    return apiClient.get('/books');
  },
  getBookById(id) {
    return apiClient.get(`/books/${id}`);
  },
  createBook(book) {
    return apiClient.post('/books', book);
  },
  updateBook(id, book) {

    return apiClient.put(`/books/${id}`, book);
  },
  deleteBook(id) {
    return apiClient.delete(`/books/${id}`);
  },
};
