const express = require('express');
const cors = require('cors');
const { dbPromise, setupDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize DB before starting server
setupDatabase().then(() => {
  console.log("Database ready");
}).catch(err => {
  console.error("Failed to initialize database", err);
});

// Helper function to parse JSON arrays from DB (like techStack, tags)
const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch(e) {
    return [];
  }
};

// =======================
// PROJECTS
// =======================
app.get('/api/projects', async (req, res) => {
  try {
    const db = await dbPromise;
    const projects = await db.all('SELECT * FROM projects');
    const formatted = projects.map(p => ({
      ...p,
      isFeatured: Boolean(p.isFeatured),
      techStack: parseJSON(p.techStack),
      gallery: parseJSON(p.gallery),
      metrics: parseJSON(p.metrics)
    }));
    res.json(formatted);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    // We try to match by id or slug
    const project = await db.get('SELECT * FROM projects WHERE id = ? OR slug = ?', [req.params.id, req.params.id]);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    
    res.json({
      ...project,
      isFeatured: Boolean(project.isFeatured),
      techStack: parseJSON(project.techStack),
      gallery: parseJSON(project.gallery),
      metrics: parseJSON(project.metrics)
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// POSTS
// =======================
app.get('/api/posts', async (req, res) => {
  try {
    const db = await dbPromise;
    const posts = await db.all('SELECT * FROM posts');
    const formatted = posts.map(p => ({
      ...p,
      isPublished: Boolean(p.isPublished),
      isTrending: Boolean(p.isTrending),
      tags: parseJSON(p.tags)
    }));
    res.json(formatted);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const post = await db.get('SELECT * FROM posts WHERE id = ? OR slug = ?', [req.params.id, req.params.id]);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    res.json({
      ...post,
      isPublished: Boolean(post.isPublished),
      isTrending: Boolean(post.isTrending),
      tags: parseJSON(post.tags)
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// COMMENTS
// =======================
app.get('/api/comments', async (req, res) => {
  const { targetType, targetId } = req.query;
  try {
    const db = await dbPromise;
    let query = 'SELECT * FROM comments';
    let params = [];
    if (targetType && targetId) {
      query += ' WHERE targetType = ? AND targetId = ?';
      params.push(targetType, targetId);
    }
    const comments = await db.all(query, params);
    const formatted = comments.map(c => ({
      ...c,
      isApproved: Boolean(c.isApproved),
      isFlagged: Boolean(c.isFlagged)
    }));
    res.json(formatted);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/comments', async (req, res) => {
  const { targetType, targetId, authorName, authorEmail, content } = req.body;
  if (!targetType || !targetId || !authorName || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const db = await dbPromise;
    const id = 'c' + Date.now();
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    await db.run(
      'INSERT INTO comments (id, targetType, targetId, authorName, authorEmail, content, date, isApproved, isFlagged) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, targetType, targetId, authorName, authorEmail, content, date, true, false]
    );
    
    // Also update commentsCount on post if applicable
    if (targetType === 'post') {
      await db.run('UPDATE posts SET commentsCount = commentsCount + 1 WHERE id = ?', [targetId]);
    }
    
    const newComment = await db.get('SELECT * FROM comments WHERE id = ?', [id]);
    res.status(201).json({
      ...newComment,
      isApproved: Boolean(newComment.isApproved),
      isFlagged: Boolean(newComment.isFlagged)
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// QUIZZES
// =======================
app.get('/api/quizzes', async (req, res) => {
  try {
    const db = await dbPromise;
    const quizzes = await db.all('SELECT * FROM quizzes');
    const questions = await db.all('SELECT * FROM quiz_questions');
    
    const formatted = quizzes.map(q => {
      const qQuestions = questions.filter(qq => qq.quizId === q.id).map(qq => ({
        ...qq,
        options: parseJSON(qq.options)
      }));
      return {
        ...q,
        tags: parseJSON(q.tags),
        questions: qQuestions
      };
    });
    
    res.json(formatted);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const quiz = await db.get('SELECT * FROM quizzes WHERE id = ?', [req.params.id]);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    const questions = await db.all('SELECT * FROM quiz_questions WHERE quizId = ?', [quiz.id]);
    const formattedQuestions = questions.map(qq => ({
      ...qq,
      options: parseJSON(qq.options)
    }));
    
    res.json({
      ...quiz,
      tags: parseJSON(quiz.tags),
      questions: formattedQuestions
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Backend server running on http://localhost:" + PORT);
});
