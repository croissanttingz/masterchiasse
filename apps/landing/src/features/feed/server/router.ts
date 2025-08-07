import { TrpcServer } from '../../../core/server'

// Mock data for articles
const mockArticles = [
  {
    id: '1',
    title: 'Building Scalable React Applications',
    content:
      'Learn how to build scalable React applications with modern patterns and best practices. This comprehensive guide covers component architecture, state management, and performance optimization techniques that will help you create maintainable and efficient applications.',
    countVotes: 42,
    author: 'Sarah Chen',
    createdAt: '2024-01-15T10:30:00Z',
    tags: ['React', 'JavaScript', 'Frontend'],
  },
  {
    id: '2',
    title: 'The Future of Web Development',
    content:
      'Exploring emerging trends in web development including WebAssembly, edge computing, and the evolution of JavaScript frameworks. Discover what technologies will shape the next decade of web development and how to prepare for these changes.',
    countVotes: 38,
    author: 'Alex Rodriguez',
    createdAt: '2024-01-14T15:45:00Z',
    tags: ['WebDev', 'Trends', 'Technology'],
  },
  {
    id: '3',
    title: 'Mastering TypeScript for Large Projects',
    content:
      'Deep dive into advanced TypeScript features and patterns for enterprise-level applications. Learn about type safety, generics, decorators, and how to structure large codebases with TypeScript for maximum maintainability.',
    countVotes: 56,
    author: 'Michael Thompson',
    createdAt: '2024-01-13T09:20:00Z',
    tags: ['TypeScript', 'Enterprise', 'Architecture'],
  },
  {
    id: '4',
    title: 'Database Design Principles',
    content:
      'Understanding the fundamentals of database design, normalization, and optimization. This article covers relational database concepts, indexing strategies, and performance tuning techniques for modern applications.',
    countVotes: 29,
    author: 'Emma Wilson',
    createdAt: '2024-01-12T14:10:00Z',
    tags: ['Database', 'SQL', 'Performance'],
  },
  {
    id: '5',
    title: 'DevOps Best Practices for 2024',
    content:
      'Comprehensive guide to modern DevOps practices including CI/CD pipelines, containerization with Docker, Kubernetes orchestration, and infrastructure as code. Learn how to streamline your deployment processes.',
    countVotes: 47,
    author: 'David Kim',
    createdAt: '2024-01-11T11:55:00Z',
    tags: ['DevOps', 'Docker', 'Kubernetes'],
  },
  {
    id: '6',
    title: 'Machine Learning for Web Developers',
    content:
      'Introduction to machine learning concepts for web developers. Learn how to integrate ML models into web applications, understand TensorFlow.js, and build intelligent features for your users.',
    countVotes: 63,
    author: 'Lisa Park',
    createdAt: '2024-01-10T16:30:00Z',
    tags: ['ML', 'AI', 'TensorFlow'],
  },
  {
    id: '7',
    title: 'CSS Grid vs Flexbox: When to Use What',
    content:
      'Detailed comparison of CSS Grid and Flexbox layout systems. Learn the strengths and use cases of each, with practical examples and guidelines for choosing the right tool for your layout needs.',
    countVotes: 34,
    author: 'James Foster',
    createdAt: '2024-01-09T13:25:00Z',
    tags: ['CSS', 'Layout', 'Frontend'],
  },
  {
    id: '8',
    title: 'API Security Best Practices',
    content:
      'Essential security practices for building and maintaining secure APIs. Covers authentication, authorization, rate limiting, input validation, and common vulnerabilities to avoid in your API design.',
    countVotes: 51,
    author: 'Rachel Green',
    createdAt: '2024-01-08T10:15:00Z',
    tags: ['Security', 'API', 'Backend'],
  },
  {
    id: '9',
    title: 'Performance Optimization Techniques',
    content:
      'Advanced techniques for optimizing web application performance. Learn about code splitting, lazy loading, caching strategies, and monitoring tools to ensure your applications run smoothly.',
    countVotes: 45,
    author: 'Tom Anderson',
    createdAt: '2024-01-07T12:40:00Z',
    tags: ['Performance', 'Optimization', 'Monitoring'],
  },
  {
    id: '10',
    title: 'Building Accessible Web Applications',
    content:
      'Complete guide to web accessibility including WCAG guidelines, semantic HTML, ARIA attributes, and testing strategies. Learn how to create inclusive web experiences for all users.',
    countVotes: 39,
    author: 'Nina Patel',
    createdAt: '2024-01-06T08:50:00Z',
    tags: ['Accessibility', 'WCAG', 'Inclusive Design'],
  },
]

export const router = TrpcServer.router({
  findManyArticles: TrpcServer.procedurePublic.query(async ({ ctx, input }) => {
    // Return mock articles sorted by vote count (descending)
    const articles = mockArticles.sort((a, b) => b.countVotes - a.countVotes)

    return articles
  }),
})
