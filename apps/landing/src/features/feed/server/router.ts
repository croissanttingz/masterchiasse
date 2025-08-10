import { z } from 'zod'
import { TrpcServer } from '../../../core/server'

const ChiasseTypeEnum = z.enum(['text', 'image', 'video', 'external_link'])

const CreateChiasseInput = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters').max(5000, 'Content too long'),
  author: z.string().min(1, 'Author is required').max(100, 'Author name too long'),
  type: ChiasseTypeEnum.default('text'),
})

export const router = TrpcServer.router({
  findManyChiasses: TrpcServer.procedurePublic.query(async ({ ctx }) => {
    const chiasses = await ctx.prisma.chiasse.findMany({
      orderBy: [
        { countVotes: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return chiasses
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
