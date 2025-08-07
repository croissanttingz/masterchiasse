import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

type CreateContext = Parameters<typeof fetchRequestHandler>[0]['createContext']

export type Context = {
  user?: any
}

export const createContext: CreateContext = async ({ req }) => {
  const ctx: Context = {}

  return ctx
}
