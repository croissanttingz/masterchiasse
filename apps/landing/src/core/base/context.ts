import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { PrismaClient } from '@prisma/client'

type CreateContext = Parameters<typeof fetchRequestHandler>[0]['createContext']

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export type Context = {
  user?: any
  prisma: PrismaClient
}

export const createContext: CreateContext = async ({ req }) => {
  const ctx: Context = {
    prisma,
  }

  return ctx
}
