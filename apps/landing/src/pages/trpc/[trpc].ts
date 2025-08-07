import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { APIRoute } from 'astro'
import { appRouter, TrpcBase } from '../../core/base'

export const prerender = false

export const ALL: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    req: request,
    endpoint: '/trpc',
    router: appRouter,
    createContext: TrpcBase.createContext,
  })
}
