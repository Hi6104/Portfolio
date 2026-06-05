require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { dbPromise, setupDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

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
  } catch (e) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// INTERACTIONS (Likes & Views)
// =======================
app.post('/api/interactions', async (req, res) => {
  const { targetType, targetId, userId, action } = req.body;
  if (!targetType || !targetId || !userId || !action) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const db = await dbPromise;
    // Insert interaction (will fail if duplicate due to UNIQUE constraint)
    await db.run(
      'INSERT INTO interactions (targetType, targetId, userId, action) VALUES (?, ?, ?, ?)',
      [targetType, targetId, userId, action]
    );

    // If successful, increment the respective count
    const table = targetType === 'project' ? 'projects' : 'posts';
    const column = action === 'like' ? 'likes' : 'views';

    // Update count in the parent table
    await db.run(`UPDATE ${table} SET ${column} = ${column} + 1 WHERE id = ?`, [targetId]);

    const updated = await db.get(`SELECT ${column} FROM ${table} WHERE id = ?`, [targetId]);
    return res.json({ success: true, count: updated[column] });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      return res.status(200).json({ success: true, message: 'Already recorded' });
    }
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
  } catch (err) {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// USERS
// =======================
app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  try {
    const db = await dbPromise;
    const existing = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    const id = 'u' + Date.now();
    await db.run(
      'INSERT INTO users (id, name, email, role, authProvider, password) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, email, 'user', 'local', password] // Note: In a real app, hash the password!
    );
    const newUser = await db.get('SELECT id, name, email, role, authProvider FROM users WHERE id = ?', [id]);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const db = await dbPromise;

    // Check for hardcoded admin first (since it's an admin bypass)
    if (email === 'admin@fluxfolio.dev' && password === 'admin123') {
      return res.json({ id: 'admin1', name: 'Felix De', email, role: 'admin', authProvider: 'local' });
    }

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (user.password !== password) { // Note: In a real app, compare hashes!
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, authProvider: user.authProvider };
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/oauth', async (req, res) => {
  const { name, email, provider } = req.body;
  if (!name || !email || !provider) {
    return res.status(400).json({ error: 'Name, email, and provider are required' });
  }
  try {
    const db = await dbPromise;
    let user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      // Create new user if they don't exist
      const id = 'u' + Date.now();
      await db.run(
        'INSERT INTO users (id, name, email, role, authProvider) VALUES (?, ?, ?, ?, ?)',
        [id, name, email, 'user', provider]
      );
      user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    } else {
      // If user exists but used a different provider, update it or just let them in
      if (user.authProvider !== provider) {
        await db.run('UPDATE users SET authProvider = ? WHERE id = ?', [provider, user.id]);
        user.authProvider = provider;
      }
    }

    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, authProvider: user.authProvider };
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/users/oauth/github', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code is required' });

  try {
    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || 'Failed to get access token from GitHub' });
    }

    const accessToken = tokenData.access_token;

    // 2. Fetch user profile
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await userResponse.json();

    // 3. Fetch user emails (GitHub hides primary email sometimes)
    let email = userData.email;
    if (!email) {
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const emails = await emailResponse.json();
      const primaryEmail = emails.find(e => e.primary) || emails[0];
      email = primaryEmail?.email;
    }

    if (!email) {
      return res.status(400).json({ error: 'Could not retrieve email from GitHub' });
    }

    const name = userData.name || userData.login;

    // 4. Register or login user in our DB
    const db = await dbPromise;
    let user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      const id = 'u' + Date.now();
      await db.run(
        'INSERT INTO users (id, name, email, role, authProvider) VALUES (?, ?, ?, ?, ?)',
        [id, name, email, 'user', 'github']
      );
      user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    } else if (user.authProvider !== 'github') {
      await db.run('UPDATE users SET authProvider = ? WHERE id = ?', ['github', user.id]);
      user.authProvider = 'github';
    }

    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, authProvider: user.authProvider };
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =======================
// GAMES / SCORES
// =======================
app.post('/api/games/score', async (req, res) => {
  const { userId, quizId, score, completed } = req.body;
  if (!userId || !quizId) {
    return res.status(400).json({ error: 'userId and quizId are required' });
  }

  try {
    const db = await dbPromise;
    const existing = await db.get('SELECT * FROM quiz_scores WHERE userId = ? AND quizId = ?', [userId, quizId]);

    if (existing) {
      await db.run(
        'UPDATE quiz_scores SET score = ?, completed = ? WHERE userId = ? AND quizId = ?',
        [score, completed, userId, quizId]
      );
      res.json({ message: 'Score updated successfully' });
    } else {
      const id = 'qs_' + Date.now();
      await db.run(
        'INSERT INTO quiz_scores (id, userId, quizId, score, completed) VALUES (?, ?, ?, ?, ?)',
        [id, userId, quizId, score, completed]
      );
      res.status(201).json({ message: 'Score saved successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/games/scores/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const db = await dbPromise;
    const scores = await db.all('SELECT * FROM quiz_scores WHERE userId = ?', [userId]);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =======================
// CONTACT / EMAIL
// =======================
app.post('/api/contact', async (req, res) => {
  console.log(req.body)
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: '"Portfolio Contact" <' + process.env.GMAIL_USER + '>',
      to: 'hvishwakarma821@gmail.com',
      replyTo: email,
      subject: 'New Contact Message from ' + name,
      html: '<h2>New message from your portfolio contact form</h2>' +
        '<p><strong>Name:</strong> ' + name + '</p>' +
        '<p><strong>Email:</strong> <a href="mailto:' + email + '">' + email + '</a></p>' +
        '<p><strong>Message:</strong></p>' +
        '<p style="white-space:pre-wrap;">' + message + '</p>'
    });

    res.json({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log("Backend server running on http://localhost:" + PORT);
});
