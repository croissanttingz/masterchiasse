import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../base'

export const ApiClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/trpc',
      async headers() {
        return {}
      },
    }),
  ],
})
