const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const dbPromise = open({
  filename: path.join(__dirname, 'database.sqlite'),
  driver: sqlite3.Database
});

async function setupDatabase() {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      subtitle TEXT,
      description TEXT,
      problem TEXT,
      approach TEXT,
      solution TEXT,
      codeSnippet TEXT,
      codeLanguage TEXT,
      role TEXT,
      timeline TEXT,
      image TEXT,
      likes INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      isFeatured BOOLEAN,
      liveUrl TEXT,
      repoUrl TEXT,
      techStack TEXT,
      gallery TEXT,
      metrics TEXT
    );

    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      subtitle TEXT,
      author TEXT,
      authorAvatar TEXT,
      date TEXT,
      readTime TEXT,
      category TEXT,
      content TEXT,
      image TEXT,
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      commentsCount INTEGER DEFAULT 0,
      isPublished BOOLEAN,
      isTrending BOOLEAN,
      seoTitle TEXT,
      seoDescription TEXT,
      tags TEXT
    );

    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      targetType TEXT,
      targetId TEXT,
      authorName TEXT,
      authorEmail TEXT,
      content TEXT,
      date TEXT,
      isApproved BOOLEAN,
      isFlagged BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS quizzes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      difficulty TEXT,
      timeLimit TEXT,
      questionsCount INTEGER,
      tags TEXT
    );

    CREATE TABLE IF NOT EXISTS quiz_questions (
      id TEXT PRIMARY KEY,
      quizId TEXT,
      text TEXT,
      codeSnippet TEXT,
      codeLanguage TEXT,
      options TEXT,
      correctOptionIndex INTEGER,
      explanation TEXT,
      FOREIGN KEY (quizId) REFERENCES quizzes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT DEFAULT 'user',
      authProvider TEXT DEFAULT 'local',
      password TEXT
    );

    CREATE TABLE IF NOT EXISTS quiz_scores (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      quizId TEXT NOT NULL,
      score INTEGER,
      completed BOOLEAN,
      badgesEarned TEXT,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (quizId) REFERENCES quizzes(id) ON DELETE CASCADE,
      UNIQUE (userId, quizId)
    );

    CREATE TABLE IF NOT EXISTS interactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      targetType TEXT NOT NULL,
      targetId TEXT NOT NULL,
      userId TEXT NOT NULL,
      action TEXT NOT NULL,
      UNIQUE (targetType, targetId, userId, action)
    );
  `);

  console.log("Database and tables initialized.");
  return db;
}

module.exports = {
  dbPromise,
  setupDatabase
};
