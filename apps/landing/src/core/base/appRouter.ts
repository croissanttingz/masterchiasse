import { FeedServerModule } from '../../features/feed/server'
import { HealthServerModule } from '../../features/health/server'
import { trpcRouter } from './trpc'

export const appRouter = trpcRouter({
  feed: FeedServerModule.router,
  health: HealthServerModule.router,
})

export type AppRouter = typeof appRouter
