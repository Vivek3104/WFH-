import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include token in requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (data: any) => api.post('/users/login', data),
    register: (data: any) => api.post('/users/register', data),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data: any) => api.put('/users/profile', data),
};

export const adminService = {
    login: (data: any) => api.post('/admin/login', data),
    createTask: (data: any) => api.post('/admin/task', data),
    getPendingWork: () => api.get('/admin/pending-work'),
};

export const taskService = {
    getTasks: () => api.get('/tasks'),
    getTaskById: (id: string) => api.get(`/task/${id}`),
    submitWork: (data: FormData) => api.post('/users/submit-work', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export default api;
