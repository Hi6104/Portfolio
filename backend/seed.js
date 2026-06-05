const { dbPromise, setupDatabase } = require('./database');

const mockProjects = [
  {
    id: 'log-aggregator',
    title: 'Multi-Tenant Distributed Log Aggregator',
    slug: 'log-aggregator',
    subtitle: 'A high-performance, real-time data pipeline and observability platform.',
    description: 'In a modern microservices architecture, troubleshooting bugs is like finding a needle in a haystack of servers. This Multi-Tenant Distributed Log Aggregator serves as the central nervous system for your applications. It ingests thousands of logs per second across different microservices, logically separates them by tenant, securely buffers them, and indexes them in a columnar database for sub-second, real-time querying and visualization.',
    problem: 'Microservices architectures distribute logs across multiple servers, making it incredibly difficult to trace bugs, monitor performance, and maintain observability for different tenants securely.',
    approach: 'Built an asynchronous ingestion API with FastAPI, using Redis for rate limiting and Apache Kafka as a resilient message broker. A Faust worker consumes the stream and batches inserts into a ClickHouse OLAP database for fast analytical querying.',
    solution: 'Provided a highly scalable distributed log aggregation platform capable of handling thousands of logs per second, paired with a Next.js dashboard for real-time visualization and log searching.',
    codeSnippet: `// Example Architecture Flow
graph TD;
    Client[Microservices] -->|POST /ingest| IngestionAPI(Ingestion Service - FastAPI)
    IngestionAPI -->|Check Rate Limit| Redis[(Redis)]
    IngestionAPI -->|Produce| Kafka[Apache Kafka]
    
    Kafka -->|Consume| Worker(Worker Service - Faust)
    Worker -->|Batch Insert| ClickHouse[(ClickHouse)]
    
    UI[Next.js Dashboard] -->|GET /logs| QueryAPI(Query Service - FastAPI)
    QueryAPI -->|SQL Query| ClickHouse`,
    codeLanguage: 'Mermaid',
    role: 'Backend / Data Engineer',
    timeline: 'Recent',
    techStack: ['Python', 'Next.js', 'FastAPI', 'Kafka', 'ClickHouse', 'Docker', 'Redis', 'Faust'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
    ],
    metrics: [
      'Ingests thousands of logs per second asynchronously.',
      'Sub-second querying enabled by ClickHouse OLAP database.',
      'Robust stream processing with Apache Kafka and Faust workers.'
    ],
    likes: 0,
    views: 0,
    isFeatured: true,
    liveUrl: '',
    repoUrl: 'https://github.com/Hi6104/log-aggregator'
  },
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
    liveUrl: 'https://portal.okuru.app/',
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
    isFeatured: true,
    liveUrl: '',
    repoUrl: ''
  }
];

const mockPosts = [
  {
    id: 'react-server-components-next15',
    title: 'The Rise of React Server Components in Next.js 15',
    slug: 'react-server-components-next15',
    subtitle: 'Understanding how Server Components fundamentally change React rendering and state architecture.',
    author: 'Himanshu Vishwakarma',
    authorAvatar: '',
    date: 'Jun 02, 2026',
    readTime: '8 min read',
    category: 'docs',
    tags: ['React', 'Next.js', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    likes: 342,
    commentsCount: 28,
    isPublished: true,
    isTrending: true,
    seoTitle: 'React Server Components Guide Next.js 15',
    seoDescription: 'A deep-dive into React Server Components (RSC) and how they optimize frontend performance in Next.js 15.',
    content: '<p class="lead">React Server Components (RSC) represent the largest paradigm shift in React since Hooks. By allowing components to run exclusively on the server, we drastically reduce the JavaScript shipped to the client.</p><h3>Why RSC Matters</h3><p>Traditional SSR sends HTML to the client, but still requires a massive JS bundle to hydrate the page. RSC allows you to keep heavy dependencies (like markdown parsers or date libraries) on the server. Your client bundle only contains the interactive bits.</p><blockquote>"Ship zero client-side JavaScript for static components."</blockquote><h3>Hydration Optimization</h3><p>By splitting your app into Server and Client boundaries, you ensure that only leaves of your component tree are hydrated, leading to incredibly fast Time to Interactive (TTI) metrics.</p>'
  },
  {
    id: 'wasm-rust-high-performance',
    title: 'WebAssembly and Rust: High Performance Web Apps',
    slug: 'wasm-rust-high-performance',
    subtitle: 'Bringing native performance to the browser using Rust-compiled WebAssembly.',
    author: 'Himanshu Vishwakarma',
    authorAvatar: '',
    date: 'May 28, 2026',
    readTime: '10 min read',
    category: 'blog',
    tags: ['WebAssembly', 'Rust', 'Performance'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    likes: 512,
    commentsCount: 45,
    isPublished: true,
    isTrending: true,
    seoTitle: 'WebAssembly and Rust Performance Guide',
    seoDescription: 'Learn how to integrate Rust into your web applications using WebAssembly for unparalleled performance.',
    content: '<p class="lead">WebAssembly (Wasm) has matured into a robust ecosystem, and Rust is widely considered the best language for compiling to Wasm due to its memory safety and lack of a garbage collector.</p><h3>The Power of Wasm</h3><p>Wasm provides a binary instruction format for a stack-based virtual machine. It is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.</p><h3>Why Rust?</h3><p>Rust offers predictable performance. Without a garbage collector pausing execution, Rust modules run consistently fast, making them perfect for compute-heavy tasks like video editing, 3D rendering, or heavy cryptography directly in the browser.</p>'
  },
  {
    id: 'ai-driven-development',
    title: 'Mastering AI-Driven Development in 2026',
    slug: 'ai-driven-development',
    subtitle: 'How LLMs, GitHub Copilot, and intelligent agents are fundamentally changing the software lifecycle.',
    author: 'Himanshu Vishwakarma',
    authorAvatar: '',
    date: 'May 15, 2026',
    readTime: '7 min read',
    category: 'blog',
    tags: ['AI', 'Productivity', 'Tools'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    likes: 890,
    commentsCount: 112,
    isPublished: true,
    isTrending: true,
    seoTitle: 'AI Driven Development Guide 2026',
    seoDescription: 'Explore the future of coding with AI agents, LLMs, and GitHub Copilot.',
    content: '<p class="lead">The era of writing every line of code by hand is over. AI-driven development relies on the symbiosis between human architectural vision and machine-generated implementation.</p><h3>AI as a Pair Programmer</h3><p>Tools like GitHub Copilot and Cursor have evolved from simple autocomplete bots into contextual agents that understand your entire codebase. They can refactor legacy code, write boilerplate tests, and catch potential security vulnerabilities before CI/CD pipelines run.</p><blockquote>"AI won\'t replace developers, but developers using AI will replace those who don\'t."</blockquote><h3>Prompt Engineering for Devs</h3><p>The new essential skill for engineers is prompt engineering. Providing explicit context, constraints, and architecture rules to LLMs yields exponentially better code generation.</p>'
  },
  {
    id: 'edge-computing-functions',
    title: 'The Shift to Edge Computing and Edge Functions',
    slug: 'edge-computing-functions',
    subtitle: 'Reducing latency and scaling infinitely by moving server logic to the network edge.',
    author: 'Himanshu Vishwakarma',
    authorAvatar: '',
    date: 'May 02, 2026',
    readTime: '5 min read',
    category: 'docs',
    tags: ['Edge', 'Cloud', 'Infrastructure'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    likes: 210,
    commentsCount: 18,
    isPublished: true,
    isTrending: true,
    seoTitle: 'Edge Computing and Functions Guide',
    seoDescription: 'Understanding the benefits of Edge Computing, Cloudflare Workers, and Vercel Edge Functions.',
    content: '<p class="lead">Edge computing brings computation and data storage closer to the location where it is needed to improve response times and save bandwidth.</p><h3>What are Edge Functions?</h3><p>Unlike traditional serverless functions (like AWS Lambda) that run in a specific geographic region, Edge Functions run on CDN nodes globally. This means your code executes within milliseconds of the user\'s physical location.</p><h3>Use Cases</h3><p>Edge functions are perfect for A/B testing, personalized routing, edge authentication, and intercepting/modifying HTTP requests on the fly without hitting the origin server.</p>'
  },
  {
    id: 'signals-fine-grained-reactivity',
    title: 'State Management: Signals & Fine-Grained Reactivity',
    slug: 'signals-fine-grained-reactivity',
    subtitle: 'Why frameworks are moving away from virtual DOM diffing toward reactive Signals.',
    author: 'Himanshu Vishwakarma',
    authorAvatar: '',
    date: 'Apr 20, 2026',
    readTime: '9 min read',
    category: 'docs',
    tags: ['Frontend', 'Signals', 'Performance'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    likes: 415,
    commentsCount: 33,
    isPublished: true,
    isTrending: false,
    seoTitle: 'Signals and Fine-Grained Reactivity in JS',
    seoDescription: 'Learn how Signals provide fine-grained reactivity without the overhead of Virtual DOM diffing.',
    content: '<p class="lead">Signals are the hottest topic in frontend state management. Adopted by SolidJS, Preact, Vue, and Angular, signals offer an alternative to React\'s top-down rendering model.</p><h3>The Virtual DOM Bottleneck</h3><p>In traditional VDOM frameworks, a state change forces the component and all its children to re-render, creating a new VDOM tree to diff against the old one. This is computationally expensive for large applications.</p><h3>Enter Signals</h3><p>Signals wrap your state values. When a signal is updated, it directly notifies the exact DOM nodes that depend on it. No VDOM diffing, no unnecessary component re-renders. It is pure, fine-grained reactivity.</p>'
  },
  {
    id: 'modern-css-subgrid-container-queries',
    title: 'Modern CSS: Subgrid and Container Queries',
    slug: 'modern-css-subgrid-container-queries',
    subtitle: 'Building truly responsive, component-driven layouts without media queries.',
    author: 'Himanshu Vishwakarma',
    authorAvatar: '',
    date: 'Apr 05, 2026',
    readTime: '6 min read',
    category: 'blog',
    tags: ['CSS', 'Design', 'UI'],
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80',
    likes: 289,
    commentsCount: 15,
    isPublished: true,
    isTrending: false,
    seoTitle: 'CSS Subgrid and Container Queries Guide',
    seoDescription: 'Master modern CSS layout techniques using CSS Subgrid and Container Queries for component-driven design.',
    content: '<p class="lead">Responsive design is evolving from page-level layouts to component-level intelligence. Container Queries and Subgrid are the tools making this possible.</p><h3>Container Queries</h3><p>Instead of styling a component based on the viewport width (using media queries), Container Queries allow you to style elements based on the size of their parent container. This makes components truly portable across different layouts.</p><pre><code class="language-css">.card-container { container-type: inline-size; }<br/>@container (min-width: 400px) { .card { display: flex; } }</code></pre><h3>CSS Subgrid</h3><p>Subgrid allows nested grids to participate in the sizing of their parent grid. This solves the long-standing problem of aligning card headers and footers across a grid track without relying on fixed heights.</p>'
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
    title: 'React & Hooks',
    description: 'Deep dive into hooks, lifecycle, state management, and React performance optimizations.',
    difficulty: 'Intermediate',
    timeLimit: '12 min',
    questionsCount: 10,
    tags: ['React', 'Hooks', 'Frontend'],
    questions: [
      { id: 'rh1', text: 'What does the cleanup function returned from useEffect do?', options: ['Triggers a re-render', 'Runs on component unmount/before next effect', 'Caches the returned value', 'Prevents state updates'], correctOptionIndex: 1, explanation: 'The cleanup function in useEffect runs when the component unmounts or before the next effect runs, preventing memory leaks.' },
      { id: 'rh2', text: 'When does useMemo recompute its value?', options: ['On every render', 'Only on initial mount', 'When one of its dependencies changes', 'When the component re-mounts'], correctOptionIndex: 2, explanation: 'useMemo recomputes the memoized value only when one of the dependencies in its dependency array changes.' },
      { id: 'rh3', text: 'What is the key difference between useCallback and useMemo?', options: ['useCallback memoizes a value, useMemo memoizes a function', 'useCallback memoizes a function, useMemo memoizes a computed value', 'They are identical', 'useCallback only works with async functions'], correctOptionIndex: 1, explanation: 'useCallback returns a memoized callback function, while useMemo returns a memoized computed value.' },
      { id: 'rh4', text: 'Which hook would you use to access a DOM element directly in React?', options: ['useState', 'useRef', 'useContext', 'useEffect'], correctOptionIndex: 1, explanation: 'useRef creates a mutable ref object whose .current property is initialized to the passed argument, commonly used to access DOM nodes.' },
      { id: 'rh5', text: 'What triggers a re-render in React?', options: ['Any variable change inside the component', 'Only prop changes', 'State changes, prop changes, or context changes', 'Only direct DOM manipulation'], correctOptionIndex: 2, explanation: 'A React component re-renders when its state changes, its props change, or its subscribed context value changes.' },
      { id: 'rh6', text: 'What is the purpose of React.memo()?', options: ['Memoizes state values', 'Prevents a component from re-rendering if props have not changed', 'Replaces useMemo', 'Caches API calls'], correctOptionIndex: 1, explanation: 'React.memo is a higher-order component that memoizes the rendered output, preventing re-renders when props are unchanged.' },
      { id: 'rh7', text: 'What does useReducer return?', options: ['A single state value and a setter', 'A state value and a dispatch function', 'An array of reducers', 'A context provider'], correctOptionIndex: 1, explanation: 'useReducer returns a tuple of [state, dispatch], where dispatch is used to send actions to the reducer function.' },
      { id: 'rh8', text: 'Which hook is used to subscribe to context values in functional components?', options: ['useContext', 'useSubscribe', 'useStore', 'useProvider'], correctOptionIndex: 0, explanation: 'useContext accepts a context object and returns the current context value for that context.' },
      { id: 'rh9', text: 'What is "lifting state up" in React?', options: ['Moving state to a global store', 'Moving state to a parent component so siblings can share it', 'Moving state to localStorage', 'Connecting state to a database'], correctOptionIndex: 1, explanation: 'Lifting state up means moving shared state to the nearest common ancestor component so multiple child components can access and modify it.' },
      { id: 'rh10', text: 'In React, what is reconciliation?', options: ['The process of connecting React to a database', 'The algorithm React uses to diff the virtual DOM and update the real DOM', 'The process of merging two contexts', 'The lifecycle method for cleanup'], correctOptionIndex: 1, explanation: 'Reconciliation is Reacts diffing algorithm that determines the minimum number of operations needed to update the real DOM to match the virtual DOM.' }
    ]
  },
  {
    id: 'javascript-advanced',
    title: 'JavaScript Advanced',
    description: 'Test your knowledge of closures, event loop, prototypes, async patterns and modern ES features.',
    difficulty: 'Advanced',
    timeLimit: '15 min',
    questionsCount: 10,
    tags: ['JavaScript', 'ES6+', 'Advanced'],
    questions: [
      { id: 'js1', text: 'What is a closure in JavaScript?', options: ['A function that is immediately invoked', 'A function bundled with references to its surrounding lexical scope', 'A method to close browser windows', 'An arrow function with no return value'], correctOptionIndex: 1, explanation: 'A closure is a function that retains access to variables from its outer (enclosing) scope even after that outer function has returned.' },
      { id: 'js2', text: 'What is the output of: console.log(typeof null)?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correctOptionIndex: 2, explanation: 'typeof null returns "object" — this is a well-known JavaScript bug that has been kept for backward compatibility.' },
      { id: 'js3', text: 'What does the event loop do in JavaScript?', options: ['Manages database connections', 'Coordinates execution of the call stack, Web APIs, and callback queue', 'Handles CSS animations', 'Garbage collects unused memory'], correctOptionIndex: 1, explanation: 'The event loop continuously monitors the call stack and callback queue, pushing callbacks onto the stack when it is empty, enabling non-blocking async code.' },
      { id: 'js4', text: 'What is the difference between == and ===?', options: ['No difference', '== checks value only (with type coercion), === checks value and type', '=== is faster', '== is used for objects only'], correctOptionIndex: 1, explanation: '== performs type coercion before comparing, while === checks both value and type without coercion (strict equality).' },
      { id: 'js5', text: 'What does Promise.all() do?', options: ['Runs promises sequentially', 'Returns when the first promise resolves', 'Resolves when ALL promises resolve, or rejects on first rejection', 'Ignores rejected promises'], correctOptionIndex: 2, explanation: 'Promise.all() takes an iterable of promises and returns a single promise that resolves when all input promises resolve, or rejects immediately if any promise rejects.' },
      { id: 'js6', text: 'What is prototypal inheritance?', options: ['Objects inherit from classes only', 'Objects inherit directly from other objects via the prototype chain', 'A TypeScript-only feature', 'Inheritance through import statements'], correctOptionIndex: 1, explanation: 'In JavaScript, objects inherit properties and methods from other objects through the prototype chain, not through class-based inheritance.' },
      { id: 'js7', text: 'What is the purpose of async/await?', options: ['To make code synchronous', 'To write asynchronous code in a synchronous-looking style using Promises', 'To replace callbacks entirely', 'To speed up API requests'], correctOptionIndex: 1, explanation: 'async/await is syntactic sugar over Promises, allowing you to write asynchronous code that reads like synchronous code using await to pause execution.' },
      { id: 'js8', text: 'What does Array.prototype.reduce() do?', options: ['Removes duplicate items', 'Reduces array length by half', 'Executes a reducer function on each element, accumulating into a single value', 'Filters out falsy values'], correctOptionIndex: 2, explanation: 'reduce() executes a callback function (reducer) on each array element in order, passing the accumulated result as the first argument, returning a single final value.' },
      { id: 'js9', text: 'What is a WeakMap in JavaScript?', options: ['A Map with limited size', 'A Map whose keys are weakly referenced (garbage collected)', 'An outdated version of Map', 'A Map that only accepts string keys'], correctOptionIndex: 1, explanation: 'WeakMap keys are weakly held — if there are no other references to the key object, it can be garbage collected, preventing memory leaks.' },
      { id: 'js10', text: 'What is the difference between let, const, and var?', options: ['They are identical', 'var is function-scoped & hoisted; let/const are block-scoped; const cannot be reassigned', 'const is always global', 'let cannot be used in loops'], correctOptionIndex: 1, explanation: 'var is function-scoped and hoisted; let and const are block-scoped and not hoisted in the same way; const prevents reassignment but objects/arrays it references can still be mutated.' }
    ]
  },
  {
    id: 'nextjs-fundamentals',
    title: 'Next.js Fundamentals',
    description: 'Master the App Router, Server Components, SSR, SSG, and Next.js deployment strategies.',
    difficulty: 'Intermediate',
    timeLimit: '12 min',
    questionsCount: 10,
    tags: ['Next.js', 'SSR', 'React'],
    questions: [
      { id: 'nj1', text: 'What is the key advantage of Next.js Server Components?', options: ['They allow direct DOM access', 'They run on the server, reducing JS sent to the client', 'They replace useEffect', 'They enable hot module replacement'], correctOptionIndex: 1, explanation: 'Server Components execute on the server and send only HTML to the client, drastically reducing the JavaScript bundle size.' },
      { id: 'nj2', text: 'What does generateStaticParams() do in Next.js App Router?', options: ['Generates API routes', 'Pre-generates static paths for dynamic routes at build time', 'Validates URL parameters', 'Generates sitemap entries'], correctOptionIndex: 1, explanation: 'generateStaticParams() is used with dynamic route segments to pre-render pages at build time (SSG), replacing getStaticPaths from the Pages Router.' },
      { id: 'nj3', text: 'What file is used to define shared UI wrapping multiple pages in the App Router?', options: ['_app.tsx', 'layout.tsx', 'template.tsx', 'provider.tsx'], correctOptionIndex: 1, explanation: 'layout.tsx in the App Router wraps child pages and other layouts, persisting state and UI across navigations without re-mounting.' },
      { id: 'nj4', text: 'What is the difference between SSR and SSG in Next.js?', options: ['They are the same', 'SSR generates HTML on each request; SSG generates HTML at build time', 'SSG is server-side only', 'SSR requires a database'], correctOptionIndex: 1, explanation: 'SSR (Server-Side Rendering) generates HTML on every request for fresh data; SSG (Static Site Generation) pre-renders HTML at build time for fast delivery.' },
      { id: 'nj5', text: 'What does the "use client" directive do in Next.js 13+?', options: ['Marks a file for client-side rendering and enables browser APIs and hooks', 'Disables server-side rendering', 'Enables static generation', 'Loads the page only on mobile'], correctOptionIndex: 0, explanation: '"use client" tells Next.js to render a component on the client side, enabling the use of browser-only APIs, event handlers, and React hooks like useState.' },
      { id: 'nj6', text: 'How do you create an API route in the Next.js App Router?', options: ['pages/api/route.ts', 'app/api/[name]/route.ts with exported GET/POST functions', 'server/route.ts', 'api/index.ts'], correctOptionIndex: 1, explanation: 'In the App Router, API routes are created inside app/api/[...]/route.ts by exporting named functions like GET, POST, PUT, DELETE.' },
      { id: 'nj7', text: 'What is Incremental Static Regeneration (ISR) in Next.js?', options: ['A way to update static pages at runtime without full rebuild', 'A real-time WebSocket feature', 'Server-side authentication refresh', 'A CSS optimization technique'], correctOptionIndex: 0, explanation: 'ISR allows you to update static pages after they have been built by specifying a revalidation time, combining the speed of SSG with the freshness of SSR.' },
      { id: 'nj8', text: 'What is the purpose of the Next.js Image component?', options: ['To display SVG icons', 'To provide automatic image optimization, lazy loading, and responsive sizing', 'To upload images to a CDN', 'To crop images before render'], correctOptionIndex: 1, explanation: 'The Next.js Image component automatically optimizes images with lazy loading, WebP conversion, responsive sizing, and CLS prevention.' },
      { id: 'nj9', text: 'How does Next.js handle environment variables for the browser?', options: ['All process.env variables are available in the browser', 'Only variables prefixed with NEXT_PUBLIC_ are exposed to the browser', 'Variables must be imported from a config file', 'Environment variables are unavailable client-side'], correctOptionIndex: 1, explanation: 'Only environment variables prefixed with NEXT_PUBLIC_ are bundled and exposed to the browser. Others remain server-only for security.' },
      { id: 'nj10', text: 'What does Next.js Middleware do?', options: ['Adds database middleware', 'Runs code before a request completes, enabling auth, redirects, and rewrites at the edge', 'Compresses API responses', 'Handles CSS transformations'], correctOptionIndex: 1, explanation: 'Next.js Middleware executes at the edge before a request is completed, allowing you to modify responses, redirect users, set headers, or run authentication checks.' }
    ]
  },
  {
    id: 'css-layout',
    title: 'CSS & Layout Mastery',
    description: 'Test your expertise in Flexbox, Grid, animations, responsive design, and modern CSS features.',
    difficulty: 'Beginner',
    timeLimit: '10 min',
    questionsCount: 10,
    tags: ['CSS', 'Flexbox', 'Grid', 'Design'],
    questions: [
      { id: 'css1', text: 'What does "display: flex" do to an element?', options: ['Makes it invisible', 'Establishes a flex formatting context for its children', 'Makes it float left', 'Converts it to a grid container'], correctOptionIndex: 1, explanation: 'display: flex makes the element a flex container, allowing its children to be laid out using the flexbox model.' },
      { id: 'css2', text: 'What is the difference between justify-content and align-items in Flexbox?', options: ['They are the same', 'justify-content aligns along the main axis; align-items aligns along the cross axis', 'justify-content is for Grid only', 'align-items only works vertically'], correctOptionIndex: 1, explanation: 'justify-content controls alignment along the main axis (horizontal by default); align-items controls alignment along the cross axis (vertical by default).' },
      { id: 'css3', text: 'How do you create a two-column layout in CSS Grid?', options: ['display: flex; flex-wrap: wrap', 'grid-template-columns: 1fr 1fr', 'column-count: 2', 'float: left on both columns'], correctOptionIndex: 1, explanation: 'grid-template-columns: 1fr 1fr creates two equal-width columns using the fr (fraction) unit in CSS Grid.' },
      { id: 'css4', text: 'What does the CSS "position: sticky" do?', options: ['Fixes element permanently', 'Positions element relative to its normal flow but sticks when scrolling reaches a threshold', 'Makes element float', 'Removes it from document flow'], correctOptionIndex: 1, explanation: 'position: sticky behaves like position: relative until the element crosses a specified threshold during scrolling, then it sticks like position: fixed.' },
      { id: 'css5', text: 'What is the CSS box model?', options: ['A 3D transform feature', 'The model describing how content, padding, border, and margin are layered around elements', 'A method for centering boxes', 'A JavaScript API'], correctOptionIndex: 1, explanation: 'The CSS box model describes the rectangular boxes generated for elements, consisting of: content, padding, border, and margin.' },
      { id: 'css6', text: 'What does "z-index" control?', options: ['Element zoom level', 'The stacking order of positioned elements along the z-axis', 'Element transparency', 'Animation speed'], correctOptionIndex: 1, explanation: 'z-index controls the stacking order of positioned elements (position other than static). Higher values appear in front of lower values.' },
      { id: 'css7', text: 'What is the purpose of CSS custom properties (variables)?', options: ['They replace JavaScript variables', 'They allow reusable values defined once and referenced throughout CSS', 'They are only for colors', 'They are processed at build time only'], correctOptionIndex: 1, explanation: 'CSS custom properties (defined with --name syntax) allow you to store values in one place and reuse them throughout your stylesheet, enabling theming and maintainability.' },
      { id: 'css8', text: 'What is the "::before" pseudo-element?', options: ['Selects the element before the target in the DOM', 'Inserts content before the element\'s actual content', 'Applies styles on hover', 'Targets the parent element'], correctOptionIndex: 1, explanation: '::before creates a pseudo-element that is the first child of the selected element, allowing you to insert content before it using CSS without changing the HTML.' },
      { id: 'css9', text: 'What does "media query" enable in CSS?', options: ['Database queries from CSS', 'Applying different styles based on viewport size or device characteristics', 'Loading external CSS files', 'Querying DOM elements'], correctOptionIndex: 1, explanation: 'Media queries allow CSS to apply different styles depending on conditions like viewport width, height, orientation, and display type — fundamental to responsive design.' },
      { id: 'css10', text: 'What is the "clamp()" function in CSS?', options: ['Used to clamp JavaScript values', 'Restricts a value between a minimum and maximum, scaling fluidly in between', 'A hover animation', 'A grid sizing unit'], correctOptionIndex: 1, explanation: 'clamp(min, preferred, max) is a CSS function that returns the preferred value if it is between min and max, enabling fluid typography and responsive sizing.' }
    ]
  },
  {
    id: 'nodejs-backend',
    title: 'Node.js & Backend APIs',
    description: 'Explore Express.js, REST API design, middleware, authentication patterns, and database integration.',
    difficulty: 'Advanced',
    timeLimit: '15 min',
    questionsCount: 10,
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    questions: [
      { id: 'nb1', text: 'What is middleware in Express.js?', options: ['A database connector', 'A function with access to req, res, and next that processes requests in a pipeline', 'A routing algorithm', 'A compression library'], correctOptionIndex: 1, explanation: 'Middleware are functions that execute during the request-response cycle. They can modify req/res, end the cycle, or call next() to pass control to the next middleware.' },
      { id: 'nb2', text: 'What is the difference between PUT and PATCH in REST APIs?', options: ['They are identical', 'PUT replaces the entire resource; PATCH applies partial updates', 'PATCH is for creating resources', 'PUT is for deleting resources'], correctOptionIndex: 1, explanation: 'PUT replaces an entire resource with the provided data; PATCH applies partial modifications to a resource without replacing it entirely.' },
      { id: 'nb3', text: 'What does JWT stand for and what is it used for?', options: ['Java Web Token, for JVM apps', 'JSON Web Token, a compact self-contained token for authentication and authorization', 'JavaScript Web Transport, for WebSockets', 'JSON Write Target, for databases'], correctOptionIndex: 1, explanation: 'JWT (JSON Web Token) is a compact, self-contained token containing claims encoded in JSON, commonly used for stateless authentication and information exchange.' },
      { id: 'nb4', text: 'What is CORS and why is it important?', options: ['A database protocol', 'Cross-Origin Resource Sharing — a security feature controlling which origins can access an API', 'A caching mechanism', 'A load balancing algorithm'], correctOptionIndex: 1, explanation: 'CORS is a browser security feature that restricts HTTP requests from different origins. Servers must send appropriate CORS headers to allow cross-origin requests.' },
      { id: 'nb5', text: 'What is the purpose of async/await in Node.js?', options: ['To make Node.js synchronous', 'To handle asynchronous operations in a cleaner, sequential-looking style', 'To run code in parallel threads', 'To connect to databases'], correctOptionIndex: 1, explanation: 'async/await in Node.js allows writing asynchronous code that avoids callback hell and promise chaining, making it easier to read and reason about.' },
      { id: 'nb6', text: 'What is rate limiting and why use it in APIs?', options: ['Limiting the response size', 'Restricting the number of requests a client can make in a time window to prevent abuse', 'Compressing API payloads', 'Caching API responses'], correctOptionIndex: 1, explanation: 'Rate limiting controls how frequently clients can make requests to prevent brute force attacks, DDoS protection, and ensuring fair usage of API resources.' },
      { id: 'nb7', text: 'What is the Node.js event loop?', options: ['A UI animation loop', 'The mechanism that allows Node.js to perform non-blocking I/O by offloading operations to the OS', 'A method for queuing database requests', 'A debugging tool'], correctOptionIndex: 1, explanation: 'The Node.js event loop enables non-blocking I/O by using libuv to offload operations (like file I/O, network) to the OS, then processing callbacks when complete.' },
      { id: 'nb8', text: 'What HTTP status code indicates a resource was successfully created?', options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'], correctOptionIndex: 1, explanation: '201 Created is the appropriate response for POST requests that successfully create a new resource, often accompanied by a Location header pointing to the new resource.' },
      { id: 'nb9', text: 'What is the purpose of environment variables in a Node.js backend?', options: ['To store HTML templates', 'To externalize configuration (secrets, URLs) from code, enabling different configs per environment', 'To speed up Node.js execution', 'To define global variables'], correctOptionIndex: 1, explanation: 'Environment variables store sensitive configuration (API keys, database URLs) outside the codebase, allowing the same code to run differently in development, staging, and production.' },
      { id: 'nb10', text: 'What is database indexing and why is it important?', options: ['A way to encrypt database data', 'A data structure that improves query speed by allowing fast lookups without scanning every row', 'A backup mechanism', 'A way to join tables'], correctOptionIndex: 1, explanation: 'Indexes create optimized data structures (like B-trees) that allow database engines to find rows much faster, dramatically improving query performance on large datasets.' }
    ]
  },
  {
    id: 'typescript-mastery',
    title: 'TypeScript Mastery',
    description: 'Explore generics, utility types, type narrowing, interfaces vs types, and advanced TypeScript patterns.',
    difficulty: 'Advanced',
    timeLimit: '15 min',
    questionsCount: 10,
    tags: ['TypeScript', 'Types', 'Advanced'],
    questions: [
      { id: 'ts1', text: 'What is the difference between "interface" and "type" in TypeScript?', options: ['They are completely identical', 'Interfaces can be merged (declaration merging); types support unions and computed properties', 'Types are faster at compile time', 'Interfaces only work with classes'], correctOptionIndex: 1, explanation: 'Interfaces support declaration merging (adding properties to existing interfaces) and are preferred for object shapes, while types support union types, intersection types, and mapped types.' },
      { id: 'ts2', text: 'What does the "keyof" operator do in TypeScript?', options: ['Retrieves a runtime key', 'Returns a union type of all keys of an object type', 'Deletes a key from an object', 'Checks if a key exists at runtime'], correctOptionIndex: 1, explanation: 'keyof T produces a union type of all the keys of type T, useful for creating type-safe property accessor functions and mapped types.' },
      { id: 'ts3', text: 'What is a TypeScript Generic?', options: ['A type that accepts any value', 'A reusable type component that can work with different types while maintaining type safety', 'A deprecated TypeScript feature', 'A runtime type check'], correctOptionIndex: 1, explanation: 'Generics allow you to create reusable components that work with multiple types, specified at usage time rather than definition time, maintaining full type safety.' },
      { id: 'ts4', text: 'What does "Partial<T>" utility type do?', options: ['Makes all properties required', 'Makes all properties of T optional', 'Removes all methods from T', 'Converts T to a primitive'], correctOptionIndex: 1, explanation: 'Partial<T> creates a type where all properties of T are optional (marked with ?), useful when you want to update only some fields of an object.' },
      { id: 'ts5', text: 'What is type narrowing in TypeScript?', options: ['Reducing type to a smaller set based on runtime checks', 'Making types smaller in memory', 'Removing type annotations', 'Converting types to primitives'], correctOptionIndex: 0, explanation: 'Type narrowing is the process of refining a broader type to a more specific type within a conditional block using typeof, instanceof, in checks, or discriminated unions.' },
      { id: 'ts6', text: 'What does "readonly" modifier do in TypeScript?', options: ['Makes a property immutable after initialization', 'Prevents the property from being accessed', 'Makes a class abstract', 'Marks a method as deprecated'], correctOptionIndex: 0, explanation: 'The readonly modifier prevents a property from being reassigned after its initial assignment, providing compile-time immutability checking.' },
      { id: 'ts7', text: 'What is a discriminated union in TypeScript?', options: ['A union of string literals', 'A union of types with a shared literal property used to narrow the type', 'A union that excludes null', 'A union limited to 2 types'], correctOptionIndex: 1, explanation: 'Discriminated unions (also called tagged unions) combine union types that share a common literal property (discriminant), allowing TypeScript to narrow the type based on that property.' },
      { id: 'ts8', text: 'What does the "never" type represent in TypeScript?', options: ['An optional value', 'A type that represents values that never occur (unreachable code, exhausted unions)', 'A null value', 'An async return type'], correctOptionIndex: 1, explanation: 'never represents values that never exist — function return types that always throw, infinite loops, or the bottom of exhaustive type checks.' },
      { id: 'ts9', text: 'What does "Record<K, V>" do in TypeScript?', options: ['Records console logs', 'Creates an object type with keys of type K and values of type V', 'Maps over an array', 'Creates a tuple type'], correctOptionIndex: 1, explanation: 'Record<K, V> is a utility type that constructs an object type whose property keys are K and property values are V, useful for dictionaries and maps.' },
      { id: 'ts10', text: 'What is the "satisfies" operator in TypeScript 4.9+?', options: ['An equality check operator', 'Validates a value matches a type without widening the inferred type', 'A type assertion shorthand', 'A runtime type guard'], correctOptionIndex: 1, explanation: 'The satisfies operator checks that an expression matches a type without changing its inferred type, giving you both type safety and the benefits of the more precise inferred type.' }
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
