import axios from 'axios';
import { Project, Post, Comment, Quiz } from './mockData';


export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
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

export const getQuizzes = async (): Promise<Quiz[]> => {
  const response = await api.get('/quizzes');
  return response.data;
};

export const getQuiz = async (id: string): Promise<Quiz> => {
  const response = await api.get('/quizzes/' + id);
  return response.data;
};
