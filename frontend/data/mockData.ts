export interface Project {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  problem: string;
  approach: string;
  solution: string;
  codeSnippet: string;
  codeLanguage: string;
  role: string;
  timeline: string;
  techStack: string[];
  image: string;
  gallery: string[];
  metrics: string[];
  likes: number;
  views: number;
  isFeatured: boolean;
  liveUrl: string;
  repoUrl: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: 'blog' | 'docs';
  tags: string[];
  content: string; // HTML rich content representation
  image: string;
  likes: number;
  commentsCount: number;
  isPublished: boolean;
  isTrending: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface Comment {
  id: string;
  targetType: 'project' | 'post';
  targetId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  date: string;
  isApproved: boolean;
  isFlagged: boolean;
}

export interface QuizQuestion {
  id: string;
  text: string;
  codeSnippet?: string;
  codeLanguage?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeLimit: string;
  questionsCount: number;
  tags: string[];
  questions: QuizQuestion[];
}

export const mockProjects: Project[] = [
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

export const mockPosts: Post[] = [
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
    seoDescription: 'A deep-dive tutorial into building rich glassmorphic cards and containers with modern backdrop-filters and premium shadows.',
    content: `
      <p class="lead">Glassmorphism is more than just a trend; it is a structural approach to depth and hierarchy in digital interfaces. In this guide, we explore how to implement it effectively using modern CSS variables.</p>
      
      <h3>The Three Pillars of Glass</h3>
      <p>To achieve a convincing frosted-glass effect, you need to balance three distinct CSS properties: a translucent background color, a subtle boundary border, and high-contrast shadows.</p>
      
      <pre><code class="language-css">.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}</code></pre>
      
      <p>The <code>backdrop-filter</code> property is the soul of glassmorphism; it allows you to apply graphical effects like blurring to the area behind an element. When combined with a semi-transparent background color, it creates that recognizable frosted aesthetic.</p>
      
      <div class="callout callout-info">
        <strong>Ready to test your skills?</strong> Take our CSS Architecture quiz and earn a badge for your portfolio.
      </div>
      
      <h3>Common Pitfalls</h3>
      <ul>
        <li><strong>Too much blur:</strong> Avoid over-stacking multiple blurred layers as it severely degrades scrolling performance on mobile devices.</li>
        <li><strong>Low Contrast:</strong> Make sure your text colors have sufficient contrast ratios (WCAG AAA standards) against blurred backgrounds. Use solid offsets for dark mode.</li>
        <li><strong>Inconsistent Borders:</strong> Avoid generic white borders on colorful backdrops. Instead, let borders dynamically match adjacent background highlights.</li>
      </ul>
    `
  },
  {
    id: 'architecting-micro-frontends',
    title: 'Architecting Scalable Micro-frontends with React and Module Federation',
    slug: 'architecting-micro-frontends',
    subtitle: 'How to distribute large application modules dynamically at runtime with Webpack and Vite.',
    author: 'Felix De',
    authorAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: 'May 24, 2024',
    readTime: '8 min read',
    category: 'blog',
    tags: ['React Framework', 'Micro-frontends', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    likes: 198,
    commentsCount: 8,
    isPublished: true,
    isTrending: true,
    seoTitle: 'React Module Federation Micro-frontends Guide',
    seoDescription: 'Learn step-by-step how to configure and deploy micro-frontends with Webpack 5 module federation and React dependencies sharing.',
    content: `
      <p class="lead">Micro-frontends have emerged as a powerful pattern for scaling frontend development in large organizations. But how do we maintain high application performance?</p>
      
      <blockquote>
        "The goal of micro-frontends is to treat the frontend as a composition of features which can be developed independently."
      </blockquote>
      
      <h3>1. Understanding Module Federation</h3>
      <p>Webpack 5 introduced a game-changer: Module Federation. It allows multiple builds to share code and assets at runtime. This isn't just about dynamic imports; it's about a shared dependency graph across decoupled applications.</p>
      
      <pre><code class="language-javascript">// webpack.config.js
new ModuleFederationPlugin({
  name: 'app_main',
  remotes: {
    dashboard: 'dashboard@http://localhost:3001/remoteEntry.js',
  },
  shared: { 
    react: { singleton: true }, 
    'react-dom': { singleton: true } 
  }
})</code></pre>
      
      <p>This approach ensures that your users don't download React twice, even if it's used in five different micro-apps. Efficiency is built-in by default.</p>
    `
  },
  {
    id: 'react-19-hooks',
    title: 'React 19 Hooks Guide: Transitioning to the use Hook',
    slug: 'react-19-hooks',
    subtitle: 'Exploring how React 19 handles async data loading, form contexts, and transitions.',
    author: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: 'Oct 22, 2024',
    readTime: '5 min read',
    category: 'docs',
    tags: ['React 19', 'Hooks', 'Async'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    likes: 92,
    commentsCount: 3,
    isPublished: true,
    isTrending: false,
    seoTitle: 'React 19 use Hook and Async Transitions',
    seoDescription: 'Master the new React 19 features including async transition hooks, useFormStatus, useActionState, and the unified use hook.',
    content: `
      <p class="lead">React 19 brings massive upgrades to daily development flows. The introduction of the unified <code>use</code> API simplifies fetching data and handling promises inside conditional trees.</p>
      
      <h3>The Dynamic <code>use</code> Hook</h3>
      <p>Unlike standard React hooks, <code>use</code> can be called conditionally and inside loops, allowing you to load promises or context references on the fly.</p>
      
      <pre><code class="language-javascript">import { use } from 'react';

function Article({ dataPromise }) {
  const article = use(dataPromise);
  return &lt;h2&gt;{article.title}&lt;/h2&gt;;
}</code></pre>
    `
  }
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    targetType: 'post',
    targetId: 'mastering-glassmorphism',
    authorName: 'Sarah Chen',
    authorEmail: 'sarah@designops.co',
    content: 'This is exactly what I was looking for. We\'ve been struggling with backdrop filter performance spikes on our Safari and mobile dashboard clients.',
    date: 'Oct 24, 2024',
    isApproved: true,
    isFlagged: false
  },
  {
    id: 'c2',
    targetType: 'post',
    targetId: 'architecting-micro-frontends',
    authorName: 'Marco Rossi',
    authorEmail: 'marco@microdev.io',
    content: 'Have you noticed any issues with version mismatching between micro-apps? Specifically when nested remotes load minor semantic updates of sharing libraries?',
    date: 'Oct 21, 2024',
    isApproved: true,
    isFlagged: false
  },
  {
    id: 'c3',
    targetType: 'post',
    targetId: 'mastering-glassmorphism',
    authorName: 'Jordan Smith',
    authorEmail: 'jordan@devops.net',
    content: 'Does this work well on older browsers? I heard backdrop-filter has some strange performance glitches in Firefox without specific config flags.',
    date: 'Oct 24, 2024',
    isApproved: true,
    isFlagged: false
  },
  {
    id: 'c4',
    targetType: 'post',
    targetId: 'mastering-glassmorphism',
    authorName: 'Spam Bot',
    authorEmail: 'spambot@ads.com',
    content: 'FREE BITCOIN HERE!!! CLICK THE LINK TO CLAIM YOUR 5000 USD NOW!!!',
    date: 'Oct 25, 2024',
    isApproved: false,
    isFlagged: true
  }
];

export const mockQuizzes: Quiz[] = [
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
          'It is executed when the component unmounts or before the effect runs again to perform cleanups.',
          'It caches the returned value in the browser local storage.',
          'It immediately re-evaluates the component DOM sub-trees.'
        ],
        correctOptionIndex: 1,
        explanation: 'The function returned from a useEffect hook is the cleanup function. React runs this function when the component unmounts, as well as before running the effect again on subsequent renders to clear side-effects.'
      },
      {
        id: 'rh2',
        text: 'Which hook should you use to preserve a mutable reference that does not trigger a re-render when changed?',
        options: [
          'useState',
          'useMemo',
          'useRef',
          'useReducer'
        ],
        correctOptionIndex: 2,
        explanation: 'useRef returns a mutable ref object whose .current property is initialized to the passed argument. The returned object will persist for the full lifetime of the component and changing .current does not trigger a re-render.'
      },
      {
        id: 'rh3',
        text: 'How does React 19 change form status tracking with forms?',
        options: [
          'By introducing the useFormStatus hook which returns pending state from parent forms.',
          'By deprecating standard HTML form submits entirely.',
          'By locking input fields while server components render.',
          'By replacing useState with action fields.'
        ],
        correctOptionIndex: 0,
        explanation: 'In React 19, the useFormStatus hook is introduced to read the submission status of a parent form element, giving developers immediate access to the pending status without manually hoisting state.'
      }
    ]
  },
  {
    id: 'css-grid-flex',
    title: 'CSS Grid & Flex',
    description: 'Deep dive into modern layouts, centering elements, and alignment.',
    difficulty: 'Beginner',
    timeLimit: '6 min',
    questionsCount: 2,
    tags: ['CSS', 'Layout', 'Design'],
    questions: [
      {
        id: 'cg1',
        text: 'How do you perfectly center a child item inside a container using CSS Flexbox?',
        codeSnippet: `.container {
  display: flex;
  /* Fill in properties */
}`,
        codeLanguage: 'css',
        options: [
          'align-items: center; justify-content: center;',
          'align-content: middle; justify-items: center;',
          'float: center; margin: auto;',
          'display: block; text-align: center;'
        ],
        correctOptionIndex: 0,
        explanation: 'Setting align-items: center aligns the child along the cross axis, and justify-content: center aligns it along the main axis, which perfectly centers it inside the flex container.'
      },
      {
        id: 'cg2',
        text: 'What does grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) accomplish?',
        options: [
          'It locks columns to precisely 200px width.',
          'It creates a responsive grid where columns wrap automatically to fit the space, never shrinking below 200px.',
          'It causes columns to overflow the browser viewport horizontally.',
          'It limits the grid to exactly 1 column on all screens.'
        ],
        correctOptionIndex: 1,
        explanation: 'Using auto-fit with minmax(200px, 1fr) creates a highly responsive grid. It automatically calculates how many columns of at least 200px can fit, and stretches the columns to fill any remaining space.'
      }
    ]
  },
  {
    id: 'typescript-types',
    title: 'TypeScript Types',
    description: 'Advanced generics, utility types, and structural typing concepts.',
    difficulty: 'Advanced',
    timeLimit: '12 min',
    questionsCount: 2,
    tags: ['TypeScript', 'Generics', 'Utility'],
    questions: [
      {
        id: 'ts1',
        text: 'Which TypeScript utility type construct makes all properties of an interface optional?',
        codeSnippet: `interface User {
  id: string;
  name: string;
}
type OptionalUser = /* ? */<User>;`,
        codeLanguage: 'typescript',
        options: [
          'Required',
          'Partial',
          'Omit',
          'Readonly'
        ],
        correctOptionIndex: 1,
        explanation: 'Partial<T> constructs a type with all properties of T set to optional, which is perfect for patch operations and edit form states.'
      },
      {
        id: 'ts2',
        text: 'What is structural typing in TypeScript?',
        options: [
          'Types are matched solely based on their explicit name and declaration location.',
          'Types are compatible if their shapes/members are identical, regardless of explicit declarations.',
          'It requires compiling all code blocks using strict standard class structures.',
          'A system that disables checking type variables at runtime.'
        ],
        correctOptionIndex: 1,
        explanation: 'TypeScript is structurally typed, meaning type compatibility is determined by the shape of the type (its properties and structure) rather than its explicit class/interface name.'
      }
    ]
  }
];
