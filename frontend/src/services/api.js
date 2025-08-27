import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add basic auth credentials (you can modify these)
  auth: {
    username: 'Ram',
    password: '7319'
  }
});

export const jobAPI = {
  // Get all jobs
  getAllJobs: () => api.get('/jobPosts'),
  
  // Get job by ID
  getJobById: (id) => api.get(`/jobPost/${id}`),
  
  // Create new job
  createJob: (jobData) => api.post('/jobPost', jobData),
  
  // Update job
  updateJob: (jobData) => api.put('/jobPost', jobData),
  
  // Delete job
  deleteJob: (id) => api.delete(`/jobPost/${id}`),
  
  // Search jobs by keyword
  searchJobs: (keyword) => api.get(`/jobPosts/keyword/${keyword}`),
  
  // Load sample data
  loadSampleData: () => api.get('/load')
};

export default api;