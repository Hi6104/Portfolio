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
  `);

  console.log("Database and tables initialized.");
  return db;
}

module.exports = {
  dbPromise,
  setupDatabase
};
