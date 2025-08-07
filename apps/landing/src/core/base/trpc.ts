import { initTRPC } from '@trpc/server'
import type { Context } from './context'

const trpc = initTRPC.context<Context>().create()

export const trpcRouter = trpc.router

export const trpcProcedure = trpc.procedure

export const trpcMiddleware = trpc.middleware
