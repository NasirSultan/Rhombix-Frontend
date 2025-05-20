import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/matches',
});

// Create a new match
export const createMatch = (match) => API.post('/create', match);

// Get all matches
export const getMatches = () => API.get('/');
