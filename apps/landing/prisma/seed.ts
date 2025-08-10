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
  },
  {
    title: 'Amazing Nature Photography',
    content:
      'Check out this stunning landscape photo taken at sunrise in the Swiss Alps. The golden hour lighting creates an incredible atmosphere that showcases the beauty of nature at its finest.',
    countVotes: 38,
    author: 'Alex Rodriguez',
    type: 'image' as const,
  },
  {
    title: 'TypeScript Tutorial Series',
    content:
      'Complete video series covering TypeScript from basics to advanced concepts. Perfect for developers who want to master type-safe JavaScript development with practical examples and real-world applications.',
    countVotes: 56,
    author: 'Michael Thompson',
    type: 'video' as const,
  },
  {
    title: 'Awesome React Documentation',
    content:
      'Link to the official React documentation with the latest updates and best practices. An essential resource for all React developers.',
    countVotes: 29,
    author: 'Emma Wilson',
    type: 'external_link' as const,
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