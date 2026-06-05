'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Post, Comment, Quiz, mockProjects, mockPosts, mockComments, mockQuizzes } from '../data/mockData';
import { getProjects, getPosts, getComments as fetchComments, getQuizzes, postComment as apiPostComment, submitGameScoreApi, getGameScoresApi, recordInteraction } from '../data/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  authProvider: string;
}

interface AppContextType {
  projects: Project[];
  posts: Post[];
  comments: Comment[];
  quizzes: Quiz[];
  currentUser: User | null;
  isAdmin: boolean;
  theme: 'dark' | 'light';
  quizProgress: Record<string, { completed: boolean; score: number }>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleTheme: () => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  loginAdmin: () => boolean; // Keeping for legacy
  logoutAdmin: () => void; // Keeping for legacy
  
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [quizProgress, setQuizProgress] = useState<Record<string, { completed: boolean; score: number }>>({});
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
    const localUser = localStorage.getItem('flux_current_user');
    const localTheme = localStorage.getItem('flux_theme');
    const localProgress = localStorage.getItem('flux_quiz_progress');

    if (localIsAdmin === 'true') setIsAdmin(true);
    if (localUser) {
      try {
        const user = JSON.parse(localUser);
        setCurrentUser(user);
        if (user.role === 'admin') setIsAdmin(true);
      } catch (e) {}
    }

    if (localTheme) {
      setTheme(localTheme as 'dark' | 'light');
      document.documentElement.classList.toggle('dark', localTheme === 'dark');
      document.documentElement.classList.toggle('light', localTheme === 'light');
    } else {
      document.documentElement.classList.add('dark');
    }

    if (localProgress) setQuizProgress(JSON.parse(localProgress));
  }, []);

  // Sync scores with backend when user logs in
  useEffect(() => {
    if (!currentUser) return;
    
    const syncScores = async () => {
      try {
        const dbScores = await getGameScoresApi(currentUser.id);
        
        // Use functional state update to always get latest quizProgress
        setQuizProgress(prevProgress => {
          const newProgress = { ...prevProgress };
          let madeChanges = false;

          // Merge DB scores into local
          dbScores.forEach((row: any) => {
            const quizId = row.quizId;
            
            if (!newProgress[quizId] || newProgress[quizId].score < row.score) {
              newProgress[quizId] = {
                completed: row.completed === 1 || row.completed === true,
                score: row.score
              };
              madeChanges = true;
            }
          });

          if (madeChanges) {
            saveToLocal('flux_quiz_progress', newProgress);
          }
          
          // Background sync of local-only scores up to DB
          for (const [quizId, localData] of Object.entries(prevProgress)) {
            const dbRow = dbScores.find((r: any) => r.quizId === quizId);
            if (!dbRow || dbRow.score < localData.score) {
              submitGameScoreApi(
                currentUser.id, 
                quizId, 
                localData.score, 
                localData.completed
              ).catch(e => console.error(e));
            }
          }

          return madeChanges ? newProgress : prevProgress;
        });
      } catch (err) {
        console.error('Failed to sync game scores', err);
      }
    };
    
    syncScores();
  }, [currentUser]);

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

  const loginUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('flux_current_user', JSON.stringify(user));
    if (user.role === 'admin') {
      setIsAdmin(true);
      localStorage.setItem('flux_is_admin', 'true');
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('flux_current_user');
    localStorage.setItem('flux_is_admin', 'false');
    // Clear local quiz progress so it doesn't bleed into the next user's session
    localStorage.removeItem('flux_quiz_progress');
    setQuizProgress({});
  };

  // Keeping these for legacy compat
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

  const getVisitorId = () => {
    let vid = localStorage.getItem('flux_visitor_id');
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('flux_visitor_id', vid);
    }
    return vid;
  };

  const likeProject = async (id: string) => {
    const userId = currentUser?.id || getVisitorId();
    try {
      const res = await recordInteraction('project', id, userId, 'like');
      if (res.success && res.count !== undefined) {
        const updated = projects.map(p => p.id === id ? { ...p, likes: res.count! } : p);
        setProjects(updated);
        saveToLocal('flux_projects', updated);
      }
    } catch(err) { console.error('Failed to like project', err); }
  };

  const incrementProjectViews = async (id: string) => {
    const userId = currentUser?.id || getVisitorId();
    try {
      const res = await recordInteraction('project', id, userId, 'view');
      if (res.success && res.count !== undefined) {
        const updated = projects.map(p => p.id === id ? { ...p, views: res.count! } : p);
        setProjects(updated);
        saveToLocal('flux_projects', updated);
      }
    } catch(err) { console.error('Failed to view project', err); }
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

  const likePost = async (id: string) => {
    const userId = currentUser?.id || getVisitorId();
    try {
      const res = await recordInteraction('post', id, userId, 'like');
      if (res.success && res.count !== undefined) {
        const updated = posts.map(p => p.id === id ? { ...p, likes: res.count! } : p);
        setPosts(updated);
        saveToLocal('flux_posts', updated);
      }
    } catch(err) { console.error('Failed to like post', err); }
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
  const submitQuizScore = async (quizId: string, score: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const newProgress = {
      ...quizProgress,
      [quizId]: {
        completed: true,
        score
      }
    };
    
    setQuizProgress(newProgress);
    saveToLocal('flux_quiz_progress', newProgress);

    if (currentUser) {
      try {
        await submitGameScoreApi(currentUser.id, quizId, score, true);
      } catch (err) {
        console.error('Failed to save score to database', err);
      }
    }
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
        currentUser,
        isAdmin,
        theme,
        quizProgress,
        searchQuery,
        setSearchQuery,
        toggleTheme,
        loginUser,
        logoutUser,
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
