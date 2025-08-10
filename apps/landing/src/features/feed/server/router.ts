import { z } from 'zod'
import { TrpcServer } from '../../../core/server'

const ChiasseTypeEnum = z.enum(['text', 'image', 'video', 'external_link'])
const SortTypeEnum = z.enum(['hot', 'new', 'top', 'rising']).default('hot')

const CreateChiasseInput = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters').max(5000, 'Content too long'),
  author: z.string().min(1, 'Author is required').max(100, 'Author name too long'),
  type: ChiasseTypeEnum.default('text'),
})

const FindManyChiassesInput = z.object({
  sortBy: SortTypeEnum,
})

// Reddit-style sorting algorithms
function calculateHotScore(votes: number, createdAt: Date): number {
  const hoursOld = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60)
  const score = votes - 1
  const order = Math.log10(Math.max(Math.abs(score), 1))
  const sign = score > 0 ? 1 : score < 0 ? -1 : 0
  const seconds = hoursOld * 3600
  return sign * order - seconds / 45000
}

function calculateRisingScore(votes: number, createdAt: Date): number {
  const hoursOld = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60)
  // Rising favors newer content with decent engagement
  if (hoursOld > 24) return 0 // Only consider content from last 24h
  const score = votes / Math.max(hoursOld, 0.1) // Votes per hour
  return score
}

export const router = TrpcServer.router({
  findManyChiasses: TrpcServer.procedurePublic
    .input(FindManyChiassesInput)
    .query(async ({ ctx, input }) => {
      const chiasses = await ctx.prisma.chiasse.findMany()

      // Apply sorting based on the selected sort type
      const sortedChiasses = chiasses.sort((a: any, b: any) => {
        switch (input.sortBy) {
          case 'hot':
            return calculateHotScore(b.countVotes, b.createdAt) - calculateHotScore(a.countVotes, a.createdAt)
          
          case 'new':
            return b.createdAt.getTime() - a.createdAt.getTime()
          
          case 'top':
            if (b.countVotes !== a.countVotes) {
              return b.countVotes - a.countVotes
            }
            return b.createdAt.getTime() - a.createdAt.getTime()
          
          case 'rising':
            return calculateRisingScore(b.countVotes, b.createdAt) - calculateRisingScore(a.countVotes, a.createdAt)
          
          default:
            return calculateHotScore(b.countVotes, b.createdAt) - calculateHotScore(a.countVotes, a.createdAt)
        }
      })

      return sortedChiasses
    }),

  createChiasse: TrpcServer.procedurePublic
    .input(CreateChiasseInput)
    .mutation(async ({ ctx, input }) => {
      const chiasse = await ctx.prisma.chiasse.create({
        data: {
          title: input.title,
          content: input.content,
          author: input.author,
          type: input.type,
        }
      })

      return chiasse
    }),

  voteChiasse: TrpcServer.procedurePublic
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const chiasse = await ctx.prisma.chiasse.update({
        where: { id: input.id },
        data: {
          countVotes: {
            increment: 1
          }
        }
      })

      return chiasse
    }),
})
