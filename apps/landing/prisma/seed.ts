import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedChiasses = [
  {
    title: 'Building Scalable React Applications',
    content:
      'Learn how to build scalable React applications with modern patterns and best practices. This comprehensive guide covers component architecture, state management, and performance optimization techniques that will help you create maintainable and efficient applications.',
    countVotes: 42,
    author: 'Sarah Chen',
    type: 'text' as const,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    title: 'Amazing Nature Photography',
    content:
      'Check out this stunning landscape photo taken at sunrise in the Swiss Alps. The golden hour lighting creates an incredible atmosphere that showcases the beauty of nature at its finest.',
    countVotes: 38,
    author: 'Alex Rodriguez',
    type: 'image' as const,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    title: 'TypeScript Tutorial Series',
    content:
      'Complete video series covering TypeScript from basics to advanced concepts. Perfect for developers who want to master type-safe JavaScript development with practical examples and real-world applications.',
    countVotes: 156,
    author: 'Michael Thompson',
    type: 'video' as const,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    title: 'Awesome React Documentation',
    content:
      'Link to the official React documentation with the latest updates and best practices. An essential resource for all React developers.',
    countVotes: 29,
    author: 'Emma Wilson',
    type: 'external_link' as const,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    title: 'Fresh New Web Framework',
    content:
      'Just discovered this amazing new web framework that promises to revolutionize how we build modern applications. Still exploring all its features but early impressions are very positive.',
    countVotes: 15,
    author: 'Jordan Smith',
    type: 'text' as const,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    title: 'Live Coding Stream Tonight',
    content:
      'Join me tonight for a live coding session where we build a full-stack application from scratch. Will be covering authentication, database design, and deployment.',
    countVotes: 25,
    author: 'DevStreamer',
    type: 'video' as const,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    title: 'Beautiful CSS Animation',
    content:
      'Created this smooth loading animation using pure CSS. No JavaScript required! Perfect for modern web applications that need elegant user feedback.',
    countVotes: 8,
    author: 'CSS Wizard',
    type: 'text' as const,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  }
]

async function main() {
  console.log('🌱 Seeding database...')
  
  // Clear existing chiasses
  await prisma.chiasse.deleteMany()
  
  // Create seed chiasses
  for (const chiasseData of seedChiasses) {
    const chiasse = await prisma.chiasse.create({
      data: chiasseData
    })
    console.log(`Created chiasse: ${chiasse.title}`)
  }
  
  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })