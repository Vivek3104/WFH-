import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include token in requests
api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const unwrapAuthEntity = (rawUser: any) => rawUser?.user ?? rawUser?.admin ?? rawUser?.data ?? rawUser;

const resolveMediaUrl = (value: unknown) => {
    if (typeof value !== 'string' || !value.trim()) return '';

    const normalizedValue = value.trim().replace(/\\/g, '/');

    if (
        normalizedValue.startsWith('http://') ||
        normalizedValue.startsWith('https://') ||
        normalizedValue.startsWith('data:') ||
        normalizedValue.startsWith('blob:')
    ) {
        return normalizedValue;
    }

    if (normalizedValue.startsWith('/')) {
        return `${API_ORIGIN}${normalizedValue}`;
    }

    return `${API_ORIGIN}/${normalizedValue.replace(/^\/+/, '')}`;
};

export const normalizeAuthUser = (rawUser: any): {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'superadmin';
    avatar: string;
    phone: string;
    companyName: string;
    registrationNumber: string;
    gstNumber: string;
    address: string;
} => {
    const user = unwrapAuthEntity(rawUser) ?? {};

    return {
        id: String(user.id ?? user._id ?? ''),
        name: user.name ?? '',
        email: user.email ?? '',
        role: user.role === 'superadmin' ? 'superadmin' : user.role === 'admin' ? 'admin' : 'user',
        avatar: resolveMediaUrl(user.profilePic || user.avatar || ''),
        phone: user.phone || '',
        companyName: user.companyName || '',
        registrationNumber: user.registrationNumber || '',
        gstNumber: user.gstNumber || '',
        address: user.address || '',
    };
};

const toNumber = (value: unknown, fallback = 0) => {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : fallback;
};

const toDisplayStatus = (value: unknown, fallback = 'Pending') => {
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return value
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const extractApiList = (payload: any): any[] => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.tasks)) return payload.tasks;
    if (Array.isArray(payload?.submissions)) return payload.submissions;
    if (Array.isArray(payload?.withdrawals)) return payload.withdrawals;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
};

export const normalizeTaskStatus = (value: unknown): 'backlog' | 'in-progress' | 'completed' => {
    const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';

    if (['completed', 'complete', 'done', 'approved', 'paid', 'finished', 'success'].includes(normalized)) {
        return 'completed';
    }

    if (['in progress', 'in-progress', 'active', 'ongoing', 'running', 'assigned'].includes(normalized)) {
        return 'in-progress';
    }

    return 'backlog';
};

export const normalizeTask = (rawTask: any) => ({
    id: String(rawTask.id ?? rawTask._id ?? rawTask.taskId ?? rawTask.slug ?? ''),
    title: rawTask.title ?? rawTask.taskTitle ?? rawTask.name ?? 'Untitled Task',
    category: rawTask.category ?? rawTask.tag ?? rawTask.project ?? rawTask.type ?? 'General',
    payout: toNumber(rawTask.payoutAmount ?? rawTask.payout ?? rawTask.reward ?? rawTask.amount),
    deadline: rawTask.deadline ?? rawTask.dueDate ?? rawTask.endDate ?? rawTask.createdAt ?? new Date().toISOString(),
    status: normalizeTaskStatus(rawTask.status ?? rawTask.assignmentStatus ?? rawTask.taskStatus),
    description: rawTask.description ?? rawTask.details ?? rawTask.instructions ?? 'No description provided yet.',
});

export const normalizeSubmission = (rawSubmission: any) => ({
    id: String(rawSubmission.id ?? rawSubmission._id ?? rawSubmission.submissionId ?? ''),
    task: rawSubmission.task?.title ?? rawSubmission.taskName ?? rawSubmission.title ?? rawSubmission.taskTitle ?? 'Untitled Task',
    payout: toNumber(rawSubmission.payoutAmount ?? rawSubmission.payout ?? rawSubmission.amount ?? rawSubmission.reward),
    date: rawSubmission.createdAt ?? rawSubmission.submittedAt ?? rawSubmission.date ?? new Date().toISOString(),
    status: toDisplayStatus(rawSubmission.status, 'Pending'),
    details: rawSubmission.reason ?? rawSubmission.feedback ?? rawSubmission.note ?? '',
});

export const normalizeWithdrawal = (rawWithdrawal: any) => ({
    id: String(rawWithdrawal.id ?? rawWithdrawal._id ?? rawWithdrawal.withdrawalId ?? ''),
    amount: toNumber(rawWithdrawal.amount ?? rawWithdrawal.requestedAmount ?? rawWithdrawal.payoutAmount),
    method: rawWithdrawal.method ?? rawWithdrawal.paymentMethod ?? rawWithdrawal.channel ?? 'Bank Transfer',
    date: rawWithdrawal.createdAt ?? rawWithdrawal.requestedAt ?? rawWithdrawal.date ?? new Date().toISOString(),
    status: toDisplayStatus(rawWithdrawal.status, 'Pending'),
});

export const authService = {
    login: (data: any) => api.post('/users/login', data),
    register: (data: any) => api.post('/users/register', data),
    getProfile: () => api.get('/users/profile'),
    updateProfile: async (userId: string, data: FormData) => {
        const endpoints = [
            `/users/update/profile/${userId}`,
            '/users/profile',
            `/users/profile/${userId}`,
        ];

        let lastError: unknown;

        for (const endpoint of endpoints) {
            try {
                return await api.put(endpoint, data);
            } catch (error) {
                lastError = error;

                if (!axios.isAxiosError(error)) {
                    throw error;
                }

                const status = error.response?.status;
                const message = String(error.response?.data?.error || error.response?.data?.message || '').toLowerCase();
                const isEndpointMismatch = status === 404 || status === 405 || (status === 400 && message.includes('auth'));

                if (!isEndpointMismatch || endpoint === endpoints[endpoints.length - 1]) {
                    throw error;
                }
            }
        }

        throw lastError;
    },
    updateBankDetails: (data: any) => api.put('/users/bank-details', data),
    updateGovernmentDoc: (data: FormData) => api.put('/users/government-doc', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getWorkHistory: () => api.get('/users/work-history'),
    requestWithdrawal: (data: { amount: number }) => api.post('/users/withdrawal', data),
    getWithdrawals: () => api.get('/users/withdrawals'),
};

export const adminService = {
    register: (data: any) => api.post('/admin/register', data),
    login: (data: any) => api.post('/admin/login', data),
    updateProfile: (data: FormData) => api.put('/admin/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    updateCompanyDetails: (data: any) => api.put('/admin/company-details', data),
    createTask: (data: any) => api.post('/admin/task', data),
    getPendingWork: () => api.get('/admin/pending-work'),
    getUsers: () => api.get('/admin/users'),
    getPendingWithdrawals: () => api.get('/admin/pending-withdrawals'),
    getWorkHistory: () => api.get('/admin/work-history'),
};

export const superadminService = {
    register: (data: any) => api.post('/superadmin/register', data),
    login: (data: any) => api.post('/superadmin/login', data),
    getAdmins: () => api.get('/superadmin/admins'),
    getFranchises: () => api.get('/superadmin/franchises'),
    getPendingFranchises: () => api.get('/superadmin/pending-franchises'),
};

export const taskService = {
    getTasks: () => api.get('/task/tasks'),
    getTaskById: (id: string) => api.get(`/task/task/${id}`),
    getJobs: () => api.get('/task/jobs'),
    submitWork: (data: FormData) => api.post('/users/submit-work', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export default api;
