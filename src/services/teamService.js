import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/teams',
});

// Add a new team
export const addTeam = (name) => API.post('/add', { name });

// Get all teams
export const getTeams = () => API.get('/');
