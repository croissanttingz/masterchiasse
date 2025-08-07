import { FeedServerModule } from '../../features/feed/server'
import { trpcRouter } from './trpc'

export const appRouter = trpcRouter({
  feed: FeedServerModule.router,
})

export type AppRouter = typeof appRouter
