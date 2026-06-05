const { dbPromise, setupDatabase } = require('./database');

const mockProjects = [
  {
    id: 'okuru',
    title: 'Okuru - Digital Gift Card Platform',
    slug: 'okuru-digital-gift-card-platform',
    subtitle: 'Admin and Partner portals for a scalable digital gift card ecosystem.',
    description: 'Developed the frontend for the Admin and Partner portals of Okuru, a digital gift card platform. The system empowers partners to seamlessly create and manage gift cards that consumers can purchase, gift, or redeem in-store.',
    problem: 'Managing a multi-tenant gift card ecosystem requires secure, granular control over country/currency configurations, complex promotional logic, and restricted administrative access.',
    approach: 'Leveraged Next.js and TypeScript for a robust, type-safe frontend architecture, integrated with Firebase for secure, real-time authentication workflows.',
    solution: 'Built a full Role-Based Access Control (RBAC) system allowing Super Admins to define permission groups (CRUD). Implemented key configuration suites for global settings, affiliate/referral limits, and dynamic purchase discount codes.',
    codeSnippet: `// Example RBAC Permission Check
export function hasPermission(userRoles: string[], requiredPermission: string): boolean {
  return userRoles.some(role => permissions[role]?.includes(requiredPermission));
}`,
    codeLanguage: 'TypeScript',
    role: 'Frontend Engineer',
    timeline: 'Completed',
    techStack: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
    ],
    metrics: [
      'Successfully deployed robust Role-Based Access Control (RBAC) for Super Admins.',
      'Secured administration dashboard using Firebase Authentication.',
      'Streamlined global expansion with multi-currency and country configuration panels.'
    ],
    likes: 0,
    views: 0,
    isFeatured: true,
    liveUrl: '',
    repoUrl: ''
  },
  {
    id: 'knowband',
    title: 'Knowband E-Commerce Modules & AI Tools',
    slug: 'knowband-ecommerce-modules-ai-tools',
    subtitle: 'Designing high-conversion e-commerce plugins and AI integrations for global platforms.',
    description: 'Developed and enhanced multiple high-traffic e-commerce modules for OpenCart and PrestaShop to boost store functionality and conversions. Built marketplace integrations for eBay, Etsy, and Google Shopping, alongside developing advanced tools like Store Locator, Affiliate Programs, Shipping Timers, and Supercheckout. Also implemented cutting-edge AI utilities including a Content Generator, LLM TXT Generator, and an interactive chatbot.',
    problem: 'E-commerce store owners lacked seamless integrations with global marketplaces and modern AI-driven engagement tools to increase customer retention and sales conversion.',
    approach: 'Utilized PHP (MVC architecture) paired with standard web technologies to build native OpenCart/PrestaShop extensions. Integrated a Qdrant vector database to power fast, context-aware AI interactions.',
    solution: 'Successfully rolled out automated extensions like Supercheckout and Automatic Related Products. Provided robust technical support and custom code builds for global enterprise clients.',
    codeSnippet: `<?php
// Traditional PHP MVC Controller pattern for module initialization
class ControllerExtensionModuleKnowband extends Controller {
    public function index() {
        $this->load->language('extension/module/knowband');
        // AI Vector Search / Module Config logic here
    }
}`,
    codeLanguage: 'PHP',
    role: 'Full Stack Engineer',
    timeline: '1+ Year (Nov 2024 - March 2026)',
    techStack: ['PHP (MVC)', 'HTML5', 'CSS3', 'JavaScript', 'Qdrant Vector DB'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
    ],
    metrics: [
      'Shipped extensions natively supporting eBay, Etsy, and Google Shopping.',
      'Integrated cutting-edge LLM TXT Generation and Content Tools natively into CMS platforms.',
      'Optimized conversion metrics via customized Supercheckout & dynamic timers.'
    ],
    likes: 0,
    views: 0,
    isFeatured: true,
    liveUrl: 'https://www.knowband.com/',
    repoUrl: ''
  },
  {
    id: 'fit-init',
    title: 'Fit-Init | Smart AI Self-Defence & Yoga Trainer',
    slug: 'fit-init-smart-ai-self-defence-yoga-trainer',
    subtitle: 'Real-time Computer Vision wellness platform for posture correction.',
    description: 'Developed a full-stack AI-driven wellness platform designed to provide real-time pose tracking, joint analysis, and visual correction for users practicing self-defence routines and yoga postures.',
    problem: 'Without live instruction, remote fitness users struggle to know if their form is correct, which can lead to injury or ineffective training.',
    approach: 'Engineered a computer vision pipeline using MediaPipe and TensorFlow Hub to extract skeletal coordinates from live video, passing telemetry to a lightweight Python Flask backend.',
    solution: 'Implemented complex geometric joint-angle analysis logic to flag incorrect alignments immediately, delivering real-time corrections via a high-performance streaming REST API.',
    codeSnippet: `# Angle calculation snippet for skeleton tracking
import cv2
import mediapipe as mp

def calculate_angle(a, b, c):
    # Vector math logic to calculate real-time joint positions
    pass`,
    codeLanguage: 'Python',
    role: 'Full Stack AI Engineer',
    timeline: 'Completed',
    techStack: ['Python', 'Flask', 'MediaPipe', 'TensorFlow Hub', 'REST API'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    metrics: [
      '90-95% accuracy rate achieved in live posture detection and joint-angle correction.',
      'Established high-speed performance telemetry via real-time REST APIs.',
      'Successfully deployed scalable Deep Learning modules using TensorFlow Hub.'
    ],
    likes: 0,
    views: 0,
    isFeatured: false,
    liveUrl: '',
    repoUrl: ''
  }
];

const mockPosts = [
  {
    id: 'mastering-glassmorphism',
    title: 'Mastering Glassmorphism in Modern Web Design',
    slug: 'mastering-glassmorphism',
    subtitle: 'Learn how to implement beautiful, high-performance glass effects with standard CSS variables.',
    author: 'Alex Rivera',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: 'Oct 24, 2024',
    readTime: '6 min read',
    category: 'blog',
    tags: ['Engineering', 'Design', 'CSS'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    likes: 124,
    commentsCount: 12,
    isPublished: true,
    isTrending: true,
    seoTitle: 'Mastering CSS Glassmorphism - Frontend Guides',
    seoDescription: 'A deep-dive tutorial into building rich glassmorphic cards.',
    content: '<p class="lead">Glassmorphism is more than just a trend; it is a structural approach to depth and hierarchy in digital interfaces.</p>'
  }
];

const mockComments = [
  {
    id: 'c1',
    targetType: 'post',
    targetId: 'mastering-glassmorphism',
    authorName: 'Sarah Chen',
    authorEmail: 'sarah@designops.co',
    content: 'This is exactly what I was looking for.',
    date: 'Oct 24, 2024',
    isApproved: true,
    isFlagged: false
  }
];

const mockQuizzes = [
  {
    id: 'react-hooks',
    title: 'React Hooks',
    description: 'Master useEffect, useMemo, and the art of performance in React.',
    difficulty: 'Intermediate',
    timeLimit: '8 min',
    questionsCount: 3,
    tags: ['React', 'Hooks', 'Performance'],
    questions: [
      {
        id: 'rh1',
        text: 'What happens if you return a function from the effect callback in useEffect?',
        options: [
          'It triggers an infinite re-render loop.',
          'It is executed when the component unmounts.',
          'It caches the returned value.',
          'It immediately re-evaluates DOM.'
        ],
        correctOptionIndex: 1,
        explanation: 'The function returned from a useEffect hook is the cleanup function.'
      }
    ]
  }
];

async function seedData() {
  const db = await setupDatabase();

  // Clear existing
  await db.exec('DELETE FROM projects; DELETE FROM posts; DELETE FROM comments; DELETE FROM quizzes; DELETE FROM quiz_questions;');

  for (const p of mockProjects) {
    await db.run(
      "INSERT INTO projects (id, title, slug, subtitle, description, problem, approach, solution, codeSnippet, codeLanguage, role, timeline, image, likes, views, isFeatured, liveUrl, repoUrl, techStack, gallery, metrics) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [p.id, p.title, p.slug, p.subtitle, p.description, p.problem, p.approach, p.solution, p.codeSnippet, p.codeLanguage, p.role, p.timeline, p.image, p.likes, p.views, p.isFeatured, p.liveUrl, p.repoUrl, JSON.stringify(p.techStack), JSON.stringify(p.gallery), JSON.stringify(p.metrics)]
    );
  }

  for (const p of mockPosts) {
    await db.run(
      "INSERT INTO posts (id, title, slug, subtitle, author, authorAvatar, date, readTime, category, content, image, likes, commentsCount, isPublished, isTrending, seoTitle, seoDescription, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [p.id, p.title, p.slug, p.subtitle, p.author, p.authorAvatar, p.date, p.readTime, p.category, p.content, p.image, p.likes, p.commentsCount, p.isPublished, p.isTrending, p.seoTitle, p.seoDescription, JSON.stringify(p.tags)]
    );
  }

  for (const c of mockComments) {
    await db.run(
      "INSERT INTO comments (id, targetType, targetId, authorName, authorEmail, content, date, isApproved, isFlagged) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [c.id, c.targetType, c.targetId, c.authorName, c.authorEmail, c.content, c.date, c.isApproved, c.isFlagged]
    );
  }

  for (const q of mockQuizzes) {
    await db.run(
      "INSERT INTO quizzes (id, title, description, difficulty, timeLimit, questionsCount, tags) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [q.id, q.title, q.description, q.difficulty, q.timeLimit, q.questionsCount, JSON.stringify(q.tags)]
    );

    for (const qq of q.questions) {
      await db.run(
        "INSERT INTO quiz_questions (id, quizId, text, codeSnippet, codeLanguage, options, correctOptionIndex, explanation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [qq.id, q.id, qq.text, qq.codeSnippet || null, qq.codeLanguage || null, JSON.stringify(qq.options), qq.correctOptionIndex, qq.explanation]
      );
    }
  }

  console.log("Database seeded successfully!");
}

seedData().catch(console.error);
