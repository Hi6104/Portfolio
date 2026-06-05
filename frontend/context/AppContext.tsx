'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Post, Comment, Quiz, mockProjects, mockPosts, mockComments, mockQuizzes } from '../data/mockData';
import { getProjects, getPosts, getComments as fetchComments, getQuizzes, postComment as apiPostComment } from '../data/api';

interface AppContextType {
  projects: Project[];
  posts: Post[];
  comments: Comment[];
  quizzes: Quiz[];
  isAdmin: boolean;
  theme: 'dark' | 'light';
  quizProgress: Record<string, { completed: boolean; score: number; badgesEarned: string[] }>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleTheme: () => void;
  loginAdmin: () => boolean;
  logoutAdmin: () => void;
  
  // Project Actions
  addProject: (project: Omit<Project, 'likes' | 'views'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  likeProject: (id: string) => void;
  incrementProjectViews: (id: string) => void;

  // Blog/Doc Actions
  addPost: (post: Omit<Post, 'likes' | 'commentsCount'>) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  likePost: (id: string) => void;

  // Comment Actions
  addComment: (targetType: 'project' | 'post', targetId: string, authorName: string, authorEmail: string, content: string) => void;
  approveComment: (id: string) => void;
  flagComment: (id: string) => void;
  deleteComment: (id: string) => void;

  // Quiz Actions
  submitQuizScore: (quizId: string, score: number) => void;
  addOrUpdateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;

  // Seeding Tool
  seedDemoData: (
    categories: { projects: boolean; posts: boolean; quizzes: boolean },
    onStepChange: (progress: number, step: string, isDone: boolean) => void,
    onComplete: () => void
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [quizProgress, setQuizProgress] = useState<Record<string, { completed: boolean; score: number; badgesEarned: string[] }>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Handle mounting to avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
    
    // Fetch data from Express API
    const loadApiData = async () => {
      try {
        const [apiProjects, apiPosts, apiComments, apiQuizzes] = await Promise.all([
          getProjects(),
          getPosts(),
          fetchComments('', ''),
          getQuizzes()
        ]);
        setProjects(apiProjects);
        setPosts(apiPosts);
        setComments(apiComments);
        setQuizzes(apiQuizzes);
      } catch (err) {
        console.error("Failed to load initial data from API", err);
      }
    };

    loadApiData();

    const localIsAdmin = localStorage.getItem('flux_is_admin');
    const localTheme = localStorage.getItem('flux_theme');
    const localProgress = localStorage.getItem('flux_quiz_progress');

    if (localIsAdmin === 'true') setIsAdmin(true);
    if (localTheme) {
      setTheme(localTheme as 'dark' | 'light');
      document.documentElement.classList.toggle('light', localTheme === 'light');
    } else {
      document.documentElement.classList.add('dark');
    }

    if (localProgress) setQuizProgress(JSON.parse(localProgress));
  }, []);

  // Save actions to local storage
  const saveToLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('flux_theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  const loginAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem('flux_is_admin', 'true');
    return true;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.setItem('flux_is_admin', 'false');
  };

  // --- Project Actions ---
  const addProject = (project: Omit<Project, 'likes' | 'views'>) => {
    const newProject: Project = { ...project, likes: 0, views: 0 };
    const updated = [newProject, ...projects];
    setProjects(updated);
    saveToLocal('flux_projects', updated);
  };

  const updateProject = (updatedProj: Project) => {
    const updated = projects.map(p => p.id === updatedProj.id ? updatedProj : p);
    setProjects(updated);
    saveToLocal('flux_projects', updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    saveToLocal('flux_projects', updated);
  };

  const likeProject = (id: string) => {
    const updated = projects.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
    setProjects(updated);
    saveToLocal('flux_projects', updated);
  };

  const incrementProjectViews = (id: string) => {
    const updated = projects.map(p => p.id === id ? { ...p, views: p.views + 1 } : p);
    setProjects(updated);
    saveToLocal('flux_projects', updated);
  };

  // --- Post Actions ---
  const addPost = (post: Omit<Post, 'likes' | 'commentsCount'>) => {
    const newPost: Post = { ...post, likes: 0, commentsCount: 0 };
    const updated = [newPost, ...posts];
    setPosts(updated);
    saveToLocal('flux_posts', updated);
  };

  const updatePost = (updatedPost: Post) => {
    const updated = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
    setPosts(updated);
    saveToLocal('flux_posts', updated);
  };

  const deletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    saveToLocal('flux_posts', updated);
  };

  const likePost = (id: string) => {
    const updated = posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
    setPosts(updated);
    saveToLocal('flux_posts', updated);
  };

  // --- Comment Actions ---
  const addComment = async (targetType: 'project' | 'post', targetId: string, authorName: string, authorEmail: string, content: string) => {
    try {
      const newComment = await apiPostComment({ targetType, targetId, authorName, authorEmail, content });
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      
      // Update comment counts on post if target is post
      if (targetType === 'post') {
        const updatedPosts = posts.map(p => p.id === targetId ? { ...p, commentsCount: p.commentsCount + 1 } : p);
        setPosts(updatedPosts);
      }
    } catch(err) {
      console.error("Failed to post comment to API", err);
    }
  };

  const approveComment = (id: string) => {
    const updated = comments.map(c => c.id === id ? { ...c, isApproved: true, isFlagged: false } : c);
    setComments(updated);
    saveToLocal('flux_comments', updated);
  };

  const flagComment = (id: string) => {
    const updated = comments.map(c => c.id === id ? { ...c, isFlagged: true, isApproved: false } : c);
    setComments(updated);
    saveToLocal('flux_comments', updated);
  };

  const deleteComment = (id: string) => {
    const commentToDelete = comments.find(c => c.id === id);
    const updated = comments.filter(c => c.id !== id);
    setComments(updated);
    saveToLocal('flux_comments', updated);

    // Update comment counts on post if target was post
    if (commentToDelete && commentToDelete.targetType === 'post') {
      const updatedPosts = posts.map(p => p.id === commentToDelete.targetId ? { ...p, commentsCount: Math.max(0, p.commentsCount - 1) } : p);
      setPosts(updatedPosts);
      saveToLocal('flux_posts', updatedPosts);
    }
  };

  // --- Quiz Actions ---
  const submitQuizScore = (quizId: string, score: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;
    
    const percentage = (score / quiz.questionsCount) * 100;
    const badgeName = percentage === 100 ? `${quiz.title} Expert` : percentage >= 70 ? `${quiz.title} Intermediate` : '';
    
    const newProgress = {
      ...quizProgress,
      [quizId]: {
        completed: true,
        score,
        badgesEarned: badgeName 
          ? Array.from(new Set([...(quizProgress[quizId]?.badgesEarned || []), badgeName]))
          : (quizProgress[quizId]?.badgesEarned || [])
      }
    };
    setQuizProgress(newProgress);
    saveToLocal('flux_quiz_progress', newProgress);
  };

  const addOrUpdateQuiz = (quiz: Quiz) => {
    const exists = quizzes.some(q => q.id === quiz.id);
    let updated;
    if (exists) {
      updated = quizzes.map(q => q.id === quiz.id ? quiz : q);
    } else {
      updated = [quiz, ...quizzes];
    }
    setQuizzes(updated);
    saveToLocal('flux_quizzes', updated);
  };

  const deleteQuiz = (id: string) => {
    const updated = quizzes.filter(q => q.id !== id);
    setQuizzes(updated);
    saveToLocal('flux_quizzes', updated);
  };

  // --- Demo Seeding Wizard Animation ---
  const seedDemoData = (
    categories: { projects: boolean; posts: boolean; quizzes: boolean },
    onStepChange: (progress: number, step: string, isDone: boolean) => void,
    onComplete: () => void
  ) => {
    let currentProgress = 0;
    
    const steps = [
      { max: 25, label: 'Fetching Remote Assets' },
      { max: 55, label: 'Parsing Project JSON' },
      { max: 85, label: 'Optimizing Media Content' },
      { max: 100, label: 'Finalizing Database Migration' }
    ];

    let currentStepIdx = 0;

    const interval = setInterval(() => {
      currentProgress += 5;
      
      const currentStep = steps[currentStepIdx];
      if (currentProgress >= currentStep.max) {
        if (currentStepIdx < steps.length - 1) {
          currentStepIdx++;
        }
      }

      onStepChange(
        currentProgress,
        steps[currentStepIdx].label,
        currentProgress >= 100
      );

      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Execute seeding operation
        if (categories.projects) {
          setProjects(mockProjects);
          saveToLocal('flux_projects', mockProjects);
        }
        if (categories.posts) {
          setPosts(mockPosts);
          saveToLocal('flux_posts', mockPosts);
        }
        if (categories.quizzes) {
          setQuizzes(mockQuizzes);
          saveToLocal('flux_quizzes', mockQuizzes);
        }

        // Reset comments too
        setComments(mockComments);
        saveToLocal('flux_comments', mockComments);

        onComplete();
      }
    }, 150);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        posts,
        comments,
        quizzes,
        isAdmin,
        theme,
        quizProgress,
        searchQuery,
        setSearchQuery,
        toggleTheme,
        loginAdmin,
        logoutAdmin,
        addProject,
        updateProject,
        deleteProject,
        likeProject,
        incrementProjectViews,
        addPost,
        updatePost,
        deletePost,
        likePost,
        addComment,
        approveComment,
        flagComment,
        deleteComment,
        submitQuizScore,
        addOrUpdateQuiz,
        deleteQuiz,
        seedDemoData
      }}
    >
      {mounted && children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
