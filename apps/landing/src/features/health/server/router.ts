import { TrpcServer } from '../../../core/server'

export const router = TrpcServer.router({
  ping: TrpcServer.procedurePublic.query(async () => {
    console.log('healthy')

    return { pong: true }
  }),
})
