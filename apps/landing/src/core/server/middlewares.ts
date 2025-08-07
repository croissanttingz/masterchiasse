import { TRPCError } from '@trpc/server'
import { trpcMiddleware } from '../base/trpc'

export const middlewarePublic = trpcMiddleware(async ({ ctx, next }) => {
  return next({ ctx })
})

export const middlewareProtected = trpcMiddleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    })
  }

  return next({ ctx })
})
