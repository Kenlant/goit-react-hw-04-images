import axios from 'axios';

const API_KEY = `29954893-4cb5086e831429945de919a14`;
const PAGE_SIZE = 12;
const api = axios.create({
  baseURL: `https://pixabay.com/api`,
  timeout: 1000,
});

export function getImages(searchTerm = ``, page = 1, pageSize = PAGE_SIZE) {
  return api.get(
    `?q=${searchTerm}&page=${page}&per_page=${pageSize}&key=${API_KEY}`
  );
}
