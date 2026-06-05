import axios from 'axios';
import { Project, Post, Comment, Quiz } from './mockData';


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
});

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProject = async (id: string): Promise<Project> => {
  const response = await api.get('/projects/' + id);
  return response.data;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await api.get('/posts/' + id);
  return response.data;
};

export const getComments = async (targetType: string, targetId: string): Promise<Comment[]> => {
  const response = await api.get('/comments?targetType=' + targetType + '&targetId=' + targetId);
  return response.data;
};

export const postComment = async (comment: Partial<Comment>): Promise<Comment> => {
  const response = await api.post('/comments', comment);
  return response.data;
};

export const recordInteraction = async (
  targetType: 'project' | 'post',
  targetId: string,
  userId: string,
  action: 'like' | 'view'
): Promise<{ success: boolean; count?: number; message?: string }> => {
  const response = await api.post('/interactions', { targetType, targetId, userId, action });
  return response.data;
};

export const getQuizzes = async (): Promise<Quiz[]> => {
  const response = await api.get('/quizzes');
  return response.data;
};

export const getQuiz = async (id: string): Promise<Quiz> => {
  const response = await api.get('/quizzes/' + id);
  return response.data;
};

export const sendContact = async (name: string, email: string, message: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.post('/contact', { name, email, message });
  return response.data;
};

// --- User Auth ---
export const registerUser = async (name: string, email: string, password: string): Promise<any> => {
  const response = await api.post('/users/register', { name, email, password });
  return response.data;
};

export const loginUserApi = async (email: string, password: string): Promise<any> => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const oauthLoginApi = async (name: string, email: string, provider: string): Promise<any> => {
  const response = await api.post('/users/oauth', { name, email, provider });
  return response.data;
};

export const githubLoginApi = async (code: string): Promise<any> => {
  const response = await api.post('/users/oauth/github', { code });
  return response.data;
};

export const submitGameScoreApi = async (userId: string, quizId: string, score: number, completed: boolean): Promise<any> => {
  const response = await api.post('/games/score', { userId, quizId, score, completed });
  return response.data;
};

export const getGameScoresApi = async (userId: string): Promise<any> => {
  const response = await api.get(`/games/scores/${userId}`);
  return response.data;
};
