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
    id: 'neo-futurism-ui-kit',
    title: 'Neo-futurism UI Kit',
    slug: 'neo-futurism-ui-kit',
    subtitle: 'A highly polished design system using React 19 & Tailwind CSS v4.',
    description: 'An open-source library that implements glassmorphic layouts, dynamic spring physical models, and absolute design consistency across devices.',
    problem: 'Existing UI kits were either too flat or heavily bloated with JavaScript dependencies. There was a lack of high-performance glassmorphism libraries supporting standard Tailwind properties.',
    approach: 'I designed a CSS-first token system using Tailwind v4 custom theme variables. Built dynamic components leveraging physics-based fluid scroll and native React transitions.',
    solution: 'A production-ready design kit that includes a rich library of layouts, smooth contrast adjustments, and complex interactive sliders with zero third-party scripts.',
    codeSnippet: `.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}`,
    codeLanguage: 'css',
    role: 'Lead Frontend Engineer',
    timeline: '3 Months (Oct - Dec 2024)',
    techStack: ['React 19', 'Tailwind v4', 'TypeScript', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
    ],
    metrics: [
      '98/100 Lighthouse Performance score average.',
      'Reduced initial bundle sizes by 42% compared to standard styling libraries.',
      'Starred by 2,400+ developers on GitHub.'
    ],
    likes: 142,
    views: 1240,
    isFeatured: true,
    liveUrl: 'https://neofuturism.dev',
    repoUrl: 'https://github.com/fluxfolio/neofuturism-ui'
  },
  {
    id: 'cloudsync-orchestrator',
    title: 'CloudSync Orchestrator',
    slug: 'cloudsync-orchestrator',
    subtitle: 'Real-time WebSocket monitoring system for microservice orchestration.',
    description: 'A robust administration interface visualizing file synchronization pipelines, edge cache distributions, and API gateway health statuses in real time.',
    problem: 'DevOps pipelines lacked readable visual aids. CLI trackers made it difficult to pinpoint network congestion bottlenecks and active websocket failure rates quickly.',
    approach: 'I introduced an visual canvas backed by SVG nodes, WebSockets for push notifications, and high-contrast alert highlights for system failures.',
    solution: 'Designed an interactive analytics control center featuring canvas graphs, draggable service nodes, and instantaneous status filters.',
    codeSnippet: `const socket = new WebSocket('wss://api.cloudsync.io/live');
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  dispatch({ type: 'UPDATE_NODE', payload: data });
};`,
    codeLanguage: 'typescript',
    role: 'Fullstack Architect',
    timeline: '6 Months (May - Nov 2024)',
    techStack: ['Next.js', 'WebSockets', 'Canvas API', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
    ],
    metrics: [
      'Visualized synchronization feeds averaging 12,000 requests per minute.',
      'Reduced average mean-time-to-resolution (MTTR) by 28% for infrastructure operations.',
      'Real-time dashboard rendering under 60fps average.'
    ],
    likes: 89,
    views: 940,
    isFeatured: true,
    liveUrl: 'https://cloudsync-orchestrator.com',
    repoUrl: 'https://github.com/fluxfolio/cloudsync'
  },
  {
    id: 'quantum-ledger-explorer',
    title: 'Quantum Ledger Explorer',
    slug: 'quantum-ledger-explorer',
    subtitle: 'Cryptographic ledger visualizer with real-time audit trails.',
    description: 'A client-side explorer validating cryptographic blocks, network signatures, and tree hierarchies using interactive structural nodes.',
    problem: 'Block auditing was traditionally a parsing-heavy task, forcing developers to scan through massive JSON blocks to trace specific cross-chain smart-contract calls.',
    approach: 'Engineered a highly optimized node renderer using SVG hierarchies, combined with smart-filtering search fields.',
    solution: 'Delivered an elegant web interface where block linkages are laid out chronologically and users can inspect detailed transactions in expandable slides.',
    codeSnippet: `export function computeMerkleRoot(leaves: string[]): string {
  if (leaves.length === 1) return leaves[0];
  const nextLevel = [];
  for (let i = 0; i < leaves.length; i += 2) {
    nextLevel.push(sha256(leaves[i] + (leaves[i + 1] || '')));
  }
  return computeMerkleRoot(nextLevel);
}`,
    codeLanguage: 'typescript',
    role: 'Security Engineer',
    timeline: '2 Months (Jan - Mar 2025)',
    techStack: ['TypeScript', 'SVG rendering', 'Cryptography', 'Next.js'],
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80'
    ],
    metrics: [
      'Processed block verification in under 5ms completely on the client side.',
      'Audited transaction records exceeding 50,000 items in single-session charts.',
      '100% compliant with standard accessibility audits.'
    ],
    likes: 74,
    views: 680,
    isFeatured: false,
    liveUrl: 'https://quantum-ledger.dev',
    repoUrl: 'https://github.com/fluxfolio/quantum-ledger'
  },
  {
    id: 'devflow-editor',
    title: 'DevFlow Block Editor',
    slug: 'devflow-editor',
    subtitle: 'A structural, block-based WYSIWYG editor for developers.',
    description: 'A modular, high-contrast editor allowing content writers to build technical articles with custom code blocks, inline previews, and layout structures.',
    problem: 'Traditional rich editors struggle with syntax highlight maintenance, multi-line code block indentation, and semantic layout tags.',
    approach: 'Created an in-memory block editor state mapping blocks to React nodes. Built inline live syntax highlight renderers.',
    solution: 'Designed an elegant, administrative WYSIWYG editor containing post metadata management, instant preview views, and drag-and-drop media cards.',
    codeSnippet: `const editorState = [
  { id: 'b1', type: 'heading', value: 'Mastering Layouts' },
  { id: 'b2', type: 'code', value: 'const x = 5;', lang: 'javascript' }
];`,
    codeLanguage: 'javascript',
    role: 'UX Developer',
    timeline: '4 Months (Jun - Oct 2024)',
    techStack: ['React', 'Zustand', 'PrismJS', 'CSS Modules'],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80'
    ],
    metrics: [
      'Average key-input latency under 1.5ms.',
      'Used by 15 tech blogs for creating development posts.',
      'Supports auto-saving and full history revision steps.'
    ],
    likes: 110,
    views: 1120,
    isFeatured: true,
    liveUrl: 'https://devflow-editor.dev',
    repoUrl: 'https://github.com/fluxfolio/devflow-wysiwyg'
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
