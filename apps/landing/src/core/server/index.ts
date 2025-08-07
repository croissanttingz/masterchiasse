import { trpcProcedure, trpcRouter } from '../base/trpc'
import { middlewareProtected, middlewarePublic } from './middlewares'

export const TrpcServer = {
  router: trpcRouter,
  procedurePublic: trpcProcedure.use(middlewarePublic),
  procedureProtected: trpcProcedure.use(middlewareProtected),
}
