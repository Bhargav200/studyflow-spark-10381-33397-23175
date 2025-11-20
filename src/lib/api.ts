
import axios from 'axios';
import { auth } from './firebase';

// Create axios instance with base URL
// For now, using a placeholder URL - you'll need to replace this with your actual MongoDB backend URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication API
export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  updateProfile: async (userData: any) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },
  getUserData: async (uid: string) => {
    const response = await api.get(`/users/${uid}`);
    return response.data;
  },
};

// Credit API
export const creditAPI = {
  getBalance: async () => {
    const response = await api.get('/credits/balance');
    return response.data;
  },
  purchaseCredits: async (amount: number, paymentDetails: any) => {
    const response = await api.post('/credits/purchase', { amount, paymentDetails });
    return response.data;
  },
};

// Email Generator API
export const emailGeneratorAPI = {
  generateEmail: async (params: { recipient: string, purpose: string, tone: string, additionalInfo?: string }) => {
    const response = await api.post('/email-generator/generate', params);
    return response.data;
  },
  saveEmail: async (emailData: any) => {
    const response = await api.post('/email-generator/save', emailData);
    return response.data;
  },
  getUserEmails: async () => {
    const response = await api.get('/email-generator/user-emails');
    return response.data;
  },
};

// Resume Generator API
export const resumeGeneratorAPI = {
  generateResume: async (params: any) => {
    const response = await api.post('/resume-generator/generate', params);
    return response.data;
  },
  saveResume: async (resumeData: any) => {
    const response = await api.post('/resume-generator/save', resumeData);
    return response.data;
  },
  getUserResumes: async () => {
    const response = await api.get('/resume-generator/user-resumes');
    return response.data;
  },
};

// Resume Scorer API
export const resumeScorerAPI = {
  scoreResume: async (resumeData: any) => {
    const response = await api.post('/resume-scorer/analyze', resumeData);
    return response.data;
  },
  getScoringHistory: async () => {
    const response = await api.get('/resume-scorer/history');
    return response.data;
  },
};

// Interview Questions API
export const interviewQuestionsAPI = {
  generateQuestions: async (params: any) => {
    const response = await api.post('/interview-questions/generate', params);
    return response.data;
  },
  saveSession: async (sessionData: any) => {
    const response = await api.post('/interview-questions/save-session', sessionData);
    return response.data;
  },
  getUserSessions: async () => {
    const response = await api.get('/interview-questions/user-sessions');
    return response.data;
  },
};

// Project Documentation API
export const projectDocumentationAPI = {
  generateDocumentation: async (params: any) => {
    const response = await api.post('/project-documentation/generate', params);
    return response.data;
  },
  saveDocumentation: async (docData: any) => {
    const response = await api.post('/project-documentation/save', docData);
    return response.data;
  },
  getUserDocumentations: async () => {
    const response = await api.get('/project-documentation/user-docs');
    return response.data;
  },
};

// SOP Letter Generator API
export const sopLetterAPI = {
  generateLetter: async (params: any) => {
    const response = await api.post('/sop-letter-generator/generate', params);
    return response.data;
  },
  saveLetter: async (letterData: any) => {
    const response = await api.post('/sop-letter-generator/save', letterData);
    return response.data;
  },
  getUserLetters: async () => {
    const response = await api.get('/sop-letter-generator/user-letters');
    return response.data;
  },
};

// Generic AI content generation helper (mock for now until backend is set up)
export const generateContent = async (prompt: string): Promise<string> => {
  // This is a placeholder that will be replaced with actual API call
  // For now, return a mock response
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
  
  return `This is a mock response. Once you set up your backend API, this function will call your actual AI service with the prompt:\n\n"${prompt}"\n\nPlease integrate with your preferred AI service (OpenAI, Anthropic, etc.) in your backend.`;
};

export default api;
